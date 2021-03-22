import React, { useState, useCallback, useEffect } from 'react';
import { Tabs } from 'antd';
import { IRouteComponentProps } from 'umi';
import './index.less';

const { TabPane } = Tabs;

const routes = ['/', '/interview', '/questions', '/author'];

export default function Layout({
  children,
  location,
  history,
}: IRouteComponentProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    routes.forEach((item) => {
      if (location.pathname.includes(item)) {
        setValue(item);
      }
    });
  }, [location.pathname]);

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue);
    history.push(newValue);
  }, []);

  return (
    <div>
      <Tabs activeKey={value} onChange={handleChange} centered>
        <TabPane tab="首页" key={routes[0]} />
        <TabPane tab="十五万字面试资料" key={routes[1]} />
        <TabPane tab="每日大厂真题" key={routes[2]} />
        <TabPane tab="联系作者" key={routes[3]} />
      </Tabs>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>{children}</div>
      {location.pathname !== '/' ? (
        <div className="fix-wrapper">
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
