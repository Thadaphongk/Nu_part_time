<template>
  <div class="layoutuser">
    <Navbaruser />
    <div class="container fluid"> 
      <slot name="buttons"></slot>
      <div class="row">
       
        <div class="col-md-52">
          <slot></slot>
        </div>
    
         
     
      </div>
    </div>
  
  
  </div>
</template>
  
  <script>
  import Navbar from "../components/Navbar";
  import Sidebar from "../components/Sidebar";
  import Navbaruser from "./Navbaruser.vue";
  export default {
  components: {
    Navbar,
    Sidebar,
    Navbaruser
}
  };
  </script>
  
  <style scoped>
  .container-fluid {
  margin-top: 50px;
  }
  
  </style>
  
  