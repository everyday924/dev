import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getMenuList, getUserInfo } from '@/http/api/user'

export const userStore = defineStore('user', () => {

  const menuData : any = ref([])
  const userData : any = ref({})

  const handleMenuData = async () => {
    const res = await getMenuList()
    if(res.code == 200) {
      menuData.value = res.data
      
    }
  }
  
  const handleUserData = async () => {
    const res = await getUserInfo()
    if(res.code == 200) {
      userData.value = res.data
    }
  }
  
  return {menuData,userData, handleMenuData, handleUserData}
}, {
  // 数据持久化
  persist: {
      enabled: true,
  },
})
