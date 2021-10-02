<template>
  <div class="playerpanel">
    <audio :src="`https://music.163.com/song/media/outer/url?id=${this.$store.state.playsrc}.mp3`" ref="myaudio" @ended="nextsong" autoplay></audio>
    <div class="roundpic">
      <img src="">
    </div>
    <div class="left">
      <div class="like">
        <i class="icon iconfont icon-xihuan" @click="liked = !liked" :class="liked == true?'liked':''"></i>
      </div>
      <div class="playdiv">
        <div>{{ $store.state.playlist[$store.state.index-1].name }} - {{$store.state.playlist[$store.state.index-1].ar[0].name}}</div>
        <div class="linebar">
          <div id="progressbar"></div>
          <div id="progressdot"></div>
        </div>
        <!-- 播放上一曲 -->
        <div>
          <i class="icon iconfont icon-houtui" @click="lastsong"></i>
          <!-- 播放 -->
          <i class="icon iconfont icon-bofang" v-show="!this.$store.state.isplay" @click="musicplay"></i>
          <!-- 暂停 -->
          <i class="icon iconfont icon-zanting" v-show="this.$store.state.isplay" @click="musicpause"></i>
          <!-- 播放下一曲 -->
          <i class="icon iconfont icon-kuaijin" @click="nextsong"></i>
        </div>
      </div>
      <div>
        <i class="icon iconfont icon-xunhuanbofang" @click="drawer = true"></i>
        <i class="icon iconfont icon-suijibofang"></i>
      </div>
    </div>
  </div>
</template>
<script>
import $axios from '../utils/request'
import '../utils/playbar'
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
      this.$store.commit('changestatus', true)
    },
    musicpause () {
      this.$refs.myaudio.pause()
      this.$store.commit('changestatus', false)
    },
    lastsong () {
      this.$store.commit('playfromthis', this.$store.state.index - 2)
    },
    nextsong () {
      this.$store.commit('playfromthis', this.$store.state.index)
    },
    async addlist () {
      const res2 = await $axios.get('/personalized')
      const list = await $axios.get('/playlist/detail?id=' + res2.data.result[0].id)
      this.$store.commit('setplaylist', list.data.playlist.tracks)
      this.$store.commit('playfromthis', 0)
    }
  },
  created () {
    this.addlist()
  }
}
</script>
<style lang="scss" scoped>
.playerpanel{
  display: flex;
  align-items: center;
  padding: 0 20px;
  audio{
  // visibility: hidden;
  z-index: 10;
  display: block !important;
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
      height: 100%;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      .linebar{
        width: 100%;
        height: 6px;
        background: rgb(148, 149, 156);
        border-radius: 4px;
        position: relative;
        #progressbar{
          height: 100%;
          background: cornsilk;
          border-radius: 4px;
        }
        #progressdot{
          width: 8px;
          height: 8px;
          border-radius: 4px;
          position: absolute;
          top: 50%;
          transform: translate(-25%,-50%);
          background: cyan;
          transition: all 0.2s linear;
          &:hover{
            top: 75%;
            transform: scale(1.5) translateY(-50%);
            transition: all 0.2s linear;
          }
        }
      }
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
