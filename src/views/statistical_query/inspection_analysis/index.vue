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
            <el-tabs v-model="activeName" @tab-click="handleTabs">
                <el-tab-pane label="按业务" name="business">
                    <div class="histogram">
                        <div class="histogram-tltle">
                            <p>
                                质检批次：
                                <span class="histogram-count">6</span>
                            </p>
                            <p>
                                次品率：
                                <span class="histogram-proportion red">6%</span>
                            </p>
                            <p>
                                所有订单：
                                <span class="histogram-amount">1200</span>
                            </p>
                            <p>
                                不合格订单：
                                <span class="histogram-unquality-amount">100</span>
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
                                prop="orderAmount"
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
                                prop="finalUneligAmount"
                                label="不合格订单"
                                width="250"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="creatTime"
                                label="不合格率"
                                align="center">
                        </el-table-column>
                    </el-table>
                    <!-- 柱状图分页 -->
                    <pagination
                            :total="h_total"
                            :currentPage="h_currentPage"
                            :currentPageSize="h_currentPageSize"
                            @changeCurrentPageSize="handleChangeCurrentPageSize($event,'h_')"
                            @changeCurrentPage="handleChangeCurrentPage($event,'h_')">
                    </pagination>
                </el-tab-pane>
                <el-tab-pane label="按批次" name="batch">
                    <div class="line" id="line-echart"></div>
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
                                prop="orderAmount"
                                label="质检批次"
                                width="250"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="orderAmount"
                                label="质检日期"
                                width="250"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="finalUneligAmount"
                                label="订单总数"
                                width="250"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="creatTime"
                                label="次品数"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="creatTime"
                                label="次品率"
                                align="center">
                        </el-table-column>
                    </el-table>
                    <!-- 柱状图分页 -->
                    <pagination
                            :total="total"
                            :currentPage="l_currentPage"
                            :currentPageSize="l_currentPageSize"
                            @changeCurrentPageSize="handleChangeCurrentPageSize($event,'h_')"
                            @changeCurrentPage="handleChangeCurrentPage($event,'h_')">
                    </pagination>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
  import util from 'tools/util'
  import Pagination from 'components/common/Pagination.vue'

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
        businessType: [],
        secondClass: [],
        thirdClass: [],
        activeName: 'business',
        h_currentPage: 1,
        h_currentPageSize: 20,
        h_total:0,
        l_currentPage: 1,
        l_currentPageSize: 20,
        l_total:0,
        dateValue:[],
        batchStartTime:'',
        batchEndTime:''
      }
    },
    mounted(){
      util.initHistogram(this,'histogram-echart')
      util.initLine(this,'line-echart')

      this.businessTypeValue = "所有"
      this.secondClassValue = "所有"
      this.thirdClassValue = "所有"
      util.getBusin(this,'businessType','1',true)
    },
    method:{
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
      handleTabs(tab, event){

      },
      handleChangeCurrentPage(val,str){
        let currentPage = str + "currentPage"
        this[currentPage] = val
      },
      handleChangeCurrentPageSize(val,str){
        let currentPageSize = str + "currentPageSize"
        let currentPage = str + "currentPage"
        this[currentPageSize] = val
        this[currentPage] = 1
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

                .histogram-tltle{
                    width: 20%;
                    float: left;
                }

                .histogram-echart{
                    width: 80%;
                    float: left;
                    height: 400px;
                }
            }

            .line{
                width: 100%;
                height: 400px;

                &>div{
                    width: 100%;
                }
            }
        }
    }
</style>
