import axios from 'axios';
import { GetRequestsApiParams, IRequest } from 'entities/request';
import { API_URL } from 'shared/config';


const getVacanciesRequests = (params?: GetRequestsApiParams) => {
  return axios.get<IRequest[]>(`${API_URL}/api/v1/user/vacancies`, { params: { ...params, reverse: true } });
};

export const setRequestStatus = (data: { requestId: string, status: string }) => (
    axios.put(`${API_URL}/api/v1/admin/request/status`, data)
);

export const getAdminRequests = (params?: GetRequestsApiParams) => (
  axios.get<IRequest[]>(`${API_URL}/api/v1/admin/requests`, { params: { ...params, reverse: true } })
);


export const investorApi = {
  getRequests: getVacanciesRequests
};

export const adminApi = {
  getRequests: getAdminRequests
};
