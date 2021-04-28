import React, { useEffect, useState } from 'react';
import Markdown from '@/components/markdown';
import { Anchor, Breadcrumb, BackTop } from 'antd';
import 'gitalk/dist/gitalk.css';
import GitalkComponent from 'gitalk/dist/gitalk-component';
import content from './content.md';
import styles from '@/styles/markdown.less';
import Star from '@/components/star';

export default () => {
  return (
    <div className={styles.contentWrapper}>
      <BackTop />
      <Breadcrumb style={{ marginBottom: 20, fontSize: 16 }}>
        <Breadcrumb.Item href="./">返回上一页</Breadcrumb.Item>
        <Breadcrumb.Item>{document.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Star />
      <Markdown content={content} needLock />
      <div id={styles.gitTalk}>
        <GitalkComponent
          options={{
            clientID: '11bb5badb757dbb056f5',
            clientSecret: '5972c74f5888f08fd5d791f2030608d541175b2b',
            repo: 'fucking-frontend-client',
            owner: 'KieSun',
            admin: ['KieSun'],
            id: location.pathname,
            createIssueManually: true,
          }}
        />
      </div>
    </div>
  );
};
