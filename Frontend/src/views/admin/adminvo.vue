<template>
  <Layout>
    

       <div class="card">
          <div class="card-body">
              <header class="mb-4">
                <Search :types="search_types" @onSearch="onSearch($event)" />
                  <h5><i class="fa fa-archive"></i> งานผู้ประกอบการ</h5>
              </header>

              <table class="table">
                  <thead>
                      <tr>
                        <th style="text-align: left; padding-left: 50px;">รูปงาน</th>
                        <th>ชื่อร้านค้า</th>  
                        <th>ชื่อเจ้าของร้าน</th> 
                        <th>นามสกุล</th> 
                        <th>Username</th>  
                        <th>แก้ไขล่าสุด</th>
                
                      </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in job_admin.result" :key="item.j_id">
                      <td >
  <div class="img-container">
    <img :alt="item.j_name" :src="`/api/uploads/${item.j_image}`" style="max-width: 100%; max-height: 100%;">
  </div>
</td>
<td>{{ item.j_name }}</td>
<td>{{ item.o_firstname}}</td>
<td>{{ item.o_lastname}}</td>
<td>{{ item.o_username }}</td>

<td class="text-center">
  <button @click="onUpdate(item)" class="btn btn-primary">
     <i class="fa fa-pencil-square-o" aria-hidden="true"></i> แก้ไขงาน
  </button>
  <button @click="onDelete(item)" class="btn btn-danger">
    <i class="fa fa-trash-o" aria-hidden="true"></i> ลบงาน
  </button>
</td>
</tr>
</tbody>        
</table>
<br>
              <br>
              <br>
              <br>
              <br>
              <Pagination :page="page" :data="job_admin" @onPage="onPage($event)" />
          </div>
       </div>
  </Layout>
</template>

<script>
import 'alertifyjs/build/css/alertify.min.css';
import alertify from 'alertifyjs' ;
import Layout from "@/components/Layoutadmin";
import Search from "@/components/Search";
import Axios from "axios";
import Pagination from "@/components/Paginationadmin";
import { mapState } from "vuex";
export default {
components: {
  Layout,
  Search,
  Pagination
},
computed: {
  ...mapState({
    ...mapState(["job_admin"])
  })
},
data() {
  return {
    search: {},
    page: 1,
    search_types: [
    { name: "ชื่อร้านค้า", value: "j_name" },
    { name: "ชื่อเจ้าของร้าน", value: "o_firstname" },
    { name: "Username", value: "o_username"},
      
    ],
   items: [] 
  };
},

created() {
  this.$store.dispatch("set_job_admin");
},
methods: {
    // แก้ไขข้อมูลโดยส่ง id ไปที่หน้า Form create
    onUpdate(item) {
    this.$router.push({ name: "adminvoedit", query: { id:item.j_id } });
  },
  // ลบข้อมูล
  onDelete(item) {
      alertify.confirm()
        .setting({
          title: 'ลบรายการ',
          message: 'คุณต้องการดำเนินการนี้หรือไม่?',
          labels: {
            ok: 'ตกลง',
            cancel: 'ยกเลิก'
          }
        })
        .set('onok', () => {
          Axios.delete(`/api/jobsadmin/${item.j_id}`)
            .then(() => {
              this.$store.dispatch("set_job_admin");
              alertify.success('ลบรายการสำเร็จ');
            })
            .catch(error => {
              this.alertify.error('โปรดลบใบสมัครงานจากร้านนี้ทั้งหมด');
            });
        })
        .show();
    },

  // Search filter
  onSearch(search) {
    this.search = search;
    this.$store.dispatch("set_job_admin", {
      page: 1,
      ...this.search
    });
  },
  // Pagination
  onPage(page) {
    this.page = page;
    this.$store.dispatch("set_job_admin", {
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

.btn {
    
    margin-right: 7px;
    min-width: 130px;
  }
  .btn.router-link-active {
    background-color: #1c96ed;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
  }

  .table th, .table td {
    border: 1px solid #e4e4e4;
    padding: 8px;
    text-align: center;
  }

  .table th:nth-child(4), .table td:nth-child(4) {
    width: 15%;
  }

  .table th {
    background-color: #1c96ed;
    color: #fff;
  }

  .table tr:nth-child(even) {
    background-color: #f2f2f2;
  }

 

  .card {
    border-color: #1c96ed;
  }

</style>
