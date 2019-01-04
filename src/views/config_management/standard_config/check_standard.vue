<template>

    <div class="standard">
        <div class="standard-box">
            <div class="standard-select">
                <span>业务类型:</span>
                <el-select v-model="businessTypeValue" size="small" @change="handleTypeChange">
                    <el-option
                            v-for="item in businessType"
                            :key="item.id"
                            :label="item.businName"
                            :value="item.businName"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="first-class">
                <span>二级分类:</span>
                <el-select v-model="secondClassValue" size="small"  @change="handleSecondClassChange">
                    <el-option
                            v-for="item in secondClass"
                            :key="item.id"
                            :label="item.businName"
                            :value="item.businName">
                    </el-option>
                </el-select>
            </div>
            <div class="second-class">
                <span>三级分类:</span>
                <el-select v-model="thirdClassValue" size="small" @change="handleThirdClassChange">
                    <el-option
                            v-for="item in thirdClass"
                            :key="item.id"
                            :label="item.businName"
                            :value="item.businName">
                    </el-option>
                </el-select>
            </div>
            <div class="standard-status">
                <span>状态:</span>
                <el-select v-model="statusValue" size="small" @change="handleStatusChange">
                    <el-option
                            v-for="item in status"
                            :key="item.type"
                            :value="item.desc"
                            :label="item.desc">
                    </el-option>
                </el-select>
            </div>
            <div class="standard-search">
                <el-button type="primary" size="small" class="standard-search-btn" @click="handleSearch"><i class="el-icon-search"></i></el-button>
            </div>
        </div>
        <!-- 表格 -->
        <div class="standard-table">
            <!-- 按钮 -->
            <div class="opt">
                <el-button plain type="primary" @click="handleInsert" ><i class="el-icon-plus">新增</i></el-button>
                <el-button plain type="primary" @click="handleCopy"><i class="el-icon-document">复制</i></el-button>
                <el-button plain v-if='isPassShow' :class="statusFlag?'':'disable'" @click="handlePass" type="primary"><i class="el-icon-service">审核确认</i></el-button>
            </div>
            <!-- 表格 -->
            <el-table
                    :header-cell-style="{'background':'#E8E8E8','color':'black','font-weight':'800'}"
                    ref="multipleTable"
                    v-loading="loading"
                    :data="standardTableData"
                    style="width: 100%"
                    border
                    stripe
                    @selection-change="handleSelectionChange"
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
                        prop="businKind"
                        label="业务类型"
                        width="200"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="businSubKind"
                        label="二级分类"
                        width="200"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="businName"
                        label="三级分类"
                        width="200"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="qcStandardVersion"
                        label="版本号"
                        width="70"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="状态"
                        width="100"
                        align="center">
                    <template slot-scope="{row}">
                        <span v-if="row.effectFlag==='生效中'" class="effect">{{row.effectFlag}}</span>
                        <span v-if="row.effectFlag==='已失效'" class="not-effect">{{row.effectFlag}}</span>
                        <span v-if="row.effectFlag==='待审核'" class="pending-review">{{row.effectFlag}}</span>
                        <span v-if="row.effectFlag==='待确认'" class="pending-confirm">{{row.effectFlag}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="beginDate"
                        label="生效日期"
                        width="120"
                        align="center">
                </el-table-column>
                <el-table-column
                        v-if="isNoUse"
                        prop="endDate"
                        label="失效日期"
                        width="120"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center">
                    <template scope="{row,$index}">
                        <span @click="handleDetail(row,$index)" class="blue">详情</span>
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

    </div>
</template>

<script>
  import Pagination from 'components/common/Pagination'
  import InsertDialog from './insert'
  import URL from 'api/url.js'
  import util from 'tools/util'
  import {mapState} from 'vuex'
  import CONSTANT from 'api/constant'
  import {checkTransformToNum} from 'tools/transform'
  let {REVIEW} = CONSTANT
  let {STANDARD_CONFIG_LIST,STANDARD_CONFIG_SEARCH,STANDARD_FIRSTCLASS,STANDARD_SECONDCLASS,STANDARD_CONFIG_PASS,STANDARD_CONFIG_COPY,STANDARD_STATUS} = URL
  export default {
    name:'checkStandard',
    components:{Pagination,InsertDialog},
    data(){
      return {
        detailDialogData:{},
        insertDialogData:{},
        detailDialogVisible:false,
        insertDialogVisible:false,
        dialogTableData:[],
        loading:true,
        allTableData:[],
        standardTableData:[],
        detailList:[],
        businessType:'',
        total:0,
        currentPage:1,
        currentPageSize:20,
        businessTypeValue:'',
        secondClassValue:'',
        thirdClassValue:'',
        businessTypeId:'',
        secondClassId:'',
        thirdClassId:'',
        statusValue:'',
        statusFlag: false,
        effectFlag: "2",
        businessType:[],
        secondClass:[],
        thirdClass:[],
        options:[
          '无纸化',
          '电子协议',
          '高龄文字留痕',
          '适当性文字留痕'
        ],
        status:[],
        multipleSelection: [],
        isNoUse:false
      }
    },
    beforeRouteLeave(to, from, next) {
      from.meta.keepAlive = false;
      next();
    },
    mounted(){
      this.businessTypeValue = "所有"
      this.secondClassValue = "所有"
      this.thirdClassValue = "所有"
      util.getBusin(this,'businessType','1',true)
      this._getStatus()
      let {isInsert} = this.$route.params

      if(isInsert){
        this.statusValue = '待审核'
        this.effectFlag = '1'
        this._search()
      }else{
        this.statusValue = "生效中"
        this.effectFlag = '2'
        this._getList()
      }
    },
    methods:{
      _copyMap(arr){
        let list = []
        arr.map((item,index)=>{
          list.push(item.qcStandardId)
        })
        return list
      },
      _passMap(arr){
        let list = []
        arr.map((item,index)=>{
          let obj = {}
          obj.id = item.qcStandardId
          obj.effectFlag = item.effectFlag
          list.push(obj)
        })
        return list
      },
      _copy(arr){
        let list = this._copyMap(arr)
        this.$http.post(STANDARD_CONFIG_COPY,list).then(res=>{
          let {data} = res
          if(res.status === 200 && data.status==0){
            this.effectFlag = '2'
            this.statusFlag = false
            this._getList()
            util.success(data.message)
          }else{
            this.$message.error(data.message)
          }
        })
      },
      _pass(arr){
        let list = this._passMap(arr)
        this.$http.post(STANDARD_CONFIG_PASS,list).then(res=>{
          let {data} = res
          if(res.status === 200 && res.data.status == 0){
            util.success(data.message)
            this.handleSearch()
          }else{
            this.$message.error(data.message)
          }
        })
      },
      _search(){
        this.currentPage = 1
        this._getList()
      },
      _getStatus(){
        this.$http.get(STANDARD_STATUS).then(res=>{
          if(res.status === 200 && res.data.status === 0){
            let {data} = res.data
            this.status = data
          }
        })
      },
      _getList(){
        this.loading = true
        let businessTypeId = this.businessTypeValue == "所有"?"":this.businessTypeId
        let secondClassId = this.secondClassValue == "所有"?"":this.secondClassId
        let thirdClassId = this.thirdClassValue == "所有"?"":this.thirdClassId
        let obj = {
          currentPage:this.currentPage,
          pageSize:this.currentPageSize,
          effectFlag:this.effectFlag
        }
        if(businessTypeId&&!secondClassId&&!thirdClassId){
          obj.businTypeId = businessTypeId
        }else if(businessTypeId&&secondClassId&&!thirdClassId){
          obj.businTypeId = secondClassId
        }else{
          obj.businTypeId = thirdClassId
        }

        this.$http.post(STANDARD_CONFIG_SEARCH, obj).then(res=>{
          if (res.status === 200 && res.data.status == 0) {
            let { data } = res.data
            util.formatVersionArr(data.items)
            this.standardTableData = data.items
            this.loading = false
            this.total = data.totalNum
          }
        })
      },
      handleChangeCurrentPageSize(val){
        this.currentPageSize = val
        this.currentPage = 1
        this._getList()
        util.wrapToTop(this)
      },
      handleChangeCurrentPage(val){
        this.currentPage = val
        this._getList()
        util.wrapToTop(this)
      },
      handleDetail(row,index){
        let {qcStandardId,effectFlag} = row
        this.$router.push({name:'质检标准详情',params:{
            id:qcStandardId,
            effectFlag
          }})
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {})
      },
      handleInsert(){
        this.$router.push('/essantial/insert')
      },
      handleSearch(){//搜索
        if(this.statusValue === '待审核'){
          this.statusFlag = true
          this.isNoUse = false
        }else if(this.statusValue == '已失效'){
          this.statusFlag = false
          this.isNoUse = true
        }else{
          this.statusFlag = false
          this.isNoUse = false
        }
        console.log(this.statusValue)
        console.log(this.isNoUse)
        this._search()
      },
      handleStatusChange(val){
        this.statusValue = val
        this.effectFlag = checkTransformToNum(val)
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
      handleCopy(){
        if(this.multipleSelection.length>0){
          this._copy(this.multipleSelection)
        }else{
          this.$message.error('请选择需要复制的业务')
        }
      },
      handleSelectionChange(val){
        this.multipleSelection = val
      },
      handlePass(){
        if(this.statusValue==='待审核'){
          if(this.multipleSelection.length>0)
            this._pass(this.multipleSelection)
          else
            this.$message.error('请选择待审核的业务')
        }else{
          util.error('请选择待审核业务')
        }
      }
    },
    computed:{
      ...mapState({
        'authorityList':state=>state.user.authorityList
      }),
      isPassShow(){
        if(this.authorityList.indexOf(REVIEW)>0)
          return true
        else
          return false
      }
    }
  }
</script>

<style lang="less" scoped>
    @import '~style/varible.less';
    .standard{
        width: 90%;
        margin:0 auto;

        .standard-box{
            width: 100%;
            line-height: 70px;
            overflow: hidden;
            position: relative;
            background: #fff;
            padding: 10px;

            .standard-select,.first-class,.second-class,.standard-status{
                float: left;
                width: 22%;
                display: flex;

                span{
                    width: 85px;
                    font-size: @font-title;
                }

                .el-select.el-select--small{
                    flex: 1;
                }
            }

            .standard-status{
                text-align: right;
                span{
                    margin-right: 10px;
                }
            }

            .standard-search{
                float: left;
                width: 12%;

                .standard-search-btn{
                    width: 70%;
                    .el-icon-search{
                        font-size:14px;
                    }
                }
            }
        }

        .standard-table{
            width: 100%;
            margin: 0 auto;
            margin-top: 20px;
            background: #fff;
            padding: 10px;

            .effect{
                color:@color-effect;
            }

            .not-effect{
                color:@color-notEffect;
            }

            .pending-confirm{
                color:@color-pendingConfirm;
            }

            .pending-review{
                color:@color-pendingReview;
            }

            .blue{
                color: @color-blue;
                cursor: pointer;
            }

            .opt{
                text-align: left;
                padding-left: 10px;
                margin-bottom: 20px;
                margin-top: 10px;

                .disable{
                    background: #E8E8E8;
                    color: #999;
                    border-color: #E8E8E8;

                    &:hover{
                        border-color: #E8E8E8;
                    }
                }
            }
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

        .el-dialog__wrapper.insertDialog{
            .footer{
                text-align: center;
                margin-top: 30px;

                .btn{
                    width: 200px;
                    margin-right: 50px;
                }
            }
        }
    }
</style>
