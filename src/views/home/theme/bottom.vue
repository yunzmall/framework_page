<template>
  <div class="right">
    <div class="right-head1">
      <div class="right-head-con">底部设置</div>
    </div>

    <el-form ref="form" :model="form" :rules="rules" label-width="15%">
      <div>
        <!-- <tinymce :height="500" v-model="form.bottom" /> -->
        <textarea
          v-model="form.bottom"
          style="width:85%;height:70vh"
        ></textarea>
      </div>
      <el-form-item style="margin-top:30px">
        <el-button type="primary" @click.native.prevent="submitForm('form')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";

export default {
  components: {
    Tinymce
  },
  name: "ThemeBottom",
  data() {
    return {
      form: {
        bottom: ""
      },
      rules: {}
    };
  },
  created() {
    this.getData();
  },
  destroyed() {},
  methods: {
    getData() {
      $http
        .post(
          "/admin/user/edit_theme",
          { id: this.$route.params.id, status: 3 },
          "加载中"
        )
        .then(response => {
          if (response.result == 1) {
            this.form.bottom = response.data.bottom ? response.data.bottom : "";
          } else {
            if (response.msg && response.msg != "") {
              this.$message.error(response.msg);
            }
          }
        })
        .catch(() => {});
    },
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          $http
            .post(
              "/admin/user/edit_theme",
              { id: this.$route.params.id, status: 3, data: this.form },
              "保存中"
            )
            .then(response => {
              if (response.result === 1) {
                this.$message.success("保存成功！");
                this.$router.push(this.fun.getUrl("ThemeIndex"));
              } else {
                if (response.msg && response.msg != "") {
                  this.$message.error(response.msg);
                }
              }
            })
            .catch(() => {
              // this.$message.error("保存失败！");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.right {
  padding-left: 30px;
  .right-head1 {
    padding: 15px 0;
    line-height: 50px;
    border-bottom: 1px #ccc solid;
    margin-bottom: 15px;
    .right-head-con {
      // float: left;
      padding-right: 20px;
      font-size: 16px;
      color: #888;
    }
  }
  .tip {
    font-size: 12px;
    color: #999;
  }
}
</style>
