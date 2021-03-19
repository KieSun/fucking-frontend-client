import React, { useEffect, useCallback } from 'react';
import { IRouteComponentProps } from 'umi';
import { getQuestionDetail } from '@/api';

export default ({ location, history }: IRouteComponentProps) => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    if (location.query.id) {
      const { id } = location.query;
      const detail = await getQuestionDetail(id);
    } else {
      history.replace('/questions');
    }
  }, []);

  return <div>1</div>;
};
