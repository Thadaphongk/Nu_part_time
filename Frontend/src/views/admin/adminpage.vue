<template>
  <Layout>
    <div class="card">
      <div class="card-body">
        <header class="mb-4">
          <h5><i class="fa fa-address-book"></i> จัดการผู้สมัครงาน</h5>
        </header>
        <table class="table">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>username</th>
              <th>ชื่อ</th>
              <th>นามสกุล</th>
              <th>คณะ</th>
              <th>แก้ไขล่าสุด</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in userset.result" :key="item.u_id">
              <td>{{ item.u_id }}</td>
              <td>{{ item.u_username }}</td>
              <td>{{ item.u_firstname}}</td>
              <td>{{ item.u_lastname}}</td>
              <td>{{ item.u_fac || 'ไม่มีข้อมูล' }}</td>
              <td class="text-center">
  <button @click="onUpdate(item)" class="btn btn-primary">
    ดูใบสมัคร
  </button>
  <button @click="onDelete(item)" class="btn btn-danger">
    <i class="fa fa-trash-o" aria-hidden="true"></i> ลบผู้สมัครงาน
  </button>
</td>
            </tr>
          </tbody>
        </table>
        <br>
        <br>
        <Pagination :data="userset" :page="page" @onPage="onPage($event)" />
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
  import { mapState } from "vuex";
  import Axios from "axios";
  export default {
  data() {
    return {
      page: 1,
      items: [] 
    };
  },
  computed: {
    ...mapState(["userset"])
  },
  components: {
    Layout,
    Pagination,
    Search
  },
  created() {
    this.$store.dispatch("set_userset");
  },
  methods: {
  

    // แก้ไขข้อมูลโดยส่ง id ไปที่หน้า Form create
    onUpdate(item) {
      this.$router.push({ name: "adminname"});
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
            Axios.delete(`/api/accountset/${item.u_id}`)
              .then(() => {
                this.$store.dispatch("set_userset");
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
      this.$store.dispatch("set_userset", {
        page: this.page,
        ...this.search
      });
    },
    // การค้นหาข้อมูล Filter
     onSearch(search) {
        this.search = search;
        this.page = 1;
        this.$store.dispatch("set_userset",
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
  