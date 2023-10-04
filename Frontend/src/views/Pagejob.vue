<template>
  <div>
    <Navbarpage></Navbarpage>
    <br>
    <br>
    <Searchuser :types="search_types" @onSearch="onSearch($event)" />
    <br>
    <br>
    
    <div class="row xs">
  <div class="col-6 mb-4" v-for="item in jobs.result" :key="item.j_id">
    <div class="card h-100">
      <div class="row align-items-center">
        <div class="col-4 col-sm-3 text-center">
          <!-- เพิ่ม class "d-flex" เพื่อจัดให้รูปอยู่กลางแนวตั้งและแนวนอน -->
          <div class="d-flex align-items-center justify-content-center">
            <img :src="`/api/uploads/${item.j_image}`" :alt="item.j_name" class="img-apply">
          </div>
        </div>
        <div class="col-8 col-sm-9">
          <div class="card-body">
            <div style="color: black;"><i class="fa fa-user" aria-hidden="true"></i> ตำแหน่งงาน: {{ item.j_position }}</div>
            <div class="d-flex justify-content-between align-items-center">
              <div><i class="fa fa-home" aria-hidden="true"></i>   ชื่อร้าน : {{ item.j_name }}</div>
              <div class="btn-apply">
                <button @click="onDetail(item)" class="btn btn-info btn-orange">
                  <i class="fa fa-check-square-o" ></i>  รายละเอียด
                </button>
              </div>
            </div>
            <div><i class="fa fa-map-marker" aria-hidden="true"></i>  สถานประกอบการ : {{ item.j_location || 'ไม่มีข้อมูล!' }}</div>
            
          </div>
          <div><i class="fa fa-phone" aria-hidden="true"></i> เบอร์ติดต่อ: {{ item.j_phone|| 'ไม่มีข้อมูล!' }}</div>
        </div>
      </div>
    </div>
  </div>
</div>
<br>
    <br>

<div class="pagination-container">
  <Pagination :data="jobs" :page="page" @onPage="onPage($event)" />
</div>
<jobdetailDetailDialog :jobs="jobDetailItem" @onClose="jobDetailItem = null" @onBooking="jobItem = $event"/>
    <br>
    <br>
    <br>
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
  import Layoutuser from "@/components/Layoutuser";
  import Searchuser from "@/components/Searchuser";
  import Pagination from "@/components/Pagination";
  import Navbarpage from "@/components/Navbarpage";
  import jobdetailDetailDialog from "./jobdetail";
  import { mapState } from "vuex";
  export default {
  components: {
    Layoutuser  ,
    Searchuser,
    Pagination,
    Navbarpage,
    jobdetailDetailDialog
  
  },
  computed: {
    ...mapState(["jobs"])
  },
  created() {
    this.$store.dispatch("set_job_apply");
  },
  data() {
    return {
      search_types: [
      { name: "ค้นหางานทั้งหมด", value: "" },
      { name: "ค้นหาตำแหน่งงาน", value: "j_position" },
      { name: "ค้นหาชื่อร้าน", value: "j_name" },
      { name: "ค้นหาสถานประกอบการ ", value: "j_location" },
      { name: "ค้นหาเวลาที่ทำงาน ", value: "j_hour" },
      { name: "ค้นหาวันที่ทำงาน ", value: "j_day" },
      { name: "ค้าหารายได้ ต่อ (ชั่วโมง)", value: "j_salary" },
      
      ],
      page: 1,
      search: "",
      jobItem: null,
      jobDetailItem: null
    };
  },
  mounted() {
    this.$store.dispatch("set_job_apply");
  },
  methods: {
    
    onDetail(item) {
    this.jobDetailItem = item;
  },

    // การแบ่งหน้า Pagination
    onPage(page) {
    this.page = page;
    this.$store.dispatch("set_job_apply", {
      page: this.page,
      ...this.search
    });
  },
  // การค้นหาข้อมูล Filter
  onSearch(search) {
      this.search = search;
      this.page = 1;
      this.$store.dispatch("set_job_apply",
      { page: this.page, 
        ...this.search });
    }
  }
  };
  </script>
  
  <style scoped>
  .btn-menu {
  color: #ffffff;
  background-color: #ced4da;
  margin-right: 7px;
  min-width: 120px;
  }
  .btn.router-link-active {
  background-color: #ff5c05;
  }
  .card {
  color: #525b62;
  border-right: solid 5px #ff5c05;
  }
  .card-body {
  padding-left: 5px;
  }
 
  .btn-apply .btn {
  margin-right: 10px;
  width: 150px;
  margin-top: 15px;
  }
  
  
  .btn-orange {
      background-color: #ff6d43;
      color: white;
      border: 2px solid #ff6d43; 
  }
  
  .btn-orange:hover {
      background-color: rgb(37, 194, 134);
      border-color: rgb(37, 194, 134); 
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
  </style>
  