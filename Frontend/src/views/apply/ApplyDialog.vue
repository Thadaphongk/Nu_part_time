<template>
    <div class="modal fade" tabindex="-1" role="dialog" id="apply-dialog">
        <div class="modal-dialog" role="document">
          <form class="modal-content" @submit.prevent="onSubmit()">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fa fa-tags"></i> สมัครงาน
                    </h5>

                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="image-container">
                <div class="form-group">
                    
                  <img class="img-fluid" :src="form.a_photo || '/img/j1.png'" alt="image example">
                      <label class="custom-upload-btn">
                          <i class="fa fa-upload"></i> อัพโหลดรูป
                          <input type="file" class="d-none" @change="onChangeFile($event.target)">
                      </label>
                  </div>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="">ชื่อ</label>
                        <input type="text" name="a_name"
                            v-model.trim="form.a_name"
                            v-validate="{ required: true }"
                            :class="{ 'is-invalid': errors.has('a_name') }"
                            class="form-control" readonly>
                        <p class="invalid-feedback">{{ errors.first('a_name') }}</p>
                    </div> 


                    <div class="form-group">
                        <label for="">นามสกุล</label>
                        <input type="text" name="a_lastname"
                            v-model.trim="form.a_lastname"
                            v-validate="{ required: true }"
                            :class="{ 'is-invalid': errors.has('a_lastname') }"
                            class="form-control" readonly>
                        <p class="invalid-feedback">{{ errors.first('a_lastname') }}</p>
                    </div> 
                    
                    <div class="form-group">
                        <label for="">เพศ</label>
                        <input type="text" name="a_sex"
                            v-model.trim="form.a_sex"
                            v-validate="{ required: true }"
                            :class="{ 'is-invalid': errors.has('a_sex') }"
                            class="form-control" readonly>
                        <p class="invalid-feedback">{{ errors.first('a_sex') }}</p>
                    </div> 

                    <div class="form-group">
                        <label for="">คณะ</label>
                        <input type="text" name="a_faculty"
                            v-model.trim="form.a_faculty"
                            v-validate="{ required: true }"
                            :class="{ 'is-invalid': errors.has('a_faculty') }"
                            class="form-control" readonly>
                        <p class="invalid-feedback">{{ errors.first('a_faculty') }}</p>
                    </div> 


                    <div class="form-group">
                        <label for="">รหัสนิสิต</label>
                        <input type="number" name="a_studentid"
                            v-model.trim="form.a_studentid"
                            v-validate="{ required: true }"
                            :class="{ 'is-invalid': errors.has('a_studentid') }"
                            class="form-control" readonly>
                        <p class="invalid-feedback">{{ errors.first('a_studentid') }}</p>
                    </div> 






                    <div class="form-group">
                        <label for="">อายุ</label>
                        <input type="text" name="a_date"
                            v-model.trim="form.a_date"
                            v-validate="{ required: true }"
                            :class="{ 'is-invalid': errors.has('a_date') }"
                            class="form-control" readonly>
                        <p class="invalid-feedback">{{ errors.first('a_date') }}</p>
                    </div> 



                    <div class="form-group">
                        <label for="">เบอร์โทรติดต่อ</label>
                        <input type="text" name="a_phone"
                            v-model.trim="form.a_phone"
                            v-validate="{ required: true }"
                            :class="{ 'is-invalid': errors.has('a_phone') }"
                            class="form-control" >
                        <p class="invalid-feedback">{{ errors.first('a_phone') }}</p>
                        <div class="text" style="color: red; font-size: 14px;">ex. 083-xxx-xxxx</div>
                    </div> 


                 


                    

                    <div class="form-group">
                        <label for="">ลักษณะนิสัย</label>
                        <textarea 
                            v-model.trim="form.a_resume"
                            class="form-control" rows="4"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="">ความสามารถพิเศษ</label>
                        <textarea 
                            v-model.trim="form.a_set"
                            class="form-control" rows="4"></textarea>
                    </div>

                    <div class="modal-footer">
                    <button type="submit" class="btn btn-orange btn-block mt-2 mb-4">สมัครงาน</button>
                  </div>
              </div>
            </form>
          </div>
        </div>
</template>

<script>
import Axios from "axios";
export default {
  props: {
  jobs: {
    required: true
  }
},
watch: {
  jobs(value) {
    if (!value) return;
    this.jquery("#apply-dialog").modal();
    this.form.tb_detailJob_j_id = value.j_id; // ตรงนี้
  }
},
data() {
  return {
    form: {
      tb_detailJob_j_id: "",
      a_photo:"",
      a_name:"",       
      a_lastname: "",
      a_studentid: "",
      a_faculty: "",
      a_date: "",
      a_phone:"",
      a_sex:"",
      a_resume: "",
      a_set: ""
  
    }
  };
},
  mounted() {
    // ตรวจจับ Event การปิดหน้า Modal dialog
    this.jquery("#apply-dialog").on("hide.bs.modal", event => {
      this.$emit("onClose", event);
    });
  },
  
  mounted() {
    Axios.get('/api/account/getUserLogin') // Replace with your actual API endpoint
      .then(response => {
        this.form.a_name = response.data.u_firstname;
        this.form.a_lastname = response.data.u_lastname;
        this.form.a_studentid = response.data.u_stuid;
        this.form.a_faculty = response.data.u_fac;
        this.form.a_date = response.data.u_age;
        this.form.a_sex = response.data.u_sex;
        this.form.a_set = response.data.u_po;
       // Assuming ownerlogin is the data field you want to access
      })
      .catch(error => {
        console.error("Error fetching ownerlogin data:", error);
      });
},
  methods: {
    // บันทึกข้อมูล
  onSubmit() {
  this.$validator.validateAll().then(valid => {
    if (!valid) return;
    if (this.jquery.trim(this.form.a_photo) == "")
        return this.alertify.warning("กรุณาอัพโหลดภาพ");
    
        const requestData = { ...this.form };
    // ส่งข้อมูลไปยัง Server
    Axios.post("/api/showapply", requestData)
      .then(response => {
        this.onReset();
        this.jquery("#apply-dialog").modal("hide");
      })
      .catch(err => this.alertify.error(err.response.data.message));
  });
},

onChangeFile(input) {
    this.form.a_photo = "";
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type.indexOf("image/") >= 0) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", () => {
          this.form.a_photo = reader.result;
        });
        return;
      }
    }
    this.alertify.warning("กรุณาเลือกภาพที่จะอัพโหลด !");
  },
    // ล้างข้อมูลจาก Form
onReset() {
      this.$validator.reset();
      this.form = {
        tb_detailJob_j_id: "",
        a_name:"",
        a_photo:"",
        a_lastname: "",
        a_studentid: "",
        a_faculty: "",
        a_date: "",
        a_phone: "",
        a_sex:"",
        a_resume: "",
        a_set: ""
        
      };
    }
  }
};
</script>

<style scoped>
.modal {
  color: #525b62;
}
.modal-body,
.modal-footer {
  padding-left: 8%;
  padding-right: 8%;
}
.form-check {
  margin-bottom: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.img-equipment {
  width: 100px;
  height: 70px;
  border: solid 1px #d0d0d0;
  display: inline-block;
  margin: 1px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
}
.btn-orange {
  background-color: #ff6d43;
  color: #fff;
}
.btn.btn-orange:hover {
    background-color: #51c151; /* เปลี่ยนสีเขียวเข้มเมื่อ hover */
    color: #fff; /* เปลี่ยนสีตัวอักษรเป็นสีขาว */
  }

  .image-container {
    text-align: center; /* Center the content horizontally */
}

.img-fluid {
    max-width: 50%; /* Make sure the image doesn't exceed the container width */
    height: auto; /* Maintain the image's aspect ratio */
    display: block; /* Remove any extra spacing around the image */
    margin: 0 auto; /* Center the image horizontally within its container */
}
.custom-upload-btn {
    background-color: #ff6d43; /* Change the background color to blue */
    color: white; /* Change the text color to white */
    padding: 10px 20px; /* Adjust the padding to make the button shorter */
    border-radius: 5px; /* Add rounded corners */
    cursor: pointer; /* Show a pointer cursor on hover for better user experience */
}
</style>




