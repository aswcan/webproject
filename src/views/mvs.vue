<template>
  <div class="box">
    <h1>视频</h1>
    <h4>推荐</h4>
    <div class="top">
      <div class="topmvs">
        <div class="item" v-for="(item, index) in topMvs" :key="index">
          <div class="img-wrap">
            <img class="cover" v-lazy="item.cover" alt="" />
            <div class="num-wrap">
              <div class="num"><i class="icon iconfont icon-24gl-play"></i>{{ item.playCount | ellipsisPlayVolume }}</div>
            </div>
            <div class="mask">
              <img src="../img/播放.png">
            </div>
          </div>
          <div class="info-wrap">
            <div class="name txt">{{ item.name }}</div>
            <div class="singer txt">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
    <h2>分类</h2>
    <div class="mvs-container">
      <div class="filter-wrap">
        <div class="seciton-wrap">
          <ul class="tabs-wrap">
            <span class="section-type">地区:</span>
            <li class="tab">
              <span :class="['title', { active: queryInfo.area == '全部' }]" @click="queryInfo.area = '全部'">全部</span>
            </li>
            <li class="tab">
              <span :class="['title', { active: queryInfo.area == '内地' }]" @click="queryInfo.area = '内地'">内地</span>
            </li>
            <li class="tab">
              <span :class="['title', { active: queryInfo.area == '港台' }]" @click="queryInfo.area = '港台'">港台</span>
            </li>
            <li class="tab">
              <span :class="['title', { active: queryInfo.area == '欧美' }]" @click="queryInfo.area = '欧美'">欧美</span>
            </li>
            <li class="tab">
              <span :class="['title', { active: queryInfo.area == '日本' }]" @click="queryInfo.area = '日本'">日本</span>
            </li>
            <li class="tab">
              <span :class="['title', { active: queryInfo.area == '韩国' }]" @click="queryInfo.area = '韩国'">韩国</span>
            </li>
          </ul>
        </div>
        <div class="type-wrap">
          <ul class="tabs-wrap">
            <span class="type-type">类型:</span>
            <li class="tab">
              <span :class="['title', { active: queryInfo.type == '全部' }]" @click="queryInfo.type = '全部'">全部</span>
            </li>
            <li class="tab">
              <span :class="['title', { active: queryInfo.type == '官方版' }]" @click="queryInfo.type = '官方版'">官方版</span>
            </li>
            <li class="tab">
              <span :class="['title', { active: queryInfo.type == '原声' }]" @click="queryInfo.type = '原声'">原声</span>
            </li>
            <li class="tab">
              <span :class="['title', { active: queryInfo.type == '现场版' }]" @click="queryInfo.type = '现场版'">现场版</span>
            </li>
            <li class="tab">
              <span :class="['title', { active: queryInfo.type == '网易出品' }]" @click="queryInfo.type = '网易出品'">网易出品</span>
            </li>
          </ul>
        </div>
        <div class="order-wrap">
          <ul class="tabs-wrap">
            <span class="order-type">排序:</span>
            <li class="tab">
              <span :class="['title', { active: queryInfo.order == '上升最快' }]" @click="queryInfo.order = '上升最快'">上升最快</span>
            </li>
            <li class="tab">
              <span :class="['title', { active: queryInfo.order == '最热' }]" @click="queryInfo.order = '最热'">最热</span>
            </li>
            <li class="tab">
              <span :class="['title', { active: queryInfo.order == '最新' }]" @click="queryInfo.order = '最新'">最新</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mvs">
      <div class="items">
        <div class="item" @click="toMv(item.id)" v-for="(item, index) in mvlist" :key="index">
          <div class="img-wrap">
            <img class="cover" v-lazy="item.cover" alt="" />
            <div class="num-wrap">
              <div class="num"><i class="icon iconfont icon-24gl-play"></i>{{ item.playCount | ellipsisPlayVolume }}</div>
            </div>
            <div class="mask">
              <img src="../img/播放.png">
            </div>
          </div>
          <div class="info-wrap">
            <div class="name txt">{{ item.name }}</div>
            <div class="singer txt">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination
        :hide-on-single-page="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paginationForm.page"
        :page-sizes="[4, 8, 12, 16, 20, 40]"
        :page-size="paginationForm.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginationForm.total"
        class="fenye"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import $axios from '../utils/request'
export default {
  name: 'mvs',
  data () {
    return {
      topMvs: [],
      paginationForm: {
        // 总条数
        total: 0,
        // 页码
        page: 0,
        // 页容量
        limit: 8
      },
      // 查询信息
      queryInfo: {
        // `area`: 地区,可选值为：全部、内地、港台、欧美、日本、韩国、不填则为全部
        area: '欧美',
        // `type`: 类型,可选值为：全部、官方版、原生、现场版、网易出品,不填则为全部
        type: '全部',
        // `order`: 排序,可选值为：上升最快、最热、最新、不填则为上升最快
        order: '最热'
      },
      // mv列表
      mvlist: []
    }
  },
  watch: {
    queryInfo: {
      handler (val) {
        this.paginationForm = {
          total: 0,
          page: 0,
          limit: 8
        }
        this.queryInfo = val
        this.getMvs()
      },
      deep: 'true'
    }
  },
  methods: {
    async fresh () {
      // 推荐MV
      const mvs = await $axios.get('/top/mv?limit=10')
      console.log(mvs)
      this.topMvs = mvs.data.data
    },
    toMv (id) {
      this.$router.push(`/mv?id=${id}`)
    },
    // 页码发生变化
    handleCurrentChange (val) {
      this.paginationForm.page = val
      this.getMvs()
    },
    // 页容量发生变化
    handleSizeChange (val) {
      this.paginationForm.limit = val
      this.getMvs()
    },
    // 获取所有mv数据
    async getMvs () {
      const { data } = await $axios.get('/mv/all', {
        params: {
          // 歌曲地区
          area: this.queryInfo.area,
          // 歌曲类型
          type: this.queryInfo.type,
          // 歌曲排序
          order: this.queryInfo.order,
          // 页面容量
          limit: this.paginationForm.limit,
          // 分页 相当于页码
          offset: this.paginationForm.page
        }
      })
      if (data.code === 200) {
        this.mvlist = data.data
        // 当切换页码和页容量的 的时候未返回total,不能赋值
        if (data.count) {
          this.paginationForm.total = data.count
        }
      }
    }
  },
  mounted () {
    this.fresh()
    this.getMvs()
  },
  filters: {
    ellipsisPlayVolume (val) {
      if (val < 100000) return val
      return parseInt(val / 10000) + '万'
    }
  }
}
</script>
<style lang="scss" scoped>
.box{
  width: 100%;
  height: 100%;
  min-width: 750px;
  .filter-wrap{
    ul{
      display: flex;
      list-style: none;
      padding: 10px 0;
      .title{
        margin: 0 20px;
        padding: 5px 30px;
        border-radius: 20px;
        cursor: pointer;
        &:hover{
          background: rgb(86, 86, 95);
        }
      }
      .active{
        background: rgb(86, 86, 95);
      }
      li{
        border-right: 1px solid;
        &:last-child{
          border: none;
        }
      }
    }
  }
  h1{
    font-size: 2rem;
    margin: 0;
  }
  .top{
    width: 97%;
    padding: 15px;
    background: rgb(54, 55, 56);
    overflow: hidden;
    border-radius: 5px;
    position: relative;
    .topmvs{
      width: 3500px;
      display: flex;
      overflow: hidden;
      flex-wrap: nowrap;
    }
    &:hover{
      overflow-x: scroll;
    }
    &::-webkit-scrollbar {/*滚动条整体样式*/
        width: 1px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 10px;
    }
    &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 10px;
      background: #949494;
    }
    &::-webkit-scrollbar-track {/*滚动条里面轨道*/
      background: rgb(66, 69, 75);
    }
  }
  .item{
    width: 20%;
    margin: 10px 20px;
    .img-wrap{
      position: relative;
      border-radius: 6px;
      height: 9.5vw;
      cursor: pointer;
      &:hover{
        transform: translateY(-10px);
        transition: 0.2s ease;
      }
      .cover{
        width: 100%;
        height: 100%;
        position: relative;
        border-radius: 6px  ;
      }
      .num-wrap{
        position: absolute;
        right: 5px;
        bottom: 5px;
        padding: 3px 7px;
        background: rgba(56, 56, 56,.9);
        border-radius: 20px;
        font-size: 6px;
      }
      .mask{
        position: absolute;
        top: 0;
        left: 0;
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
    .txt{
      font-size: 12px;
      overflow-y: hidden;
    }
  }
  .mvs{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .items{
      margin-bottom: 40px;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      justify-content: center;
    }
  }
  .fenye{
    margin: 0 auto;
  }
}
</style>
