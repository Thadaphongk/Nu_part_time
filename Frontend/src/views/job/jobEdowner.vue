<template>
  <Layout>
    <div class="card mb-3">
      <div class="card-body">
        <header class="mb-4">
          <h5><i class="fa fa-cogs"></i> แก้ไขข้อมูลร้าน</h5>
        </header>

        <div class="table-responsive">
          <table class="table table-striped table-bordered">
            <thead>
              <tr>

                
                <th>ชื่อผู้ใช้</th>
                <th>ชื่อร้าน</th>
                <th>เบอร์โทรศัพท์</th>
                <th>สถานที่ปฎิบัติงาน</th>
                
                <th class="text-center">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in ownerlogin.result" :key="item.o_id">
                <td>{{ item.o_username }}</td>
                <td>{{ item.o_jobname }}</td>
                <td>{{ item.o_jobphone }}</td>
                <td>{{ item.o_joblocation }}</td>
                <td class="text-center">
  <button @click="onUpdate(item)" class="button-custom">
    แก้ไข
  </button>
</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import { mapState } from "vuex";
import Axios from "axios";
export default {

computed: {
  ...mapState(["ownerlogin"])
},
components: {
  Layout,
  Pagination,
  Search,

},
created() {
  this.$store.dispatch("set_ownerlogin");
},
methods: {
  // แก้ไขข้อมูลโดยส่ง id ไปที่หน้า Form create
  onUpdate(item) {
    this.$router.push({ name: "Editowner", query: { id: item.o_id } });
  },
  // ลบข้อมูล
  
  
}
};
</script>

<style  scoped>
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


