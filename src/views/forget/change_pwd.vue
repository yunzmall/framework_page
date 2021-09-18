<template>
  <div class="forget-container">
    <div style="width:900px;margin:0 auto">
      <div class="head">
        <el-col
          :xs="8"
          :sm="8"
          :md="4"
          :lg="1"
          style="width:36px;height:36px;overflow:hidden;margin-right:10px;"
        >
          <img :src="logo" alt="" style="width:100%" />
        </el-col>
        <el-col :span="15">
          <div
            style="color:#666;font-size:24px;font-weight:900;line-height:36px;"
          >
            {{ name }}
          </div>
        </el-col>
      </div>
      <div
        style="text-align:center;line-height:60px;font-size:24px;font-weight:700;padding: 40px 0"
      >
        修改密码
      </div>
      <el-row class="content_info">
        <el-col :span="24" class="login_input">
          <el-form
            ref="new_form"
            :model="new_form"
            :rules="rules"
            class="login-form"
            label-position="top"
            label-width="15%"
          >
            <el-form-item label="请输入当前密码" prop="original_password">
              <el-input
                :type="passwordType1"
                v-model="new_form.original_password"
                placeholder="请输入当前密码"
                style="width:90%"
              ></el-input>
              <span class="show-pwd1" @click="showPwd(1)" style="padding-left:5px">
                <svg-icon
                  :icon-class="passwordType1 === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </el-form-item>
            <el-form-item label="请输入新密码" prop="password">
              <el-input
                :type="passwordType2"
                v-model="new_form.password"
                placeholder="请输入新密码"
                @input="getPasswordStrength(new_form.password)"
                style="width:90%"
              ></el-input>
              <span class="show-pwd1" @click="showPwd(2)" style="padding-left:5px">
                <svg-icon
                  :icon-class="passwordType2 === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
              <div class="tips">
                长度至少为8位。要求包括数字，字母，大小写和特殊字符
              </div>
              <div class="pwd">
                <div
                  class="pwd-weight"
                  :class="{'weight-color':strength==0||strength==1}"
                >
                  弱
                </div>
                <div class="pwd-weight" :class="{'weight-color':strength==2}">
                  中
                </div>
                <div class="pwd-weight" :class="{'weight-color':strength==3||strength==4}">
                  强
                </div>
              </div>
            </el-form-item>
            <el-form-item label="请再次输入新密码" prop="confirm_password">
              <el-input
                :type="passwordType3"
                v-model="new_form.confirm_password"
                placeholder="请再次输入新密码"
                style="width:90%"
              ></el-input>
              <span class="show-pwd1" @click="showPwd(3)" style="padding-left:5px">
                <svg-icon
                  :icon-class="passwordType3 === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">
                确定
              </el-button>
              <el-button @click="close1">
                取消
              </el-button>
            </el-form-item>
          </el-form>

        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { Message, MessageBox } from "element-ui";

export default {
  name: "Forget",
  components: {},
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.new_form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      strength: 0,

      logo: "",
      name: "",
      new_form: {
        original_password:'',
        password: "",
        confirm_password: ""
      },
      passwordType1:'password',
      passwordType2:'password',
      passwordType3:'password',
      
      rules: {
        original_password: [{ required: true, trigger: "blur", message: "请输入当前密码" }],
        password: [{ required: true, trigger: "blur", message: "请输入新密码" }],
        confirm_password: [
          { validator: validatePass2, required: true, trigger: "blur" }
        ]
      },
      show: true,
      count: "",
    };
  },
  watch: {},
  created() {
    this.getLoginSite();
  },
  destroyed() {},
  methods: {
    getLoginSite() {
      $http
        .get("/admin/login/site", {})
        .then(response => {
          if (response.result === 1) {
            this.logo = response.data.site_logo;
            this.name = response.data.name;
          } else {
            if (response.msg && response.msg != "") {
              MessageBox.alert(response.msg);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCode() {
      if (this.fun.isMoblie(this.form.mobile)) {
        this.$message.error("请输入正确的手机号码");
        return;
      }
      $http
        .post("/admin/sendCode/", { mobile: this.form.mobile }, " ")
        .then(response => {
          if (response.result === 1) {
            this.getTimer();
          } else {
            if (response.msg && response.msg != "") {
              MessageBox.alert(response.msg);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    
    close1() {
      this.$router.push(this.fun.getUrl("Manage"));
    },
    submitForm() {
      this.$refs.new_form.validate(valid => {
        if (valid) {
          let json = this.new_form;
          $http
            .post(
              "/admin/user/user_change",
              {
                user:json
              },
              "提交中"
            )
            .then(response => {
              if (response.result === 1) {
                if(response.msg && response.msg!='') {
                  this.$message.success(response.msg);
                }
                this.$refs["new_form"].resetFields();
                this.logout();
              } else {
                if (response.msg && response.msg != "") {
                  this.$message.error(response.msg);
                }
              }
            })
            .catch(err => {
              console.error(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    showPwd(x) {
      if(x==1) {
        if (this.passwordType1 === "password") {
          this.passwordType1 = "text";
        } else {
          this.passwordType1 = "password";
        }
      }
      if(x==2) {
        if (this.passwordType2 === "password") {
          this.passwordType2 = "";
        } else {
          this.passwordType2 = "password";
        }
      }
      if(x==3) {
        if (this.passwordType3 === "password") {
          this.passwordType3 = "";
        } else {
          this.passwordType3 = "password";
        }
      }
    },
    getTimer() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    getPasswordStrength(password) {
      var strength = 0
      if (password.length < 1) {
        strength = 0;
      }
      if (/\d/.test(password)) strength++; //数字
      if (/[a-z]/.test(password)) strength++; //小写
      if (/[A-Z]/.test(password)) strength++; //大写
      if (/\W/.test(password)) strength++; //特殊字符

      this.strength = strength;
    },
    // 登出
    logout() {
      $http.get("/admin/logout").then(
        response => {
          if (response.result === 1) {
            // location.reload();// In order to re-instantiate the vue-router object to avoid bugs
            // MessageBox.alert('确定退出吗').then(action => {
            this.$router.push({ path: "/login" });
            // });
          }
          window.isFirst = 0;
        },
        err => {
          console.log(err);
        }
      );
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #fff;
$dark_gray: #889aa4;
$light_gray: #eee;

.forget-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .forget {
    font-size: 14px;
    color: #409eff;
    cursor: pointer;
    position: absolute;
    right: 2rem;
  }
  .head {
    display: flex;
    margin-top: 60px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e5e5e5;
  }
  .content_info {
    // margin-top: 40px;
    display: flex;
    align-items: center;
    .login_input {
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
      background: #fff;
      input:focus {
        color: #333;
      }
    }
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 30px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #ccc;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      // color: $light_gray;
      color: #333;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0;
      cursor: pointer;
    }
  }
  .show-pwd {
    position: absolute;
    right: 4rem;
    top: 5px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .show-pwd1 {
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
}
.complete {
  width: 50%;
  margin: 3rem auto;
  text-align: center;
  .text {
    display: block;
    margin-bottom: 1rem;
  }
  .blue {
    color: #409eff;
    font-size: 70px;
    margin-bottom: 1rem;
  }
}
.pwd{
    height:20px;
    line-height:20px;
  }
  .pwd-weight {
      display:inline-block;
      width:32%;
      background:#c2d8ff;
      border-radius:10px;
      height:20px;
      text-align:center;
      color:#fff
    }
    .weight-color {
      background: #409EFF;
    }
</style>
