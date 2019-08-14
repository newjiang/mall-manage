<template>
  <div style="padding: 5px">
    <!-- 数据表单 -->
    <el-card :body-style="{ padding: '0px' }">
      <!-- 搜索框 -->
      <search-form ref="searchForm" :columns="columns"/>

      <!-- 按钮列表 -->
      <el-row style="text-align: center">
        <el-button
          v-for="item in buttons"
          size="mini"
          :type="item.type"
          :icon="item.icon"
          :plain="item.plain"
          :loading="buttonloading[item.name]"
          @click="wrapClick(item)"
        >{{item.label}}
        </el-button>
      </el-row>

      <div style="padding: 5px">
        <el-table
          ref="multipleTable"
          border stripe
          :data="tableData"
          tooltip-effect="dark"
          highlight-current-row
          style="width: 100%;text-align: center"
          @row-click="onRowClick"
          @selection-change="handleSelectionChange">
          <!-- 选择框 -->
          <el-table-column type="selection" @click="toggleSelection(item)" width="35px" v-if="multiple"/>
          <el-table-column
            v-for="item in columns"
            :prop="item.name"
            :label="item.label"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页器 -->
      <div style="text-align: center;margin: 5px">
        <el-pagination
          background
          :total="total"
          :page-size="pageSize"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
          layout="total, sizes, prev, pager, next,jumper">
        </el-pagination>
      </div>
    </el-card>

    <!-- 新增弹出框 -->
    <el-dialog
      center
      title="新增"
      width="60%"
      :destroy-on-close="true"
      :visible.sync="createVisible"
    >
      <create-form
        ref="createForm"
        :columns="columns"
        :rules="rules"
        v-if="createVisible"/>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="createVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="onCreate">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改弹出框 -->
    <el-dialog
      center
      title="修改"
      width="60%"
      :destroy-on-close="true"
      :visible.sync="updateVisible"
    >
      <update-form
        ref="updateForm"
        :rules="rules"
        :record="record"
        :columns="columns"
        v-if="updateVisible"/>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="updateVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="onUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import SearchForm from '@/common/form/SearchForm'
  import CreateForm from '@/common/form/CreateForm'
  import UpdateForm from '@/common/form/UpdateForm'
  import axios from 'axios'

  export default {
    name: 'ComTable',
    props: {
      url: String,                       // RestFul的URL
      columns: Array,                    // 数据列表
      buttons: Array,                    // 按钮列表
      multiple: {default: true},         // 是否多选
      lazy: {default: false},            // 是否懒加载
      idProperty: {default: 'id'},       // 主键名称
      asChild: {default: false},         // 是否子组件
      parentRecord: {},                  // 父记录
      childFiled: {default: 'parentId'}, // 子记录关联父记录的字段
      parentFiled: {default: 'id'},      // 父记录被子记录关联的字段
      defaultFilter: {}                  // 默认过滤器
    },
    components: {SearchForm, CreateForm, UpdateForm},
    data() {
      return {
        record: Object,               // 当前记录
        rules: Array,                 // 表单校验规则
        createVisible: false,         // 新增弹出框
        updateVisible: false,         // 修改弹出框
        total: 0,                     // 记录总数
        pageSize: 10,                 // 每页总数
        currentPage: 1,               // 当前页
        tableData: [],                // 记录数据
        multipleSelection: [],        // 被选择中记录
        buttonloading: {}             // 按钮是否正在加载
      }
    },
    mounted() {
      this.initRules()
      if (!this.lazy && !this.asChild || !this.parentRecord) {
        this.onSearch()
      }
    },
    watch: {
      // 监听父记录
      parentRecord(newVal, oldVal) {
        if (this.asChild && newVal !== oldVal) {
          this.onSearch({[this.childFiled]: newVal[this.parentFiled]})
        }
      },
    },
    methods: {
      initRules() {
        let rules = new Object()
        this.columns.map(item => {
          rules[item.name] = item.rule
        })
        this.rules = rules
      },
      toggleSelection(rows) {
        if (rows) {
          this.$refs.multipleTable.toggleRowSelection(row)
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },

      handleSelectionChange(val) {
        this.multipleSelection = val
      },

      handleSizeChange(size) {
        this.pageSize = size
      },

      // 处理分页器参数改变
      handlePageChange(no) {
        this.currentPage = no
        let page = {pageSize: this.pageSize, pageNo: this.currentPage}
        let entity = this.$refs.searchForm.data
        let param = {}
        // 限制子组件
        if (this.asChild) {
          param = Object.assign(page, entity, {[this.childFiled]: this.parentRecord[this.parentFiled]});
        } else {
          param = Object.assign(page, entity);
        }
        axios.get(this.url, {params: param}).then(res => {
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }).catch(err => {
          console.log('查询失败:', err)
        })
      },

      // 搜索
      onSearch(param) {
        // 限制子组件
        if (this.asChild && Object.keys(this.parentRecord).length < 1) {
          this.$message({message: '请选择父记录', type: 'warning'})
          this.buttonloading['search'] = false
          this.buttonloading['reset'] = false
          return
        }
        if (this.asChild) {
          if (param) {
            param = Object.assign(param, {[this.childFiled]: this.parentRecord[this.parentFiled]})
          } else {
            param = {[this.childFiled]: this.parentRecord[this.parentFiled]}
          }
        }

        axios.get(this.url, {params: param}).then(res => {
          this.tableData = res.data.data.list
          this.total = res.data.data.total
          this.buttonloading['search'] = false
          this.buttonloading['reset'] = false
          this.currentPage = 1
        }).catch(err => {
          console.log('查询失败:', err)
        })
      },

      // 删除
      onDelete(param) {
        axios.delete(this.url, {data: param}).then(res => {
          if (res.data.success) {
            this.$message({message: '删除成功', type: 'success'})
            this.onSearch()
          } else {
            this.$message.error(res.data.message)
          }
          this.buttonloading['delete'] = false
        }).catch(err => {
          this.$message({message: '删除失败:' + err.message, type: 'error'})
          this.buttonloading['delete'] = false
        })
      },

      // 新增
      onCreate() {
        let entity = this.$refs.createForm.data
        if (this.asChild) {
          entity = Object.assign(entity, {[this.childFiled]: this.parentRecord[this.parentFiled]})
        }

        axios.put(this.url, entity).then(res => {
          if (res.data.success) {
            this.$message({message: '新增成功', type: 'success'})
            this.$refs.createForm.reset()
            this.createVisible = false
            this.onSearch()
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(err => {
          console.log('新增失败:', err)
        });
      },

      // 修改
      onUpdate() {
        let entity = this.$refs.updateForm.data
        entity = Object.assign(entity, {id: this.record.id})
        axios.post(this.url, entity).then(res => {
          if (res.data.success) {
            this.$message({message: '修改成功', type: 'success'})
            this.$refs.updateForm.reset()
            this.updateVisible = false
            this.onSearch()
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(err => {
          console.log('修改失败:', err)
        })
      },

      // 行点击事件
      onRowClick(row) {
        this.$emit('row-click', row)
      },

      // 包装按钮点击事件
      wrapClick(button) {
        switch (button.name) {
          case 'create':
            // 限制子组件
            if (this.asChild && Object.keys(this.parentRecord).length < 1) {
              this.$message({message: '请选择父记录', type: 'warning'})
              return
            }
            this.createVisible = true
            break
          case 'update':
            // 限制子组件
            if (this.asChild && Object.keys(this.parentRecord).length < 1) {
              this.$message({message: '请选择父记录', type: 'warning'})
              return
            }
            if (this.multipleSelection.length !== 1) {
              this.$message({message: '请选择一条记录', type: 'warning'})
            } else {
              this.record = this.multipleSelection[0]
              this.updateVisible = true
            }
            break
          case 'delete':
            // 限制子组件
            if (this.asChild && Object.keys(this.parentRecord).length < 1) {
              this.$message({message: '请选择父记录', type: 'warning'})
              return
            }
            let ids = this.multipleSelection.map(item => {
              return item[this.idProperty]
            })
            if (ids.length < 1) {
              this.$message({message: '请选择一条记录', type: 'warning'})
              return
            }
            this.buttonloading = Object.assign({}, {search: true})
            this.onDelete(ids);
            break
          case 'reset':
            this.buttonloading = Object.assign({}, {reset: true})
            this.$refs.searchForm.reset()
            this.onSearch()
            break
          case 'search':
            this.buttonloading = Object.assign({}, {search: true})
            this.onSearch(this.$refs.searchForm.data)
            break
          default :
            this.handleButtonClick(button.click)
            break
        }
      },

      // 按钮点击事件
      handleButtonClick(click) {
        if (click instanceof Function) {
          let ret = click('1', '2', '3')
          if (ret instanceof Promise) {
            ret.then(() => {
              console.log(2)
            }).catch(() => {
              console.log(3)
            })
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
