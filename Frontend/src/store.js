import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  user:null ,
  owner:null ,
  admin:null ,
  ownerset :[],
  ownerlogin :[],
  userlogin :[],
  userset :[],
  equipments: [],
  job : [],
  jobs : [],
  apply_histories: [],
  job_histories: [],
  job_admin: [],
  applys: [],
  applyadmin: []
  },
  mutations: {
set_user:(state, user) => state.user = user,
set_owner:(state, owner) => state.owner = owner,
set_admin:(state, admin) => state.admin = admin,
set_ownerlogin : (state, ownerlogin) => state.ownerlogin = ownerlogin,
set_ownerset : (state, ownerset) => state.ownerset = ownerset,
set_userlogin : (state, userlogin) => state.userlogin = userlogin,
set_userset : (state, userset) => state.userset = userset,
set_job : (state, job) => state.job = job,
set_jobs : (state, jobs) => state.jobs = jobs,
set_job_histories:(state,job_histories) => state.job_histories = job_histories,
set_job_admin:(state,job_admin) => state.job_admin = job_admin,
set_apply_histories: (state, apply_histories) => state.apply_histories = apply_histories,
set_apply: (state, apply) => state.applys = apply,
set_applyadmin: (state, applyadmin) => state.applyadmin = applyadmin
  },
  actions: {
  get_user_login:({commit}) => Axios.post('/api/account/getUserLogin').then(res => commit('set_user', res.data)),
  
  get_owner_login:({commit}) => Axios.post('/api/owner/getownerLogin').then(res => commit('set_owner', res.data)),
  
  get_admin_login:({commit}) => Axios.post('/api/admin/getadminLogin').then(res => commit('set_admin', res.data)),
 
  set_ownerset: ({ commit }, params = { page: 1 }) => Axios.get(`/api/ownerset`, { params }).then(res => commit('set_ownerset', res.data)),
  
  set_ownerlogin: ({ commit }, params = { page: 1 }) => Axios.get(`/api/owner`, { params }).then(res => commit('set_ownerlogin', res.data)),
 
  set_userlogin: ({ commit }, params = { page: 1 }) => Axios.get(`/api/account`, { params }).then(res => commit('set_userlogin', res.data)),
  
  
  set_userset: ({ commit }, params = { page: 1 }) => Axios.get(`/api/accountset`, { params }).then(res => commit('set_userset', res.data)),
  
  
  set_job: ({ commit }, params = { page: 1 }) => Axios.get(`/api/job`, { params }).then(res => commit('set_job', res.data)),
  
  
  set_jobs: ({ commit }, params = { page: 1 }) => Axios.get(`/api/jobs`, { params }).then(res => commit('set_jobs', res.data)),
  
  
  set_job_histories: ({ commit }, params = { page: 1 }) => Axios.get(`/api/job/history`, { params }).then(res => commit('set_job_histories', res.data)),
  
  set_job_admin: ({ commit }, params = { page: 1 }) => Axios.get(`/api/jobsadmin/historys`, { params }).then(res => commit('set_job_admin', res.data)),
  
  set_apply_job: ({ commit }, params = { page: 1 }) => Axios.get(`/api/jobshow`, { params }).then(res => commit('set_jobs', res.data)),
  
  
  set_job_apply: ({ commit }, params = { page: 1 }) => Axios.get(`/api/jobapp`, { params }).then(res => commit('set_jobs', res.data)),
  
  
  
  set_apply_histories: ({ commit }, params = { page: 1 }) => Axios.get(`/api/showapply/history`, { params }).then(res => commit('set_apply_histories', res.data)),
  
  
  set_applyadmin: ({ commit }, params = { page: 1 }) => Axios.get(`/api/applyadmin/manage`, { params }).then(res => commit('set_applyadmin', res.data)),
  
  set_apply: ({ commit }, params = { page: 1 }) => Axios.get(`/api/apply/manage`, { params }).then(res => commit('set_apply', res.data)),
  
}
})
