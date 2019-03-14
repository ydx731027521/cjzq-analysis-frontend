<template>
    <div class="essential">
        <!-- <EssantialSearch :selectData='options' :currentPage="currentPage" :pageSize="pageSize" @getList="handleChangeData" ref='essantianSearch'></EssantialSearch> -->
        <div class="essential-box">
            <div class="essential-select">
                <span>要件类型:</span>
                <el-select v-model="markTypeValue" size="small" @change="handleTypeChange">
                    <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.markTypeName"
                            :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="essential-title">
                <span>要件名称:</span>
                <el-input
                        placeholder="请输要件名称"
                        v-model="qcNameValue"
                        clearable
                        size="small"
                        class="essential-title-input">
                </el-input>
            </div>
            <div class="essential-param">
                <span>要件参数:</span>
                <el-input
                        placeholder="请输要件参数"
                        v-model="paramValue"
                        clearable
                        size="small"
                        class="essential-title-input">
                </el-input>
            </div>
            <div class="essential-search">
                <el-button type="primary" size="small" class="essential-search-btn" @click="handleSearch"><i class="el-icon-search"></i></el-button>
            </div>
        </div>
        <div class="essential-table">
            <el-table
                    :header-cell-style="{'background':'#E8E8E8','color':'black','font-weight':'800'}"
                    v-loading="loading"
                    :data="essentialTableData"
                    style="width: 100%"
                    border
                    stripe
                    size="medium">
                <el-table-column
                        prop="qsId"
                        label="序号"
                        type="index"
                        width="80"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="markTypeName"
                        label="要件类型"
                        width="300"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="markItemName"
                        label="要件名称"
                        width="500"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="markParam"
                        label="要件参数"
                        align="center">
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页组件 -->
        <Pagination
                :total="total"
                :currentPage="currentPage"
                :pageSize="pageSize"
                @changeCurrentPageSize="handleChangeCurrentPageSize"
                @changeCurrentPage="handleChangeCurrentPage">
        </Pagination>
    </div>
</template>

<script>
  import Pagination from 'components/common/Pagination'
  import URL from 'api/url.js'
  import util from 'tools/util'
  import EssantialSearch from 'components/essantial_config_search.vue'
  let{CONFIG_LIST,CONFIG_SELECT,STANDARD_BUSIN} = URL
  export default {
    name:'essentialConfig',
    components:{Pagination,EssantialSearch},
    data(){
      return {
        loading:false,
        essentialTableData:[],
        markTypeValue:'',
        qcNameValue:'',
        options:[],
        total:0,
        currentPage:1,
        pageSize:20,
        paramValue:''
      }
    },
    mounted(){
      this.markTypeValue = '所有'
      this._initOptions()
      this._getSelectData()
      this._getList()
    },
    methods:{
      _initOptions(){
        this.options = [{markTypeName:'所有'}]
      },
      _getList(){
        this.loading = true
        let id = this.markTypeValue==='所有'?'':this.markTypeValue
        let param = this.paramValue.trim()
        let qcName = this.qcNameValue.trim()
        this.$http.get(CONFIG_LIST,{params:{
            markParam:param,
            markType:id,
            markItemName:this.qcNameValue,
            currentPage:this.currentPage,
            pageSize:this.pageSize
          }}).then(res=>{
          if (res.status === 200 && res.data.status == 0) {
            let { data } = res.data
            this.essentialTableData = data.items
            this.loading = false
            this.total = data.totalNum
          }
        }).catch(err => {
          console.log(err)
        })
      },
      _getSelectData(){
        this.$http.get(CONFIG_SELECT).then(res=>{
          this._initOptions()
          let {data} = res.data
          this.options = this.options.concat(data)
        })
      },
      handleChangeCurrentPageSize(val){
        this.pageSize = val;
        this.currentPage = 1
        this._getList()

        util.wrapToTop(this)
      },
      handleChangeCurrentPage(val){
        this.currentPage = val;
        this._getList()
        util.wrapToTop(this)
      },
      handleSearch(){
        this.currentPage = 1
        this._getList()
      },
      handleTypeChange(val){
        this.markTypeValue = val
      }
    },
    wactch:{
      pageSize(val,oldVal){
        this._searchData()
      }
    }
  }
</script>

<style lang="less" scoped>
    .essential{
        width: 90%;
        margin:0 auto;

        .essential-box{
            border: 1px solid #F0F2F7;
            line-height: 70px;
            overflow: hidden;
            margin-bottom: 20px;
            background: #fff;

            span{
                margin-right: 10px;
                font-size: 14px;
            }

            .essential-select{
                float: left;
                width:28%;
                display: flex;
                padding: 0 10px;
                box-sizing: border-box;

                .el-select.el-select--small{
                    flex:1;
                }
            }

            .essential-title,.essential-param{
                float: left;
                width:28%;
                display: flex;
                padding: 0 10px;
                box-sizing: border-box;
                .essential-title-input{
                    flex:1;
                }
            }

            .essential-search{
                float: left;
                width:13%;

                .essential-search-btn{
                    width: 80%;
                    .el-icon-search{
                        font-size:14px;
                    }
                }
            }
        }

        .essential-table{
            width: 100%;
            margin: 0 auto;
            margin-top: 40px;
        }
    }
</style>
