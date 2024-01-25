<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <Menus :isCollapse="isCollapse" />
    <el-container class="layout-right">
      <el-header>
        <div class="header">
          <div style="display: flex;align-items: center;">
            <el-icon @click="handleCollapsa()">
              <Expand v-if="isCollapse" />
              <Fold v-else />
            </el-icon>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item
              v-for="item,index in breadcrumbList" :key="index">{{item?.meta?.title}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <div class="toolbar">
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
              <router-link v-for="item,index in tabList" :to="item?.path" :key="index"
              >
                <el-radio-button :label="item?.path">
                    <span>{{ item?.title }}</span>
                    <el-icon @click.prevent.stop="closeSelectedTag(item)" v-if="index">
                      <Close />
                    </el-icon>
                </el-radio-button>
              </router-link>
          </el-radio-group>
        </el-scrollbar>
      </el-header>

      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
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
const getBreadcrumb = () => {
  breadcrumbList.value = route.matched.filter((item) => item.meta?.title)
}

// 标签
const tabPosition = ref()
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
const closeSelectedTag = (item:Object) => {
  let index = 0
  tabList.value = tabList.value.filter((v,i)=>{
    index = i
   return item.path !== v.path
  })
  tabPosition.value = tabList.value[index-1].path
  sessionStorage.setItem('tabList', JSON.stringify(tabList.value))
  router.push(tabPosition.value)
}

/** 监听路由，
 * 获取面包屑导航列表
 * */
watch(route,()=>{
    // 面包屑
    getBreadcrumb()

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
  border-bottom: 1px solid #0c1d2e;
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}



.layout-right {
  .header{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    align-items: center;
  }
  .el-icon {
    margin: 0 10px;
  }
}

</style>