import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { Tag, Table, Modal, Button } from 'antd';
import { Link } from 'umi';
import { getQuestionList } from '@/api';
import { IQuestion } from '@/types';
import styles from './index.less';

export default () => {
  const [page, setPage] = React.useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listData, setListData] = useState<IQuestion[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const { list, count } = await getQuestionList({
        page,
      });
      setPageCount(count);
      setListData(list);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [page]);

  const columns = useMemo(
    () => [
      {
        title: '题名',
        dataIndex: 'name',
        key: 'name',
        render: (name: string, record: IQuestion) => {
          return <Link to={`/questions/detail?id=${record.id}`}>{name}</Link>;
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
                return (
                  <Tag color="#f50" key={tag}>
                    {tag}
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
        render: (company: string) => (
          <Tag color="#f56c6c" key={company}>
            {company}
          </Tag>
        ),
      },
    ],
    [],
  );

  const handleChangePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleClick = useCallback(() => {
    setIsModalVisible(!isModalVisible);
  }, [isModalVisible]);

  return (
    <div className={styles.questionListWrapper}>
      <Modal
        title="提交面试题"
        visible={isModalVisible}
        onOk={handleClick}
        onCancel={handleClick}
      >
        将面试题发送至邮箱：zx597813039@gmail.com，采纳既有福利相赠！
      </Modal>
      <Button
        type="primary"
        style={{ width: 120, marginBottom: 20 }}
        onClick={handleClick}
      >
        提交面试题
      </Button>
      <Table
        loading={loading}
        columns={columns}
        dataSource={listData}
        pagination={{
          pageSize: 10,
          onChange: handleChangePage,
          total: pageCount,
        }}
      />
    </div>
  );
};
