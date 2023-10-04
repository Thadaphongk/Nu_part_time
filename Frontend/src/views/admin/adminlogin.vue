<template>
    <div>
      <Navbaradmin></Navbaradmin>
      <div class="login ">
                  <img src="/img/admin.png " alt="Logo" class="img-logo">
                  <div class="card">
                      <h1 class="card-header">
                          เข้าสู่ระบบ Admin
                   </h1>
                      <div class="card-body ">
  
                          <form @submit.prevent="onSubmit()">
                              <div class="form-group">
                                  <label for="">username</label>
                                  <input type="text" name="ad_username"
                                  v-validate="{required : true }"
                                      v-model.trim="form.ad_username"
                                      :class="{ 'is-invalid': errors.has('ad_username') }"
                                      class="form-control">
                                  <span class="invalid-feedback">{{ errors.first('ad_username') }}</span>
                              </div>
  
                              <div class="form-group">
                                  <label for="">password</label>
                                  <input type="password" name="ad_password"
                                      v-validate="{required : true  }"
                                      v-model.trim="form.ad_password"
                                      :class="{ 'is-invalid': errors.has('ad_password') }"
                                      class="form-control">
                                  <span class="invalid-feedback">{{ errors.first('ad_password') }}</span>
                              </div>
                              <div v-if=" errorMessage"  class="alert alert-warning text-center">
                                    {{ errorMessage }}
                                </div>
                           
                              <div class="form-group buttons">
                                <button type="submit" class="btn btn-block btn-orange">
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
  
  import Navbaradmin from "@/components/Navbarloginadmin";
  import axios from 'axios';
  export default {
    components: {
        Navbaradmin
    },
    data() {
      return {
        form: {
          ad_username: "",
          ad_password: ""
        },
        errorMessage:""
      };
    },
    methods: {
      // ส่งข้อมูลไปตรวจสอบ
      onSubmit() {
          this.$validator.validateAll().then( valid => {
               if (!valid) return;
                 axios
                .post("api/admin/login",this.form)
                .then(response => {this.$router.push({name:'adminpage'})})
                .catch(err => (this.errorMessage = err.response.data.message));
               
          });
      },
    
    }
  };
  </script>
  
  <style scoped>
  .login{
  max-width: 550px;
  margin: auto;
  }
  .img-logo {
    width: 43%;
    display: block;
    margin: auto;
    margin-top: 5%;
    margin-bottom: 20px;
  }
  h1 {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    letter-spacing: 2px;
  }
  .card {
    margin-bottom: 15%;
  }
  .card-body {
    padding-left: 15%;
    padding-right: 15%;
  }
  .buttons .btn-secondary {
    margin-top: 20px;
  }
  .buttons {
    margin-top: 30px;
    margin-bottom: 50px;
  }
  
  .btn-orange {
      background-color: #1c96ed;
      color: white;
      transition: background-color 0.3s; 
  }
  
  .btn-orange:hover {
      background-color: #72d572; 
  }
  
  .card {
    border-color: #1c96ed;
}

.card-header {
    background-color: #1c96ed;
    color: #FFFFFF;
}
  
  
  </style>
  
  
  