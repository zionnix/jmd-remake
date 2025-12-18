import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    selectedDate: null,
    selectedTime: ''
  });

  const [status, setStatus] = useState('');

  // Horaires disponibles
  const weekdayTimes = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30'];
  const weekendTimes = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

  const getAvailableTimes = (date) => {
    if (!date) return [];
    const day = date.getDay();
    // 0 = Dimanche, 6 = Samedi
    return (day === 0 || day === 6) ? weekendTimes : weekdayTimes;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      selectedDate: date,
      selectedTime: '' // Reset time when date changes
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('');

    // Validation
    if (!formData.name || !formData.email || !formData.selectedDate || !formData.selectedTime) {
      setStatus('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Créer le contenu de l'email
    const subject = `Nouvelle demande de rendez-vous - ${formData.name}`;
    const appointmentDate = formData.selectedDate.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const body = `
Bonjour,

Vous avez reçu une nouvelle demande de rendez-vous depuis le site web.

━━━━━━━━━━━━━━━━━━━━━━
📋 INFORMATIONS CLIENT
━━━━━━━━━━━━━━━━━━━━━━

Nom : ${formData.name}
Email : ${formData.email}
Téléphone : ${formData.phone || 'Non renseigné'}

━━━━━━━━━━━━━━━━━━━━━━
📅 RENDEZ-VOUS SOUHAITÉ
━━━━━━━━━━━━━━━━━━━━━━

Date : ${appointmentDate}
Heure : ${formData.selectedTime}

━━━━━━━━━━━━━━━━━━━━━━
💬 MESSAGE
━━━━━━━━━━━━━━━━━━━━━━

${formData.message || 'Aucun message supplémentaire'}

━━━━━━━━━━━━━━━━━━━━━━

Pour répondre au client, utilisez l'adresse email : ${formData.email}

Cordialement,
Formulaire de contact - Je Me Digitalise
    `.trim();

    // Créer le lien mailto
    const mailtoLink = `mailto:jules_benoit@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Ouvrir le client mail
    window.location.href = mailtoLink;
    
    // Message de confirmation
    setStatus('✅ Votre client email va s\'ouvrir. Envoyez l\'email pour confirmer votre demande de rendez-vous.');
    
    // Reset form après 2 secondes
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        selectedDate: null,
        selectedTime: ''
      });
    }, 2000);
  };

  const availableTimes = getAvailableTimes(formData.selectedDate);

  return (
    <div className="contact">
      <section className="contact__hero">
        <motion.div
          className="contact__hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="contact__hero-title">Prenez rendez-vous</h1>
          <p className="contact__hero-description">
            Réservez un créneau pour discuter de votre projet digital
          </p>
        </motion.div>
      </section>

      <section className="contact__form-section">
        <div className="contact__container">
          <motion.div
            className="contact__form-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="contact__form">
              <div className="contact__form-group">
                <label htmlFor="name">Nom complet *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Votre nom"
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="votre@email.com"
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="phone">Téléphone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+32 XXX XX XX XX"
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Décrivez brièvement votre projet..."
                />
              </div>

              <div className="contact__form-group">
                <label>Choisissez une date *</label>
                <DatePicker
                  selected={formData.selectedDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Sélectionnez une date"
                  className="contact__datepicker"
                  inline
                />
              </div>

              {formData.selectedDate && (
                <motion.div
                  className="contact__form-group"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <label>Heure du rendez-vous *</label>
                  <div className="contact__time-slots">
                    {availableTimes.map(time => (
                      <button
                        key={time}
                        type="button"
                        className={`contact__time-slot ${formData.selectedTime === time ? 'selected' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, selectedTime: time }))}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {status && (
                <motion.div
                  className={`contact__status ${status.includes('✅') ? 'success' : 'error'}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {status}
                </motion.div>
              )}

              <button 
                type="submit" 
                className="contact__submit"
              >
                Envoyer la demande
              </button>
            </form>
          </motion.div>

          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="contact__info-card">
              <h3>Informations de contact</h3>
              
              <div className="contact__info-item">
                <span className="contact__info-icon">📧</span>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:jules_benoit@outlook.com">jules_benoit@outlook.com</a>
                </div>
              </div>

              <div className="contact__info-item">
                <span className="contact__info-icon">📞</span>
                <div>
                  <h4>Téléphone</h4>
                  <a href="tel:+32499845636">+32 499 84 56 36</a>
                </div>
              </div>

              <div className="contact__info-item">
                <span className="contact__info-icon">🕐</span>
                <div>
                  <h4>Horaires</h4>
                  <p>Lundi – vendredi : 17h – 20h</p>
                  <p>Weekend : 10h – 18h</p>
                  <p>Jours fériés : 10h – 18h</p>
                </div>
              </div>

              <div className="contact__social">
                <h4>Suivez-moi</h4>
                <div className="contact__social-links">
                  <a href="https://www.instagram.com/jemedigitalise/" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                  <a href="https://www.tiktok.com/@nicojemedigitalise" target="_blank" rel="noopener noreferrer">
                    TikTok
                  </a>
                  <a href="https://www.youtube.com/@Nico-JeMeDigitalise/featured" target="_blank" rel="noopener noreferrer">
                    YouTube
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
