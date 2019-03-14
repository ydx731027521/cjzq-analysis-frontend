<script src="../../setBaseUrl.js"></script>
<template>
    <div class="app-header">
        <div class="logo">
            <img src="../../static/logo.png" alt="">
        </div>
        <ul class="header-nav">
            <li v-for="(item,index) in topNav" :key="item.text" :class="activeIndex === index?'active':''" @click="handleActiveChange(index,item.dataName,item.text,item.path)">{{item.text}}</li>
        </ul>
        <div class="user">
            <span class="username-box"><span>欢迎登录，</span><span class="username" ref="username"></span></span>
            <div class="avatar">
                <img src="../../assets/admin.jpg" alt="">
            </div>
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
  import util from '../../tools/util'
  import {mapState} from 'vuex'
  export default {
    name:'app-header',
    data(){
      return {
        // headerNavList:[
        //   {text:"配置管理",dataName:"essantialManagement"},
        //   {text:"质控管理",dataName:"qualityManagement"},
        //   {text:"抽检管理",dataName:"spotCheckManagement"}
        // ],
        essantialManagement:[
          {route:'/essantial/config',name:'要件配置',icon:'el-icon-star-on'},
          {route:'/essantial/standard',name:'质检标准配置',icon:'el-icon-rank'},
          {route:'/essantial/cycle',name:'周期配置',icon:'el-icon-time'}
        ],
        qualityManagement:[
          {route:'/quality/manage',name:'批次管理',icon:'iconfont icon-pici'},
          {route:'/quality/defective',name:'次品处理',icon:'iconfont icon-chuli1'},
          {route:'/quality/recheckmanage',name:'复检管理',icon:'iconfont icon-chuli'},
          {route:'/quality/recheckrecord',name:'复检记录',icon:'iconfont icon-chuli'},
        ],
        spotCheckManagement:[
          {route:'/spotcheck/convention',name:'抽检批次',icon:'iconfont icon-pici'},
        ]
      }
    },
    mounted(){
      let user = util.getSession()
      if(user){
        this.$refs.username.innerText = user.userName
      }else{
        this.$refs.username.innerText = "null"
      }
    },
    methods:{
      handleActiveChange(index,dataName,value,path){
        util.setLeftNav(this.list[index])
        util.setActiveIndex(index)
        this.$store.commit('topNav/setActiveIndex',index)
        this.$store.commit('leftNav/setLeftActiveList',this.list[index])
        this.$store.commit('breadCrumb/setFirstClass',value)
        this.$store.commit('tree/setExpandId','')
        this.$router.push({path:path})
      },
      handleCommand(val){
        if(val == "logout"){
          this.$store.commit('user/setUserName',"")
          this.$store.commit('user/setToken',"")
          this.$store.commit('user/setErpxerTime',"")
          this.$store.commit('user/setErpxerTime',"")
          this.$store.commit('topNav/setActiveIndex',0)
          this.$store.commit('leftNav/setLeftActiveList',[])
          this.$store.commit('leftNav/setList',[])
          this.$store.commit('tree/setExpandId','')
          sessionStorage.removeItem("user")
          sessionStorage.removeItem('leftNav')
          sessionStorage.removeItem('activeIndex')
          sessionStorage.removeItem('routes')
          sessionStorage.removeItem('path')
          this.$router.push({name:'login'})
        }
      }
    },
    computed:{
      ...mapState({
        'activeIndex':(state)=>state.topNav.activeIndex,
        'topNav':(state)=>state.topNav.topNav,
        'list':(state)=>state.leftNav.list
      })
    }
  }
</script>

<style lang="less" scoped>
    .app-header{
        line-height: 60px;
        color: #fff;
        font-size: 24px;
        background: linear-gradient(120deg, #00e4d0, #5983e8);
        height: 60px;
        overflow: hidden;

        .logo{
            width: 183px;
            float: left;
            background: #fff;

            img{
                width:90%;
                height: 60px;
                margin-left: -22px;
            }
        }

        .header-nav{
            float: left;
            line-height: 60px;
            background: transparent;

            li{
                color: #fff;
                text-align: center;
                font-size:16px;
                padding:0 30px;
                float: left;
                cursor: pointer;
            }

            .active{
                background: rgba(255,255,255,0.3);
            }
        }

        .user{
            float: right;
            margin-right: 30px;
            line-height: 60px;

            .avatar{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-top: 15px;
                overflow: hidden;
                float: left;

                img{
                    width: 30px;
                    height: 30px;
                    vertical-align: top;
                }
            }

            .username-box{
                float: left;
                line-height: 60px;
                margin-left: 10px;
                font-size: 16px;
                cursor: pointer;
                margin-right: 10px;

                .username{
                    text-decoration: underline;
                }
            }

            .el-dropdown{
                vertical-align: top;
                color: #fff;

                .el-icon-caret-bottom{
                    font-size:14px;
                    margin-left: 10px;
                    line-height: 60px;
                    vertical-align: middle;
                    cursor: pointer;
                }
            }

        }
    }
</style>


