import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CallbackPage = () => {
    const navigate = useNavigate();

    const handleSocialLogin = async (provider: string, token: string) => {
        const data = {
            provider: provider,
            access_provider_token: token,
        };

        try {
            const response = await axios.post('/api/social-login', data);
            if(response?.data?.status==='success'){
                navigate('/dashboard')
            }
         
        } catch (error) {
            console.error('Error during social login:', error);
        }
    };

    useEffect(() => {
        const hash = window.location.hash;
      
        const params = new URLSearchParams(hash.replace('#', '?'));
        
        const accessToken = params.get('access_token');
        
        if (accessToken) {
            handleSocialLogin('google', accessToken);
        } else {
            console.error('No access token found in URL.');
        }
    }, []);

    return <div>Loading...</div>;
};

export default CallbackPage;
