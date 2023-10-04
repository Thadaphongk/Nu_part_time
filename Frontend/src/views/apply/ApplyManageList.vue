<template>
  <Layout>
    
      <div class="card">
          <div class="card-body">
              <header class="mb-4">
                  <h5><i class="fa fa-list-alt"></i> ตรวจสอบผู้สมัครงาน</h5>
              </header>

               <table class="table">
                  <thead>
                      <tr>
                        <th>รูปผู้สมัครงาน</th>
                          <th>ชื่อสมัครงาน</th>
                          <th>เบอร์โทรติดต่อ</th>
                          <th>ตำแหน่ง</th>
                          <th></th>
                      </tr>
                  </thead>

                  <tbody>
                      <tr v-for="item in applys.result" :key="item.a_id" :class="getApplyStatusClass(item)">
                        <td>
        <div class="img-container">
          <img :alt="item.a_name" :src="`/api/uploads/${item.a_photo}`">
        </div>
      </td>
                        <td>{{ item.a_name }}</td>
                          <td>{{ item.a_phone }}</td>
                          <td>{{ item.j_position}}</td>
                          <td class="btns">
                              <div v-if="item.a_status === 'pending'">
                                  <button @click="onUpdateStatus('allowed', item)" class="btn btn-sm btn-success mr-2">
                                      <i class="fa fa-check-circle"></i> อนุมัติ
                                  </button>

                                  <button @click="onUpdateStatus('not allowed', item)" class="btn btn-sm btn-danger mr-2">
                                      <i class="fa fa-times-circle"></i> ไม่อนุมัติ
                                  </button>

                                  <button @click="onDetail(item)" class=" btn btn-sm btn-primary">
                                      <i class="fa fa-search"></i> ดูข้อมูล
                                  </button>  
                              </div>

                              <div v-if="item.a_status === 'allowed'">
                                  <i class="fa fa-check-circle"></i> รอสัมภาษณ์งาน
                                  <button @click="onDelete(item)" class="btn btn-sm btn-success ml-3">
                                      <i class="fa fa-check"></i> ยืนยัน
                                  </button>
                              </div>

                              <div v-if="item.a_status === 'not allowed'">
                                  <i class="fa fa-times-circle"></i> ไม่อนุมัติ

                                  <button @click="onDelete(item)" class="btn btn-sm btn-danger ml-2">
                                      <i class="fa fa-trash"></i> ลบทิ้ง
                                  </button>
                              </div>
                          </td>
                      </tr>
                  </tbody>
               </table>
               <br>
              <br>
              <br>
              <br>
              <br>
              <br>
              <br>
              <br>
              <br>
               <Pagination :data="applys" :page="page" @onPage="onPage($event)" />
               <ApplyDetailJob :job="jobDetail" @onClose="jobDetail = null"  />
          </div>
      </div>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import ApplyDetailJob from "./ApplyDetailJob";
import { mapState } from "vuex";
import Axios from "axios";
export default {
components: {
  Layout,
  Search,
  Pagination,
  ApplyDetailJob
},
computed: {
  ...mapState(["applys"])
},
data() {
  return {
    search_types: [
      { name: "หัวข้อประชุม", value: "a_name" },
      { name: "วันที่เริ่ม", value: "a_studentid" },
      { name: "วันที่สิ้นสุด", value: "a_resume" }
    ],
    page: 1,
    search: {},
    jobDetail: null,
  };
},
mounted() {
  this.initialLoadapply();
},
methods: {

  onDetail(item) {
    this.jobDetail = item;
  },
  // ลบข้อมูลการจอง
  onDelete(item) {
  this.alertify.confirm("คุณต้องการทำรายการต่อไปหรือไม่?", () => {
    Axios.delete(`/api/apply/manage/${item.a_id}`)
      .then(response => this.initialLoadapply())
      .catch(error => this.alertify.error(error.response.data.message));
  });
},
  // เปลี่ยนสถานะการจองห้องประชุม
  onUpdateStatus(a_status, item) {
  this.alertify.confirm("คุณต้องการทำรายการต่อไปหรือไม่?", () => {
    Axios.put(`/api/apply/manage/${item.a_id}`, { a_status })
      .then(response => this.initialLoadapply())
      .catch(error => this.alertify.error(error.response.data.message));
  });
},

  // เปลี่ยน สถานะการจองเป็น ชื่อ class
  getApplyStatusClass(item) {
    const statusClass = {};
    statusClass[item.a_status] = true;
    return statusClass;
  },
  // ค้นหาข้อมูล
  onSearch(search) {
    this.search = search;
    this.$store.dispatch("set_apply", { page: 1, ...this.search });
  },
  // แบ่งหน้าเพจ
  onPage(page) {
    this.page = page;
    this.$store.dispatch("set_apply", {
      page: this.page,
      ...this.search
    });
  },
  // โหลดข้อมูลรายการจองห้องประชุม
  initialLoadapply() {
    this.$store.dispatch("set_apply");
  }
}
};
</script>


<style scoped>
.btns {
width: 300px;
text-align: right;
}
.btns .btn {
width: 82px;
}

tr.allowed td {
color: #28a745;
}

tr.not.allowed td {
color: #dc3545;
}
</style>

