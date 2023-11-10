import axios from 'axios';

const createApi = baseURL => axios.create({ baseURL });

export const vaccineApi = createApi(process.env.VUE_APP_VACCINE);
export const patientApi = createApi(process.env.VUE_APP_PATIENT);
export const managerApi = createApi(process.env.VUE_APP_MANAGER);
