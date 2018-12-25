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
                        width="300">
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
                        <span v-if="row.finalResult == 1" class="unqualified">不合格</span>
                        <span v-if="row.finalResult == 0" class="qualified">合格</span>
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
        <div>
            <el-button @click="go"></el-button>
        </div>
    </div>
</template>
<script>
  import Pagination from 'components/common/Pagination.vue'
  import {finalResultTrans,finalResultTransToNum} from 'tools/transform'
  import util from 'tools/util'
  import URL from 'api/url'
  let {CONVENTION_BATCH_AND_STATUS,RECHECK_LIST,RECHECK_ADD,RECHECK_DETAIL_LIST} = URL
  export default {
    name:'recheckManage',
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
        finalResType:[
          {
            "key": "",
            "value": "所有"
          },
        ],
        tableData:[{
          "batchType" : "人工批次",
          "originBatchType" : null,
          "qcBatchId" : "7DBFCD8680D63A56E053177D10ACED9A",
          "orderAmount" : 483,
          "qcStatus" : "已完成-失败",
          "batchEndTime" : null,
          "businKind" : "代销金融产品",
          "businSubKind" : "现金产品登记-天天盈",
          "businName" : "自助",
          "qcResult" : null,
          "finalResult" : "1",
          "qcBatchName" : "人工测试旧标准2",
          "creator" : "user1",
          "createTime" : "2018-12-24 18:23:33",
          "spotType" : null,
          "uneligAmount" : 483,
          "reExaminationCount" : 1,
          "originalQcBatchId" : null,
          "finalUneligAmount" : 483,
          "batchStartTime" : "2018-12-24 20:47:10",
          "reBatchCount" : null
        }],
        detailTableData:[
          {
            id:'11111'
            ,            bussine:'代销金融产品 > 认申购 > 自助',
            qcBatchName:'人工测试旧标准2',
            finalUneligAmount:20,
            reExaminationCount:2,
            orderAmount:100
          }
        ]
      }
    },
    mounted(){
      this.businessTypeValue = "所有"
      this.secondClassValue = "所有"
      this.thirdClassValue = "所有"
      util.getBusin(this,'businessType','1',true)
      this._getFinalResultType()
      // this._getList(this.params)
    },
    beforeRouteLeave(to, from, next) {
      from.meta.keepAlive = false;
      next();
    },
    methods:{
      _getList(params){
        this.loading = true
        this.$http.post(RECHECK_LIST,params).then(res=>{
          if (res.status === 200 && res.data.status === 0) {
            let { data } = res.data
            util.formatBussine(data.items,'bussine')
            this.tableData = data.items
            this.total = data.totalNum
            this.loading = false
          }
        }).catch(err => {
          util.error('服务器错误，请稍后再试')
          console.log(err)
        })
      },
      _getFinalResultType(){
        this.$http.post(CONVENTION_BATCH_AND_STATUS).then(res => {
          let { data } = res.data
          if (res.status === 200 && res.data.status === 0) {
            this.$lodash.remove(data.qcStatusList,{key:'-1',value:'未完成'})
            this.finalResType = this.finalResType.concat(data.qcStatusList)
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
      _getDetailList(qcBatchId){
        this.detail_loading = true
        this.$http.get(RECHECK_DETAIL_LIST,{params:{
            qcBatchId
          }}).then(res=>{
          let {data} = res
          if(res.status === 200 && res.data.status === 0){
            this.detailTableData = data.data
            this.detail_loading = false
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
        // this.$router.push({name:'复检详情',query:{qcBatchId:id,originalQcBatchId}})
        // this.$router.push({name:'复检详情',params:{qcBatchId:id,originalQcBatchId:"1111"}})
        this.recheckDialogVisible = false
        console.log(id,originalQcBatchId)
        this.$router.push({name:'复检详情',params:{qcBatchId:id,originalQcBatchId}})
      },
      go(){
        this.$router.push({path:'/quality/reDetail',params:{qcBatchId:'222',originalQcBatchId:"1111"}})
      },
      handleFinalResChange(val){
        let finalResTypeKey = finalResultTransToNum(val)
        this.finalResTypeKey = finalResTypeKey
      },
      handleAddRecheck(row){
        let {qcBatchId} = row
        this._addRecheck(qcBatchId)
      },
      handleDetailShow(row){
        this.recheckDialogVisible = true
        let {qcBatchId} = row
        console.log(qcBatchId)
        // this._getDetailList(qcBatchId)
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
          pageSize: this.currentPageSize
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

            .recheck-item{
                float: left;
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
