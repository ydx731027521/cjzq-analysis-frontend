<template>
    <div class="detail-box">
        <div class="detail-header">
            质检标准详情
        </div>
        <div class="ditail-basic-info">
            <div class="title">
                <span>基本信息:</span>
            </div>
            <div class="content">
                <div class="content-item">
                    <span>业务类型：</span>
                    <span>{{pageData.businKind}}</span>
                </div>
                <div class="content-item">
                    <span>二级分类：</span>
                    <span>{{pageData.businSubKind}}</span>
                </div>
                <div class="content-item">
                    <span>三级分类：</span>
                    <span>{{pageData.businName}}</span>
                </div>
            </div>
            <div class="content">
                <div class="content-item">
                    <span>版本号：</span>
                    <span>{{pageData.qcStandardVersion}}</span>
                </div> 
                <div class="content-item">
                    <span>生效状态：</span>
                    <span :class="effectFlagStyle">{{pageData.effectFlag}}</span>
                </div>
                <div class="content-item">
                    <span>审核时间：</span>
                    <span>{{pageData.examineTime}}</span>
                </div>
            </div>
            <div class="content">
                <div class="content-item">
                    <span>创建人：</span>
                    <span>{{pageData.creator}}</span>
                </div>
                <div class="content-item">
                    <span>创建时间：</span>
                    <span>{{pageData.createTime}}</span>
                </div>
                <div class="content-item">
                    <span>审核人：</span>
                    <span>{{pageData.examiner}}</span>
                </div>
            </div>
            <div class="content">
                <div class="content-item">
                    <div>
                        <span class="red" v-if="effectFlag === '待确认'">*</span>
                        <span>生效日期：</span>
                        <div class="date" v-if="effectFlag === '待确认'">
                            <el-date-picker
                                    v-model="date"
                                    type="date"
                                    size="small"
                                    :picker-options="pickerBeginDate"
                                    value-format="yyyyMMdd">
                            </el-date-picker>
                        </div>
                        <span v-else>{{pageData.beginDate}}</span>
                    </div>
                </div>
            </div>
            <div class="remark">
              <div class="remark-left">
                <p>
                  <span class="red" v-if="effectFlag === '待确认'">　　*</span>
                  <span>备注：</span>
                </p>
              </div>
              <div class="remark-right">
                <div class="text-area"  v-if="effectFlag === '待确认'">
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 3, maxRows: 6}"
                            v-model="textarea">
                    </el-input>
                </div>
                <p v-else>{{pageData.remark}}</p>
              </div>
                
            </div>
        </div>
        <div class="detail-essantial">
            <div class="title">质检要件:</div>
            <div class="detail-options" v-if="isEdit">
                <el-button icon="el-icon-plus" type="primary" v-if="effectFlag === '待确认'" plain @click="handleCreate">新增要件</el-button>
            </div>
        </div>
        <!-- 表格 -->
        <div class="detail-table">
            <el-table
                    :header-cell-style="{'background':'#E8E8E8','color':'black','font-weight':'800'}"
                    v-loading="loading"
                    :data="detailTableData"
                    style="width: 100%"
                    border
                    stripe
                    size="medium">
                <el-table-column
                        label="序号"
                        type="index"
                        min-width="5%"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="markTypeName"
                        label="要件类型"
                        min-width="10%"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="markItemName"
                        label="要件名称"
                        min-width="20%"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="markParam"
                        label="要件参数"
                        min-width="10%"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="筛选条件"
                        min-width="18%"
                        align="center">
                    <template slot-scope="{row,$index}">
                        <el-input size="small" v-if="showEdit[$index]==true" v-model="row.orderFilter"></el-input>
                        <span v-if="!showEdit[$index]">{{row.orderFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="筛选维度"
                        min-width="12%"
                        align="center">
                    <template slot-scope="{row,$index}">
                        <el-select v-model="row.markDim" placeholder="请选择筛选维度" size="small" v-if="showEdit[$index]">
                            <el-option
                                    v-for="item in dimList"
                                    :key="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                        <span v-if="row.markDim==='订单维度'&&!showEdit[$index]">订单维度</span>
                        <span v-if="row.markDim==='客户维度'&&!showEdit[$index]">客户维度</span>
                        <span v-if="row.markDim==='流水维度'&&!showEdit[$index]">流水维度</span>
                    </template>
                </el-table-column>
                <el-table-column
                        min-width="15%"
                        label="操作"
                        align="center">
                    <template scope="{row,$index}" v-if="effectFlag==='待确认'">
                        <el-button type="primary" size="small" @click="handleEdit(row,$index)" v-if="!showEdit[$index]"><i class="el-icon-edit"></i></el-button>
                        <el-button type="primary" size="small" @click="handleEditDone(row,$index)" v-if="showEdit[$index]"><i class="el-icon-check"></i></el-button>
                        <el-button type="danger" size="small" @click="handleEditCancle(row,$index)" v-if="showEdit[$index]"><i class="el-icon-close"></i></el-button>
                        <el-button type="danger" size="small" @click="handleEditDelete(row,$index)" v-if="!showEdit[$index]"><i class="el-icon-delete"></i></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 要件列表单项删除弹窗 -->
        <el-dialog
                title="提醒"
                :visible.sync="deleteDialogVisible"
                append-to-body
                width="30%">
            <span>是否删除？</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="handleDeleteCancel">取 消</el-button>
              <el-button type="primary" @click="handleDeleteConfirm">确 定</el-button>
            </span>
        </el-dialog>
        <div class="btn-box">
            <el-button type="primary" plain @click="handleReturn">返回</el-button>
            <el-button type="primary" v-if="effectFlag === '待审核'&&isPassShow" @click="confirmDialogVisible = true">审核通过</el-button>
            <el-button type="primary" v-if="effectFlag === '待确认'&&isPassShow" @click="submitDialogVisible = true">提交</el-button>
            <el-button type="danger" @click="essantialDeleteDialogVisible = true" v-if="effectFlag === '待确认'||effectFlag === '待审核'">删除</el-button>
        </div>
        <!-- 确认删除弹窗 -->
        <el-dialog
                title="提示"
                :visible.sync="essantialDeleteDialogVisible"
                append-to-body
                width="30%">
                <span>是否确认删除要件？</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="essantialDeleteDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleEssantialDelete">确 定</el-button>
                  </span>
        </el-dialog>
        <!-- 确定提交弹窗 -->
        <el-dialog
                title="提示"
                :visible.sync="submitDialogVisible"
                append-to-body
                width="30%">
                <span>是否确认提交？</span>
                  <span slot="footer" class="dialog-footer">
                  <el-button @click="submitDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleSubmit">确 定</el-button>
                </span>
        </el-dialog>
        <!-- 详情要件新增弹窗 -->
        <el-dialog
                title="新增要件"
                :visible.sync="insertDialogVisible"
                append-to-body
                align="center"
                width="80%">
            <!-- <EssantialSearch :selectData='options' :currentPage="i_currentPage" :currentPageSize="i_currentPageSize" @getList="handleChangeData"></EssantialSearch> -->
            <div style="border: 1px solid #F0F2F7;line-height: 70px;overflow: hidden;margin-bottom: 20px;background: #fff; width: 100%;">
              <div style="float: left;width:25%;">
                  <span style=" margin-right: 10px;font-size: @font-title;">要件类型</span>
                  <el-select style="width: 150px;" v-model="i_markTypeValue" size="small" @change="handleMarkTypeChange">
                      <el-option
                              v-for="item in i_options"
                              :key="item.id"
                              :label="item.markTypeName"
                              :value="item.id">
                      </el-option>
                  </el-select>
              </div>
              <div style="float: left;width:25%;">
                  <span style=" margin-right: 10px;font-size: @font-title;">要件名称</span>
                  <el-input
                          style=" width: 150px;"
                          placeholder="请输要件名称"
                          v-model="i_qcNameValue"
                          clearable
                          size="small"
                          class="essential-title-input">
                  </el-input>
              </div>
              <div style="float: left;width:25%;">
                <span style=" margin-right: 10px;font-size: @font-title;">要件参数:</span>
                <el-input
                        style=" width: 150px;"
                        placeholder="请输要件参数"
                        v-model="i_paramValue"
                        clearable
                        size="small"
                        class="essential-title-input">
                </el-input>
              </div>
              <div style="float: left;width:25%;">
                  <el-button type="primary" size="small" style="width: 200px;" @click="handleSearch"><i style="font-size:14px;" class="el-icon-search"></i></el-button>
              </div>
            </div>
            <div class="detail-insert-box">
                <div class="add-list" style="overflow:hidden;padding:20px 0;display:flex;" v-if="detailTableData.length>0">
                    <div class="add-list-title" style="width:100px;line-height:24px;">已添加的要件：</div>
                    <div class="add-list-tips" style="flex:1">
                        <el-tag type="success" size="small" style="float:left;margin-right:5px;margin-bottom:5px;" v-for="item of detailTableData" :key="item.standardMarkId">{{item.markItemName}}</el-tag>
                    </div>
                </div>
                <div class="table-box">
                    <el-table
                            v-loading="i_loading"
                            :header-cell-style="{'background':'#E8E8E8','color':'black','font-weight':'800'}"
                            ref="multipleTable"
                            :data="insertData"
                            style="width: 100%"
                            border
                            stripe
                            @selection-change="handleSelectionChange"
                            size="small">
                        <el-table-column
                                label="序号"
                                type="index"
                                min-width="5%"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="markTypeName"
                                label="要件类型"
                                min-width="30%"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="markItemName"
                                label="要件名称"
                                min-width="30%"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="markParam"
                                label="要件参数"
                                min-width="15%"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                min-width="20%"
                                label="操作"
                                align="center">
                            <template scope="{row,$index}">
                                <el-button type="primary" size="small" @click="handleToggle(row,$index)" v-if="!row.isAdd"><i class="el-icon-plus" ></i></el-button>
                                <el-button type="success" size="small" v-if="row.isAdd" @click="handleToggle(row,$index)"><i class="el-icon-check"></i></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 分页组件 -->
                <Pagination
                        :total="i_total"
                        :currentPage="i_currentPage"
                        :currentPageSize="i_currentPageSize"
                        @changeCurrentPageSize="i_handleChangeCurrentPageSize"
                        @changeCurrentPage="i_handleChangeCurrentPage">
                </Pagination>
                <span slot="footer">
                    <el-button @click="insertDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="insertDialogVisible = false">确 定</el-button>
                </span>
            </div>
        </el-dialog>
        <!-- 完成弹窗 -->
        <el-dialog
                title="提醒"
                :visible.sync="confirmDialogVisible"
                append-to-body
                width="30%">
            <span>是否确认审核通过？</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="confirmDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleConfirm">确 定</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
  import URL from 'api/url'
  import Pagination from 'components/common/Pagination'

  import EssantialSearch from 'components/essantial_config_search.vue'
  import {checkTransform,checkDimTrans,checkDim} from 'tools/transform'
  import {mapState} from 'vuex'
  import CONSTANT from 'api/constant'
  import util from 'tools/util'
  let {REVIEW} = CONSTANT
  let  {STANDARD_CONFIG_LIST_DETAIL,STANDARD_CONFIG_DETAIL_DELETE,STANDARD_INSERT,CONFIG_LIST,CONFIG_SELECT,STANDARD_CONFIG_PASS,STANDARD_CONFIG_SUBMIT} = URL
  export default {
    name:'standardDetail',
    components:{Pagination,EssantialSearch},
    data(){
      return {
        loading:true,
        i_loading:true,
        type:'',
        firstClass:'',
        secondClass:'',
        version:'',
        activeDate:'',
        activeStatus:'',
        creater:'',
        createTime:'',
        reviewer:'',
        detailTableData:[],//要件列表总的数据
        detailList:[],//要件列表当前页展示的数据
        currentPage:1,
        currentPageSize:20,
        // total:this.totalNum,
        pageData:{},
        effectFlag:"",
        showEdit: [],
        inputValue:'',
        isDeleting:{},
        insertData:[],
        i_total:0,
        i_currentPage:1,  
        i_currentPageSize:20,
        i_options:[],
        i_qcNameValue:'',
        i_markTypeValue:'',
        i_paramValue:'',
        multipleTable:[],
        deleteDialogVisible:false,
        insertDialogVisible:false,
        confirmDialogVisible:false,
        submitDialogVisible:false,
        essantialDeleteDialogVisible:false,
        markType:'',
        qcName:'',
        options:[],
        date:'',
        textarea:'',
        dimList:[],
        id:'',
        tableData:[],
        pickerBeginDate:{
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        }
      }
    },
    beforeRouteLeave(to, from, next) {
      if (to.path == "/essantial/standard") {
        to.meta.keepAlive = true;
      } else {
        to.meta.keepAlive = false;
      }
      next();
    },
    mounted(){
      if(!this.$route.params){
        this.$router.push('/essantial/standard')
      }
      let {id,effectFlag} = this.$route.params
      // if(!id||!effectFlag){
      //   this.$router.push('/essantial/standard')
      // }
      this.effectFlag = effectFlag
      this.id = id
      // 获取维度
      util.getDim(this,'dimList')

      this._getTableData(STANDARD_CONFIG_LIST_DETAIL,"get",{
        qcStandardId:id
      },"detailTableData")
      
    },
    methods:{
      _initShowEdit(){
        let length = this.detailTableData.length
        for(let i=0;i<length;i++){
          this.$set(this.showEdit,i,false)
        }
      },
       _initOptions(){
        this.i_options = [{markTypeName:'所有'}]
      },
      _getInsertSelectData(){
        this._initOptions()
        this.$http.get(CONFIG_SELECT).then(res=>{
          let {data} = res.data
          this.i_options = this.i_options.concat(data)
        })
      },
      //获取新建要件列表
      _getInsertList(){
        this.i_loading = true
        let id = this.i_markTypeValue==='所有'?'':this.i_markTypeValue
        let param = this.i_paramValue.trim()
        let qcName = this.i_qcNameValue.trim()
        this.$http.get(CONFIG_LIST,{params:{
            currentPage:this.i_currentPage,
            pageSize:this.i_currentPageSize,
            markType:id,
            markItemName:this.i_qcNameValue,
            markParam:param
          }}).then(res=>{
            if (res.status === 200 && res.data.status == 0) {
              let {data} = res.data
              util.checkHas(this,data.items,'detailTableData')
              this.insertData = data.items
              this.i_total = data.totalNum
              this.i_loading = false
            }else{
              util.err()
            }
        })
      },
      //删除要件
      _delete(){
        this.$http.get(STANDARD_CONFIG_DETAIL_DELETE,{params:{
            qcStandardId:this.id
        }}).then(res=>{
          if (res.status === 200 && res.data.status ==0) {
            let {data} = res
            util.success(data.message)
            this.$router.push('/essantial/standard')
          }else{
            util.error(data.message)
          }
        }).catch(err=>{
          util.err()
          console.log(err)
        })
      },
      _getTableData(url,method,params,tableName){
        if(method == "get"){
          this.$http.get(url,{params:params}).then(res=>{
            if (res.status === 200 && res.data.status == 0) {
              let { data } = res.data
              let {markItemList} = data
              let version = util.formatVersionStr(data.qcStandardVersion)
              this.pageData = data
              this.pageData.qcStandardVersion = version
              this.date = data.beginDate
              this.textarea = data.remark
              this.loading = false

              checkTransform(data.effectFlag,this.pageData)

              let arr = markItemList.map(item=>{
                checkDim(item.markDim,item)
                return item
              })
              this[tableName] = arr
              this._setTableData()
              this._initShowEdit()
            }
          }).catch(err=>{
            util.err()
            console.log(err)
          })
        }else{
          this.$http.post(url,{params}).then(res=>{
            if (res.status === 200 && res.data.status == 0) {
              let { data } = res.data
              this.pageData = data
              this[tableName] = data.markItemList.items
              this.loading = false
              this.total = data.markItemList.totalNum
            }
          }).catch(err=>{
            util.err()
            console.log(err)
          })
        }
      },
      _toggle(row){
        let flag = false
        let index
        this.detailTableData.map((item,i)=>{
          if(item.id == row.id){
            flag = true
            index = i
          }
        })
        if(flag){
          this.detailTableData.splice(index,1)
          this.$set(row,'isAdd',false)
          util.warn('取消添加')
        }else{
          this.detailTableData.push(row)
          this.$set(row,'isAdd',true)
          util.success('添加成功')
        }
        this._deduplicate()
        this._setTableData()
      },
      _deduplicate(){
        let list = Array.from(new Set(this.detailTableData))
        this.detailTableData = list
      },
      _confirm(){
        let list = []
        list.push({
          id:this.id,
          effectFlag:this.effectFlag
        })
        this.$http.post(STANDARD_CONFIG_PASS,list).then(res=>{
          if(res.status === 200 && res.data.status === 0){
              util.success(res.data.message)
              this.$router.push('/essantial/standard')
          }
        }).catch(err=>{
          util.err()
        })
      },
      _setTableData(){
        let start = (this.currentPage - 1) * this.currentPageSize;
        let end = this.currentPage * this.currentPageSize;
        this.tableData = this.detailTableData.slice(start, end);
      },
      _check(){
        let markDim_flag = true
        if(this.date&&this.textarea&&(this.detailTableData.length>0)){
          let flag = true
          this.showEdit.map(item=>{
            if(item!=''||item!=false){
              flag = false
              return
            }
          })

          if(flag||this.showEdit.length<1){
            this.detailTableData.map(item=>{
              if(!item.markDim){
                markDim_flag = false
              }
            })

            if(markDim_flag){
              return true
            }else{
              this.$message.error("请选择筛选维度")
              return false
            }
          }else{
            this.$message.error("请先保存编辑")
            return false
          }
          
        }else{
          util.error('请填写完整信息')
          return false
        }
      },
      _submit(){
        if(this._check()){
          let list = {}
          list.qcStandardId = this.id,
          list.beginDate = this.date
          list.businName = this.pageData.businName
          list.businSubType = this.pageData.businSubType
          list.businType = this.pageData.businType
          list.remark = this.textarea

          let arr = this.detailTableData.map(item=>{
            checkDimTrans(item.markDim,item)
            return item
          })
          list.standardMarkList = arr

          this.$http.post(STANDARD_CONFIG_SUBMIT,list).then(res=>{
            if(res.status === 200 && res.data.status === 0){
              let {data} = res
              util.success(data.message)
              this.$router.push('/essantial/standard')
            }else{
              util.error(data.message)
            }
          })
        }
      },
      handleEdit(row,index){
        this.inputValue = row.orderFilter
        this.$set(this.showEdit,index,true)
      },
      handleEditDelete(row,index){
        this.isDeleting = row
        this.deleteDialogVisible = true
      },
      handleEditDone(row,index){
        let list = []
        for(let i=0;i<this.showEdit.length;i++){
          if(i === index){
            list.push('')
          }else{
            list.push(this.showEdit[i])
          }
        }
        this.showEdit = list
          console.log(this.showEdit)
      },
      handleEditCancle(row,index){
        row.condition = this.inputValue
        this.inputValue = ''
        this.showEdit = []
      },
      handleDeleteCancel(){
        this.deleteDialogVisible = false
      },
      handleDeleteConfirm(row){
        let {id} = this.isDeleting
        let index
        this.detailTableData.map((item,i)=>{
          if(item.id === id){
            index = i
          }
        })
        this.detailTableData.splice(index,1)
        this.total --
        this.deleteDialogVisible = false
      },
      handleEditAll(){
        this.editDialogVisible = true
      },
      handleEditCancel(){
        this.editDialogVisible = false
      },
      handleEditConfirm(data){
        let {beginDate,remark} = data
        this.pageData.beginDate = beginDate
        this.pageData.remark = remark
        this.editDialogVisible = false
      },
      handleSave(){
        this.pageData.markItemList.items = this.detailTableData
        this._save(this.pageData)
      },
      handleCreate(){
        this._getInsertSelectData()
        this._getInsertList()
        this.insertDialogVisible = true
      },
      i_handleChangeCurrentPageSize(val){
        this.i_currentPageSize = val
        this.i_currentPage = 1
        this._getInsertList()
      },
      i_handleChangeCurrentPage(val){
        this.i_currentPage = val
        this._getInsertList()
      },
      handleSelectionChange(val){
        this.multipleTable = val;
      },
      handleToggle(row,index){
        this._toggle(row)
      },
      handleChangeData(data){
        let {total,tableData,markTypeValue,qcNameValue} = data
         util.checkHas(this,tableData,'detailTableData')
        this.insertData = tableData
        this.i_total = total
        this.markType = markTypeValue
        this.qcName = qcNameValue
      },
      handleSubmit(){
        this._submit()
        this.submitDialogVisible = false
      },
      handleConfirm(){
        this.confirmDialogVisible = false
        this._confirm()
      },
      handleEssantialDelete(){
        this.essantialDeleteDialogVisible = false
        this._delete()
      },
      handleReturn(){
        this.$router.go(-1)
      },
      handleMarkTypeChange(val){
        this.i_markTypeValue =val
      },
      handleSearch(){
        this.i_currentPage =1
        this._getInsertList()
      }
    },
    computed:{
      ...mapState({
        'authorityList':state=>state.user.authorityList
      }),
      isEdit(){
        if(this.effectFlag == "待审核"|| this.effectFlag == "待确认"){
          return true
        }else{
          return false
        }
      },
      beginDate(){
        return this.pageData.beginDate
      },
      effectFlagStyle(){
        let str
        switch(this.pageData.effectFlag){
          case '待审核':
            str = 'pending-review'
            break
          case '待确认':
            str = 'pending-confirm'
            break
          case '已失效':
            str = 'not-ffect'
            break
          case '生效中':
            str = 'effect'
            break
        }
        return str
      },
      // 该版本不区分提交和审核通过的角色，现使用同一标准
      // isSubmitShow(){
      //   if(this.authorityList.indexOf()){}
      // }
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
    .detail-box /deep/ .el-input.el-input--small.el-input--suffix{
        height: 32px !important;
    }
    .detail-box /deep/ .el-date-editor.el-input.el-input--small.el-input--prefix.el-input--suffix.el-date-editor--date{
        height: 32px;
        line-height: 32px;
    }
    .detail-box{
        width: 96%;
        margin:0 auto;
        background: #fff;
        padding-bottom: 20px;
        margin-bottom: 10px;
        margin-top: -30px;

        .red{
            color: @color-red;
        }

        .detail-header{
            font-size: 20px;
            line-height: 40px;
            text-align: left;
            background: #F2F8F9;
        }

        .title{
            font-size: 18px;
            line-height: 30px;
            text-align: left;
            overflow: hidden;

            .edit{
                float: right;
            }
        }

        .ditail-basic-info{
            margin-bottom: 20px;
            padding:30px 20px;

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

            .remark{
                width: 92%;
                margin-left: 8%;
                text-align: left;
                overflow: hidden;
                line-height: 40px;

                .remark-left{
                  width: 5%;
                  float: left;
                }

                .remark-right{
                  float: left;
                  width: 90%;
                  p{
                    line-height: 40px;
                     word-wrap:break-word;
                  }
                  .text-area{
                      width: 500px;
                      margin-top: 10px;
                  }
                }
            

            }

            .content{
                line-height: 40px;
                width: 92%;
                margin-left: 8%;
                overflow: hidden;

                .content-item{
                    width: 33.3%;
                    float: left;
                    text-align: left;
                    overflow: hidden;

                    span{
                        float: left;
                    }

                    .date{
                        width: 200px;
                        float: left;

                        .el-date-editor.el-range-editor{
                            width: 100%;
                        }
                    }
                }
            }
        }

        .detail-essantial{
            .title{
                text-indent: 20px;
                margin-bottom: 20px;
            }

            .detail-options{
                text-indent: 20px;
                text-align: left;
                margin-bottom: 10px !important;
            }
        }

        .detail-table{
            background: #fff;
            padding: 0 20px;

            .el-table__row{
                height: 40px !important;
                td{
                    padding: 0 !important;
                }
            }

            .el-input.el-input--small{
                height: 32px;
            }

            .el-input.el-input--small.el-input--suffix{
                height: 32px !important;
            }

            .el-input.el-input--small{
                height: 32px;
            }
        }

        .btn-box{
            margin-top: 30px;

            button{
                margin-right: 60px;
                width: 200px !important;
            }
        }
    }
</style>
