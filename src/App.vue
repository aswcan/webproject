<template>
  <div id="app">
    <el-container>
      <el-aside width="15vw">
        <i class="icon iconfont icon-wangyiyunyinle"></i>
        <leftpanel />
      </el-aside>
      <el-container>
        <el-header><toppanel /></el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <player class="player" />
      </el-container>
    </el-container>
  </div>
</template>

<script>
import toppanel from './views/topPanel'
import leftpanel from './views/leftPanel'
import player from './views/player'
export default {
  name: 'App',
  // methods: {},
  // routes: [],
  components: {
    toppanel,
    leftpanel,
    player
  }
}
</script>

<style lang="scss">
body{
  margin: 0;
  padding: 0;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  #app{
    margin: 0;
    padding: 0;
    header{
      margin: 0;
      padding: 0;
    }
    .el-aside{
      position: fixed;
      top: 60px;
      left: 0;
      background: rgb(246,246,246);
      color: #000;
      height: calc(100vh - 3.75rem);
      &::-webkit-scrollbar {/*滚动条整体样式*/
        width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        // border-radius: 10px;
        background: #cccccc;
      }
      &::-webkit-scrollbar-track {/*滚动条里面轨道*/
        background: rgb(246,246,246);
      }
      .icon-wangyiyunyinle{
        text-align: center;
        padding: 10% 0;
        width: 100%;
        min-height: 40px;
        display: block;
        font-size: 36px;
        background-color: rgb(246,246,246);
      }
    }
    .el-main{
      width: 85vw;
      margin-left: 15vw;
      height: calc(100vh - 7.75rem);
      background: rgb(246,246,246);
      &::-webkit-scrollbar {/*滚动条整体样式*/
        width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        // border-radius: 10px;
        background: #d4d4d4;
      }
      &::-webkit-scrollbar-track {/*滚动条里面轨道*/
        background: rgb(255, 255, 255);
      }
    }
    .player{
      width: 85vw;
      height: 4rem;
      position: fixed;
      top: calc(100vh - 4rem);
      left: 15vw;
      background: rgb(199, 199, 199);
    }
  }
}
</style>
