<template>
  <div class="right">
    <div class="top-title">注册登录设置</div>
    <div class="top-notice-title">注意: 设置以下选项之后，要点击下面的"保存"按钮，设置才生效</div>
    <div class="register-head">
      <div class="right-head-con1">注册设置</div>
      <div class="content-row">
        <div style="flex:1"> 用户注册</div>
        <div style="flex:6">
          <el-switch v-model="form.register_open" active-value="1" inactive-value="0"></el-switch>
        </div>
      </div>
      <div class="content-row">
        <div style="flex:1"> 用户默认有效期</div>
        <div style="flex:6">
          <el-input placeholder="请输入数值" style="width:20%;" v-model="form.endtime"></el-input> 天
          <div class="tip">注册后用户默认获得多少天有效期，比如365天！为空，为0则无限期！</div>
        </div>
      </div>
      <div class="content-row">
        <div style="flex:1">默认可建平台数量</div>
        <div style="flex:6">
          <el-input placeholder="请输入数值" style="width:20%;" v-model="form.application_number"></el-input> 个
        </div>
      </div>
      <div class="content-row">
        <div style="flex:1">
          密码强度校验
        </div>
        <div style="flex:5">
          开启后，登录密码设置长度至少为8位，要求包括数字，字母，大小写和特殊符号(.!~@#$%^&*?()+_- )
        </div>
        <div style="flex:1">
          <el-switch
            v-model="form.password_verify"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </div>
      </div>
    </div>
    <div class="right-head">
      <div class="right-head-con1">登录设置</div>
      <!-- <div class="tip" style="color:red">
        注意：设置以下选项之后，需点击下面的‘保存’按钮，设置才生效
      </div> -->
    </div>
    <div class="content">
      <div class="content-row">
        <div style="flex:1">
          修改密码
        </div>
        <div style="flex:5">
          开启后，首次登录的用户弹窗提示修改密码
        </div>
        <div style="flex:1">
          <el-switch
            v-model="form.password_change"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </div>
      </div>

      <!-- <div class="content-row">
        <div style="flex:1">
          自动退出
        </div>
        <div style="flex:5">
          登录后长时间无操作系统自动退出
        </div>
        <div style="flex:1">
          <el-button type="text" @click="is_out = true">修改</el-button>
        </div>
      </div> -->
      <div class="content-row">
        <div style="flex:1">
          图形验证码
        </div>
        <div style="flex:5">
          开启后，用户需要输入图形验证码
        </div>
        <div style="flex:1">
          <el-switch
            v-model="form.pic_verify"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </div>
      </div>
      <div class="content-row">
        <div style="flex:1">
          短信验证码
        </div>
        <div style="flex:5">
          开启后，用户需要输入短信验证码
        </div>
        <div style="flex:1">
          <el-switch
            v-model="form.sms_verify"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </div>
      </div>
      <div class="content-row">
        <div style="flex:1">
          登录限制
        </div>
        <div style="flex:5">
          设置登录失败超出限定次数
        </div>
        <div style="flex:1">
          <el-button type="text" @click="is_limit=true">修改</el-button>
        </div>
      </div>
      <div class="content-row">
        <div style="flex:1">
          登录有效期
        </div>
        <div style="flex:5">
          设置登录有效期，默认为永久有效，有效期最低为2小时
        </div>
        <div style="flex:1">
          <el-button type="text" @click="is_expire=true">修改</el-button>
        </div>
      </div>
      <!-- <div class="content-row">
        <div style="flex:1">
          单点登录
        </div>
        <div style="flex:5">
          开启后，一个账号只能在一地登录
        </div>
        <div style="flex:1">
          <el-switch
            v-model="form.single_login"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </div>
      </div> -->
      <!-- <div class="content-row">
        <div style="flex:1">
          总是记住密码
        </div>
        <div style="flex:5">
          开启后，登陆成功下次登录不需要再次输入密码
        </div>
        <div style="flex:1">
          <el-switch
            v-model="form.remember_pwd"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </div>
      </div> -->
      <div class="content-row">
        <div style="flex:1">
          强制修改密码
        </div>
        <div style="flex:5">
          三个月未修改密码的账号禁止使用
        </div>
        <div style="flex:1">
          <el-switch
            v-model="form.force_change_pwd"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </div>
      </div>
      <div class="content-row">
        <div style="flex:1">
          IP白名单
        </div>
        <div style="flex:5">
          开启后，只有后台添加的IP地址才能登录后台(总账号不受白名单限制,其他账号受限)
        </div>
        <div style="flex:1">
          <el-switch
            v-model="form.white_list_verify"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </div>
      </div>
    </div>

    <div class="register-head">
      <div class="right-head-con1">用户协议</div>
      <div class="content-row">
        <div style="flex:1"> 协议标题</div>
        <div style="flex:6">
          <el-input placeholder="请输入标题" style="width:40%;" v-model="form.agreement_title"></el-input>
        </div>
      </div>
      <div class="content-row">
        <div style="flex:1"> 用户协议</div>
        <div style="flex:6">
          <Tinymce class="tinymce-sty" v-model="form.agreement_content"></Tinymce>
        </div>
      </div>
    </div>

      <div class="content-row" style="padding-top:20px;">
        <el-button type="primary" @click="submitForm">保存</el-button>
      </div>
      <el-dialog title="设置自动退出时间" :visible.sync="is_out">
        <div style="text-align:center;">
          <el-tag type="danger" style="margin-bottom:30px">
            <i class="el-icon-warning"></i>
            登录状态下，若长时间无操作系统将自动退出！
          </el-tag>
          <el-tag type="danger" style="margin-bottom:30px;font-size:14px;">
            <i class="el-icon-warning"></i>
            需要修改，请到商城config文件夹下，找到session.php的'lifetime'参数自行修改，单位默认为分钟
          </el-tag>

          <!-- <div style="padding:40px 0;">
            <el-radio v-model.number="plugin_status" :label="1">15分钟</el-radio>
            <el-radio v-model.number="plugin_status" :label="2">30分钟</el-radio>
            <el-radio v-model.number="plugin_status" :label="3">1小时</el-radio>
            <el-radio v-model.number="plugin_status" :label="4">自行设置</el-radio>
            <el-input style="padding-top:40px;">
              <template slot="append">分钟</template>
            </el-input>
          </div> -->
        <div>
          <el-button type="primary" @click="is_out = false">确定</el-button>
          <el-button @click="is_out = false">取消</el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" style="text-align:center">
      </span>
    </el-dialog>
    <el-dialog title="修改登录限制" :visible.sync="is_limit">
      <div style="text-align:center;">
        <div style="padding:40px 0;">
          <el-input style="" v-model="login_limit_num">
            <template slot="prepend">登录限制次数</template>
            <template slot="append">次</template>
          </el-input>
          <!-- <el-input style="padding-top:20px;" v-model="login_limit_time">
            <template slot="prepend">登录限制时间</template>
            <template slot="append">分钟</template>
          </el-input> -->
        </div>
        <div>
          <el-button type="primary" @click="isNumber()">确定</el-button>
          <el-button @click="is_limit = false">取消</el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" style="text-align:center">
      </span>
    </el-dialog>
    <el-dialog title="修改登录限制" :visible.sync="is_expire">
      <div style="text-align:center;">
        <div style="padding:40px 0;">
          <el-input style="" v-model="login_expire_num">
            <template slot="prepend">登录有效期</template>
            <template slot="append">分</template>
          </el-input>
          <!-- <el-input style="padding-top:20px;" v-model="login_limit_time">
            <template slot="prepend">登录限制时间</template>
            <template slot="append">分钟</template>
          </el-input> -->
        </div>
        <div>
          <el-button type="primary" @click="isNumberExpire()">确定</el-button>
          <el-button @click="is_expire = false">取消</el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" style="text-align:center">
      </span>
    </el-dialog>

  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";

export default {
  name: "website-setting",
  components: { Tinymce },
  data() {
    return {
      submit_loading: false,
      form: {
        register_verify:"1",
        password_change: "0",
        password_verify: "0",
        pic_verify: "0",
        sms_verify: "0",
        login_limit_num:'',
        login_expire_num:'',

        // login_limit_time:'',
        // single_login:'0',
        // remember_psd:'1',
        force_change_pwd:'0',
        white_list_verify:'0',
        register_open: 1,
        endtime: "",
        application_number:"",
        agreement_title: "",
        agreement_content: ""
      },

      login_limit_num: "",
      login_expire_num:"",
      // login_limit_time: "",

      is_out: false,
      is_limit: false,
      is_expire:false,

      plugin_status: "",

      rules: {}
    };
  },
  created() {
    this.getData();
    window.addEventListener("beforeunload", e => {
      window.onbeforeunload = null;
    });
  },
  destroyed() {},
  methods: {
    isNumber() {
      if (!/^[1-9]\d*$/.test(this.login_limit_num)) {
        this.$message.error("请输入正确的数值");
        return false;
      }
      // if (!/^[1-9]\d*$/.test(this.login_limit_time)) {
      //   this.$message.error("请输入正确的数值");
      //   return false;
      // }
      this.form.login_limit_num = this.login_limit_num;
      // this.form.login_limit_time = this.login_limit_time;
      this.is_limit = false;
    },
    isNumberExpire() {
      if (!/^[1-9]\d*$/.test(this.login_expire_num)) {
        this.$message.error("请输入正确的数值");
        return false;
      }
      // if (!/^[1-9]\d*$/.test(this.login_limit_time)) {
      //   this.$message.error("请输入正确的数值");
      //   return false;
      // }
      this.form.login_expire_num = this.login_expire_num;
      // this.form.login_limit_time = this.login_limit_time;
      this.is_expire = false;
    },
    submitForm(form) {
      $http
        .post("/admin/system/login_set", { setdata: {...this.form} }, "保存中")
        .then(response => {
          if (response.result === 1) {
            if (response.msg && response.msg != "") {
              this.$message.success("保存成功！");
            }
            window.location.reload();
          } else {
            if (response.msg && response.msg != "") {
              this.$message.error(response.msg);
            }
          }
        })
        .catch(() => {
          // this.$message.error("保存失败！");
        });
    },
    getData() {
      $http
        .post("/admin/system/login_set", {}, "加载中")
        .then(response => {
          if (response.result == 1) {
            this.form = response.data;
            if (this.form.login_limit_num) {
              this.login_limit_num = this.form.login_limit_num;
            }
            if (this.form.login_expire_num) {
              this.login_expire_num = this.form.login_expire_num;
            }
            // if (this.form.login_limit_time) {
            //   this.login_limit_time = this.form.login_limit_time;
            // }
            console.log(this.form);
          } else {
            if (response.msg && response.msg != "") {
              this.$message.error(response.msg);
            }
          }
        })
        .catch(() => {
        });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.right {
  padding-left: 30px;

  .top-title {
    margin: 30px 0;
  }

  .top-notice-title {
    margin-top: 10px;
    font-size: 13px;
    color: red;
  }

  .register-head {
    padding: 15px 0;
    line-height: 50px;
    margin-bottom: 15px;

    .content-row {
      display: flex;
      flex: 1;
      // border-bottom: 1px solid #cccccc;
      margin-left: 80px;
    }

    .right-head-con1 {
      // float:left;
      font-size: 16px;
      // color: #888;
      border-left: 3px solid #409EFF;
      line-height: 1;
      padding: 0 20px 0 10px;
      margin: 0 0 20px 0;
    }
  }

  .right-head {
    padding: 15px 0;
    line-height: 50px;
    // border-bottom: 1px #ccc solid;
    margin-bottom: 15px;
    .right-head-con1 {
      // float:left;
      padding-right: 20px;
      font-size: 16px;
      // color: #888;
      border-left: 3px solid #409EFF;
      line-height: 1;
      padding-left: 10px;
      margin-bottom: 10px;
    }
  }
  .content {
    display: flex;
    flex-flow: column;
    margin-left: 80px;
    .content-row {
      display: flex;
      flex: 1;
      padding: 30px 0;
      // border-bottom: 1px solid #cccccc;
    }
  }
}
.el-tag {
  font-size: 20px;
  height: 40px;
  line-height: 40px;
}

.tinymce-sty {
  width:80%;
  margin-top: 20px;
}
</style>
