<template>
    <div class="manage">
        <div class="manage-box">
            <div class="manage-item">
                <item class="left">
                    <span>业务类型：</span>
                </item>
                <item class="right">
                    <el-select v-model="businessTypeValue" size="small" @change="handleTypeChange">
                        <el-option
                                v-for="item in businessType"
                                :key="item.id"
                                :label="item.businName"
                                :value="item.businName"
                        >
                        </el-option>
                    </el-select>
                </item>
            </div>
            <div class="manage-item">
                <div class="item-left">
                    <span>二级分类：</span>
                </div>
                <div class="item-right">
                    <el-select v-model="secondClassValue" size="small" @change="handleSecondClassChange">
                        <el-option
                                v-for="item in secondClass"
                                :key="item.id"
                                :label="item.businName"
                                :value="item.businName"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="manage-item">
                <div class="item-left">
                    <span>三级分类：</span>
                </div>
                <div class="item-right">
                    <el-select v-model="thirdClassValue" size="small"  @change="handleThirdClassChange">
                        <el-option
                                v-for="item in thirdClass"
                                :key="item.id"
                                :label="item.businName"
                                :value="item.businName"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="manage-search">
                <el-button type="primary" size="small" class="manage-search-btn" @click="handleSearch"><i class="el-icon-search"></i></el-button>
            </div>
            <div class="manage-item">
                <div class="item-left">
                    <span>批次类型：</span>
                </div>
                <div class="item-right">
                    <el-select v-model="batchTypeValue" size="small">
                        <el-option
                                v-for="item in batchType"
                                :key="item.key"
                                :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="manage-item">
                <div class="item-left">
                    <span>最终结果：</span>
                </div>
                <div class="item-right">
                    <el-select v-model="qcStatusValue" size="small" @change="handleQcSatusChange">
                        <el-option
                                v-for="item in qcType"
                                :key="item.key"
                                :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="manage-item">
                <div class="item-left">
                    <span>批次编号：</span>
                </div>
                <div class="item-right">
                    <el-input size="small" v-model="qcBatchIdValue" clearable></el-input>
                </div>
            </div>
            <div class="date-box">
                <span>质检时间：</span>
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
        <!-- 操作 -->
        <div class="opt">
            <el-button type="primary" plain @click="handleInsert">
                <i class="el-icon-plus"></i>
                新增人工批次
            </el-button>
        </div>
        <!-- 表格 -->
        <div class="manage-table">
            <el-table
                    :header-cell-style="{'background':'#E8E8E8','color':'black','font-weight':'800'}"
                    v-loading="loading"
                    :data="magageTableData"
                    border
                    stripe>
                <el-table-column
                        label="序号"
                        type="index"
                        width="50px"
                        align="center"
                        fixed='left'>
                </el-table-column>
                <el-table-column
                        prop="batchType"
                        label="批次类型"
                        fixed='left'
                        width="80px"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="质检业务"
                        fixed='left'
                        width="300px"
                        align="center">
                    <template slot-scope="{row}">
                        <span class="bussine" v-if="row.qcStatus==='已完成-成功'||row.qcStatus==='已完成-失败'||row.finalResult==='合格'" @click="handleShow(row)">{{row.bussine}}</span>
                        <span v-else>{{row.bussine}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="orderAmount"
                        label="订单总量"
                        width="120px"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="qcResult"
                        label="初检结果"
                        fixed='left'
                        width="100px"
                        align="center">
                    <template slot-scope="{row,$index}">
                        <span v-if="row.qcStatus==='已完成-成功'" class="qualified">合格</span>
                        <span v-else-if="row.qcStatus==='已完成-失败'" class="unqualified">不合格</span>
                        <span v-else-if="row.qcStatus==='异常'" class="unusual">{{row.qcStatus}}</span>
                        <span v-else class="bold">{{row.qcStatus}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="最终结果"
                        fixed='left'
                        width="100px"
                        align="center">
                    <template slot-scope="{row,$index}">
                        <span class="qualified" :class="row.finalResult === '合格'?'qualified':'unqualified'">{{row.finalResult}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="batchEndTime"
                        label="质检完成时间"
                        width="200px"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="批次编号"
                        width="120px"
                        align="center">
                    <template slot-scope="{row}">
                        <el-tooltip :content="row.qcBatchId" placement="top" effect="light">
                            <p class="batchId-box">{{row.qcBatchId}}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center">
                    <template slot-scope="{row}">
                        <span class="red" v-if="row.qcStatus==='未开始'" @click="handleDelete(row)">删除</span>
                        <span class="blue" v-if="row.qcStatus==='已完成-失败'" @click="handleDeal(row)">次品处理</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <pagination
                ref="pagination"
                :total="total"
                :currentPage="currentPage"
                :currentPageSize="currentPageSize"
                @changeCurrentPageSize="handleChangeCurrentPageSize"
                @changeCurrentPage="handleChangeCurrentPage">
        </pagination>
        <!-- 弹窗 -->
        <el-dialog
                @close="handleDialogClose"
                title="新增人工批次"
                :visible.sync="dialogVisible"
                width="60%">
            <div class="insert">
                <div class="insert-item">
                    <div class="title">
                        <span class="red">＊</span>
                        <span>批次名称：</span>
                    </div>
                    <div class="input">
                        <el-input v-model="i_titleValue" size="small"></el-input>
                    </div>
                    <span class="red" v-if="i_titleValue.length>36">输入长度超出，请保证在36个字符内</span>
                </div>
                <div class="insert-item">
                    <div class="title">
                        <span class="red">＊</span>
                        <span>请选择业务：</span>
                    </div>
                    <div class="select-box">
                        <div class="select-item">
                            <el-select v-model="i_businessTypeValue" size="small" @change="i_handleTypeChange">
                                <el-option
                                        v-for="item in i_businessType"
                                        :key="item.id"
                                        :label="item.businName"
                                        :value="item.businName">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="select-item">
                            <el-select v-model="i_secondClassValue" size="small" @change="i_handleSecondClassChange">
                                <el-option
                                        v-for="item in i_secondClass"
                                        :key="item.id"
                                        :label="item.businName"
                                        :value="item.businName">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="select-item">
                            <el-select v-model="i_thirdClassValue" size="small" @change="i_handleThirdClassChange">
                                <el-option
                                        v-for="item in i_thirdClass"
                                        :key="item.id"
                                        :label="item.businName"
                                        :value="item.businName">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="insert-item">
                    <div class="title">
                        <span class="red">＊</span>
                        <span>订单时间范围：</span>
                    </div>
                    <div class="date-pick">
                        <el-date-picker
                                v-model="i_dateValue"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                size="small"
                                :picker-options="pickOptions"
                                value-format="yyyyMMdd">
                        </el-date-picker>
                    </div>
                </div>
            </div>
            <span slot="footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
        </el-dialog>

        <!-- 提示弹窗 -->
        <div class="delete-box">
            <el-dialog
                    title="提示"
                    :visible.sync="deleteDialogVisible"
                    width="30%">
                <span>是否确认删除？</span>
                <span slot="footer" class="dialog-footer">
            <el-button @click="deleteDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleDeleteConfirm">确 定</el-button>
          </span>
            </el-dialog>
        </div>
    </div>

</template>

<script>
  import Pagination from 'components/common/Pagination.vue'
  import util from 'tools/util'
  import URL from 'api/url'
  import {finalResultTrans,statusTrans,finalResultTransToNum,batchTypeTrans} from 'tools/transform'
  let {CONVENTION_LIST,DEFECTIVE_BATCH_AND_STATUS,CONVENTION_BATCH_INSERT,CONVENTION_BATCH_DETELE} = URL
  export default {
    name:'manage',
    components:{
      Pagination
    },
    data(){
      return {
        i_titleValue: '',
        i_businessTypeValue:'',
        i_thirdClassValue:'',
        i_secondClassValue:'',
        i_businessTypeId:'',
        i_secondClassId:'',
        i_thirdClassId:'',
        i_businessType:[],
        i_thirdClass:[],
        i_secondClass:[],
        i_dateValue:[],
        loading:false,
        dialogVisible:false,
        promtDialogVisible:false,
        deleteDialogVisible:false,
        batchTypeValue:'所有',
        businessTypeValue:'',
        thirdClassValue:'',
        secondClassValue:'',
        businessTypeId:'',
        secondClassId:'',
        thirdClassId:'',
        batchStartTime:'',
        batchEndTime:'',
        checkDateValue:'',
        deleteRow:{},
        beginDate:'',
        endDate:'',
        qcBatchIdValue:'',
        qcStatusValue:'所有',
        qcStatusKey:'',
        total:0,
        currentPage:1,
        currentPageSize:20,
        magageTableData:[],
        isInsert:false,
        batchType:[
          {
            "key": "",
            "value": "所有"
          },
        ],
        businessType:[],
        thirdClass:[],
        secondClass:[],
        qcType:[
          {
            "key": "",
            "value": "所有"
          },
        ],
        pickOptions:{
          disabledDate(time){
            let curDate = (new Date()).getTime();
            let three = 90 * 24 * 3600 * 1000;
            let threeMonths = curDate - three;
            return time.getTime() > Date.now() || time.getTime() < threeMonths;
          }
        }
      }
    },
    mounted(){
      util.getBusin(this,'businessType','1','hasAll')
      util.getBatchInfo(this,'batchType','qcType')
      let queryData = this.$route.params
      let arr = Object.keys(queryData)
      if(arr.length != 0){
        delete queryData.id
        this._initSearchData(queryData)
        this._getList(this.searchData)
      }else{
        this.businessTypeValue = "所有"
        this.secondClassValue = "所有"
        this.thirdClassValue = "所有"
        this.loading = true
        this._getList(this.searchData)
      }

    },
    beforeRouteLeave(to, from, next) {
      from.meta.keepAlive = false;
      next();
    },
    methods:{
      _getList(params){
        this.loading = true
        this.$http.post(CONVENTION_LIST,params).then(res=>{
          if (res.status === 200 && res.data.status == 0) {
            let {data} = res.data
            util.formatBussine(data.items,'bussine')
            this.total = data.totalNum
            finalResultTrans(data.items)
            statusTrans(data.items)
            this.magageTableData = data.items
            this.loading = false
          }else{
            util.err()
          }
        }).catch(err => {
          util.err()
          console.log(err)
        })
      },
      _initSearchData(obj){
        this.batchEndTime = obj.batchEndTime
        this.qcBatchId = obj.batchType
        this.currentPage = obj.currentPage*1
        this.currentPageSize = obj.pageSize*1
        this.batchStartTime = obj.batchStartTime
        this.qcStatusKey = obj.finalResult
        this.qcBatchIdValue = obj.qcBatchId
      },
      _search(params){
        this._getList(params)
      },
      _i_search(){
        this.i_titleValue = ''
        this.i_businessTypeValue = ''
        this.i_firstClassValue = ''
        this.i_secondClassValue = ''
        this.i_dateValue = []
      },
      _i_clear(){
        this.i_titleValue = ''
        this.i_businessTypeValue = '',
          this.i_firstClassValue = '',
          this.i_secondClassValue = '',
          this.i_dateValue = []
      },
      _insert(){
        if(!this.isInsert){
          this.isInsert = !this.isInsert
          let i_businessTypeId = this.i_businessTypeValue == "所有"?"":this.i_businessTypeId
          let i_secondClassId = this.i_secondClassValue == "所有"?"":this.i_secondClassId
          let i_thirdClassId = this.i_thirdClassValue == "所有"?"":this.i_thirdClassId
          let id
          if(i_businessTypeId&&!i_secondClassId&&!i_thirdClassId){
            id = i_businessTypeId
          }else if(i_businessTypeId&&i_secondClassId&&!i_thirdClassId){
            id = i_secondClassId
          }else{
            id = i_thirdClassId
          }

          this.$http.post(CONVENTION_BATCH_INSERT,{
            qcBatchName: this.i_titleValue,
            businTypeId: id,
            startDate: this.i_dateValue[0],
            endDate: this.i_dateValue[1]
          }).then(res=>{
            let {data} = res
            if (res.status === 200 && res.data.status === 0) {
              util.success(data.message)
              this._i_clear()
              this.dialogVisible = false
              this._getList(this.searchData)
              this.isInsert = !this.isInsert
            }else{
              util.error(data.message)
            }
          })
        }
      },
      _delete(id){
        this.$http.get(CONVENTION_BATCH_DETELE,{params:{qcBatchId:id}}).then(res=>{
          let {data} = res
          if (res.status === 200 && res.data.status === 0) {
            util.success(data.message)
            this._search(this.searchData)
          }else{
            util.error(data.message)
          }
        })
      },
      handleShow(row,index){
        let {qcBatchId} = row
        this.$router.push({name:'批次详情',params:{id:qcBatchId}})
      },
      handleInsert(){
        // if(!this.i_businessType.length>0){
        // util.getSeletData(this,'i_businessType')
        util.getBusin(this,'i_businessType','1',false)
        // }
        this.dialogVisible = true
      },
      handleDeal(row){
        let {qcBatchId} = row
        this.$router.push({name:'次品详情',query:{qcBatchId}})
      },
      handleCancel(){
        this.dialogVisible = false
        this._i_clear()
      },
      handleConfirm(){
        if(this.i_titleValue.length<=36){
          if(this.i_titleValue&&this.i_businessTypeValue&&this.i_secondClassValue&&this.i_thirdClassValue&&this.i_dateValue.length>0){
            this._insert()
          }else{
            util.error('请填写完整信息')
          }
        }else{
          util.error('输入长度超出，请保证在36个字符内')
        }
      },
      handleChangeCurrentPageSize(val){
        util.wrapToTop(this)
        this.currentPageSize = val
        this._search(this.searchData)
      },
      handleChangeCurrentPage(val){
        util.wrapToTop(this)
        this.currentPage = val
        this._search(this.searchData)
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
      handleQcSatusChange(val){
        let qcStatusKey = finalResultTransToNum(val)
        this.qcStatusKey = qcStatusKey
      },
      i_handleTypeChange(val){
        this.i_businessTypeValue = val
        util.i_businTypeChange(this, this.i_businessTypeValue, val,false)
      },
      i_handleSecondClassChange(val){
        this.i_secondClassValue = val
        util.i_secondClassChange(this, this.i_secondClassValue, val,false)
      },
      i_handleThirdClassChange(val){
        this.i_thirdClassValue = val
        util.i_thirdClassChange(this, this.i_thirdClassValue, val)
      },
      handleSearch(){
        this.currentPage = 1
        this._search(this.searchData)
      },
      handleDialogClose(){
        this._i_clear()
      },
      handleDelete(row){
        this.deleteDialogVisible = true
        this.deleteRow = row
      },
      handleDeleteConfirm(){
        let {qcBatchId} = this.deleteRow
        this.deleteDialogVisible = false
        this._delete(qcBatchId)
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

        let batchType = batchTypeTrans(this.batchTypeValue)
        return {
          businTypeId,
          batchEndTime: this.batchEndTime,
          batchStartTime: this.batchStartTime,
          batchType,
          currentPage: this.currentPage,
          pageSize: this.currentPageSize,
          qcBatchId: this.qcBatchIdValue,
          finalResult: this.qcStatusKey
        }
      }
    },
    watch:{
      checkDateValue(val,oldval){
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
    .manage{
        width: 90%;
        margin:0 auto;
        padding-bottom: 5px;

        .manage-box{
            line-height: 50px;
            overflow: hidden;
            position: relative;
            padding: 20px 0;
            background: #fff;

            .manage-item{
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

            .date-box{
                overflow: hidden;
                float: left;
                width: 44%;
                text-align: left;
                padding-left: 20px;
            }

            .manage-search{
                float: left;
                width: 13%;

                .manage-search-btn{
                    width: 70%;
                    .el-icon-search{
                        font-size:14px;
                    }
                }
            }
        }

        .opt{
            text-align: left;
            padding: 0 10px;
            margin-top: 20px;
            background: #fff;
            overflow: hidden;
            padding: 10px 10px 0;
        }

        .manage-table{
            padding: 1%;
            margin: 0 auto;
            background: #fff;
            overflow: hidden;

            .batchId-box{
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .qualified{
                color: @color-qualified;
                font-weight: 700;
            }

            .unqualified{
                color: @color-unqualified;
                font-weight: 700;
            }

            .bold{
                font-weight: 800;
            }

            .unusual{
                color: @color-unusual;
                font-weight: 700;
            }

            .bussine{
                cursor: pointer;
                color:@color-blue;
                text-decoration: underline;
            }

            .qcBatchId:hover{
                color: @color-blue;
            }

            .blue{
                color: @color-blue;
                cursor: pointer;
            }

            .red{
                color: @color-red;
                cursor: pointer;
            }
        }

        .insert{
            line-height: 50px;

            .insert-item{
                overflow: hidden;

                .red{
                    color: @color-red;
                }

                .date-pick{
                    float: left;
                    width: 70%;
                    text-align: left;
                    margin-left: 10px;
                }

                .select-box{
                    width: 80%;
                    float: left;

                    .select-item{
                        width: 33%;
                        float: left;
                        box-sizing: border-box;
                        padding: 0 10px;
                        text-align: left;

                        .el-select.el-select--small{
                            width: 162px;
                        }
                    }
                }

                .title{
                    width: 20%;
                    text-align: right;
                    float: left;
                }

                .input{
                    width: 45%;
                    float: left;
                    margin-left: 10px;
                }
            }
        }
    }
</style>

