<template>
  <div
    v-loading="loading"
    v-loading.fullscreen.lock="loading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 1)"
  ></div>
</template>
<script>
  export default {
    data() {
      return {
        loading: "加载中"
      };
    },
    created() {
      this.currentChange(1);
    },
    methods: {
      //分页
      currentChange(val) {
        $http
          .post("/admin/application", { page: val }, "加载中")
          .then(response => {
            if (response.result === 1) {
              this.$router.push(this.fun.getUrl("Manage"));
              // window.location.href = Fun.getSiteRootAdmin() + "#/manage/index";
            } else {
              this.list = [];
              if (response.data.status === -1) {
                this.currentChange(1);
              }
              if(response.msg && response.msg!='') {
                this.$message.error(response.msg);
              }
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
  };
</script>
