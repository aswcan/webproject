<template>
  <div class="scroll">
    <div class="divtag">在线音乐</div>
    <ul class="onlinemusic list">
      <router-link to="/suggest" active-class="active"><li><i class="icon iconfont icon-tuijian"></i>推荐</li></router-link>
      <router-link to="/diantai" active-class="active"><li><i class="icon iconfont icon-miantubiao_diantai"></i>电台</li></router-link>
      <router-link to="/musicclub" active-class="active"><li><i class="icon iconfont icon-SanMiAppglyphico3"></i>音乐馆</li></router-link>
      <router-link to="/mvs" active-class="active"><li><i class="icon iconfont icon-shipin"></i>视频</li></router-link>
    </ul>
    <div class="divtag">我的歌单</div>
    <ul class="mymusiclist list">
      <li v-for="(item,index) in this.$store.state.userlist" :key="index" :class="'mylist'" @click="jumpTo(item.id)">{{ item.name }}</li>
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
    // 弹出播放列表
    handleClick (tab, event) {
      console.log(tab, event)
    },
    jumpTo (id) {
      this.$router.push('/songlist?id=' + id)
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
    overflow: hidden;
    min-width: 60px;
  }
  .list{
    list-style: none;
    padding: 0;
    min-width: 4.375rem;
    .active{
      li{
        background: rgb(194, 193, 193);
      }
    }
    a{
      text-decoration: none;
      color: #000;
    }
    li{
      height: 1.875rem;
      list-style: none;
      margin: 10px 0;
      padding: 5px;
      line-height: 1.875rem;
      border-radius: 5px;
      text-decoration: none;
      overflow: hidden;
      &:hover{
        background: rgb(235, 234, 234);
      }
      i{
        margin:0 15px 0 10px;
        border-radius: 50%;
      }
    }
  }
  .mymusiclist{
    background: rgb(206, 206, 206);
    border-radius: 5px;
    .mylist{
      font-size: 12px;
    }
  }
  .actives{
    background: rgb(235, 235, 235);
  }
}
</style>
