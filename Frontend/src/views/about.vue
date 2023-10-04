<template>
  <div>
    <Navbarpage></Navbarpage>
    <div class="back_re">
         <div class="container">
            <div class="row">
               <div class="col-md-12">
                  <div class="title">
                     <h2>แจ้งปัญหา</h2>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="about">
         <div class="container-fluid">
            <div class="row d_flex">
               <div class="col-md-7">
                  <div class="titlepage">
                     <h2>แจ้งปัญหา ที่นี้</h2>
                     <span>
                      <p>
                      <i class="fa fa-map-marker" aria-hidden="true"></i>
                 ที่อยู่ :  52 หมู่ 9 อ.บ้านธิ ต.บบ้านธิ จ.ลำพูน
                 </p>
                 <p>
              <i class="fa fa-phone" aria-hidden="true"></i>
                 เบอร์ติดต่อ : 093-157-5222
              </p>
              <p>
              <i class="fa fa-envelope" aria-hidden="true"></i>
                 อีเมล : thadarphongk63@nu.ac.th
              </p>

              <p>
              <i class="fa fa-facebook-square" aria-hidden="true"></i>
                 Facebook : Ken Thadarphong
              </p>

              <p>
              <i class="fa fa-comments" aria-hidden="true"></i>
                 Line : momooo555zaza
              </p>
              </span>
                     <a class="read_more" href="adminlogin"> ผู้ดูแลระบบ   </a>
                     <br>
               <br>
               <br>
               <br>
                    </div>
                 
                </div>
               
               <div class="col-md-5">
                  <div class="about_img">
                     <figure><img src="/img/DSC.jpg" alt="#"></figure>
                  </div>
               </div>
            </div>
         </div>
      </div>
    
   <!-- info section -->
   <br>
    <br>
    <br>
    <br>

        
       
  <!-- info section -->
  <section class="info_section ">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="info_logo">
            <a class="navbar-brand" href="index.html">
              <span>
                Student Nu 63  
              </span>
            </a>
            <p>
              undergraduate thesis A web application for part-time jobs for 
Naresuan University students
            </p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="info_links">
            <h5>
              Naresuan university
            </h5>
            <ul>
              <li>
                <a href="">
                  Department of Computer Science and Information Technology, Faculty of Science, Naresuan University
                </a>
              </li>
             
             
          
            </ul>
          </div>
        </div>
        <div class="col-md-3">
          <div class="info_info">
            <h5>
              Contact Us
            </h5>
          </div>
          <div class="info_contact">
            <a href="" class="">
              <i class="fa fa-map-marker" aria-hidden="true"></i>
              <span>
                52 lamphun thailand
              </span>
            </a>
            <a href="" class="">
              <i class="fa fa-phone" aria-hidden="true"></i>
              <span>
                Call : 0931575222
              </span>
            </a>
            <a href="" class="">
              <i class="fa fa-envelope" aria-hidden="true"></i>
              <span>
                thadarphongk63@nu.ac.th
              </span>
            </a>
          </div>
        </div>
        <div class="col-md-3">
          <div class="info_form ">
            <h5>
              Social subscribe
            </h5>
           
            <div class="social_box">
              <a href="https://www.facebook.com/momooo555zaza">
                <i class="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a href="">
                <i class="fa fa-twitter" aria-hidden="true"></i>
              </a>
              <a href="https://www.youtube.com/channel/UCSn6LirH0saiNwgBLKSjk7g">
                <i class="fa fa-youtube" aria-hidden="true"></i>
              </a>
              <a href="https://www.instagram.com/ken_thadar/">
                <i class="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </section>

</div>       
      
       
   
</template>
<script>
import Navbarpage from "@/components/Navbarpage";
export default {
  components: {
    Navbarpage,

  }
}

</script>
<style scoped>
.do_section .do_container .box .img-box {
  width: 120px;
  height: 120px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  background-color: #353434;
  border-radius: 100%;
}

.do_section .do_container .box .img-box img {
  width: 45px;
}

.do_section .do_container .box:hover .img-box {
  background-color: #fec016;
}

.who_section .img-box img {
  width: 100%;
}


.client_section .box .img-box {
  width: 60px;
}

.client_section .box .img-box img {
  width: 100%;
}


.info_section .info_contact .img-box {
  width: 35px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
}

.back_re {
     background-color: #c97a05;
}

.back_re .title {
     text-align: center;
}

.back_re .title h2 {
     color: #fff;
     font-size: 40px;
     padding: 40px 0;
     font-weight: 600;
     text-transform: uppercase;
     line-height: 35px;
     padding-top: 69px;
}
.about {
     background-color: #fff;
     padding-top: 90px;
}

.about .titlepage {
     max-width: 666px;
     float: right;
     width: 100%;
     text-align: left;
     padding-bottom: 0;
}

.about .titlepage span {
     padding-bottom: 60px;
     padding-top: 40px;
}

.about_img {
     padding-right: 40px;
     padding-left: 55px;
}

.about_img figure {
     margin: 0;
}

.about_img figure img {
     width: 100%;
}

.read_more {
     font-size: 17px;
     background-color: #ff5c05;
     color: #fff;
     padding: 17px 0px;
     width: 100%;
     max-width: 186px;
     text-align: center;
     display: inline-block;
     transition: ease-in all 0.5s;
     font-weight: 500;
     border-radius: 5px;
     height: 60px;
     text-transform: uppercase;
}

.read_more:hover {
     background: rgb(55, 57, 55);
     color: #fff;
     transition: ease-in all 0.5s;
}

.staff_main .read_more {
     margin: 0 auto;
     display: block;
     margin-top: 60px;
}

.info_section {
    background-color: #565552;
    color: #ffffff;
    padding: 75px 0 10px 0;
  }
  
  .info_section .row > div {
    margin-bottom: 25px;
  }
  
  .info_section h5 {
    margin-bottom: 25px;
    font-size: 24px;
  }
  
  .info_section .info_logo {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-align: start;
        -ms-flex-align: start;
            align-items: flex-start;
  }
  
  .info_section .info_logo .navbar-brand {
    padding: 0;
    margin-bottom: 20px;
  }
  
  .info_section .info_logo .navbar-brand span {
    font-size: 24px;
    color: #ffffff;
  }
  
  .info_section .info_links ul {
    padding: 0;
  }
  
  .info_section .info_links ul li {
    list-style-type: none;
  }
  
  .info_section .info_links ul li a {
    color: #ffffff;
  }
  
  .info_section .info_contact {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
  }
  
  .info_section .info_contact a {
    color: #ffffff;
    margin-bottom: 10px;
  }
  
  .info_section .info_contact a i {
    font-size: 20px;
    margin-right: 5px;
  }
  
  .info_section .info_form form input {
    outline: none;
    border: none;
    width: 100%;
    padding: 7px 10px;
    border-radius: 30px;
  }
  
  .info_section .info_form form button {
    padding: 8px 35px;
    outline: none;
    border: none;
    color: #ffffff;
    background: #f1db25;
    border-radius: 30px;
    margin-top: 15px;
    text-transform: uppercase;
  }
  
  .info_section .info_form .social_box {
    margin-top: 25px;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  
  .info_section .info_form .social_box a {
    margin-right: 10px;
    color: #ffffff;
    font-size: 20px;
  }
  .titlepage {
     text-align: center;
     padding-bottom: 40px;
}

.titlepage h2 {
     font-size: 40px;
     color: #1c1c1c;
     line-height: 40px;
     font-weight: 700;
     padding: 0;
}

.titlepage span {
     font-size: 17px;
     line-height: 25px;
     color: #0a0a0a;
     padding-top: 30px;
     display: block;
}

.about .titlepage {
     max-width: 666px;
     float: right;
     width: 100%;
     text-align: left;
     padding-bottom: 0;
}

.about .titlepage span {

     padding-bottom: 60px;
     padding-top: 40px;
}

.choose .titlepage {
     text-align: left;
}

.choose .titlepage h2 {
     padding-bottom: 30px;
}

.choose .titlepage p {
     color: #141414;
     font-weight: 400;
     font-size: 17px;
     line-height: 32px;
     padding-bottom: 85px;
}

.contact .titlepage {
     text-align: left;
}

.clients .titlepage h2 {
     color: #fff;
}

.clients .titlepage span {
     color: #fff;
}

</style>