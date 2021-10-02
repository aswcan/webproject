<template>
  <div class="listbody">
    <div class="top">
      <img :src="radiodetail.picUrl">
      <div class="top-right">
        <h1>{{ radiodetail.name }}</h1>
        <h4>作者：{{ radiodetail.dj.nickname }}</h4>
        <h5>{{ radiodetail.desc }}</h5>
        <el-button type="info" round class="btn"><i class="icon iconfont icon-24gl-play"></i>播放</el-button>
      </div>
    </div>
    <table>
      <thead>
        <td></td>
        <td>节目</td>
        <td>频道</td>
      </thead>
      <tbody>
        <tr v-for="(song,index) in radiolist" :key="index" class="listbar">
          <td>{{ index+1 }}</td>
          <td>
            <i class="icon iconfont icon-xihuan" @click.stop="like(index)" :class="liked[index] == true?'likedstyle':''"></i>
            {{ song.name }}
          </td>
          <td>{{ song.channels[0] }}</td>
          <td><i class="icon iconfont icon-24gl-play" @click="playfromthis(index)"></i></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import $axios from '../../utils/request'
export default {
  name: 'radiolist',
  data () {
    return {
      liked: [],
      // list
      radiodetail: {},
      radiolist: [],
      count: 0,
      radiourls: []
    }
  },
  methods: {
    async pageloading () {
      //  接收path地址中传过来的id
      console.log(this.$route.query.id)
      const radio = await $axios('/dj/detail?rid=' + this.$route.query.id)
      console.log(radio)
      // 将电台详情存入data
      this.radiodetail = radio.data.data
      const radiolist = await $axios(`/dj/program?rid=${this.$route.query.id}`)
      console.log(radiolist)
      // 将电台节目列表存入data
      this.radiolist = radiolist.data.programs
      for (let index = 0; index < this.radiolist.length; index++) {
        const id = this.radiolist[index].id
        const radiourl = await $axios.get('/song/url?id=' + id)
        console.log(radiourl)
      }
    },
    like (i) {
      if (this.liked[i] === undefined) {
        this.$set(this.liked, i, true)
      } else {
        this.$set(this.liked, i, false)
      }
    },
    playfromthis (i) {
      const tracks = this.radiolist
      this.$store.commit('setplaylist', tracks)
      this.$store.commit('playfromthis', i)
    }
  },
  created () {
    // this.pageloading()
  },
  mounted () {
    // console.log(this.$store.state.radiolist)
    this.pageloading()
  },
  updated () {
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
    .btn{
      width: 150px;
      span{
        height: 100%;
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
