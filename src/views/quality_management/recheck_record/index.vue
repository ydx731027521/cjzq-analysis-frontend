<script src="../../../tools/transform.js"></script>
<template>
    <div class="recheck-record">
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
                                :value="item.businName"
                        >
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
                    <span>复检结果：</span>
                </div>
                <div class="item-right">
                    <el-select v-model="qcStatusValue" size="small" @change="handleQcStatusChange">
                        <el-option
                                v-for="item in qcStatus"
                                :key="item.key"
                                :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="search-item">
                <div class="item-left">
                    <span>原批次编号：</span>
                </div>
                <div class="item-right">
                    <el-input size="small" v-model="origQcBatchIdValue" clearable></el-input>
                </div>
            </div>
            <div class="search-item">
                <div class="item-left">
                    <span>复检批次编号：</span>
                </div>
                <div class="item-right">
                    <el-input size="small" v-model="qcBatchIdValue" clearable></el-input>
                </div>
            </div>
            <div class="date-pick">
                <span>复检时间：</span>
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
        <div class="recheck-record-table">
            <el-table
                    :header-cell-style="{'background':'#E8E8E8','color':'black','font-weight':'800'}"
                    v-loading="loading"
                    :data="tableData"
                    border
                    stripe>
                <el-table-column
                        label="序号"
                        type="index"
                        width="50px"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="originBatchType"
                        label="原批次类型"
                        width="120px"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="originalQcBatchId"
                        label="原批次编号"
                        width="300px"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="qcBatchName"
                        label="原批次名称"
                        width="300px"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="复检结果"
                        width="120px"
                        align="center">
                    <template slot-scope="{row}">
                        <span v-if="row.qcStatus==='已完成-成功'" class="qualified">合格</span>
                        <span v-else-if="row.qcStatus==='已完成-失败'" class="unqualified">不合格</span>
                        <span v-else-if="row.qcStatus==='异常'" class="unusual">{{row.qcStatus}}</span>
                        <span v-else class="bold">{{row.qcStatus}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="bussine"
                        label="质检业务"
                        width="300px"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="reExaminationCount"
                        label="复检次数"
                        width="80px"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="orderAmount"
                        label="订单总数"
                        width="100px"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="uneligAmount"
                        label="不合格订单数"
                        width="120px"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="creator"
                        label="创建人"
                        width="80px"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="batchStartTime"
                        label="复检开始时间"
                        width="160px"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="创建时间"
                        width="160px"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="复检批次编号"
                        width="130"
                        align="center">
                    <template slot-scope="{row}">
                        <el-tooltip :content="row.qcBatchId" placement="top" effect="light">
                            <p class="batchId-box">{{row.qcBatchId}}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        align="center">
                    <template slot-scope="{row}">
                        <span class="red" v-if="row.qcStatus==='未开始'" @click="handleDelete(row)">删除</span>
                        <span class="blue text"  v-if="row.qcStatus=='已完成-成功'||row.qcStatus=='已完成-失败'" @click="handleShowResult(row)">复检结果</span>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <pagination
                    :total="total"
                    :currentPage="currentPage"
                    :pageSize="pageSize"
                    @changeCurrentPageSize="handleChangeCurrentPageSize"
                    @changeCurrentPage="handleChangeCurrentPage">
            </pagination>
        </div>
        <!-- 删除弹窗 -->
        <el-dialog
                :close-on-click-modal=false
                :close-on-press-escape=false
                title="提醒"
                :visible.sync="deleteDialogVisible"
                append-to-body
                width="30%">
            <span>是否确认删除该记录？</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="handleDeleteCancel">取 消</el-button>
            <el-button type="primary" @click="handleDeleteConfirm">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
  import EssantialSearch from 'components/essantial_config_search.vue'
  import Pagination from 'components/common/Pagination'
  import util from 'tools/util'
  import URL from 'api/url.js'
  import {qcStatusTransToNum} from 'tools/transform'
  let {SPOT_CHECK_CONVENTION_LIST, RECHECK_RECORD_RECHECKSTATUS,RECHECK_RECORD_DELETE} = URL
  export default {
    name:'recheckRecord',
    components:{
      EssantialSearch,
      Pagination
    },
    data(){
      return {
        loading:false,
        currentPage:1,
        pageSize:20,
        total:0,
        markType:'',
        qcName:'',
        options:[],
        businessTypeValue:'',
        secondClassValue:'',
        thirdClassValue:'',
        businessTypeId:'',
        secondClassId:'',
        thirdClassId:'',
        qcBatchIdValue:'',
        dateValue:[],
        businessType:[],
        secondClass:[],
        thirdClass:[],
        qcStatusValue:'所有',
        tableData:[],
        batchStartTime:'',
        batchEndTime:'',
        businTypeId:'',
        origQcBatchIdValue:'',
        deleteDialogVisible:false,
        deleteRow:{},
        qcStatusKey:null,
        qcStatus:[
          {
            "key": "",
            "value": "所有"
          },
        ],
      }
    },
    // beforeRouteLeave(to, from, next) {
    //   from.meta.keepAlive = false;
    //   next();
    // },
    updated(){
      let liList = document.getElementsByClassName('number')
      if(liList.length>0){
        for(let i=0;i<liList.length;i++){
          liList[i].classList.remove('active')
        }

        liList[this.currentPage-1].classList.add('active')
      }
    },
    mounted(){
      this.businessTypeValue = "所有"
      this.secondClassValue = "所有"
      this.thirdClassValue = "所有"

      let {params} = this.$route.params

      if(params){
        let keyList = Object.keys(params)
        keyList.map(item=>{
          this[item] = params[item]
        })
      }else{
          util.getBusin(this,'businessType','1',true)
          util.getBatchInfo(this,'qcStatus')
      }
      this._getList(this.params)
    },
    methods:{
      _getList(params){
        this.loading = true
        this.$http.post(SPOT_CHECK_CONVENTION_LIST,params).then(res=>{
          if (res.status === 200 && res.data.status === 0) {
            let { data } = res.data
            if(data){
              util.formatBussine(data.items,'bussine')
              this.tableData = data.items
              this.total = data.totalNum
            }
            this.loading = false
          }else{
            util.error(res.data.message)
          }
        })
      },
      _getQcStatus(){
        this.$http.get(RECHECK_RECORD_RECHECKSTATUS).then(res => {
          if (res.status === 200 && res.data.status === 0) {
            let { data } = res.data
            this.qcStatus = this.qcStatus.concat(data)
          }
        }).catch(err => {
          util.error('服务器错误，请稍后再试')
        })
      },
      _delete(qcBatchId){
        this.$http.get(RECHECK_RECORD_DELETE,{params:{
            qcBatchId
          }}).then(res=>{
          let {data} = res
          if(res.status === 200 && data.status === 0){
            util.success(data.message)
            this._getList(this.params)
          }else{
            util.error(data.message)
          }
        })
        this.deleteDialogVisible = false
      },
      handleChangeCurrentPageSize(val){
        this.pageSize = val;
        this.currentPage = 1
        this._getList(this.params)
        util.wrapToTop(this)
      },
      handleChangeCurrentPage(val){
        this.currentPage = val;
        this._getList(this.params)
        util.wrapToTop(this)
      },
      handleShowDetail(row){
        let {originalQcBatchId} = row
        let obj = {
          currentPage:this.currentPage,
          pageSize:this.pageSize,
          businTypeId:this.businTypeId,
          qcBatchIdValue:this.qcBatchIdValue,
          batchStartTime:this.batchStartTime,
          batchEndTime:this.batchEndTime,
          qcStatusKey:this.qcStatusKey,
          businessTypeValue:this.businessTypeValue,
          secondClassValue:this.secondClassValue,
          thirdClassValue:this.thirdClassValue,
          qcStatusValue:this.qcStatusValue,
          origQcBatchIdValue:this.origQcBatchIdValue,
          qcBatchIdValue:this.qcBatchIdValue,
          dateValue:this.dateValue,
          businessType:this.businessType,
          secondClass:this.secondClass,
          thirdClass:this.thirdClass,
          qcStatus:this.qcStatus,
        }
        this.$router.push({name:'批次管理详情',params:{
            id:originalQcBatchId,
            params:obj
          }})
      },
      handleShowResult(row){
        let {originalQcBatchId,qcBatchId} = row
        let obj = {
          currentPage:this.currentPage,
          pageSize:this.pageSize,
          businTypeId:this.businTypeId,
          qcBatchIdValue:this.qcBatchIdValue,
          batchStartTime:this.batchStartTime,
          batchEndTime:this.batchEndTime,
          qcStatusKey:this.qcStatusKey,
          businessTypeValue:this.businessTypeValue,
          secondClassValue:this.secondClassValue,
          thirdClassValue:this.thirdClassValue,
          qcStatusValue:this.qcStatusValue,
          origQcBatchIdValue:this.origQcBatchIdValue,
          qcBatchIdValue:this.qcBatchIdValue,
          dateValue:this.dateValue,
          businessType:this.businessType,
          secondClass:this.secondClass,
          thirdClass:this.thirdClass,
          qcStatus:this.qcStatus,
        }
        this.$router.push({name:'复检详情',params:{originalQcBatchId,qcBatchId,isRecheckManage:false,isRecheckRecord:true,params:obj}})
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
      handleQcStatusChange(val){
        this.qcStatusValue = val
        let qcStatusKey = qcStatusTransToNum(val)
        this.qcStatusKey = qcStatusKey
      },
      handleDelete(row){
        this.deleteRow = row
        this.deleteDialogVisible = true
      },
      handleDeleteCancel(){
        this.deleteDialogVisible = false
      },
      handleDeleteConfirm(){
        let {qcBatchId} = this.deleteRow
        this._delete(qcBatchId)
      }
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
        this.businTypeId = businTypeId

        return {
          currentPage:this.currentPage,
          pageSize:this.pageSize,
          businTypeId:this.businTypeId,
          qcBatchId:this.qcBatchIdValue.trim(),
          batchStartTime:this.batchStartTime,
          batchEndTime:this.batchEndTime,
          originalQcBatchId:this.origQcBatchIdValue.trim(),
          qcStatus:this.qcStatusKey,
          batchType: "3"
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
    @import '~style/varible.less';
    .recheck-record{
        width: 90%;
        margin:0 auto;
        overflow: hidden;

        .search-box{
            line-height: 50px;
            overflow: hidden;
            padding: 20px 0;
            background: #fff;

            .btn-box{
                width: 16%;
                float: left;
                text-align: center;

                button{
                    width: 80%;
                }
            }

            .search-item{
                float: left;
                width: 28%;
                text-align: left;
                padding-left: 20px;
                box-sizing: border-box;
                display: flex;

                .item-left{
                    flex: 120px 0;
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

        .date-pick{
            float: left;
            width: 70%;
            text-align: left;

            span{
                margin-left: 20px;
                display: inline-block;
                text-align: right;
                width: 120px;
            }
        }

        .recheck-record-table{
            padding: 1%;
            margin: 0 auto;
            background: #fff;

            .qualified{
                color: @color-qualified;
                font-weight: 700;
            }

            .unqualified{
                color: @color-unqualified;
                font-weight: 700;
            }

            .unusual{
                color: @color-unusual;
                font-weight: 700;
            }

            .batchId-box{
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .red{
                color: @color-red;
                cursor: pointer;
            }

            .bold{
                font-weight: 800;
            }

            .blue{
                color: @color-blue;
            }

            .text{
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
</style>

