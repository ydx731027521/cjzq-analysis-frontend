<template>
    <div class="essential-box">
        <div class="essential-select">
            <span>要件类型</span>
            <el-select v-model="markTypeValue" size="small">
                <el-option
                        v-for="item in selectData"
                        :key="item.id"
                        :label="item.markTypeName"
                        :value="item.id">
                </el-option>
            </el-select>
        </div>
        <div class="essential-title">
            <span>要件名称</span>
            <el-input
                    placeholder="请输要件名称"
                    v-model="qcNameValue"
                    clearable
                    size="small"
                    class="essential-title-input">
            </el-input>
        </div>
        <div class="essential-search">
            <el-button type="primary" size="small" class="essential-search-btn" @click="handleSearch"><i class="el-icon-search"></i></el-button>
        </div>
    </div>
</template>

<script>
  import URL from 'api/url'
  import util from 'tools/util'
  let {CONFIG_LIST} = URL
  export default {
    name:'essantialConfigSearch',
    props:{
      selectData:{
        type: Array
      },
      currentPage:{
        type: Number
      },
      currentPageSize:{
        type: Number
      }
    },
    data(){
      return {
        markTypeValue:'所有',
        qcNameValue:'',
        tableData:[],
        total:0
      }
    },
    methods:{
      _searchData(){
        let id = this.markTypeValue==='所有'?'':this.markTypeValue
        this.$http.get(CONFIG_LIST,{params:{
            markType:id,
            markItemName:this.qcNameValue,
            currentPage:1,
            pageSize:this.currentPageSize
          }}).then(res=>{
            if (res.status === 200 && res.data.status == 0) {
              let { data } = res.data
              this.tableData = data.items
              this.loading = false
              this.total = data.totalNum
              this.$emit('getList',{
                total:this.total,
                tableData:this.tableData,
                markTypeValue: this.markTypeValue,
                qcNameValue: this.qcNameValue
              })
            }
        }).catch(err => {
          console.log(err)
        })
      },
      handleSearch(){
        this._searchData()
      },
      handleChangeCurrentPage(val){
        this.currentPage = val
        this._searchData()
      },
      handleChangeCurrentPageSize(val){
        this.currentPageSize = val
        this._searchData()
      }
    }
  }
</script>

<style lang="less" scoped>
    @import '~style/varible.less';
    .essential-box{
        border: 1px solid #F0F2F7;
        line-height: 70px;
        overflow: hidden;
        position: relative;
        margin-bottom: 20px;
        background: #fff;
        width: 100%;

        span{
            margin-right: 10px;
            font-size: @font-title;
        }

        .essential-select{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 20px;
            margin: 0 auto;
        }

        .essential-title{
            .essential-title-input{
                width: 300px;
            }
        }

        .essential-search{
            position: absolute;
            top: 0;
            bottom: 0;
            right: 20px;
            margin: 0 auto;

            .essential-search-btn{
                width: 200px;
                .el-icon-search{
                    font-size:14px;
                }
            }
        }
    }
</style>

