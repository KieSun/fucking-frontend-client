import React, { useEffect, useCallback, useState } from 'react';
import { IRouteComponentProps } from 'umi';
import {
  Typography,
  Comment,
  Avatar,
  Divider,
  Tag,
  Spin,
  BackTop,
  Button,
} from 'antd';
import dayjs from 'dayjs';
import { HeartTwoTone, HeartFilled, RightOutlined } from '@ant-design/icons';
import { getQuestionDetail, getQuestionCommentList, likeComment } from '@/api';
import { IQuestion, IComment } from '@/types';
import Markdown from '@/components/markdown';
import { goTo } from '@/utils';
import './detail.less';

const { Title } = Typography;

export default ({ location, history }: IRouteComponentProps) => {
  const [detail, setDetail] = useState<IQuestion>();
  const [list, setList] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState<number[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    if (location.query.id) {
      const { id } = location.query;
      try {
        const detail = await getQuestionDetail(id);
        const list = await getQuestionCommentList(detail.issueId);
        setDetail(detail);
        setList(list);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    } else {
      history.replace('/questions');
    }
  }, []);

  const handleLikeComment = useCallback(
    async (id: number) => {
      setLiked([...liked, id]);
      await likeComment(id);
    },
    [liked],
  );

  const handleGoToGithub = useCallback((url: string) => {
    goTo(url);
  }, []);

  return (
    <Spin spinning={loading}>
      <BackTop />
      <div className="detail-wrapper">
        {detail && Object.keys(detail).length ? (
          <div className="question-wrapper">
            <Title level={3} style={{ textAlign: 'center' }}>
              {detail.name}
            </Title>
            <div className="tag-wrapper">
              {detail.type.map((item) => (
                <Tag color="#f50" key={item}>
                  {item}
                </Tag>
              ))}
              <Tag color="#f56c6c" key={detail.company}>
                {detail.company}
              </Tag>
            </div>
            <Markdown content={detail.content} />
            <Button
              style={{ width: 100, marginTop: 20 }}
              type="primary"
              shape="round"
              icon={<RightOutlined />}
              onClick={() =>
                handleGoToGithub(
                  `https://github.com/KieSun/fucking-frontend/issues/${detail?.issueId}#issue-comment-box`,
                )
              }
            >
              去答题
            </Button>
          </div>
        ) : null}
        <Divider />
        {list.length ? (
          <div>
            {list.map((item) => (
              <div key={item.commentId}>
                <Comment
                  author={item.userName}
                  avatar={
                    <span onClick={() => handleGoToGithub(item.htmlUrl)}>
                      <Avatar src={item.avatarUrl} />
                    </span>
                  }
                  content={<Markdown content={item.content} />}
                  datetime={
                    <span>
                      {dayjs(item.updatedAt).format('YYYY-MM-DD hh:mm:ss')}
                    </span>
                  }
                  actions={[
                    <span onClick={() => handleLikeComment(item.commentId)}>
                      {liked.includes(item.commentId) ? (
                        <HeartFilled
                          style={{ fontSize: '20px', color: '#eb2f96' }}
                        />
                      ) : (
                        <HeartTwoTone
                          twoToneColor="#eb2f96"
                          style={{ fontSize: '20px' }}
                        />
                      )}
                    </span>,
                  ]}
                />
                <Divider style={{ margin: '0 0 12px' }} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Spin>
  );
};
