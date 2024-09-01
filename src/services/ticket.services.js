import ticketRepository from '../persistence/ticket.repository.js';

const createTicket = async (email, totalAmount) => {
  console.log('primer control del ticket service');
  const newTicket = {
    code: Math.random().toString(36).substr(2, 9),
    amount: totalAmount,
    purchaser: email,
  };
  console.log('segundo control del ticket service', newTicket);

  const ticket = await ticketRepository.createTicket(newTicket);
  console.log('tercer control del ticket service', ticket);
  return ticket;
};

export default { createTicket };
