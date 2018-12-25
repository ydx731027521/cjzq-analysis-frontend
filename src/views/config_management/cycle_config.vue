<template>
    <div class="cycle-box">
        <!-- 表格 -->
        <div class="cycle-table">
            <el-table
                    :header-cell-style="{'background':'#E8E8E8','color':'black','font-weight':'800'}"
                    v-loading="loading"
                    :data="cycleTableData"
                    style="width: 100%"
                    border
                    size="medium">
                <el-table-column
                        prop="id"
                        label="序号"
                        type="index"
                        width="80"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="businKind"
                        label="业务类型"
                        width="500"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="regularQcperiodText"
                        label="质检周期"
                        width="200"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center">
                    <template scope="{row,$index}">
                        <el-button type="primary" size="small" @click="handleEdit(row,$index)"><i class="el-icon-edit"></i></el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="isCheck"
                        label="是否质检"
                        align="center">
                    <template scope="{row}">
                      <span type="primary" size="small" class="check-opt">
                        <span v-if="row.isCheck" class="stop">停止</span>
                        <span v-if="!row.isCheck" class="start">启动</span>
                      </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页组件 -->
        <Pagination
                :total="total"
                :currentPage="currentPage"
                :currentPageSize="currentPageSize"
                @changeCurrentPageSize="handleChangeCurrentPageSize"
                @changeCurrentPage="handleChangeCurrentPage">
        </Pagination>

        <!-- 修改质检周期弹窗 -->
        <div>
            <el-dialog
                    title="修改质检周期"
                    :visible.sync="dialogVisible"
                    width="50%">
                <div class="dialog-info">
                    <div class="info-item">
                        <span class="tip">*</span>
                        <span>业务类型：</span>
                        <span>{{itemPeriod.businKind}}</span>
                    </div>
                    <div class="info-item">
                        <span class="tip">*</span>
                        <span>质检周期：</span>
                        <span>{{itemPeriod.regularQcperiodText}}</span>
                    </div>
                    <div class="info-item">
                        <span class="tip">*</span>
                        <span>质检状态：</span>
                        <span v-if="itemPeriod.isCheck">启动中</span>
                        <span v-if="!itemPeriod.isCheck">已停止</span>
                    </div>
                </div>
                <div class="dialog-box">
                    <div class="title">
                        修改质检周期：
                    </div>
                    <div class="input">
                        <el-select v-model="regularQcperiodValue" size="small" @change="handleSelectChange">
                            <el-option
                                    v-for="item in options"
                                    :key="item.regularQcperiod"
                                    :label="item.regularQcperiodText"
                                    :value="item.regularQcperiodText">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirm">确 定</el-button>
        </span>
            </el-dialog>
        </div>

        <!-- 修改质检周期弹窗 -->
        <div>
            <el-dialog
                    title="提示"
                    :visible.sync="changeDialogVisible"
                    width="30%">
                <span>是否确认保存修改？</span>
                <span slot="footer" class="dialog-footer">
          <el-button @click="handleChangeCancle">取 消</el-button>
          <el-button type="primary" @click="handleChangeConfirm">确 定</el-button>
        </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
  import Pagination from 'components/common/Pagination'
  import URL from 'api/url'
  import util from 'tools/util'
  import {regularTransform,regularTransformToNum} from 'tools/transform'
  let {CYCLE_LIST,STANDARD_FIRSTCLASS,STANDARD_SECONDCLASS,CYCLE_CHANGEPERIOD,CYCLE_CHANGE_STATUS} = URL
  export default {
    name:'cycleConfig',
    components:{Pagination},
    data(){
      return {
        regularQcperiodValue:'',
        regularQcperiodNum:0,
        dialogVisible:false,
        changeDialogVisible:false,
        isCheck:true,
        isClose:false,
        cycleTableData:[],
        loading:false,
        total:0,
        currentPage:1,
        currentPageSize:20,
        businessTypeValue:'',
        businessTypeId:'',
        businessType:[],
        select_businTypeIdValue:'',
        isStart:false,
        change_qcPeriodId:'',
        change_automaticFlag:'',
        change_row:{},
        options:[
          {regularQcperiod:1,regularQcperiodText:'日'},
          {regularQcperiod:2,regularQcperiodText:'周'},
          {regularQcperiod:3,regularQcperiodText:'月'}
        ],
        itemPeriod:{}
      }
    },
    mounted(){
      this._getList()
      this.businessTypeValue = "所有"
      util.getBusin(this,'businessType','1',true)
    },
    methods:{
      _getList(){
        this.loading = true
        let businessTypeId = this.businessTypeValue == "所有"?"":this.businessTypeId
        let obj = {
          currentPage:this.currentPage,
          pageSize:this.currentPageSize,
          businTypeId:businessTypeId
        }

        this.$http.get(CYCLE_LIST,{params:obj}).then(res=>{
          let {data} = res.data
          let list = []
          data.items.map(item=>{
            regularTransform(item.regularQcperiod,item)
            if(item.automaticFlag == "1"){
              item.isCheck = false
            }else{
              item.isCheck = true
            }
            list.push(item)
          })
          this.cycleTableData = list
          this.total = data.totalNum
          this.loading = false
        })
      },
      _searchData(){
        this._getList()
      },
      _changeRegularQcperiod(businTypeId,regularQcperiod){
        this.$http.post(CYCLE_CHANGEPERIOD,{id:businTypeId,regularQcperiod}).then(res=>{
          if(res.status === 200 && res.data.status == 0){
            let {periodDesc} = res.data.data
            this.itemPeriod.regularQcperiodText = periodDesc
            this.regularQcperiodValue = ''
            util.success('修改成功')
          }else{
            util.error(res.data.message);
          }
        })
      },
      _changeCheck(qcPeriodId,automaticFlag,row){
        let flag = automaticFlag == 1?0:1
        this.$http.post(CYCLE_CHANGE_STATUS,{id:qcPeriodId,automaticFlag:flag}).then(res=>{
          if(res.status === 200 && res.data.status == 0){
            let {status,automaticFlag} = res.data.data
            if(status){
              row.automaticFlag = automaticFlag
              row.isCheck = !row.isCheck
            }
          }else{
            util.error("修改失败")
          }
        })
      },
      handleEdit(row,index){
        // regularQcperiodText
        let {regularQcperiodText} = row
        this.regularQcperiodValue = regularQcperiodText
        this.itemPeriod = row
        this.dialogVisible = true
        let {id,regularQcperiod} = row
        this.select_businTypeIdValue = id
      },
      handleChangeCurrentPageSize(val){
        this.currentPageSize = val
        this.currentPage = 1
        this._getList()
      },
      handleChangeCurrentPage(val){
        this.currentPage = val
        this._getList()
      },
      handleSearch(){
        this._getList()
      },
      handleTypeChange(val){
        this.businessTypeValue = val
        let id = util.getBusinId(this.businessType,this.businessTypeValue)
        this.businessTypeId = id
      },
      handleSelectChange(val){
        this.regularQcperiodNum = val
      },
      handleConfirm(){
        this.dialogVisible = false
        regularTransformToNum(this.regularQcperiodValue,this)
        this._changeRegularQcperiod(this.select_businTypeIdValue,this.regularQcperiodNum)
        this._getList()
      },
      handleChangeCancle(){
        this.changeDialogVisible = false
      },
      handleChangeConfirm(){
        this._changeCheck(this.change_qcPeriodId,this.change_automaticFlag,this.change_row)
        this.changeDialogVisible = false
        util.success('修改成功')
      }
    },
  }
</script>

<style lang="less" scoped>
    .cycle-box{
        width: 90%;
        margin: 0 auto;

        .cycle-table{
            width: 100%;
            margin: 0 auto;
            margin-top: 20px;
            background: #fff;

            .check-opt{
                .stop{
                    color: #F56C6C;
                }
                .start{
                    color: #409EFF;;
                }
            }
        }

        .dialog-info{
            overflow: hidden;
            line-height: 50px;

            .info-item{
                width: 33.3%;
                float: left;
            }

            .tip{
                color:red;
            }
        }

        .dialog-box{
            overflow: hidden;
            .title{
                width: 33%;
                float: left;
                line-height: 60px;
            }

            .input{
                width: 50%;
                float: left;
                text-align: left;
                line-height: 60px;
            }
        }

    }
</style>

