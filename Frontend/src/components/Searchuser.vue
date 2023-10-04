<template>
  <div class="centered-form">
    <div class="row justify-content-center">
  <h1>ค้นหางาน</h1>
</div>
<div class="container d-flex justify-content-center align-items-center">
  <form @submit.prevent="onSearch()" class="search-form form-inline">
    <select class="form-control" v-model="form.search_key">
      <option v-for="item in types" :key="item.value" :value="item.value">
        {{ item.name}} 
      </option>
    </select>

    <div>
      <input :type="getInputType" class="form-control" v-model.trim="form.search_text" placeholder="คำค้นหา">
    </div>
  
    <!-- ปุ่มค้นหา -->
    <button type="submit" class="btn btn-primary" style="background-color: #ff6d43; color: white; border: 1px solid white;">
  <i class="fa fa-search"></i> ค้นหา
</button>
   
  </form>
</div>
</div>

</template>


  
  <script>
  export default {
  
  props: {
    types: {
      type: Array,
      required: true
    }
  },
  computed: {
    // เปลี่ยนค่า type ให้กับ input
    getInputType() {
      const findType = this.types.find(
        type => type.value == this.form.search_key
      );
      if (findType && findType.type) return findType.type;
      return "text";
    }
  
},
  
  
  data() {
    return {
      form: {
        search_key: "",
        search_text: ""
      }
    };
  },
  mounted() {
    if (this.types && this.types.length > 0) {
      this.form.search_key = this.types[0].value;
    }
  },
  methods: {
    onSearch() {
      this.$emit("onSearch", this.form);
    }
  }
  };
  </script>
  
  
  <style scoped>
  .search-form {
  float: right;
  margin-bottom: 20px;
  }
  .form-control {
  margin-right: 23px;
  }
  .form-control:first-child {
  width: 250px;
  }
  .form-control:nth-child(2) {
  width: 250px;
  }
  .centered-form {
  padding: 50px;
  display: block;
  justify-content: center;
  align-items: center;
  height: 25vh; /* จัดให้ข้อมูลอยู่กลางหน้าจอ */
  margin-left: 0px;
  margin-right: 0px;
  background-image: url('/img/n2.jpg'); /* ระบุชื่อไฟล์ของรูปภาพที่คุณต้องการแทนที่ */
  background-size: cover; /* ปรับขนาดรูปภาพให้เต็มพื้นที่ของ div */
  background-repeat: no-repeat; /* ไม่ซ้ำภาพซ้ำในกรณีที่รูปภาพไม่พอเต็มพื้นที่ */
  background-position: center; /* จัดให้รูปภาพอยู่ตรงกลาง div */
  background-color: transparent; /* ลบสีพื้นหลัง (ถ้าคุณต้องการสีพื้นหลังให้ใส่สีที่ต้องการที่นี่) */
}
h1{
    margin-bottom: 1rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
}
.container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}
.row {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: auto;
    margin-left: auto;
}


  </style>
  
  