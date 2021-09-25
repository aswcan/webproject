<template>
  <div class="main">
    <img :src="ewmsrc" alt="">
    <div class="notice">请使用网易云音乐app扫码登陆</div>
  </div>
</template>
<script>
import $axios from '../utils/request'
export default {
  name: 'ewmlogin',
  data () {
    return {
      ewmsrc: ''
    }
  },
  methods: {
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
          clearInterval(timer)
          alert('授权登录成功')
        }
      }, 3000)
    }
  },
  mounted () {
    this.getewm()
    console.log('ewm界面')
  }
}

</script>
<style lang="scss" scoped>
.main{
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
</style>
