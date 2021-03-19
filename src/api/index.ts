import { IQuestion, IComment } from '@/types';

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
    throw new Error('服务器出错');
  },
  (error) => {
    throw new Error('服务器出错');
  },
);

export const getQuestionList = async (): Promise<IQuestion[]> => {
  return axios.get('/api/question/list');
};

export const getQuestionDetail = async (id: string): Promise<IQuestion> => {
  return axios.get(`/api/question/${id}`);
};

export const getQuestionCommentList = async (
  id: number,
): Promise<IComment[]> => {
  return axios.get(`/api/comment/${id}/list`);
};
