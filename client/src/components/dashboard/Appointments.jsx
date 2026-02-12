import React, { useEffect, useState } from 'react';
import appointmentService from '../../services/appointmentService';
import { formatDate } from '../../utils/helpers';
import { getAppointmentStatusColor } from '../../utils/helpers';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import LoadingSpinner from '../ui/LoadingSpinner';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      const result = await appointmentService.getMyAppointments();
      if (result.success) {
        setAppointments(result.data.appointments || []);
      }
      setLoading(false);
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading appointments..." />;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">My Appointments</h1>
        <p className="text-neutral-600">View and manage your property viewings</p>
      </div>

      {appointments.length === 0 ? (
        <Card>
          <p className="text-center text-neutral-600 py-12">No appointments yet</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <Card key={appointment._id} hoverable>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-neutral-900 mb-2">
                    {appointment.property?.title || 'Property'}
                  </h3>
                  <p className="text-neutral-600 mb-2">
                    {formatDate(appointment.appointmentDate)} at {appointment.appointmentTime}
                  </p>
                  <p className="text-sm text-neutral-500">
                    Type: {appointment.type}
                  </p>
                </div>
                <Badge 
                  variant={
                    appointment.status === 'confirmed' ? 'success' :
                    appointment.status === 'pending' ? 'warning' :
                    appointment.status === 'cancelled' ? 'danger' : 'info'
                  }
                >
                  {appointment.status}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;