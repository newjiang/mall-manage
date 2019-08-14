<template>
  <div>
    <parent-model
      idProperty="sortId"
      @row-click="handleItemSelect"/>
    <child-model
      :asChild="true"
      idProperty="sortId"
      childFiled="parentId"
      parentFiled="sortId"
      :parentRecord="parentRecord"/>
  </div>
</template>

<script>
  import ParentModel from './model/parentModel'
  import ChildModel from './model/childModel'

  export default {
    name: 'sort',
    components: {ParentModel, ChildModel},
    data() {
      return {
        parentRecord: {}
      }
    },
    methods: {
      handleItemSelect(row) {
        this.parentRecord = row
      }
    }
  }
</script>

<style scoped>

</style>
