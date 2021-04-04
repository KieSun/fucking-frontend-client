import React from 'react';
import { Typography, Row, Col } from 'antd';
import { Link } from 'umi';
import styles from './index.less';
import rowStyles from '@/styles/row.less';

const { Title, Text } = Typography;

export default () => {
  return (
    <div className={styles.homeWrapper}>
      <img
        src="https://yck-1254263422.cos.ap-shanghai.myqcloud.com/20190728231530.jpeg"
        alt=""
      />
      <Title style={{ marginTop: 20 }}>干爆前端</Title>
      <Text style={{ fontSize: 20 }} type="secondary">
        做杭州市最好的前端进大厂学习资料
      </Text>
      <div>
        <Title
          level={2}
          style={{
            fontWeight: 'lighter',
            color: 'rgb(49, 70, 89)',
            margin: '40px 0',
          }}
        >
          精彩推荐
        </Title>
        <Row gutter={24} className={rowStyles.rowWrapper}>
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
        </Row>
      </div>
    </div>
  );
};
