<template>
    <div class="layout">
        <Navbar :sessionData="sessionData"  />
        <div class="container-fluid">
         <slot name="buttons"></slot>
            <div class="row">
              <Sidebar />
              <div class="col-sm-10">
                   <slot></slot>
                </div>
                <div class="col-sm-3">
                    
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import Navbar from "../components/Navbaradmin";
  import Sidebar from "../components/Sidebaradmin";
  import axios from 'axios';
  export default {
    components: {
    Navbar,
    Sidebar
  },
    data() {
    return {
      sessionData: {
        ad_firstname: null // เริ่มต้นด้วยค่า null
  
  
      }
    }
  },
  // created() {
  //     // ดึงข้อมูลจาก API และกำหนดค่าให้กับ u_firstname
  //     axios.get('/api/owner/getownerlogin')
  //       .then(response => {
  //         this.sessionData.ad_firstname = response.data.ad_firstname;
  //       })
  //       .catch(error => {
  //         console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
  //       });
  //   },
  };
  </script>
  
  <style scoped>
  .container-fluid {
  margin-top: 50px;
  margin-left: 0px;
  }
  
  .row {
      display: -ms-flexbox;
      display: -webkit-box;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      margin-right: 0px;
      margin-left: 50px;
  }
  
  </style>
  
  