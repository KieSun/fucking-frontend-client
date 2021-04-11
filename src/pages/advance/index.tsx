import React from 'react';
import Markdown from '@/components/markdown';
import styles from '@/styles/wrapper.less';

export default () => {
  return (
    <div className={styles.wrapper}>
      <Markdown
        content={`
经常有读者问我什么是前端工程化？该怎么开始做前端工程化？

聊下来以后得出一些结论：这类读者普遍就职于中小型公司，前端人员个位数，平时疲于开发，团队内部几乎没有基础建设，工具很蛮荒。工程化对于这些读者来说很陌生，基本不知道这到底是什么，或者说认为 Webpack 就是前端工程化的全部了。

笔者目前就职于某厂的基础架构组，为百来号前端提供基础服务建设，对于这个领域有些许皮毛经验，因此想对于该领域写一块系列文章出来。

这个系列的产出适用于以下群体：

- 中小厂前端，基建蛮荒，平时疲于业务，不知道业务外怎么做东西能提高自己的竞争力、丰富简历
- 公司暂时没有做基建计划，只能业余做一些低成本收益高的产品
- 想了解前端工程化

## 全部文章

- [开源项目都在用 monorepo，但是你知道到底有多少坑么？](./engineered/monorepo)
- [揭秘自动化部署系统](./engineered/deploy)
- [从零打造性能检测库](./engineered/performanceTest)
      `}
      />
    </div>
  );
};
