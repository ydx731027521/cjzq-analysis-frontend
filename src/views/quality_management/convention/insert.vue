<template>
  <div class="insert">
    <div class="insert-item">
      <div class="title">
        <span class="red">＊</span>
        <span>批次名称：</span> 
      </div>
      <div class="input">
        <el-input v-model="input" size="small"></el-input>
      </div>
    </div>
    <div class="insert-item">
      <div class="title">
        <span class="red">＊</span>
        <span>请选择业务：</span> 
      </div>
      <div class="select-box">
        <div class="select-item">
          <el-select v-model="value" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="select-item">
          <el-select v-model="value" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="select-item">
          <el-select v-model="value" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="insert-item">
      <div class="title">
        <span class="red">＊</span>
        <span>11</span>
        <span>日期范围：</span> 
      </div>
      <div class="date-pick">
        <el-date-picker
          v-model="dateValue"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small">
        </el-date-picker>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"conventionInsert"
}
</script>

<style lang="less" scoped>
@improt '~style/varible.less';
.insert{
    line-height: 50px;

    .insert-item{
      overflow: hidden;

      .red{
        color: @color-red;
      }

      .date-pick{
        float: left;
        width: 70%;
        text-align: left;
        margin-left: 10px;
      }

      .select-box{
        width: 80%;
        float: left;

        .select-item{
          width: 33%;
          float: left;
          box-sizing: border-box;
          padding: 0 10px;
          text-align: left;

          .el-select.el-select--small{
            width: 162px;
          }
        }
      }

      .title{
        width: 20%;
        text-align: right;
        float: left;
      }

      .input{
        width: 45%;
        float: left;
        margin-left: 10px;
      }
    }
  }
</style>


