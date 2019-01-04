<script src="../../router/router.js"></script>
<template>
    <div class="recheck">
        <div class="recheck-box">
            <div class="recheck-item">
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
            <div class="recheck-item">
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
            <div class="recheck-item">
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
            <div class="recheck-item">
                <div class="item-left">
                    <span>复检结果：</span>
                </div>
                <div class="item-right">
                    <el-select v-model="finalResTypeValue" size="small" @change="handleFinalResChange">
                        <el-option
                                v-for="item in finalResType"
                                :key="item.key"
                                :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="recheck-item">
                <div class="item-left">
                    <span>批次编号：</span>
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
        <div class="recheck-table">
            <el-table
                    :header-cell-style="{'background':'#E8E8E8','color':'black','font-weight':'800'}"
                    :data="tableData"
                    stripe
                    border
                    style="width: 100%">
                <el-table-column
                        fixed="left"
                        type="index"
                        label="序号"
                        align="center"
                        width="50">
                </el-table-column>
                <el-table-column
                        fixed="left"
                        prop="bussine"
                        label="业务类型"
                        align="center"
                        width="350">
                </el-table-column>
                <el-table-column
                        fixed="left"
                        prop="qcBatchName"
                        align="center"
                        width="300"
                        label="批次名称">
                </el-table-column>
                <el-table-column
                        prop="orderAmount"
                        align="center"
                        width="120"
                        label="总订单数">
                </el-table-column>
                <el-table-column
                        prop="finalUneligAmount"
                        align="center"
                        width="140"
                        label="复检不合格订单数">
                </el-table-column>
                <el-table-column
                        prop="reExaminationCount"
                        align="center"
                        width="80"
                        label="复检次数">
                    <template slot-scope="{row}">
                        <span class="count" @click="handleDetailShow(row)">{{row.reExaminationCount}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        width="100"
                        label="复检结果">
                    <template slot-scope="{row}">
                        <span class="qualified" v-if="row.finalResult === '合格'">{{row.finalResult}}</span>
                        <span class="unqualified" v-if="row.finalResult === '不合格'">{{row.finalResult}}</span>
                        <span class="recheck" v-if="row.finalResult === '复检中'">{{row.finalResult}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="batchStartTime"
                        align="center"
                        width="180"
                        label="开始时间">
                </el-table-column>
                <el-table-column
                        align="center"
                        width="130"
                        label="批次编号">
                    <template slot-scope="{row}">
                        <el-tooltip :content="row.qcBatchId" placement="top" effect="light">
                            <p class="batchId-box">{{row.qcBatchId}}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="操作">
                    <template slot-scope="{row}">
                        <span v-if="row.finalResult == 1" class="blue" @click="handleAddRecheck(row)">复检</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <pagination
                :total="total"
                :currentPage="currentPage"
                :currentPageSize="currentPageSize"
                @changeCurrentPageSize="handleChangeCurrentPageSize"
                @changeCurrentPage="handleChangeCurrentPage">
        </pagination>
        <!-- 复检次数弹窗 -->
        <div class="delete-box">
            <el-dialog
                    :close-on-click-modal=false
                    :close-on-press-escape=false
                    title="复检详情"
                    :visible.sync="recheckDialogVisible"
                    width="70%">
                <div class="recheck-box">
                    <el-table
                            v-loading="detail_loading"
                            :header-cell-style="{'background':'#E8E8E8','color':'black','font-weight':'800'}"
                            :data="detailTableData"
                            style="width: 100%"
                            border
                            stripe>
                        <el-table-column
                                label="序号"
                                type="index"
                                width="80"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                label="复检编号"
                                width="350"
                                align="center">
                            <template slot-scope="{row}">
                                <span class="blue text" @click="handleIdClick(row)">{{row.id}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="orderAmount"
                                label="复检订单总数"
                                width="150"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="finalUneligAmount"
                                label="复检订单不合格数"
                                width="150"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="creatTime"
                                label="创建时间"
                                width="200"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="reExaminationCount"
                                label="复检次数"
                                align="center">
                        </el-table-column>
                    </el-table>
                </div>
                <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="recheckDialogVisible = false">关 闭</el-button>
          </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
  import Pagination from 'components/common/Pagination.vue'
  import {finalResultTrans,finalResultTransToNum} from 'tools/transform'
  import util from 'tools/util'
  import URL from 'api/url'
  let {CONVENTION_BATCH_AND_STATUS,RECHECK_LIST,RECHECK_ADD} = URL

  export default {
    name:'demo',
    components:{
      Pagination
    },
    data(){
      return {
        loading:false,
        detail_loading:false,
        businessTypeValue:'',
        thirdClassValue:'',
        secondClassValue:'',
        businessTypeId:'',
        secondClassId:'',
        thirdClassId:'',
        businessType:[],
        thirdClass:[],
        secondClass:[],
        qcBatchIdValue:'',
        dateValue:'',
        total:0,
        currentPage:1,
        currentPageSize:20,
        recheckDialogVisible:false,
        finalResTypeValue:'所有',
        finalResTypeKey:'',
        batchStartTime:'',
        batchEndTime:'',
        isReBatch:false,
        finalResType:[
          {
            "key": "",
            "value": "所有"
          },
          {
            "key": "",
            "value": "复检中"
          },
        ],
        tableData:[],
        detailTableData:[]
      }
    },
    mounted(){
      this.businessTypeValue = "所有"
      this.secondClassValue = "所有"
      this.thirdClassValue = "所有"
      util.getBusin(this,'businessType','1',true)
      util.getBatchInfo(this,'finalResType')
      this._getList(this.params)
    },
    beforeRouteLeave(to, from, next) {
      from.meta.keepAlive = false;
      next();
    },
    methods: {
      _getList(params){
        this.loading = true
        this.$http.post(RECHECK_LIST,params).then(res=>{
          if (res.status === 200 && res.data.status === 0) {
            let { data } = res.data
            util.formatBussine(data.items,'bussine')
            finalResultTrans(data.items)
            this.tableData = data.items
            this.total = data.totalNum
            this.loading = false
          }
        }).catch(err => {
          util.error('服务器错误，请稍后再试')
          console.log(err)
        })
      },
      _addRecheck(id){
        this.$http.get(RECHECK_ADD,{params:{
            qcBatchId:id
          }}).then(res=>{
          let {data} = res
          if(res.status === 200 && res.data.status === 0){
            util.success(data.message)
            this._getList()
          }else{
            util.error(data.message)
          }
        }).catch(err => {
          util.err()
          console.log(err)
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
        this.currentPageSize = val
        this._getList(this.params)
      },
      handleChangeCurrentPage(val){
        util.wrapToTop(this)
        this.currentPage = val
        this._getList(this.params)
      },
      handleIdClick(row){
        let {id,originalQcBatchId} = row
        this.recheckDialogVisible = false
        this.$router.push({name:'复检详情',params:{qcBatchId:id,originalQcBatchId}})
      },
      handleDetailShow(row){
        this.recheckDialogVisible = true
        let {qcBatchId} = row
        this._getDetailList(qcBatchId)
      },
      handleAddRecheck(row){
        let {qcBatchId} = row
        this._addRecheck(qcBatchId)
      },
      handleFinalResChange(val){
        this.finalResTypeValue = val
        if(val!='复检中'){
          this.isReBatch = false
          this.finalResult = ''
          this.finalResTypeKey = finalResultTransToNum(val)
        }else{
          this.isReBatch = true
        }
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

        return {
          businTypeId,
          finalResult: this.finalResTypeKey,
          qcBatchId: this.qcBatchIdValue.trim(),
          batchEndTime: this.batchEndTime,
          batchStartTime: this.batchStartTime,
          currentPage: this.currentPage,
          pageSize: this.currentPageSize,
          isReBatch: this.isReBatch
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
    .recheck{
        width: 90%;
        margin:0 auto;
        background: #fff;
        padding-bottom: 5px;

        .recheck-box{
            line-height: 50px;
            overflow: hidden;
            position: relative;
            padding: 20px 0;
            display: flex;
            flex-direction: row;
            background: #fff;
            flex-wrap: wrap;

            .recheck-item{
                width: 28%;
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

            .btn-box{
                width: 16%;
                float: left;
                text-align: center;

                button{
                    width: 80%;
                }
            }

            .date-pick{
                float: left;
                width: 70%;
                text-align: left;

                span{
                    margin-left: 20px;
                    vertical-align: top;
                    width: 120px;
                }
            }
        }

        .blue,.count,.id{
            color:@color-blue;
            cursor: pointer;
        }


        .recheck-table{
            width: 98%;
            margin: 0 auto;
            margin-top: 20px;

            .qualified{
                color: @color-qualified;
                font-weight: 700;
            }

            .unqualified{
                color: @color-unqualified;
                font-weight: 700;
            }

            .recheck{
                color: @color-recheck;
                font-weight: 700;
            }

            .count{
                text-decoration: underline;
            }

            .batchId-box{
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        .text{
            text-decoration: underline;
        }
    }
</style>

