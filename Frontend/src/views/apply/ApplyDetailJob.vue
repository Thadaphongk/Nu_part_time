<template>
    <div class="modal fade" tabindex="-1" role="dialog" id="apply-detail-dialog-job">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fa fa-info"></i> ข้อมูลผู้สมัครงาน
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body" v-if="jobItem">
                   
                  
                    <div class="text-center"> <!-- Center the image -->
                        <div class="form-group">
                            <img class="img-fluid"
                                :src="`/api/uploads/${jobItem.a_photo}`"
                                :alt="jobItem.a_name"
                                style="width: 250px; height: 250px;">
                        </div>
                    </div>

                   <div class="row   mt-4">
                     <div class="col-sm-4 form-group">ชื่อ
                    </div>
                     <div class="col-sm-8 form-group">: {{ jobItem.a_name}}</div>
                   </div>

                   <div class="row">
                     <div class="col-sm-4 form-group">นามสกุล</div>
                     <div class="col-sm-8 form-group">: {{ jobItem.a_lastname }} </div>
                   </div>
                   <div class="row">
                     <div class="col-sm-4 form-group">ตำแหน่งที่สมัคร</div>
                     <div class="col-sm-8 form-group">:  {{ jobItem.j_position }}</div>
                   </div>
                   <div class="row">
                     <div class="col-sm-4 form-group">รหัสนิสิต</div>
                     <div class="col-sm-8 form-group">:  {{ jobItem.a_studentid }} </div>
                   </div>

                   <div class="row">
                     <div class="col-sm-4 form-group">คณะ</div>
                     <div class="col-sm-6 form-group">:  {{ jobItem.a_faculty }} </div>
                   </div>
                   <div class="row">
                     <div class="col-sm-4 form-group">วันเกิด</div>
                     <div class="col-sm-8 form-group">:  {{ jobItem.a_date }} </div>
                   </div>


                   <div class="row">
                     <div class="col-sm-4 form-group">เบอร์โทรศัพท์</div>
                     <div class="col-sm-8 form-group">:  {{ jobItem.a_phone }} </div>
                   </div>

                   <div class="row">
                     <div class="col-sm-4 form-group">ลักษณะนิสัย</div>
                     <div class="col-sm-8 form-group">:  {{ jobItem.a_resume }}</div>
                   </div>

                   <div class="row">
                     <div class="col-sm-4 form-group">ความสามารถ</div>
                     <div class="col-sm-6 form-group">:  {{ jobItem.a_set }}</div>
                   </div>
                   
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from "axios";
const modalID = "#apply-detail-dialog-job";
export default {
  props: {
    job: {
      required: true
    }
  },
  watch: {
    job(value) {
      if (!value) return;
      // ส่งข้อมูลไป a_id ไปทำการค้นหารายละเอียดห้องประชุม
      Axios.get(`/api/apply/jobs/${value.a_id}`)
        .then(response => {
          this.jquery(modalID).modal();
          this.jobItem = response.data;
        })
        .catch(err => {
          this.alertify.error(err.response.data.message);
        });
    }
  },
  data() {
    return {
      jobItem: null
    };
  },
  mounted() {
    // ตรวจจับ Event การปิดหน้า Modal dialog
    this.jquery(modalID).on("hide.bs.modal", event => {
      this.$emit("onClose", event);
    });
  },
  methods: {
    onApply() {
      this.jquery(modalID).modal("hide");
      const job = { ...this.job };
      setTimeout(() => {
        this.$emit("onApply", job);
      }, 500);
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
.img-fluid {
  border: solid 1px #6c757d;
}
.black {
  color: #212529;
}


.btn-kerry-orange {
    background-color: #FF5E13;
    color: white;
    border: 2px solid #FF5E13;
}

.btn-kerry-orange:hover {
    background-color: #E84A00;
    border-color: #E84A00;
}
</style>

