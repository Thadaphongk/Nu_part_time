<template>
    <Layout>
     
        <div class="card mb-3">
            <div class="card-body">
                <header>
                    <h5><i class="fa fa-cog"></i> แก้ไขข้อมูลร้าน</h5>
                </header>
                <hr>
                
                <form @submit.prevent="onSubmit()">
                    <div class="form-group">
                        <label for="">ชื่อเจ้าของร้าน</label>
                        <input type="text" name="o_firstname"
                            v-model.trim="form.o_firstname" 
                            v-validate="{ required: true }"
                            :class="{ 'is-invalid': errors.has('o_firstname') }"
                            class="form-control"  readonly>
                           
                        <p class="invalid-feedback">{{ errors.first('o_firstname') }}</p>
                        
                    </div>


        
                    <div class="form-group">
                        <label for="">นามสกุล</label>
                        <input type="text" name="o_lastname"
                            v-model.trim="form.o_lastname" 
                            v-validate="{ required: true }"
                            :class="{ 'is-invalid': errors.has('o_lastname') }"
                            class="form-control"  readonly>
                        <p class="invalid-feedback">{{ errors.first('o_lastname') }}</p>
                    </div>


                    <div class="form-group">
                        <label for="">ชื่อร้าน</label>
                        <input type="text" name="o_jobname"
                            v-model.trim="form.o_jobname" 
                            v-validate="{ required: true }"
                            :class="{ 'is-invalid': errors.has('o_jobname') }"
                            class="form-control">
                        <p class="invalid-feedback">{{ errors.first('o_jobname') }}</p>
                    </div>

                    <div class="form-group">
                        <label for="">เบอร์โทรศัพท์</label>
                        <input type="text" name="o_jobphone"
                            v-model.trim="form.o_jobphone" 
                            v-validate="{ required: true }"
                            :class="{ 'is-invalid': errors.has('o_jobphone') }"
                            class="form-control">
                        <p class="invalid-feedback">{{ errors.first('o_jobphone') }}</p>
                    </div>


                    <div class="form-group">
                        <label for="">สถานที่ปฎิบัติงาน</label>
                        <input type="text" name="o_joblocation"
                            v-model.trim="form.o_joblocation" 
                            v-validate="{ required: true }"
                            :class="{ 'is-invalid': errors.has('o_joblocation') }"
                            class="form-control">
                        <p class="invalid-feedback">{{ errors.first('o_joblocation') }}</p>
                    </div>



                    

                    <!-- <div class="form-group">
                        <label class="btn btn-secondary btn-block">
                            <i class="fa fa-upload"></i> อัพโหลดภาพ
                            <input type="file" class="d-none" @change="onChangeFile($event.target)">
                        </label>

                        <img class="img-fluid" :src="form.eq_image || '/img/no-image.png'" alt="image example">
                    </div> -->

                    <div class="form-group mt-4 mb-5">
                        <div class="row">
                            <div class="col-sm-6">
                                <button type="submit" class="btn btn-info btn-block mb-2">
                                    บันทึกข้อมูล
                                </button>
                            </div>
                            <div class="col-sm-6">
                                <router-link :to="{ name: 'jobEdowner' }" class="btn btn-danger btn-block mb-2">
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
        o_firstname: "",
        o_lastname: "",
        o_jobname: "",
        o_jobphone: "",
        o_joblocation : ""
      }
    };
  },
  mounted() {
    this.initialUpdateItem();
  },
  watch: {
    "$route.query.id"() {
      this.form = {
        o_firstname: "",
        o_lastname: "",
        o_jobname: "",
        o_jobphone: "",
        o_joblocation : ""
      };
      this.$validator.reset();
    }
  },
  methods: {
    // ส่งข้อมูลไปยัง Backend
    onSubmit() {
      this.$validator.validateAll().then(valid => {
        if (!valid) return;
        // if (this.jquery.trim(this.form.eq_image) == "")
        //   return this.alertify.warning("กรุณาอัพโหลดภาพ");
        // ตรวจสอบว่าเป็น การแก้ไขหรือการเพิ่มใหม่
        const updateId = this.$router.currentRoute.query.id;
        const request = isNaN(updateId)
          ? Axios.post("/api/equipment", this.form) // สร้างใหม่
          : Axios.put(`/api/owner/${updateId}`, this.form); // แก้ไข
        // ส่งข้อมูลไปหา Server
        request
          .then(res => this.$router.push({ name: "jobEdowner" }))
          .catch(error => this.alertify.error(error.response.data.message));
      });
    },
    // เปลี่ยนไฟล์อัพโหลดเป็น Base64 string
    onChangeFile(input) {
      this.form.eq_image = "";
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        if (file.type.indexOf("image/") >= 0) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.addEventListener("load", () => {
            this.form.eq_image = reader.result;
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
      Axios.get(`/api/owner/${id}`)
        .then(res => {
          const form = res.data;
          this.form.o_firstname = form.o_firstname;
          this.form.o_lastname = form.o_lastname;
          this.form.o_jobname = form.o_jobname;
          this.form.o_jobphone = form.o_jobphone;
          this.form.o_joblocation = form.o_joblocation;
        })
        .catch(() => this.$router.push({ name: "jobEdowner" }));
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
  background-color: #17a2b8;
}
form {
  max-width: 350px;
  margin: auto;
}
form img {
  border: solid 1px #6c757d;
}
</style>

