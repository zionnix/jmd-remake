import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulation d'un délai de connexion
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = login(credentials.username, credentials.password);
    
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="admin-login">
      <motion.div
        className="admin-login__container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="admin-login__header">
          <div className="admin-login__icon">🔐</div>
          <h1>Administration</h1>
          <p>Connectez-vous pour accéder au tableau de bord</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login__form">
          <div className="admin-login__field">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Entrez votre nom d'utilisateur"
              required
              autoComplete="username"
            />
          </div>

          <div className="admin-login__field">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Entrez votre mot de passe"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <motion.div
              className="admin-login__error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ❌ {error}
            </motion.div>
          )}

          <button 
            type="submit" 
            className="admin-login__submit"
            disabled={isLoading}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="admin-login__back">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            ← Retour au site
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
