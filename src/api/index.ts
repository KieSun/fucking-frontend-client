import { IQuestion } from '@/types';

import axios from 'axios';

export interface ResponseData {
  code: number;
  data: any;
}

// axios.defaults.baseURL = 'https://api.jsgodroad.com'

export class HttpClientError extends Error {
  public readonly status: number;
  public readonly code?: number;
  constructor(status: number, msg: string, code?: number) {
    super(msg);
    this.status = status;
    if (code) {
      this.code = code;
    }
  }
}

axios.interceptors.response.use(
  (response): any => {
    const { code, data } = response.data as ResponseData;

    if (code === 200) {
      return data as any;
    }

    throw new HttpClientError(response.status, '服务器出错', code);
  },
  (error) => {
    const msg = '服务器出错';
    throw new HttpClientError(error.response.status, msg);
  },
);

export const getQuestionList = async (): Promise<IQuestion[]> => {
  return axios.get('/api/question/list');
};

export const getQuestionDetail = async (id: string): Promise<IQuestion[]> => {
  return axios.get(`/api/question/${id}`);
};

export const getQuestionCommentList = async (
  id: string,
): Promise<IQuestion[]> => {
  return axios.get(`/comment/${id}/list`);
};
