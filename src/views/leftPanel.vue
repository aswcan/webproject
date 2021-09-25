<template>
  <div class="scroll">
    <div class="divtag">在线音乐</div>
    <ul class="onlinemusic list">
      <router-link to="/suggest" active-class="active"><li><i class="icon iconfont icon-tuijian"></i>推荐</li></router-link>
      <router-link to="/" active-class="active"><li><i class="icon iconfont icon-miantubiao_diantai"></i>电台</li></router-link>
      <router-link to="/" active-class="active"><li><i class="icon iconfont icon-SanMiAppglyphico3"></i>音乐馆</li></router-link>
      <router-link to="/" active-class="active"><li><i class="icon iconfont icon-shipin"></i>视频</li></router-link>
    </ul>
    <div class="divtag">我的音乐</div>
    <ul class="mymusic list">
      <router-link to="/" active-class="active"><li><i class="icon iconfont icon-xihuan"></i>我的喜欢</li></router-link>
      <router-link to="/" active-class="active"><li><i class="icon iconfont icon-bendi"></i>本地和下载</li></router-link>
      <router-link to="/" active-class="active"><li><i class="icon iconfont icon-SanMiAppglyphico4"></i>播放历史</li></router-link>
      <router-link to="/" active-class="active"><li><i class="icon iconfont icon-SanMiAppglyphico2"></i>试听列表</li></router-link>
      <router-link to="/" active-class="active"><li><i class="icon iconfont icon-yigou"></i>视频</li></router-link>
    </ul>
    <div class="divtag">创建的歌单</div>
    <ul class="mymusiclist list">
      <li></li>
    </ul>
    <div class="divtag">收藏的歌单</div>
    <ul class="otherslist list">
      <li></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'leftpanel',
  data () {
    return {
      activeName: 'second',
      tabPosition: 'left'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style lang="scss" scoped>
.scroll{
  padding: 0 20px;
  .divtag{
    font-size: 12px;
    opacity: 0.7;
  }
  .list{
    list-style: none;
    padding: 0;
    a{
      text-decoration: none;
      color: snow;
    }
    li{
      height: 1.875rem;
      list-style: none;
      margin: 10px 0;
      padding: 5px;
      line-height: 1.875rem;
      border-radius: 15px;
      text-decoration: none;
      &:hover{
        background: rgb(99, 99, 109);
      }
      i{
        margin:0 15px 0 10px;
        border-radius: 50%;
        .icon-shipin{
          border: 1px solid snow;
        }
      }
    }
  }
  .active{
    background: rgb(99, 99, 109);
  }
}
</style>
