<template>
    <div class="insert-box">
        <div class="insert-header">
            <span>新增质检标准</span>
        </div>
        <!-- 基本信息 -->
        <div class="basic-info">
            <p class="title">基本信息:</p>
            <div class="select-type">
                <div class="text"><span class="red">＊</span>业务类型：</div>
                <div class="select-type-one">
                    <el-select v-model="businessTypeValue" size="small" placeholder="请选择" @change="handleTypeChange" >
                        <el-option
                                v-for="item in businessType"
                                :key="item.id"
                                :label="item.businName"
                                :value="item.businName"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="select-type-two">
                    <el-select v-model="secondClassValue" size="small" placeholder="请选择" @change="handleFirstClassChange" >
                        <el-option
                                v-for="item in secondClass"
                                :key="item.businSubType"
                                :label="item.businName"
                                :value="item.businName"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="select-type-three">
                    <el-select v-model="thirdClassValue" size="small" placeholder="请选择" @change="handleThirdClassChange">
                        <el-option
                                v-for="item in thirdClass"
                                :key="item.businName"
                                :label="item.businName"
                                :value="item.businName"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="active-date">
                <div class="text"><span class="red">＊</span>生效时间：</div>
                <div class="select-date">
                    <el-date-picker
                            size="small"
                            v-model="activeDate"
                            type="date"
                            placeholder="选择日期时间"
                            :picker-options="pickerBeginDate"
                            value-format="yyyyMMdd">
                    </el-date-picker>
                </div>
            </div>
            <div class="remark">
                <div class="text"><span class="red">＊</span>填写备注：</div>
                <div class="remark-textarea">
                    <el-input type="textarea" v-model="remarkValue"></el-input>
                </div>
            </div>
        </div>
        <!-- 质检要件 -->
        <div class="essantial-check">
            <p class="title">质检要件:</p>
            <div class="essantial-check-options">
                <el-button icon="el-icon-plus" type="primary" plain @click="handleCreate">新增要件</el-button>
            </div>
        </div>
        <!-- 表格 -->
        <div class="insert-table">
            <el-table
                    :header-cell-style="{'background':'#E8E8E8','color':'black','font-weight':'800'}"
                    v-loading="loading"
                    :data="insertTableData"
                    style="width: 100%"
                    border
                    size="medium">
                <el-table-column
                        prop="id"
                        label="序号"
                        type="index"
                        min-width="15%"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="markTypeName"
                        label="要件类型"
                        min-width="10%"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="markItemName"
                        label="要件名称"
                        min-width="20%"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="markParam"
                        label="要件参数"
                        min-width="10%"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="筛选条件"
                        min-width="18%"
                        align="center">
                    <template slot-scope="{row,$index}">
                        <el-input size="small" v-if="showEdit[$index]" v-model="row.orderFilter"></el-input>
                        <span v-if="!showEdit[$index]">{{row.orderFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="筛选维度"
                        min-width="12%"
                        align="center">
                    <template slot-scope="{row,$index}">
                        <el-select v-model="row.markDim" placeholder="请选择筛选维度" size="small" v-if="showEdit[$index]">
                            <el-option
                                    v-for="item in dimList"
                                    :key="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                        <span v-if="row.markDim==='订单维度'&&!showEdit[$index]">订单维度</span>
                        <span v-if="row.markDim==='客户维度'&&!showEdit[$index]">客户维度</span>
                        <span v-if="row.markDim==='流水维度'&&!showEdit[$index]">流水维度</span>
                    </template>
                </el-table-column>
                <el-table-column
                        min-width="10%"
                        label="操作"
                        align="center">
                    <template scope="{row,$index}">
                        <el-button type="primary" size="small" @click="handleEdit(row,$index)" v-if="!showEdit[$index]"><i class="el-icon-edit"></i></el-button>
                        <el-button type="primary" size="small" @click="handleEditDone(row,$index)" v-if="showEdit[$index]"><i class="el-icon-check"></i></el-button>
                        <el-button type="danger" size="small" @click="handleEditCancle(row,$index)" v-if="showEdit[$index]"><i class="el-icon-close"></i></el-button>
                        <el-button type="danger" size="small" @click="handleEditDelete(row,$index)" v-if="!showEdit[$index]"><i class="el-icon-delete"></i></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页组件 -->
        <div class="btn-box">
            <el-button @click="handleCancle">返 回</el-button>
            <el-button type="primary" @click="handleDone">完 成</el-button>
        </div>

        <!-- 完成弹窗 -->
        <el-dialog
                title="提醒"
                :visible.sync="confirmDialogVisible"
                append-to-body
                width="30%">
            <span>是否确认新增？</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="handleInsertCancel">取 消</el-button>
            <el-button type="primary" @click="handleInsertConfirm">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 新建质检要件弹窗 -->
        <el-dialog
                title="新建"
                :visible.sync="createDialogVisible"
                width="70%"
                append-to-body
                align="center">
            <!-- <EssantialSearch :selectData='options' :currentPage="c_currentPage" :currentPageSize="c_currentPageSize" @getList="handleChangeData" ref='essantialSearch'></EssantialSearch> -->
            <div style="border: 1px solid #F0F2F7;line-height: 70px;overflow: hidden;margin-bottom: 20px;background: #fff; width: 100%;">
              <div style="float: left;width:25%;">
                  <span style=" margin-right: 10px;font-size: @font-title;">要件类型</span>
                  <el-select v-model="c_markTypeValue" size="small" @change="handleMarkTypeChange" style=" width: 150px;">
                      <el-option
                              v-for="item in c_options"
                              :key="item.id"
                              :label="item.markTypeName"
                              :value="item.id">
                      </el-option>
                  </el-select>
              </div>
              <div style="float: left;width:25%;">
                  <span style=" margin-right: 10px;font-size: @font-title;">要件名称</span>
                  <el-input
                          style=" width: 150px;"
                          placeholder="请输要件名称"
                          v-model="c_qcNameValue"
                          clearable
                          size="small"
                          class="essential-title-input">
                  </el-input>
              </div>
              <div style="float: left;width:25%;">
                <span style=" margin-right: 10px;font-size: @font-title;">要件参数:</span>
                <el-input
                        style=" width: 150px;"
                        placeholder="请输要件参数"
                        v-model="c_paramValue"
                        clearable
                        size="small"
                        class="essential-title-input">
                </el-input>
              </div>
              <div style="float: left;width:25%;">
                  <el-button type="primary" size="small" style="width: 150px;" @click="handleSearch"><i style="font-size:14px;" class="el-icon-search"></i></el-button>
              </div>
            </div>
            <div class="add-list" style="overflow:hidden;padding:0 0 20px;display:flex;" v-if="insertTableData.length>0">
                <div class="add-list-title" style="width:100px;line-height:24px;">已添加的要件：</div>
                <div class="add-list-tips" style="flex:1">
                    <el-tag type="success" size="small" style="float:left;margin-right:5px;margin-bottom:5px;" v-for="item of insertTableData" :key="item.standardMarkId">{{item.markItemName}}</el-tag>
                </div>
            </div>
            <div class="insertList-table">
                <el-table
                        :header-cell-style="{'background':'#E8E8E8','color':'black','font-weight':'800'}"
                        ref="multipleTable"
                        v-loading="i_loading"
                        :data="insertListTableData"
                        style="width: 100%"
                        border
                        @selection-change="handleSelectionChange"
                        size="small">
                    <el-table-column
                            prop="id"
                            label="序号"
                            type="index"
                            min-width="5%"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="markTypeName"
                            label="要件类型"
                            min-width="30%"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="markItemName"
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

            <!-- 分页组件 -->
            <Pagination
                    :total="c_total"
                    :currentPage="c_currentPage"
                    :currentPageSize="c_currentPageSize"
                    @changeCurrentPageSize="c_handleChangeCurrentPageSize"
                    @changeCurrentPage="c_handleChangeCurrentPage">
            </Pagination>
            <span slot="footer">
                <el-button @click="createDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleConfirm">确 定</el-button>
              </span>
        </el-dialog>

        <!-- 删除弹窗 -->
        <el-dialog
                title="提醒"
                :visible.sync="deleteDialogVisible"
                append-to-body
                width="30%">
            <span>是否删除？</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="handleDeleteCancel">取 消</el-button>
            <el-button type="primary" @click="handleDeleteConfirm">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
  import Pagination from 'components/common/Pagination'
  import EssantialSearch from 'components/essantial_config_search.vue'
  import util from 'tools/util'
  import URL from 'api/url'
  import {checkDimTrans} from 'tools/transform'
  import indexVue from '../index.vue';
  let {CONFIG_LIST,STANDARD_INSERT,CONFIG_SELECT} = URL
  export default {
    name:'insertNewStandard',
    components:{
      Pagination,
      EssantialSearch
    },
    data(){
      return {
        loading:false,
        c_loading:false,
        activeDate:'',
        remarkValue:'',
        businessType:[],
        status:[],
        thirdClass:[],
        secondClass:[],
        businessTypeValue:'',
        thirdClassValue:'',
        secondClassValue:'',
        secondClassId:'',
        statusValue:'',
        effectFlag: 0,
        currentPage:1,
        currentPageSize:20,
        c_currentPage:1,
        c_currentPageSize:20,
        c_total:0,
        c_options:[],
        c_qcNameValue:'',
        c_markTypeValue:'',
        c_paramValue:'',
        insertTableData:[],
        insertListTableData:[],
        showEdit: [],
        multipleTable:[],
        createDialogVisible:false,
        deleteDialogVisible:false,
        confirmDialogVisible:false,
        isDeleting:{},
        markType:'',
        qcName:'',
        pickerBeginDate:{
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        markTypeValue:'',
        qcNameValue:'',
        options:[],
        dimList:[]
      }
    },
    beforeRouteLeave(to, from, next) {
      if (to.path == "/essantial/standard") {
        to.meta.keepAlive = true;
      } else {
        to.meta.keepAlive = false;
      }
      next();
    },
    mounted(){
      this.c_markTypeValue = '所有'
      util.getBusin(this,'businessType','1',false)
      util.getDim(this,'dimList')
      this._getInsertSelectData()
    },
    methods:{
       _initOptions(){
        this.c_options = [{markTypeName:'所有'}]
      },
      _getInsertSelectData(){
        this._initOptions()
        this.$http.get(CONFIG_SELECT).then(res=>{
          let {data} = res.data
          this.c_options = this.c_options.concat(data)
        })
      },
      _getInsertList(){
        this.c_loading = true
        let id = this.c_markTypeValue==='所有'?'':this.c_markTypeValue
        let param = this.c_paramValue.trim()
        let qcName = this.c_qcNameValue.trim()
        this.$http.get(CONFIG_LIST,{params:{
            currentPage:this.c_currentPage,
            pageSize:this.c_currentPageSize,
            markType:id,
            markItemName:qcName,
            markParam:param
          }}).then(res=>{
          let {data} = res.data
          util.checkHas(this,data.items,'insertTableData')
          this.insertListTableData = data.items
          this.c_total = data.totalNum
          this.c_loading = false
        })
      },
      _changeTableData(){
        let currentPage = this.currentPage;
        let currentPageSize = this.currentPageSize;
        util.freshTableData(this,'tableData','insertTableData')
        util.wrapToTop(this)
      },
      _insertDone(){
        let arr = this.insertTableData.map(item=>{
          checkDimTrans(item.markDim,item)
        })

        this.$http.post(STANDARD_INSERT,{
          beginDate:this.activeDate,
          businTypeId:this.thirdClassId,
          standardMarkList:this.insertTableData,
          remark:this.remarkValue
        }).then(res=>{
          let {data} = res
          if (res.status === 200 && res.data.status == 0) {
            util.success(data.message)
            this.$router.push({name:'质检标准配置',params:{
              isInsert: true
            }})
          }else{
            util.error(data.success)
          }
        })
      },
      _deduplicate(){
        let list = Array.from(new Set(this.insertTableData))
        this.insertTableData = list
      },
      _setTableData(){
        let start = (this.currentPage - 1) * this.currentPageSize;
        let end = this.currentPage * this.currentPageSize;
        this.tableData = this.insertTableData.slice(start, end);
      },
      _toggle(row){
        let flag = false
        let index
        this.insertTableData.map((item,i)=>{
          if(item.id == row.id){
            flag = true
            index = i
          }
        })
        if(flag){
          this.insertTableData.splice(index,1)
          this.$set(row,'isAdd',false)
          util.warn('取消添加')
        }else{
          this.insertTableData.push(row)
          this.$set(row,'isAdd',true)
          util.success('添加成功')
        }
        this._deduplicate()
        this._setTableData()
      },
      _check(){
        let markDim_flag = true
        if(this.activeDate&&this.businessTypeValue&&this.thirdClassValue&&this.secondClassValue&&this.remarkValue&&(this.insertTableData.length>0)){
          if(this.remarkValue.length>255){
            util.error('备注字数超出范围，请保持在255个字符内')
            return false
          }
          let flag = true
          this.showEdit.map(item=>{
            if(item!=''){
              flag = false
              return
            }
          })
          if(flag||this.showEdit.length<1){
            this.insertTableData.map(item=>{
              if(!item.markDim){
                markDim_flag = false
              }
            })

            if(markDim_flag){
              return true
            }else{
              this.$message.error("请选择筛选维度")
              return false
            }
          }else{
            this.$message.error("请先保存编辑")
            return false
          }
          
        }else{
          this.$message.error("请填写完整信息")
          return false
        }
      },
      handleEdit(row,index){
        this.$set(this.showEdit,index,true)
      },
      handleEditDelete(row,index){
        this.isDeleting = row
        this.deleteDialogVisible = true
      },
      handleEditDone(row,index){
        let list = []
        for(let i=0;i<this.showEdit.length;i++){
          if(i === index){
            list.push('')
          }else{
            list.push(this.showEdit[i])
          }
        }
        this.showEdit = list
      },
      handleEditCancle(row,index){
        this.inputValue = ''
        this.showEdit = []
      },
      c_handleChangeCurrentPageSize(val){
        this.c_currentPage = 1
        this.c_currentPageSize = val
        this._getInsertList()
      },
      c_handleChangeCurrentPage(val){
        this.c_currentPage = val
        this._getInsertList()
      },
      handleCreate(){
        this.createDialogVisible = true
        this._getInsertList()
        this._getInsertSelectData()
      },
      handleConfirm(){
        this.createDialogVisible = false
      },
      handleCancle(){
        this.$router.go(-1)
      },
      handleDone(){
        this.confirmDialogVisible = true
      },
      handleTypeChange(val){
        this.businessTypeValue = val
        util.businTypeChange(this, this.businessTypeValue, val,false)
      },
      handleFirstClassChange(val){
        this.secondClassValue = val
        util.secondClassChange(this, this.secondClassValue, val,false)
      },
      handleThirdClassChange(val){
        this.thirdClassValue = val 
        util.thirdClassChange(this, this.thirdClassValue, val)
      },
      handleToggle(row,index){
        this._toggle(row)
      },
      handleSelectionChange(val) {
        this.multipleTable = val;
      },
      handleDeleteCancel(){
        this.deleteDialogVisible = false
      },
      handleDeleteConfirm(){
        this.deleteDialogVisible = false
        let {id} = this.isDeleting
        this.insertTableData.map((item,index)=>{
          if(item.id == id){
            this.insertTableData.splice(index,1)
          }
        })
        this._setTableData()
      },
      handleSearch(){
        this.c_currentPage = 1
        this._getInsertList()
      },
      handleChangeData(data){
        let {total,tableData,markTypeValue,qcNameValue} = data
        util.checkHas(this,tableData,'insertTableData')
        this.insertListTableData = tableData
        this.c_total = total
        this.markType = markTypeValue
        this.qcName = qcNameValue
      },
      handleInsertConfirm(){
        this.confirmDialogVisible = false
        this._check() && this._insertDone()
      },
      handleInsertCancel(){
        this.confirmDialogVisible = false
      },
      handleMarkTypeChange(val){
        this.c_markTypeValue =val
      }
    },
    computed:{
      total(){
        return this.insertTableData.length
      }
    }
  }
</script>

<style lang="less" scoped>
    @import '~style/varible.less';
    .insert-box /deep/ .el-input.el-input--small.el-input--suffix{
        height: 32px !important;
    }
    .insert-box{
        width: 96%;
        margin:0 auto;
        background: #fff;
        padding-bottom: 20px;
        margin-bottom: 10px;
        margin-top: -30px;


        // .create-dialog{
        //     overflow: hidden;
        //     .create-search-box{
        //         float: left;
        //     }

        // }

        .insert-header{
            font-size: 20px;
            line-height: 40px;
            text-align: left;
            background: #F2F8F9;
            overflow: hidden;

            span{
                float: left;
            }

            button{
                float: right;
            }
        }

        .title{
            font-size: 18px;
            line-height: 30px;
            text-align: left;
        }

        .basic-info{
            background: #fff;
            padding:30px 20px;
        }

        .basic-info{

            .text{
                width: 20%;
                float: left;
                text-align: right;
                margin-right: 2%;

                .red{
                    line-height: 30px;
                    color: #FF0000;
                }
            }

            .select-type,.active-date,.remark{
                line-height: 60px;
                overflow: hidden;
            }

            .select-type{
                .select-type-one,.select-type-two,.select-type-three{
                    width: 25%;
                    float: left;
                    text-align: left;
                    padding: 0 5px;
                    box-sizing: border-box;
                }
            }

            .active-date{
                .select-date{
                    width: 25%;
                    float: left;
                    text-align: left;
                    padding: 0 5px;
                    box-sizing: border-box;
                }
            }

            .remark{
                .remark-textarea{
                    float: left;
                    margin-top: 20px;
                    width: 68%;
                    padding: 0 5px;
                    box-sizing: border-box;

                    .el-textarea{
                        width: 100%;

                        .el-textarea__inner{
                            height: 90px !important;
                        }
                    }
                }
            }
        }

        .essantial-check{
            overflow: hidden;
            padding: 10px 20px;

            .essantial-check-options{
                float: left;
                margin-top: 10px;
            }
        }

        .insert-table{
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

            .el-input.el-input--small.el-input--suffix{
                height: 32px !important;
            }
        }

        .btn-box{
            margin-top: 30px;
            .el-button{
                margin-right: 40px;
                width: 200px !important;
            }
        }
    }
</style>

