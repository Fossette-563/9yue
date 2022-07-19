<template>
  <el-menu
    :collapse='isCollapse'
    :default-active='$route.path'
    class='el-menu-vertical-demo'
    collapse-transition
    router
    unique-opened
  >
    <MenuItem v-for='(item,i) in menuList' :key='i' :index='i' :item='item'></MenuItem>
  </el-menu>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import MenuItem from '@/layout/Aside/MenuItem'
import { filterMenus } from '@/utils/filterMenus'

const store = useStore()

//折叠参数
const isCollapse = computed(() => {
  return store.getters.isCollapse
})

//获取菜单数据
const menuList = computed(() => {
  const { menus } = store.getters.userInfo
  return filterMenus(menus)
})
</script>

<style lang='scss' scoped>
.aside {
  height: 100%;

  .el-menu {
    border-right: 0;
    border-right: none;
  }
}

</style>
