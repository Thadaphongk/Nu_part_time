<template>
    <nav class="navbar navbar-expand-sm">
      <div class="container-fluid">
        <a class="navbar-brand" href="/Apply/job">
          <img src="/img/logo1.png" alt="Logo">
        </a>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="/Apply/job" class="nav-link">หางาน</a>
          </li>
          <li class="nav-divider"></li>
          
          <li class="nav-item">
            <a href="/login" class="nav-link">เข้าสู่ระบบผู้สมัครงาน</a>
          </li>

          <!-- เพิ่มเส้นขั้นกลางระหว่าง "สมัครสมาชิก" และ "สำหรับเจ้าของร้าน" -->
          <li class="nav-divider"></li>
          <li class="nav-item">
            <a href="/loginowner" class="nav-link">สำหรับเจ้าของร้าน</a>
          </li>

          <li class="nav-divider"></li>
          <li class="nav-item">
            <a href="/about" class="nav-link">แจ้งปัญหา</a>
          </li>
          
        </ul>
      </div>
      
    </nav>
  </template>
  
 <script>
 import axios from 'axios';
 export default {
    name:"Navbarpage",
    methods:  {
     onLogout(){
       axios
       .post("/api/account/logout")
       .then(response =>{
         this.$store.commit("set_user", null);
         console.log(this.$store.state.user);
         this.$router.push({name : "Pagejob"});
       })
       .catch(error => alert(error.response.data.message));
     }
    }
    
 };
 
 </script>
 <style scoped>
 .navbar {
   background-color: #ffffff;
   height: 60px;
   border-bottom: solid 4px #ff6d43;
   padding-right: 0;
   
 }
 .navbar-brand img {
   width: 350px;
   height: 350px;
 }
 
 .btn-logout {
   width: 80px;
   height: 60px;
   color: #ffffff;
   background-color: #ff6d43;
   font-size: 24px;
   text-align: center;
   line-height: 60px;
   cursor: pointer;
   
 }
 
 .btn-logout i {
     color: white; /* กำหนดสีขาวให้กับไอคอนภายใน .btn-logout */
 }

.nav-divider {
  margin: 0 10px; /* ระยะห่างระหว่างเส้นขั้น */
  border-left: 2px solid rgb(207, 197, 197); /* สีและหนาของเส้นขั้น */
  height: 35px; /* ความสูงของเส้นขั้น */
}
.navbar-nav .nav-item .nav-link.active {
  color: #999; /* เปลี่ยนสีข้อความในลิงก์ที่กำลังถูกคลิกเป็นสีเทา */
}

/* สีเมนูเมื่อไม่ hover */
.nav-link {
  color: #333; /* เปลี่ยนสีตามที่คุณต้องการ */
  transition: color 0.3s, box-shadow 0.3s; /* เพิ่มอนิเมชันเมื่อเปลี่ยนสีและเมื่อเริ่มและสิ้นสุด hover */
}

/* สีเมนูเมื่อ hover */
.nav-link:hover {
  color: #ff5733; /* เปลี่ยนสีตามที่คุณต้องการเมื่อ hover */
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2); /* เพิ่มเงาด้านข้างเมื่อ hover */
}

/* สีเมนูเมื่อ active */
.nav-link.active {
  color: #ff5733; /* เปลี่ยนสีตามที่คุณต้องการเมื่อ active */
}


 </style>
 