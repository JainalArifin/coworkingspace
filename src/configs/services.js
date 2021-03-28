const BASE_URL = `https://api-trackingspace.herokuapp.com`;

const services = {
  GET_ROOMS: `${BASE_URL}/room`,
  GET_EVENT: `${BASE_URL}/event`,
  GET_CLASS: `${BASE_URL}/classroom`,
  GET_TRAINER: `${BASE_URL}/users`,
  GET_MEMBER: `${BASE_URL}/member`,
  LOGIN_MEMBER: `${BASE_URL}/member`,
  UPDATE_MEMBER: `${BASE_URL}/member`,
  GET_KELAS_MEBER: `${BASE_URL}/class-member`,
  UPDATE_KELAS: id => `${BASE_URL}/classroom/${id}`,
  ADD_KELAS_MEMBER: `${BASE_URL}/class-member`,
  WATCH_KELAS_MEMBER: `${BASE_URL}/class-member`,
};

export default services;
