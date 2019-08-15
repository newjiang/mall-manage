<template>
  <div>
    <parent-model @row-click="handleItemSelect" />
    <child-model
      :as-child="true"
      :parent-record="parentRecord"
    />
  </div>
</template>

<script>
import ParentModel from './model/parentModel'
import ChildModel from './model/childModel'
export default {
  name: 'SystemCode',
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
