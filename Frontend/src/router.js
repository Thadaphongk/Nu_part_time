import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register'
import Login from './views/Login'
import Registerowner from './views/Registeronwer'
import Loginowner from './views/Loginonwer'
import Pagejob from './views/Pagejob'
import about from './views/about'
import jobdetail from './views/jobdetail'
import jobhistory from './views/job/jobhistory'
import JobList from './views/job/jobList'
import JobForm from './views/job/jobForm'
import jobEdowner from './views/job/jobEdowner'
import Editowner from './views/job/Editowner'
import adminpage  from './views/admin/adminpage'
import adminlogin  from './views/admin/adminlogin'
import adminjob  from './views/admin/adminjob'
import adminvo  from './views/admin/adminvo'
import adminname  from './views/admin/adminname'
import adminvoedit  from './views/admin/adminvoedit'
import adminnameedit  from './views/admin/adminnameedit'
import ApplyJobList from './views/apply/ApplyJobList'
import ApplyEdit from './views/apply/ApplyEdit'
import Applyset from './views/apply/Applyset'
import ApplyHistoryList from './views/apply/ApplyHistoryList'
import ApplyManageList from './views/apply/ApplyManageList'
about
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home },
    
    //Report
    { path: '/about', name: 'about', component: about },
    
    // For admin
    { path: '/adminpage', name: 'adminpage', component: adminpage , meta: { adth:true } },
    { path: '/adminlogin', name: 'adminlogin', component: adminlogin  },
    { path: '/adminjob', name: 'adminjob', component: adminjob , meta: { adth:true} },
    { path: '/adminvo', name: 'adminvo', component: adminvo , meta: { adth:true} },
    { path: '/adminname', name: 'adminname', component: adminname , meta: { adth:true} },
    { path: '/adminvoedit', name: 'adminvoedit', component: adminvoedit , meta: { adth:true} },
    { path: '/adminnameedit', name: 'adminnameedit', component: adminnameedit , meta: { adth:true} },
    
    // For ower
   { path: '/job', name: 'job-list', component: JobList, meta: {outh: ['owner'] } },
   { path: '/job/form', name: 'job-form', component: JobForm, meta: { outh: ['owner'] } },
   {path: '/Apply/manage', name: 'apply-manage', component: ApplyManageList, meta: {outh: ['owner'] } },
   { path: '/jobhistory', name: 'jobhistory', component: jobhistory,meta: {outh: ['owner'] } },
   { path: '/jobEdowner', name: 'jobEdowner', component: jobEdowner,meta: {outh: ['owner'] } },
   { path: '/Editowner', name: 'Editowner', component: Editowner,meta: {outh: ['owner'] } },


   
   // For user
   { path: '/Apply/job', name: 'apply-job', component: ApplyJobList, meta: { auth: true } },
   { path: '/Apply/history', name: 'apply-history', component:ApplyHistoryList, meta: { auth: true } },
   { path: '/Apply/ApplyEdit', name: 'ApplyEdit', component:ApplyEdit, meta: { auth: true } },
   { path: '/Apply/Applyset', name: 'Applyset', component:Applyset, meta: { auth: true } },




//for user not login
{ path: '/Pagejob', name: 'Pagejob', component: Pagejob },
{ path: '/jobdetail/:itemId', name: 'jobdetail',component: jobdetail },





// For login
   { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
    { path: '/registerowner', name: 'registerowner', component: Registerowner },
    { path: '/loginowner', name: 'loginowner', component: Loginowner },
    
    
  ]
})

// ตรวจสอบสิทธิ์การเข้าถึงหน้า ผู้หางาน
router.beforeEach((to, from, next) => {
  const auth = to.meta.auth;
  if (!auth) return next();
  router.app.$store.dispatch('get_user_login')
    .then(() => {
      if (!Array.isArray(auth)) return next();
      const userLogin = router.app.$store.state.user;
      if (auth.indexOf(userLogin.u_role) >= 0) return next();
    })
    .catch(() => next({ name: 'Pagejob' }));
})



// ตรวจสอบสิทธิ์การเข้าถึงหน้า เจ้าของร้าน
router.beforeEach((to, from, next) => {
  const outh = to.meta.outh;
  if (!outh) return next();
  router.app.$store.dispatch('get_owner_login')
    .then(() => {
      if (!Array.isArray(outh)) return next();
      const ownerLogin = router.app.$store.state.owner;
      if (outh.indexOf(ownerLogin.o_role) >= 0) return next();
    })
    .catch(() => next({ name: 'Pagejob' }));
})


// ตรวจสอบสิทธิ์การเข้าถึงหน้า admin
router.beforeEach((to, from, next) => {
  const adth = to.meta.adth;
  if (!adth) return next();
  router.app.$store.dispatch('get_admin_login')
    .then(() => {
      if (!Array.isArray(adth)) return next();
      const ownerLogin = router.app.$store.state.owner;
      if (outh.indexOf(ownerLogin.ad_role) >= 0) return next();
    })
    .catch(() => next({ name: 'Pagejob' }));
})


export default router;