<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use App\Models\SocialLogin;
use Exception;
use Illuminate\Support\Facades\Validator;
use GuzzleHttp\Client;

class AuthController extends Controller
{
    // Handle login via email and password
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            return response()->json(['message' => 'Login successful', 'user' => $user], 200);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }



    // Your existing handleProviderCallback function
    public function handleProviderCallback(Request $request)
    {
        // Validate incoming request
        $validator = Validator::make($request->all(), [
            'provider' => 'required|string|max:255',
            'access_provider_token' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(["status" => "error", 'message' => $validator->errors()->first()], 422);
        }

        $provider = $request->provider;
        $accessToken = null;

        if ($provider === "github") {
            $accessToken = $this->getGitHubAccessToken($request->access_provider_token);
        } else {
            $accessToken = $request->access_provider_token;
        }

        try {
            // Create a Guzzle client
            $client = new \GuzzleHttp\Client(['verify' => false]);


            // Check for provider user data
            if (!$accessToken) {
                return response()->json(["status" => "error", 'message' => 'Code is not found'], 400);
            }

            // Get user from provider
            $providerUser = Socialite::driver($provider)
                ->stateless()  // Disable session state handling
                ->setHttpClient($client)
                ->userFromToken($accessToken);

            // Check for provider user data
            if (!$providerUser || !$providerUser->getEmail()) {
                return response()->json(["status" => "error", 'message' => 'Unable to retrieve user information.'], 400);
            }


            // Check if user already exists
            $user = User::where('email', $providerUser->getEmail())->first();

            if ($user) {
                // User exists, create a token
                $data = [
                    "status" => "success",
                    'token' => $user->createToken('Sanctom+Socialite')->plainTextToken,
                    'user' => $user,
                ];
                return response()->json($data, 200);
            } else {
                // User does not exist, create a new user
                $user = User::create([
                    'email' => $providerUser->getEmail(),
                    'name' => $providerUser->getName(),
                    'avatar' => $providerUser->getAvatar() // Get avatar URL from the provider
                ]);

                // Create token for the new user
                $data = [
                    "status" => "success",
                    'token' => $user->createToken('Sanctom+Socialite')->plainTextToken,
                    'user' => $user,
                ];
                return response()->json($data, 201); // 201 for created resource
            }
        } catch (Exception $e) {
            return response()->json(["status" => "error", 'message' => 'Authentication failed. ' . $e->getMessage()], 500);
        }
    }

    // New method to get GitHub access token
    private function getGitHubAccessToken($code)
    {
        $client = new \GuzzleHttp\Client(['verify' => false]);
        $response = $client->post('https://github.com/login/oauth/access_token', [
            'form_params' => [
                'client_id' => env('GITHUB_CLIENT_ID'),
                'client_secret' => env('GITHUB_CLIENT_SECRET'),
                'code' => $code,
            ],
            'headers' => [
                'Accept' => 'application/json',
            ],
        ]);

        $data = json_decode((string) $response->getBody(), true);
        return $data['access_token'] ?? null; // Return access token or null if not found
    }
}
