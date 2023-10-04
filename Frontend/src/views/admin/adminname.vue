<template>
  <Layout>
    <div class="card">
      <div class="card-body">
        <header class="mb-4">
          <Search :types="search_types" @onSearch="onSearch($event)" />
          <h5><i class="fa fa-book"></i> จัดการผู้สมัครงาน</h5>
        </header>
        <table class="table">
          <thead>
            <tr>
              <th>รูปผู้สมัครงาน</th>
              <th>ชื่อผู้สมัครงาน</th>
              <th>ร้านที่สมัครงาน</th>
              <th>เบอร์ติดต่อ</th>
              <th>ชื่อเจ้าของร้าน</th>
              <th>แก้ไขล่าสุด</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in applyadmin.result" :key="item.a_id">
              <td >
  <div class="img-container">
    <img :alt="item.a_photo" :src="`/api/uploads/${item.a_photo}`" style="max-width: 100%; max-height: 100%;">
  </div>
</td>
              <td>{{ item.a_name }}</td>
              <td>{{ item.j_name }}</td>
              <td>{{ item.j_phone }}</td>
              <td>{{ item.o_firstname || 'ไม่มีข้อมูล' }}</td>
              <td class="text-center">
  <button @click="onDetail(item)" class="btn btn-primary">
    ดูใบสมัคร
  </button>
  <button @click="onDelete(item)" class="btn btn-danger">
    <i class="fa fa-trash-o" aria-hidden="true"></i>  ลบใบสมัครงาน
  </button>
</td>
            </tr>
          </tbody>
        </table>
        <br>
        <br>
        <Pagination :data="applyadmin" :page="page" @onPage="onPage($event)" />
        <ApplyDetailJob :job="jobDetail" @onClose="jobDetail = null"  />
      </div>
    </div>
  </Layout>
</template>
  
  <script>
  
  import 'alertifyjs/build/css/alertify.min.css';
  import alertify from 'alertifyjs' ;
  import Layout from "@/components/Layoutadmin";
  import Pagination from "@/components/Paginationadmin";
  import Search from "@/components/Search";
  import ApplyDetailJob from "./adminnameedit";
  import { mapState } from "vuex";
  import Axios from "axios";
  export default {
  data() {
    return {
      search: {},
      page: 1,
      items: [] ,
      search_types: [
    { name: "ชื่อผู้สมัครงาน", value: "a_name" },
    { name: "ชื่อร้านที่สมัครงาน", value: "j_name"},
    { name: "ชื่อเจ้าของร้าน", value: "o_firstname" }
    
      
    ],
    jobDetail: null,
    };
  },
  computed: {
    ...mapState(["applyadmin"])
  },
  components: {
    Layout,
    Pagination,
    Search,
    ApplyDetailJob
  },
  created() {
    this.$store.dispatch("set_applyadmin");
  },
  methods: {
  
    onDetail(item) {
    this.jobDetail = item;
  },
    // แก้ไขข้อมูลโดยส่ง id ไปที่หน้า Form create
    onUpdate(item) {
      this.$router.push({ name: "adminnameedit"});
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
            Axios.delete(`/api/applyadmin/manage/${item.a_id}`)
              .then(() => {
                this.$store.dispatch("set_applyadmin");
                alertify.success('ลบรายการสำเร็จ');
              })
              .catch(error => {
                this.alertify.error('โปรดเช็คงานของเจ้าของร้านทั้งหมด');
              });
          })
          .show();
      },
    
    // การแบ่งหน้า Pagination
    onPage(page) {
      this.page = page;
      this.$store.dispatch("set_applyadmin", {
        page: this.page,
        ...this.search
      });
    },
    // การค้นหาข้อมูล Filter
     onSearch(search) {
        this.search = search;
        this.page = 1;
        this.$store.dispatch("set_applyadmin",
        { page: this.page, 
          ...this.search });
      }
    },
    };
  
  </script>
  
  <style  scoped>
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
  