<template>
  <com-table
    ref="comTable"
    v-on="$listeners"
    v-bind="$attrs"
    :columns="columns"
    :buttons="buttons"
    url='/api/system/select'
  />
</template>

<script>
  import ComTable from '@/common/table/ComTable'

  export default {
    name: 'childModel',
    components: {ComTable},
    data() {
      return {
        buttons: [
          {label: '查询', name: 'search', type: 'primary', plain: false, icon: 'el-icon-search'},
          {label: '重置', name: 'reset', type: 'primary', plain: true, icon: 'el-icon-search'},
          {label: '添加', name: 'create', type: 'primary', plain: false, icon: 'el-icon-plus'},
          {label: '修改', name: 'update', type: 'primary', plain: true, icon: 'el-icon-edit'},
          {label: '删除', name: 'delete', type: 'danger', plain: false, icon: 'el-icon-delete'}
        ],
        columns: [
          {
            label: '选项', name: 'item', type: 'input',
            rule: [{required: true, message: '请输入名称', trigger: 'blur'}]
          },
          {
            label: '状态', name: 'status', type: 'select', option: '1',
            rule: [{required: true, message: '请选择名称', trigger: 'blur'}]
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
