<template>
  <div class="forget-container">
    <div style="width:95%;margin:0 auto">
      <el-steps :active="active" align-center style="margin-top: 20px">
        <el-step title="验证手机号"></el-step>
        <el-step title="设置新手机"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-row class="content_info">
        <el-col :span="24" class="login_input">
          <el-form
            v-if="active == 0"
            ref="form"
            :model="form"
            :rules="rules1"
            class="login-form"
            label-width="15%"
          >
            <el-form-item label="请输入绑定的密保手机号" prop="mobile">
              <el-input
                v-model="form.mobile"
                placeholder="请输入绑定的密保手机号"
                style="width:65%"
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
                style="width:65%"
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
            <el-form-item label="新手机号" prop="new_mobile">
              <el-input
                v-model="new_form.new_mobile"
                placeholder="请输入新手机号"
                style="width:65%"
              ></el-input>
              <el-button
                v-show="show1"
                type="primary"
                size="small"
                @click.native.prevent="getNewCode"
              >
                获取手机验证码
              </el-button>
              <el-button v-show="!show1" type="primary" disabled size="small">
                {{ count1 }}秒后重新获取
              </el-button>
            </el-form-item>
            <el-form-item label="输入手机短信验证码" prop="code">
              <el-input
                v-model="new_form.code"
                placeholder="输入手机短信验证码"
                style="width:65%"
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
            <span class="text">修改手机号成功</span>
            <el-button plain @click="toLogin">点击返回登录页面</el-button>
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
    let validateMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新手机号"));
      } else if (this.fun.isMoblie(value)) {
        callback(new Error("请输入正确的手机格式!"));
      } else {
        callback();
      }
    };
    return {
      active: 0,
      logo:"",
      new_form: {
        new_mobile:"",
      },
      form: {
        mobile: "",
        code: ""
      },
      rules: {
        new_mobile:[
                {validator: validateMobile, required: true, }
            ],
        // code:{ required: true, message: "请输入验证码" },/
        // password: [{ required: true, trigger: "blur", message: "请输入密码" }],
        // re_password: [
        //   { validator: validatePass2, required: true, trigger: "blur" }
        // ]
      },
      rules1:{
        //   code:{ required: true, message: "请输入验证码" },
      },
      show: true,
      count: "",
      show1: true,
      count1: "",
      passwordType: "password"
    };
  },
  watch: {},
  created() {
   
  },
  destroyed() {},
  methods: {
    
    getCode() {
      if (this.fun.isMoblie(this.form.mobile)) {
        this.$message.error("请输入正确的手机号码");
        return;
      }
      $http
        .post("/admin/user/send_code", { mobile: this.form.mobile }, " ")
        .then(response => {
          if (response.result === 1) {
            this.getTimer();
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
    getNewCode() {
        if (this.fun.isMoblie(this.new_form.new_mobile)) {
            this.$message.error("请输入正确的手机号码");
            return;
        }
        $http
            .post("/admin/user/send_new_code", { mobile: this.new_form.new_mobile }, " ")
            .then(response => {
            if (response.result === 1) {
                this.getTimer1();
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
    next() {
        if (!this.form.mobile) {
            this.$message.error("请输入手机号");
            return;
        }
        if (this.fun.isMoblie(this.form.mobile)) {
            this.$message.error("请输入正确的手机号码");
            return;
        }
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
              if(response.msg && response.msg!='') {
                MessageBox.alert(response.msg);
              }
            }
        })
        .catch(err => {
            console.log(err);
        });
    },
    submitForm() {
        if (this.fun.isMoblie(this.new_form.new_mobile)) {
            this.$message.error("请输入正确的手机号码");
            return;
        }
        if (!this.new_form.new_mobile) {
            this.$message.error("请输入手机号码");
            return;
        }
        if (!this.new_form.code) {
            this.$message.error("请输入验证码");
            return;
        }
      this.$refs.new_form.validate(valid => {
        if (valid) {
            $http
                .post(
                "/admin/checkCode/",
                { mobile: this.new_form.new_mobile, code: this.new_form.code },
                " "
                )
                .then(response => {
                if (response.result === 1) {
                    this.submit();
                    
                } else {
                  if(response.msg && response.msg!='') {
                    MessageBox.alert(response.msg);
                  }
                }
            })
            .catch(err => {
                console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submit() {
        let json = {data:{old_mobile: this.form.mobile,mobile: this.new_form.new_mobile,}};
        $http
            .post(
              "/admin/user/modify_mobile",
              json,
              "提交中"
            )
            .then(response => {
              if (response.result === 1) {
                if(response.msg && response.msg!='') {
                  this.$message.success("提交成功！");
                }
                this.$refs["new_form"].resetFields();
                this.active = this.active+2;
              } else {
                if(response.msg && response.msg!='') {
                  this.$message.error(response.msg);
                }
              }
            })
            .catch(err => {
              this.active--;
              console.error(err);
            });
    },
    toLogin() {
      this.$router.push({ path: "/login" });
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
    getTimer1() {
      const NEW_TIME_COUNT = 60;
      if (!this.timer1) {
        this.count1 = NEW_TIME_COUNT;
        this.show1 = false;
        this.timer1 = setInterval(() => {
          if (this.count1 > 0 && this.count1 <= NEW_TIME_COUNT) {
            this.count1--;
          } else {
            this.show1 = true;
            clearInterval(this.timer1);
            this.timer1 = null;
          }
        }, 1000);
      }
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
    margin-top: 40px;
    display: flex;
    align-items: center;
    .login_input {
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.08) inset  ;
      background: #fff;
      input:focus {
        color: #333;
      }
    }
  }
  .login-form {
    position: relative;
    width: 90%;
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
    font-size: 70px;
    margin-bottom: 1rem;
  }
}
</style>
