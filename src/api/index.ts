import { IQuestion, IComment, IType } from '@/types';

import axios from 'axios';

export interface ResponseData {
  code: number;
  data: any;
}

interface IQuestionQuery {
  page: number;
  type?: string;
  company?: string;
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

export const getQuestionList = async ({
  page,
}: IQuestionQuery): Promise<{ count: number; list: IQuestion[] }> => {
  return axios.get(`/api/question/list`, {
    params: {
      page,
    },
  });
};

export const getQuestionDetail = async (id: string): Promise<IQuestion> => {
  return axios.get(`/api/question/${id}`);
};

export const getQuestionCommentList = async (
  id: number,
): Promise<IComment[]> => {
  return axios.get(`/api/comment/${id}/list`);
};

export const likeComment = async (id: number) => {
  return axios.post('/api/comment/like', {
    id,
  });
};
