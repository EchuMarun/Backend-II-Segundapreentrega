import { ticketModel } from './models/ticket.model.js';

const getAllTickets = async (query, filter) => {
  return await ticketModel.paginate(query, filter);
};
const getTicketById = async id => {
  return await ticketModel.findOne({ _id: id });
};
const createTicket = async data => {
  const ticket = await ticketModel.create(data);
  return ticket;
};
const updateTicket = async data => {
  return await ticketModel.update(data);
};
const deleteTicket = async id => {
  return await ticketModel.findByIdAndDelete(id);
};

export default {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
};
