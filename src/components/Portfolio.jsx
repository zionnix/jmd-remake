import React from 'react';
import { motion } from 'framer-motion';

const portfolioItems = [
  { id: 1, title: "Spicy Ramen Campaign" },
  { id: 2, title: "Halloween Promo" },
  { id: 3, title: "Conference Digitale" },
  { id: 4, title: "Promo Automne" },
  { id: 5, title: "PepeStudio 2025" }
];

const Portfolio = () => {
  return (
    <section className="portfolio section" id="portfolio">
      <div className="portfolio__container">
        <motion.div
          className="portfolio__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="portfolio__subtitle">Mes créations</p>
          <h2 className="portfolio__title">Des visuels qui captent l'attention</h2>
          <p className="portfolio__description">
            Chaque visuel est conçu pour attirer, engager et convertir. J'allie design et 
            stratégie pour maximiser l'impact de vos campagnes publicitaires.
          </p>
        </motion.div>

        <div className="portfolio__grid">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="portfolio__item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <div className="portfolio__item-image">
                <div className="portfolio__item-placeholder">
                  <span>🎨</span>
                </div>
              </div>
              <div className="portfolio__item-overlay">
                <h3>{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
