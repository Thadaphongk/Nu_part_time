<template>
    <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-end " >
    
    
    <li class="page-item " :class="{ disabled: page <= 1 }" >
        <a @click.prevent="onPage(page - 1)" class="page-link" href="#">«</a>
    </li>
    
    <li class="page-item" v-for="item in getPageItems" :key="item" :class="{active: page === item} ">
        <a a @click.prevent="onPage(item)" class="page-link" href="#">{{item}}</a>
    </li>
   
    <li class="page-item" :class="{ disabled: page >= getPageItems.length }">
        <a @click.prevent="onPage(page + 1)" class="page-link" href="#">»</a>
    </li>
  



</ul>
</nav>
</template>
<script>
export default {
    
    props:{
   data: {
     required : true
   
    },
    page: {
      type: Number,
      required: true,
      default: 1
    }
   },
   computed: {
   getPageItems() {
      const pages = [];
      if (this.data) {
        if (this.data.limit && this.data.rows) {
          const rows = this.data.rows;
          const limit = this.data.limit;
          for (let i = 1; i <= Math.ceil(rows / limit); i++) {
            pages.push(i);
          }
        }
      }
      return pages;
    }
  },
  methods: {
    onPage(page) {
      this.$emit("onPage", page);
    }
  }

};
</script>