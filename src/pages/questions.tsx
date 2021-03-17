import React, { useEffect, useCallback, useState } from 'react';

import styled from 'styled-components';
import { getQuestionList } from '@/api';
import { IQuestion } from '@/types';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 60px;

  & > div {
    margin-top: 20px;
    width: 100%;
  }
`;

export default function BasicTable() {
  const [page, setPage] = React.useState(0);
  const [listData, setListData] = useState<IQuestion[]>([]);

  const fetchData = useCallback(async () => {
    const listData = await getQuestionList();
    setListData(listData);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  return <StyledContainer>1</StyledContainer>;
}
