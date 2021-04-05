import React, { useCallback, useEffect, useState } from 'react';
import { Button, Typography, Row, Col, Anchor } from 'antd';
import { IRouteComponentProps, Link as UmiLink } from 'umi';
import dayjs from 'dayjs';
import styles from './index.less';
import markdownStyles from '@/styles/markdown.less';

const { Text, Link } = Typography;

export default function Layout({
  children,
  location,
  history,
}: IRouteComponentProps) {
  const [ids, setIds] = useState<string[]>([]);

  const handleChange = useCallback((newValue: string) => {
    history.push(newValue);
  }, []);

  const idName = `#${markdownStyles.gitTalk}`;
  useEffect(() => {
    window.scrollTo(0, 0);
    const headers = document.querySelectorAll(
      `.${markdownStyles.contentWrapper} h2`,
    );
    const ids: string[] = [];
    headers?.forEach((header) => {
      ids.push(header.id);
    });
    const comment = document.querySelector(idName);
    if (comment) {
      ids.push(idName);
    }
    setIds(ids);
  }, [location.pathname]);

  return (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <header className={styles.header}>
        <div>
          <Button type="text" onClick={() => handleChange('/')}>
            首页
          </Button>
          <Button type="text" onClick={() => handleChange('/interview')}>
            十五万字面试资料
          </Button>
          <Button type="text" onClick={() => handleChange('/questions')}>
            每日大厂真题
          </Button>
          <Button
            type="text"
            href="https://github.com/KieSun/fucking-frontend"
            target="_blank"
          >
            Github
          </Button>
          <Button type="text" onClick={() => handleChange('/author')}>
            联系作者
          </Button>
        </div>
      </header>
      <Row
        justify="center"
        gutter={100}
        wrap={false}
        style={{
          width: '80%',
          margin: '0 auto',
          minHeight: 'calc(100vh - 132px)',
        }}
      >
        <Col md={{ span: 16 }} sm={{ span: 24 }}>
          {children}
        </Col>
        {location.pathname === '/' ? null : (
          <Col style={{ width: '150px', boxSizing: 'content-box' }}>
            <Row style={{ flexDirection: 'column' }} gutter={[0, 60]}>
              <Col>
                {location.pathname !== '/' ? (
                  <div className={styles.group}>
                    <p>加入前端进阶交流群</p>
                    <p>扫描二维码自动拉群</p>
                    <img
                      width="100%"
                      src="https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/03/21/16163277585930.jpeg"
                    />
                  </div>
                ) : null}
              </Col>
              <Col>
                {location.pathname !== '/' ? (
                  <div className={styles.update}>
                    <p>最近更新</p>
                    <UmiLink to="/interview/js">
                      涨薪 5K 以上系列：JS 基础篇
                    </UmiLink>
                  </div>
                ) : null}
              </Col>
              <Col>
                {ids.length ? (
                  <Anchor
                    className={styles.anchorWrapper}
                    targetOffset={40}
                    offsetTop={60}
                  >
                    {ids.map((id) => {
                      if (id !== idName) {
                        return (
                          <Anchor.Link href={`#${id}`} title={id} key={id} />
                        );
                      }
                      return (
                        <Anchor.Link href={idName} title="参与讨论" key={id} />
                      );
                    })}
                  </Anchor>
                ) : null}
              </Col>
            </Row>
          </Col>
        )}
      </Row>
      <footer className={styles.footer}>
        <div>
          <Text type="secondary">
            © 2021 - {dayjs(new Date()).format('YYYY')} | {''}
          </Text>
          <Link href="https://beian.miit.gov.cn/#/Integrated/index">
            浙ICP备18011699号-2
          </Link>
        </div>
      </footer>
    </div>
  );
}
