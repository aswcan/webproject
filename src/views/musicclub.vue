<template>
  <div class="box">
    <h1>音乐馆</h1>
    <div class="banner">
      <el-carousel :interval="4000" type="card" height="16vw">
        <el-carousel-item v-for="(item, index) in bannerurl" :key="index">
          <img :src="item.imageUrl">
        </el-carousel-item>
      </el-carousel>
    </div>
    <h4>精品歌单</h4>
    <el-row :gutter="20">
      <el-col :span="4" v-for="(item,index) in highquality" :key="index">
        <router-link :to="`/songlist?id=${highquality[index].id}`" @click.native="click5(index)" tag="span">
          <div class="grid-content bg-purple listss">
            <img :src="item.coverImgUrl">
            <div class="mask">
              <img src="../img/播放.png" alt="" @click.stop="click5btn(index)">
            </div>
          </div>
          <div class="listtxt">{{ item.name }}</div>
        </router-link>
      </el-col>
    </el-row>
    <h4>推荐电台</h4>
    <el-row :gutter="20">
      <el-col :span="4" v-for="(item,index) in categories" :key="index">
        <router-link to="/radiolist?id=" tag="span">
          <div class="grid-content bg-purple listss">
            <img :src="item.picUrl">
            <div class="mask">
              <img src="../img/播放.png">
            </div>
          </div>
          <div class="listtxt">{{ item.name }}</div>
        </router-link>
      </el-col>
    </el-row>
    <h4>推荐MV</h4>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item,index) in mvs" :key="index">
        <router-link to="/radiolist?id=" tag="span">
          <div class="grid-content bg-purple listss">
            <img :src="item.picUrl">
            <div class="playcount"><i class="icon iconfont icon-24gl-play"></i>{{item.playCount}}</div>
            <div class="mask">
              <img src="../img/播放.png">
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
  name: 'musicclub',
  data () {
    return {
      // 精品歌单列表
      highquality: [],
      // 轮播图
      bannerurl: [],
      // 电台
      categories: [],
      // MV
      mvs: []
      // 电台节目
      // radios: []
    }
  },
  methods: {
    async fresh () {
      // banner
      const res2 = await $axios.get('/banner')
      // console.log(res2)
      this.bannerurl = res2.data.banners
      // 精品歌单
      const res1 = await $axios.get('/top/playlist/highquality?limit=6')
      this.highquality = res1.data.playlists
      // console.log(res1)
      // 推荐电台
      const res3 = await $axios.get('/personalized/djprogram')
      this.categories = res3.data.result
      // console.log(res3)
      // mv
      const res4 = await $axios.get('/personalized/mv')
      this.mvs = res4.data.result
      console.log(res4)
    },
    // async search (index) {

    //   this.radios = res.data.djRadios
    // },
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
  .banner{
    width: 100%;
    margin: 20px auto;
  }
  h1{
    font-size: 2rem;
    margin: 0;
  }
  el-radio-button{
    background: black !important;
  }
  .el-carousel__item{
    display: flex;
    border-radius: 5px;
    img{
      width: 100%;
    }
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
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
  }
  .bg-purple {
    background: linear-gradient( 45deg, rgb(61, 61, 63)50%, rgb(10, 10, 10));
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
    .playcount{
      position: absolute;
      bottom: 4px;
      right: 4px;
      border-radius: 2px;
      padding: 5px;
      background: rgb(77, 77, 77);
    }
    .mask{
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      opacity: 0;
      &:hover{
        background: rgba($color: #000000, $alpha: .5);
        opacity: 1;
        transition: 0.1s linear;
      }
      img{
        width: 2.5rem;
        height: 2.5rem;
      }
    }
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
  .listtxt{
    height: 16px;
    overflow: hidden;
    font-size: 12px;
    margin-bottom: 1.875rem;
  }
}
</style>
