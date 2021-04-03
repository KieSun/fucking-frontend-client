<template>
  <div></div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.url = window.location.href.split("#")[0];
    this.fetch();
  },
  created() {
    const cookie = this.getCookie() || "yckyc1";
    this.token = cookie.slice(cookie.length - 6);
  },
  methods: {
    change() {
      if (this.url) {
        if (this.url !== window.location.href.split("#")[0]) {
          if (this.locked) this.lock();
        }
      }
      this.url = window.location.href.split("#")[0];
    },
    lock() {
      const content = document.querySelector(".content");
      this.content = [...content.children];
      this.content.forEach((item, index) => {
        if (index > 15) content.removeChild(item);
      });
      content.insertAdjacentHTML(
        "beforeend",
        `
                <div id="locker" style="display: block;text-align:center;">
					<div class="mask"></div>
					<div class="info" style="font-size: 15px;">
						<div>
							<p class="text-center">扫码或搜索：<span style="color: #E9405A; font-weight: bold;">前端真好玩</span></p>
							<p class="text-center">
								<span>发送 </span><span class="token" style="color: #e9415a; font-weight: bold; font-size: 17px; margin-bottom: 45px;">${this.token}</span>
							</p>
							<p class="text-center">
                关注期间<span style="color: #e9415a; font-weight: bold;">无限制</span>浏览本站全部文章\n
                <p>内容包括十五万字面试资料、React 原理解析</p>
                <p>以及正在进行中的适合一年经验以上前端开发者的进阶指南</p>
							</p>
						</div>
						<div class="text-center">
							<img class="code-img" style="width: 400px" src="https://yck-1254263422.cos.ap-shanghai.myqcloud.com/20191223215610.jpeg">
						</div>

					</div>
				</div>
                `
      );
    },
    getCookie(name = "rec_id") {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2)
        return parts
          .pop()
          .split(";")
          .shift();
    },
    async fetch() {
      const { data } = await axios.get(
        `https://api.yuchengkai.cn/getSubscribedStatus?token=${this.token}`
      );
      if (data) {
        if (data.locked) {
          this.$nextTick(() => {
            if (this.locked) {
              this.timer1 = null;
              this.locked = false;
              const content = document.querySelector(".content");
              content.removeChild(document.querySelector("#locker"));
              this.content.forEach((item, index) => {
                if (index > 15) content.appendChild(item);
              });
              setTimeout(() => {
                clearInterval(this.timer);
              }, 20000);
            }
          });
        } else {
          if (!this.locked) {
            this.locked = true;
            this.timer1 = setTimeout(() => {
              this.lock();
              if (!this.timer) {
                this.timer = setInterval(() => {
                  this.change();
                  this.fetch();
                }, 5000);
              }
            }, 2000);
          }
        }
      }
    }
  }
};
</script>
