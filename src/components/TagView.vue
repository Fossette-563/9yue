<template>
  <div
    :style='{left:$store.getters.isCollapse ? "64px" : "250px",width:$store.getters.isCollapse ? "calc(100vw - 85px)" : "calc(100vw - 269px)"}'
    class='tags_container'>
    <el-tabs
      class='demo-tabs'
      closable
      type='card'
      @tab-remove='handleCloseTags'
      @tab-click='changeView'
    >
      <el-tab-pane
        v-for='item in TagsView'
        :key='item.path'
        :label='item.title'
        :name='item.path'
      />
    </el-tabs>
    <!--  下拉-->
    <div class='tag-btn'>
      <el-dropdown trigger='click' @command='handleCloseAllTags'>
      <span class='el-dropdown-link'>
       <el-icon><ArrowDown /></el-icon>
      </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command='closeOther'>关闭其它</el-dropdown-item>
            <el-dropdown-item command='closeAll'>关闭全部</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

  </div>
  <div style='height: 40px'>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()
const router = useRouter()

//删除单个tagsView
const handleCloseTags = (TagsName) => {
  const tags = store.getters.TagsView
  const index = tags.findIndex((item) => item.path === TagsName)
  store.commit('tagsView/delTags', index)
//  选中
}
//获取tagsView渲染
const TagsView = computed(() => {
  return store.getters.TagsView
})
//选中tagsView跳转页面
const changeView = ({ props: { name } }) => {
  router.push(name)
}
//通过监听route（路由）添加tagsView
watch(route, (val) => {
  if (!val.meta.title) return
  const tags = {
    path: val.path,
    title: val.meta.title
  }
  store.commit('tagsView/getTags', tags)
}, {
  immediate: true,
  deep: true
})
</script>

<style lang='scss' scoped>
.tags_container {
  height: 44px;
  top: 64px;
  position: fixed;
  transition: all 0.4s;
  width: 1100px;
  display: flex;
  padding: 0 8px 0 8px;
  box-sizing: border-box;
  background: #f3f4f6;
  z-index: 100;

  .el-tabs {
    height: 100%;
    flex: 1;
    overflow-y: hidden;

    ::v-deep(.el-tabs__header) {
      border: none;

      .el-tabs__nav {
        border: 0 !important;

        .el-tabs__item {
          background: #fff;
          margin: 0 4px;
          height: 32px;
          padding: 0 20px;
          line-height: 32px;
          border-radius: 5px;
          border: 0 !important;
        }
      }
    }
  }

  .tag-btn {
    --tw-bg-opacity: 1;
    background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
    border-radius: .25rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    margin-left: auto;
    padding-left: .5rem;
    padding-right: .5rem;
    height: 32px;
    margin-top: 5px;

    .el-dropdown-link {
      cursor: pointer;
    }
  }
}
</style>
