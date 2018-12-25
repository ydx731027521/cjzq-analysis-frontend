<template>
  <div class="insert-box">
    <!-- 基本信息 -->
    <div class="basic-info">
      <p class="title">基本信息:</p>
      <div class="select-type">
        <div class="text">请选择业务：</div>
        <div class="select-type-one">
          <el-select v-model="business1" size="small" clearable placeholder="请选择">
            <el-option
              value="item"
            >
            </el-option>
          </el-select>
        </div>
        <div class="select-type-two">
          <el-select v-model="business2" size="small" clearable placeholder="请选择">
            <el-option
              value="item"
            >
            </el-option>
          </el-select>
        </div>
        <div class="select-type-three">
          <el-select v-model="business3" size="small" clearable placeholder="请选择">
            <el-option
              value="item"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="active-date">
        <div class="text">生效时间：</div>
        <div class="select-date">
          <el-date-picker
            size="small"
            v-model="activeDate"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </div>
      <div class="remark">
        <div class="text">备注：</div>
        <div class="remark-textarea">
          <el-input type="textarea" v-model="remarkValue"></el-input>
        </div>
      </div>
    </div>
    <!-- 质检要件 -->
    <div class="essantial-check">
      <p class="title">质检要件:</p>
      <div class="essantial-check-options">
        <el-button icon="el-icon-plus" plain size="small">新建</el-button>
      </div>
    </div>
    <!-- 表格 -->
     <div class="insert-table">
      <el-table
      v-loading="loading"
      :data="insertTableData"
      style="width: 100%"
      border
      size="medium">
        <el-table-column
          prop="id"
          label="序号"
          type="index"
          width="55"
          align="center">
        </el-table-column>
        <el-table-column
          prop="type"
          label="要件类型"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="title"
          label="要件名称"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="param"
          label="要件参数"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="condition"
          label="筛选条件"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template scope="scope">
              <el-button type="primary" size="small" @click="handleOptions(scope.row,scope.$index)"><i class="el-icon-edit"></i></el-button>
              <el-button type="danger" size="small" @click="handleDelete()"><i class="el-icon-delete"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页组件 -->
    <Pagination 
      :total="total"
      :currentPage="currentPage"
      :currentPageSize="currentPageSize"
      @changeCurrentPageSize="handleChangeCurrentPageSize"
      @changeCurrentPage="handleChangeCurrentPage">
    </Pagination>
  </div>
</template>

<script>
import Pagination from '../../../components/common/Pagination'
import {wrapToTop} from '../../../tools/wrapToTop'
export default {
  name:'insertNewStandard',
  components:{
    Pagination
  },
  data(){
    return {
      loading:true,
      activeDate:'',
      remarkValue:'',
      business1:'',
      business2:'',
      business3:'',
      total:0,
      currentPage:1,
      currentPageSize:10,
      insertTableData:[],
      allTableData:[]
    }
  },
  methods:{
    handleChangeCurrentPageSize(){},
    handleChangeCurrentPage(){},
    handleOptions(){},
    handleDelete(){},
    handleChangeCurrentPageSize(val){
      this.currentPageSize = val;
      let currentPage = this.currentPage;
      let currentPageSize = this.currentPageSize;
      let start = (currentPage - 1) * currentPageSize;
      let end = currentPage * currentPageSize;
      this.standardTableData = this.allTableData.slice(start, end);
      let standardDom = document.getElementsByClassName('standard');
      wrapToTop(this)
    },
    handleChangeCurrentPage(val){
      this.currentPage = val;
      let currentPage = this.currentPage;
      let currentPageSize = this.currentPageSize;
      wrapToTop(this)
      let start = (currentPage - 1) * currentPageSize;
      let end = currentPage * currentPageSize;
      this.standardTableData = this.allTableData.slice(start, end);
    }
  },
  mounted(){
    let that = this;
    this.$http.get("/insertTableData").then(res => {
      let { data } = res;
      setTimeout(() => {
        that.loading = false;
        that.allTableData = data;
        that.total = data.length;
        that.insertTableData = that.allTableData.slice(0,that.currentPageSize);
      }, 1000);
    });
  }
}
</script>

<style lang="less" scoped>
.insert-box{
  width: 90%;
  margin:0 auto;

  .title{
    font-size: 20px;
    line-height: 30px;
    text-align: left;
  }

  .basic-info,.essantial-check{
    background: #fff;
    padding:30px 20px;
  }

  .basic-info{
    .text{
      width: 20%;
      float: left;
      text-align: right;
      margin-right: 2%;
    }

    .select-type,.active-date,.remark{
      line-height: 60px;
      overflow: hidden;
    }

    .select-type{
      .select-type-one,.select-type-two,.select-type-three{
        width: 25%;
        float: left;
        text-align: left;
        padding: 0 5px;
        box-sizing: border-box;
      }

    }

    .active-date{
      .select-date{
        width: 25%;
        float: left;
        text-align: left;
        padding: 0 5px;
        box-sizing: border-box;
      }
    }

    .remark{
       .remark-textarea{
         float: left;
         margin-top: 20px;
         width: 68%;
         padding: 0 5px;
        box-sizing: border-box;

         .el-textarea{
           width: 100%;

           .el-textarea__inner{
             height: 90px !important;
           }
         }
       }
    }
  }

  .essantial-check{
    .essantial-check-options{
      float: left;
      margin-top: 10px;
    }
  }

  .insert-table{
   padding: 20px;
   background: #fff;
  }
}
</style>

