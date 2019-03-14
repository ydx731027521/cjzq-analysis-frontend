<template>
  <div class="breadcrumb">
      <!-- <router-link to="" v-for="(item,index) in breadCrumbList" :key="index" >{{item}}</router-link> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item,index) in breadCrumbList" :key="index" :to="item.route">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name:'breadcrumb',
  props:{
    breadCrumbList:{
      type:Array
    }
  },
  data(){
    return {
      tag:'',
    }
  },
  methods: {
      handleBreadcrumb(val) {
        this.tag = val;
      },
  },
  mounted() {
      this.tag = this.$route.name;
  }
}
</script>

<style lang="less" scoped>
.breadcrumb {
  color: #999;
  height: 40px;
  width: 100%;
  padding-left: 67px;
  box-sizing: border-box;

  .el-breadcrumb {
    font-size: 16px;
    line-height: 40px;
  }
}
</style>

