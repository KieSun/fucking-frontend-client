import React from 'react';
import Markdown from '@/components/markdown';
import './index.less';

export default () => {
  return (
    <div className="author-wrapper">
      <Markdown
        content={`
笔者网名 yck，目前两年多前端经验，就职于酷家乐基础架构组。我们公司杭州、上海、成都都有研发中心，欢迎投递简历至笔者的邮箱：<zx597813039@gmail.com>。

笔者目前专注于框架原理 / 工程化等各个前端方向，目前是掘金**全站唯一一位 LV7** 作者，出版的[「前端面试之道」](https://juejin.cn/book/6844733763675488269)售出万份，文章及书籍帮助很多小伙伴进入了各个大厂，目前也同时在人民出版社（图灵）写另外一本书籍。

以下是笔者的各个渠道的内容分发平台，有兴趣的可以关注一下：

- [Github](https://github.com/KieSun)
- [掘金](https://juejin.cn/user/712139233840407/posts)
- [公众号：前端真好玩](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/20191223215610.jpeg)
      `}
      />
    </div>
  );
};
