import React, { useCallback } from 'react';
import Markdown from '@/components/markdown';
import { Button, Col, Row, Typography } from 'antd';
import { goTo } from '@/utils';
import styles from '@/styles/wrapper.less';
import { Link } from 'umi';
import rowStyles from '@/styles/row.less';

const { Title } = Typography;

export default () => {
  const handleClick = useCallback(() => {
    goTo('https://yuchengkai.cn/docs/frontend/');
  }, []);
  return (
    <div className={styles.wrapper}>
      <Markdown
        content={`
<p style='text-align: center'>
  <img src='https://yck-1254263422.file.myqcloud.com/2021/03/23/16165050809917.png' width='70%' />
</p>
内容包含了 JS、浏览器、性能相关、安全知识、框架及计算机基础知识，字数达 10 万+，希望能对你的面试有所帮助。

**这份资料虽然是笔者 18 ~ 19 年所写，但是内容在当下还是值得细细品读的。另外更值得一提的是，笔者已经开始着手对这份资料进行改版完善，预计会在近期逐步放出内容，大家可以持续关注该网站的更新。**
      `}
      />
      <div style={{ width: '100%' }}>
        <Title
          level={2}
          style={{
            fontWeight: 'lighter',
            color: 'rgb(49, 70, 89)',
            marginBottom: 40,
          }}
        >
          新版内容
        </Title>
        <Row gutter={24} className={rowStyles.rowWrapper} justify="start">
          <Col span="12">
            <Link to="/interview/js">
              <img
                width="100%"
                src="https://yck-1254263422.file.myqcloud.com/2021/04/04/16175456197561.jpg"
                alt=""
              />
              <Title level={5}>JS 基础</Title>
            </Link>
          </Col>
          <Col span="12">
            <Link to="/interview/network">
              <img
                width="100%"
                src="https://yck-1254263422.file.myqcloud.com/2021/04/04/16175456197561.jpg"
                alt=""
              />
              <Title level={5}>网络</Title>
            </Link>
          </Col>
        </Row>
      </div>
      <Button
        type="primary"
        size="large"
        onClick={handleClick}
        style={{ marginTop: 40, width: 200 }}
      >
        等不及了，先看旧版~
      </Button>
    </div>
  );
};
