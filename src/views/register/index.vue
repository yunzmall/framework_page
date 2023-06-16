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
          <div style="color:#666;font-size:24px;font-weight:900;line-height:36px;">
            {{name}}
          </div>
        </el-col>
      </div>
      <el-row class="content_info">
        <el-col :span="24" class="login_input">
          <el-form ref="form" class="login-form" label-position="top" label-width="15%">
            <div class="top-title">账号注册</div>
            <div class="center-cow">
              <i class="iconfont icon-verification_member"></i>
              <el-input placeholder="请输入账号" style="width:50%;" v-model="form.username"></el-input>
            </div>
            <div class="center-cow-tip">
              <i class="iconfont icon-verification_psw"></i>
              <el-input placeholder="请输入密码" style="width:88%;" :type="passwordType" v-model="form.password"></el-input>
              <i :class="passwordType == '' ? 'iconfont icon-onlineCar_f' : 'iconfont icon-onlineCar_g'" @click="passwordType = passwordType == '' ? 'password' : ''"></i>
            </div>
            <div class="tip" v-if="password_verify">密码程度至少8位，包括数字、大小写字母和特殊字符！</div>
            <div class="tip" v-if="password_verify">特殊符号(.!~@#$%^&*?()+_- ) </div>
            <div class="center-cow">
              <i class="iconfont icon-verification_code"></i>
              <el-input placeholder="请输入图形验证码" style="width:70%;" v-model="form.captcha"></el-input>
              <img class="imgCode" :src="imgCode" v-if="imgCode" @click="getImgCode"/>
            </div>
            <div class="center-cow">
              <i class="iconfont icon-verification_phone"></i>
              <el-input placeholder="请输入手机号" style="width:70%;" v-model="form.mobile"></el-input>
              <el-button type="primary" class="button-code" v-show="show" @click="getCode">获取验证码</el-button>
              <el-button v-show="!show" type="primary" disabled size="small" class="button-code">
                {{ count }}秒后重新获取
              </el-button>
            </div>
            <div class="center-cow">
              <i class="iconfont icon-verification_code1"></i>
              <el-input placeholder="请输入手机验证码" style="width:88%;" v-model="form.mobile_code"></el-input>
            </div>
            <div class="agreement-box">
              <el-checkbox v-model="agreementChecked" :true-label="1" :false-label="0"></el-checkbox>
              <span class="agreement-name">我已阅读并同意<span class="agreement-content-sty" @click="clickAgreement">《用户注册协议》</span></span>
            </div>
            <div class="agreement-box agreement-button">
              <el-button type="primary" class="button-code" @click="registered">注册账号</el-button>
              <router-link to="/login">
                <el-button type="primary" class="button-code">返回登录</el-button>
              </router-link>
            </div>
          </el-form>
        </el-col>
      </el-row>
    </div>
    
    <!-- 协议弹窗 -->
    <el-dialog
      custom-class="agreement-dialog"
      :show-close="false"
      :visible.sync="agreementVisible"
      width="40%">
      <div class="top-title">{{agreement_title}}</div>
      <div v-html="agreement_content" class="agreement-content"></div>
      <div class="bottom-cancel">
        <el-button @click="agreementVisible = false" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "register",
  components: {},
  data() {
    return {
      logo:"",
      name:'',
      agreementChecked: 0,
      count: "", //倒计时
      show: true,
      form: {
        username:"",
        mobile:"",
        captcha:"",
        password:"",
        mobile_code:""
      },
      imgCode:"", //图形验证码
      passwordType:"password",
      agreementVisible: false,
      agreement_content: "",
      agreement_title: "",
      password_verify: 0 , //判断密码是否加强 1：加强 0：不加
    };
  },
  mounted() {
    this.getLoginSite();
    this.getImgCode();
    this.getAgreement();
  },
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
    // 获取图形验证码
    getImgCode(){
      $http.get("/admin/register_captcha", {}).then(({data,result,msg}) => {
        if (result) {
          this.imgCode = data;
        } else {
          this.$message.error(msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    // 倒计时
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
    // 获取手机验证码
    getCode() {
      if (this.fun.isMoblie(this.form.mobile)) {
        this.$message.error("请输入正确的手机号码");
        return;
      }
      $http.post("/admin/register_code", {mobile:this.form.mobile}).then(({data,result,msg}) => {
        if (result) {
          this.$message.success(msg);
          this.getTimer();
        } else {
          this.$message.error(msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    // 获取用户协议
    getAgreement() {
      $http.post("/admin/register_site", {}).then(({data,result,msg}) => {
        if (result) {
          this.agreement_content = data.agreement_content;
          this.agreement_title = data.agreement_title;
          this.password_verify = data.password_verify;
        } else {
          this.$message.error(msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    //协议弹窗
    clickAgreement() {
      this.agreementVisible = true;
    },
    // 注册账号
    registered() {
      if(!this.agreementChecked) {
        this.$message.error("请勾选用户注册协议")
        return
      }
      if(this.form.username == '') {
        this.$message.error("账号不能为空");
        return;
      }
      if(this.form.password == '') {
        this.$message.error("密码不能为空");
        return;
      }
      if(this.form.captcha == '') {
        this.$message.error("图形验证码不能为空");
        return;
      }
      if (this.fun.isMoblie(this.form.mobile)) {
        this.$message.error("请输入正确的手机号码");
        return;
      }
      if(this.form.mobile_code == '') {
        this.$message.error("手机验证码不能为空");
        return;
      }
      $http.post("/admin/register_admin", {...this.form}).then(({data,result,msg}) => {
        if (result) {
          this.$message.success(msg);
          this.$router.push({ path: "/login" });
        } else {
          if(Array.isArray(msg)) {
            for(let item of msg) {
              this.$message.error(item);
            }
          }else {
            this.$message.error(msg);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #fff;
$dark_gray: #889aa4;
$light_gray: #eee;

::v-deep .el-checkbox {
  margin-right: 0 !important;
}
.forget-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
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

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 30px 35px 0;
      margin: 0 auto;
      overflow: hidden;

      /deep/ .el-input__inner {
        border-color: white;
      }

      .top-title {
        text-align: center;
        margin-bottom: 30px;
      }

      .center-cow {
        margin-bottom: 30px;
        border-bottom: 1px solid #dcdfe6;
        display: flex;
        align-items: center;

        img {
          margin-bottom: 10px;
        }
      }

      .iconfont {
        font-size: 20px;
      }

      .center-cow-tip {
        margin-bottom: 20px;
        border-bottom: 1px solid #dcdfe6;
      }

      .button-code {
        margin-bottom: 10px;
      }

      .agreement-box {
        margin-bottom: 30px;
        display: flex;
        align-items: center;

        .agreement-name {
          margin-left: 10px;

          .agreement-content-sty {
            color: #409EFF;
            cursor: pointer;
          }
        }
      }

      .agreement-button {
        display: flex;
        justify-content: center;

        .el-button {
          margin-left: 25px;
        }
      }

      .tip {
        font-size: 15px;
        margin-bottom: 10px;
      }
    }
  }
  .top-title {
    text-align: center;
    font-size: 16px;
    margin-bottom: 20px;
  }
  .agreement-content {
    height: 500px;
    overflow: auto;
  }
  .bottom-cancel {
    text-align: center;
    margin-top: 30px;
  }
}

/deep/.agreement-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
  .el-dialog__header {
    padding: 0 !important;
  }
}
</style>
