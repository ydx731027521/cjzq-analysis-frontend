<template>
  <ul class="top-nav">
    <li v-for="(item,index) in topNav" :key="item.dataName" :class="active === index?'active':''" @click="handleActiveChange(index,item.dataName,item.text)">{{item.text}}</li>
  </ul>
  <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">处理中心</el-menu-item>
  </el-menu> -->
</template>

<script>
import {mapState} from 'vuex'
export default {
  name:'topnav',
  data(){
    return{
      topNav:[
        {text:"导航1",dataName:"navList1"},
        {text:"导航2",dataName:"navList2"}
      ],
      navList1:[
          {route:"/home",name:"首页",icon:'iconfont icon-shouye'},
          {route:"/user",name:"用户管理1",icon:'iconfont icon-yonghu-tianchong'},
          {route:"/pwd",name:"配置管理1",icon:'iconfont icon-mima',children:[
              {route:"/essantial",name:"要件配置1"},
              {route:"/standard",name:"标准配置1"},
              {route:"/insert",name:"新增标准1"},
              {route:"/detail",name:"标准详情1"},
              {route:'/cycle',name:'周期设置1'}
          ]},
          {route:"/salary",name:"质控管理1",icon:'iconfont icon-gongziyufuli'},
          {route:"/attendence",name:"抽检管理1",icon:'iconfont icon-kaoqinbiaoon'},
          {route:"/perform",name:"统计查询1",icon:'iconfont icon-wodejixiao'},
      ],
      navList2:[
          {route:"/home",name:"首页",icon:'iconfont icon-shouye'},
          {route:"/user",name:"用户管理2",icon:'iconfont icon-yonghu-tianchong'},
          {route:"/pwd",name:"配置管理2",icon:'iconfont icon-mima',children:[
              {route:"/essantial",name:"要件配置2"},
              {route:"/standard",name:"标准配置2"},
              {route:"/insert",name:"新增标准2"},
              {route:"/detail",name:"标准详情2"},
              {route:'/cycle',name:'周期设置2'}
          ]},
          {route:"/salary",name:"质控管理2",icon:'iconfont icon-gongziyufuli'},
          {route:"/attendence",name:"抽检管理2",icon:'iconfont icon-kaoqinbiaoon'},
          {route:"/admin",name:"统计管理2",icon:'iconfont icon-xitong'},
      ]
    }
  },
  methods:{
    handleActiveChange(index,dataName,value){
      this.$store.commit('leftNav/setLeftNavList',this[dataName])
      this.$store.commit('topNav/setTopNavActive',index)
      this.$store.commit('breadCrumb/setFirstClass',value)
      this.$router.push('/home')
    }
  },
  mounted(){
    let num = this.active + 1
    this.$store.commit('leftNav/setLeftNavList',this['navList'+num])
  },
  computed:{
    ...mapState({
      active: (state)=>state.topNav.active
    })
  }
}
</script>

<style lang="less" scoped>
.top-nav{
  overflow: hidden;
  padding: 20px 15px;
  margin-left: 20px;

  .active{
    // border-bottom: 1px solid #CB0000;
    color: #CB0000;
  }

  li{
    float: left;
    width: 100px;
    line-height: 20px;
    border-left: 2px solid #C5C5C5;
    color: #999;
    cursor: pointer;
    border-bottom: 1px solid transparent;
  }

  li:hover{
    color: #CB0000;
  }

  li:last-child{
    border-right: 2px solid #C5C5C5;
  }
}
</style>

