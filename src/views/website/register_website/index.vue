<template>
  <div class="right">
    <div class="right-head">
      <div class="right-head-con1">注册站点</div>
    </div>
    <el-row v-if="type == 'register'">
      <el-form ref="form" :model="form" :rules="rules" label-width="15%">
        <el-form-item>
          <el-button type="primary" @click="redirect(1)" plain
            >免费版</el-button
          >
          <el-button type="primary" @click="redirect(2)" plain
            >授权版</el-button
          >
        </el-form-item>
      </el-form>
    </el-row>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="15%"
      v-if="type == 'auth'"
    >
      <el-form-item label="key" prop="key">
        <el-input
          v-model="key"
          placeholder="请输入key"
          style="width:70%"
        ></el-input>
      </el-form-item>

      <el-form-item label="密钥" prop="secret">
        <el-input
          v-model="secret"
          placeholder="请输入密钥"
          style="width:70%"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="15%"
      v-if="type == 'free'"
    >
      <el-form-item label="公司名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入公司名称"
          style="width:70%"
        ></el-input>
      </el-form-item>
      <el-form-item label="行业" prop="trades">
        <el-select
          v-model="form.trades"
          style="width:70%"
          placeholder="请选择行业"
        >
          <el-option
            v-for="item in industry_list.data"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在区域" required>
        <div style="width:70%;">
          <div style="width:33.3%;float:left;">
            <el-form-item prop="province">
              <el-select
                v-model="form.province"
                value-key="id"
                placeholder="省"
                @change="change_province"
                style="width:95%;"
              >
                <el-option
                  v-for="item in province_list"
                  :key="item.id"
                  :label="item.areaname"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width:33.4%;float:left;">
            <el-form-item prop="city">
              <el-select
                v-model="form.city"
                value-key="id"
                placeholder="市"
                @change="change_city"
                style="width:95%;"
              >
                <el-option
                  v-for="item in city_list"
                  :key="item.id"
                  :label="item.areaname"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="width:33.3%;float:left;">
            <el-form-item prop="area">
              <el-select
                v-model="form.area"
                value-key="id"
                placeholder="区"
                style="width:100%"
              >
                <el-option
                  v-for="item in area_list"
                  :key="item.id"
                  :label="item.areaname"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input
          v-model="form.address"
          placeholder="请输入详细地址"
          style="width:70%"
        ></el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="mobile">
        <el-input
          placeholder="请输入手机号"
          v-model="form.mobile"
          style="width:70%"
          autocomplete="off"
        ></el-input>
        <el-button @click="sendSms()" :disabled="isDisabled == 0">{{
          captcha_text
        }}</el-button>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <el-input
          v-model="form.captcha"
          style="width:70%"
          placeholder="请输入验证码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="onSubmit('form')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
// import "@/views/website/register_website/industry.js";
import industry from "./industry";
export default {
  name: "website-setting",
  components: {
    Tinymce
  },
  data() {
    var validateMobile = (rule, value, callback) => {
      if (!/^1\d{10}$/.test(value)) {
        callback(new Error("手机号格式不正确"));
      } else {
        callback();
      }
    };
    return {
      key: "", //key
      secret: "", //密钥
      captcha_text: "获取验证码",
      form: {
        name: "",
        trades: "",
        province: "",
        city: "",
        area: "",
        address: "",
        mobile: "",
        captcha: ""
      },
      type: "",
      province_list: [], //省列表
      city_list: [],
      area_list: [],
      industry_list: industry, //行业列表
      t: 60,
      isDisabled: 1,
      pageSize: 0,
      current_page: 0,
      total: 0,
      rules: {
        name: {
          required: true,
          message: "请输入公司名称",
          trigger: "blur"
        },
        trades: {
          required: true,
          message: "请选择行业",
          trigger: "change"
        },
        province: {
          required: true,
          message: "请选择省",
          trigger: "change"
        },
        city: {
          required: true,
          message: "请选择市",
          trigger: "change"
        },
        area: {
          required: true,
          message: "请选择区",
          trigger: "change"
        },
        address: {
          required: true,
          message: "请输入详情地址",
          trigger: "blur"
        },
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
        ],
        captcha: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getData();
    console.log(this.industry);
  },
  destroyed() {},
  methods: {
    redirect(x) {},
    reg_shop(key) {},

    change_province: function(item) {
      let that = this;
      $http
        .post(
          "/admin/system/siteRegister/getcity",
          {
            data: item
          },
          "加载中"
        )
        .then(response => {
          that.city_list = response.data;
          that.form.city = "";
          that.form.area = "";
        })
        .catch(() => {
          // console.log("获取数据失败！");
        });
    },
    change_city(item) {
      let that = this;
      $http
        .post(
          "/admin/system/siteRegister/getarea",
          {
            data: item
          },
          "加载中"
        )
        .then(response => {
          that.area_list = response.data;
          that.form.area = "";
        })
        .catch(() => {
          // console.log("获取数据失败！");
        });
    },

    sendSms: function() {
      let that = this;
      let rTime = that.t;

      if (!/^1\d{10}$/.test(this.form.mobile)) {
        this.$refs.form.validateField("mobile");
        return false;
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

      $http
        .post("/admin/system/siteRegister/sendSms", {
          mobile: this.form.mobile
        })
        .then(
          response => {
            if (response.data.result) {
              if(response.msg && response.msg!='') {
                this.$message.success(response.msg);
              }
            } else {
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
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          $http
            .post(
              "/admin/system/siteRegister/register",
              {
                setdata: this.form
              },
              "努力注册中"
            )
            .then(response => {
              if (response.result === 1) {
                if(response.msg && response.msg!='') {
                  this.$message.success("保存成功！");
                }
                this.getData();
              } else {
                if(response.msg && response.msg!='') {
                  this.$message.error(response.msg);
                }
              }
            })
            .catch(() => {
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getData() {
      $http
        .get("/admin/system/siteRegister/index", {}, "加载中")
        .then(response => {
          this.type = response.data.page.type;
          this.province_list = response.data.province.data;
          this.key = response.data.set.key;
          this.secret = response.data.set.secret;
        })
        .catch(() => {
        });
    },
    reset() {
      let data = { key: this.key, secret: this.secret };
      $http
        .post("/admin/system/siteRegister/reset", { data: data })
        .then(response => {
          if (response.result == 1) {
            if(response.msg && response.msg!='') {
              this.$message.success(response.msg);
            }
            this.resetAgain();
          } else {
            if(response.msg && response.msg!='') {
              this.$message.error(response.msg);
            }
          }
        })
        .catch(() => {
          console.log("获取数据失败！");
        });
    },
    resetAgain() {
      $http
        .post("/admin/system/siteRegister/reset")
        .then(response => {
          if (response.result == 1) {
            window.location.reload();
          } else {
            if(response.msg && response.msg!='') {
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
