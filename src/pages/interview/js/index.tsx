import React, { useEffect, useState } from 'react';
import Markdown from '@/components/markdown';
import { Anchor } from 'antd';
import 'gitalk/dist/gitalk.css';
import GitalkComponent from 'gitalk/dist/gitalk-component';
import content from './content.md';
import styles from './index.less';

const { Link } = Anchor;

export default () => {
  const [ids, setIds] = useState<string[]>([]);
  const idName = `#${styles.gitTalk}`;
  useEffect(() => {
    const headers = document.querySelectorAll(`.${styles.interviewWrapper} h2`);
    const ids: string[] = [];
    headers?.forEach((header) => {
      ids.push(header.id);
    });
    const comment = document.querySelector(idName);
    if (comment) {
      ids.push(idName);
    }
    setIds(ids);
  }, []);
  return (
    <div className={styles.interviewWrapper}>
      {ids.length ? (
        <Anchor className={styles.anchorWrapper} targetOffset={40}>
          {ids.map((id) => {
            if (id !== idName) {
              return <Link href={`#${id}`} title={id} key={id} />;
            }
            return <Link href={idName} title="参与讨论" key={id} />;
          })}
        </Anchor>
      ) : null}
      <Markdown content={content} />
      <div id={idName}>
        <GitalkComponent
          options={{
            clientID: '11bb5badb757dbb056f5',
            clientSecret: '5972c74f5888f08fd5d791f2030608d541175b2b',
            repo: 'fucking-frontend-client',
            owner: 'KieSun',
            admin: ['KieSun'],
            id: location.pathname,
          }}
        />
      </div>
    </div>
  );
};
