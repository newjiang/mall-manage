<template>
  <div>
    <parent-model @row-click="handleItemSelect"/>
    <child-model
      :asChild="true"
      :parentRecord="parentRecord"/>
  </div>
</template>

<script>
  import ParentModel from './model/parentModel'
  import ChildModel from './model/childModel'
  export default {
    name: 'systemCode',
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
