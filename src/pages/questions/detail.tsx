import React, { useEffect, useCallback, useState } from 'react';
import { IRouteComponentProps } from 'umi';
import ReactMarkdown from 'react-markdown';
import { Typography, Comment, Avatar } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { getQuestionDetail, getQuestionCommentList } from '@/api';
import { IQuestion, IComment } from '@/types';

const { Title } = Typography;

const renderers = {
  code: ({ value }) => {
    return (
      <SyntaxHighlighter
        style={atomOneDark}
        language="javascript"
        children={value}
      />
    );
  },
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 260px;
`;

const StyledQuestionContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledTitle = styled(Title)`
  text-align: center;
  margin-bottom: 40px !important;
`;

export default ({ location, history }: IRouteComponentProps) => {
  const [detail, setDetail] = useState<IQuestion>();
  const [list, setList] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <StyledWrapper>
      {detail && Object.keys(detail).length ? (
        <StyledQuestionContainer>
          <StyledTitle level={3}>{detail.name}</StyledTitle>
          <ReactMarkdown renderers={renderers}>{detail.content}</ReactMarkdown>
        </StyledQuestionContainer>
      ) : null}
      {list.length ? (
        <div>
          {list.map((item) => (
            <Comment
              author={item.userName}
              avatar={<Avatar src={item.avatarUrl} />}
              content={
                <ReactMarkdown renderers={renderers}>
                  {item.content}
                </ReactMarkdown>
              }
              datetime={
                <span>
                  {moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
                </span>
              }
            />
          ))}
        </div>
      ) : null}
    </StyledWrapper>
  );
};
