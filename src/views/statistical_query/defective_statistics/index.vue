<template>
    <div class="defective-statistics">
        <div class="search-box">
            <div class="search-item">
                <div class="item-left">
                    <span>业务类型：</span>
                </div>
                <div class="item-right">
                    <el-select v-model="businessTypeValue" size="small" @change="handleTypeChange">
                        <el-option
                                v-for="item in businessType"
                                :key="item.id"
                                :label="item.businName"
                                :value="item.businName">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="search-item">
                <div class="item-left">
                    <span>二级分类：</span>
                </div>
                <div class="item-right">
                    <el-select v-model="secondClassValue" size="small" @change="handleSecondClassChange">
                        <el-option
                                v-for="item in secondClass"
                                :key="item.id"
                                :label="item.businName"
                                :value="item.businName">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="search-item">
                <div class="item-left">
                    <span>三级分类：</span>
                </div>
                <div class="item-right">
                    <el-select v-model="thirdClassValue" size="small" @change="handleThirdClassChange">
                        <el-option
                                v-for="item in thirdClass"
                                :key="item.id"
                                :label="item.businName"
                                :value="item.businName">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="btn-box">
                <el-button type="primary" size="small" class="recheck-search-btn" @click="handleSearch"><i class="el-icon-search"></i></el-button>
            </div>
            <div class="search-item">
                <div class="item-left">
                    <span>营业部：</span>
                </div>
                <div class="item-right">
                    <!-- <el-select v-model="thirdClassValue" size="small" @change="handleThirdClassChange">
                        <el-option
                                v-for="item in thirdClass"
                                :key="item.id"
                                :label="item.businName"
                                :value="item.businName">
                        </el-option>
                    </el-select> -->
                    <el-input size="small" type="text" v-model="branchName" clearable></el-input>
                </div>
            </div>
            <div class="search-item">
                <div class="item-left">
                    <span>批次号：</span>
                </div>
                <div class="item-right">
                    <el-input type="text" size="small" v-model="qcBatchId" clearable></el-input>
                </div>
            </div>
            <div class="date-pick">
                <span>质检时间：</span>
                <el-date-picker
                        v-model="dateValue"
                        type="daterange"
                        value-format="yyyyMMdd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        size="small">
                </el-date-picker>
            </div>
        </div>
        <div class="table-box">
            <div class="table">
                <el-table
                        v-loading="loading"
                        :header-cell-style="{'background':'#E8E8E8','color':'black','font-weight':'800'}"
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        border
                        stripe
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            label="序号"
                            type="index"
                            width="50"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="qcBatchId"
                            label="批次号"
                            min-width="28%"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="uneligAmount"
                            label="次品总数"
                            min-width="15%"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="finalUneligAmount"
                            label="剩余次品"
                            min-width="15%"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="repaired"
                            label="已修复"
                            min-width="15%"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="unProcessed"
                            label="无需处理"
                            min-width="15%"
                            align="center">
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页 -->
            <pagination
                    :total="total"
                    :currentPage="currentPage"
                    :pageSize="pageSize"
                    @changeCurrentPageSize="handleChangeCurrentPageSize"
                    @changeCurrentPage="handleChangeCurrentPage">
            </pagination>
        </div>
    </div>
</template>

<script>
  import util from 'tools/util'
  import Pagination from 'components/common/Pagination.vue'
  import URL from 'api/url'
  let {STATISTICAL_DEFECTIVE} = URL

  export default {
    name: "defectiveStatistics",
    components:{
      Pagination
    },
    data(){
      return {
        loading:false,
        businessTypeValue: '',
        secondClassValue: '',
        thirdClassValue: '',
        businessTypeId:'',
        secondClassId:'',
        thirdClassId:'',
        businessType: [],
        secondClass: [],
        thirdClass: [],
        dateValue:[],
        batchStartTime:'',
        batchEndTime:'',
        total:0,
        currentPage:1,
        pageSize:20,
        tableData:[],
        branchName:'',
        qcBatchId:''
      }
    },
    mounted(){
      this.businessTypeValue = "所有"
      this.secondClassValue = "所有"
      this.thirdClassValue = "所有"
      util.getBusin(this,'businessType','1',true)
      this._getList(this.params)
    },
    methods:{
      _getList(params){
        this.loading = true
        this.$http.post(STATISTICAL_DEFECTIVE,params).then(res=>{
          if(res.status === 200 && res.data.status === 0){
            let {data} = res.data
            this.tableData = data.items
            this.total = data.totalNum
            this.loading = false
          }
        }).catch(err=>{
          util.error()
        })
      },
      handleTypeChange(val){
        this.businessTypeValue = val
        util.businTypeChange(this, this.businessTypeValue, val,true)
      },
      handleSecondClassChange(val){
        this.secondClassValue = val
        util.secondClassChange(this, this.secondClassValue, val,true)
      },
      handleThirdClassChange(val){
        this.thirdClassValue = val
        util.thirdClassChange(this, this.thirdClassValue, val)
      },
      handleSearch(){
        this.currentPage = 1
        this._getList(this.params)
      },
      handleChangeCurrentPageSize(val){
        util.wrapToTop(this)
        this.currentPage = 1
        this.pageSize = val
        this._getList(this.params)
      },
      handleChangeCurrentPage(val){
        util.wrapToTop(this)
        this.currentPage = val
        this._getList(this.params)
      },
    },
    computed:{
      params(){
        let businessTypeId = this.businessTypeValue == "所有"?"":this.businessTypeId
        let secondClassId = this.secondClassValue == "所有"?"":this.secondClassId
        let thirdClassId = this.thirdClassValue == "所有"?"":this.thirdClassId
        let businTypeId = ''

        if(businessTypeId&&!secondClassId&&!thirdClassId){
          businTypeId = businessTypeId
        }else if(businessTypeId&&secondClassId&&!thirdClassId){
          businTypeId = secondClassId
        }else{
          businTypeId = thirdClassId
        }

        return {
          businTypeId,
          qcBatchId: this.qcBatchId.trim(),
          branchName: this.branchName.trim(),
          batchEndTime: this.batchEndTime,
          batchStartTime: this.batchStartTime,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        }
      }
    },
    watch:{
      dateValue(val,oldval){
        if(val){
          this.batchStartTime = val[0]
          this.batchEndTime = val[1]
        }else{
          this.batchStartTime = ''
          this.batchEndTime = ''
        }
      }
    }
  }
</script>

<style lang="less" scoped>
    .defective-statistics{
        width: 90%;
        margin:0 auto;

        .search-box{
            line-height: 50px;
            overflow: hidden;
            position: relative;
            padding: 20px 0;
            display: flex;
            flex-direction: row;
            background: #fff;
            flex-wrap: wrap;
            margin-bottom: 20px;

            .btn-box{
                width: 16%;
                text-align: center;

                button{
                    width: 80%;
                }
            }

            .date-pick{
                width: 70%;
                text-align: left;

                span{
                    margin-left: 20px;
                    vertical-align: top;
                    width: 120px;
                }
            }

            .search-item{
                width: 28%;
                text-align: left;
                padding-left: 20px;
                box-sizing: border-box;
                display: flex;

                .item-left{
                    /*flex: 80px 0;*/
                    width: 80px;
                    text-align: right;
                }

                .item-right{
                    flex:1;

                    .el-select.el-select--small{
                        width: 90%;
                    }

                    .el-input.el-input--small{
                        width: 90%;
                    }
                }
            }
        }

        .table-box {
            margin-top: 20px;
            width: 100%;
            background: #fff;
            padding-bottom: 1px;
        }
    }
</style>
