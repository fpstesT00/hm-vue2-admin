<template>
  <el-dialog title="新增部门" :visible="showDialog" @close="close">
    <!-- 放置弹层内容 -->
    <el-form ref="addDept" label-width="120px" :model="formData" :rules="rules">
      <el-form-item prop="name" label="部门名称">
        <el-input v-model="formData.name" placeholder="2-10个字符" style="width: 80%" size="mini" />
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input v-model="formData.code" placeholder="2-10个字符" style="width: 80%" size="mini" />
      </el-form-item>
      <el-form-item prop="managerId" label="部门负责人">
        <el-select
          v-model="formData.managerId"
          placeholder="请选择负责人"
          style="width: 80%"
          size="mini"
        />
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input
          v-model="formData.introduce"
          type="textarea"
          :rows="4"
          placeholder="请输入1-100个字符"
          style="width: 80%"
        />
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary">确认</el-button>
            <el-button>取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getDepartment } from '@/api/department'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        code: '', // 部门编码
        introduce: '', // 部门介绍
        managerId: '', // 部门负责人名字
        name: '', // 部门名称
        pid: '' // 部门父级部门id
      },
      rules: {
        code: [
          {
            required: true,
            message: '部门编码不能为空',
            trigger: 'blur'
          },
          { min: 2, max: 10, message: '应为2-10个字符', trigger: 'blur' },
          {
            trigger: 'blur',
            // 自定义校验规则
            validator: async(rule, value, callback) => {
              // vulue就是输入的编码
              const result = await getDepartment()
              if (result.some(item => item.code === value)) {
                callback(new Error('部门中已经有该编码了'))
              } else {
                callback()
              }
            }
          }
        ], // 部门编码
        introduce: [
          {
            required: true,
            message: '部门介绍不能为空',
            trigger: 'blur'
          },
          { min: 2, max: 10, message: '应为2-100个字符', trigger: 'blur' }
        ], // 部门介绍
        managerId: [
          {
            required: true,
            message: '部门负责人名字不能为空',
            trigger: 'blur'
          }
        ], // 部门负责人名字
        name: [
          {
            required: true,
            message: '部门名称不能为空',
            trigger: 'blur'
          },
          { min: 2, max: 10, message: '应为2-10个字符', trigger: 'blur' },
          {
            trigger: 'blur',
            // 自定义校验规则
            validator: async(rule, value, callback) => {
              // vulue就是输入的编码
              const result = await getDepartment()
              if (result.some(item => item.name === value)) {
                callback(new Error('部门中已经有该名称了'))
              } else {
                callback()
              }
            }
          }
        ] // 部门名称
      }
    }
  },
  methods: {
    close() {
      // 修改父组件的值 子传父
      this.$emit('update:showDialog', false)
    }
  }
}
</script>
