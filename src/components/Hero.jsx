import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__background"></div>
      
      <div className="hero__container">
        <motion.div 
          className="hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="hero__subtitle">Marketing Digital</p>
          <h1 className="hero__title">
            Boostez votre présence <span className="hero__title-accent">digitale</span>
          </h1>
          <p className="hero__description">
            Je vous accompagne dans votre transformation digitale avec des stratégies 
            marketing performantes et des visuels qui captent l'attention.
          </p>
          <Link to="/contact" className="hero__cta">
            Prendre rendez-vous
          </Link>
        </motion.div>

        <motion.div 
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="hero__visual-placeholder">
            <span>🚀</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
