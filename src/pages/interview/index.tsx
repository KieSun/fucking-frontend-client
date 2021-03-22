import React, { useCallback } from 'react';
import Markdown from '@/components/markdown';
import { Button } from 'antd';
import { goTo } from '@/utils';
import './index.less';

export default () => {
  const handleClick = useCallback(() => {
    goTo('https://yuchengkai.cn/docs/frontend/');
  }, []);
  return (
    <div className="interview-wrapper">
      <Markdown
        content={`
如果需要用一句话来介绍这份面试资料的话，「**半年磨一剑**」应该是最好的答案了。

为什么这样说呢？因为我花了半年的时间做了一个这个开源项目。在半年的时间里，我收集了大量的一线大厂面试题，通过大数据统计出了近百个常考知识点，然后根据这些知识点写成了近十五万字的内容。

![](https://camo.githubusercontent.com/4368d7444b4551db1501221099b93e9cff2b7c624a55bdc2089f64f018ec3f6e/68747470733a2f2f79636b2d313235343236333432322e636f732e61702d7368616e676861692e6d7971636c6f75642e636f6d2f626c6f672f323031392d30362d30312d3034323731372e706e67)

内容包含了 JS、浏览器、性能相关、安全知识、框架及计算机基础知识。希望能对你的面试有所帮助。

**这份资料虽然是笔者 18 ~ 19 年所写，但是内容在当下还是值得细细品读的。另外更值得一提的是，笔者已经开始着手对这份资料进行改版完善，预计会在近期逐步放出内容，大家可以持续关注该网站的更新。**
      `}
      />
      <Button
        type="primary"
        size="large"
        onClick={handleClick}
        style={{ marginTop: 40, width: 160 }}
      >
        前往阅读
      </Button>
    </div>
  );
};
