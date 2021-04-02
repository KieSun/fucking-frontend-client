import React, { useState, useCallback, useEffect } from 'react';
import { Button, Typography } from 'antd';
import { IRouteComponentProps } from 'umi';
import dayjs from 'dayjs';
import styles from './index.less';

const { Text, Link } = Typography;

export default function Layout({
  children,
  location,
  history,
}: IRouteComponentProps) {
  const handleChange = useCallback((newValue: string) => {
    history.push(newValue);
  }, []);

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
      <div style={{ maxWidth: 1200, margin: '0 auto', flex: 1 }}>
        {children}
      </div>
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
      {location.pathname !== '/' ? (
        <div className={styles.fixWrapper}>
          <p>加入前端进阶交流群</p>
          <p>扫描二维码自动拉群</p>
          <img
            width="100%"
            src="https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/03/21/16163277585930.jpeg"
          />
        </div>
      ) : null}
    </div>
  );
}
