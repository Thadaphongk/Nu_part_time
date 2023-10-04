<template>
  <Layout>
      <div class="card">
          <div class="card-body">
              <header>
                  <h5><i class="fa fa-edit"></i> เพิ่ม/แก้ไข ข้อมูลงาน</h5>
              </header>
              <hr>
              
              <form @submit.prevent="onSubmit()">
                <div class="form-group">
    <label for="">ชื่อร้าน</label>
    <input type="text" name="j_name"
        v-model.trim="form.j_name" 
        v-validate="{ required: true }"
        :class="{ 'is-invalid': errors.has('j_name') }"
        class="form-control"
        readonly>
    <p class="invalid-feedback">{{ errors.first('j_name') }}</p>
</div>
<div class="form-group">
    <label for="j_location">สถานที่ประกอบการ</label>
    <input type="text" name="j_location"
        v-model.trim="form.j_location" 
        v-validate="{ required: true }"
        :class="{ 'is-invalid': errors.has('j_location') }"
        class="form-control"
        readonly
        style="pointer-events: none;">
    <p class="invalid-feedback">{{ errors.first('j_location') }}</p>
</div>

<div class="form-group">
    <label for="j_phone">เบอร์โทรศัพท์ติดต่อ</label>
    <input type="text" name="j_phone"
        v-model.trim="form.j_phone" 
        v-validate="{ required: true }"
        :class="{ 'is-invalid': errors.has('j_phone') }"
        class="form-control"
        readonly
        style="pointer-events: none;">
    <p class="invalid-feedback">{{ errors.first('j_phone') }}</p>
</div>
                  
                  <div class="form-group">
                      <label for="">ตำแหน่งงาน</label>
                      <input type="text" name="j_position"
                          v-model.trim="form.j_position" 
                          v-validate="{ required: true }"
                          :class="{ 'is-invalid': errors.has('j_position') }"
                          class="form-control">
                      <p class="invalid-feedback">{{ errors.first('j_position') }}</p>
                  </div>

                  <div class="form-group">
                      <label for="">จำนวนวันที่ทำงาน(สัปดาห์)</label>
                      <input type="text" name="j_day"
                          v-model.trim="form.j_day" 
                          v-validate="{ required: true }"
                          :class="{ 'is-invalid': errors.has('j_day') }"
                          class="form-control">
                      <p class="invalid-feedback">{{ errors.first('j_day') }}</p>
                      <div class="text" style="color: rgb(148, 144, 144); font-size: 13.5px;">เช่น. 3 วัน ,จันทร์,พุธ,ศุกร์ & ทุกวัน</div>
                  </div>
                  <div class="form-group">
                      <label for="">ช่วงเวลาที่ทำงาน(วัน)</label>
                      <input type="text" name="j_hour"
                          v-model.trim="form.j_hour" 
                          v-validate="{ required: true }"
                          :class="{ 'is-invalid': errors.has('j_hour') }"
                          class="form-control" >
                      <p class="invalid-feedback">{{ errors.first('j_hour') }}</p>
                      <div class="text" style="color: rgb(148, 144, 144); font-size: 13.5px;">เช่น. 09:00-18:00 น.</div>
                  </div>
                  <div class="form-group">
                      <label for="">รายได้ต่อ(ชม.)</label>
                      <input type="text" name="j_salary"
                          v-model.trim="form.j_salary" 
                          v-validate="{ required: true }"
                          :class="{ 'is-invalid': errors.has('j_salary') }"
                          class="form-control">
                      <p class="invalid-feedback">{{ errors.first('j_location') }}</p>
                  </div>
                  <div class="form-group">
                        <label for="">ลักษณะงาน</label>
                        <textarea 
                            v-model.trim="form.j_detail"
                            class="form-control" rows="4"></textarea>
                    </div>
                  



                  <div class="form-group">
                      <label class="btn btn-secondary btn-block">
                          <i class="fa fa-upload"></i> อัพโหลดภาพ
                          <input type="file" class="d-none" @change="onChangeFile($event.target)">
                      </label>

                      <img class="img-fluid" :src="form.j_image || '/img/no-image.png'" alt="image example">
                  </div>
                  
                  <div class="form-group mt-4 mb-5">
                      <div class="row">
                          <div class="col-sm-6">
                              <button type="submit" class="btn btn-info btn-block">
                                  บันทึกข้อมูล
                              </button>
                          </div>
                          <div class="col-sm-6">
                              <router-link :to="{ name: 'job-list' }" class="btn btn-danger btn-block">
                                  ยกเลิก
                              </router-link>
                          </div>
                      </div>
                  </div>
              </form>
          </div>
      </div>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import Axios from "axios";

export default {
components: {
  Layout
},
  data() {
    return {
      form: {
        j_name: "",
        j_image:"",
        j_phone:"",
        j_position:"",
        j_location:"",
        j_day:"",
        j_hour:"",
        j_salary:"",
        j_detail:"",
      }
    };
  },
  created() {
    // Use Axios to fetch the ownerlogin data from your server
    Axios.get('/api/owner/getownerlogin') // Replace with your actual API endpoint
      .then(response => {
        this.form.j_name = response.data.o_jobname;
        this.form.j_location = response.data.o_joblocation;
        this.form.j_phone = response.data.o_jobphone;  // Assuming ownerlogin is the data field you want to access
      })
      .catch(error => {
        console.error("Error fetching ownerlogin data:", error);
      });
  },
mounted() {
  this.initialUpdateItem();
},
watch: {
  "$route.query.id"() {
    this.form = {
      j_name: "",
      j_image:"",
      j_position:"",
      j_phone:"",
      j_location:"",
      j_day:"",
      j_hour:"",
      j_salary:"",
      j_detail:""
    };
    this.$validator.reset();
  }
},
methods: {
  // ส่งข้อมูลไปยัง Backend
  onSubmit() {
    this.$validator.validateAll().then(valid => {
      if (!valid) return;
      if (this.jquery.trim(this.form.j_image) == "")
        return this.alertify.warning("กรุณาอัพโหลดภาพ");
      // ตรวจสอบว่าเป็น การแก้ไขหรือการเพิ่มใหม่
      const updateId = this.$router.currentRoute.query.id;
      const request = isNaN(updateId)
        ? Axios.post("/api/job", this.form) // สร้างใหม่
        : Axios.put(`/api/job/${updateId}`, this.form); // แก้ไข
      // ส่งข้อมูลไปหา Server
      request
        .then(res => this.alertify.success("ทำรายการสำเร็จ"),this.$router.push({ name: "jobhistory" }))
        .catch(error => this.alertify.error("โปรดลองใหม่อีกครั้ง"));
    });
  },
  // เปลี่ยนไฟล์อัพโหลดเป็น Base64 string
  onChangeFile(input) {
    this.form.j_image = "";
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type.indexOf("image/") >= 0) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", () => {
          this.form.j_image = reader.result;
        });
        return;
      }
    }
    this.alertify.warning("กรุณาเลือกภาพที่จะอัพโหลด !");
  },
  // นำข้อมูลจาก Server ไปใส่ใน Form เพื่อทำการ update ใหม่
  initialUpdateItem() {
    const id = this.$route.query.id;
    if (isNaN(id)) return;
    Axios.get(`/api/job/${id}`)
      .then(res => {
        const form = res.data;
        this.form.j_phone = form.j_phone;
        this.form.j_name = form.j_name;
        this.form.j_day = form.j_day;
        this.form.j_hour = form.j_hour;
        this.form.j_salary = form.j_salary;
        this.form.j_detail = form.j_detail;
        this.form.j_location = form.j_location;
        this.form.j_image = form.j_image;
        this.form.j_position = form.j_position;
      })
      .catch(() => this.$router.push({ name: "jobhistory" }));
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
.btn.router-link-exact-active {
background-color: orange;
}
form {
max-width: 350px;
margin: auto;
}
form img {
border: solid 1px #6c757d;
}



</style>

