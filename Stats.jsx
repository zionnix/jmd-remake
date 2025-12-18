import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const statsData = [
  { number: 10, label: "certifications", suffix: "" },
  { number: 5, label: "clients actifs", suffix: "+" },
  { number: 2, label: "années d'expérience", suffix: "+" },
  { number: 11, label: "projets réussis", suffix: "" }
];

const Stats = () => {
  return (
    <section className="stats">
      <div className="stats__container">
        <div className="stats__grid">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className="stats__item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <AnimatedNumber 
                value={stat.number} 
                suffix={stat.suffix}
              />
              <p className="stats__label">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AnimatedNumber = ({ value, suffix }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateValue();
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateValue = () => {
    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setDisplayValue(Math.min(Math.round(stepValue * currentStep), value));
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);
  };

  return (
    <h3 className="stats__number" ref={elementRef}>
      {displayValue}{suffix}
    </h3>
  );
};

export default Stats;