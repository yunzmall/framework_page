<template>
  <div class="right">
    <div class="right-head">
      <div class="right-head-con1">首页设置</div>
      
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="15%">
      <el-form-item>
        <el-radio v-model="form.is_open" :label="2">开启</el-radio>
        <el-radio v-model="form.is_open" :label="1">关闭</el-radio>
        <div class="tips">
          开启，访问域名则显示设置的首页模板，关闭则直接跳转登录页！
        </div>
      </el-form-item>
      <el-form-item label="自定义">
        <el-radio v-model="form.is_customize" :label="1">开启</el-radio>
        <el-radio v-model="form.is_customize" :label="0">关闭</el-radio>
      </el-form-item>
      <el-form-item label="自定义链接">
          <el-input v-model="form.customize_url" style="width:70%;" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="submitForm('form')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "home-index",
  data() {
    return {
      submit_loading: false,
      form: {
        is_open: 2,
        customize_url:"",
        is_customize:1,
      },
      rules: {}
    };
  },
  created() {
    this.getData();
  },
  destroyed() {},
  methods: {
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          $http
            .post(
              "/admin/user/home_set",
              { is_open: this.form.is_open ,is_customize:this.form.is_customize,customize_url:this.form.customize_url || ""},
              "保存中"
            )
            .then(response => {
              if (response.result === 1) {
                this.$message.success("保存成功！");
                this.getData();
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
    getData() {
      $http
        .post("/admin/user/home_set", {}, "加载中")
        .then(response => {
          if (response.result == 1) {
            this.form = response.data;
          } else {
            if (response.msg && response.msg != "") {
              this.$message.error(response.msg);
            }
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.right {
  padding-left: 30px;
  .right-head {
    padding: 15px 0;
    line-height: 50px;
    border-bottom: 1px #ccc solid;
    margin-bottom: 15px;
    .right-head-con1 {
      // float:left;
      padding-right: 20px;
      font-size: 16px;
      color: #888;
    }
  }
}
/* 上传图片 */
.avatar-uploader .el-upload {
  margin-top: 15px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar_box {
  width: 80%;
  height: 80%;
  margin: 0 auto;
}
.avatar {
  width: 50%;
  height: 50%;
  object-fit: cover;
}
.el-upload-tip {
  width: 178px;
  margin: 0;
  padding: 0;
  color: #999;
  text-align: center;
}
input[type="file"] {
  display: none;
}
.avatar-uploader-box {
  position: relative;
  margin-top: 20px;
  width: 200px;
  .el-icon-circle-close {
    position: absolute;
    top: 10px;
    right: 0;
    color: #999;
  }
}

/*弹窗上传图片*/
#upload-img {
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .avatar-uploader-box {
    position: relative;
    margin: 20px 0 0 10px;
    width: 110px;
  }
  .el-icon-circle-close {
    position: absolute;
    top: -7px;
    right: 1px;
    color: #999;
  }
}

.imgList {
  display: flex;
  flex-wrap: wrap;
  margin: 10px auto;
}
</style>
