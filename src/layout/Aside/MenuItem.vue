<template>
  <el-sub-menu v-if='item.children && item.children.length>=0' :index='index+""'>
    <template #title>
      <el-icon>
        <component :is='item.icon'></component>
      </el-icon>
      <span>{{ item.title }}</span>
    </template>
    <MenuItem v-for='(it,i) in item.children' :key='i' :index='i' :item='it'></MenuItem>
  </el-sub-menu>
  <el-menu-item v-if='!item.children || item.children.length<=0' :index='item.path'>
    <el-icon>
      <component :is='item.icon'></component>
    </el-icon>
    <span>{{ item.title }}</span>
  </el-menu-item>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  item: {
    type: Object,
    default: () => {
    }
  },
  index: Number
})
</script>

<style></style>
