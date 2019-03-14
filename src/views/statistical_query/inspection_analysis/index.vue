<template>
    <div class="inspection-analysis">
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
        <div class="tabs">
            <el-tabs v-model="activeName" @tab-click="handleTabs" type="border-card">
                <el-tab-pane label="按业务" name="business">
                    <div class="histogram">
                        <div class="histogram-tltle">
                            <p>
                                质检批次：
                                <span class="histogram-count">{{histogramData.batchAmount}}</span>
                            </p>
                            <p>
                                不合格率：
                                <span class="histogram-proportion red">{{histogramData.batchrejectionRate}}%</span>
                            </p>
                            <p>
                                所有订单：
                                <span class="histogram-amount">{{histogramData.orderAmount}}</span>
                            </p>
                            <p>
                                不合格订单：
                                <span class="histogram-unquality-amount">{{histogramData.uneligAmount}}</span>
                            </p>
                        </div>
                        <div class="histogram-echart" id="histogram-echart"></div>
                    </div>
                    <el-table
                            v-loading="histogram_loading"
                            :header-cell-style="{'background':'#E8E8E8','color':'black','font-weight':'800'}"
                            :data="histogramTableData"
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
                                v-if="levelId == ''"
                                prop="businName"
                                label="业务分类"
                                width="350"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                v-if="levelId == '1'"
                                prop="businSubKind"
                                label="业务分类"
                                width="350"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                v-if="levelId == '2'"
                                prop="businName"
                                label="业务分类"
                                width="350"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="orderAmount"
                                label="所有订单"
                                width="250"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="uneligAmount"
                                label="不合格订单"
                                width="250"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                label="不合格率"
                                align="center">
                            <template slot-scope="{row}">
                                <span>{{row.rejectionRate}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 柱状图分页 -->
                    <pagination
                            :total="histogram_total"
                            :currentPage="histogram_currentPage"
                            :pageSize="histogram_pageSize"
                            @changeCurrentPageSize="handleChangeCurrentPageSize($event,'histogram_')"
                            @changeCurrentPage="handleChangeCurrentPage($event,'histogram_')">
                    </pagination>
                </el-tab-pane>
                <el-tab-pane label="按批次" name="batch">
                    <div class="line">
                        <div class="line-echart" id="line-echart"></div>
                    </div>
                    <el-table
                            v-loading="line_loading"
                            :header-cell-style="{'background':'#E8E8E8','color':'black','font-weight':'800'}"
                            :data="lineTableData"
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
                                prop="qcbatchId"
                                label="质检批次"
                                width="350"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="batchStartTime"
                                label="质检日期"
                                width="250"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="orderAmount"
                                label="订单总数"
                                width="150"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="uneligAmount"
                                label="次品数"
                                width="150"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                label="不合格率"
                                align="center">
                            <template slot-scope="{row}">
                                <span>{{row.rejectionRate}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 柱状图分页 -->
                    <pagination
                            :total="line_total"
                            :currentPage="line_currentPage"
                            :pageSize="line_pageSize"
                            @changeCurrentPageSize="handleChangeCurrentPageSize($event,'line_')"
                            @changeCurrentPage="handleChangeCurrentPage($event,'line_')">
                    </pagination>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
  import util from 'tools/util'
  import Pagination from 'components/common/Pagination.vue'
  import URL from 'api/url'
  let {STATISTICAL_INSPECTION_ANALYSIS_HISTOGRAM,STATISTICAL_INSPECTION_ANALYSIS_BROKENLINE,STATISTICAL_INSPECTION_BUSIN_LIST,STATISTICAL_INSPECTION_BATCH_LIST} = URL

  export default {
    name: "inspectionAnalysis",
    components:{
      Pagination
    },
    data(){
      return {
        histogram_loading: false,
        line_loading: false,
        histogramTableData: [],
        lineTableData: [],
        businessTypeValue: '',
        secondClassValue: '',
        thirdClassValue: '',
        businessTypeId:'',
        secondClassId:'',
        thirdClassId:'',
        businessType: [],
        secondClass: [],
        thirdClass: [],
        activeName: 'business',
        histogram_currentPage: 1,
        histogram_pageSize: 20,
        histogram_total:0,
        histogramData:{},
        line_currentPage: 1,
        line_pageSize: 20,
        line_total:0,
        dateValue:[],
        batchStartTime:'',
        batchEndTime:'',
        tab:'histogram',
        levelId:''
      }
    },
    mounted(){
      this._initDate()
      this.businessTypeValue = "所有"
      this.secondClassValue = "所有"
      this.thirdClassValue = "所有"
      util.getBusin(this,'businessType','1',true)
      this._getBusinList(this.params)
      this._initHistogram(this.params)
      // this._getList(this.params,'business')
    },
    methods:{
      _initDate(){
        let endDate = {}
        let startDate = {}
        endDate = new Date()
        let sYear = endDate.getFullYear()
        let sDate = endDate.getDate()
        let sMonth
        if(sMonth>2){
          sMonth = endDate.getMonth()-3
        }else if(sMonth=0){
          sMonth = 9
          sYear -= 1
        }else if(sMonth=1){
          sMonth = 10
          sYear -= 1
        }else if(sMonth=2){
          sMonth = 10
          sYear -= 1
        }
        startDate = new Date(sYear,sMonth,sDate)
        this.dateValue = [startDate,endDate]

        this.batchStartTime = this._formatDate(startDate)
        this.batchEndTime = this._formatDate(endDate)
      },
      _formatDate(date){
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return '' + y  + m +  d;
      },
      // 获取业务列表
      _getBusinList(params){
        this.histogram_loading = true
        let currentPage = this.histogram_currentPage
        let pageSize = this.histogram_pageSize
        let obj = {
          ...params,
          currentPage,
          pageSize
        }
        this.$http.post(STATISTICAL_INSPECTION_BUSIN_LIST,obj).then(res=>{
          if(res.status === 200 && res.data.status === 0){
            let {data} = res.data
            this.histogramData = data
            this.histogramData.batchrejectionRate = this.histogramData.batchrejectionRate.toFixed(2)
            this.histogramTableData = data.qcBatchHistogramList.items
            this.histogram_total = data.qcBatchHistogramList.totalNum
            this.histogram_loading = false
          }else{
            util.error(res.data.message)
          }
        })
      },
      // 获取业务  柱状图
      _initHistogram(params){
        let _this = this
        this.$http.post(STATISTICAL_INSPECTION_ANALYSIS_HISTOGRAM,params).then(res=>{
          let {data} = res.data
          if(res.status === 200 && res.data.status === 0){
            let businNameList =  []
            let dataList = []
            data.map(item=>{
              if(_this.levelId == ''){
                // businNameList.push(item.businkind)
                businNameList.push(item.businName)
              }else if(_this.levelId == 1){
                // businNameList.push(item.businSubKind)
                businNameList.push(item.businName)
              }else if(_this.levelId == 2){
                businNameList.push(item.businName)
              }
              dataList.push(item.rejectionRate.toFixed(2))
            })
            util.initHistogram(this,'histogram-echart',businNameList,dataList)
          }else{
            util.error(res.data.message)
          }
        })
      },
      // 获取批次列表
      _getBatchList(params){
        this.line_loading = true
        let currentPage = this.line_currentPage
        let pageSize = this.line_pageSize
        let obj = {
          ...params,
          currentPage,
          pageSize
        }
        this.$http.post(STATISTICAL_INSPECTION_BATCH_LIST,obj).then(res=>{
          let {data} = res.data
          if(res.status === 200 && res.data.status === 0){
            if(data){
              this.lineTableData = data.items
              this.line_total = data.totalNum
            }
            this.line_loading = false
          }else{
            util.error(res.data.message)
          }
        })
      },
      // 获取批次  折线图
      _initLine(params){
        this.line_loading = true
        this.$http.post(STATISTICAL_INSPECTION_ANALYSIS_BROKENLINE,params).then(res=>{
          let {data} = res.data
          if(res.status === 200 && res.data.status === 0){
            let businNameList =  []
            let dataList = []
            for(let i=0;i<data.length;i++){
              businNameList.push(data[i].batchStartTime)
              dataList.push(data[i].rejectionRate.toFixed(2))
            }
            util.initLine(this,'line-echart',businNameList,dataList)
          }else{
            util.error(res.data.message)
          }
        })
      },
      _getList(params,tabName){
        let echartName = tabName === 'business'?'histogram':'line'

        let str = echartName + '_loading'
        let currentPageName = echartName + "_currentPage"
        let pageSizeName = echartName + "_pageSize"
        let tableDataName = echartName + "TableData"
        let totalName = echartName + "_total"

        let currentPage = this[currentPageName]
        let pageSize = this[pageSizeName]
        this[str] = true
        let obj = {
          ...params,
          currentPage,
          pageSize
        }

        if(tableDataName === 'histogramTableData'){
          this.$http.post(STATISTICAL_INSPECTION_ANALYSIS_HISTOGRAM,obj).then(res=>{
            if(res.status === 200 && res.data.status === 0){
              let {data} = res.data
              if(data){
                this.histogramData = data
                let {batchrejectionRate} = data
                this.histogramData.batchrejectionRate = batchrejectionRate.toFixed(2)
                this[tableDataName] = data.qcBatchHistogramList.items
                this[totalName] = data.qcBatchHistogramList.totalNum

                let businNameList =  []
                let dataList = []
                data.qcBatchHistogramList.items.map(item=>{
                  businNameList.push(item.businkind)
                  dataList.push(item.rejectionRate)
                })
                businNameList = this._deduplicate(businNameList)
                util.initHistogram(this,'histogram-echart',businNameList,dataList)
              }
              this[str] = false
            }else{
              util.error(res.data.message)
            }
          })
        }else{
          this.$http.post(STATISTICAL_INSPECTION_ANALYSIS_BROKENLINE,obj).then(res=>{
            if(res.status === 200 && res.data.status === 0){
              let {data} = res.data
              if(data){
                util.batchTimeTrans(data.items,'batchStartTime')
                this[tableDataName] = data.items
                this[totalName] = data.totalNum

                let businNameList =  []
                let dataList = []
                for(let i=0;i<data.items.length;i++){
                  businNameList.push(i+1)
                  dataList.push(Math.floor(data.items[i].rejectionRate))
                }
                util.initLine(this,'line-echart',businNameList,dataList)
              }
              this[str] = false
            }else{
              util.error(res.data.message)
            }
          })
        }
      },
      _getTableData(val){
        this._initDate()
        if(val === 'histogram_'){
          this._getBusinList(this.params)
        }else{
          this._getBatchList(this.params)
        }
      },
      _deduplicate(arr){
        let list = Array.from(new Set(arr))
        return list
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
      handleTabs(val){
        let {name} = val
        this.tab = name==='business'?'histogram':'line'
        switch(name){
          case 'business':
            if(this.histogramTableData.length===0){
              // this._getList(this.params,'business')
              this._getBusinList(this.params)
              this._initHistogram(this.params)
            }
            break
          case 'batch':
            if(this.lineTableData.length===0){
              if(typeof(this.batchStartTime) == 'object'||typeof(this.batchEndTime) == 'object'){
                this.batchStartTime = this._formatDate(this.batchStartTime)
                this.batchEndTime = this._formatDate(this.batchEndTime)
              }
              // this._getList(this.params,'batch')
              this._getBatchList(this.params)
              this._initLine(this.params)
            }
            break
        }
      },
      handleChangeCurrentPage(val,str){
        let currentPage = str + "currentPage"
        this[currentPage] = val
        // this._getList(this.params,this.activeName)
        this._getTableData(str)
      },
      handleChangeCurrentPageSize(val,str){
        let pageSize = str + "pageSize"
        let currentPage = str + "currentPage"
        this[pageSize] = val
        this[currentPage] = 1
        // this._getList(this.params,this.activeName)
        this._getTableData(str)
      },
      handleSearch(){
        // this._getList(this.params,this.activeName)
        // if(((this.secondClassValue!='所有')&&(this.thirdClassValue!='所有')&&(this.businessTypeValue!='所有'))||((this.businessTypeValue!='所有')&&(this.secondClassValue!='所有')&&(this.thirdClassValue=='所有'))){
        //   this.levelId = 2
        // }else if((this.businessTypeValue!='所有')&&(this.secondClassValue=='所有')&&(this.thirdClassValue=='所有')){
        //   this.levelId = 1
        // }else{
        //   this.levelId = ''
        // }
        let {businTypeId,levelId} = this.params
        if(typeof(this.batchStartTime) == 'object'){
          this.batchStartTime = this._formatDate(this.batchStartTime)
          this.batchEndTime = this._formatDate(this.batchEndTime)
        }
        let obj = {
          businTypeId,
          levelId,
          batchStartTime:this.batchStartTime,
          batchEndTime:this.batchEndTime,
        }
        this.currentPage = 1
        if(this.tab === 'histogram'){
          this._getBusinList(obj)
          this._initHistogram(obj)
        }else{
          this._getBatchList(obj)
          this._initLine(obj)
        }
      }
    },
    computed: {
      params(){
        let businessTypeId = this.businessTypeValue == "所有"?"":this.businessTypeId
        let secondClassId = this.secondClassValue == "所有"?"":this.secondClassId
        let thirdClassId = this.thirdClassValue == "所有"?"":this.thirdClassId
        let businTypeId = ''
        let levelId = 1

        if(businessTypeId&&!secondClassId&&!thirdClassId){
          businTypeId = businessTypeId
          levelId = 2
        }else if(businessTypeId&&secondClassId&&!thirdClassId){
          businTypeId = secondClassId
          levelId = 3
        }else if(!businessTypeId&&!secondClassId&&!thirdClassId){
          businTypeId = thirdClassId
          levelId = 1
        }else{
          levelId = 3
        }

        return {
          businTypeId,
          batchEndTime: this.batchEndTime,
          batchStartTime: this.batchStartTime,
          levelId
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
    .inspection-analysis /deep/ .el-tabs__item.is-top{
        font-weight: 800;
        width: 150px;
        font-size: 18px;
    }
    .inspection-analysis{
        width: 90%;
        margin:0 auto;

        .red{
            color:@color-red;
        }

        .search-box{
            line-height: 50px;
            overflow: hidden;
            position: relative;
            padding: 20px 0;
            display: flex;
            flex-direction: row;
            background: #fff;
            flex-wrap: wrap;

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

        .tabs{
            width: 100%;
            background: #fff;
            padding: 20px 20px;
            box-sizing: border-box;

            .histogram{
                overflow: hidden;
                line-height: 100px;
                text-align: left;
                font-weight: 800;
                height: 450px;

                .histogram-tltle{
                    width: 18%;
                    float: left;
                }

                .histogram-echart{
                    width: 82%;
                    float: left;
                    height: 420px;
                    font-size:10px; 
                }
            }

            .line{
                height: 500px;
                .line-echart{
                    width: 90%;
                    float: left;
                    height: 500px;
                }
            }

        }
    }
</style>
