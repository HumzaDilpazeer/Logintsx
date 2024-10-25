import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CallbackPage from './pages/CallbackPage';
import Dashboard from './pages/Dashboard';
import GitHubCallback from './pages/GitHubCallback';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/callback' element={<CallbackPage />} />
        <Route path='/GitHubCallback' element={<GitHubCallback />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
