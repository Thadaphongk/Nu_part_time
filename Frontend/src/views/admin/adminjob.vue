<template>
  <Layout>
    <div class="card">
      <div class="card-body">
        <header class="mb-4">
          <h5><i class="fa fa-user-circle-o"></i> จัดการผู้ประกอบการ</h5>
        </header>
        <table class="table">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>username</th>
              <th>ชื่อร้าน</th>
              <th>ชื่อ</th>
              <th>เบอร์ติดต่อ</th> 
              
              <th>แก้ไขล่าสุด</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in ownerset.result" :key="item.o_id">
              <td>{{ item.o_id }}</td>
              <td>{{ item.o_username }}</td>
              <td>{{ item.o_jobname || 'ไม่มีข้อมูล' }}</td>
              <td>{{ item.o_firstname }}</td>
              <td>{{ item.o_jobphone }}</td>
              
              <td class="text-center">
  <button @click="onUpdate(item)" class="btn btn-primary">
    ดูงาน
  </button>
  <button @click="onDelete(item)" class="btn btn-danger">
    <i class="fa fa-trash-o" aria-hidden="true"></i> ลบเจ้าของร้าน
  </button>
</td>
            </tr>
          </tbody>
        </table>
        <br>
        <br>
        <Pagination :data="ownerset" :page="page" @onPage="onPage($event)" />
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
     items: [] ,
      page: 1
    };
  },
  computed: {
    ...mapState(["ownerset"])
  },
  components: {
    Layout,
    Pagination,
    Search
  },
  created() {
    this.$store.dispatch("set_ownerset");
  },
  methods: {
  

    // แก้ไขข้อมูลโดยส่ง id ไปที่หน้า Form create
    onUpdate(item) {
      this.$router.push({ name: "adminvo", query: { id: item.o_id } });
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
            Axios.delete(`/api/ownerset/${item.o_id}`)
              .then(() => {
                this.$store.dispatch("set_ownerset");
                alertify.success('ลบรายการสำเร็จ');
              })
              .catch(error => {
                this.alertify.error('โปรดลบงานของเจ้าของร้านทั้งหมด');
              });
          })
          .show();
      },
    
    // การแบ่งหน้า Pagination
    onPage(page) {
      this.page = page;
      this.$store.dispatch("set_ownerset", {
        page: this.page,
        ...this.search
      });
    },
    // การค้นหาข้อมูล Filter
     onSearch(search) {
        this.search = search;
        this.page = 1;
        this.$store.dispatch("set_ownerset",
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
  