<template>
  <div class="listbody">
    <div class="top">
      <div class="top-right">
        <h1>搜索结果</h1>
        <h4>部分歌曲可能需要登录，会员才可以播放</h4>
        <div class="btn"><button @click="playfromthis(0)"><i class="icon iconfont icon-24gl-play"></i>播放全部</button></div>
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
        <tr v-for="(song,index) in musiclist" :key="index">
          <td>{{ index+1 }}</td>
          <td>
            <i class="icon iconfont icon-xihuan" @click.stop="like(index)" :class="liked[index] == true?'likedstyle':''"></i>
            {{ song.name }}
          </td>
          <td><span v-for="(ar,index) in song.ar" :key="index">{{ ar.name }}</span></td>
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
  name: 'searchlist',
  data () {
    return {
      liked: [],
      // list
      musiclist: {}
    }
  },
  methods: {
    async pageloading () {
      //  接收path地址中传过来的id
      console.log(this.$route.query.keywords)
      const res = await $axios.get(`/cloudsearch?keywords=${this.$route.query.keywords}`)
      console.log(res)
      this.musiclist = res.data.result.songs
    },
    like (i) {
      if (this.liked[i] === undefined) {
        this.$set(this.liked, i, true)
      } else {
        this.$set(this.liked, i, false)
      }
    },
    playfromthis (i) {
      const tracks = this.musiclist
      this.$store.commit('setplaylist', tracks)
      this.$store.commit('playfromthis', i)
      // console.log(this.$store.state.playsrc)
      // console.log(this.$store.state.index)
    }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.pageloading()
      },
      // 深度观察监听
      deep: true
    }
  },
  mounted () {
    // console.log(this.$store.state.musiclist)
    this.pageloading()
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
    height: 20%;
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
      height: 20%;
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
