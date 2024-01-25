<template>
    <div class="layout-left">
        <div class="logo">VUE 3.0</div>
        <el-scrollbar>
            <el-menu
                :default-active="routes.path"
                class="el-menu-vertical-demo"
                :collapse="props.isCollapse"
                background-color="#314159"
                text-color="#e8e8e8"
                active-text-color="#1990ff"
            >
                <MenuItem 
                    v-for="item,index in store.menuData" 
                    :key="index" 
                    :index="item.key"
                    :item="item"
                />
            </el-menu>


        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, onMounted } from 'vue';
import { Menu as IconMenu,Setting } from '@element-plus/icons-vue';
import MenuItem from './menuItem.vue';
import { useRoute, useRouter } from "vue-router";
import { userStore } from '@/stores/user';
const store = userStore()
store.handleMenuData()

const router = useRouter();
const routes = useRoute();


const props = defineProps({
    isCollapse:Boolean,
})

</script>


<style scoped lang="scss">
.layout-left {
  background-color: #314159;
  .el-scrollbar {
    height: calc(100% - 60px);
  }

  .logo {
    height: 60px;
    text-align: center;
    line-height: 60px;
    color: #fff;
    border-bottom: 1px solid #0c1d2e;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  :deep(.el-menu) {
    .is-active {
      // background-color: #1990ff !important;
    }
  }
}
</style>