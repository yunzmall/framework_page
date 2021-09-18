<template>
  <div class="right">
    <el-form
      ref="all_form"
      :model="all_form"
      :rules="rules"
      label-width="15%"
      style="margin-top: 20px"
    >
      <el-form-item label="" prop="type">
        <el-radio v-model="all_form.type" :label="1">互亿无限</el-radio>
        <el-radio v-model="all_form.type" :label="2">阿里大鱼</el-radio>
        <el-radio v-model="all_form.type" :label="3">阿里云</el-radio>
        <el-radio v-model="all_form.type" :label="4">腾讯云</el-radio>
      </el-form-item>

      <div v-if="all_form.type == 1">
        <el-form-item label="国内短信账号" prop="account">
          <el-input
            v-model="all_form.account"
            style="width:70%;"
            placeholder="请输入国内短信账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="国内短信密码" prop="password">
          <el-input
            v-model="all_form.password"
            style="width:70%;"
            placeholder="请输入国内短信密码"
          ></el-input>
        </el-form-item>

        <el-form-item label="国际短信账号" prop="account2">
          <el-input
            v-model="all_form.account2"
            style="width:70%;"
            placeholder="请输入国际短信账号"
          ></el-input>
        </el-form-item>

        <el-form-item label="国际短信密码" prop="password2">
          <el-input
            v-model="all_form.password2"
            placeholder="请输入国际短信密码"
            style="width:70%;"
          ></el-input>
        </el-form-item>
      </div>

      <div v-if="all_form.type == 2">
        <div style="width: 70%;margin: 0 auto;">
          <el-tag class="tag_tips">
            <i class="el-icon-info"></i>请到 阿里大鱼
            去申请开通,短信模板中必须包含code和product,请参考默认用户注册验证码设置。
          </el-tag>
        </div>
        <el-form-item label="AppKey" prop="appkey">
          <el-input
            v-model="all_form.appkey"
            style="width:70%;"
            placeholder="请输入AppKey"
          ></el-input>
        </el-form-item>
        <el-form-item label="secret" prop="secret">
          <el-input
            v-model="all_form.secret"
            style="width:70%;"
            placeholder="请输入secret"
          ></el-input>
        </el-form-item>
        <el-form-item label="短信签名" prop="signname">
          <el-input
            v-model="all_form.signname"
            style="width:70%;"
            placeholder="请输入短信签名"
          ></el-input>
        </el-form-item>
        <el-form-item label="注册短信模板ID" prop="templateCode">
          <el-input
            v-model="all_form.templateCode"
            placeholder="请输入注册短信模板ID"
            style="width:70%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="注册模板变量" prop="product">
          <el-input
            v-model="all_form.product"
            style="width:70%;"
            placeholder="请输入注册模板变量"
          ></el-input>
        </el-form-item>
        <el-form-item label="找回密码短信模板ID" prop="templateCodeForget">
          <el-input
            v-model="all_form.templateCodeForget"
            placeholder="请输入找回密码短信模板ID"
            style="width:70%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="找回密码变量" prop="forget">
          <el-input
            v-model="all_form.forget"
            style="width:70%;"
            placeholder="请输入找回密码变量"
          ></el-input>
        </el-form-item>
         <el-form-item label="登录短信模板ID" prop="templateCodeLogin">
          <el-input
            v-model="all_form.templateCodeLogin"
            placeholder="请输入登录短信模板ID"
            style="width:70%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录变量" prop="login">
          <el-input
            v-model="all_form.login"
            style="width:70%;"
            placeholder="请输入登录变量"
          ></el-input>
        </el-form-item>
      </div>

      <div v-if="all_form.type == 3">
        <div style="width: 70%;margin: 0 auto;">
          <el-tag class="tag_tips">
            <i class="el-icon-info"></i>
            <!-- 请到 阿里云
            去申请开通,短信模板中必须包含number,请参考默认用户注册验证码设置。 -->
            阿里云申请开通短信模板需将阿里云默认模板中的code改为number，请参考默认用户注册验证码设置。
          </el-tag>
        </div>
        <el-form-item label="AccessKeyId" prop="aly_appkey">
          <el-input
            v-model="all_form.aly_appkey"
            style="width:70%;"
            placeholder="请输入AccessKeyId"
          ></el-input>
        </el-form-item>
        <el-form-item label="AccessKeySecret" prop="aly_secret">
          <el-input
            v-model="all_form.aly_secret"
            style="width:70%;"
            placeholder="请输入AccessKeySecret"
          ></el-input>
        </el-form-item>
        <el-form-item label="短信签名" prop="aly_signname">
          <el-input
            v-model="all_form.aly_signname"
            placeholder="请输入短信签名"
            style="width:70%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="注册模板编号" prop="aly_templateCode">
          <el-input
            v-model="all_form.aly_templateCode"
            placeholder="请输入注册模板编号"
            style="width:70%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="找回密码模板编号" prop="aly_templateCodeForget">
          <el-input
            v-model="all_form.aly_templateCodeForget"
            placeholder="请输入找回密码模板编号"
            style="width:70%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录模板编号" prop="aly_templateCodeLogin">
          <el-input
            v-model="all_form.aly_templateCodeLogin"
            placeholder="请输入登录模板编号"
            style="width:70%;"
          ></el-input>
        </el-form-item>
      </div>

      <div v-if="all_form.type == 4">
        
        <el-form-item label="SDKAppID" prop="tx_sdkappid">
          <el-input
            v-model="all_form.tx_sdkappid"
            style="width:70%;"
            placeholder="请输入SDKAppID"
          ></el-input>
        </el-form-item>
        <el-form-item label="AppKey" prop="tx_appkey">
          <el-input
            v-model="all_form.tx_appkey"
            style="width:70%;"
            placeholder="请输入AppKey"
          ></el-input>
        </el-form-item>
        <el-form-item label="短信签名" prop="tx_signname">
          <el-input
            v-model="all_form.tx_signname"
            placeholder="请输入短信签名"
            style="width:70%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="注册模板编号" prop="tx_templateCode">
          <el-input
            v-model="all_form.tx_templateCode"
            placeholder="请输入注册模板编号"
            style="width:70%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="找回密码模板编号" prop="tx_templateCodeForget">
          <el-input
            v-model="all_form.tx_templateCodeForget"
            placeholder="请输入找回密码模板编号"
            style="width:70%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录模板编号" prop="tx_templateCodeLogin">
          <el-input
            v-model="all_form.tx_templateCodeLogin"
            placeholder="请输入登录模板编号"
            style="width:70%;"
          ></el-input>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button type="success" @click.stop.prevent="submitForm('all_form')">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";

export default {
  name: "website-setting",
  components: { Tinymce },
  data() {
    return {
      activeName: "all",
      all_form: {
        type: 1,
        account: "",
        password: "",
        account2: "",
        password2: "",
        appkey: "",
        secret: "",
        signname: "",
        templateCode: "",
        product: "",
        templateCodeForget: "",
        forget: "",
        templateCodeLogin:'',
        login:'',
        aly_appkey: "",
        aly_secret: "",
        aly_signname: "",
        aly_templateCode: "",
        aly_templateCodeForget: "",
        aly_templateCodeLogin:'',
        tx_sdkappid:"",
        tx_appkey:"",
        tx_signname:"",
        tx_templateCode:"",
        tx_templateCodeForget:"",
        tx_templateCodeLogin:"",
      },
      rules: {
        account: [
          { required: true, message: "请输入国内短信账号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入国内短信密码", trigger: "blur" }
        ],
        appkey: [{ required: true, message: "请输入AppKey", trigger: "blur" }],
        secret: [{ required: true, message: "请输入secret", trigger: "blur" }],
        signname: [
          { required: true, message: "请输入短信签名", trigger: "blur" }
        ],
        templateCode: [
          { required: true, message: "请输入注册短信模板ID", trigger: "blur" }
        ],
        product: [
          { required: true, message: "请输入注册模板变量", trigger: "blur" }
        ],
        templateCodeForget: [
          {
            required: true,
            message: "请输入找回密码短信模板ID",
            trigger: "blur"
          }
        ],
        forget: [
          { required: true, message: "请输入找回密码变量", trigger: "blur" }
        ],
        templateCodeLogin: [
          { required: true, message: "请输入登录短信模板ID", trigger: "blur" }
        ],
        login: [
          { required: true, message: "请输入登录变量", trigger: "blur" }
        ],
        aly_appkey: [
          { required: true, message: "请输入AccessKeyId", trigger: "blur" }
        ],
        aly_secret: [
          { required: true, message: "请输入AccessKeySecret", trigger: "blur" }
        ],
        aly_signname: [
          { required: true, message: "请输入短信签名", trigger: "blur" }
        ],
        aly_templateCode: [
          { required: true, message: "请输入注册模板编号", trigger: "blur" }
        ],
        aly_templateCodeForget: [
          { required: true, message: "请输入找回密码模板编号", trigger: "blur" }
        ],
        aly_templateCodeLogin: [
          { required: true, message: "请输入登录模板编号", trigger: "blur" }
        ],
        tx_sdkappid: [
          { required: true, message: "请输入SDKAppID", trigger: "blur" }
        ],
        tx_appkey: [
          { required: true, message: "请输入AppKey", trigger: "blur" }
        ],
        tx_signname: [
          { required: true, message: "请输入短信签名", trigger: "blur" }
        ],
        tx_templateCode: [
          { required: true, message: "请输入注册模板编号", trigger: "blur" }
        ],
        tx_templateCodeForget: [
          { required: true, message: "请输入找回密码模板编号", trigger: "blur" }
        ],
        tx_templateCodeLogin: [
          { required: true, message: "请输入登录模板编号", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getData();
  },
  destroyed() {},
  methods: {
    getData() {
      $http
        .post("/admin/detail/", {}, "加载中")
        .then(response => {
          if (response.result === 1) {
            this.all_form = response.data;
          } else {
            if(response.msg && response.msg!='') {
              this.$message.error(response.msg);
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          $http
            .post("/admin/system/sms", this.all_form, "提交中")
            .then(response => {
              if (response.result === 1) {
                if(response.msg && response.msg!='') {
                  this.$message.success("提交成功！");
                }
                this.$refs[formName].resetFields();
                this.getData();
              } else {
                if(response.msg && response.msg!='') {
                  this.$message.error(response.msg);
                }
              }
            })
            .catch(err => {
              console.error(err);
            });
        } else {
          return false;
        }
      });
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
    .right-head-con {
      // float:left;
      padding-right: 20px;
      font-size: 16px;
      color: #888;
    }
  }
  .rightlist-head {
    font-weight: 500;
    font-size: 18px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
  }
  .tip {
    color: #999;
  }
}
.tag_tips {
  margin-bottom: 10px;
  padding: 5px 0 5px 5px;
  height: 40px;
  font-size: 18px;
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
.avatar {
  width: 178px;
  height: 178px;
  display: block;
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
  width: 200px;
  .el-icon-circle-close {
    position: absolute;
    top: 10px;
    right: 0;
    color: #999;
  }
}
</style>
