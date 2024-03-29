<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <el-tree :expand-on-click-node="false" default-expand-all :data="depts" :props="defaultProps">
        <!-- 节点结构 -->
        <!-- v-slot="{ node, data }" 只能作用在template -->
        <template v-slot="{ data }">
          <el-row
            style="width: 100%; height: 40px"
            type="flex"
            justify="space-between"
            align="middle"
          >
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <!-- $event 实参 表示类型 -->
              <el-dropdown trigger="click" @command="operateDept($event,data.id)">
                <!-- 显示区域内容 -->
                <span class="el-dropdown-link">
                  操作
                  <i class="el-icon-arrow-down el-icon--right" />
                </span>
                <!-- 下拉菜单选项 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <!-- 放置弹层 -->
    <!-- 表示会接受子组件的事件 -->
    <!-- ref可以拿到 子组件实例 -->
    <add-dept ref="addDept" :dialog-title="dialogTitle" :sub-department-id="subDepartmentId" :show-dialog.sync="showDialog" @updateTheDepartment="getDepartment" />
  </div>
</template>
<script>
import { getDepartment, delDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
import AddDept from './components/app-dept.vue'
export default {
  name: 'Department',
  components: { AddDept },
  data() {
    return {
      dialogTitle: '',
      subDepartmentId: null,
      showDialog: false,
      depts: [], // 数据属性
      defaultProps: {
        label: 'name', // 要显示的字段的名字
        children: 'children' // 读取子节点的字段名
      }
    }
  },
  created() {
    this.getDepartment() // 调用获取数据的接口
  },
  methods: {
    // 封装好方法
    async getDepartment() {
      const result = await getDepartment()
      this.depts = transListToTreeData(result, 0)
    },
    // 操作部门方法
    operateDept(type, id) {
      // 新增部门
      if (type === 'add') {
        this.showDialog = true
        this.subDepartmentId = id
        this.dialogTitle = '新增部门'
      } else if (type === 'edit') {
        // 编辑部门
        this.showDialog = true
        this.dialogTitle = '编辑部门'
        this.subDepartmentId = id
        // 更新props是异步
        // 调用子组件方法是同步
        this.$nextTick(() => {
          this.$refs.addDept.getDepartmentDetail()
        })
      } else {
        // 删除部门
        this.$confirm('您确定要删除该部门吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          // 调用删除接口
          await delDepartment(id)
          // 重新拉起数据
          this.$message.success('删除部门成功')
          this.getDepartment()
        }).catch(() => {
          this.$message('已取消删除')
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
.app-container {
  padding: 30px 140px;
  font-size: 14px;
}
.tree-manager {
  width: 50px;
  display: inline-block;
  margin: 30px;
}
</style>
