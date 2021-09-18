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
          <img
            :src="logo"
            alt=""
            style="width:100%"
          />
        </el-col>
        <el-col :span="15">
          <div
            style="color:#666;font-size:24px;font-weight:900;line-height:36px;"
          >
            {{name}}
          </div>
        </el-col>
      </div>
      <el-steps :active="active" align-center style="margin-top: 20px">
        <el-step title="验证手机号"></el-step>
        <el-step title="设置新密码"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-row class="content_info">
        <el-col :span="24" class="login_input">
          <el-form
            v-if="active == 0"
            ref="form"
            :model="form"
            :rules="rules"
            class="login-form"
            label-position="top"
            label-width="15%"
          >
            <el-form-item label="请输入用户名" prop="username">
              <el-input
                v-model="form.username"
                placeholder="请输入用户名"
                style="width:50%"
              ></el-input>
            </el-form-item>
            <el-form-item label="请输入绑定的密保手机号" prop="mobile">
              <el-input
                v-model="form.mobile"
                placeholder="请输入绑定的密保手机号"
                style="width:50%"
              ></el-input>
              <el-button
                v-show="show"
                type="primary"
                size="small"
                @click.native.prevent="getCode"
              >
                获取手机验证码
              </el-button>
              <el-button v-show="!show" type="primary" disabled size="small">
                {{ count }}秒后重新获取
              </el-button>
            </el-form-item>
            <el-form-item label="输入手机短信验证码" prop="code">
              <el-input
                v-model="form.code"
                placeholder="输入手机短信验证码"
                style="width:50%"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="next">
                下一步
              </el-button>
            </el-form-item>
          </el-form>

          <el-form
            v-if="active == 1"
            ref="new_form"
            class="login-form"
            :model="new_form"
            :rules="rules"
            label-width="25%"
          >
            <el-form-item label="新密码" prop="password">
              <el-input
                v-model="new_form.password"
                :type="passwordType"
                :placeholder="$t('login.password')"
                style="width:70%"
              ></el-input>
              <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </el-form-item>
            <el-form-item label="确认新密码" prop="re_password">
              <el-input
                v-model="new_form.re_password"
                :type="passwordType"
                placeholder="请再次输入密码"
                style="width:70%"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.prevent="submitForm">
                确认
              </el-button>
            </el-form-item>
          </el-form>

          <div v-if="active == 3" class="complete">
            <i class="el-icon-success blue"></i><br />
            <!-- <span class="text">设置密码成功</span> -->
            <el-button type="primary" @click="toLogin">去登录</el-button>
          </div>
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
      active: 0,
      logo:"",
      name:'',
      new_form: {
        password: "",
        re_password: ""
      },
      form: {
        mobile: "",
        code: "",
        username:""
      },
      rules: {
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
        re_password: [
          { validator: validatePass2, required: true, trigger: "blur" }
        ]
      },
      show: true,
      count: "",
      passwordType: "password"
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
      if (!this.form.username) {
        this.$message.error("请输入用户名");
        return;
      }
      $http
        .post("/admin/sendCode/", { mobile: this.form.mobile,username:this.form.username }, " ")
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
    next() {
      if (!this.form.code) {
        this.$message.error("请输入验证码");
        return;
      }
      $http
        .post(
          "/admin/checkCode/",
          { mobile: this.form.mobile, code: this.form.code },
          " "
        )
        .then(response => {
          if (response.result === 1) {
            this.active++;
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
    submitForm() {
      this.$refs.new_form.validate(valid => {
        if (valid) {
          $http
            .post(
              "/admin/changePwd/",
              {
                username:this.form.username,
                mobile: this.form.mobile,
                code: this.form.code,
                pwd: this.new_form.password,
                confirm_password: this.new_form.re_password
              },
              "提交中"
            )
            .then(response => {
              if (response.result === 1) {
                if (response.msg && response.msg != "") {
                  this.$message.success(response.msg);
                }
                // this.$refs["new_form"].resetFields();
                this.active = this.active + 2;
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
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
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
    }
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
    margin-top: 40px;
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
    color: #fff;
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
    font-size: 45px;
    margin-bottom: 2rem;
  }

  .el-button{
    padding-left: 35px;
    padding-right: 35px;
  }
}
</style>
