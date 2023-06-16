<template>
  <div class="login-container">
    <div class="login-container-con">
      <div class="head">
        <el-col
          :xs="8"
          :sm="8"
          :md="4"
          :lg="1"
          style="width:36px;height:36px;overflow:hidden;margin-right:10px;"
        >
          <img :src="site.site_logo" alt="" style="width:100%" />
        </el-col>
        <el-col :span="15">
          <div
            style="color:#666;font-size:24px;font-weight:900;line-height:36px;"
          >
            {{ site.name }}
          </div>
        </el-col>
      </div>
      <el-row class="content_info">
        <el-col :span="15">
          <div class="login_img">
            <img :src="site.advertisement" alt="" />
          </div>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="8" class="login_input">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="rules"
            class="login-form"
            label-position="left"
          >
            <div class="title-container">
              <h3 class="title">
                {{ $t("login.title") }}
              </h3>
              <!--<lang-select class="set-language" />-->
            </div>

            <el-form-item prop="username">
              <!-- <span class="svg-container">
                <svg-icon icon-class="user"/>
              </span> -->
              <i
                class="iconfont icon-verification_member svg-container"
                style="font-size:24px;"
              ></i>
              <el-input
                v-model="loginForm.username"
                :placeholder="$t('login.username')"
                name="name"
                type="text"
                auto-complete="on"
              />
            </el-form-item>

            <el-form-item prop="password">
              <!-- <span class="svg-container">
                <svg-icon icon-class="password"/>
              </span> -->
              <i
                class="iconfont icon-verification_psw svg-container"
                style="font-size:24px;"
              ></i>
              <el-input
                v-model="loginForm.password"
                :type="passwordType"
                :placeholder="$t('login.password')"
                name="password"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </el-form-item>

            <el-form-item prop="name" v-if="captcha.status == true">
              <i
                class="iconfont icon-verification_code svg-container"
                style="font-size:24px;"
              ></i>
              <el-input
                v-model="loginForm.captcha"
                placeholder="请输入图形验证码"
                name="name"
                type="text"
                auto-complete="on"
                style="width:calc(100% - 180px)"
              />

              <img @click="freshCode" :src="captcha.img" title="点击刷新验证码" style="cursor:pointer"/>
            </el-form-item>

            <el-form-item prop="mobile" v-if="sms.status == true">
              <i
                class="iconfont icon-verification_phone svg-container"
                style="font-size:24px;"
              ></i>
              <el-input
                v-model="loginForm.mobile"
                placeholder="请输入手机号"
                name="name"
                type="text"
                auto-complete="on"
                style="width:calc(100% - 200px)"
              />

              <el-button
                type="primary"
                @click="sendSms()"
                :disabled="isDisabled == 0"
                >{{ captcha_text }}</el-button
              >
            </el-form-item>

            <el-form-item prop="name" v-if="sms.status == true">
              <i
                class="iconfont icon-verification_code1 svg-container"
                style="font-size:24px"
              ></i>
              <el-input
                v-model="loginForm.code"
                placeholder="请输入手机验证码"
                name="name"
                type="text"
                auto-complete="on"
              />
            </el-form-item>

            <el-checkbox
              v-model="remember_pwd"
              :true-label="1"
              :false-label="0"
              :label="1"
              style="color:#999"
              >记住用户名
            </el-checkbox>
            <router-link to="/register" v-if="site.register_open == '1'">
              <span class="register">注册账号</span>
            </router-link>
            <router-link to="/forget">
              <span class="forget">忘记密码？</span>
            </router-link>
            <el-button
              :loading="loading"
              type="primary"
              style="width:100%;margin:30px 0;padding:12px 20px;font-size:18px"
              @click.native.prevent="handleLogin"
            >
              登录
            </el-button>
            <div style="position:relative"></div>
          </el-form>
        </el-col>
      </el-row>
      <el-row style="margin-top:40px;">
        <el-col align="center" style="color:#999;padding:30px 0">
          <p v-html="site.information"></p>
        </el-col>
      </el-row>
    </div>
    <!-- <el-button @click="is_tips()">点击弹开</el-button> -->
    <!-- <el-dialog title="" :visible.sync="is_tips">
      <div style="text-align:center;">
        <div style="font-size:50px;color:#ff7676;padding:50px 0">
          <i class="el-icon-warning"></i>
        </div>
        <div style="padding-bottom:50px;font-size:16px">
          提示：您当前密码安全强度较弱，建议您修改密码。
        </div>
        <div style="padding-bottom:50px">
          <el-button type="primary">
            修改密码
          </el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog> -->
  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
import LangSelect from "@/components/LangSelect";
import SocialSign from "./socialsignin";
import { Message, MessageBox } from "element-ui";
import base64_encode from "../../utils/base64_encode";

export default {
  name: "Login",
  components: { LangSelect, SocialSign },
  data() {
    var validateMobile = (rule, value, callback) => {
      if (!/^1\d{10}$/.test(value)) {
        callback(new Error("手机号格式不正确"));
      } else {
        callback();
      }
    };
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入用户名/手机号'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('The password can not be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      login_info: {},
      site: {},
      remember_pwd: false,
      // is_tips: false,
      loginForm: {
        username: "",
        password: "",
        mobile:'',
      },
      passwordType: "password",
      // 图形验证码
      captcha: {},
      // 短信验证码
      sms: {},
      captcha_text: "获取验证码",
      isDisabled: 1,
      t: 60,

      loading: false,
      showDialog: false,
      redirect: undefined,

      rules: {
        username: [{ required: true, trigger: "blur", message: "请输入账号" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],

        mobile: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          },
          {
            validator: validateMobile,
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
    this.getLoginSite();
  },
  mounted() {
    this.getlocalStorage();
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    is_tips() {
      this.$store.dispatch("IsOpenPwd", true);
    },
    getLoginSite() {
      $http
        .get("/admin/login/site", {})
        .then(response => {
          if (response.result === 1) {
            this.site = response.data;
            this.fun.setIcon(this.site.title_icon);
            this.captcha = this.site.captcha;
            this.sms = this.site.sms;
            this.fun.setTitle(this.site.name+"-登录");
          } else {
            if(response.msg && response.msg!='') {
              MessageBox.alert(response.msg);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getIndex() {
      if (this.remember_pwd) {
        this.loginForm.remember = 1;
      } else {
        this.loginForm.remember = 0;
      }
      try {
        $http
          .post("/admin/login", {
            username: this.loginForm.username,
            password: base64_encode(this.loginForm.password),
            captcha: this.loginForm.captcha,
            mobile: this.loginForm.mobile,
            code: this.loginForm.code,
            remember:this.loginForm.remember,
          })
          .then(response => {
            if (response.result === 1) {
              this.loading = false;
              if (
                !this.fun.isTextEmpty(response.data) &&
                response.data.status === -5
              ) {
                if(response.msg && response.msg!='') {
                  Message.error(response.msg);
                }
                return;
              }
              // 是否提示修改密码
              if(!this.fun.isTextEmpty(response.data) && response.data.pwd_remind == 1) {
                this.$store.dispatch("IsOpenPwd", true);
                this.$store.dispatch("tips_word", response.data.msg);
                return;
              }
              if (!this.fun.isTextEmpty(response.data) && response.data.url) {
                window.location.href = response.data.url;
                return;
              }

              this.$store.dispatch("GenerateRoutes", 0);
              if (this.remember_pwd) {
                this.loginForm.remember = 1;
                this.setlocalStorage(this.loginForm.username);
              } else {
                // 点击忘记密码，清空localStorage里的存储
                this.setlocalStorage("");
              }
              this.$router.push(this.fun.getUrl("Manage"));
            } else {
              if(response.msg && response.msg!='') {
                MessageBox.alert(response.msg);
              }
              if(this.captcha.status == true) {
                this.freshCode();
              }
              this.loading = false;
            }
          })
          .catch(() => {
            this.loading = false;
          });
      } catch (error) {
        console.log(error);
        this.$message.error('密码输入错误');
        this.loading = false;
      }
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.getIndex();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //像localStorage里存入从页面获取的用户名和密码；
    setlocalStorage(c_name) {
      localStorage.setItem("siteName", JSON.stringify(c_name));
    },
    getlocalStorage() {
      this.loginForm.username = JSON.parse(localStorage.getItem("siteName")); //保存到保存数据的地方
    },
    //获取验证码
    sendSms: function() {
      let that = this;
      let rTime = that.t;

      if (that.loginForm.username == "" || !that.loginForm.username) {
        that.$refs.loginForm.validateField("username", err => {});
        return false;
      }
      if (!that.loginForm.mobile || !/^1\d{10}$/.test(that.loginForm.mobile)) {
        that.$refs.loginForm.validateField("mobile", err => {});
        return false;
      }


      $http
        .post("/admin/login/login_code", {
          mobile: this.loginForm.mobile,
          username: this.loginForm.username
        })
        .then(
          response => {
            if (response.result == 1) {
              if(response.msg && response.msg!='') {
                this.$message.success(response.msg);
              }
              // 倒计时
              let interval = window.setInterval(() => {
                if (--that.t <= 0) {
                  that.t = rTime;
                  that.isDisabled = 1;
                  that.captcha_text = "获取验证码";

                  window.clearInterval(interval);
                } else {
                  that.isDisabled = 0;
                  that.captcha_text = "(" + that.t + "s)后重新获取";
                }
              }, 1000);
            }
            else {
              if(response.msg && response.msg!='') {
                this.$message.error(response.msg);
              }
            }
          },
          response => {
            console.log(response);
          }
        );
    },
    //刷新图形验证码
    freshCode() {
      $http
        .post("/admin/login/refresh_pic", {})
        .then(response => {
          if (response.result === 1) {
            this.captcha.img = response.data;
          } else {
            if(response.msg && response.msg!='') {
              this.$message.error(response.msg);
            }
            this.loading = false;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // afterQRScan() {
    // const hash = window.location.hash.slice(1)
    // const hashObj = getQueryObject(hash)
    // const originUrl = window.location.origin
    // history.replaceState({}, '', originUrl)
    // const codeMap = {
    //   wechat: 'code',
    //   tencent: 'code'
    // }
    // const codeName = hashObj[codeMap[this.auth_type]]
    // if (!codeName) {
    //   alert('第三方登录失败')
    // } else {
    //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //     this.$router.push({ path: '/' })
    //   })
    // }
    // }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #333;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      background-color: #fff;
      caret-color: #666;
      // caret-color: $cursor;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #333 !important;
      }
    }
  }
  .el-form-item {
    border-bottom: 1px solid #f5f5f5;
    background: #fff;
    color: #333;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #fff;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  // overflow: hidden;
  .register {
    font-size: 14px;
    color: #409eff;
    cursor: pointer;
    position: absolute;
    right: 7rem;
  }
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
    .login_img {
      padding: 0;
      overflow: hidden;
      img {
        width: 100%;
        height: 365px;
      }
    }
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
    width: 35px;
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
    right: 10px;
    top: 7px;
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

.login-container-con {
  width: 1200px;
  margin: 0 auto;
}

@media screen and (max-width: 1200px) {
  .login-container-con {
    width: 1000px;
    margin: 0 auto;
  }
}
</style>
