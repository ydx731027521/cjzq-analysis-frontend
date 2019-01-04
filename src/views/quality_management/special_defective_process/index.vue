<template>
    <div class="defective-box">
        <div class="content">
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
                        <el-select v-model="secondClassValue" size="small" @change="handleFirstClassChange">
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
                        <el-select v-model="thirdClassValue" size="small" @change="handleSecondClassChange">
                            <el-option
                                    v-for="item in thirdClass"
                                    :key="item.id"
                                    :label="item.businName"
                                    :value="item.businName">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-item">
                    <div class="item-left">
                        <span>批次编号：</span>
                    </div>
                    <div class="item-right">
                        <el-input size="small" v-model="qcBatchId" clearable></el-input>
                    </div>
                </div>
                <div class="check-date">
                    <span>质检时间：</span>
                    <div>
                        <el-date-picker
                                v-model="checkDateValue"
                                size="small"
                                type="daterange"
                                value-format="yyyyMMdd"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </div>
            </div>
            <div class="btn-box">
                <el-button type="primary" size="small" @click="handleSearch"><i class="el-icon-search"></i></el-button>
            </div>
        </div>
        <!--表格-->
        <div class="content">
            <div class="table-box">
                <div class="btn">
                    <el-button type="primary" plain @click="handleExportIn"><i class="el-icon-download"></i>导入</el-button>
                </div>
                <div class="table">
                    <el-table
                            v-loading="loading"
                            :header-cell-style="{'background':'#E8E8E8','color':'black','font-weight':'800'}"
                            ref="multipleTable"
                            :data="defectiveTableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            border
                            stripe
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                type="selection"
                                width="50"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                label="序号"
                                type="index"
                                width="50"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="bussine"
                                label="业务类型"
                                width="300"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="qcBatchId"
                                label="批次号"
                                width="200"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="markItemName"
                                label="次品名称"
                                width="200"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="dealDateTime"
                                label="处理时间"
                                width="200"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="remark"
                                label="备注"
                                width="200"
                                align="center">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <!-- 分页 -->
        <pagination
                :total="total"
                :currentPage="currentPage"
                :currentPageSize="currentPageSize"
                @changeCurrentPageSize="handleChangeCurrentPageSize"
                @changeCurrentPage="handleChangeCurrentPage">
        </pagination>
    </div>
</template>

<script>
  import axios from 'axios'
  import Pagination from 'components/common/Pagination.vue'
  import baseUrl from '../../../setBaseUrl'
  import URL from 'api/url'
  let {DEFECTIVE_LIST,DEFECTIVE_DETAIL,DEFECTIVE_EXCEL_EXPORT} = URL
  import util from 'tools/util'
  export default {
    name:'defective',
    components:{
      Pagination
    },
    data(){
      return {
        loading:false,
        checkDateValue:'',
        businTypeValue:'',
        thirdClassValue:'',
        secondClassValue:'',
        total:0,
        currentPage:1,
        currentPageSize:20,
        businessType:[],
        thirdClass:[],
        secondClass:[],
        businessTypeValue:'',
        thirdClassValue:'',
        secondClassValue:'',
        beginDate:'',
        endDate:'',
        defectiveTableData:[],
        multipleSelection: [],
        qcBatchId:''
      }
    },
    mounted(){
      this.businessTypeValue = "所有"
      this.secondClassValue = "所有"
      this.thirdClassValue = "所有"
      // this._getlist(this.searchData)
      util.getBusin(this,'businessType','1',true)
    },
    beforeRouteLeave(to, from, next) {
      from.meta.keepAlive = false;
      next();
    },
    methods:{
      _getlist(params){
        this.loading = true
        this.$http.post(DEFECTIVE_LIST,params).then(res=>{
          if (res.status === 200 && res.data.status === 0) {
            let {data} = res.data
            util.formatBussine(data.items,'bussine')
            this.defectiveTableData = data.items
            this.total = data.totalNum
            this.loading = false
          }
        })
      },
      _exportIn(){
      },
      handleSelectionChange(val){
        this.multipleSelection = val
      },
      handleDetail(row,index){
        this.$router.push({name:'次品详情',params:{qcBatchId:row.qcBatchId}})
      },
      handleTypeChange(val){
        this.businessTypeValue = val
        util.businTypeChange(this, this.businessTypeValue, val,true)
      },
      handleFirstClassChange(val){
        this.secondClassValue = val
        util.secondClassChange(this, this.secondClassValue, val,true)
      },
      handleSecondClassChange(val){
        this.thirdClassValue = val
        util.thirdClassChange(this, this.thirdClassValue, val)
      },
      handleChangeCurrentPageSize(val){
        util.wrapToTop(this)
        this.currentPage = 1
        this.currentPageSize = val
        this._getlist(this.searchData)
      },
      handleChangeCurrentPage(val){
        util.wrapToTop(this)
        this.currentPage = val
        this._getlist(this.searchData)
      },
      handleSearch(){
        this._getlist(this.searchData)
      },
      handleExportIn(){
        this._exportIn()
      }
    },
    computed:{
      searchData(){
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
          batchEndTime: this.endDate,
          batchStartTime: this.beginDate,
          currentPage: this.currentPage,
          pageSize: this.currentPageSize,
          qcBatchId: this.qcBatchId
        }
      }
    },
    watch:{
      checkDateValue(val,oldval){
        if(val){
          this.beginDate = val[0]
          this.endDate = val[1]
        }else{
          this.beginDate = ''
          this.endDate = ''
        }
      }
    }
  }
</script>

<style lang="less" scoped>
    @import '~style/varible.less';
    .defective-box{
        width: 90%;
        margin:0 auto;

        .content{
            padding: 10px;
            display: flex;
            margin-bottom: 20px;
            background: #fff;

            .search-box{
                width: 85%;
                overflow: hidden;
                line-height: 50px;

                .check-date{
                    display: flex;
                    float: left;
                    text-align: left;
                    padding-left: 20px;
                    box-sizing: border-box;
                    width: 66.6%;

                    &>span{
                        float: left;
                        width: 80px;
                        text-align: right;
                    }

                    &>div{
                        float: left;
                    }
                }

                .search-item{
                    float: left;
                    width: 33.3%;
                    text-align: left;
                    padding-left: 20px;
                    box-sizing: border-box;
                    display: flex;

                    .item-left{
                        flex: 80px 0;
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

            .btn-box{
                flex: 1;
                line-height: 50px;

                button{
                    width: 60%;
                }
            }

            .table-box {
                margin-top: 20px;
                width: 100%;

                .btn{
                    text-align: left;

                    button{
                        margin-bottom: 20px;
                    }
                }

                .detail-btn{
                    cursor: pointer;
                    color: @color-blue;
                }
            }
        }
    }
</style>
