import React, { useState, useCallback, useEffect } from 'react';
import { Tabs } from 'antd';
import { IRouteComponentProps } from 'umi';

const { TabPane } = Tabs;

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
    }
  }, []);

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue);
    history.push(newValue);
  }, []);

  return (
    <div>
      <Tabs activeKey={value} onChange={handleChange} centered>
        <TabPane tab="十五万字面试资料" key="/interview" />
        <TabPane tab="每日大厂原题" key="/questions" />
        <TabPane tab="大厂内推信息" key="/jobs" />
      </Tabs>
      {children}
    </div>
  );
}
