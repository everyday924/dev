<template>
    <template v-if="!item?.hidden">
        <template v-if="!item?.childs">
            <!-- 一级目录 -->
            <!-- 外置链接 -->
            <a v-if="item?.isLink" :href="item.path" target="_blank">
                <el-menu-item :index="index">
                    <el-icon><Star /></el-icon>
                    <template #title>{{ item?.title }}</template>
                </el-menu-item>
            </a>

            <!-- 跳转路由 -->
            <router-link v-else-if="item?.path" :to="item?.path">
                <el-menu-item :index="index">
                    <el-icon><Star /></el-icon>
                    <template #title>{{ item?.title }}</template>
                </el-menu-item>
            </router-link>

            <!-- 无跳转 -->
            <el-menu-item :index="index" v-else>
                <el-icon><Star /></el-icon>
                <template #title>{{ item?.title }}</template>
            </el-menu-item>
        </template>

        <!-- 二级目录 -->
        <el-sub-menu :index="index" v-else>
            <template #title>
                <a v-if="item?.isLink" :href="item.path" target="_blank">
                    <el-icon><Star /></el-icon>
                    <span> {{ item?.title }}</span>
                </a>

                <router-link v-else-if="item?.path" :to="item?.path">
                    <el-icon><Star /></el-icon>
                    <span> {{ item?.title }}</span>
                </router-link>

                <div v-else>
                    <el-icon><Star /></el-icon>
                    <span> {{ item?.title }}</span>
                </div>
            </template>

            <el-menu-item-group>
                <MenuItem 
                    v-for="val,ind in item?.childs" 
                    :key="ind" 
                    :index="val.key"
                    :item="val"
                />
            </el-menu-item-group>
        </el-sub-menu>
    </template>
   
</template>

<script setup lang="ts">
    import {defineProps, Fragment} from 'vue'
    import { Star } from '@element-plus/icons-vue'
    import MenuItem from '../component/menuItem.vue';
    
    const { item,index } = defineProps({
        item: Object,
        index: String
    })
</script>

<style lang="scss" scoped>
    a {
        color: white !important;
    }

    .router-link-active, .router-link-exact-active {
        color: #1990ff !important;
    }
</style>