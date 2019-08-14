<template>
  <el-row :span="24">
    <el-form
      size="mini"
      ref="data"
      :model="data"
      :inline="true"
      :rules="rules"
      v-for="item in columns"
      class="demo-form-inline">
      <el-col :span="12">
        <el-form-item :prop="item.name" :label="item.label" size="mini">
          <!-- 输入框 -->
          <el-input
            v-model="data[item.name]"
            :placeholder="item.label"
            v-if="item.type === 'input'"/>
          <!-- 日期框 -->
          <el-date-picker
            type="datetime"
            v-model="data[item.name]"
            :placeholder="item.label"
            v-if="item.type === 'time'"/>
          <!-- 下拉框 -->
          <el-select
            v-model="data[item.name]"
            :placeholder="item.label"
            remote
            clearable
            filterable
            reserve-keyword
            :loading="loading"
            :remote-method="queryOptions"
            @focus="initOptions(item.option)"
            v-else-if="item.type === 'select'"
          >
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"/>
          </el-select>
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'CreateForm',
    props: {columns: Array, rules: Object, record: Object},
    data() {
      return {
        data: Object,
        options: [],
        optionType: String,
        loading: false,
      }
    },
    created() {
      this.initData()
    },
    methods: {
      initData() {
        let obj = new Object()
        this.columns.map(d => {
          obj[d.name] = this.record[d.name]
        })
        this.data = obj
      },
      reset() {
        this.columns.map((item, index) => {
          this.$refs.data[index].resetFields()
        });
      },
      initOptions(val) {
        this.optionType = val
        this.queryOptions()
      },
      // 查询
      queryOptions(val) {
        this.loading = true
        axios.get('api/system/select/option', {params: {number: this.optionType, item: val}}).then(res => {
          this.options = res.data.data
          this.loading = false
        }).catch(e => {
          console.log('下拉数据', e)
          this.loading = false
        })
      }
    }
  }
</script>

<style scoped>
  /*修改父组件的样式*/
  el-row >>> div.el-col >>> {
    margin: 0px;
    padding: 0px;
  }

  .el-col >>> div.el-form-item {
    margin: 0 0 20px 0;
    padding: 0px;
    width: 100%;
  }

  /*提示框*/
  .el-form-item >>> label.el-form-item__label {
    text-align: right;
    font-size: 12px;
    width: 30%;
  }

  /*文本输入框*/
  .el-form-item >>> div.el-form-item__content {
    width: 70%;
  }

  /*下来框*/
  .el-form-item >>> div.el-select {
    width: 100%;
  }

  /*日期选择框*/
  .el-form-item >>> div.el-date-editor {
    width: 100%;
  }
</style>
