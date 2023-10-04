<template>
 <div>
  <Navbaruser :sessionData="sessionData" />
 

  <div class="card" style="margin-top: 90px;  margin-left: 200px;  margin-right: 200px;">  
          <div class="card-body">
              <header class="mb-4">
                  <h5><i class="fa fa-list-alt"></i> ตรวจสอบประวัติการสมัครงาน</h5>
              </header>

              <table class="table">
                  <thead>
                      <tr>
                        <th>รูปร้าน</th>
                        <th class="center-text">ชื่อร้าน</th>
                          <th class="center-text">ตำแหน่ง</th>                         
                          <th class="center-text">สถานที่ประกอบการ</th>
                          <th class="center-text">วันที่ทำงาน</th>
                          <th class="center-text">สถานะงานที่สมัคร</th>
                          <th class="center-text">การจัดการ</th>
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item of histories.result" :key="item.a_id" :class="getStatusClass(item)">
                      <td>
        <div class="img-container">
          <img :alt="item.j_name" :src="`/api/uploads/${item.j_image}`">
        </div>
      </td>
  <td class="center-text">{{ item.j_name }}</td>
  <td class="center-text">{{ item.j_position }}</td>
  <td class="center-text">{{ item.j_location }}</td>
  <td class="center-text">{{ item.j_hour }}</td>
  
  <td class="text-center">
   
    <label class="badge badge-success" v-if="item.a_status == 'allowed'">
      <i class="fa fa-check-square-o"></i> รอสัมภาษณ์งาน
    </label>

    <label class="badge badge-danger" v-if="item.a_status == 'not allowed'">
    <i class="fa fa-window-close"></i> ไม่ผ่าน
  </label>

  <label class="badge badge-warning" v-if="item.a_status == 'pending'">
    <i class="fa fa-hourglass"></i> รอดำเนินการ
  </label>

  

      
 
  </td>
<td class="center-text">
  <span v-if="item.a_status == 'pending'" class="cancel-button">
    <button class="btn btn-danger" @click="onDelete(item)">ยกเลิกสมัครงาน</button>
  </span>

  <span v-if="item.a_status == 'not allowed'" class="cancel-button">
    <button class="btn btn-danger" @click="onDelete(item)">ลบงาน</button>
  </span>

  <span v-if="item.a_status == 'allowed'" >
    <i class="fa fa-exclamation" aria-hidden="true"></i> รอการติดต่อกับเจ้าของร้าน
  </span>
</td>



  

</tr>

                    </tbody>
        

                  
                       
              </table>
              <br>
              <br>
              <br>
              <br>
              <br>
              <Pagination :page="page" :data="histories" @onPage="onPage($event)" />
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
import 'alertifyjs/build/css/alertify.min.css';
import alertify from 'alertifyjs' ;
import Layoutuser from "@/components/Layoutuser";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import Navbaruser from "@/components/Navbaruser";
import axios from 'axios'
import { mapState } from "vuex";
export default {
components: {
  Layoutuser,
  Search,
  Pagination,
  Navbaruser
},
computed: {
  ...mapState({
    histories: state => state.apply_histories
    
    
  })
},
data() {
  return {
    search_types: [
      { name: "งาน", value: "a_name" },
      { name: "วันที่เริ่ม", value: "a_created", type: "date" },
      { name: "วันที่สิ้นสุด", value: "a_updated", type: "date" }
    ],
    page: 1,
    search: {}, 
    sessionData: {
      u_firstname: null // เริ่มต้นด้วยค่า null

},
    
  };
},
mounted() {
  this.$store.dispatch("set_apply_histories");



},
created() {
    // ดึงข้อมูลจาก API และกำหนดค่าให้กับ u_firstname
    axios.get('/api/account/getUserLogin')
      .then(response => {
        this.sessionData.u_firstname = response.data.u_firstname;
      })
      .catch(error => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      });
  },
methods: {
  onDelete(item) {
        alertify.confirm()
          .setting({
            title: 'คุณต้องการยกเลิกงาน',
            message: 'คุณต้องการดำเนินการนี้หรือไม่?',
            labels: {
              ok: 'ตกลง',
              cancel: 'ยกเลิก'
            }
          })
          .set('onok', () => {
            axios.delete(`/api/applyadmin/manage/${item.a_id}`)
              .then(() => {
                this.$store.dispatch("set_apply_histories");
                alertify.success('ลบรายการสำเร็จ');
              })
              .catch(error => {
                this.alertify.error('โปรดเช็คงานของเจ้าของร้านทั้งหมด');
              });
          })
          .show();
      },
  // apply class ให้กับแถวใน Table
  getStatusClass(item) {
    const statusClass = {};
    statusClass[item.a_status] = true;
    return statusClass;
  },
  // Search filter
  onSearch(search) {
    this.search = search;
    this.$store.dispatch("set_apply_histories", {
      page: 1,
      ...this.search
    });
  },
  // Pagination
  onPage(page) {
    this.page = page;
    this.$store.dispatch("set_apply_histories", {
      page: this.page,
      ...this.search
    });
  }
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

  .cancel-button {
  margin-left: 25px; /* ปรับระยะห่างตามที่คุณต้องการ */
}


th {
    position: relative;
  }

  th::after {
    content: "";
    position: absolute;
    right: 50px; /* กำหนดระยะทางของการขยับไปทางขวา 20px */
  }

  .center-text {
    text-align: center;
  }
  .btn {
  width: 120px;
  height: 30px;
  border-radius: 0px;
  padding: 10px;
  font-size: 13px;
  line-height: 0.1; /* ปรับ line-height ให้เท่ากับ 1 */
}

.badge {
  width: 140px;
  border-radius: 0;
  font-weight: 400;
  font-size: 13px; /* ปรับ font-size เพื่อเพิ่มขนาดข้อความ */
  padding: 8px
}

</style>
