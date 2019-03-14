<template>
    <div class="defective-query">
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
            <div class="btn-box">
                <el-button type="primary" size="small" class="recheck-search-btn" @click="handleSearch"><i class="el-icon-search"></i></el-button>
            </div>
            <div class="search-item">
                <div class="item-left">
                    <span>营业部：</span>
                </div>
                <div class="item-right">
                    <!-- <el-select v-model="thirdClassValue" size="small" @change="handleThirdClassChange">
                        <el-option
                                v-for="item in thirdClass"
                                :key="item.id"
                                :label="item.businName"
                                :value="item.businName">
                        </el-option>
                    </el-select> -->
                    <el-input size="small" type="text" v-model="branchName" clearable></el-input>
                </div>
            </div>
            <div class="search-item">
                <div class="item-left">
                    <span>客户号：</span>
                </div>
                <div class="item-right">
                    <el-input type="text" size="small" v-model="clientId" clearable></el-input>
                </div>
            </div>
            <div class="date-pick">
                <span>质检时间：</span>
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
        <div class="table-box">
            <div class="btn">
                <el-button type="primary" plain @click="handleExport"><i class="el-icon-download"></i>导出</el-button>
            </div>
            <div class="table">
                <el-table
                        v-loading="loading"
                        :header-cell-style="{'background':'#E8E8E8','color':'black','font-weight':'800'}"
                        ref="multipleTable"
                        :data="tableData"
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
                            prop="qcBatchId"
                            label="批次号"
                            width="300"
                            align="center">
                            <!-- <template slot-scope="{row}">
                              <span class="blue" @click="handleShowDetail(row)">{{row.qcBatchId}}</span>
                            </template> -->
                    </el-table-column>
                    <el-table-column
                            prop="batchStartTime"
                            label="质检开始时间"
                            width="150"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="clientId"
                            label="客户号"
                            width="100"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="branchName"
                            label="客户营业部"
                            width="250"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="origOrderId"
                            label="原始订单号"
                            width="220"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="markItemName"
                            label="缺失要件"
                            width="250"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="remark"
                            label="特殊标记"
                            width="200"
                            align="center">
                    </el-table-column>
                    <!-- <el-table-column
                            prop="qcBatchId"
                            label="批次号"
                            width="200"
                            align="center">
                            <template slot-scope="{row}">
                                <el-tooltip :content="row.qcBatchId" placement="top" effect="light">
                                  <p class="batchId-box">{{row.qcBatchId}}</p>
                                </el-tooltip>
                            </template>
                    </el-table-column> -->
                    <el-table-column
                            prop="remark"
                            label="备注"
                            width="200"
                            align="center">
                    </el-table-column>
                </el-table>
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
    </div>
</template>

<script>
  import util from 'tools/util'
  import Pagination from 'components/common/Pagination.vue'
  import URL from 'api/url'
  import baseUrl from '../../../setBaseUrl'
  import {
    Message
  } from "element-ui";
  let {STATISTICAL_DEFECTIVE_QUERY,STATISTICAL_EXPORT } = URL
  export default {
    name: "defectiveQuery",
    components:{
      Pagination
    },
    data(){
      return {
        loading:false,
        businessTypeValue: '',
        secondClassValue: '',
        thirdClassValue: '',
        businessTypeId:'',
        secondClassId:'',
        thirdClassId:'',
        businessType: [],
        secondClass: [],
        thirdClass: [],
        dateValue:[],
        batchStartTime:'',
        batchEndTime:'',
        total:0,
        currentPage:1,
        pageSize:20,
        tableData:[],
        branchName:'',
        clientId:'',
        multipleSelection:[],
        message:{}
      }
    },
    mounted(){
      this.businessTypeValue = "所有"
      this.secondClassValue = "所有"
      this.thirdClassValue = "所有"
      util.getBusin(this,'businessType','1',true)

      let {params} = this.$route.params
      if(params){
        let keyList = Object.keys(params)
        keyList.map(item=>{
          this[item] = params[item]
        })
      }
      this._getList(this.params)
    },
    methods:{
      _getList(params){
        this.loading = true
        this.$http.post(STATISTICAL_DEFECTIVE_QUERY,params).then(res=>{
          if(res.status === 200 && res.data.status === 0){
            let {data} = res.data
            if(data){
              util.formatBussine(data.items,'bussine')
              util.batchTimeTrans(data.items,'batchStartTime')
              this.tableData = data.items
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
            str += item.orderMarkRelId+','
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
          url: baseUrl+STATISTICAL_EXPORT+'?orderMarkRelIds='+str,
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
        this.pageSize = val
        this._getList(this.params)
      },
      handleChangeCurrentPage(val){
        util.wrapToTop(this)
        this.currentPage = val
        this._getList(this.params)
      },
      handleExport(){
        this._export()
      },
      // handleShowDetail(row){
      //   let obj ={
      //     ...this.params,
      //     businessTypeValue:this.businessTypeValue,
      //     secondClassValue:this.secondClassValue,
      //     thirdClassValue:this.thirdClassValue,
      //     isStatistical: true
      //   }
      //   this.$router.push({name:'次品详情',params:{qcBatchId:row.qcBatchId,params:obj}})
      // },
      download (data) {
        let url = window.URL.createObjectURL(new Blob([data.data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        let time = (new Date()).getTime()
        let str = '次品查询('+time+').xlsx'
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
          clientId: this.clientId.trim(),
          branchName: this.branchName.trim(),
          batchEndTime: this.batchEndTime,
          batchStartTime: this.batchStartTime,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
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
    .defective-query{
        width: 90%;
        margin:0 auto;

        .search-box{
            line-height: 50px;
            overflow: hidden;
            position: relative;
            padding: 20px 0;
            display: flex;
            flex-direction: row;
            background: #fff;
            flex-wrap: wrap;
            margin-bottom: 20px;

            .btn-box{
                width: 16%;
                text-align: center;

                button{
                    width: 80%;
                }
            }

            .date-pick{
                width: 70%;
                text-align: left;

                span{
                    margin-left: 20px;
                    vertical-align: top;
                    width: 120px;
                }
            }

            .search-item{
                width: 28%;
                text-align: left;
                padding-left: 20px;
                box-sizing: border-box;
                display: flex;

                .item-left{
                    /*flex: 80px 0;*/
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
        }

        .table-box {
            margin-top: 20px;
            width: 100%;
            background: #fff;
            padding: 20px 10px 10px;

            .batchId-box{
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .blue{
              color:@color-blue;
              cursor: pointer;
              text-decoration: underline;
            }

            .btn{
                text-align: left;

                button{
                    margin-bottom: 20px;
                }
            }
        }
    }
</style>
