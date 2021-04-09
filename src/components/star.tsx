import React, { useState } from 'react';
import { Row, Col, Button, Modal } from 'antd';
import Markdown from './markdown';

export default () => {
  const [show, setShow] = useState(false);
  return (
    <Row gutter={40} align="middle" style={{ marginBottom: 40 }}>
      <Col span={12}>
        <img
          width="100%"
          src="https://yck-1254263422.file.myqcloud.com/2021/04/04/16175364502138.png"
          alt=""
        />
      </Col>
      <Col span={12} style={{ textAlign: 'center' }}>
        <p>158 / 年，即可获得以下福利：</p>
        <p>1. 知识内参，梳理扩充知识点，星球独家</p>
        <p>2. 帮助大家在一二年内跳槽拿到一个理想薪资</p>
        <p>3. 无限次技术、职场等问题解答</p>
        <Button type="primary" onClick={() => setShow(true)}>
          点击查看更多福利
        </Button>
      </Col>
      <Modal
        title="星球详情介绍"
        visible={show}
        footer={false}
        onCancel={() => setShow(false)}
        bodyStyle={{ maxHeight: '500px', overflow: 'scroll' }}
      >
        <Markdown
          content={`
## 付费 158 / 年你能获得什么？

1. 恺哥内参，帮你梳理及扩充知识点，让大家知道到底学什么，并且绝对能给面试加高分，**此内容星球独享**。

2. 帮助一二线同学在一两年时间内提升薪资至 **20k** 以上，其他城市地区的一样能得到不错的薪资浮动。

3. 我学习的路径，平时看到的好文章、想法、资料、新技术都会整理好分享出来，帮助你更快成长。

4. 个人分享，内容不限于技术。

5. 你的疑问，工作上、技术、职业等等无限次提问，不方便暴露隐私还可以匿名提问，我能回答的肯定会聊聊我的想法。

6. 提高英文能力，跟着学，一年内英语、技术都 Up。

7. 不定期的线上学习活动组织及各类免费活动，比如修改简历、模拟面试等。

8. 能得到一个高质量的微信群，群内各类一线大厂员工，扩充你的人脉，寻找一二线企业内推都可以在群内解决。

9. 其它各类福利，比如掘金、拉勾等各类平台课程低价购买等。
        `}
        />
      </Modal>
    </Row>
  );
};
