<template>
    <div class="defective-detail-box">
        <div class="defective-detail-header">
            次品详情
        </div>
        <div class="search-box mb20">
            <div class="search-item">
                <span class="title">客户号：</span>
                <div class="select-box">
                    <el-input size="small" v-model="clientId" clearable></el-input>
                </div>
            </div>
            <div class="search-item">
                <span class="title">客户姓名：</span>
                <div class="select-box">
                    <el-input size="small" v-model="clientName" clearable></el-input>
                </div>
            </div>
            <div class="search-item">
                <span class="title">订单号：</span>
                <div class="select-box">
                    <el-input size="small" v-model="origOrderId" clearable></el-input>
                </div>
            </div>
            <div class="btn-box">
                <el-button size="small" type="primary" @click="handleSearch"><i class="el-icon-search"></i></el-button>
            </div>
            <div class="search-item">
                <span class="title">营业部：</span>
                <div class="select-box">
                    <!-- <el-input size="small" v-model="branchName" clearable></el-input> -->
                    <el-select v-model="branchName" size="small"  @change="handleBranchChange" placeholder="所有">
                        <el-option
                                v-for="(item,index) in branchNameList"
                                :key="index"
                                :label="item.name"
                                :value="item.name">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="search-item">
                <span class="title">要件名称：</span>
                <div class="select-box">
                    <!-- <el-input size="small" v-model="markItemId" clearable></el-input> -->
                    <el-select v-model="essantialName" size="small"  @change="handleEssantialChange" placeholder="所有">
                        <el-option
                                v-for="(item,index) in essantialNameList"
                                :key="index"
                                :label="item.markItemName"
                                :value="item.markItemName">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <!-- <div class="search-box">
          <div class="search-item">
                <span class="title">客户姓名：</span>
                <div class="select-box">
                    <el-input size="small" v-model="clientName" clearable></el-input>
                </div>
            </div>
        </div> -->
        <div style="text-align:left;margin-left:20px">
          <el-button type="primary" plain @click="handleBatch">批量处理</el-button>
        </div>
        <div class="defective-detail-table">
            <el-table
                    ref="multipleTable"
                    v-loading="loading"
                    :header-cell-style="{'background':'#E8E8E8','color':'black','font-weight':'800'}"
                    :data="tableData"
                    border
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        min-width="5%"
                        align="center">
                </el-table-column>
                <el-table-column
                        type="index"
                        label="序号"
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
                        width="150"
                        align="center"
                        label="原始订单号">
                </el-table-column>
                <el-table-column
                        prop="markItemName"
                        align="center"
                        label="缺失要件">
                </el-table-column>
                <el-table-column
                        v-if="isDealShow"
                        width="130"
                        label="操作"
                        align="center">
                    <template slot-scope="{row}">
                        <span @click="handlOpt(row)" class="blue">特殊次品处理</span>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <pagination
                    v-if="total!=0"
                    :total="total"
                    :currentPage="currentPage"
                    :pageSize="pageSize"
                    @changeCurrentPageSize="handleChangeCurrentPageSize"
                    @changeCurrentPage="handleChangeCurrentPage">
            </pagination>
            <div class="btn-back">
                <el-button type='primary' plain @click="handleGoBack">返 回</el-button>
            </div>
        </div>

        <el-dialog
                :close-on-click-modal=false
                :close-on-press-escape=false
                title="填写备注"
                :visible.sync="remarkDialogVisible"
                append-to-body
                width="50%"
                align="center">
            <el-row :gutter="20">
                <el-col :span="3" style="text-align:right"><span style="color:red">*</span><span>备注：</span></el-col>
                <el-col :span="21">
                    <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入内容"
                            v-model="textarea">
                    </el-input>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
            <el-button @click="handleMissingChangeCancel">取 消</el-button>
            <el-button type="primary" @click="handleMissingChangeConfirm">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog
                :close-on-click-modal=false
                :close-on-press-escape=false
                title="提醒"
                :visible.sync="saveDialogVisible"
                append-to-body
                width="30%"
                align="center">
            <span>是否确认提交？</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="handleSaveCancel">取 消</el-button>
            <el-button type="primary" @click="handleSaveConfirm">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
  import URL from 'api/url'
  import util from 'tools/util'
  import Pagination from 'components/common/Pagination.vue'
  import CONSTANT from 'api/constant'
  import {mapState} from 'vuex'
  let {SPECIAL_DEFECTIVE_IMPORT} = CONSTANT
  let {DEFECTIVE_DETAIL,DEFECTIVE_BRANCH_INFO,DEFECTIVE_BRANCH_ID,STANDARD_CONFIG_MISSING_ITEM_CHANGE,BATCHCHECK} =URL
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
        pageSize:20,
        tableData:[],
        branchName:'',
        markItemId:'',
        origOrderId:'',
        clientId:'',
        qcBatchId:'',
        params:{},
        remarkDialogVisible:false,
        saveDialogVisible:false,
        textarea:'',
        itemData:{},
        editRow:{},
        branchNameList:[{name:'所有',id:''}],
        essantialName:'',
        essantialId:'',
        essantialNameList:[{markItemName:'所有',id:''}],
        branchId:'',
        isSpecial:false,
        clientName:'',
        isSubmit:false,
        multipleSelection:[],
        isBatch:false
      }
    },
    mounted(){
      let {qcBatchId,params,isSpecial} = this.$route.params
      this.params = params
      this.isSpecial = isSpecial
      this.essantialName = '所有'
      this.branchName = '所有'
      if(!qcBatchId){
        this.$router.push({name:'次品处理',params:{params:this.params}})
      }else{
        this.qcBatchId = qcBatchId
        this._getList()
      }
      this._getBranchNameList()
      this._getEssantialName()
    },
    methods:{
      _getList(){
        this.loading = true
        let standardMarkId = this.essantialId
        let branchNo = this.branchId
        let clientId = this.clientId.trim()
        let origOrderId = this.origOrderId.trim()
        let clientName = this.clientName.trim()
        this.$http.post(DEFECTIVE_DETAIL,{
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          qcBatchId: this.qcBatchId,
          origOrderId,
          standardMarkId,
          branchNo,
          clientId,
          clientName
        }).then(res=>{
          let {data} = res
          if(res.status === 200 && data.status === 0){
            let {totalNum,items} = data.data
            this.tableData = items
            this.total = totalNum
            this.loading = false
          }else{
            util.error(res.data.message)
          }
        })
      },
      _getBranchNameList(){
        this.$http.get(DEFECTIVE_BRANCH_INFO,{params:{batchId:this.data.batchId}}).then(res=>{
          if(res.status === 200 && res.data.status === 0){
            let branchNameList = res.data.data
            let list = [] 
            branchNameList.forEach(item=>{
              if(item){
                list.push({name:item.branchName+"("+item.branchNo+")",id:item.branchNo})
              }
            })
            this.branchNameList = this.branchNameList.concat(list)
          }else{
            util.error(res.data.message)
          }
        })
      },
      _getEssantialName(){
        this.$http.get(DEFECTIVE_BRANCH_ID,{params:{batchId :this.data.batchId}}).then(res=>{
          if(res.status === 200 && res.data.status === 0){
            this.essantialNameList = this.essantialNameList.concat(res.data.data)
          }else{
            util.error(res.data.message)
          }
        })
      },
      _getEssantialId(val){
        let obj = this.essantialNameList.filter(item=>{
          return item.markItemName == val
        })
        return obj[0].id
      },
      _missingChange(params){
        this.$http.post(STANDARD_CONFIG_MISSING_ITEM_CHANGE,params).then(res=>{
          let {data} = res
          if(res.status === 200&&res.data.status ===0){
            this.textarea = ''
            this._getList()
            util.success(data.message)
            this.isSubmit = false
          }else{
            util.error(data.message)
          }
        })
      },
      _getItemId(val){
        let obj = this.branchNameList.filter(item=>{
          return item.name == val
        })
        return obj[0].id
      },
      handleChangeCurrentPageSize(val){
        util.wrapToTop(this)
        this.pageSize = val
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
        if(this.isSpecial){
          this.$router.push({name:'批次管理',params:{params:this.params}})
        }else{
          this.$router.push({name:'次品处理',params:{params:this.params}})
        }
      },
      handlOpt(row){
        this.editRow = row
        this.remarkDialogVisible = true
      },
      handleMissingChangeCancel(){
        this.textarea = ''
        this.isBatch = false
        this.remarkDialogVisible = false
      },
      handleMissingChangeConfirm(){
        if(this.textarea){
          this.saveDialogVisible = true
        }else{
          util.error('请填写备注')
        }
      },
      handleBranchChange(val){
        this.branchName = val
        this.branchId = this._getItemId(val)
      },
      handleEssantialChange(val){
        this.essantialName = val
        this.essantialId = this._getEssantialId(val)
      },
      handleSaveCancel(){
        this.saveDialogVisible = false
      },
      handleSaveConfirm(){
        let {clientId,origOrderId,markItemId} = this.editRow
        if(!this.isSubmit){
          this.isSubmit = true

         if(this.isBatch){
            // let str = ''
            let list = []
            this.multipleSelection.forEach(item=>{
              // str += item.orderMarkRelId + ','
              list.push({
                batchId:item.qcBatchId,
                clientId:item.clientId,
                markItemId:item.markItemId,
                origiOrderId:item.origOrderId
              })
            })
            // str = str.substring(0,str.length-1)

            this._batchCheck({
              remark:this.textarea,
              specifyOrderDealCtrlDtoList:list
            })
          }else{
             let params = {
               batchId:this.qcBatchId,
               remark:this.textarea,
               clientId,
               origiOrderId:origOrderId,
               markItemId
             }
            this._missingChange(params)
          }
        }
        this.saveDialogVisible = false
        this.remarkDialogVisible = false
      },
      handleSelectionChange(val){
        this.multipleSelection = val
      },
      handleBatch(){
        this.isBatch = true
        this.remarkDialogVisible = true
      },
      _batchCheck(params){
        this.$http.post(BATCHCHECK,params).then(res=>{
          if(res.status==200&&res.data.status==0){
            util.success(res.data.message)
          }else{
            util.error(res.data.message)
          }
          this._getList()
          this.multipleSelection = []
          this.isSubmit = false
          this.isBatch = false
          this.textarea = ''
        })
      }
    },
    computed: {
      data(){
        return{
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          batchId: this.qcBatchId,
          origOrderId:this.origOrderId.trim(),
          standardMarkId:this.markItemId.trim(),
          clientId:this.clientId.trim(),
          branchNo:this.branchId
        }
      },
      ...mapState({
        'authorityList':state=>state.user.authorityList
      }),
      isDealShow(){
        if(this.authorityList.indexOf(SPECIAL_DEFECTIVE_IMPORT)>=0||this.authorityList.indexOf('ADMIN')>=0)
          return true
        else
          return false
      },
    },
  }
</script>

<style lang="less" scoped>
    @import '~style/varible.less';
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

        .mb20{
            margin-bottom: 20px;
        }

        .search-box{
            overflow: hidden;
            line-height: 50px;

            .search-item{
                float: left;
                width: 30%;
                text-align: left;
                padding-left: 15px;
                box-sizing: border-box;

                .title{
                    float: left;
                    width: 25%;
                }

                .select-box{
                    float: left;
                }

                .input-box,.select-box{
                    float: left;
                }
            }

            .btn-box{
                float: left;
                width: 10%;

                button{
                    width: 80%;
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

            .blue{
                color:@color-blue;
                text-decoration: underline;
                cursor: pointer;
            }
        }

        .btn-back{
            button{
                width: 200px !important;
            }
            padding-bottom: 20px;
        }
    }
</style>
