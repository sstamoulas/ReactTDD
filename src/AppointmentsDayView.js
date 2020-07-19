import React, { useState } from 'react'

const appointmentTimeOfDay = startsAt => {
  const [h, m] = new Date(startsAt).toTimeString().split(':')
  return `${h}:${m}`
}

export const Appointment = ({ customer, stylist, service, notes, startsAt }) => 
  <div id='appointmentView'>
    <h1 id="heading">{`Today's appointment is scheduled at ${appointmentTimeOfDay(startsAt)}`}</h1>
    <table>
      <tbody>
        <tr>
          <td>Customer Name</td>
          <td>{`${customer.firstName} ${customer.lastName}`}</td>
        </tr>
        <tr>
          <td>Customer Telephone Number</td>
          <td>{customer.phoneNumber}</td>
        </tr>
        <tr>
          <td>Customer Stylist Name</td>
          <td>{stylist}</td>
        </tr>
        <tr>
          <td>Customer Salon Service</td>
          <td>{service}</td>
        </tr>
        <tr>
          <td>Customer Appointment Notes</td>
          <td>{notes}</td>
        </tr>
      </tbody>
    </table>
  </div>

export const AppointmentsDayView = ({ appointments }) => {  
  const [selectedAppointment, setSelectedAppointment] = useState(0)

  return (
    <div id='appointmentsDayView'>
      <ol>
        {
          appointments.map((appointment, index) => (
            <li key={appointment.startsAt}>
              <button 
                type="button" 
                onClick={() => setSelectedAppointment(index)}
              >
                {
                  appointmentTimeOfDay(appointment.startsAt)
                }
              </button>
            </li>
          ))
        }
      </ol>
      {
        appointments.length === 0 ? (
          <p>There are no appointments scheduled for today.</p>
        ) : (
          <Appointment {...appointments[selectedAppointment]} />
        )
      }
    </div>
  )
}
