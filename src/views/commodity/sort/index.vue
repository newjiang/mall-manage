<template>
  <div>
    <parent-model
      id-property="sortId"
      @row-click="handleItemSelect"
    />
    <child-model
      :as-child="true"
      id-property="sortId"
      child-filed="parentId"
      parent-filed="sortId"
      parent-record="parentRecord"
    />
  </div>
</template>

<script>
import ParentModel from './model/parentModel'
import ChildModel from './model/childModel'

export default {
  name: 'Sort',
  components: { ParentModel, ChildModel },
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
