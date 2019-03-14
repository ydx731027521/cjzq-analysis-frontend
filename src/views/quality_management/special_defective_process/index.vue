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
                <div class="btn" v-if="isImportShow">
                    <!-- <el-button type="primary" plain @click="handleExportIn"><i class="el-icon-download"></i>导入</el-button> -->
                    <el-button class="down" type="primary" plain @click="handleTemplateDown">模板下载</el-button>
                    <el-upload
                            :action="uploadUrl"
                            :headers="headers"
                            :on-success="handleFileUplaodSuccess"
                            :on-error="handleFileUplaodError"
                            :show-file-list=false
                            :on-progress="handleFileUplaoding"
                    >
                        <el-button type="primary" plain>导入</el-button>
                    </el-upload>
                    <el-progress v-if="circleVisible&&this.percentage!=100" class="circle" type="circle" :percentage="percentage" :width="50"></el-progress>
                    <el-progress v-if="circleVisible&&this.percentage==100" class="circle" type="circle" :percentage="100" :width="50"></el-progress>
                </div>
                <!--<el-progress :text-inside="true" :stroke-width="15" :percentage="percentage"></el-progress>-->

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
                                label="序号"
                                type="index"
                                width="50"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="bussine"
                                label="业务类型"
                                width="350"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                label="批次号"
                                width="300"
                                align="center">
                            <template slot-scope="{row}">
                                <!-- <span class="blue" @click="handleShowDetail(row)">{{row.qcBatchId}}</span> -->
                                <span>{{row.qcBatchId}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="clientId"
                                label="客户号"
                                width="150"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="clientName"
                                label="客户姓名"
                                width="250"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="branchName"
                                label="营业部名称"
                                width="200"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="origOrderId"
                                label="原始订单编号"
                                width="300"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="markItemName"
                                label="次品名称"
                                width="180"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="dealDateTime"
                                label="处理时间"
                                width="180"
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
  import url from 'api/url'
  import BASEURL from 'src/setBaseUrl'
  import CONSTANT from 'api/constant'
  import {mapState} from 'vuex'
  import util from 'tools/util'
  import {
    Message,
  } from "element-ui";
  let {SPECICAL_DEFECTIVE_LIST,SPECICAL_DEFECTIVE_EXPORTIN,SPECICAL_DEFECTIVE_TEMPLAGE} = url
  let {SPECIAL_DEFECTIVE_IMPORT} = CONSTANT
  export default {
    name:'defective',
    components:{
      Pagination
    },
    data(){
      return {
        circleVisible:false,
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
        businessTypeId:'',
        secondClassId:'',
        thirdClassId:'',
        batchStartTime:'',
        batchEndTime:'',
        defectiveTableData:[],
        multipleSelection: [],
        qcBatchId:'',
        businTypeId:'',
        businessTypeValue:'',
        uploadUrl: BASEURL + SPECICAL_DEFECTIVE_EXPORTIN,
        loadingStr:'导入中',
        count:1,
        timer:null,
        percentage:0,
        alert:''
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
      }
      this._getlist(this.searchData)
    },
    // beforeRouteLeave(to, from, next) {
    //   from.meta.keepAlive = false;
    //   next();
    // },
    methods:{
      _getlist(params){
        this.loading = true
        this.$http.post(SPECICAL_DEFECTIVE_LIST,params).then(res=>{
          if (res.status === 200 && res.data.status === 0) {
            let {data} = res.data
            if(data){
              util.formatBussine(data.items,'bussine')
              this._transTime(data.items)
              this.defectiveTableData = data.items
              this.total = data.totalNum
            }
            this.loading = false
          }else{
            util.error(res.data.message)
          }
        })
      },
      _transTime(arr){
        arr.map(item=>{
          if(item.dealDateTime){
            item.dealDateTime = item.dealDateTime.substr(0,8)
            let year = item.dealDateTime.substr(0,4)
            let month = item.dealDateTime.substr(4,2)
            let date = item.dealDateTime.substr(6,2)
            item.dealDateTime = year+'-'+month+'-'+date
          }else{
            item.dealDateTime = ''
          }
        })
      },
      _templateDown(){
        let token = this.$store.state.user.token
        axios({
          method: 'get',
          url: baseUrl+SPECICAL_DEFECTIVE_TEMPLAGE,
          headers:{
            'Authorization':"Bearer " + token,
            'Content-Type': 'application/json'
          },
          responseType: 'blob'
        }).then(response => {
          let IEVersion = util.IEVersion()
          if(IEVersion!=-1){
            this.IEDownTemplate(response)
          }else{
            this.download(response)
          }
        }).catch((err) => {
          util.err()
        })
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
      handleSecondClassChange(val){
        this.secondClassValue = val
        util.secondClassChange(this, this.secondClassValue, val,true)
      },
      handleThirdClassChange(val){
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
      handleShowDetail(row){
        let obj ={
          ...this.searchData,
          businessTypeValue:this.businessTypeValue,
          secondClassValue:this.secondClassValue,
          thirdClassValue:this.thirdClassValue,
          businessTypeId:this.businessTypeId,
          secondClassId:this.secondClassId,
          thirdClassId:this.thirdClassId,
          isSpecial: true
        }
        this.$router.push({name:'次品详情',params:{qcBatchId:row.qcBatchId,params:obj}})
      },
      handleFileUplaodSuccess(response, file, fileList){
        // clearInterval(this.timer)
        // this.timer = null
        // this.loadingStr = '导入完成'
        // this.instance.close()
        this.alert.close()
        clearInterval(this.timer)
        this.percentage = 100
        this.circleVisible = false
        if(response.status === 0){
          util.notify('导入成功',0)
        }else{
          if(response.data){
            let str = ''
            for(let i=0;i<response.data.length;i++){
              str += response.data[i]+'\r\n'
            }
            let IEVersion = util.IEVersion()
            if(IEVersion!=-1){
              this.IEDown(str,'错误提示.txt')
            }else{
              this.funDownload(str,'错误提示.txt')
            }
          }
          util.notify(response.message,0)
        }
      },
      handleFileUplaodError(err, file, fileList){
        util.error(err)
      },
      handleFileUplaoding(event, file, fileList){
        this.percentage = 0
        let _this  = this
        this.circleVisible = true
        this.alert = Message({
          type:'info',
          message:'正在导入中...',
          duration:0,
          showClose: true
        })
        this.timer = setInterval(()=>{
          if(_this.percentage == 100){
            clearInterval(_this.timer)
          }else{
            _this.percentage ++
          }
        },4000)
      },
      handleTemplateDown(){
        this._templateDown()
      },
      funDownload(content, filename) {
        var eleLink = document.createElement('a');
        eleLink.download = filename;
        eleLink.style.display = 'none';
        var blob = new Blob([content]);
        eleLink.href = URL.createObjectURL(blob);
        document.body.appendChild(eleLink);
        eleLink.click();
        document.body.removeChild(eleLink);
      },
      IEDown(content, filename){
        var fileObj = new Blob(content,{type:'text/plain'});
        window.navigator.msSaveBlob(fileObj,filename);
      },
      download (data) {
        let url = window.URL.createObjectURL(new Blob([data.data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        let time = (new Date()).getTime()
        let str = '导出模板下载.xlsx'
        link.setAttribute('download', str)
        document.body.appendChild(link)
        link.click()
      },
      IEDownTemplate(data){
        let time = (new Date()).getTime()
        let str = '导出模板下载.xlsx'
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
        let businTypeId =''
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
          batchEndTime: this.batchEndTime,
          batchStartTime: this.batchStartTime,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          qcBatchId: this.qcBatchId
        }
      },
      token(){
        let {token} = util.getSession()
        return token
      },
      headers(){
        return {
          'Authorization': "Bearer " + this.token
        }
      },
      load(){
        let str = '导入中'
        this.timer = setInterval(()=>{
            switch (this.loadingStr) {
              case '导入中':
                str += '.'
                break;
              case '导入中.':
                str += '.'
                break;
              case '导入中..':
                str += '.'
                break;
              default:
                str = '导入中'
            }
        },1000)
        return str
      },
      ...mapState({
        'authorityList':state=>state.user.authorityList
      }),
      isImportShow(){
        if(this.authorityList.indexOf(SPECIAL_DEFECTIVE_IMPORT)>=0||this.authorityList.indexOf('ADMIN')>=0)
          return true
        else
          return false
      },
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

                .blue{
                    color:@color-blue;
                    cursor: pointer;
                    text-decoration: underline;
                }

                .btn{
                    text-align: left;
                    position: relative;

                    button{
                        margin-bottom: 20px;
                    }

                    .down{
                        position: absolute;
                        left: 80px;
                    }

                    .circle{
                        position: absolute;
                        left: 200px;
                        top: -5px;
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
