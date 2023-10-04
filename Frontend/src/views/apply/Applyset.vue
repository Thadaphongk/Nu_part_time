<template>
    <div>
     <Navbaruser :sessionData="sessionData" />
    
   
     <div class="card" style="margin-top: 90px;  margin-left: 200px;  margin-right: 200px;">  
        <div class="card mb-3">
            <div class="card-body">
                <header>
                    <h5><i class="fa fa-cog"></i> แก้ไขข้อมูลส่วนตัว</h5>
                </header>
                <hr>
                
                <form @submit.prevent="onSubmit()">
                    <div class="form-group">
                        <label for="">ชื่อผู้สมัครงาน</label>
                        <input type="text" name="u_firstname"
                            v-model.trim="form.u_firstname" 
                            v-validate="{ required: true }"
                            :class="{ 'is-invalid': errors.has('u_firstname') }"
                            class="form-control" readonly>
                           
                        <p class="invalid-feedback">{{ errors.first('u_firstname') }}</p>
                        
                    </div>
                    <div class="form-group">
                        <label for="">นามสกุล</label>
                        <input type="text" name="u_lastname"
                            v-model.trim="form.u_lastname" 
                            v-validate="{ required: true }"
                            :class="{ 'is-invalid': errors.has('u_lastname') }"
                            class="form-control"  readonly>
                        <p class="invalid-feedback">{{ errors.first('u_lastname') }}</p>
                    </div>





                    <div class="form-group">
                        <label for="">รหัสนิสิต</label>
                        <input type="text" name="u_stuid"
                            v-model.trim="form.u_stuid" 
                            v-validate="{ required: true }"
                            :class="{ 'is-invalid': errors.has('u_stuid') }"
                            class="form-control"  >
                        <p class="invalid-feedback">{{ errors.first('u_stuid') }}</p>
                    </div>

                    <div class="form-group">
                    <label for="">คณะ</label>
                      <select name="u_facy"
                    v-model.trim="form.u_fac"
                   v-validate="{ required: true }"
          :class="{ 'is-invalid': errors.has('u_fac') }"
          class="form-control">
                <option value="">------------------------กรุณาเลือกคณะ------------------------</option>
                <option value="วิทยาศาตร์">วิทยาศาตร์</option>
                <option value="วิศวะกรรมศาสตร์">วิศวะกรรมศาสตร์</option>
                <option value="วิทยาเกษตรศาสตร์ทรัพยากรธรรมชาตแิละสิ่งแวดล้อมศาตร์">เกษตรศาสตร์ทรัพยากรธรรมชาตแิละสิ่งแวดล้อม</option>
                <option value="ทันตแพทยศาสตร์">ทันตแพทยศาสตร์</option>
                <option value="พยาบาลศาสตร์">พยาบาลศาสตร์ </option>
                <option value="เภสัชศาสตร์">เภสัชศาสตร์</option>
                <option value="มนษุยศาสตร์">มนษุยศาสตร์</option>
                <option value="สังคมศาสตร์">สังคมศาสตร์</option>
                <option value="วิทยาศาสตร์การแพทย์">วิทยาศาสตร์การแพทย์</option>
                <option value="ศึกษาศาสตร์">ศึกษาศาสตร์</option>
                <option value="สาธารณสาธารสุขศาสตร์">สาธารณสาธารสุขศาสตร์ </option>
                <option value="บัณฑิตวิทยาลัย">บัณฑิตวิทยาลัย</option>
                <option value="สหเวชศาสตร์ ">สหเวชศาสตร์ </option>
                <option value="บุคคลทั่วไป">บุคคลทั่วไป </option>
  
  </select>
  <p class="invalid-feedback">{{ errors.first('u_fac') }}</p>
  
</div>

<div class="contianer">
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="">อายุ</label>
                    <input
                      type="text"
                      name="u_age"
                      v-validate="'required'"
                      v-model.trim="form.u_age"
                      :class="{ 'is-invalid': errors.has('u_age') }"
                      class="form-control"
                    />
                    <span class="invalid-feedback">{{
                      errors.first("u_age")
                    }}</span>
                  </div>
                </div>
                <div class="col-6">
  <div class="form-group">
    <label for="u_sex">เพศ</label>
    <select
      name="u_sex"
      v-validate="'required'"
      v-model.trim="form.u_sex"
      :class="{ 'is-invalid': errors.has('u_sex') }"
      class="form-control"
    >
      <option value="">โปรดเลือกเพศ</option>
      <option value="ชาย">ชาย</option>
      <option value="หญิง">หญิง</option>
      <option value="อื่น ๆ">อื่น ๆ</option>
    </select>
    <span class="invalid-feedback">{{ errors.first("u_sex") }}</span>
  </div>
</div>
              </div>
            </div>
                   


                    <div class="form-group">
                        <label for="">ความสามารถพิเศษ</label>
                        <textarea 
                            v-model.trim="form.u_po"
                            class="form-control" rows="4"></textarea>
                    </div>

                   

      
        
     
      
                    <div class="form-group mt-4 mb-5">
                        <div class="row">
                            <div class="col-sm-6">
    <button type="submit" class="btn btn-primary btn-block mb-2"> <!-- แก้เป็น btn-primary -->
        บันทึกข้อมูล
    </button>
</div>
<div class="col-sm-6">
    <router-link :to="{ name: 'jobEdowner' }" class="btn btn-danger btn-block mb-2">
        ยกเลิก
    </router-link>
</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div> 
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
import Axios from "axios";
import Navbaruser from "@/components/Navbaruser";
export default {
  components: {
    Layout,
    Navbaruser
  },
  data() {
    return {
      form: {
        u_firstname: "",
        u_lastname: "",
        u_stuid: "",
        u_fac: "",
        u_age: "",
        u_sex: "",
        u_po: "",
      },
      sessionData: {
      u_firstname: null // เริ่มต้นด้วยค่า null

},
    };
  },
  created() {

Axios.get('/api/account/getUserLogin')
 .then(response => {
   this.sessionData.u_firstname = response.data.u_firstname;
 })
 .catch(error => {
   console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
 });

},
  mounted() {
    this.initialUpdateItem();
  },
  watch: {
    "$route.query.id"() {
      this.form = {
        u_firstname: "",
        u_lastname: "",
        u_stuid: "",
        u_fac: "",
        u_age: "",
        u_sex: "",
        u_po: "",
      };
      this.$validator.reset();
    }
  },
  methods: {
    // ส่งข้อมูลไปยัง Backend
    onSubmit() {
      this.$validator.validateAll().then(valid => {
        if (!valid) return;
        // if (this.jquery.trim(this.form.eq_image) == "")
        //   return this.alertify.warning("กรุณาอัพโหลดภาพ");
        // ตรวจสอบว่าเป็น การแก้ไขหรือการเพิ่มใหม่
        const updateId = this.$router.currentRoute.query.id;
        const request = isNaN(updateId)
          ? Axios.post("/api/equipment", this.form) // สร้างใหม่
          : Axios.put(`/api/account/${updateId}`, this.form); // แก้ไข
        // ส่งข้อมูลไปหา Server
        request
          .then(res => this.$router.push({ name: "ApplyEdit" }))
          .catch(error => this.alertify.error(error.response.data.message));
      });
    },
  
    // นำข้อมูลจาก Server ไปใส่ใน Form เพื่อทำการ update ใหม่
    initialUpdateItem() {
      const id = this.$route.query.id;
      if (isNaN(id)) return;
      Axios.get(`/api/account/${id}`)
        .then(res => {
          const form = res.data;
          this.form.u_firstname = form.u_firstname;
          this.form.u_lastname = form.u_lastname;
          this.form.u_stuid = form.u_stuid;
          this.form.u_fac = form.u_fac;
          this.form.u_age = form.u_age;
          this.form.u_sex = form.u_sex;
          this.form.u_po = form.u_po;
      
        })
        .catch(() => this.$router.push({ name: "ApplyEdit" }));
    }
  }
};
</script>

<style scoped>


form {
  max-width: 350px;
  margin: auto;
}
form img {
  border: solid 1px #6c757d;
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