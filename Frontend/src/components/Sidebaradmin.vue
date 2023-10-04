<template>
    <div class="sidebar">
        <SidebarNav v-if="adminLogin.ad_role === 'admin'" :item="admin" class="sidebar-nav" />
        
    
    </div>
  </template>
  
  <script>
  import SidebarNav from "./SidebarNavadmin";
  import { mapState } from "vuex";
  export default {
  computed: {
    ...mapState({
      adminLogin: state => state.admin
    })
  },
  data() {
    return {
      admin: {
        header: "<i class='fa fa-user'></i> admin Page",
        navs: [
          { name: "จัดการผู้สมัครงาน", link: { name: "adminpage"  } },
          { name: "จัดการเจ้าของร้าน", link: { name: "adminjob" } },
          { name: "งานเจ้าของร้านทั้งหมด", link: { name: "adminvo" } },
          { name: "ใบสมัครผู้สมัครงาน ", link: { name: "adminname" } },
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