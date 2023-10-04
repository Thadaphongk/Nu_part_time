<template>
    <nav class="navbar navbar-expand-sm ">
   <div class="container-fluid">
     <a class="navbar-brand" href="#">
       <img src="/img/logo2.png" alt="Logo">
     </a>
     <ul class="navbar-nav ml-auto" style="margin-right: 40px;">
         <li class="nav-item" v-if="sessionData && sessionData.ad_firstname">
           <a class="nav-link-style" href="">
             <i class="fa fa-user-circle-o" aria-hidden="true"></i> <!-- Font Awesome user icon -->
             ชื่อเจ้าของร้าน : {{ sessionData.ad_firstname }}
           </a>
         </li>
       </ul>
   </div>
   <a @click="onLogout()" class="btn-logout">
     <i class="fa fa-sign-out" aria-hidden="true"></i>
 </a>
 </nav>
 
      
 
         
 </template>
 <script>
 import axios from 'axios';
 export default {
   props: {
     sessionData: null
   },
    name:"navbar",
    methods:  {
     onLogout(){
       axios
       .post("/api/admin/logout")
       .then(response =>{
         this.$store.commit("set_admin", null);
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
   border-bottom: solid 4px #1c96ed;
   padding-right: 0;
   
 }
 .navbar-brand img {
   width: 300px;
   height: 300px;
 }
 
 .btn-logout {
   width: 80px;
   height: 60px;
   color: #ffffff;
   background-color: #1c96ed;
   font-size: 24px;
   text-align: center;
   line-height: 60px;
   cursor: pointer;
   
 }
 
 .btn-logout i {
     color: white; /* กำหนดสีขาวให้กับไอคอนภายใน .btn-logout */
 }
 /* สไตล์สำหรับเปลี่ยนลิงก์ให้เป็นสี่เหลี่ยมขณะโฮเวอร์ */
 .navbar-nav .nav-item .nav-link {
   color: #000; /* สีข้อความเมนูเมื่อไม่โฮเวอร์ */
   position: relative; /* เพิ่มความสำคัญให้กับพื้นที่สี่เหลี่ยม */
 }
 
 .navbar-nav .nav-item .nav-link::before {
   content: ""; /* สร้างส่วนหน้าของสี่เหลี่ยม */
   position: block; /* ตำแหน่งสัมผัสสี่เหลี่ยม */
   width: 3px; /* ความกว้างของสี่เหลี่ยม */
   height: 100%; /* ความสูงของสี่เหลี่ยม */
   background-color: #ff6d43; /* สีของสี่เหลี่ยมเมื่อโฮเวอร์ */
   left: -5px; /* ระยะห่างซ้ายของสี่เหลี่ยม */
   top: 0; /* ตำแหน่งบนของสี่เหลี่ยม */
   transform: scaleY(0); /* ความสูงเริ่มต้นของสี่เหลี่ยมเป็น 0 */
   transition: transform 0.3s, background-color 0.3s; /* เพิ่มอายุการแสดงผลสี่เหลี่ยมและสีพื้นหลัง */
 }
 
 .navbar-nav .nav-item .nav-link:hover::before {
   transform: scaleY(1); /* เปลี่ยนความสูงของสี่เหลี่ยมเป็น 1 เมื่อโฮเวอร์ */
   background-color: gray; /* เปลี่ยนสีพื้นหลังเมื่อโฮเวอร์ */
 }
 .nav-divider {
   margin: 0 10px; /* ระยะห่างระหว่างเส้นขั้น */
   border-left: 1px solid #000; /* สีและหนาของเส้นขั้น */
   height: 40px; /* ความสูงของเส้นขั้น */
 }
 .navbar-nav .nav-item .nav-link.active {
   color: #999; /* เปลี่ยนสีข้อความในลิงก์ที่กำลังถูกคลิกเป็นสีเทา */
 }.nav-link-style {
   color: #000; /* Text color */
   text-decoration: none; /* Remove underlines from links */
   position: relative; /* Add a position for pseudo-elements */
   transition: color 0.3s; /* Smooth color transition on hover */
 }
 
 .nav-link-style::before {
   content: "";
   position: absolute;
   width: 3px; /* Line width */
   height: 100%; /* Line height */
   background-color: #ff6d43; /* Line color */
   left: -5px; /* Position the line to the left of the link */
   top: 0; /* Align the line with the top of the link */
   transform: scaleY(0); /* Initially hide the line */
   transition: transform 0.3s, background-color 0.3s; /* Transition effect */
 }
 
 .nav-link-style:hover {
   color: #010101; /* Change text color on hover */
 }
 
 .nav-link-style:hover::before {
   background-color: #ff6d43; /* Change line color on hover */
 }
 
 .nav-divider {
   margin: 0 10px; /* Adjust the space between items as needed */
   border-left: 3px solid #ccc; /* Color and thickness of the separator */
   height: 30px; /* Adjust the height of the separator as needed */
 }
 </style>
 