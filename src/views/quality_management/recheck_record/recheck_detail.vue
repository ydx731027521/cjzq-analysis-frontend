
<template>
    <div class="detail-box">
        <div class="detail-header">
            <span>复检详情</span>
            <el-button type="primary" @click='handleExport'>生成复检报告</el-button>
        </div>
        <div class="result-box">
            <div class="left">
                <div class="left-title">
                    <img src="../../../static/r3.png" alt="">
                </div>
                <div class="left-content">
                    <p class="key">复检次数</p>
                    <p class="value">
                        <span class="green">{{pageData.reExaminationCount}}</span>
                    </p>
                </div>
            </div>
            <div class="left">
                <div class="left-title">
                    <img src="../../../static/r2.png" alt="">
                </div>
                <div class="left-content">
                    <p class="key">复检结果</p>
                    <template v-if="pageData.qcStatus == '已完成-成功'">
                        <p class="value">
                            <img src="../../../static/ok.png" alt="">
                            <span class="green">合格</span>
                        </p>
                    </template>
                    <template v-if="pageData.qcStatus != '已完成-成功'">
                        <p class="value">
                            <img src="../../../static/no.png" alt="">
                            <span class="red">不合格</span>
                        </p>
                    </template>
                </div>
            </div>
            <div class="right" id='final-result'></div>
        </div>

        <div class="content">
            <div class="title"><i class="icon-yuanpicixinxi"></i>原批次信息</div>
            <div class="convention-info">
                <div class="con-name">
                    <span class="info-title">原批次名称：</span>
                    <span>{{origData.qcBatchName}}</span>
                </div>
                <div class="info-item">
                    <span class="info-title">原批次编号：</span>
                    <span>{{origData.qcBatchId}}</span>
                </div>
                <div class="info-item">
                    <span class="info-title">原批次类型：</span>
                    <span>{{origData.batchType}}</span>
                </div>
                <div class="info-item">
                    <span class="info-title">原创建人：</span>
                    <span>{{origData.creator}}</span>
                </div>
                <div class="info-item">
                    <span class="info-title">原创建时间：</span>
                    <span>{{origData.creatTime}}</span>
                </div>
                <div class="info-item">
                    <span class="info-title">原批次质检时间：</span>
                    <template v-if="origData.batchStartTime && origData.batchEndTime">
                        <span>{{origData.batchStartTime}}</span>
                        <span> ~ </span>
                        <span>{{origData.batchEndTime}}</span>
                    </template>
                </div>
                <div class="info-item">
                    <span class="info-title">订单时间范围：</span>
                    <template v-if="pageData.startDate && pageData.endDate">
                        <span>{{pageData.startDate}}</span>
                        <span> ~ </span>
                        <span>{{pageData.endDate}}</span>
                    </template>
                </div>
            </div>

            <div class="title"><i class="icon-picixinxi"></i>复检批次信息</div>
            <div class="convention-info">
                <div class="info-item">
                    <span class="info-title">批次编号：</span>
                    <span>{{pageData.qcBatchId}}</span>
                </div>
                <div class="info-item">
                    <span class="info-title">批次状态：</span>
                    <span>{{pageData.qcStatus}}</span>
                </div>
                <div class="info-item">
                    <span class="info-title">创建人：</span>
                    <span>{{pageData.creator}}</span>
                </div>
                <div class="info-item">
                    <span class="info-title">创建时间：</span>
                    <span>{{pageData.creatTime}}</span>
                </div>
                <div class="info-item">
                    <span class="info-title">批次复检时间：</span>
                    <template v-if="pageData.batchStartTime && pageData.batchEndTime">
                        <span>{{pageData.batchStartTime}}</span>
                        <span> ~ </span>
                        <span>{{pageData.batchEndTime}}</span>
                    </template>
                </div>
            </div>

            <div class="title"><i class="icon-yewuxinxi"></i>业务信息</div>
            <div class="busin-info">
                <div class="info-item">
                    <span class="info-title">业务类型：</span>
                    <span v-if="pageData.businKind&&pageData.businSubKind&&pageData.businName">
                    <span>{{pageData.businKind}}</span>
                    <span> > </span>
                    <span>{{pageData.businSubKind}}</span>
                    <span> > </span>
                    <span>{{pageData.businName}}</span>
                    </span>
                </div>
                <div class="info-item">
                    <span class="info-title">质检标准版本：</span>
                    <span>{{pageData.qcStdVersion}}</span>
                </div>
            </div>

            <div class="title"><i class="icon-zhijianyaojian"></i>质检要件</div>
            <div class="collapse">
                <div class="collapse-borderbox">
                    <el-collapse v-model="activeNames" @change="handleCollClick">
                        <el-collapse-item :title="collapseTitle?'点击展开质检要件':'点击收起质检要件'" name="list" class="collapse-item">
                            <el-table
                                    v-loading="loading"
                                    :header-cell-style="{'background':'#E8E8E8','color':'black','font-weight':'800'}"
                                    :data="tableData"
                                    border
                                    style="width: 100%">
                                <el-table-column
                                        label="序号"
                                        type="index"
                                        width="50"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        prop="markTypeName"
                                        label="要件类型"
                                        width="100"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        prop="markItemName"
                                        label="要件名称"
                                        width="200"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        prop="orderFilter"
                                        label="筛选条件"
                                        width="140"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        prop="qcRule"
                                        label="质检规则"
                                        align="center">
                                </el-table-column>
                            </el-table>
                            <!-- 要件分页 -->
                            <pagination
                                    :total="total"
                                    :currentPage="currentPage"
                                    :pageSize="pageSize"
                                    @changeCurrentPageSize="handleChangeCurrentPageSize($event,'')"
                                    @changeCurrentPage="handleChangeCurrentPage($event,'')">
                            </pagination>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="title"><i class="icon-zhijianmingxi"></i> 明细</div>
            <div class="tab-box">
                <el-tabs v-model="activeTab" @tab-click="handleChangeTab">
                    <el-tab-pane label="全部" name="all">
                        <TableAll :data="all_data" :headerList="headerList" ref="all"></TableAll>
                        <!-- 所有分页 -->
                        <pagination
                                :total="all_total"
                                :currentPage="all_currentPage"
                                :pageSize="all_pageSize"
                                @changeCurrentPageSize="handleChangeCurrentPageSize($event,'all_')"
                                @changeCurrentPage="handleChangeCurrentPage($event,'all_')">
                        </pagination>
                    </el-tab-pane>
                    <el-tab-pane label="仅合格订单" name="qualified">
                        <TableAll :data="qualified_data" :headerList="headerList" ref="qualified"></TableAll>
                        <!-- 所有分页 -->
                        <pagination
                                :total="qualified_total"
                                :currentPage="qualified_currentPage"
                                :pageSize="qualified_pageSize"
                                @changeCurrentPageSize="handleChangeCurrentPageSize($event,'qualified_')"
                                @changeCurrentPage="handleChangeCurrentPage($event,'qualified_')">
                        </pagination>
                    </el-tab-pane>
                    <el-tab-pane label="仅不合格订单" name="unqualified">
                        <TableAll :data="unqualified_data" :headerList="headerList" ref="unqualified"></TableAll>
                        <!-- 所有分页 -->
                        <pagination
                                :total="unqualified_total"
                                :currentPage="unqualified_currentPage"
                                :pageSize="unqualified_pageSize"
                                @changeCurrentPageSize="handleChangeCurrentPageSize($event,'unqualified_')"
                                @changeCurrentPage="handleChangeCurrentPage($event,'unqualified_')">
                        </pagination>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="btn-box">
                <el-button type='primary' plain @click="handleGoBack">返 回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
  import TableAll from "components/table_all"
  import URL from 'api/url'
  import Pagination from 'components/common/Pagination'
  import {conventionResultTrans,checkDim} from 'tools/transform'
  import util from 'tools/util'
  import baseUrl from '../../../setBaseUrl'
  import { Message } from 'element-ui'
  let {CONVENTION_BATCH_DETAIL,DEFECTIVE_DETAIL_STATIC_LIST,DEFECTIVE_DETAIL_ALL_FLOAT_LIST,DEFECTIVE_EXCEL_DETAIL_EXPORT,CONVENTION_BATCH_DETAIL_LIST} = URL
  export default {
    name:'recheckRecordDetail',
    components:{TableAll,Pagination},
    data(){
      return {
        loading:false,
        id:'',
        activeNames:"list",
        activeTab:"qualified",
        pageData:{},
        tableData:[],
        qcResult:"",
        str:"qualified",
        total:0,
        currentPage:1,
        pageSize:20,
        all_currentPage:1,
        all_pageSize:20,
        all_total:0,
        qualified_currentPage:1,
        qualified_pageSize:20,
        unqualified_currentPage:1,
        unqualified_pageSize:20,
        headerList:[
          {prop:'originalOrderId',label:'原始订单号'},
          {prop:'clientId',label:'客户号'},
          {prop:'qcResult',label:'质检结果'}
        ],
        headerListLength:3,
        all_headerList:[],
        all_leftTableData:[],
        all_bodyList:[],
        all_data:[],
        qualified_leftTableData:[],
        qualified_bodyList:[],
        qualified_data:[],
        qualified_total:0,
        qualified_headerList:[],
        unqualified_leftTableData:[],
        unqualified_bodyList:[],
        unqualified_data:[],
        unqualified_total:0,
        unqualified_headerList:[],
        collapseTitle:false,
        origData:[],
        queryData:{},
        params:{},
        isRecheckManage:false,
        isRecheckRecord:false,
        message:{}
      }
    },
    mounted(){
      util.wrapToTop(this)
      this.qcResult = 0
      this.queryData = this.$route.params
      let {originalQcBatchId,qcBatchId,isRecheckManage,isRecheckRecord,params} = this.queryData
      this.id = qcBatchId
      this.params = params
      this.isRecheckManage = isRecheckManage
      this.isRecheckRecord = isRecheckRecord
      this._getPageData(originalQcBatchId,qcBatchId)
      this._getAllData(this.id,this.str)
      this._getEssantialList()
    },
    methods:{
      _getPageData(originalQcBatchId,qcBatchId){
        this.$http.get(CONVENTION_BATCH_DETAIL,{params:{
            qcBatchId:qcBatchId
          }}).then(res=>{
          if(res.status === 200 && res.data.status === 0){
            let {data} = res.data
            let qcStdVersion = util.formatVersionStr(data.qcStdVersion)
            this.pageData = data
            this.pageData.qcStdVersion = qcStdVersion
            this._initEcharts()
          }else{
            util.error(res.data.message)
          }
        })

        this.$http.get(CONVENTION_BATCH_DETAIL,{params:{
            qcBatchId:originalQcBatchId
          }}).then(res=>{
          if(res.status === 200 && res.data.status === 0){
            let {data} = res.data
            this.origData = data
          }else{
            util.error(res.data.message)
          }
        })
      },
      _getAllData(id,str){
        // 请求固定列
        var currentPage = str+"_currentPage"
        var pageSize = str+"_pageSize"
        var bodyList = str+"_bodyList"
        var leftTableData = str+'_leftTableData'
        var headerList = str+'_headerList'
        var total = str+'_total'
        var id = this.id

        this.$refs[str].loading = true
        let promise_static = new Promise((resolve,reject)=>{
          this.$http.get(DEFECTIVE_DETAIL_STATIC_LIST,{params:{
              currentPage:this[currentPage],
              pageSize:this[pageSize],
              qcBatchId: id,
              qcResult:this.qcResult
            }}).then(res=>{
            resolve(res.data)
          }).catch(err => {
            reject(err);
          });
        })
        // 请求不固定列
        let promise_float = new Promise((resolve,reject)=>{
          this.$http.get(DEFECTIVE_DETAIL_ALL_FLOAT_LIST,{params:{
              currentPage:this[currentPage],
              pageSize:this[pageSize],
              qcBatchId: id,
              qcResult:this.qcResult
            }}).then(res=>{
            resolve(res.data)
          }).catch(err => {
            reject(err);
          });
        })

        Promise.all([promise_static,promise_float]).then(res=>{
          let {items} = res[0].data
          let {bodyList,headList} = res[1].data
          if(items&&headList){
            this[leftTableData] = items
            this[bodyList] = bodyList
            this[headerList] = headList
            this[total] = res[0].data.totalNum
            this._getHeaderList(this[headerList])
            if(bodyList){
              this._getBodyList(this[leftTableData],this[bodyList],str)
            }
          }
          this.$refs[str].loading = false
        })
      },
      _initHeaderList(){
        this.headerList = [
          {prop:'origOrderId',label:'原始订单号'},
          {prop:'clientId',label:'客户号'},
          {prop:'qcResult',label:'质检结果'}
        ]
      },
      _getBodyList(leftTableData,bodyList,str){
        let data = str+'_data'
        let length = leftTableData.length
        let keys = Object.keys(bodyList)
        let arr = []

        for(let i=0;i<length;i++){
          leftTableData.map(item=>{
            let obj = {...item}
            if(item.orderId === keys[i]){
              bodyList[keys[i]].map(bitem=>{
                let key = bitem.key
                let value = bitem.value
                obj[key] = value
              })
              arr.push(obj)
            }
          })
        }
        this[data] = arr
      },
      _getEssantialList(){
        this.loading = true
        this.$http.get(CONVENTION_BATCH_DETAIL_LIST,{params:{
            currentPage:this.currentPage,
            pageSize:this.pageSize,
            qcBatchId:this.id
          }}).then(res=>{
          let {data} = res
          if(res.status === 200 && data.status === 0){
            let {items,totalNum} = data.data
            items.map(citem=>{
              checkDim(citem.markDim,citem)
            })
            this.tableData = items
            this.total = totalNum
            this.loading = false
          }else{
            util.error(res.data.message)
          }
        })
      },
      _initEcharts(){
        let {orderAmount,eligAmount,uneligAmount} = this.pageData
        util.initEcharts(this,'final-result',orderAmount,eligAmount,uneligAmount,'复检结果饼状图')
      },
      _getHeaderList(arr){
        if(arr){
          this._initHeaderList()
          let idList = this.headerList.slice(0,this.headerList.length-1)
          let resultList = this.headerList.slice(this.headerList.length-1)
          let list = arr.map((item,index)=>{
            return {prop:item.key,label:item.value}
          })
          let newArr = idList.concat(list).concat(resultList)
          this.headerList = newArr
        }
      },
      _export(){
        let token = this.$store.state.user.token
        this.message = Message({
            showClose: true,
            message: '正在导出中...',
            duration:0
        })
        axios({
          method: 'get',
          url: baseUrl+DEFECTIVE_EXCEL_DETAIL_EXPORT+'?qcBatchId='+this.id,
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
      handleChangeTab(val){
        let {name} = val
        this.str = name
        switch(name){
          case 'all':
            this.qcResult = ''
            break
          case 'qualified':
            this.qcResult = '0'
            break
          case 'unqualified':
            this.qcResult = '1'
            break
        }
        this._getAllData(this.id,this.str)
      },
      handleChangeCurrentPageSize(val,str){
        let pageSize = str + "pageSize"
        let currentPage = str + "currentPage"
        this[pageSize] = val
        this[currentPage] = 1
        if(!str){
          this._getEssantialList()
        }else{
          this._getAllData(this.id,this.str)
        }
      },
      handleChangeCurrentPage(val,str){
        let currentPage = str + "currentPage"
        this[currentPage] = val
        if(!str){
          this._getEssantialList()
        }else{
          this._getAllData(this.id,this.str)
        }
      },
      handleCollClick(){
        // if(!this.collapseTitle)
        //   this._getEssantialList()
        this.collapseTitle = !this.collapseTitle
      },
      handleExport(){
        this._export()
      },
      handleGoBack(){
        if(this.isRecheckManage){
          this.$router.push({name:'复检管理',params:{params:this.params}})
        }else{
          this.$router.push({name:'复检记录',params:{params:this.params}})
        }
      },
      download (data) {
        let url = window.URL.createObjectURL(new Blob([data.data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        let str = '复检报告('+this.id+').xlsx'
        link.setAttribute('download', str)
        document.body.appendChild(link)
        link.click()
      },
      IEDown(data){
        let time = (new Date()).getTime()
        let str = '复检报告('+this.id+').xlsx'
        var winname = window.open('', '_blank', 'top=10000');
        var strHTML = data.data;
        winname.document.open('application/vnd.ms-excel', 'export excel');
        window.navigator.msSaveBlob(data.data,str);
        winname.close();
      }
    }
  }
</script>

<style lang="less" scoped>
    @import '~style/varible.less';
    .collapse /deep/ .el-collapse-item__header{
        justify-content: center;
        text-indent: 0 !important;
        font-size:14px;
        font-weight: 800;
        color: @color-font;
    }
    .collapse /deep/ .el-collapse-item__arrow.el-icon-arrow-right{
        margin-left: 10px;
        transform: rotate(-90deg)
    }
    .collapse /deep/ .el-collapse-item__arrow.el-icon-arrow-right.is-active{
        transform: rotate(90deg)
    }

    .detail-box{
        width: 96%;
        margin:0 auto;
        padding-bottom: 20px;
        margin-bottom: 10px;
        margin-top: -30px;

        .green{
            color: @color-green;
        }

        .red{
            color: @color-red;
        }

        i{
            display: inline-block;
            background-image: url(../../../static/detail_icons.png);
            background-repeat: no-repeat;
            line-height: 50px;
            vertical-align: middle;
            margin-right: 10px;
        }

        .detail-header{
            font-size: 20px;
            line-height: 40px;
            text-align: left;
            background: #F2F8F9;
            overflow: hidden;

            &>span{
                float: left;
            }

            &>button{
                float: right;
            }
        }

        .result-box{
            overflow: hidden;
            margin-top: 10px;

            .left{
                float: left;
                width: 10%;
                background: #fff;
                margin-bottom: 20px;
                overflow: hidden;
                box-sizing: border-box;
                height: 300px;
                margin-left: 1%;

                &:first-child{
                    margin-left: 0;
                }

                .left-title{
                    margin-top: 40px;
                }

                .left-content{
                    margin-top: 30px;

                    img{
                        vertical-align: middle;
                        line-height: 40px;
                        margin-right: 5px;
                    }

                    &>p{
                        line-height: 40px;
                    }

                    .key{
                        font-size: 18px;
                        color: @color-font;
                    }

                    .value{
                        font-size: 20px;
                        color: @color-title;
                    }
                }
            }

            .right{
                float: left;
                width: 78%;
                height: 300px;
                margin-left: 2%;
                background: #fff;
                box-sizing: border-box;
                padding: 20px;

                &:last-child{
                    margin-left: 1%;
                }
            }
        }

        .content{
            margin-bottom:20px;
            padding: 0 20px;
            background: #fff;

            .icon-yuanpicixinxi{
                display: inline-block;
                width: 32px;
                height: 32px;
                background: url(../../../static/icon.png);
            }

            .tab-box{
                padding: 0 20px 10px;
            }

            .title{
                font-size: 18px;
                line-height: 50px;
                text-align: left;
                overflow: hidden;
                color: @color-title;
                border-bottom: 1px solid #ccc;

                i{
                    width: 32px;
                    height: 32px;
                }
            }

            .convention-info,.busin-info{
                line-height: 40px;
                overflow: hidden;
                margin-bottom: 20px;
                background: #fff;
                padding: 0 40px;
                color: @color-font;

                .info-title{
                    font-weight: 800;
                    font-size: 16px;
                    text-decoration: none;
                    border-bottom: 0;
                }

                .con-name{
                    text-align: left;
                    text-indent: 40px;
                }

                .info-item,.w60{
                    float: left;
                    text-align: left;
                    text-indent:40px;
                }

                .info-item{
                    width: 50%;
                }

                .w60{
                    width: 60%;
                }
            }

            .result-info{
                background: #fff;
                overflow: hidden;

                .w25{
                    float: left;
                    width: 25%;
                    background: #fff;

                    p{
                        height: 40px;
                        line-height: 40px;
                    }

                }

                .btn-box{
                    line-height: 80px;
                }
            }

            .collapse{
                padding: 0 3%;
                margin:10px auto 0;
                background: #fff;
                padding-bottom: 20px;

                .collapse-borderbox{
                    border: 1px solid #ebeef5;
                    border-style: none solid none solid;
                    margin-top: 10px;

                    .collapse-item{
                        padding: 10px 10px 0;
                    }
                }
            }
            .btn-box{
                button{
                    width: 200px !important;
                }
                padding-bottom: 20px;
            }
        }

    }
</style>

