<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :current-page="currentPage"
      :page-sizes="[20, 30, 50]"
      :page-size="20">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name:'pagination',
  props:{
    total:{
      type:Number
    },
    currentPage:{
      type:Number
    },
    currentPageSize:{
      type:Number
    }
  },
  methods:{
    handleSizeChange(val){
      this.$emit('changeCurrentPageSize',val)
    },
    handleCurrentChange(val){
      this.$emit('changeCurrentPage',val)
    }
  }
}
</script>

<style lang="less" scoped>
.pagination{
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>

