<template>
  <div class="box">
    <h1>推荐</h1>
    <h4>hi 今日为你推荐</h4>
    <el-row :gutter="20">
      <!-- 每日推荐 -->
      <el-col :span="8">
        <div class="grid-content bg-purple personal-radio" style="height:12.5vw; min-height: 90px; min-width: 200px">
          <img  class="img1" :src="guesssongs[0].al.picUrl">
          <div class="txt">
            <h4>{{ guesssongs[0].al.name }}</h4>
            <p>{{ guesssongs[0].ar[0].name }}</p>
          </div>
          <div class="mask"><img src="../img/播放.png" @click="click1btn"></div>
        </div>
      </el-col>
      <!-- 猜你喜欢 -->
      <el-col :span="4">
        <router-link :to="`/songlist?id=${dailysongs.id}`" tag="span">
          <div class="grid-content bg-purple daliy30">
            <img :src="dailysongs.picUrl">
            <div class="mask"><img src="../img/播放.png" @click.stop="click2btn"></div>
          </div>
        </router-link>
      </el-col>
      <!-- 百万收藏 -->
      <el-col :span="4">
        <router-link :to="`/songlist?id=${million.id}`" tag="span">
          <div class="grid-content bg-purple millionslike">
            <img :src="million.coverImgUrl">
            <div class="mask"><img src="../img/播放.png" @click.stop="click3btn"></div>
          </div>
        </router-link>
      </el-col>
      <!-- 新歌速递 -->
      <el-col :span="4">
        <router-link :to="`/songlist?id=${newsongs.id}`" tag="span">
          <div class="grid-content bg-purple newsongs">
            <img :src="newsongs.picUrl">
            <div class="mask"><img src="../img/播放.png" @click.stop="click4btn"></div>
          </div>
        </router-link>
      </el-col>
    </el-row>
    <h2>你的私荐歌单</h2>
    <el-row :gutter="20">
      <el-col :span="4" v-for="(item,index) in songlist" :key="index">
        <router-link :to="`/songlist?id=${songlist[index].id}`" tag="span">
          <div class="grid-content bg-purple listss">
            <img :src="item.picUrl">
            <div class="mask">
              <img src="../img/播放.png" alt="" @click.stop="click5btn(index)">
            </div>
          </div>
          <div class="listtxt">{{ item.name }}</div>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import $axios from '../utils/request'
export default {
  name: 'suggest',
  data () {
    return {
      guesssongs: {},
      newsongs: {},
      dailysongs: {},
      million: {},
      songlist: {}
    }
  },
  methods: {
    async fresh () {
      // 猜你喜欢板块
      const res1 = await $axios.get('/recommend/songs')
      this.guesssongs = res1.data.data.dailySongs
      // 每日推荐板块
      const res2 = await $axios.get('/personalized')
      this.dailysongs = res2.data.result[0]
      // 百万收藏板块
      const res3 = await $axios.get('/top/playlist?limit=1')
      this.million = res3.data.playlists[0]
      console.log(this.million)
      // 新歌推荐板块
      this.newsongs = res2.data.result[1]
      // 推荐歌单板块
      const res5 = await $axios.get('/recommend/resource')
      this.songlist = res5.data.recommend
      console.log(this.songlist)
    },
    // 播放猜你喜欢全部歌曲
    click1btn () {
      const tracks = this.guesssongs
      this.$store.commit('setplaylist', tracks)
      this.$store.commit('playfromthis', 0)
    },
    // 播放每日推荐
    async click2btn () {
      // 拿到id后通过id获取到对应歌单
      const list = await $axios.get('/playlist/detail?id=' + this.dailysongs.id)
      console.log(list)
      // 将歌单数组存储到vuex中
      this.$store.commit('setplaylist', list.data.playlist.tracks)
      // 调用播放方法，从头开始播放
      this.$store.commit('playfromthis', 0)
    },
    // 播放百万收藏
    async click3btn () {
      const list = await $axios.get('/playlist/detail?id=' + this.million.id)
      this.$store.commit('setplaylist', list.data.playlist.tracks)
      this.$store.commit('playfromthis', 0)
    },
    // 播放新歌推荐
    async click4btn () {
      const list = await $axios.get('/playlist/detail?id=' + this.newsongs.id)
      this.$store.commit('setplaylist', list.data.playlist.tracks)
      this.$store.commit('playfromthis', 0)
    },
    // 播放对应的推荐歌单
    async click5btn (index) {
      const list = await $axios.get('/playlist/detail?id=' + this.songlist[index].id)
      this.$store.commit('setplaylist', list.data.playlist.tracks)
      this.$store.commit('playfromthis', 0)
    }
  },
  mounted () {
    this.fresh()
  }
}
</script>
<style lang="scss" scoped>
.box{
  width: 100%;
  height: 100%;
  min-width: 750px;
  h1{
    font-size: 2rem;
    margin: 0;
  }
  h2{
    margin-top: 3.125rem;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    height: 15vw;
    min-height: 200px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: linear-gradient( 45deg, rgb(55, 55, 80)50%, rgb(32, 32, 37));
    display: flex;
    align-items: center;
    position: relative;
    font-size: 14px;
    img{
      width: 100%;
      height: auto;
      max-height: 100%;
      border-radius: 4px;
    }
    .img1{
      margin: 0 40px;
      width: 25%;
      height: 50%;
    }
    .txt{
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
    }
    .mask{
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: black;
      border-radius: 4px;
      opacity: 0;
      &:hover{
        opacity: 0.4;
        transition: 0.1s linear;
      }
      img{
        width: 2.5rem;
        height: 2.5rem;
      }
    }
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-width: 90px;
    cursor: pointer;
    &:hover{
      transform: translateY(-10px);
      transition: 0.2s ease;
      color: rgb(179, 215, 231);
    }
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .personal-radio::after{
    position: absolute;
    top: 100%;
    content: '猜你喜欢';
  }
  .daliy30::after{
    position: absolute;
    top: 100%;
    content: '每日30首';
  }
  .millionslike::after{
    position: absolute;
    top: 100%;
    content: '百万收藏';
  }
  .newsongs::after{
    position: absolute;
    top: 100%;
    content: '新歌推荐';
  }
  .listtxt{
    height: 16px;
    overflow: hidden;
    font-size: 12px;
    margin-bottom: 1.875rem;
  }
}
</style>
