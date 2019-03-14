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
                    <el-button type="primary" plain @click="handleExport" v-if="isExportShow"><i class="el-icon-download"></i>导出</el-button>
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
                                min-width="5%"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                label="序号"
                                type="index"
                                min-width="12%"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="bussine"
                                label="业务类型"
                                min-width="30%"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="qcBatchId"
                                label="批次号"
                                min-width="26%"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="batchStartTime"
                                label="质检开始时间"
                                min-width="18%"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                v-if="isDetailShow"
                                min-width="10%"
                                align="center">
                            <template slot-scope="{row,$index}">
                                <span @click="handleDetail(row,$index)" class="detail-btn">次品详情</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <!-- 分页 -->
        <pagination
                v-if="total!=0"
                :total="total"
                :currentPage="currentPage"
                :pageSize="pageSize"
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
  import CONSTANT from 'api/constant'
  import {mapState} from 'vuex'
  import { Message } from 'element-ui'
  let {DEFECTIVE_EXPORT,CONVENTION_DETAIL_EXPORT,DEFECTIVE_VIEW} = CONSTANT
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
        pageSize:20,
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
        qcBatchId:'',
        businTypeId:'',
        message:{}
      }
    },
    mounted(){
      this.businessTypeValue = "所有"
      this.secondClassValue = "所有"
      this.thirdClassValue = "所有"
      // util.getBusin(this,'businessType','1',true)
      let {params} = this.$route.params
      if(params){
        let keyList = Object.keys(params)
        keyList.map(item=>{
          this[item] = params[item]
        })
      }else{
        util.getBusin(this,'businessType','1',true)
      }

      this._getlist(this.searchData)
    },
    methods:{
      _getlist(params){
        this.loading = true
        this.$http.post(DEFECTIVE_LIST,params).then(res=>{
          if (res.status === 200 && res.data.status === 0) {
            let {data} = res.data
            if(data){
              util.formatBussine(data.items,'bussine')
              this.defectiveTableData = data.items
              this.total = data.totalNum
            }
            this.loading = false
          }else{
            util.error(res.data.message)
          }
        })
      },
      _export(){
        let str = ''
        if(this.multipleSelection.length>0){
          this.multipleSelection.map(item=>{
            str += item.qcBatchId+','
          })
          this.message = Message({
            showClose: true,
            message: '正在导出中...',
            duration:0
          })
        }else{
          this.$message({
            message:'请先选择需要导出的批次',
            type:'warning'
          })
          return
        }
        let index = str.length-1
        str = str.substr(0,index)
        let token = this.$store.state.user.token
        axios({
          method: 'get',
          url: baseUrl+DEFECTIVE_EXCEL_EXPORT+'?batchIds='+str,
          headers:{
            'Authorization':"Bearer " + token,
            'Content-Type': 'application/json'
          },
          responseType: 'blob',
          timeout:1000*60*120,
        }).then(response => {
          let IEVersion = util.IEVersion()
          if(IEVersion!=-1){
            this.IEDown(response)
          }else{
            this.download(response)
          }
          this.message.close()
        }).catch((err) => {
          this.message.close()
          util.err()
        })
      },
      handleSelectionChange(val){
        this.multipleSelection = val
      },
      handleDetail(row,index){
        let obj ={
          ...this.searchData,
          businessTypeValue:this.businessTypeValue,
          secondClassValue:this.secondClassValue,
          thirdClassValue:this.thirdClassValue,
          checkDateValue:this.checkDateValue,
          qcBatchId:this.qcBatchId,
          isStatistical: false,
          businTypeId:this.businTypeId,
          businessTypeId:this.businessTypeId,
          secondClassId:this.secondClassId,
          thirdClassId:this.thirdClassIdm,
          businessType:this.businessType,
          secondClass:this.secondClass,
          thirdClass:this.thirdClass
        }
        this.$router.push({name:'次品详情',params:{qcBatchId:row.qcBatchId,params:obj}})
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
        this.pageSize = val
        this._getlist(this.searchData)
      },
      handleChangeCurrentPage(val){
        util.wrapToTop(this)
        this.currentPage = val
        this._getlist(this.searchData)
      },
      handleSearch(){
        this.currentPage = 1
        this._getlist(this.searchData)
      },
      handleExport(){
        this._export()
      },
      download (data) {
        let url = window.URL.createObjectURL(new Blob([data.data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        let time = (new Date()).getTime()
        let str = '次品处理('+time+').xlsx'
        link.setAttribute('download', str)
        document.body.appendChild(link)
        link.click()
      },
      IEDown(data){
        let time = (new Date()).getTime()
        let str = '次品处理('+time+').xlsx'
        var winname = window.open('', '_blank', 'top=10000');
        winname.document.open('application/vnd.ms-excel', 'export excel');
        window.navigator.msSaveBlob(data.data,str);
        winname.close();
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
        this.businTypeId = businTypeId

        return {
          businTypeId:this.businTypeId,
          batchEndTime: this.endDate,
          batchStartTime: this.beginDate,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          qcBatchId: this.qcBatchId
        }
      },
      ...mapState({
        'authorityList':state=>state.user.authorityList
      }),
      isExportShow(){
        if(this.authorityList.indexOf(DEFECTIVE_EXPORT)>=0||this.authorityList.indexOf('ADMIN')>=0)
          return true
        else
          return false
      },
      isDetailShow(){
        if(this.authorityList.indexOf(DEFECTIVE_VIEW)>=0||this.authorityList.indexOf('ADMIN')>=0)
          return true
        else
          return false
      },
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
            margin-bottom: 10px;
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
                margin-top: 10px;
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
