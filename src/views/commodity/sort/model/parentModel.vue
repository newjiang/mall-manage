<template>
  <com-table
    ref="comTable"
    :columns="columns"
    :buttons="buttons"
    :multiple="true"
    v-bind="$attrs"
    url="/api/commodity/sort"
    v-on="$listeners"
  />
</template>

<script>
import ComTable from '@/common/table/ComTable'
export default {
  name: 'ParentModel',
  components: { ComTable },
  data() {
    return {
      buttons: [
        { label: '查询', name: 'search', type: 'primary', plain: false, icon: 'el-icon-search' },
        { label: '重置', name: 'reset', type: 'primary', plain: true, icon: 'el-icon-search' },
        { label: '添加', name: 'create', type: 'primary', plain: false, icon: 'el-icon-plus' },
        { label: '修改', name: 'update', type: 'primary', plain: true, icon: 'el-icon-edit' },
        { label: '删除', name: 'delete', type: 'danger', plain: false, icon: 'el-icon-delete' }
      ],
      columns: [
        {
          label: '分类名称', name: 'sortName', type: 'input',
          rule: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
          ]
        },
        {
          label: '等级', name: 'sortLevel', type: 'input',
          rule: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
