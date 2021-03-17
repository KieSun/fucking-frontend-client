import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { IRouteComponentProps } from 'umi';

export default function Layout({
  children,
  location,
  route,
  history,
}: IRouteComponentProps) {
  const pathName = location.pathname === '/' ? '/questions' : location.pathname;
  const [value, setValue] = useState(pathName);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    history.push(newValue);
  };
  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="十五万字面试资料" value="/interview" />
        <Tab label="每日大厂原题" value="/questions" />
        <Tab label="大厂内推信息" value="jobs" />
      </Tabs>
      {children}
    </div>
  );
}
