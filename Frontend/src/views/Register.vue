<template>
  <div>
    <Navbarlogin></Navbarlogin>
  <div class="register">
      <img src="/img/man.png" alt="Logo" class="img-logo">
      <div class="card">
          <h1 class="card-header">
              สมัครสมาชิกผู้สมัครงาน
          </h1>
          <div class="card-body">
              <form @submit.prevent="onSubmit()">
                  <div class="form-group">
                      <label for="">ชื่อผู้ใช้งาน</label>
                      <input type="text" name="u_username"
                          v-validate="{ required: true, regex: /^[A-Za-z0-9]{6,15}$/ }"
                          v-model.trim="form.u_username"
                          :class="{ 'is-invalid': errors.has('u_username') }"
                          class="form-control">
                      <span class="invalid-feedback">{{ errors.first('u_username') }}</span>
                  </div>

                  <div class="form-group">
                      <label for="">รหัสผ่าน</label>
                      <input type="password" name="u_password"
                          v-validate="{ required: true, regex: /^[A-Za-z0-9]{6,15}$/ }"
                          v-model.trim="form.u_password"
                          :class="{ 'is-invalid': errors.has('u_password') }"
                          class="form-control">
                      <span class="invalid-feedback">{{ errors.first('u_password') }}</span>
                  </div>

                  <div class="contianer">
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="">ชื่อ</label>
                    <input
                      type="text"
                      name="u_firstname"
                      v-validate="'required'"
                      v-model.trim="form.u_firstname"
                      :class="{ 'is-invalid': errors.has('u_firstname') }"
                      class="form-control"
                    />
                    <span class="invalid-feedback">{{
                      errors.first("u_firstname")
                    }}</span>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="">นามสกุล</label>
                    <input
                      type="text"
                      name="u_lastname"
                      v-validate="'required'"
                      v-model.trim="form.u_lastname"
                      :class="{ 'is-invalid': errors.has('u_lastname') }"
                      class="form-control"
                    />
                    <span class="invalid-feedback">{{
                      errors.first("u_lastname")
                    }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="contianer">
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="">รหัสนิสิต</label>
                    <input
                      type="text"
                      name="u_stuid"
                      v-validate="'required'"
                      v-model.trim="form.u_stuid"
                      :class="{ 'is-invalid': errors.has('u_stuid') }"
                      class="form-control"
                    />
                    <span class="invalid-feedback">{{
                      errors.first("u_stuid")
                    }}</span>
                  <div class="text" style="color: orange; font-size: 14px;">ไม่ใช่นิสิตใส่(-)</div>
                  </div>
                </div>
                <div class="col-3">
  <div class="form-group">
    <label for="">อายุ</label>
    <select
      name="u_age"
      v-validate="'required'"
      v-model.trim="form.u_age"
      :class="{ 'is-invalid': errors.has('u_age') }"
      class="form-control"
    >
      <option value="">--อายุ--</option>
      <option v-for="age in 100" :value="age">{{ age }}</option>
    </select>
    <span class="invalid-feedback">{{ errors.first("u_age") }}</span>
  </div>
</div>
                <div class="col-3">
    <div class="form-group">
        <label for="u_sex">เพศ</label>
        <select name="u_sex" v-validate="'required'" v-model.trim="form.u_sex" :class="{ 'is-invalid': errors.has('u_sex') }" class="form-control">
            <option value="">--เพศ--</option>
            <option value="ชาย">ชาย</option>
            <option value="หญิง">หญิง</option>
            <option value="อื่นๆ">อื่น ๆ</option>
        </select>
        <span class="invalid-feedback">{{ errors.first("u_sex") }}</span>
    </div>
</div>

               
              </div>
            </div>
            <div class="form-group">
                    <label for="">คณะ</label>
                      <select name="u_facy"
                    v-model.trim="form.u_fac"
                   v-validate="{ required: true }"
          :class="{ 'is-invalid': errors.has('u_fac') }"
          class="form-control">
                <option value="">------------------------กรุณาเลือกคณะ------------------------</option>
                <option value="วิทยาศาตร์">วิทยาศาตร์</option>
                <option value="วิศวะกรรมศาสตร์">วิศวะกรรมศาสตร์</option>
                <option value="วิทยาเกษตรศาสตร์ทรัพยากรธรรมชาตแิละสิ่งแวดล้อมศาตร์">เกษตรศาสตร์ทรัพยากรธรรมชาตแิละสิ่งแวดล้อม</option>
                <option value="ทันตแพทยศาสตร์">ทันตแพทยศาสตร์</option>
                <option value="พยาบาลศาสตร์">พยาบาลศาสตร์ </option>
                <option value="เภสัชศาสตร์">เภสัชศาสตร์</option>
                <option value="มนษุยศาสตร์">มนษุยศาสตร์</option>
                <option value="สังคมศาสตร์">สังคมศาสตร์</option>
                <option value="วิทยาศาสตร์การแพทย์">วิทยาศาสตร์การแพทย์</option>
                <option value="ศึกษาศาสตร์">ศึกษาศาสตร์</option>
                <option value="สาธารณสาธารสุขศาสตร์">สาธารณสาธารสุขศาสตร์ </option>
                <option value="บัณฑิตวิทยาลัย">บัณฑิตวิทยาลัย</option>
                <option value="สหเวชศาสตร์ ">สหเวชศาสตร์ </option>
                <option value="บุคคลทั่วไป">บุคคลทั่วไป </option>
  
  </select>
  <p class="invalid-feedback">{{ errors.first('u_fac') }}</p>
  <div class="text" style="color: orange; font-size: 14px;">ไม่ใช่นิสิต เลือก (บุคคลทั่วไป)</div>
</div>

            <div class="form-group">
                        <label for="">ความสามารถพิเศษ</label>
                        <textarea 
                            v-model.trim="form.u_po"
                            class="form-control" rows="4"></textarea>
                    </div>


                   <div v-if="errorMessage !== ''" class="alert alert-warning text-center">
      {{ errorMessage }}
    </div>

                  <div class="form-group buttons">
                    <button type="submit" class="btn btn-block btn-orange">
                      สมัครสมาชิก
                     </button>

                      <button type="button" @click="onRedirectToLogin()" class="btn btn-secondary btn-block">
                          เข้าสู่ระบบ
                      </button>
                  </div>
              </form>

          </div>
      </div>
  </div>
  </div>
</template>

<script> 

import Navbarlogin from "@/components/Navbarlogin";
import axios from "axios";
export default {
  components: {
    Navbarlogin
  },
data() {
  return {
    form: {
      u_username: "",
      u_password: "",
      u_firstname: "",
      u_lastname: "",
      u_stuid: "",
      u_fac: "",
      u_age: "",
      u_sex: "",
      u_po: "",
     

    },
    errorMessage: ""
  };
},
methods: {
  // บันทึกข้อมูลลงทะเบียน
  onSubmit() {
  this.$validator.validateAll().then(valid => {
    if (!valid) return;
    axios
      .post("api/account/register", this.form)
      .then(response => {
        this.onReset();
        this.onRedirectToLogin();
        this.alertify.success("สมัครสมาชิกสำเร็จ"); 
      })
      .catch(err => {
        this.errorMessage = "มีชื่อผู้ใช้อยู่แล้ว";
        this.alertify.error("เกิดข้อผิดพลาดในการสำรองข้อมูล"); 
      });
  });
},
  // ล้างค่า Form
  onReset() {
    this.errorMessage = null;
    this.$validator.reset();
    this.form = {
      u_username: "",
      u_password: "",
      u_firstname: "",
      u_lastname: "",
      u_stuid: "",
      u_fac: "",
      u_age: "",
      u_sex: "",
      u_po: "",
    };
  },
  // ไปที่หน้าเข้าสู่ระบบ
  onRedirectToLogin() {
    this.$router.push({ name: "login" });
  }
}
};
</script>

<style scoped>
.register {
  max-width: 650px;
  margin: 2% auto;
}
.img-logo {
width: 40%;
display: block;
margin: auto;
margin-bottom: 30px;
}
h1 {
font-size: 18px;
font-weight: 600;
text-align: center;
letter-spacing: 3px;
}
.card-body {
padding-left: 10%;
padding-right: 10%;
}
.buttons .btn-secondary {
margin-top: 20px;
}
.buttons {
margin-top: 30px;
margin-bottom: 50px;
}
.btn-orange {
    background-color:#ff6d43;
    color: white;
    transition: background-color 0.3s; 
}

.btn-orange:hover {
    background-color: #72d572; 
}
</style>


