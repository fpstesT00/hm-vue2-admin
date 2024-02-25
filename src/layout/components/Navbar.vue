<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 头像 -->
          <img v-if="avatar" :src="avatar" class="user-avatar">
          <span v-else class="username" :style="{ backgroundColor: randomColor }">{{ name?.charAt(2) }}</span>
          <span class="name">{{ name }}</span>
          <i class="el-icon-setting" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/fpstesT00/vue2-admin/">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <!-- prevent阻止h5标签默认事件 -->
          <a target="_blank" @click.prevent="updatePassword">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <!-- native实践修饰符 -->
          <!-- 注册组件的根元素的原生事件 -->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 放置dialog -->
    <!-- sync 可以接受子组件传过来的事件和值 -->
    <el-dialog title="修改密码" width="500px" append-to-body :visible.sync="showDialog" @close="btnCancel">
      <!-- 放置表单 -->
      <el-form ref="passForm" label-width="120px" :model="passForm" :rules="rules">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="passForm.oldPassword" show-password size="small" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passForm.newPassword" show-password size="small" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="passForm.confirmPassword" show-password size="small" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="btnOk">确认修改</el-button>
          <el-button @click="btnCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { updatePassword } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      showDialog: false,
      passForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
        newPassword: [{ required: true, message: '新密码不能为空', trigger: 'blur' }, {
          validator: (rule, value, callback) => {
          // 正则表达式来检查密码是否符合要求
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,16}$/
            if (!passwordRegex.test(value)) {
              callback(new Error('密码必须包含大小写字母、数字，长度为6-16位')) // 返回提示消息
            } else {
              callback() // 验证通过
            }
          },
          trigger: 'blur'
        }],
        confirmPassword: [{ required: true, message: '确认密码不能为空', trigger: 'blur' }, {
          validator: (rule, value, callback) => {
            if (this.passForm.newPassword !== value) {
              callback(new Error('两次输入的密码不一致'))
            } else {
              callback()
            }
          }
        }]
      }
    }
  },
  // 引入头像和昵称
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ]),
    randomColor() {
      return this.getRandomColor()
    }
  },
  methods: {
    updatePassword() {
      // 弹出层
      this.showDialog = true
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      // 调用退出登录的action
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
    getRandomColor() {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
    // 确定
    btnOk() {
      this.$refs.passForm.validate(async isOk => {
        if (isOk) {
          await updatePassword(this.passForm)
          this.$message.success('修改密码成功')
          // 重置表单 关闭弹层
          this.btnCancel()
        }
      })
    },
    // 取消
    btnCancel() {
      // 重置表单
      this.$refs.passForm.resetFields()
      // 关闭弹层
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;
        .username {
          margin-right: 10px;
          text-align: center;
          cursor: pointer;
          font-size: 16px;
          color: #fff;
          width: 30px;
          height: 30px;
          line-height: 30px;
          user-select: none;
          border-radius: 50%;
        }
        .name {
          cursor:default;
          margin-right: 10px;
          user-select: none;
          font-size: 16px;
        }
        .el-icon-setting {
          cursor: pointer;
          user-select: none;
          font-size: 20px;
        }
        .user-avatar {
          margin-right: 10px;
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
