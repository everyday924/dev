<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <Menus :isCollapse="isCollapse" />
    <el-container class="layout-right">
      <el-header>
        <div class="header">
          <div style="display: flex;align-items: center;">
            <el-icon @click="handleCollapsa()" class="pointer collapsa">
              <Expand v-if="isCollapse" />
              <Fold v-else />
            </el-icon>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item
              v-for="item,index in breadcrumbList" :key="index">{{item?.meta?.title}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <div class="toolbar pointer">
            <!-- 搜索 -->
            <el-icon><Search /></el-icon>
            <!-- 全屏 -->
            <el-icon @click="toggleFullScreen()"><FullScreen /></el-icon>
            <!-- 消息 -->
            <el-icon><Message /></el-icon>
            <el-dropdown>
              <div>
                <el-icon><Setting /></el-icon>
                <span>admin</span>
              </div>

              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <a href="https://github.com/everyday924/vue-project" target="_blank">github</a>
                  </el-dropdown-item>
                  <el-dropdown-item @click="signOut()">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>

        <el-scrollbar>
          <el-radio-group v-model="tabPosition" style="margin-top: 10px;flex-wrap:nowrap;">
              <router-link v-for="item,index in tabList" :to="item?.path" :key="item?.path"
              >
                <el-radio-button :label="item?.path">
                    <span>{{ item?.title }}</span>
                    <el-icon @click.prevent.stop="closeSelectedTag(item, index)" v-if="index">
                      <Close />
                    </el-icon>
                </el-radio-button>
              </router-link>
          </el-radio-group>
        </el-scrollbar>
      </el-header>

      <el-scrollbar style="background-color: #eeeeee;">
        <keep-alive>
          <router-view 
          style="background: white;
          margin: 10px; 
          border-radius: 5px;
          padding: 15px;
          box-sizing: border-box;"
          :key="route.fullPath"></router-view>
        </keep-alive>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Message, Search, Expand, Fold,FullScreen,Setting, Close } from '@element-plus/icons-vue'
import Menus from './component/menu.vue'
import {toggleFullScreen, deepEqual} from '@/common/tools'
import { useRoute, useRouter } from "vue-router";
import { userStore } from '@/stores/user';
const store = userStore()
const router = useRouter();
const route = useRoute();

// 退出登录
const signOut = () => {
  router.push('/login')
  sessionStorage.removeItem('token')
}

// 折叠面板
const isCollapse = ref(false)
const handleCollapsa = () => {
  isCollapse.value = !isCollapse.value
}

// 面包屑数据
const breadcrumbList = ref([])
const getBreadcrumb = (data:[]) => {
  const arr = data.filter(item => {
    // iframe的meta是一个数组这里做下转换
    if(Array.isArray(item?.meta)){
      item.meta.forEach(v => {
        if(v.url == route.params.src) {
          item.meta = { title: v.name }
        }
      })
    }
    return item.meta?.title
  })
  breadcrumbList.value = arr
}

// 标签
const tabPosition = ref(route.path)
const data = store.menuData
const tabList = ref([]) 
tabList.value = JSON.parse(sessionStorage.getItem('tabList')) || []
// 获取标签数据
const getTabList = (data:[]) => {
  data.filter((item:Object)=>{
    if(!tabList.value.some((v) => deepEqual(v, item))) {
      if(item?.childs) {
        getTabList(item.childs)
      } else if(item.path == route.path){
        tabList.value.push(item)
      }
    }
  })
  sessionStorage.setItem('tabList', JSON.stringify(tabList.value))
}
// 删除标签
const closeSelectedTag = (item:Object, index:Number) => {
  const data = JSON.parse(JSON.stringify(tabList.value))
  
  // 根据下标删除
  data.splice(index, 1)
  tabList.value = data
  sessionStorage.setItem('tabList', JSON.stringify(data))

  // 最后一个标签删除，跳转到前一个标签
  if(tabPosition.value == item.path && index == data.length){
    tabPosition.value = data[index - 1].path
    router.push(tabPosition.value)
  }
  
}

/** 监听路由，
 * 获取面包屑导航列表
 * */
watch(route,()=>{
    // 面包屑
    const matched = JSON.parse(JSON.stringify(route.matched))
    getBreadcrumb(matched)
    // 标签
    getTabList(data)
    tabPosition.value = route.path
    
    // 
},{
    immediate:true,
});

</script>

<style scoped lang="scss">
.layout-container-demo .el-header {
  position: relative;
  color: var(--el-text-color-primary);
  box-shadow: 0 0 3px #00000010;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}


:deep(.el-scrollbar__view) {
    .el-menu {
      border-right: none !important;
    }
}

.layout-right {
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-icon {
    margin: 0 10px;
  }
}

.pointer{
  cursor: pointer
}

.collapsa {
  font-weight: 800;
}
</style>
