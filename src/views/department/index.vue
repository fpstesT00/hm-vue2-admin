<template>
  <div class="container">
    <div class="app-container">
      <el-tree default-expand-all :data="depts" :props="defaultProps" @node-click="handleNodeClick" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Department',
  data() {
    return {
      depts: [{ name: '待定', children: [{
        name: '总裁办'
      }, {
        name: '行政部'
      }, {
        name: '人事部'
      }] }],
      defaultProps: {
        label: 'name', // 要显示的字段的名字
        children: 'children'// 读取子节点的字段名
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
</style>
