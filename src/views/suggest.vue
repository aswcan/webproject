<template>
  <div class="box">
    <h1>推荐</h1>
    <h4>hi 今日为你推荐</h4>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple personal-radio">
          <img  class="img1" :src="guesssongs[0].al.picUrl">
          <div class="txt">
            <h4>{{ guesssongs[0].al.name }}</h4>
            <p>{{ guesssongs[0].ar[0].name }}</p>
          </div>
          <div class="mask"><img src="../img/播放.png" @click="click1btn"></div>
        </div>
      </el-col>
      <el-col :span="4">
        <router-link to="/songlist" @click.native="click2" tag="span">
          <div class="grid-content bg-purple daliy30">
            <img :src="dailysongs.coverImgUrl">
            <div class="mask"><img src="../img/播放.png" @click.stop="click2btn"></div>
          </div>
        </router-link>
      </el-col>
      <el-col :span="4">
        <router-link to="/songlist" @click.native="click3" tag="span">
          <div class="grid-content bg-purple millionslike">
            <img :src="million[0].songInfo.al.picUrl">
            <div class="mask"><img src="../img/播放.png" @click.stop="click3btn"></div>
          </div>
        </router-link>
      </el-col>
      <el-col :span="4">
        <router-link to="/songlist"  @click.native="click4" tag="span">
          <div class="grid-content bg-purple newsongs">
            <img :src="newsongs[0].album.blurPicUrl">
            <div class="mask"><img src="../img/播放.png" @click.stop="click4btn"></div>
          </div>
        </router-link>
      </el-col>
    </el-row>
    <h2>你的私荐歌单</h2>
    <el-row :gutter="20">
      <el-col :span="4" v-for="(item,index) in songlist" :key="index">
        <router-link to="/songlist" @click.native="click5(index)" tag="span">
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
      const res1 = await $axios.get('/recommend/songs')
      this.guesssongs = res1.data.data.dailySongs
      // console.log(res1)
      const res2 = await $axios('/personalized')
      const keyid = res2.data.result[0].id
      const res2list = await $axios('/playlist/detail?id=' + keyid)
      this.dailysongs = res2list.data.playlist
      // console.log(res2list)
      const res3 = await $axios.get('/playmode/intelligence/list?id=33894312&pid=24381616')
      this.million = res3.data.data
      // console.log(res3)
      const res4 = await $axios.get('/top/song')
      this.newsongs = res4.data.data
      // console.log(res4)
      const res5 = await $axios.get('/recommend/resource')
      this.songlist = res5.data.recommend
      // console.log(res5)
    },
    click2 () {
      // this.$store.commit('addplaylist', this.dailysongs)
      // this.$store.commit('addplayimgsrc', this.dailysongs.coverImgUrl)
      // this.$store.commit('addlistname', this.dailysongs.name)
      // this.$store.commit('adddiscrip', this.dailysongs.description)
      // this.$store.commit('addlistcreator', this.dailysongs.creator.nickname)
      const dailysong = JSON.stringify(this.dailysongs)
      const name = JSON.stringify(this.dailysongs.name)
      console.log(name)
      const description = JSON.stringify(this.dailysongs.description)
      console.log(description)
      const creator = JSON.stringify(this.dailysongs.creator.nickname)
      console.log(creator)
      const coverImgUrl = JSON.stringify(this.dailysongs.coverImgUrl)
      console.log(coverImgUrl)
      const id = JSON.stringify(this.dailysongs.id)
      sessionStorage.setItem('musiclist', dailysong)
      console.log(JSON.parse(sessionStorage.getItem('musiclist')))
      sessionStorage.setItem('musiclistname', name)
      sessionStorage.setItem('musiclistdiscrip', description)
      sessionStorage.setItem('musiclistcreator', creator)
      sessionStorage.setItem('musiclistcoversrc', coverImgUrl)
      sessionStorage.setItem('musiclistid', id)
      // console.log(this.$store.state.musiclist)
    },
    click3 () {
      this.$store.commit('addplaylist', this.million)
      console.log(this.$store.state.playlist)
    },
    click4 () {
      this.$store.commit('addplaylist', this.newsongs)
      console.log(this.$store.state.playlist)
    },
    click5 (index) {
      this.$store.commit('addplaylist', this.songlist[index])
      console.log(this.$store.state.playlist)
    },
    click1btn () {
      this.$store.commit('addplaylist', this.guesssongs)
      console.log(this.$store.state.playlist)
    },
    click2btn () {
      this.$store.commit('addplaylist', this.dailysongs)
      console.log(this.$store.state.playlist)
    },
    // click2btn () {
    // },
    click3btn () {
      this.$store.commit('addplaylist', this.million)
      console.log(this.$store.state.playlist)
    },
    click4btn () {
      this.$store.commit('addplaylist', this.newsongs)
      console.log(this.$store.state.playlist)
    },
    click5btn (index) {
      this.$store.commit('addplaylist', this.songlist[index])
      console.log(this.$store.state.playlist)
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
      width: 25%;
      height: 50%;
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
    height: 180px;
    min-width: 180px;
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
