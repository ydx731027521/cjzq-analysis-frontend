<template>
  <div class="busin-box">
      <div class="busin-select">
          <span>业务类型:</span>
          <el-select v-model="businessTypeValue" size="small" @change="handleTypeChange">
              <el-option
                      v-for="item in businTypeData"
                      :key="item.id"
                      :label="item.businName"
                      :value="item.businName"
              >
              </el-option>
          </el-select>
      </div>
      <div class="first-class">
          <span>二级分类:</span>
          <el-select v-model="firstClassValue" size="small" @change="handleFirstClassChange">
              <el-option
                      v-for="item in secondClass"
                      :key="item.id"
                      :label="item.businName"
                      :value="item.businName"
              >
              </el-option>
          </el-select>
      </div>
      <div class="second-class">
          <span>三级分类:</span>
          <el-select v-model="secondClassValue" size="small">
              <el-option
                      v-for="item in thirdClass"
                      :key="item.id"
                      :label="item.businName"
                      :value="item.businName">
              </el-option>
          </el-select>
      </div>
      <div class="busin-search">
          <el-button type="primary" size="small" class="busin-search-btn" @click="handleSearch"><i class="el-icon-search"></i></el-button>
      </div>
  </div>
</template>

<script>
import URL from 'api/url.js'
import util from 'tools/util'
export default {
  name: 'businTypeSearch',
  props:{
    businTypeData:{
      type:Array
    },
    currentPage:{
      type: Number
    },
    currentPageSize:{
      type: Number
    },
    url:{
      type:String
    }
  },
  data(){
    return {
      businessTypeValue:'所有',
      secondClassValue:'所有',
      thirdClassValue:'所有',
      tableData:[],
      businessTypeValue:'',
      firstClassValue:'',
      secondClassValue:'',
      firstClass:[],
      secondClass:[]
    }
  },
  methods:{
    _emitcChangeData(){
      let i_businessTypeId = this.i_businessTypeValue == "所有"?"":this.i_businessTypeId
      let i_secondClassId = this.i_secondClassValue == "所有"?"":this.i_secondClassId
      let i_thirdClassId = this.i_thirdClassValue == "所有"?"":this.i_thirdClassId
      let id
      this.$emit('changeData',{
        id
      })
    },
    _search(){
      let i_businessTypeId = this.i_businessTypeValue == "所有"?"":this.i_businessTypeId
      let i_secondClassId = this.i_secondClassValue == "所有"?"":this.i_secondClassId
      let i_thirdClassId = this.i_thirdClassValue == "所有"?"":this.i_thirdClassId
      let id
      let pageSize = 1
      this.$http.post(SPOT_CHECK_CONVENTION_LIST,{
        businTypeId: id,
        currentPage: this.currentPage,
        pageSize
      }).then(res=>{
        if (res.status === 200 && res.data.status == 0) {
          let { data } = res.data
          this.tableData = data.items
          this.loading = false
          this.total = data.totalNum
          this.$emit('getList',{
            total:this.total,
            tableData:this.tableData,
          })
        }
      })
    },
    handleTypeChange(val){
      this.businessTypeValue = val
      util.businTypeChange(this, this.businessTypeValue, val,false)
      this._emitcChangeData()
    },
    handleFirstClassChange(val){
      this.secondClassValue = val
      util.secondClassChange(this, this.secondClassValue, val,false)
      this._emitcChangeData()
    },
    handleSecondClassChange(val){
      this.thirdClassValue = val 
      util.thirdClassChange(this, this.thirdClassValue, val)
      this._emitcChangeData()
    },
    handleSearch(){
      this._emitcChangeData()
      this.$emit('getList')
    }
  },
  // computed:{
  //   businessType(){
  //     let arr = [{businType: "所有"}]
  //     let list = arr.concat(this.businTypeData)
  //     return list
  //   }
  // }
}
</script>

<style lang="less" scoped>
.busin-box{
      width: 100%;
      line-height: 70px;
      overflow: hidden;
      position: relative;
      background: #fff;

      .busin-select,.first-class,.second-class,.busin-status{
          float: left;
          width: 25%;
          display: flex;

          span{
              width: 85px;
          }

          .el-select.el-select--small{
                    width: 162px;
                }
      }

      .busin-search{
          float: left;
          width: 25%;

          .busin-search-btn{
              width: 70%;
              .el-icon-search{
                  font-size:14px;
              }
          }
      }
  }
</style>

