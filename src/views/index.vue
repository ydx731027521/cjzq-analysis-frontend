<template>
    <div class="index">
        <app-header class="app-header"></app-header>
        <div class="app-content">
            <el-scrollbar wrap-class="list" wrap-style="color: red;width:200px;overflow:hidden;" :native="false" :noresize="false" view-style="width:200px;">
                <left-nav class="left-nav"></left-nav>
            </el-scrollbar>
            <div class="wrap">
                <breadcrumb :breadCrumbList="breadCrumbList"></breadcrumb>
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
  import AppHeader from '../components/common/Header'
  import LeftNav from '../components/common/LeftNav'
  import Breadcrumb from "../components/common/Breadcrumb.vue";
  import util from '../tools/util'

  export default {
    name:'index',
    components:{
      AppHeader,
      LeftNav,
      Breadcrumb
    },
    data(){
      return {
        breadCrumbList:[]
      }
    },
    beforeMount(){
      util.setUserToVuex(this)

      this.getPath()
      let leftNav = util.getLeftNav()
      if(!leftNav){
        let list = this.$store.state.leftNav.list[0]
        util.setLeftNav(list)
        this.$store.commit('leftNav/setLeftActiveList',list)
      }else{
        this.$store.commit('leftNav/setLeftActiveList',leftNav)
      }

      let activeIndex = util.getActiveIndex()
      activeIndex = activeIndex?activeIndex:0
      this.$store.commit('topNav/setActiveIndex',activeIndex)
    },
    methods:{
      getPath(){
        let list = this.$route.matched
        let arr = []
        list.map((item,index)=>{
          if(index!=0){
            let obj = {}
            obj.name = item.name
            obj.route = item.path
            arr.push(obj)
          }
        })
        this.breadCrumbList = arr
      }
    },
    watch:{
      '$route':'getPath'
    }
  }
</script>

<style lang="less" scoped>
    .index{
        display: flex;
        flex-flow: column;
        height: 100%;
        overflow: hidden;

        .app-header {
            flex: 0 0 60px;
        }

        .left-nav{
            height:100%;
            overflow-x: hidden;
        }

        .app-content {
            flex: 1;
            display: flex;
            flex-flow: row;
            overflow: hidden;
            height: 100%;

            .list{
                height:100%;
                width: 200px;
            }

            .wrap {
                position: absolute;
                left: 183px;
                right: 0;
                bottom: 0;
                top: 60px;
                display: flex;
                flex-flow: column;
                overflow-y: scroll;
                background: #F2F8F9;
                overflow-x: none !important;

                .top-nav{
                    flex: 0 0 20px;
                }

                .breadcrumb{
                    flex:0 0 40px;
                }

                .content-wrap{
                    flex:1;
                }
            }
        }
    }
</style>

