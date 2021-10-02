<template>
  <div class="box">
    <h1>电台</h1>
    <el-carousel :interval="4000" type="card" height="16vw">
      <el-carousel-item v-for="(item, index) in bannerurl" :key="index">
        <img :src="item.pic">
      </el-carousel-item>
    </el-carousel>
    <h4>推荐</h4>
    <el-row :gutter="20">
      <!-- 每日推荐 -->
      <el-col :span="8">
        <div class="grid-content bg-purple personal-radio" style="height:12.5vw; min-height: 90px; min-width: 200px">
          <img  class="img1" :src="guessdj[0].picUrl">
          <div class="txt">
            <h4>{{ guessdj[0].name }}</h4>
            <p>{{ guessdj[0].dj.nickname }}</p>
          </div>
          <div class="mask"><img src="../img/播放.png"></div>
        </div>
      </el-col>
    </el-row>
    <h2>分类</h2>
    <el-radio-group v-model="radio" size="mini" :style="background">
      <el-radio-button :label="item.name" v-for="(item, index) in categories" :key="index" @click.prevent.native="search(index)"></el-radio-button>
    </el-radio-group>
    <el-row :gutter="20">
      <h4>{{ radio }}</h4>
      <el-col :span="4" v-for="(item,index) in radios" :key="index">
        <router-link :to="`/radiolist?id=${radios[index].id}`" tag="span">
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
  </div>
</template>
<script>
import $axios from '../utils/request'
export default {
  name: 'diantai',
  data () {
    return {
      guessdj: {},
      bannerurl: [],
      categories: [],
      radio: '',
      radios: [],
      background: {
        display: 'flex',
        boder: 'none'
      }
    }
  },
  methods: {
    async fresh () {
      // 推荐电台
      const res1 = await $axios.get('/dj/recommend')
      this.guessdj = res1.data.djRadios
      console.log(res1)
      // 推荐歌单板块
      const res5 = await $axios.get('/recommend/resource')
      this.songlist = res5.data.recommend
      // banner
      const res2 = await $axios.get('/dj/banner')
      this.bannerurl = res2.data.data
      // this.bannerurl = res.data.data
      // 电台节目
      const res3 = await $axios.get('/dj/catelist')
      this.categories = res3.data.categories
    },
    async search (index) {
      const id = this.categories[index].id
      const res = await $axios.get('/dj/recommend/type?type=' + id)
      this.radios = res.data.djRadios
    }
  },
  mounted () {
    this.fresh()
    this.search(0)
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
