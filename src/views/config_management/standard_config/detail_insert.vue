<template>
    <div class="detail-insert-box">
        <div class="add-list" style="overflow:hidden;padding:20px 0;display:flex;" v-if="insertTableData.length>0">
            <div class="add-list-title" style="width:100px;line-height:24px;">已添加的要件：</div>
            <div class="add-list-tips" style="flex:1">
                <el-tag type="success" size="small" style="float:left;margin-right:5px;margin-bottom:5px;" v-for="item of insertTableData" :key="item.standardMarkId">{{item.qcName}}</el-tag>
            </div>
        </div>
        <div class="table-box">
            <el-table
                    :header-cell-style="{'background':'#E8E8E8','color':'black','font-weight':'800'}"
                    ref="multipleTable"
                    :data="tableData"
                    style="width: 100%"
                    border
                    @selection-change="handleSelectionChange"
                    size="small">
                <el-table-column
                        prop="qsId"
                        label="序号"
                        type="index"
                        min-width="5%"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="markType"
                        label="要件类型"
                        min-width="30%"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="qcName"
                        label="要件名称"
                        min-width="30%"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="markParam"
                        label="要件参数"
                        min-width="15%"
                        align="center">
                </el-table-column>
                <el-table-column
                        min-width="20%"
                        label="操作"
                        align="center">
                    <template scope="{row,$index}">
                        <el-button type="primary" size="small" @click="handleToggle(row,$index)" v-if="!row.isAdd"><i class="el-icon-plus" ></i></el-button>
                        <el-button type="success" size="small" v-if="row.isAdd" @click="handleToggle(row,$index)"><i class="el-icon-check"></i></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
  import Pagination from 'components/common/Pagination'
  export default  {
    name:'detialInsertDialog',
    components:{
      Pagination
    },
    props:{
      tableData:{
        type:Array
      },
      insertTotal:{
        type:Number
      }
    },
    data(){
      return {
        insertList:[],
        insertTableData:[],
        multipleTable:[],
        currentPage:1,
        currentPageSize:20
      }
    },
    methods:{
      _toggle(row){
        let flag = false
        let index
        // this.tableData.map((item,i)=>{
        //   if(item.qsId == row.qsId){
        //     // flag = true
        //     // index = i
        //
        //     this.$message.error('该要件已经存在，请勿重复添加')
        //     return
        //   }
        // })
        this.insertList.map((item,i)=>{
          if(item.qsId == row.qsId) {
            flag = true
            index = i
          }
        })
        if(flag){
          this.insertList.splice(index,1)
          row.isAdd = false
          this.$message({
            message: "取消添加",
            type:'warning',
            duration:800
          })
        }else{
          this.insertList.push(row)
          row.isAdd = true
          this.$message({
            message: "添加成功",
            type:'success',
            duration:800
          })
        }
        this._deduplicate()
      },
      _deduplicate(){
        let list = Array.from(new Set(this.insertList))
        this.insertList = list
      },
      handleSelectionChange(val){
        this.multipleTable = val;
      },
      handleChangeCurrentPageSize(val){
        this.currentPageSize = val
        this._getInsertList()
      },
      handleChangeCurrentPage(val){
        this.currentPage = val
        this._getInsertList()
      },
      handleToggle(row,index){
        this._toggle(row)
      }
    }
  }
</script>

<style lang="less" scoped>
    .detial-insert-box{
        background: #fff;
        padding: 0 20px;

        .el-table__row{
            height: 40px !important;
            td{
                padding: 0 !important;
            }
        }

        .el-input.el-input--small{
            height: 32px;
        }
    }
</style>
