import React, { createContext, useContext, useState, useEffect } from 'react';

const AppointmentsContext = createContext();

export const useAppointments = () => {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentsProvider');
  }
  return context;
};

export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  // Charger les rendez-vous depuis localStorage au démarrage
  useEffect(() => {
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, []);

  // Sauvegarder dans localStorage à chaque modification
  const saveAppointments = (newAppointments) => {
    setAppointments(newAppointments);
    localStorage.setItem('appointments', JSON.stringify(newAppointments));
  };

  // Ajouter un nouveau rendez-vous (en attente)
  const addAppointment = (appointmentData) => {
    const newAppointment = {
      id: Date.now().toString(),
      ...appointmentData,
      status: 'pending', // pending, validated, rejected
      createdAt: new Date().toISOString()
    };
    const updatedAppointments = [...appointments, newAppointment];
    saveAppointments(updatedAppointments);
    return newAppointment;
  };

  // Valider un rendez-vous
  const validateAppointment = (appointmentId) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: 'validated', validatedAt: new Date().toISOString() }
        : apt
    );
    saveAppointments(updatedAppointments);
  };

  // Rejeter un rendez-vous
  const rejectAppointment = (appointmentId) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: 'rejected', rejectedAt: new Date().toISOString() }
        : apt
    );
    saveAppointments(updatedAppointments);
  };

  // Supprimer un rendez-vous
  const deleteAppointment = (appointmentId) => {
    const updatedAppointments = appointments.filter(apt => apt.id !== appointmentId);
    saveAppointments(updatedAppointments);
  };

  // Vérifier si un créneau est disponible
  const isSlotAvailable = (date, time) => {
    const dateStr = date.toISOString().split('T')[0];
    return !appointments.some(apt => {
      const aptDateStr = new Date(apt.selectedDate).toISOString().split('T')[0];
      return aptDateStr === dateStr && 
             apt.selectedTime === time && 
             (apt.status === 'validated' || apt.status === 'pending');
    });
  };

  // Obtenir les créneaux indisponibles pour une date
  const getUnavailableSlots = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments
      .filter(apt => {
        const aptDateStr = new Date(apt.selectedDate).toISOString().split('T')[0];
        return aptDateStr === dateStr && 
               (apt.status === 'validated' || apt.status === 'pending');
      })
      .map(apt => apt.selectedTime);
  };

  // Obtenir les rendez-vous par statut
  const getAppointmentsByStatus = (status) => {
    return appointments.filter(apt => apt.status === status);
  };

  // Statistiques
  const getStats = () => {
    return {
      total: appointments.length,
      pending: appointments.filter(a => a.status === 'pending').length,
      validated: appointments.filter(a => a.status === 'validated').length,
      rejected: appointments.filter(a => a.status === 'rejected').length
    };
  };

  return (
    <AppointmentsContext.Provider value={{
      appointments,
      addAppointment,
      validateAppointment,
      rejectAppointment,
      deleteAppointment,
      isSlotAvailable,
      getUnavailableSlots,
      getAppointmentsByStatus,
      getStats
    }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

export default AppointmentsContext;
