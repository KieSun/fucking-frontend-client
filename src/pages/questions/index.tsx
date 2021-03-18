import React, { useEffect, useCallback, useState } from 'react';
import { Tag, Table } from 'antd';
import { Link } from 'umi';
import styled from 'styled-components';
import { getQuestionList } from '@/api';
import { IQuestion } from '@/types';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 160px;

  & > div {
    margin-top: 20px;
    width: 100%;
  }
`;

export default () => {
  const [page, setPage] = React.useState(0);
  const [listData, setListData] = useState<IQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const listData = await getQuestionList();
      setListData(listData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: '题名',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: IQuestion) => {
        return <Link to={`/questions/detail/${record.id}`}>{name}</Link>;
      },
      width: '40%',
    },
    {
      title: '类型',
      key: 'type',
      dataIndex: 'type',
      render: (type: string[]) => (
        <>
          {type &&
            type.map((tag) => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
        </>
      ),
    },
    {
      title: '公司',
      dataIndex: 'company',
      key: 'company',
    },
  ];

  const handleChangePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  return (
    <StyledContainer>
      <Table
        loading={loading}
        columns={columns}
        dataSource={listData}
        pagination={{
          pageSize: 1,
          onChange: handleChangePage,
        }}
      />
    </StyledContainer>
  );
};
