import React, { useState, useCallback, useEffect } from 'react';
import { Tabs } from 'antd';
import { IRouteComponentProps } from 'umi';

const { TabPane } = Tabs;

const routes = ['/interview', '/questions', '/jobs'];

export default function Layout({
  children,
  location,
  route,
  history,
}: IRouteComponentProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (location.pathname === '/') {
      setValue('/questions');
      history.push('/questions');
    } else {
      routes.forEach((item) => {
        if (location.pathname.includes(item)) {
          setValue(item);
        }
      });
    }
  }, []);

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue);
    history.push(newValue);
  }, []);

  return (
    <div>
      <Tabs activeKey={value} onChange={handleChange} centered>
        <TabPane tab="十五万字面试资料" key={routes[0]} />
        <TabPane tab="每日大厂原题" key={routes[1]} />
        <TabPane tab="大厂内推信息" key={routes[2]} />
      </Tabs>
      {children}
    </div>
  );
}
