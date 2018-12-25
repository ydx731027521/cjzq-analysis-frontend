<template>
    <div class="defective-detail-box">
        <div class="defective-detail-header">
            次品详情
        </div>
        <div class="search-box">
            <div class="search-item">
                <span class="title">客户号：</span>
                <div class="select-box">
                    <el-input size="small" v-model="clientId" clearable></el-input>
                </div>
            </div>
            <div class="search-item">
                <span class="title">营业部：</span>
                <div class="select-box">
                    <el-input size="small" v-model="branchName" clearable></el-input>
                </div>
            </div>
            <div class="search-item">
                <span class="title">订单号：</span>
                <div class="select-box">
                    <el-input size="small" v-model="origOrderId" clearable></el-input>
                </div>
            </div>
            <div class="search-item">
                <span class="title">要件编号：</span>
                <div class="select-box">
                    <el-input size="small" v-model="markItemId" clearable></el-input>
                </div>
            </div>
            <div class="btn-box">
                <el-button size="small" type="primary" @click="handleSearch"><i class="el-icon-search"></i></el-button>
            </div>
        </div>
        <div class="defective-detail-table">
            <el-table
                    v-loading="loading"
                    :header-cell-style="{'background':'#E8E8E8','color':'black','font-weight':'800'}"
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        type="index"
                        label="序号"
                        fixed='left'
                        align="center"
                        width="60">
                </el-table-column>
                <el-table-column
                        prop="clientId"
                        label="客户号"
                        width="120"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="clientName"
                        width="120"
                        align="center"
                        label="客户姓名">
                </el-table-column>
                <el-table-column
                        prop="branchName"
                        width="220"
                        align="center"
                        label="营业部">
                </el-table-column>
                <el-table-column
                        prop="origOrderId"
                        width="120"
                        align="center"
                        label="原始订单号">
                </el-table-column>
                <el-table-column
                        prop="markItemId"
                        width="200"
                        align="center"
                        label="要件编号">
                </el-table-column>
                <el-table-column
                        prop="markItemName"
                        align="center"
                        label="缺失要件">
                </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <pagination
                    :total="total"
                    :currentPage="currentPage"
                    :currentPageSize="currentPageSize"
                    @changeCurrentPageSize="handleChangeCurrentPageSize"
                    @changeCurrentPage="handleChangeCurrentPage">
            </pagination>
            <div class="btn-back">
                <el-button type='primary' plain @click="handleGoBack">返 回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
  import URL from 'api/url'
  import util from 'tools/util'
  import Pagination from 'components/common/Pagination.vue'
  let {DEFECTIVE_DETAIL} =URL
  export default {
    name:'defectiveDetail',
    components:{
      Pagination
    },
    data(){
      return {
        loading:false,
        total:0,
        currentPage:1,
        currentPageSize:20,
        tableData:[],
        branchName:'',
        markItemId:'',
        origOrderId:'',
        clientId:'',
        qcBatchId:''
      }
    },
    mounted(){
      let {qcBatchId} = this.$route.params
      if(!qcBatchId){
        this.$router.push({name:'次品处理'})
      }else{
        this.qcBatchId = qcBatchId
        this._getList()
      }
    },
    beforeRouteLeave(to, from, next) {
      if (to.path == "/quality/defective"||to.path == "/quality/manage") {
        to.meta.keepAlive = true;
      } else {
        to.meta.keepAlive = false;
      }
      next();
    },
    methods:{
      _getList(){
        this.loading = true
        let markItemId = this.markItemId.trim()
        let branchName = this.branchName.trim()
        let clientId = this.clientId.trim()
        let origOrderId = this.origOrderId.trim()
        this.$http.post(DEFECTIVE_DETAIL,{
          currentPage: this.currentPage,
          pageSize: this.currentPageSize,
          qcBatchId: this.qcBatchId,
          origOrderId,
          markItemId,
          branchName,
          clientId
        }).then(res=>{
          let {data} = res
          if(res.status === 200 && data.status === 0){
            let {totalNum,items} = data.data
            this.tableData = items
            this.total = totalNum
            this.loading = false
          }else{
            util.err()
          }
        })
      },
      handleChangeCurrentPageSize(val){
        util.wrapToTop(this)
        this.currentPageSize = val
        this.currentPage = 1
        this._getList()
        util.wrapToTop(this)
      },
      handleChangeCurrentPage(val){
        util.wrapToTop(this)
        this.currentPage = val
        this._getList()
        util.wrapToTop(this)
      },
      handleSearch(){
        this.currentPage = 1
        this._getList()
      },
      handleGoBack(){
        this.$router.go(-1)
        // window.history.back(-1)
      }
    }
  }
</script>

<style lang="less" scoped>
    .defective-detail-box{
        width: 96%;
        margin:0 auto;
        background: #fff;
        padding-bottom: 10px;
        margin-bottom: 10px;
        margin-top: -30px;

        .defective-detail-header{
            font-size: 20px;
            line-height: 40px;
            text-align: left;
            background: #F2F8F9;
        }

        .search-box{
            overflow: hidden;
            line-height: 70px;
            margin-bottom: 20px;

            .search-item{
                float: left;
                width: 22%;
                text-align: left;
                padding-left: 15px;
                box-sizing: border-box;

                .title{
                    float: left;
                    width: 35%;
                }

                .select-box{
                    width: 65%;
                    float: left;
                }

                .input-box,.select-box{
                    float: left;
                }
            }

            .btn-box{
                float: left;
                width: 12%;

                button{
                    width: 70%;
                    .el-icon-search{
                        font-size:14px;
                    }
                }
            }
        }

        .defective-detail-table{
            width: 98%;
            margin: 0 auto;
            margin-top: 10px;
        }

        .btn-back{
            button{
                width: 200px !important;
            }
            padding-bottom: 20px;
        }
    }
</style>
