import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppointments } from '../context/AppointmentsContext';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const { 
    appointments, 
    validateAppointment, 
    rejectAppointment, 
    deleteAppointment,
    getStats 
  } = useAppointments();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [confirmAction, setConfirmAction] = useState(null);

  const stats = getStats();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredAppointments = filter === 'all' 
    ? appointments 
    : appointments.filter(apt => apt.status === filter);

  const sortedAppointments = [...filteredAppointments].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'En attente', class: 'pending', icon: '⏳' },
      validated: { label: 'Validé', class: 'validated', icon: '✅' },
      rejected: { label: 'Refusé', class: 'rejected', icon: '❌' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`status-badge status-badge--${config.class}`}>
        {config.icon} {config.label}
      </span>
    );
  };

  const handleAction = (action, appointmentId) => {
    setConfirmAction({ action, appointmentId });
  };

  const executeAction = () => {
    if (!confirmAction) return;
    
    const { action, appointmentId } = confirmAction;
    
    switch (action) {
      case 'validate':
        validateAppointment(appointmentId);
        break;
      case 'reject':
        rejectAppointment(appointmentId);
        break;
      case 'delete':
        deleteAppointment(appointmentId);
        break;
      default:
        break;
    }
    
    setConfirmAction(null);
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard__header">
        <div className="admin-dashboard__header-content">
          <h1>🎛️ Tableau de bord</h1>
          <button onClick={handleLogout} className="admin-dashboard__logout">
            Déconnexion
          </button>
        </div>
      </header>

      <main className="admin-dashboard__main">
        {/* Stats Cards */}
        <div className="admin-dashboard__stats">
          <motion.div 
            className="stat-card stat-card--total"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="stat-card__icon">📊</div>
            <div className="stat-card__value">{stats.total}</div>
            <div className="stat-card__label">Total</div>
          </motion.div>

          <motion.div 
            className="stat-card stat-card--pending"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="stat-card__icon">⏳</div>
            <div className="stat-card__value">{stats.pending}</div>
            <div className="stat-card__label">En attente</div>
          </motion.div>

          <motion.div 
            className="stat-card stat-card--validated"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="stat-card__icon">✅</div>
            <div className="stat-card__value">{stats.validated}</div>
            <div className="stat-card__label">Validés</div>
          </motion.div>

          <motion.div 
            className="stat-card stat-card--rejected"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="stat-card__icon">❌</div>
            <div className="stat-card__value">{stats.rejected}</div>
            <div className="stat-card__label">Refusés</div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="admin-dashboard__filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tous
          </button>
          <button 
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            En attente ({stats.pending})
          </button>
          <button 
            className={`filter-btn ${filter === 'validated' ? 'active' : ''}`}
            onClick={() => setFilter('validated')}
          >
            Validés
          </button>
          <button 
            className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
            onClick={() => setFilter('rejected')}
          >
            Refusés
          </button>
        </div>

        {/* Appointments List */}
        <div className="admin-dashboard__appointments">
          <h2>Rendez-vous ({filteredAppointments.length})</h2>
          
          {sortedAppointments.length === 0 ? (
            <div className="admin-dashboard__empty">
              <p>🗓️ Aucun rendez-vous à afficher</p>
            </div>
          ) : (
            <div className="appointments-list">
              <AnimatePresence>
                {sortedAppointments.map((apt, index) => (
                  <motion.div
                    key={apt.id}
                    className="appointment-card"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="appointment-card__header">
                      <h3>{apt.name}</h3>
                      {getStatusBadge(apt.status)}
                    </div>

                    <div className="appointment-card__details">
                      <div className="appointment-card__row">
                        <span className="label">📧 Email:</span>
                        <a href={`mailto:${apt.email}`}>{apt.email}</a>
                      </div>
                      {apt.phone && (
                        <div className="appointment-card__row">
                          <span className="label">📞 Téléphone:</span>
                          <a href={`tel:${apt.phone}`}>{apt.phone}</a>
                        </div>
                      )}
                      <div className="appointment-card__row">
                        <span className="label">📅 Date souhaitée:</span>
                        <strong>{formatDate(apt.selectedDate)}</strong>
                      </div>
                      <div className="appointment-card__row">
                        <span className="label">🕐 Heure:</span>
                        <strong>{apt.selectedTime}</strong>
                      </div>
                      {apt.message && (
                        <div className="appointment-card__message">
                          <span className="label">💬 Message:</span>
                          <p>{apt.message}</p>
                        </div>
                      )}
                      <div className="appointment-card__row appointment-card__meta">
                        <span>Demande reçue le {formatDateTime(apt.createdAt)}</span>
                      </div>
                    </div>

                    <div className="appointment-card__actions">
                      {apt.status === 'pending' && (
                        <>
                          <button 
                            className="action-btn action-btn--validate"
                            onClick={() => handleAction('validate', apt.id)}
                          >
                            ✅ Valider
                          </button>
                          <button 
                            className="action-btn action-btn--reject"
                            onClick={() => handleAction('reject', apt.id)}
                          >
                            ❌ Refuser
                          </button>
                        </>
                      )}
                      <button 
                        className="action-btn action-btn--delete"
                        onClick={() => handleAction('delete', apt.id)}
                      >
                        🗑️ Supprimer
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmAction && (
          <motion.div
            className="confirm-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="confirm-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3>Confirmer l'action</h3>
              <p>
                {confirmAction.action === 'validate' && "Voulez-vous valider ce rendez-vous ?"}
                {confirmAction.action === 'reject' && "Voulez-vous refuser ce rendez-vous ?"}
                {confirmAction.action === 'delete' && "Voulez-vous supprimer ce rendez-vous ?"}
              </p>
              <div className="confirm-modal__actions">
                <button 
                  className="confirm-modal__btn confirm-modal__btn--cancel"
                  onClick={() => setConfirmAction(null)}
                >
                  Annuler
                </button>
                <button 
                  className="confirm-modal__btn confirm-modal__btn--confirm"
                  onClick={executeAction}
                >
                  Confirmer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
