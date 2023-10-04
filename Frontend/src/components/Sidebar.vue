<template>
  <div class="sidebar">
      <SidebarNav v-if="ownerLogin.o_role === 'owner'" :item="owner" class="sidebar-nav" />
      
  
  </div>
</template>

<script>
import SidebarNav from "./SidebarNav";
import { mapState } from "vuex";
export default {
computed: {
  ...mapState({
    ownerLogin: state => state.owner
  })
},
data() {
  return {
    owner: {
      header: "<i class='fa fa-address-card'></i> ส่วนของเจ้าของร้าน",
      navs: [
        { name: "แก้ไขข้อมูลร้าน", link: { name: "jobEdowner"  } },
        { name: "ตรวจสอบผู้สมัครงาน", link: { name: "apply-manage" } },
        { name: "รายการงาน", link: { name: "jobhistory" } },
        { name: "เพิ่มงาน", link: { name: "job-form" } },
        
      ]
    },
   
  };
},
components: {
  SidebarNav
}
};
</script>

<style scoped>
.sidebar-nav {
margin-bottom: 30px;
}
</style>


