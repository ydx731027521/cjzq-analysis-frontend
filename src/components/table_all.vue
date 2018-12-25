<template>
    <div class="all-box">
        <div class="table-box">
              <el-table
                v-loading="loading"
                :header-cell-style="{'background':'#E8E8E8','color':'black','font-weight':'800'}"
                :data="data"
                stripe
                border
                style="width:100%">
                <template v-for="(item,index) of headerList">
                  <el-table-column
                      v-if="item.prop != 'qcResult'"
                      :key="index"  
                      :prop="item.prop"
                      :label="item.label"
                      width='200'
                      align="center"
                      >
                  </el-table-column>

                    <el-table-column
                      v-if="item.prop === 'qcResult'"
                      :key="index"  
                      :label="item.label"
                      align="center"
                      >
                      <template v-if="item.prop === 'qcResult'" slot-scope="{row}">
                        <span class="red" v-if="row.qcResult === '1'">不合格</span>
                        <span class="green" v-if="row.qcResult === '0'">合格</span>
                      </template>
                  </el-table-column>
                </template>
              </el-table>
        </div>
    </div>
</template>

<script>
  export default {
    name:'tableAll',
    props:{
      data:{
        type:Array
      },
      headerList:{
        type:Array
      }
    },
    data(){
      return {
        loading:false
      }
    }
  }
</script>

<style lang="less" scoped>
    @import '~style/varible.less';
    .all-box{
        padding: 10px 20px;

        .table-box{
            display: flex;
            .green{
              color: @color-green;
              font-weight: 700;
            }

            .red{
                color: @color-red;
                font-weight: 700;
            }
        }
    }
</style>
