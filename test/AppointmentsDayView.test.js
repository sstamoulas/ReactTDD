import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'

import { 
  Appointment, 
  AppointmentsDayView 
} from '../src/AppointmentsDayView'

describe('Appointment', () => {
  const today = new Date()
  const appointment = { 
    startsAt: today.setHours(12, 0),
    customer: { 
      firstName: 'Ashley',
      lastName: 'Meow',
      phoneNumber: '(202) 753-4611',
    },
    stylist: 'Jean Claude',
    service: 'Hair Cuttery',
    notes: 'TBD',
  }
  let customer
  let container

  beforeEach(() => {
    container = document.createElement('div')
  })

  const render = component => 
    ReactDOM.render(component, container)

  it('renders an HTML table tag', () => {
    render(<Appointment customer={{}} />)
    expect(container.querySelector('div#appointmentView > table')).not.toBeNull()
  })

  it('renders the customer first name', () => {
    render(<Appointment {...appointment} />)
    expect(container.textContent).toMatch(appointment.customer.firstName)
  })

  it('renders another customer first name', () => {
    customer = { firstName: 'Jordan' }
    render(<Appointment customer={customer} />)
    expect(container.textContent).toMatch('Jordan')
  })

  it('renders the customer last name', () => {
    render(<Appointment {...appointment} />)
    expect(container.textContent).toMatch(appointment.customer.lastName)
  })

  it('renders another customer last name', () => {
    customer = { lastName: 'Michael' }
    render(<Appointment customer={customer} />)
    expect(container.textContent).toMatch('Michael')
  })

  it('renders the customer telephone number', () => {
    render(<Appointment {...appointment} />)
    expect(container.textContent).toMatch(appointment.customer.phoneNumber)
  })

  it('renders the customer stylist name', () => {
    render(<Appointment {...appointment} />)
    expect(container.textContent).toMatch(appointment.stylist)
  })

  it('renders the customer salon service', () => {
    render(<Appointment {...appointment} />)
    expect(container.textContent).toMatch(appointment.service)
  })

  it('renders the customer appointment notes', () => {
    render(<Appointment {...appointment} />)
    expect(container.textContent).toMatch(appointment.notes)
  })

  it('renders the heading to the customer appointment', () => {
    render(<Appointment {...appointment} />)
    expect(container.querySelector('h1#heading')).not.toBeNull()
    expect(container.querySelector('h1#heading').textContent).toMatch(`Today's appointment is scheduled at 12:00`)
  })
})

describe('AppointmentsDayView', () => {
  const today = new Date()
  const appointments = [
    { 
      startsAt: today.setHours(12, 0),
      customer: { firstName: 'Ashley' }
    },
    { 
      startsAt: today.setHours(13, 0),
      customer: { firstName: 'Jordan' }
    }
  ]
  let container

  beforeEach(() => {
    container = document.createElement('div')
  })

  const render = component => 
    ReactDOM.render(component, container)

  it('renders a div with the right id', () => {
    render(<AppointmentsDayView appointments={[]} />)
    expect(container.querySelector('div#appointmentsDayView')).not.toBeNull()
  })

  it('renders multiple appointments in an ol element', () => {
    render(<AppointmentsDayView appointments={appointments} />)
    expect(container.querySelector('ol')).not.toBeNull()
    expect(
      container.querySelector('ol').children
    ).toHaveLength(2)
  })

  it('renders each appointment in an li', () => {
    render(<AppointmentsDayView appointments={appointments} />)
    expect(container.querySelectorAll('li')).toHaveLength(2)
    expect(
      container.querySelectorAll('li')[0].textContent
    ).toEqual('12:00')
    expect(
      container.querySelectorAll('li')[1].textContent
    ).toEqual('13:00')
  })

  it('initially shows a message saying there are no appointments today', () => {
    render(<AppointmentsDayView appointments={[]} />)
    expect(container.textContent).toMatch(
      'There are no appointments scheduled for today.'
    )
  })

  it('selects the first appointment by default', () => {
    render(<AppointmentsDayView appointments={appointments} />)
    expect(container.textContent).toMatch('Ashley')
  })

  it('has a button element in each li', () => {
    render(<AppointmentsDayView appointments={appointments} />)
    expect(
      container.querySelectorAll('li > button')
    ).toHaveLength(2)
    expect(
      container.querySelectorAll('li > button')[0].type
    ).toEqual('button')
  })

  it('renders another appointment when selected', () => {
    render(<AppointmentsDayView appointments={appointments} />)
    const button = container.querySelectorAll('button')[1]
    ReactTestUtils.Simulate.click(button)
    expect(container.textContent).toMatch('Jordan')
  })
})
