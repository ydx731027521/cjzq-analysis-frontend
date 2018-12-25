<template>
    <div class="detial-dialog-box">
        <div class="dialog-basic-info">
            <div class="title">
                <span>基本信息:</span>
            </div>
            <div class="dialog-content">
                <div>
                    <div class="dialog-content-item">
                        <span>业务类型：</span>
                        <span class="item-left">{{pageData.businType}}</span>
                    </div>
                    <div class="dialog-content-item">
                        <span>二级分类：</span>
                        <span class="item-left">{{pageData.businSubType}}</span>
                    </div>
                    <div class="dialog-content-item">
                        <span>三级分类：</span>
                        <span class="item-left">{{pageData.businName}}</span>
                    </div>
                </div>
               <div>
                   <div class="dialog-content-item">
                       <span>版本号：</span>
                       <span class="item-left">{{pageData.qsStandardVersion}}</span>
                   </div>
                   <div class="dialog-content-item">
                       <span>生效日期：</span>
                       <div class="input-box">
                           <el-date-picker
                                   v-model="beginDate"
                                   type="date"
                                   size="small"
                                   value-format="yyyy-MM-dd"
                                   placeholder="选择日期时间">
                           </el-date-picker>
                       </div>
                   </div>
                   <div class="dialog-content-item">
                       <span>生效状态：</span>
                       <span class="item-left">{{pageData.effectFlag}}</span>
                   </div>
               </div>
                <div>
                    <div class="dialog-content-item">
                        <span>创建人：</span>
                        <span class="item-left">{{pageData.creator}}</span>
                    </div>
                    <div class="dialog-content-item">
                        <span>创建时间：</span>
                        <span class="item-left">{{pageData.createTime}}</span>
                    </div>
                    <div class="dialog-content-item">
                        <span>审核人：</span>
                        <span class="item-left">{{pageData.examiner}}</span>
                    </div>
                </div>
                <div>
                    <div class="dialog-content-item">
                        <span>审核时间：</span>
                        <span class="item-left">{{pageData.examineTime}}</span>
                    </div>
                    <div class="remark-box">
                        <span>备注：</span>
                        <el-input size="small" v-model="remark" class="remark"></el-input>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-box">
            <el-button @click="handleEditCancel">取 消</el-button>
            <el-button type="primary" @click="handleEditConfirm">确 定</el-button>
        </div>
    </div>
</template>

<script>
  export default {
    name:"detailDialog",
    props:{
      pageData:{
        type:Object
      }
    },
    data(){
      return {
        beginDate:this.pageData.beginDate,
        remark:this.pageData.remark,
      }
    },
    methods:{
      handleEditConfirm(){
        this.$emit('editDone',{
          beginDate:this.beginDate,
          remark:this.remark})
      },
      handleEditCancel(){
        this.$emit('editCancel')
      }
    }
  }
</script>

<style lang="less" scoped>
    .detial-dialog-box{
        width: 96%;
        margin:0 auto;
        background: #fff;

        .dialog-content{
            overflow: hidden;

            div{
                overflow: hidden;
            }

            .remark-box{
                width: 66.6%;
                float: left;
                line-height: 50px;
                display: flex;
                overflow: hidden;

                span{
                    width: 15%;
                    text-align: right;
                }

                .remark{
                    width: 400px;
                    margin-left: 32px;
                }

            }

            .dialog-content-item{
                text-align: center;
                line-height: 50px;
                width: 33.3%;
                float: left;
                display: flex;

                span{
                    width: 30%;
                    text-align: right;
                }

                .item-right,.item-left,.input-box{
                    flex:1;

                    .el-input.el-input--small{
                        width: 200px !important;
                    }
                }

                .item-left{
                    text-align: left;
                    text-indent: 30px;
                }
            }
        }

        .btn-box{
            text-align: right;
            margin-top: 20px;
        }
    }
</style>
