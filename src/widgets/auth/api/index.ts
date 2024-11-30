import axios from 'axios';
import { API_URL } from 'shared/config';
import { ICreateInvestor } from 'shared/types';

const getInvestor = () => {
  return axios.get(`${API_URL}/api/v1/user`);
};

const createVacancy = (company: string, vacancy: string, salaryForkStart: number, salaryForkEnd: number, note: string, status: string) => {
    return axios.post<ICreateInvestor>(`${API_URL}/api/v1/user/vacancy`, { company, vacancy , salaryForkStart, salaryForkEnd, note, status});
};

const updateVacancy = (vacancyId: string, company: string, vacancy: string, salaryForkStart: number, salaryForkEnd: number, note: string, status: string) => {
    console.log('vacancyId', vacancyId)
    return axios.put<ICreateInvestor>(`${API_URL}/api/v1/user/vacancy`, { vacancyId, company, vacancy , salaryForkStart, salaryForkEnd, note, status});
};

const createInvestor = (email: string, password: string, firstName: string, lastName: string) => {
  return axios.post<ICreateInvestor>(`${API_URL}/api/v1/user`, { email, password , firstName, lastName});
};

const deleteUser = (userId: string) => {
  return axios.delete(`${API_URL}/api/v1/user/users`, { data: {userId }});
};

const updateUserStatus = (userId: string, status: string) => {
    return axios.put(`${API_URL}/api/v1/user/status`, { userId , status});
};


const sendEmailCode = () => {
  return axios.get(`${API_URL}/api/v1/investor/sendEmailSms`);
};

const verifyEmail = (code: string) => {
  return axios.post(`${API_URL}/api/v1/investor/verifyEmail`, { code });
};

const setInvestorPhone = (phone: string) => {
  return axios.post(`${API_URL}/api/v1/investor/phone`, { phone });
};

const sendPhoneCode = () => {
  return axios.get(`${API_URL}/api/v1/investor/sendPhoneSms`);
};

const verifyPhone = (code: string) => {
  return axios.post(`${API_URL}/api/v1/investor/verifyPhone`, { code });
};

const startLogin = (email: string, password: string) => {
  return axios.post(`${API_URL}/api/v1/auth`, { email , password});
};

const getLoginToken = (data: {email: string, code: string}) => {
  return axios.post(`${API_URL}/api/v1/auth/token`, { email: data.email, code: data.code });
};

export const authApi = {
    createVacancy,
    updateVacancy,
    getInvestor,
    createInvestor,
    sendEmailCode,
    verifyEmail,
    setInvestorPhone,
    sendPhoneCode,
    verifyPhone,
    startLogin,
    getLoginToken,
    deleteUser,
    updateUserStatus,
};
