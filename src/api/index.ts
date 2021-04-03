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

const isProd = process.env.NODE_ENV === 'production';
if (isProd) {
  axios.defaults.baseURL = 'https://api.jsgodroad.com';
}

const PREFIX = isProd ? '' : '/api';

axios.interceptors.response.use(
  (response): any => {
    const { data } = response.data as ResponseData;

    if (response.status === 200) {
      return (data || response.data) as any;
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
  return axios.get(`${PREFIX}/question/list`, {
    params: {
      page,
    },
  });
};

export const getQuestionDetail = async (id: string): Promise<IQuestion> => {
  return axios.get(`${PREFIX}/question/${id}`);
};

export const getQuestionCommentList = async (
  id: number,
): Promise<IComment[]> => {
  return axios.get(`${PREFIX}/comment/${id}/list`);
};

export const likeComment = async (id: number) => {
  return axios.post('${PREFIX}/comment/like', {
    id,
  });
};

export const getLockStatus = async (
  token: string,
): Promise<{ locked: boolean }> => {
  return axios.get(
    `https://api.yuchengkai.cn/getSubscribedStatus?token=${token}`,
  );
};
