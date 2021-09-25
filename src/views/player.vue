<template>
  <div class="playerpanel">
    <el-drawer
    title="我是标题"
    :visible.sync="drawer"
    :with-header="false"
    :model="true">
      <table>
        <thead>
          <tr>
            <th>歌曲</th><th>歌手</th><th>专辑</th><th>时长</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(song,index) in this.$store.state.playlist" :key="index">
            <td>{{ song.name }}</td><td v-for="(artist,indexs) in this.$store.state.playlist" :key="indexs"></td><td></td><td></td>
          </tr>
        </tbody>
      </table>
    </el-drawer>
    <audio :src="this.$store.state.playsrc" ref="myaudio" @ended="this.$store.commit('playfromthis', this.$store.state.index)"></audio>
    <div class="roundpic">
      <img src="">
    </div>
    <div class="left">
      <div class="like">
        <i class="icon iconfont icon-xihuan" @click="liked = !liked" :class="liked == true?'liked':''"></i>
      </div>
      <div class="playdiv">
        <div></div>
        <div class="linebar"></div>
        <i class="icon iconfont icon-houtui"></i>
        <i class="icon iconfont icon-bofang" @click="musicplay"></i>
        <i class="icon iconfont icon-zanting" v-show="false" @click="musicpause"></i>
        <i class="icon iconfont icon-kuaijin"></i>
      </div>
      <div>
        <i class="icon iconfont icon-xunhuanbofang" @click="drawer = true"></i>
        <i class="icon iconfont icon-suijibofang"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'player',
  data () {
    return {
      liked: false,
      drawer: false
    }
  },
  methods: {
    musicplay () {
      this.$refs.myaudio.play()
    },
    musicpause () {
      this.$refs.myaudio.pause()
    }
  }
}
</script>
<style lang="scss" scoped>
.playerpanel{
  display: flex;
  align-items: center;
  padding: 0 20px;
  audio{
  visibility: hidden;
  }
  .roundpic{
    height: 5rem;
    width: 5rem;
    background: linear-gradient(135deg, rgb(0, 0, 0),rgb(61, 60, 60) 50%, black);
    box-shadow: 4px 4px 4px rgb(80, 80, 80);
    transform: translateY(-20%);
    border-radius: 50%;
  }
  .left{
    padding: 0 10px;
    width: calc(100% - 7.5rem);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    i{
      font-size: 24px;
      cursor: pointer;
    }
    .like{
      i{
        color: rgb(190, 190, 190);
      }
      .liked{
        color: red;
      }
    }
    .playdiv{
      width: 70%;
      height: 4px;
      background: rgb(180, 180, 180);
      border-radius: 2px;
      display: flex;
      justify-content: center;
      i{
        padding-top: 5px;
        &:hover{
          opacity: .8;
        }
      }
    }
  }
}
</style>
