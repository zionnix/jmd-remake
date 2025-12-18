import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DisclaimerPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà accepté le disclaimer
    const hasAccepted = sessionStorage.getItem('disclaimerAccepted');
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem('disclaimerAccepted', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="disclaimer-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="disclaimer-popup"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.4, type: "spring", damping: 25 }}
          >
            <div className="disclaimer-popup__icon">⚠️</div>
            <h2 className="disclaimer-popup__title">Information importante</h2>
            
            <div className="disclaimer-popup__content">
              <p>
                Ce site web est une <strong>refonte</strong> d'un site d'un ami, 
                réalisée avec son autorisation.
              </p>
              <p>
                Le véritable site web est le suivant :
              </p>
              <a 
                href="https://nico-jemedigitalise.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="disclaimer-popup__link"
              >
                https://nico-jemedigitalise.com/
              </a>
              <p className="disclaimer-popup__warning">
                Si vous avez besoin de services, passez <strong>UNIQUEMENT</strong> par son site web officiel.
              </p>
            </div>

            <button 
              className="disclaimer-popup__button"
              onClick={handleAccept}
            >
              J'ai compris, continuer
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DisclaimerPopup;
