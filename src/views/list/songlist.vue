<template>
  <div class="listbody">
    <div class="top">
      <img :src="musiclist.coverImgUrl">
      <div class="top-right">
        <h1>{{ musiclist.name }}</h1>
        <h4>{{ musiclist.creator.nickname }}</h4>
        <h5>{{ musiclist.description }}</h5>
        <div class="btn"><button @click="playfromthis(0)"><i class="icon iconfont icon-24gl-play"></i>播放全部</button><button>收藏</button></div>
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
        <tr v-for="(song,index) in musiclist.tracks" :key="index" class="listbar">
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
import $axios from '../../utils/request'
export default {
  name: 'songlist',
  data () {
    return {
      liked: [],
      // list
      musiclist: {},
      isshow: false
    }
  },
  methods: {
    async pageloading () {
      //  接收path地址中传过来的id
      console.log(this.$route.query.id)
      const list = await $axios('/playlist/detail?id=' + this.$route.query.id)
      console.log(list)
      this.musiclist = list.data.playlist
    },
    like (i) {
      if (this.liked[i] === undefined) {
        this.$set(this.liked, i, true)
      } else {
        this.$set(this.liked, i, false)
      }
    },
    playfromthis (i) {
      const tracks = this.musiclist.tracks
      this.$store.commit('setplaylist', tracks)
      this.$store.commit('playfromthis', i)
      // console.log(this.$store.state.playsrc)
      // console.log(this.$store.state.index)
    }
  },
  created () {
    // this.pageloading()
  },
  mounted () {
    // console.log(this.$store.state.musiclist)
    this.pageloading()
  },
  updated () {
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.pageloading()
      },
      // 深度观察监听
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
.listbody{
  width: 100%;
  height: 100%;
  min-width: 800px;
  i{
    cursor: pointer;
  }
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
    h5{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .btn{
      height: 15%;
      margin: 10px;
      button{
        width: 150px;
        height: 100%;
        border-radius: 20px;
        cursor: pointer;
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
      .listbar{
        &:hover{
          background: rgb(94, 91, 87);
        }
      }
    }
  }
}
</style>
