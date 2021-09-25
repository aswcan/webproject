<template>
  <div class="listbody">
    <div class="top">
      <img :src="musiclistcoversrc">
      <div class="top-right">
        <h1>{{ musiclistname }}</h1>
        <h4>{{ muisiclistcreator }}</h4>
        <h5>{{ musiclistdiscrip }}</h5>
        <div class="btn"><button @click="playall"><i class="icon iconfont icon-24gl-play"></i>播放全部</button><button>收藏</button></div>
      </div>
    </div>
    <table>
      <thead>
        <td></td>
        <td>歌名</td>
        <td>歌手</td>
        <td>专辑</td>
      </thead>
      <tbody>
        <tr v-for="(song,index) in musiclist.tracks" :key="index">
          <td>{{ index+1 }}</td>
          <td>
            <i class="icon iconfont icon-xihuan" @click.stop="like(index)" :class="liked[index] == true?'likedstyle':''"></i>
            {{ song.name }}
          </td>
          <td>{{ song.ar[0].name }}</td>
          <td>{{ song.al.name }}</td>
          <td><i class="icon iconfont icon-24gl-play" @click="playfromthis(index)"></i></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
// import $axios from '../utils/request'
export default {
  name: 'songlist',
  data () {
    return {
      liked: [],
      // list
      musiclist: {},
      musiclistcoversrc: '',
      musiclistname: '',
      muisiclistcreator: '',
      musiclistdiscrip: '',
      musiclistid: ''
    }
  },
  methods: {
    pageloading () {
      // 接受sessionStorage中传来的数据
      this.musiclist = JSON.parse(sessionStorage.getItem('musiclist'))
      console.log(this.musiclist)
      this.musiclistcoversrc = JSON.parse(sessionStorage.getItem('musiclistcoversrc'))
      this.musiclistname = JSON.parse(sessionStorage.getItem('musiclistname'))
      this.muisiclistcreator = JSON.parse(sessionStorage.getItem('musiclistcreator'))
      console.log(this.muisiclistcreator)
      this.musiclistdiscrip = JSON.parse(sessionStorage.getItem('musiclistdiscrip'))
      this.musiclistid = JSON.parse(sessionStorage.getItem('musiclistid'))
    },
    like (i) {
      if (this.liked[i] === undefined) {
        this.$set(this.liked, i, true)
      } else {
        this.$set(this.liked, i, false)
      }
    },
    async playall () {
      const tracks = this.musiclist.tracks
      const playarray = []
      tracks.forEach((number) => {
        console.log(number)
        // const playurl = await $axios('')
      })
      console.log(playarray)
    },
    playfromthis (i) {
    }
  },
  created () {
    this.pageloading()
  },
  mounted () {
    // console.log(this.$store.state.musiclist)
  }
}
</script>
<style lang="scss" scoped>
.listbody{
  width: 100%;
  height: 100%;
  min-width: 800px;
  .top{
    height: 25%;
    display: flex;
    flex-direction: row;
    .top-right{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 0 10px;
      height: 100%;
      width: 100%;
    }
    img{
      height: 100%;
      border-radius: 6px;
    }
    h1,h4,h5{
      margin: 10px;
    }
    .btn{
      height: 15%;
      margin: 10px;
      button{
        width: 150px;
        height: 100%;
        border-radius: 20px;
      }
    }
  }
  table{
    width: 100%;
    min-width: 800px;
    margin: 10px 0;
    thead{
      font-size: 12px;
      color: rgb(175, 175, 175);
    }
    tbody{
      font-size: 14px;
      line-height: 40px;
      i{
        color: rgb(190, 190, 190);
      }
      .likedstyle{
        color: red;
      }
    }
  }
}
</style>
