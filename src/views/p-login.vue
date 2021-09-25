<template>
  <div class="slogin">
    <h3>帐号密码登录</h3>
    <p>推荐使用手机扫码登录，防止盗号</p>
    <el-input
      class="inputtag"
      placeholder="请输入手机号"
      v-model="phoneinput"
      clearable>
    </el-input>
    <el-input class="inputtag" placeholder="请输入密码" v-model="mimainput" show-password></el-input>
  </div>
</template>
<script>
export default {
  name: 'phonelogin',
  data () {
    return {
      phoneinput: '',
      mimainput: ''
    }
  },
  mounted () {
    console.log('手机登录界面')
  }
}
</script>
<style lang="scss" scoped>
.slogin{
  width: 17rem ;
  color: #000;
  margin-top: 1.875rem;
  h3,p{
    text-align: center;
  }
  .inputtag{
    margin-top: .9375rem;
  }
}
</style>
