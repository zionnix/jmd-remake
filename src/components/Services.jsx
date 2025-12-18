import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const servicesData = [
  {
    icon: '📱',
    title: 'Gestion Réseaux Sociaux',
    description: 'Stratégie de contenu, création de posts, planification et analyse des performances sur Instagram, Facebook, TikTok et LinkedIn.'
  },
  {
    icon: '🎨',
    title: 'Création Visuelle',
    description: 'Design graphique percutant pour vos campagnes publicitaires, stories, reels et contenus engageants.'
  },
  {
    icon: '📈',
    title: 'Publicité Digitale',
    description: 'Campagnes Meta Ads et Google Ads optimisées pour maximiser votre ROI et atteindre votre audience cible.'
  },
  {
    icon: '💡',
    title: 'Stratégie Marketing',
    description: 'Audit, conseil et accompagnement personnalisé pour développer votre présence en ligne et atteindre vos objectifs.'
  },
  {
    icon: '🎬',
    title: 'Montage Vidéo / Photo',
    description: 'Création de contenus visuels impactants adaptés aux publicités digitales pour maximiser l\'engagement et la conversion sur vos campagnes publicitaires.'
  },
  {
    icon: '✍️',
    title: 'Copywriting',
    description: 'Rédaction de textes publicitaires percutants pour capter l\'attention, convaincre et inciter votre audience à passer à l\'action peu importe votre objectif publicitaire.'
  }
];

const Services = () => {
  return (
    <section className="services section" id="services">
      <div className="services__container">
        <motion.div
          className="services__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="services__subtitle">Ce que je propose</p>
          <h2 className="services__title">Mes services</h2>
          <p className="services__description">
            Des solutions complètes pour développer votre présence digitale et booster votre business.
          </p>
        </motion.div>

        <div className="services__grid">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              className="services__card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="services__card-icon">{service.icon}</div>
              <h3 className="services__card-title">{service.title}</h3>
              <p className="services__card-description">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="services__cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/contact" className="btn btn--primary">
            Discutons de votre projet
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
