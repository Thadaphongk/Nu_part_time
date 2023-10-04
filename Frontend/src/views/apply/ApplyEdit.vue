<template>
    <div>
     <Navbaruser :sessionData="sessionData" />
    
   
     <div class="card" style="margin-top: 90px;  margin-left: 200px;  margin-right: 200px;">  
        <div class="card-body">
        <header class="mb-4">
          <h5><i class="fa fa-cogs"></i> แก้ไขข้อมูลร้าน</h5>
        </header>

        <div class="table-responsive">
          <table class="table table-striped table-bordered">
            <thead>
              <tr>

                
                <th></th>
                
                <th>ชื่อผู้ใช้</th>
                <th> รหัสนิสิต </th>
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th>คณะ</th>
                
                
                <th class="text-center">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in userlogin.result" :key="item.u_id">
                <td></td>
                <td>{{ item.u_username }}</td>
                <td>{{ item.u_stuid }}</td>
                <td>{{ item.u_firstname }}</td>
                <td>{{ item.u_lastname}}</td>
                <td>{{ item.u_fac}}</td>
                <td class="text-center">
  <button @click="onUpdate(item)" class="button-custom">
    แก้ไข
  </button>
</td>
              </tr>
            </tbody>
          </table>
        </div>
                 <br>
                 <br>
                 <br>
                 <br>
             </div>
          
          
          
           </div>
         
         
           <br>
                 <br>
                 <br>
                 <br>
   
           
          
     <!-- info section -->
     <section class="info_section ">
       <div class="container">
         <div class="row">
           <div class="col-md-3">
             <div class="info_logo">
               <a class="navbar-brand" href="index.html">
                 <span>
                   Student Nu 63  
                 </span>
               </a>
               <p>
                 undergraduate thesis A web application for part-time jobs for 
   Naresuan University students
               </p>
             </div>
           </div>
           <div class="col-md-3">
             <div class="info_links">
               <h5>
                 Naresuan university
               </h5>
               <ul>
                 <li>
                   <a href="">
                     Department of Computer Science and Information Technology, Faculty of Science, Naresuan University
                   </a>
                 </li>
                
                
             
               </ul>
             </div>
           </div>
           <div class="col-md-3">
             <div class="info_info">
               <h5>
                 Contact Us
               </h5>
             </div>
             <div class="info_contact">
               <a href="" class="">
                 <i class="fa fa-map-marker" aria-hidden="true"></i>
                 <span>
                   52 lamphun thailand
                 </span>
               </a>
               <a href="" class="">
                 <i class="fa fa-phone" aria-hidden="true"></i>
                 <span>
                   Call : 0931575222
                 </span>
               </a>
               <a href="" class="">
                 <i class="fa fa-envelope" aria-hidden="true"></i>
                 <span>
                   thadarphongk63@nu.ac.th
                 </span>
               </a>
             </div>
           </div>
           <div class="col-md-3">
             <div class="info_form ">
               <h5>
                 Social subscribe
               </h5>
              
               <div class="social_box">
                 <a href="https://www.facebook.com/momooo555zaza">
                   <i class="fa fa-facebook" aria-hidden="true"></i>
                 </a>
                 <a href="">
                   <i class="fa fa-twitter" aria-hidden="true"></i>
                 </a>
                 <a href="https://www.youtube.com/channel/UCSn6LirH0saiNwgBLKSjk7g">
                   <i class="fa fa-youtube" aria-hidden="true"></i>
                 </a>
                 <a href="https://www.instagram.com/ken_thadar/">
                   <i class="fa fa-instagram" aria-hidden="true"></i>
                 </a>
               </div>
             </div>
           </div>
         </div>
       </div>
       
     </section>
   
   </div>       
         
         
         
         
     
         
   </template>
   
   <script>
   import Layout from "@/components/Layout";
   import Pagination from "@/components/Pagination";
   import Search from "@/components/Search";
   import Navbaruser from "@/components/Navbaruser";
   import { mapState } from "vuex";
   import Axios from "axios";
   export default {
   
   computed: {
     ...mapState(["userlogin"])
   },
   data() {
  return {
    sessionData: {
      u_firstname: null // เริ่มต้นด้วยค่า null

},
    
  };
},
   components: {
     Layout,
     Pagination,
     Search,
     Navbaruser
   },
   created() {
     this.$store.dispatch("set_userlogin");

     Axios.get('/api/account/getUserLogin')
      .then(response => {
        this.sessionData.u_firstname = response.data.u_firstname;
      })
      .catch(error => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      });
  
   },
   methods: {
     // แก้ไขข้อมูลโดยส่ง id ไปที่หน้า Form create
     onUpdate(item) {
       this.$router.push({ name: "Applyset", query: { id: item.u_id } });
     },
     // ลบข้อมูล
     
     
   }
   };
   </script>
   
   
   <style scoped>
   .btn-menu {
   color: #ffffff;
   background-color: #ced4da;
   margin-right: 7px;
   min-width: 130px;
   }
   .btn.router-link-active {
   background-color: #17a2b8;
   }
   .badge {
   width: 100px;
   border-radius: 0;
   font-weight: 400;
   }
   .allowed td {
   color: #28a745;
   }
   .not.allowed td {
   color: #dc3545;
   }
   
     /* CSS สำหรับปรับขนาดการ์ดและบรรทัด */
     .row.xs .card {
     margin-bottom: 10px; /* ปรับระยะห่างระหว่างการ์ดในบรรทัด */
   }
   
   .row.xs .card img.img-apply {
     max-width: 100%; /* ปรับขนาดภาพในการ์ดให้ไม่เกินความกว้างของการ์ด */
     height: auto;
   }
   
   /* ปรับขนาดของการ์ดเมื่อหน้าจอเล็ก (xs) */
   @media (max-width: 767px) {
     .row.xs .card {
       width: 100%; /* ทำให้การ์ดเต็มความกว้างของบรรทัด */
     }
   }
   
   .row {
       display: -ms-flexbox;
       display: -webkit-box;
       display: flex;
       -ms-flex-wrap: wrap;
       flex-wrap: wrap;
       margin-right: 0px;
       margin-left: 0px;
   }
   
   /* CSS เพื่อปรับขนาดรูปภาพให้ตรงขอบของการ์ด */
   .card img.img-apply {
     max-width: 100%;
     max-height: 100%;
     display: block;
     margin: 0 auto;
     object-fit: cover; /* ปรับขนาดรูปภาพให้เต็มขอบของการ์ดโดยไม่ทำให้สูงหรือกว้างเกิน */
   }
   
   .row.xs .card {
     margin-bottom: 10px;
     height: 100%; /* จำกัดความสูงของการ์ดให้เท่ากัน */
   }
   .pagination-container {
     display: flex;
     justify-content: center;
     align-items: center;
     /* ปรับขนาดและลักษณะของ Pagination ตามความต้องการ */
   }
   .info_section {
       background-color: #565552;
       color: #ffffff;
       padding: 75px 0 10px 0;
     }
     
     .info_section .row > div {
       margin-bottom: 25px;
     }
     
     .info_section h5 {
       margin-bottom: 25px;
       font-size: 24px;
     }
     
     .info_section .info_logo {
       display: -webkit-box;
       display: -ms-flexbox;
       display: flex;
       -webkit-box-orient: vertical;
       -webkit-box-direction: normal;
           -ms-flex-direction: column;
               flex-direction: column;
       -webkit-box-align: start;
           -ms-flex-align: start;
               align-items: flex-start;
     }
     
     .info_section .info_logo .navbar-brand {
       padding: 0;
       margin-bottom: 20px;
     }
     
     .info_section .info_logo .navbar-brand span {
       font-size: 24px;
       color: #ffffff;
     }
     
     .info_section .info_links ul {
       padding: 0;
     }
     
     .info_section .info_links ul li {
       list-style-type: none;
     }
     
     .info_section .info_links ul li a {
       color: #ffffff;
     }
     
     .info_section .info_contact {
       display: -webkit-box;
       display: -ms-flexbox;
       display: flex;
       -webkit-box-orient: vertical;
       -webkit-box-direction: normal;
           -ms-flex-direction: column;
               flex-direction: column;
     }
     
     .info_section .info_contact a {
       color: #ffffff;
       margin-bottom: 10px;
     }
     
     .info_section .info_contact a i {
       font-size: 20px;
       margin-right: 5px;
     }
     
     .info_section .info_form form input {
       outline: none;
       border: none;
       width: 100%;
       padding: 7px 10px;
       border-radius: 30px;
     }
     
     .info_section .info_form form button {
       padding: 8px 35px;
       outline: none;
       border: none;
       color: #ffffff;
       background: #f1db25;
       border-radius: 30px;
       margin-top: 15px;
       text-transform: uppercase;
     }
     
     .info_section .info_form .social_box {
       margin-top: 25px;
       width: 100%;
       display: -webkit-box;
       display: -ms-flexbox;
       display: flex;
     }
     
     .info_section .info_form .social_box a {
       margin-right: 10px;
       color: #ffffff;
       font-size: 20px;
     }
     .btn {
color: #ffffff;
background-color: #ced4da;
margin-right: 7px;
min-width: 130px;
}
.btn.router-link-active {
background-color: #17a2b8;
}
.button-custom {
  background-color: red; /* สีเริ่มต้นเป็นสีแดง */
  color: white; /* สีข้อความเป็นสีขาว */
  border: none;
  padding: 5px 10px;
  transition: background-color 0.3s; /* เพิ่มการเปลี่ยนสีเบาๆ เมื่อ hover */
}

.button-custom:hover {
  background-color: green; /* เปลี่ยนเป็นสีเขียวเมื่อ hover */
}
   
   </style>
   