<template>
  <Layout>
    

       <div class="card">
          <div class="card-body">
              <header class="mb-4">
                  <h5><i class="fa fa-list-alt"></i> รายการข้อมูลงาน</h5>
              </header>

              <table class="table">
                  <thead>
                      <tr>
                          <th>รูปงาน</th>
                          <th>ชื่อร้าน</th>                         
                          <th>สถานที่ประกอบการ</th>
                          <th>ตำแหน่งงานที่รับ</th>
                         
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in histories.result" :key="item.j_id">
                      <td>
        <div class="img-container">
          <img :alt="item.j_name" :src="`/api/uploads/${item.j_image}`">
        </div>
      </td>
  <td>{{ item.j_name }}</td>
  <td>{{ item.j_location }}</td>
  <td>{{ item.j_position}}</td>

  <td class="text-right">
        <i @click="onUpdate(item)" class="pointer fa fa-edit text-info mr-3"></i>
        <i @click="onDelete(item)" class="pointer fa fa-trash text-danger"></i>
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
  </Layout>
</template>

<script>
import 'alertifyjs/build/css/alertify.min.css';
import alertify from 'alertifyjs' ;
import Layout from "@/components/Layout";
import Search from "@/components/Search";
import Axios from "axios";
import Pagination from "@/components/Pagination";
import { mapState } from "vuex";
export default {
components: {
  Layout,
  Search,
  Pagination
},
computed: {
  ...mapState({
    histories: state => state.job_histories
    
    
  })
},
data() {
  return {
    search_types: [
      { name: "งาน", value: "" },
      { name: "วันที่เริ่ม", value: "", type: "date" },
      { name: "วันที่สิ้นสุด", value: "", type: "date" }
    ],
    page: 1,
    search: {},
    
  };
},
mounted() {
  this.$store.dispatch("set_job_histories");



},
methods: {
    // แก้ไขข้อมูลโดยส่ง id ไปที่หน้า Form create
    onUpdate(item) {
    this.$router.push({ name: "job-form", query: { id: item.j_id } });
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
          Axios.delete(`/api/job/${item.j_id}`)
            .then(() => {
              this.$store.dispatch("set_job_histories");
              alertify.success('ลบรายการสำเร็จ');
            })
            .catch(error => {
              this.alertify.error(error.response.data.message);
            });
        })
        .show();
    },

  // Search filter
  onSearch(search) {
    this.search = search;
    this.$store.dispatch("set_job_histories", {
      page: 1,
      ...this.search
    });
  },
  // Pagination
  onPage(page) {
    this.page = page;
    this.$store.dispatch("set_job_histories", {
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
</style>
