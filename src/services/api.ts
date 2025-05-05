import axios from 'axios';
import { Customer } from '../types';

const BASE_URL = 'https://credit-risk-dashboard-2usf.onrender.com';

export const fetchCustomers = async (): Promise<Customer[]> => {
  const res = await axios.get(`${BASE_URL}/customers`);
  return res.data;
};

export const updateCustomerStatus = async (customerId: string, status: string) => {
  await axios.put(`${BASE_URL}/customers/${customerId}`, { status });
};