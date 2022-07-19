<template>
  <div class='layout-Page'>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container class='main-area'>
        <el-aside :width="isCollapse?'69px':'240px'">
          <Aside></Aside>
        </el-aside>
        <el-main :style='{marginLeft :isCollapse ? "64px" : "250px" ,top:"64px"}'>
          <TagView></TagView>
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Aside from '@/layout/Aside'
import Header from '@/layout/Header'
import Main from '@/layout/Main'
import { computed } from 'vue'
import { useStore } from 'vuex'
import TagView from '@/components/TagView'
//折叠参数
const store = useStore()
const isCollapse = computed(() => {
  return store.getters.isCollapse
})
</script>

<style lang='scss' scoped>
.layout-Page {
  width: 100%;
  height: 100%;

  .el-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .el-header {
      width: 100%;
      display: flex;
      height: 64px;
      line-height: 64px;
      background-color: #4338ca;
      padding: 0;
      position: fixed;
      z-index: 100;
    }

    .main-area {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;

      .el-main {
        background-color: #f3f4f6;
        position: relative;
      }

      .el-aside {
        position: fixed;
        margin-top: 64px;
      }
    }
  }
}
</style>
