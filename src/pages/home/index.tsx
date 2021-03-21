import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Typography, Button, Row, Col } from 'antd';
import { Link } from 'umi';
import { goTo } from '@/utils';

const { Title, Text } = Typography;

const StyledWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledImg = styled.img`
  width: 600px;
  height: 280px;
  object-fit: cover;
`;

const StyledRow = styled(Row)`
  border-radius: 2px;
  overflow: hidden;
  .ant-col {
    position: relative;

    h5 {
      position: absolute;
      left: 30px;
      bottom: 6px;
      color: white;
    }
  }
  a {
    width: 100%;
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 160px;
    transition: all 0.36s ease-out;
  }
  img:hover {
    transform: scale(1.04);
  }
`;

export default () => {
  const handleOpen = useCallback(() => {
    goTo('https://github.com/KieSun/fucking-frontend');
  }, []);
  return (
    <StyledWrapper>
      <StyledImg
        src="https://yck-1254263422.cos.ap-shanghai.myqcloud.com/20190728231530.jpeg"
        alt=""
      />
      <Title style={{ marginTop: 20 }}>Fucking Front End</Title>
      <Text style={{ fontSize: 20, marginBottom: 20 }} type="secondary">
        做杭州市最好的前端进大厂学习资料
      </Text>
      <Button
        type="primary"
        size="large"
        style={{ width: 120 }}
        onClick={handleOpen}
      >
        点个 Star
      </Button>
      <div>
        <Title
          level={2}
          style={{
            fontWeight: 'lighter',
            color: 'rgb(49, 70, 89)',
            margin: '60px 0 40px',
          }}
        >
          精彩推荐
        </Title>
        <StyledRow gutter={24}>
          <Col span="8">
            <Link to="/questions">
              <img
                src="https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/03/21/16163319949568.jpg"
                alt=""
              />
              <Title level={5}>每日一道大厂真题</Title>
            </Link>
          </Col>
          <Col span="8">
            <Link to="/interview">
              <img
                src="https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/03/21/16163319195983.jpg"
                alt=""
              />
              <Title level={5}>十五万字面试资料</Title>
            </Link>
          </Col>
          <Col span="8">
            <Link to="/author">
              <img
                src="https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/03/21/16163321653767.jpg"
                alt=""
              />
              <Title level={5}>联系作者</Title>
            </Link>
          </Col>
        </StyledRow>
      </div>
    </StyledWrapper>
  );
};
