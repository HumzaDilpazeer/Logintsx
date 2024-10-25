import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GitHubCallback = () => {

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
    const query = window.location.search;
        
    // Parse the query string
    const params = new URLSearchParams(query);
    const code = params.get('code');

    if (code) {
        handleSocialLogin('github', code);
    } else {
        console.error('No code found in URL.');
    }
}, []);

  return <div>Loading...</div>;
};

export default GitHubCallback;
