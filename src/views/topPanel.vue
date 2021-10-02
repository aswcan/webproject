<template>
  <div class="div1">
    <div class="left">
      <!-- goback -->
      <i class="el-icon-arrow-left"></i>
      <!-- next -->
      <i class="el-icon-arrow-right"></i>
      <!-- 输入框 -->
      <div class="inpt" @click="input">
        <i class="el-icon-search" :style="contentstyle" v-text="inputxt"></i>
        <input type="text" v-focus='focusState' v-show="inputshow" @blur="unfocus" v-model="keywords" @keyup.enter="searchmusic(keywords)"/>
      </div>
    </div>
    <!-- 右侧组件 -->
    <div class="right">
      <!-- 头像 -->
      <img :src="imgSrc" class="user" title="用户" @click="loginshow = !loginshow"/>
      <!-- 用户ID -->
      <h5 class="userId" title="用户ID" @click="loginshow = !loginshow">lenlen</h5>
      <!-- 登录界面 -->
      <div class="login" v-if="loginshow" draggable="true">
        <div class="shutdown" @click="loginshow = false">×</div>
        <div class="logintoggle">
          <!-- <router-link to="/suggest/login" class="login-phone" tag="span" active-class="togglestyle">手机登录</router-link>
          <router-link to="/suggest/loginewm"
          class="login-erweima"
          tag="span"
          active-class="togglestyle"
          >二维码登录</router-link> -->
          <span class="login-phone" @click="tabshow=true" :class="tabshow==true?'togglestyle':''">手机登录</span>
          <span class="login-erweima" @click="tabshow=false" :class="tabshow==!true?'togglestyle':''">二维码登录</span>
        </div>
        <div class="phonediv" v-show="tabshow">
          <h3>帐号密码登录</h3>
          <p>推荐使用手机扫码登录，防止盗号</p>
          <el-input
            class="inputtag"
            placeholder="请输入手机号"
            v-model="phoneinput"
            clearable>
          </el-input>
          <el-input class="inputtag" placeholder="请输入密码" v-model="mimainput" show-password @keyup.enter.native="loginselphone"></el-input>
          <el-button type="primary" class="loginbtn" @click.native="loginselphone">登录</el-button>
        </div>
        <div class="ewmdiv" v-show="!tabshow" @click="getewm">
          <img :src="ewmsrc" alt="点击刷新图片">
          <div class="notice">请使用网易云音乐app扫码登陆</div>
        </div>
        <div class="alink">
          <a href="https://aq.qq.com/v2/uv_aq/html/reset_pwd/pc_reset_pwd_input_account.html?v=3.0&old_ver_account=">忘记密码？</a>
          <a href="https://ssl.zc.qq.com/v3/index-chs.html?from=pt">注册新账号</a>
          <a href="https://support.qq.com/products/77942?customInfo=.appid100497308">意见反馈</a>
        </div>
      </div>
      <!-- 了解更多 -->
      <i class="el-icon-more dot" title="了解更多" @click="toggleMore"></i>
      <div class="more" v-if="moreshow">
        <p>作者：lenlen</p>
        <a href="https://github.com/aswcan"><i class="icon iconfont icon-github"></i><span>:</span><span>aswcan</span></a><br>
        <a href="javascript:;" class="btn" data-clipboard-text="http://47.95.192.147:8090/" @click="copy"><i class="icon iconfont icon-boke"></i><span>:</span><span>个人博客</span></a><br>
        <a href="javascript:;" class="btn" data-clipboard-text="dongwenhao833@gmail.com" @click="copy"><i class="icon iconfont icon-youxiang2"></i><span>:</span><span>cilck to copy</span></a><br>
        <a href="javascript:;" class="btn" data-clipboard-text="25882052201" @click="copy"><i class="icon iconfont icon-qq"></i><span>:</span><span>2583279068</span></a><br>
        <a href="javascript:;" class="btn" data-clipboard-text="aihenenaini" @click="copy"><i class="icon iconfont icon-weixin"></i><span>:</span><span>aihenenaini</span></a><br>
        <img src="../img/wx.jpg" alt="wx" class="erweima">
        <h5>感谢您访问本站</h5>
        <span>如果您有任何的问题，欢迎添加（点击即可复制）我的微信、QQ或者邮箱，我们可以一起交流学习，如果您觉得这个网页做的还不错的话，希望您能给这个项目点一个star，谢谢</span>
      </div>
    </div>
  </div>
</template>
<script>
import Clipboard from 'clipboard'
import $axios from '../utils/request'
export default {
  name: 'toppanel',
  data () {
    return {
      // 头像地址
      imgSrc: require('../img/sona.png'),
      // 输入框设置
      contentstyle: { width: '11.5rem' },
      // 输入框
      inputxt: '请输入内容',
      inputshow: 'false',
      focusState: false,
      // 更多
      moreshow: false,
      // 登录界面
      loginshow: false,
      tabshow: true,
      // 二维码登录
      ewmsrc: '',
      // 手机登录
      phoneinput: '',
      mimainput: '',
      // 搜索框
      keywords: '',
      // 登录结果
      userId: ''
    }
  },
  methods: {
    // 输入框方法
    input () {
      this.inputshow = 'true'
      this.contentstyle = { width: '0rem', left: '12rem' }
      this.inputxt = ''
      this.focusState = true
    },
    unfocus () {
      this.inputshow = 'false'
      this.contentstyle = {}
      this.inputxt = '请输入内容'
      this.focusState = false
    },
    toggleMore () {
      this.moreshow = !this.moreshow
    },
    copy () {
      var clipboard = new Clipboard('.btn')
      clipboard.on('success', function (e) {
        console.log(e)
      })
      clipboard.on('error', function (e) {
        console.log(e)
      })
    },
    async searchmusic (keywords) {
      this.$router.push(`/searchlist?keywords=${keywords}`)
      console.log(keywords)
      this.keywords = ''
    },
    async CheckStatus (unikey) {
      const res = await $axios.get(`/login/qr/check?key=${unikey}&timerstamp=${Date.now()}`)
      return res.data
    },
    async getewm () {
      const res = await $axios.get(`/login/qr/key?timerstamp=${Date.now()}`)
      const unikey = res.data.data.unikey
      const res2 = await $axios.get(`/login/qr/create?key=${unikey}&qrimg=true&timerstamp=${Date.now()}`)
      this.ewmsrc = res2.data.data.qrimg
      const timer = setInterval(async () => {
        const statusRes = await this.CheckStatus(unikey)
        if (statusRes.code === 800) {
          alert('二维码已过期,请重新获取')
          clearInterval(timer)
        }
        if (statusRes.code === 803) {
          // 这一步会返回cookie
          console.log(statusRes)
          clearInterval(timer)
          alert('授权登录成功')
          this.loginshow = false
          const accountDetail = await $axios.get('/user/account')
          this.userId = accountDetail.data.account.id
          const playlists = await $axios.get('/user/playlist?uid=' + this.userId)
          this.$store.state.userlist = playlists.data.playlist
          console.log(accountDetail)
        }
      }, 3000)
    },
    async loginselphone () {
      if (this.mimainput === '' || this.phoneinput === '') {
        alert('请输入手机号和密码')
      } else {
        const res = await $axios.post(`/login/cellphone?phone=${this.phoneinput}&password=${this.mimainput}`)
        console.log(res)
        alert('登录成功')
        this.userId = res.data.account.id
        this.loginshow = false
        const playlists = await $axios.get('/user/playlist?uid=' + this.userId)
        this.$store.state.userlist = playlists.data.playlist
        console.log(playlists)
      }
    }
  },
  directives: {
    focus: {
      // 指令的定义
      update: function (el, { value }) {
        if (value) {
          el.focus()
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.div1 {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background: #909399;
  align-items: center;
  i {
    width: 2em;
    height: 2em;
    &::before {
      font-size: 1em;
      line-height: 2rem;
      text-align: center;
    }
  }
  .left{
    height: 60px;
    display: flex;
    align-items: center;
    margin: 0 20px;
    // .el-icon-arrow-left,
    // .el-icon-arrow-right {
    //   width: 2em;
    //   height: 2em;
    //   &::before {
    //     font-size: 1em;
    //     line-height: 2rem;
    //     text-align: center;
    //   }
    // }
    .inpt {
      position: relative;
      width: 12.5rem;
      height: 2.1875rem;
      background:#948487;
      border-radius: 35px;
      // padding: 0 1.09375rem;
      input {
        width: 12.5rem;
        height: 2.1875rem;
        border-radius: 35px;
        font-size: 16px;
        line-height: 2.1875rem;
        outline: none;
        border: none;
        color: white;
        background: #948487;
        padding: 0 .875rem;
      }
      .el-icon-search{
        position: absolute;
        left: 1rem;
        width: 100%;
        height: 0;
      }
    }
  }
  .right{
    margin: 0;
    display: flex;
    align-items: center;
    .userId{
      display: inline-block;
      margin-right:.75rem;
      cursor: pointer;
    }
    .user {
      width: 2rem;
      height: 2rem;
      margin-right:.75rem;
      border-radius: 50%;
      float: right;
      cursor: pointer;
    }
    .login{
      display: flex;
      align-items: center;
      flex-direction: column;
      position: absolute;
      top: 6.25rem;
      left: 35%;
      width: 31.25rem;
      height: 28rem;
      background: rgb(255, 255, 255);
      border-radius: 10px;
      box-shadow: 4px 6px 8px #444444,
      inset 0px 0px 1px #3b3b3b;
      z-index: 10;
      .shutdown{
        position: absolute;
        left: 95%;
        padding: 5px;
        color: #000;
        cursor: pointer;
      }
      .logintoggle{
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 17rem ;
        height: 2rem;
        background: rgb(224, 224, 224);
        color: #000;
        margin-top: 3.75rem;
        padding: 2px;
        border-radius: 2rem;
        .togglestyle{
          background: white;
        }
        .login-phone,
        .login-erweima{
          height: 100%;
          width: 50%;
          border-radius: 2rem;
          text-align: center;
          line-height: 2rem;
        }
      }
      .ewmdiv{
        color: #000;
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
          width: 12.5rem;
          height: 12.5rem;
          margin-top: 2.5rem;
        }
        .notice{
          margin-top: .625rem;
          padding: 0 .625rem;
          height: 1.875rem;
          line-height: 1.875rem;
          background: rgb(224, 224, 224);
          border-radius: 2.5rem;
        }
      }
      .phonediv{
        width: 17rem ;
        color: #000;
        margin-top: 1.875rem;
        h3,p{
          text-align: center;
        }
        .inputtag{
          margin-top: .9375rem;
        }
        .loginbtn{
          margin-top: .9375rem;
          width: 100%;
        }
      }
      .alink{
        position: absolute;
        top: 95%;
        left: 60%;
        font-size: .75rem;
        a{
          margin-right: 8px;
          color: rgb(92, 92, 92);
        }
      }
    }
    .dot {
      position: relative;
      overflow: hidden;
      float: right;
      cursor: pointer;
    }
    .more{
      position: absolute;
      width: 10.9375rem;
      padding: 20px;
      border-radius: 8px;
      top: 3.125rem;
      right: .3125rem;
      background: rgb(66, 69, 75);
      box-shadow: 2px 2px 4px rgba(0, 0, 0, .12), 2px 0 6px rgba(0, 0, 0, .04);
      // opacity: 0.8;
      z-index: 1;
      a{
        text-decoration: none;
        color: rgb(211, 219, 223);
        span{
          margin-left: .625rem;
        }
        .icon{
          font-size: 1.875rem;
          line-height: 40px;
        }
      }
      .erweima{
        width: 10.9375rem;
      }
    }
  }
}
</style>
