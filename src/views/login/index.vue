<template>
  <div class='login-Page'>
    <el-container>
      <el-aside width='66.6666666667%'>
        <h1>欢迎光临</h1>
      </el-aside>
      <el-main>
        <div class='login-box'>
          <h2>欢迎回来</h2>
          <el-divider content-position='center'>
            <span style='color: gainsboro;font-size:14px'>账号密码登录</span>
          </el-divider>
          <!--          表单-->
          <el-form
            ref='ruleFormRef'
            :model='Loginfrom'
            :rules='rules'
            :size='formSize'
            class='demo-ruleForm'
            status-icon
          >
            <el-form-item prop='username'>
              <el-input v-model='Loginfrom.username' :prefix-icon='User' placeholder='请输入用户名' />
            </el-form-item>
            <el-form-item prop='password'>
              <el-input v-model='Loginfrom.password' :prefix-icon='Lock' :type='typeWord'
                        placeholder='请输入密码'>
                <template #suffix>
                  <el-icon size='15px' @click='handlePasswordEdit'>
                    <Hide v-if="typeWord==='password'" />
                    <View v-else-if="typeWord==='text'" />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button color='#626aef' round style='width: 100%' @click='LoginsubmitForm'>登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { User, Lock, Hide, View } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'

const router = useRouter()
const store = useStore()
// 模型数据
const Loginfrom = reactive({
  username: 'admin',
  password: 'admin'
})
const typeWord = ref('password')
// 切换铭文密文
const handlePasswordEdit = () => {
  typeWord.value = typeWord.value === 'password' ? 'text' : 'password'
}
// 校验
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})
// 登录
const LoginsubmitForm = async (valid) => {
  if (valid) {
    await store.dispatch('user/getlogin', Loginfrom)
    await store.dispatch('user/getUserInfo')
    router.push('/')
    ElNotification({
      message: '登录成功',
      type: 'success'
    })
  } else {
    console.log('error submit!')
  }
}
</script>

<style lang='scss' scoped>
.login-Page {
  width: 100%;
  height: 100%;

  .el-container {
    width: 100%;
    height: 100%;

    .el-aside {
      background-color: #6366f1;
      position: relative;

      h1 {
        color: #fff;
        font-size: 3rem;
        font-weight: 700;
        text-align: center;
        width: 100%;
        height: 80px;
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }

    .el-main {
      position: relative;

      .login-box {
        margin: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 250px;
        height: 250px;

        h2 {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
