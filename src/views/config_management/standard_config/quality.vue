<template>
    <div class="standard">
        <div class="standard-box">
            <div class="standard-select">
                <span>业务类型</span>
                <el-select v-model="businessTypeValue" size="small" clearable placeholder="请选择">
                    <el-option
                            v-for="item in businessType"
                            :key="item"
                            :value="item"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="first-class">
                <span>一级分类</span>
                <el-select v-model="firstClassValue" size="small" clearable placeholder="请选择">
                    <el-option
                            v-for="item in firstClass"
                            :key="item"
                            :value="item"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="standard-select">
                <span>二级分类</span>
                <el-select v-model="secondClassValue" size="small" clearable placeholder="请选择">
                    <el-option
                            v-for="item in secondClass"
                            :key="item"
                            :value="item"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="standard-search">
                <el-button type="primary" size="small" class="standard-search-btn"><i class="el-icon-search"></i></el-button>
            </div>
        </div>
        <!-- 表格 -->
        <div class="standard-table">
            <el-table
                    v-loading="loading"
                    :data="standardTableData"
                    style="width: 100%"
                    border
                    size="medium">
                <el-table-column
                        type="selection"
                        width="35">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="序号"
                        type="index"
                        width="50"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="markParam"
                        label="业务类型"
                        width="180"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="markType"
                        label="一级分类"
                        width="180"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="qsId"
                        label="二级分类"
                        width="180"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="versionId"
                        label="版本号"
                        width="100"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态"
                        width="100"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="versionId"
                        label="生效日期"
                        width="180"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center">
                    <template scope="scope">
                        <el-button size="small" @click="handleOptions(scope.row,scope.$index)">详情</el-button>
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
        <!-- 弹窗 -->
        <el-dialog
                title="详情"
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="handleClose">
            <div class="detail">
                <div class="detail-item">
                    <span>业务类型：</span>
                    <span></span>
                </div>
                <div class="detail-item">
                    <span>一级分类：</span>
                    <span></span>
                </div>
                <div class="detail-item">
                    <span>二级分类：</span>
                    <span></span>
                </div>
            </div>
            <div class="detail">
                <div class="detail-item">
                    <span>版本号：</span>
                    <span></span>
                </div>
                <div class="detail-item">
                    <span>生效日期：</span>
                    <span></span>
                </div>
                <div class="detail-item">
                    <span>生效状态：</span>
                    <span></span>
                </div>
            </div>
            <div class="detail">
                <div class="detail-item">
                    <span>创建人：</span>
                    <span></span>
                </div>
                <div class="detail-item">
                    <span>创建时间：</span>
                    <span></span>
                </div>
                <div class="detail-item">
                    <span>审核人：</span>
                    <span></span>
                </div>
            </div>
            <div class="detail">
                <div class="detail-item">
                    <span>审核时间：</span>
                    <span></span>
                </div>
                <div class="detail-item">
                    <span>备注：</span>
                    <span></span>
                </div>
            </div>
            <div class="require">
                <div class="require-left">质检要件：</div>
                <div class="require-right">
                    <div>111</div>
                    <div>111</div>
                </div>
            </div>
            <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
  import Pagination from 'components/common/Pagination'
  import util from 'tools/util'
  export default {
    name:'standardConfig',
    components:{Pagination},
    data(){
      return {
        dialogData:{},
        dialogVisible:false,
        loading:true,
        allTableData:[],
        standardTableData:[],
        businessType:'',
        options:[
          '无纸化',
          '电子协议',
          '高龄文字留痕',
          '适当性文字留痕'
        ],
        total:0,
        currentPage:1,
        currentPageSize:20,
        businessTypeValue:'',
        firstClassValue:'',
        secondClassValue:'',
        businessType:[
          '所有',
          '代销金融产品',
          '创新金融产品',
          '投顾服务产品',
          '业务办理',
        ],
        firstClass:[
          '所有',
          '预约认申购',
          '普通认申购',
          '场内认申购',
          '基金定投',
          '基金转换',
          '网下股票认购',
          '网上现金认购',
          '网下现金认购',
          '现金产品登记'
        ],
        secondClass:[
          '所有',
          '柜台',
          '自助'
        ]
      }
    },
    mounted(){
      this.$http.get("/standardTableData").then(res => {
        let { data } = res;
        setTimeout(() => {
          this.loading = false;
          this.allTableData = data;
          this.total = data.length;
          this.standardTableData = this.allTableData.slice(0,this.currentPageSize);
        }, 300);
      });
    },
    methods:{
      handleChangeCurrentPageSize(val){
        this.currentPageSize = val;
        let currentPage = this.currentPage;
        let currentPageSize = this.currentPageSize;
        let start = (currentPage - 1) * currentPageSize;
        let end = currentPage * currentPageSize;
        this.standardTableData = this.allTableData.slice(start, end);
        util.wrapToTop(this)
      },
      handleChangeCurrentPage(val){
        this.currentPage = val;
        let currentPage = this.currentPage;
        let currentPageSize = this.currentPageSize;
        util.wrapToTop(this)
        let start = (currentPage - 1) * currentPageSize;
        let end = currentPage * currentPageSize;
        this.standardTableData = this.allTableData.slice(start, end);
      },
      handleOptions(row,index){
        this.dialogData = row
        this.dialogVisible = true
      },
      handleClose(){
        this.dialogVisible = false
      }
    }
  }
</script>

<style lang="less" scoped>
    .standard{
        width: 90%;
        margin:0 auto;

        .standard-box{
            border: 1px solid #F0F2F7;
            line-height: 70px;
            overflow: hidden;
            position: relative;
            margin-bottom: 20px;
            background: #fff;

            span{
                margin-right: 10px;
            }

            .standard-select,.first-class,.second-class{
                float: left;
                width: 25%;
            }

            .standard-search{
                float: left;
                width: 25%;

                .standard-search-btn{
                    width: 200px;
                    .el-icon-search{
                        font-size:14px;
                    }
                }
            }
        }

        .standard-table{
            width: 100%;
            margin: 0 auto;
            margin-top: 40px;
        }

        .detail,.require{
            line-height: 30px;
            width: 92%;
            margin-left: 8%;
            overflow: hidden;

            .detail-item{
                width: 33.3%;
                float: left;
                text-align: left;
            }
        }

        .require{
            text-align: left;
            overflow: hidden;

            .require-left{
                width: auto;
                float: left;
                margin-right: 10px;
            }

            .require-right{
                width: auto;
                float: left;
            }
        }
    }
</style>
