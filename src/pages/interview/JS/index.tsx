import React from 'react';
import Markdown from '@/components/markdown';
import content from './content.txt';
import styles from './index.less';

console.log(content);
export default () => {
  return (
    <div className={styles.interviewWrapper}>
      <Markdown content={content} />
    </div>
  );
};
