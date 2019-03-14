<template>
  <div class="spot-check-convention">
    <div class="title">
      <!-- <BusinTypeSearch :businTypeData='businessTypeData' :currentPage="currentPage" :pageSize="pageSize" :url="url" @getTableData="handleChangeTableData" @getList="handleChangeList" :tableData="tableData" @changeData="handleChangeData"></BusinTypeSearch> -->
      <div class="standard-box">
            <div class="standard-select">
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
            <div class="first-class">
              <div class="item-left">
                <span>二级分类：</span>
              </div>
                <div class="item-right">
                  <el-select v-model="secondClassValue" size="small"  @change="handleSecondClassChange">
                    <el-option
                            v-for="item in secondClass"
                            :key="item.id"
                            :label="item.businName"
                            :value="item.businName">
                    </el-option>
                  </el-select>
                </div>
            </div>
            <div class="second-class">
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
            <div class="standard-search">
                <el-button type="primary" size="small" class="standard-search-btn" @click="handleSearch"><i class="el-icon-search"></i></el-button>
            </div>
            <div class="batch-type">
              <div class="item-left">
                <span>抽检类型：</span>
              </div>
              <div class="item-right">
                <el-select v-model="spotCheckValue" size="small" @change="handleCheckTypeChange">
                  <el-option
                          v-for="item in spotCheck"
                          :key="item.type"
                          :label="item.desc"
                          :value="item.desc">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="batch-status">
              <div class="item-left">
                <span>批次状态：</span>
              </div>
              <div class="item-right">
                <el-select v-model="spotCheckStatusValue" size="small" @change="handleStatusChange">
                  <el-option
                          v-for="item in spotCheckStatus"
                          :key="item.key"
                          :label="item.value"
                          :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="batch-id">
              <div class="item-left">
                <span>批次编号：</span>
              </div>
              <div class="item-right">
                <el-input size="small" v-model="batchId" clearable></el-input>
              </div>
            </div>
            <div class="batch-name">
              <div class="item-left">
                <span>抽检名称：</span>
              </div>
              <div class="item-right">
                <el-input size="small" v-model="batchName" clearable></el-input>
              </div>
            </div>
            <div class="check-time">
                <span class="time-title">抽检时间：</span>
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
    <div class="opt">
      <el-button type="primary" plain @click="handleInsert" v-if="isInsertShow">
          <i class="el-icon-plus"></i>
          新增
      </el-button>
    </div>
    <div class="spot-check-convention-table">
      <el-table
        :header-cell-style="{'background':'#E8E8E8','color':'black','font-weight':'800'}"
        v-loading="loading"
        :data="tableData"
        border
        stripe>
        <el-table-column
                label="序号"
                type="index"
                width="50"
                fixed='left'
                align="center">
        </el-table-column>
        <el-table-column
                prop="spotType"
                label="抽检类型"
                width="100"
                fixed='left'
                align="center">
        </el-table-column>
        <el-table-column
                prop="qcBatchName"
                label="批次名称"
                fixed='left'
                width="220"
                align="center">
        </el-table-column>
        <el-table-column
                prop="qcStatus"
                label="状态"
                fixed='left'
                width="80"
                align="center">
                <template slot-scope="{row}">
                  <span class="unusual" v-if="row.qcStatus=='异常'">异常</span>
                  <span class="bold" v-if="row.qcStatus=='未开始'">未开始</span>
                  <span class="bold" v-if="row.qcStatus=='进行中'">进行中</span>
                  <span class="qualified" v-if="row.qcStatus=='已完成-成功'">合格</span>
                  <span class="unqualified" v-if="row.qcStatus=='已完成-失败'">不合格</span>
                </template>
        </el-table-column>
        <el-table-column
                label="抽检业务"
                fixed='left'
                width="350"
                align="center">
                <template slot-scope="{row}">
                    <span class="bussine" v-if="row.qcStatus==='已完成-失败'||row.qcStatus==='已完成-成功'" @click="handleShow(row)">{{row.bussine}}</span>
                    <span v-else>{{row.bussine}}</span>
                </template>
        </el-table-column>
        <el-table-column
                prop="creator"
                label="创建人"
                width="80"
                align="center">
        </el-table-column>
        <el-table-column
                prop="createTime"
                label="创建时间"
                width="180"
                align="center">
        </el-table-column>
        <el-table-column
                prop="time"
                label="订单时间范围"
                width="220"
                align="center">
        </el-table-column>
        <el-table-column
                label="批次编号"
                width="200"
                align="center">
                <template slot-scope="{row}">
                  <el-tooltip :content="row.qcBatchId" placement="top" effect="light">
                    <p class="batchId-box">{{row.qcBatchId}}</p>
                  </el-tooltip>
                </template>
        </el-table-column>
        <el-table-column
                label="操作"
                align="center"
                width="100">
          <template slot-scope="{row}">
              <span class="red" v-if="row.batchType==='抽检批次'&&row.qcStatus === '未开始'&&isInsertShow" @click="handleDelete(row)">删除</span>
              <span class="blue" v-if="row.qcStatus==='已完成-成功'||row.qcStatus==='已完成-失败'" @click="handleDeal(row)">抽检结果</span>
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
      <!-- 提示弹窗 -->
      </div>
      <div class="insert-dialog">
        <el-dialog
          :close-on-click-modal=false
          :close-on-press-escape=false
          :before-close="handleClose"
          title="新增抽检批次"
          :visible.sync="insertDialogVisible"
          align="left"
          width="70%">
          <div class="insert-box">
            <div class="insert-title">
              <div class="text">
                <span class="red">*</span>
                <span>批次名称：</span>
              </div>
              <div class="insert-title-input">
                <el-input size="small" v-model="i_insertTitleValue"></el-input>
              </div>
              <span class="red" v-if="i_insertTitleValue.length>36">输入长度超出，请保证在36个字符内</span>
            </div>
            <div class="insert-busin">
              <div class="text">
                <span class="red">*</span>
                <span>业务类型：</span>
              </div>
              <div class="busin-item">
                <el-select v-model="i_businessTypeValue" size="small" @change="i_handleTypeChange">
                    <el-option
                            v-for="item in i_businessType"
                            :key="item.id"
                            :label="item.businName"
                            :value="item.businName"
                    >
                    </el-option>
                </el-select>
              </div>
              <div class="busin-item">
              <el-select v-model="i_secondClassValue" size="small" @change="i_handleSecondClassChange">
                    <el-option
                            v-for="item in i_secondClass"
                            :key="item.id"
                            :label="item.businName"
                            :value="item.businName"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="busin-item">
              <el-select v-model="i_thirdClassValue" size="small"  @change="i_handleThirdClassChange">
                  <el-option
                          v-for="item in i_thirdClass"
                          :key="item.id"
                          :label="item.businName"
                          :value="item.businName"
                  >
                  </el-option>
              </el-select>
            </div>
          </div>
          <div class="qc-standard">
            <div class="text">
              <span class="red">*</span>
              <span>质检标准：</span>
            </div>
            <div class="select">
                <el-select v-model="i_qcStandardValue" size="small"  @change="i_handleQcStandardChange">
                  <el-option
                          v-for="item in i_qcStandard"
                          :key="item.id"
                          :label="item.qcStdVersion"
                          :value="item.qcStdVersion"
                  >
                  </el-option>
              </el-select>
            </div>
            <span class="red" ref='tip'></span>
          </div>
          <div class="spot-check-type">
            <div class="text">
              <span class="red">*</span>
              <span>抽查方式：</span>
            </div>
            <div class="radio-box">
              <div class="radio-item">
                <el-radio v-model="i_radio" label="1">全量查</el-radio>
              </div>
              <!-- <div class="radio-item">
                <el-radio v-model="i_radio" label="2">随机查</el-radio>
              </div> -->
              <div class="radio-item">
                <el-radio v-model="i_radio" label="3">指定订单</el-radio>
              </div>
            </div>
          </div>
          <div class="random-check" v-if="i_radio === '2'">
            <div class="text">
              <span class="red">*</span>
              <span>随机模式：</span>
            </div>
            <div class="random-check-radio">
              <div class="radio-item">
                <el-radio v-model="i_radio_random" label="1">按比例</el-radio>
              </div>
              <div class="radio-item">
                <el-radio v-model="i_radio_random" label="2">按数量</el-radio>
              </div>
            </div>
          </div>
          <div class="date" v-if="i_radio === '1'||i_radio === '2'">
            <div class="text">
              <span class="red">*</span>
              <span>日期范围：</span>
            </div>
            <div class="date-pick">
                <el-date-picker
                        v-model="i_dateValue"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        size="small"
                        value-format="yyyyMMdd">
                </el-date-picker>
            </div>
          </div>
          <div class="proportion" v-if="i_radio === '2'&&this.i_radio_random === '1'">
            <div class="text">
              <span class="red">*</span>
              <span>选择比例：</span>
            </div>
            <div class="proportion-input">
              <el-input size='small' v-model="i_proportionValue"></el-input>
            </div>
            <span>%</span>
          </div>
          <div class="number"  v-if="i_radio === '2'&&this.i_radio_random === '2'">
            <div class="text">
              <span class="red">*</span>
              <span>数　　量：</span>
            </div>
            <div class="number-input">
              <el-input v-model="i_numberValue" size='small'></el-input>
            </div>
          </div>
          <div class="origin-order-id" v-if="i_radio === '3'">
            <div class="text">
              <span class="red">*</span>
              <span>原始订单编号：</span>
            </div>
            <div class="textarea">
              <el-input type="textarea" v-model="i_textarea" :rows="8"></el-input>
              <span class="textarea-tip">还可输入<span class="red">{{remainNumber}}</span>条订单</span>
            </div>
          </div>
          <p v-if="i_radio === '3'" class="tip">注：订单编号以<span class="red">英文</span>逗号分隔，例如11111111,11111111,....,订单数不能超过200条</p>
        </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="insertCancel">取 消</el-button>
            <el-button type="primary" @click="insertDone">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <el-dialog
            :close-on-click-modal=false
            :close-on-press-escape=false
            title="提醒"
            :visible.sync="deleteDialogVisible"
            append-to-body
            width="30%">
        <span>是否确认删除？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="deleteDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleConfirmDelete">确 定</el-button>
          </span>
      </el-dialog>
  </div>
</template>

<script>
import BusinTypeSearch from 'components/businTpye_search.vue'
import Pagination from 'components/common/Pagination'
import util from 'tools/util'
import URL from 'api/url.js'
import {qcStatusTransToNum} from 'tools/transform'
import CONSTANT from 'api/constant'
import {mapState} from 'vuex'
let {SPOTCHECK_INSERT} = CONSTANT
let {SPOT_CHECK_CONVENTION_LIST,SPOT_CHECK_INSERT_QCSTANDARD,SPOT_CHECK_INSERT,SPOT_CHECK_DELETE,SPOT_CHECK_CHECKTYPE} = URL
export default {
  name:'spotCheckConvention',
  components:{
    BusinTypeSearch,
    Pagination
  },
  data(){
    return {
      loading:false,
      spotCheckStatusValue:'',
      spotCheckStatusId:'',
      spotCheckStatus:[
        {
          "key": "",
          "value": "所有"
        }
      ],
      currentPage:1,
      pageSize:20,
      total:0,
      businessType:[],
      secondClass:[],
      thirdClass:[],
      businessTypeValue:'',
      thirdClassValue:'',
      secondClassValue:'',
      businessTypeId:'',
      secondClassId:'',
      thirdClassId:'',
      tableData:[],
      businessTypeData:[],
      status:[],
      url:'',
      insertDialogVisible:false,
      deleteDialogVisible:false,
      i_proportionValue:'',
      i_insertTitleValue:'',
      i_businessTypeValue:'',
      i_secondClassValue:'',
      i_thirdClassValue:'',
      i_businessTypeId:'',
      i_secondClassId:'',
      i_thirdClassId:'',
      i_businessType:[],
      i_secondClass:[],
      i_thirdClass:[],
      i_qcStandardValue:'',
      i_qcStandard:[],
      i_radio:'1',
      i_dateValue:[],
      i_numberValue:'',
      i_qcTime:[],
      i_textarea:'',
      i_radio_random:'1',
      startTime:'',
      endTime:'',
      deleteRow:'',
      batchId:'',
      batchName:'',
      spotCheckValue:'',
      spotCheckId:'',
      spotCheck:[],
      checkDateValue:[],
      checkBeginDate:'',
      checkEndDate:'',
      isInsert:false,
      isDelete:{},
      id:'',
      businTypeId:''
    }
  },
  beforeRouteLeave(to, from, next) {
      from.meta.keepAlive = false;
      next();
  },
  mounted(){
    this.businessTypeValue = '所有'
    this.secondClassValue = '所有'
    this.thirdClassValue = '所有'
    this.spotCheckValue = '所有'
    this.spotCheckStatusValue = '所有'

      let {params} = this.$route.params
      if(params){
        let keyList = Object.keys(params)
        keyList.map(item=>{
          this[item] = params[item]
        })
      }else{
        util.getBusin(this,'businessType','1',true)
        util.getBatchInfo(this,'spotCheckStatus')
      }

    this._getList()
    this._getCheckType()
    this._initSpotCheck()
  },
  methods:{
    _initSpotCheck(){
      this.spotCheck = [{type:'',desc:'所有'}]
    },
    _clearQcStandard(){
      this.i_qcStandard = []
      this.i_qcStandardValue = ''
    },
    _getCheckType(){
      this.$http.get(SPOT_CHECK_CHECKTYPE).then(res=>{
        let {data} = res
        if(res.status === 200 && data.status === 0){
          this.spotCheck = this.spotCheck.concat(data.data)
        }else{
          util.error(data.message)
        }
      })
    },
    _getSelectData(){
      this.$http.get(CONFIG_SELECT).then(res=>{
        let {data} = res.data
        this.options = data
      })
    },
    _getList(){
      this.loading = true
      // if(!this.businTypeId){
      //   var businTypeId = util.getBusinTypeId(this,'')
      //   this.businTypeId = businTypeId
      // }else{
      //   this.businTypeId = this.businessTypeId
      // }
      // this.businessTypeId = this.businessTypeId?this.businessTypeId:util.getBusinTypeId(this,'')
      this.id = util.getTypeId(this.businessTypeId,this.secondClassId,this.thirdClassId)
      this.$http.post(SPOT_CHECK_CONVENTION_LIST,{
        currentPage:this.currentPage,
        pageSize:this.pageSize,
        businTypeId:this.id,
        batchType:'4',
        spotType:this.spotCheckId,
        qcBatchId:this.batchId.trim(),
        qcBatchName:this.batchName.trim(),
        batchStartTime:this.checkBeginDate,
        batchEndTime:this.checkEndDate,
        qcStatus:this.spotCheckStatusId
      }).then(res=>{
        if(res.status === 200 && res.data.status === 0){
          let {data} = res.data
          util.formatBussine(data.items,'bussine')
          util.batchTimeTrans(data.items,'batchEndTime')
          util.orderTime(data.items)
          this.tableData = data.items
          this.total = data.totalNum
          this.loading = false
        }
      })
    },
    _clear(){
      this.i_insertTitleValue=''
      this.i_businessTypeValue=''
      this.i_secondClassValue=''
      this.i_thirdClassValue=''
      this.i_businessTypeId=''
      this.i_secondClassId=''
      this.i_thirdClassId=''
      this.i_businessType=[]
      this.i_secondClass=[]
      this.i_thirdClass=[]
      this.i_qcStandardValue=''
      this.i_qcStandard=[]
      this.i_radio='1'
      this.i_dateValue=[]
      this.i_numberValue=''
      this.i_qcTime=[]
      this.i_textarea='',
      this.i_proportionValue = ''
      this.i_radio = 1
      this.i_radio_random = 1
    },
    _check(){
      if(this.i_insertTitleValue.length<=36){
        if(this.i_insertTitleValue&&this.i_businessTypeValue&&this.i_secondClassValue&&this.i_thirdClassValue&&this.i_qcStandardValue){
          if(this.i_radio==='1'){//全量查
            if(this.i_dateValue&&this.i_dateValue.length>0) return true
            else util.error('请选择日期范围')
          }else if(this.i_radio === '2'){//随机查
            if(this.i_dateValue&&(this.i_dateValue.length>0)){
              let number = Number(this.i_numberValue)
              let proportion = Number(this.i_proportionValue)

              if(this.i_radio_random === '1'){
                if(this.i_proportionValue){
                  if(this.i_proportionValue.indexOf('.')!=-1){
                    util.error('比例输入有误，不能为小数')
                    return false
                  }else{
                    if(!proportion&&proportion!=0){
                      util.error('比例输入有误，请输入数字')
                      return false
                    }else if(proportion>30||proportion<1){
                      util.error('比例输入有误，比例范围为1~30')
                      return false
                    }
                  }
                }else{
                  util.error('请输入比例')
                  return false
                }
              }else if(this.i_radio_random === '2'){
                if(this.i_numberValue){
                  if(this.i_numberValue.indexOf('.')!=-1){
                    util.error('数量输入有误，不能为小数')
                    return false
                  }else{
                    if(!number&&number!=0){
                      util.error('数量输入有误，请输入数字')
                      return false
                    }
                    if(number>1000||number<1){
                      util.error('输入有误，数量范围为1~1000')
                      return false
                    }
                  }
                }else{
                  util.error('请输入数量')
                  return false
                }
              }
              return true
            }else{
              util.error('请输入完整信息')
              return false
            }
          }else{//指定订单号
            let flag = this._getSplitStr()
            let reg = /^[\u4e00-\u9fa5]+$/

            if(flag){
              let arr = this.i_textarea.split(/[,，]/)
              let list = Array.from(new Set(arr))
              if(arr.length!=list.length){
                util.error("请勿输入重复订单")
                return false
              }
              if(arr.length>200){
                util.error('指定订单编号不能超过200条')
                return false
              }else{
                 arr.map(item=>{
                  if(reg.test(item)){
                    util.error('订单编号不能为汉字')
                    return false
                  }
                })
                return true
              }
            }else{
              if(reg.test(this.i_textarea)){
                util.error('订单编号不能为汉字')
                return false
              }else{
                return true
              }
            }
            return true
          }
        }else{
          util.error('请输入完整信息')
          return false
        }
      }else{
        util.error('输入长度超出，请保证在36个字符内')
        return false
      }
    },
    _getQcStandard(){
      let i_id = util.getBusinTypeId(this,'i_')
      this.$http.get(SPOT_CHECK_INSERT_QCSTANDARD,{params:{
        businTypeId:i_id
      }}).then(res=>{
        let {data} = res
        if(res.status === 200 && data.status === 0){
          this.$refs.tip.innerText = ''
          data.data.map(item=>{
            item.qcStdVersion = 'V'+item.qcStandardVersion
          })
          this.i_qcStandard = data.data
        }else{
          this.$refs.tip.innerText = data.message
        }
      })
    },
    _insert(){
      let id = util.getBusinTypeId(this,'i_')
      let version  = this.i_qcStandardValue.slice(1)
      let list = []
      let flag = this._getSplitStr()
      if(flag){
        list = this.i_textarea.split(/[,，]/)
      }else{
        list.push(this.i_textarea)
      }

      if(!this.isInsert){
        this.isInsert = !this.isInsert
        this.$http.post(SPOT_CHECK_INSERT,{
          businTypeId:id,
          startDate:this.startTime,
          endDate:this.endTime,
          qcBatchName:this.i_insertTitleValue,
          qcStdVersion:version,
          spotType:this.i_radio,
          spotOrderCount:Number(this.i_numberValue),
          spotProportion:this.i_proportionValue,
          spotOrderIdList:list,
        }).then(res=>{
          let {data} = res
          if(res.status === 200 && data.status === 0){
            util.success(data.message)
            this._getList()
            this.insertDialogVisible = false
            this._clear()
          }else{
            util.error(data.message)
          }
          this.isInsert = !this.isInsert
        })
      }
    },
    _delete(qcBatchId){
      this.$http.get(SPOT_CHECK_DELETE,{params:{qcBatchId}}).then(res=>{
        let {data} = res
        if(res.status === 200 && data.status === 0){
          util.success(data.message)
          this._getList(data.message)
        }else{
          util.error(res.data.message)
        }
        this.deleteDialogVisible = false
      })
    },
    _getSplitStr(){
      let flag
      if((this.i_textarea.indexOf(',')>=0)||(this.i_textarea.indexOf('，')>=0)){
        flag = true
      }else{
        flag = false
      }
      return flag
    },
    _getSlotType(val,arr){
      let obj = {}
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].desc === val) {
          obj = arr[i]
        }
      }
      return obj.type
    },
    handleInsert(){
      util.getBusin(this,'i_businessType','1',false)
      this.i_radio='1'
      this.i_radio_random='1'
      this.insertDialogVisible = true
    },
    handleChangeCurrentPage(val){
      this.currentPage = val
      this._getList()
    },
    handleChangeCurrentPageSize(val){
      this.currentPage = 1
      this.pageSize = val
      this._getList()
    },
    handleCheckTypeChange(val){
      this.spotCheckValue = val
      this.spotCheckId = this._getSlotType(this.spotCheckValue,this.spotCheck)
    },
    handleChangeList(){
      this._getList()
    },
    handleChangeData(data){
      let {id} = data
      this.businId = id
    },
    insertDone(){
      this._check()&&this._insert()&&this._clear()
    },
    insertCancel(){
      this.insertDialogVisible = false
      this._clear()
    },
    handleClose() {
      this._clear()
      this.insertDialogVisible = false
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
    i_handleTypeChange(val){
      this._clearQcStandard()
      this.i_businessTypeValue = val
      util.i_businTypeChange(this, this.i_businessTypeValue, val,false)
    },
    i_handleSecondClassChange(val){
      this._clearQcStandard()
      this.i_secondClassValue = val
      util.i_secondClassChange(this, this.i_secondClassValue, val,false)
    },
    i_handleThirdClassChange(val){
      this._clearQcStandard()
      this.i_thirdClassValue = val
      util.i_thirdClassChange(this, this.i_thirdClassValue, val)
      this._getQcStandard()
    },
    i_handleQcStandardChange(val){
      this.i_qcStandardValue = val
    },
    i_handleProportionChange(val){
      this.i_proportionValue = val
    },
    handleDeal(row){
      let {qcBatchId} = row
      let obj ={
        currentPage:this.currentPage,
        pageSize:this.pageSize,
        businessTypeId:this.businessTypeId,
        secondeClassId:this.secondeClassId,
        thirdClassId:this.thirdClassId,
        batchType:'4',
        spotType:this.spotCheckId,
        qcBatchId:this.batchId.trim(),
        qcBatchName:this.batchName.trim(),
        batchStartTime:this.checkBeginDate,
        batchEndTime:this.checkEndDate,
        qcStatus:this.spotCheckStatusId,
        businessTypeValue:this.businessTypeValue,
        secondClassValue:this.secondClassValue,
        thirdClassValue:this.thirdClassValue,
        businessType:this.businessType,
        secondClass:this.secondClass,
        thirdClass:this.thirdClass,
        spotCheck:this.spotCheck,
        spotCheckValue:this.spotCheckValue,
        spotCheckStatusValue:this.spotCheckStatusValue,
        spotCheckStatus:this.spotCheckStatus,
        total:this.total,
        id:this.id
      }
      this.$router.push({name:'抽检详情',params:{
          id:qcBatchId,
          params:obj
      }})
    },
    handleSearch(){
      this.currentPage = 1
      if(this)
      this._getList()
    },
    handleShow(row){
      let {qcBatchId} = row
      let obj ={
        currentPage:this.currentPage,
        pageSize:this.pageSize,
        businessTypeId:this.businessTypeId,
        secondeClassId:this.secondeClassId,
        thirdClassId:this.thirdClassId,
        batchType:'4',
        spotType:this.spotCheckId,
        qcBatchId:this.batchId.trim(),
        qcBatchName:this.batchName.trim(),
        batchStartTime:this.checkBeginDate,
        batchEndTime:this.checkEndDate,
        qcStatus:this.spotCheckStatusId,
        businessTypeValue:this.businessTypeValue,
        secondClassValue:this.secondClassValue,
        thirdClassValue:this.thirdClassValue,
        businessType:this.businessType,
        secondClass:this.secondClass,
        thirdClass:this.thirdClass,
        spotCheck:this.spotCheck,
        spotCheckValue:this.spotCheckValue,
        spotCheckStatusValue:this.spotCheckStatusValue,
        spotCheckStatus:this.spotCheckStatus,
        total:this.total,
        id:this.id
      }
      this.$router.push({name:'抽检详情',params:{id:qcBatchId,params:obj}})
    },
    handleStatusChange(val){
      this.spotCheckStatusValue = val
      this.spotCheckStatusId = qcStatusTransToNum(this.spotCheckStatusValue)
    },
    handleDelete(row){
      this.deleteDialogVisible = true
      this.isDelete = row
    },
    handleConfirmDelete(){
      let {qcBatchId} = this.isDelete
      this._delete(qcBatchId)
    }
  },
  computed:{
    remainNumber(){
      let list = this.i_textarea.split(/[，,]/)
      let number
      if(this.i_textarea.length>0){
        number = 200 - list.length
        number = number<=0?0:number
      }else{
        number = 200
      }
      return number
    },
    ...mapState({
      'authorityList':state=>state.user.authorityList
    }),
    isInsertShow(){
      if(this.authorityList.indexOf(SPOTCHECK_INSERT)>=0||this.authorityList.indexOf('ADMIN')>=0)
        return true
      else
        return false
    },
  },
  watch:{
    i_dateValue(val,oldval){
      if(val){
        this.startTime = val[0]
        this.endTime = val[1]
      }else{
        this.startTime = ''
        this.endTime = ''
      }
    },
    checkDateValue(val,oldval){
      if(val){
        this.checkBeginDate = val[0]
        this.checkEndDate = val[1]
      }else{
        this.checkBeginDate = ''
        this.checkEndDate = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~style/varible.less';
.spot-check-convention{
  width: 90%;
  margin:0 auto;

    .title{

      .standard-box{
        width: 100%;
        line-height: 50px;
        overflow: hidden;
        position: relative;
        background: #fff;

        span{
            width: 85px;
            font-size: @font-title;
        }
        .standard-select,.first-class,.second-class,.standard-status,.batch-name,.batch-type,.batch-id,.batch-status{
            float: left;
            width: 28%;
            text-align: left;
            padding-left: 20px;
            box-sizing: border-box;
            display: flex;

            .item-left{
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

        .check-time{
          width: 50%;
          float: left;
          margin-left: 20px;
          display: flex;
          padding: 9px 0;
          line-height: 40px;

          .time-title{
            width: 85px;
            font-size: @font-title;
            line-height: 32px;
          }

          .el-date-editor{

            vertical-align: middle;
            width: 350px;
          }
        }

        .standard-search{
            width: 16%;
            float: left;
            text-align: center;

            .standard-search-btn{
                width: 90%;
                .el-icon-search{
                    font-size:14px;
                }
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

  .spot-check-convention-table{
    padding: 1%;
    margin: 0 auto;
    background: #fff;

    .qualified{
        color: @color-qualified;
        font-weight: 700;
    }

    .bold{
      font-weight:800;
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

    .bussine{
      cursor: pointer;
      color:@color-blue;
      text-decoration: underline;
    }

    .blue{
      color:@color-blue;
    }

    .red{
      color:@color-red;
    }

    span{
      cursor: pointer;
    }
  }

  .insert-dialog{
    .red{
      color:@color-red;
    }

    .insert-title,.insert-busin,.qc-standard,.spot-check-type,.date,.number,.origin-order-id,.qc-time,.random-check,.proportion{
      overflow: hidden;
      line-height: 50px;
      display: flex;

      .text{
        width: 15%;
        float: left;
        text-align: right;
        margin-right: 20px;
      }

      .insert-title-input,.number-input{
        width: 50%;
        float: left;
      }

      .proportion-input{
        width: 20%;
        float: left;
      }

      .busin-item{
        margin-right: 40px;
      }

      .radio-box,.random-check-radio{
        float: left;
        .radio-item{
          float: left;
          margin-right: 30px;
        }
      }

      .textarea{
        width: 650px;
        margin-top: 15px;
        position: relative;

        .textarea-tip{
          position: absolute;
          right: 10px;
          bottom: 0;
          font-size: 12px;
          line-height: 20px;
        }
      }
    }

    .tip{
      margin-left: 10px;
      margin-top: 5px;
      font-size:14px;
      color:#999;
      text-indent: 18%;
    }
  }
}
</style>

