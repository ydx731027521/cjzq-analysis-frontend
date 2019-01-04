<template>
  <div class="content-wrap">
    <el-table
      v-loading="loading"
      :data="currentData"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="生日"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
        property=''>

      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        label="操作">
         <template scope="scope">
            <el-button type="primary" @click="handleOptions(scope.row,scope.$index)">编辑</el-button>
         </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="10">
      </el-pagination>
    </div>

    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="40%"
      :close-on-click-modal=false
      :before-close="handleClose">
      <div class="birth-box">
        <div class="title">生日:</div>
        <div class="input-box">
          <el-input v-model="date" placeholder="请输入生日"></el-input>
        </div>
      </div>
       <div class="name-box">
        <div class="title">姓名:</div>
        <div class="input-box">
          <el-input v-model="name" placeholder="请输入姓名"></el-input>
        </div>
      </div>
       <div class="address-box">
        <div class="title">地址:</div>
        <div class="input-box">
          <el-input v-model="address" placeholder="请输入地址"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tem",
  data() {
    return {
      allData: [],
      currentData: [],
      dialogVisible: false,
      name: "",
      date: "",
      address: "",
      loading: true,
      total: 0,
      currentPage: 1,
      currentPageSize:10
    };
  },
  mounted() {
    let that = this;
    this.$http.get("/news").then(res => {
      let { data } = res.data;
      setTimeout(() => {
        that.loading = false;
        that.allData = data;
        that.total = data.length;
      }, 1000);
      this.currentData = data.slice(0, 10);
    });
  },
  methods: {
    handleOptions(obj, index) {
      this.dialogVisible = true;
      this.date = obj.date;
      this.name = obj.name;
      this.address = obj.address;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleCurrentChange(currentPage) {
      let currentPageSize = this.currentPageSize
      let start = (currentPage - 1) * currentPageSize;
      let end = currentPage * currentPageSize;
      this.currentData = this.allData.slice(start, end);
    },
    handleSizeChange(val){
      this.currentPageSize = val
      let currentPageSize = this.currentPageSize
      let currentPage = this.currentPage
      let start = (currentPage - 1) * currentPageSize;
      let end = currentPage * currentPageSize;
      this.currentData = this.allData.slice(start, end);
    }
  }
};
</script>

<style lang="less" >
.content-wrap {
  height: 100%;
  box-sizing: border-box;
  padding: 10px;

  .el-scrollbar__wrap{
    background: #fff !important;
    border-top:#fff !important;
  }

  .title {
    float: left;
    width: 10%;
    line-height: 40px;
    font-size: 16px;
  }

  .input-box {
    float: left;
    width: 90%;
  }

  .birth-box,
  .name-box,
  .address-box {
    overflow: hidden;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 10px;
  }

  .pagination{
    margin-top: 10px;
    margin-bottom: 20px;
  }
}


</style>
