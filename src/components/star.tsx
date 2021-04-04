import React from 'react';
import { Row, Col, Button, Typography } from 'antd';

const { Text } = Typography;

export default () => {
  return (
    <Row gutter={40} align="middle" style={{ marginBottom: 40 }}>
      <Col span={12}>
        <img
          width="100%"
          src="https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/04/04/16175364502138.png"
          alt=""
        />
      </Col>
      <Col style={{ textAlign: 'center' }}>
        <p>158 / 年，即可获得以下福利：</p>
        <p>1. 知识内参，梳理扩充知识点，星球独家</p>
        <p>2. 帮助大家在一二年内跳槽拿到一个理想薪资</p>
        <p>3. 无限次技术、职场等问题解答</p>
        <Button type="primary">点击查看更多福利</Button>
      </Col>
    </Row>
  );
};
