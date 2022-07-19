<template>
  <div class='login'>
    <el-icon class='login-icon' style='color: #4338ca;margin-top: 24px'>
      <Eleme />
    </el-icon>
    <h1>积云编程</h1>
  </div>
  <div class='header-box'>
    <div class='left'>
      <el-icon style='color:#fff;margin-right: 30px' @click='fold'>
        <Fold v-if='isCollapse===false' />
        <Expand v-else />
      </el-icon>
      <el-tooltip
        class='box-item'
        content='刷新'
        effect='dark'
        placement='bottom'
      >
        <el-icon style='color:#fff' @click='refresh'>
          <Refresh />
        </el-icon>
      </el-tooltip>
    </div>
    <div class='right'>
      <el-tooltip
        :content='screenfullTltle'
        class='box-item'
        effect='dark'
        placement='bottom'
      >
        <el-icon style='margin-top: 20px;color: #fff' @click='changeFullScreen'>
          <FullScreen v-if='isFullscreen' />
          <Aim v-else />
        </el-icon>
      </el-tooltip>
      <!--用户-->
      <div class='user-box'>
        <el-avatar :size='30' src='https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                   style='margin-right: 10px;' />
        <el-dropdown>
            <span class='el-dropdown-link' style='color: #fff'>
              {{ userInfo }}
              <el-icon class='el-icon--right'>
                <arrow-down />
              </el-icon>
            </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item @click='layOut'>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElNotification } from 'element-plus'
import screenfull from 'screenfull'

const router = useRouter()
const store = useStore()
//获取用户
const userInfo = computed(() => {
  const { username } = store.getters.userInfo
  return username
})
//刷新
const refresh = () => {
  window.location.reload()
}
//折叠
const isCollapse = computed(() => {
  return store.getters.isCollapse
})
const fold = () => {
  store.commit('user/setCollapse')
}
// 全屏切换
const isFullscreen = ref(true)
//切换提示字
const screenfullTltle = computed(() => {
  return !isFullscreen.value ? '退出全屏' : '全屏'
})
const changeFullScreen = () => {
  //这个方法会请求全屏，如果当前是全屏则会退出全屏。
  screenfull.toggle()
  //改变值用于切换图标
  nextTick(() => {
    isFullscreen.value = screenfull.isFullscreen
  })
}
//点击退出登录
const layOut = async () => {
  try {
    await ElMessageBox.confirm('确定要退出嘛', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    const data = await store.dispatch('user/getlayOut')
    ElNotification({
      type: 'success',
      message: data
    })
    router.push('/login')
  } catch {
  }
}
</script>

<style lang='scss' scoped>
.login {
  width: 240px;
  display: flex;
  height: 64px;
  text-align: center;
  line-height: 64px;
  padding-left: 70px;

  .login-icon {
    width: 18px;
    height: 18px;
    background-color: #fff;
    border-radius: 3px;
    margin-right: 5px;
  }

  h1 {
    color: #fff;
    font-size: 20px;
  }
}

.header-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;

  //.left {
  //margin-left: 250px;
  //}

  .right {
    width: 200px;
    display: flex;
    justify-content: space-around;

    .user-box {
      display: flex;
      height: 100%;
      padding-top: 15px;

      .el-dropdown {
        margin-top: 5px;
      }
    }
  }
}
</style>
