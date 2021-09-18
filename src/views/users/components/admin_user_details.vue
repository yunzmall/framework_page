<template>
  <div class="right">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <router-link to="/users/admin">管理员用户</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span v-if="!isEdit">新增</span><span v-else>编辑</span>用户
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      ref="form"
      :model="form"
      style="margin-top: 20px;"
      :rules="rules"
      label-width="15%"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="form.username"
          placeholder="请输入用户名，用户名为3-30个字符，包括汉字、大小写字母、数字"
          style="width:70%"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="!isEdit" label="密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码，如开启密码校验，则密码长度至少为8位,要求包括数字，大小写字母和特殊字符"
          type="password"
          style="width:70%"
        ></el-input>
        <div class="tip special">特殊符号包括(.!~@#$%^&*?()+_- )</div>
      </el-form-item>
      <el-form-item v-if="!isEdit" label="确认密码" prop="re_password">
        <el-input
          v-model="form.re_password"
          placeholder="请输入确认密码，如开启密码校验，则密码长度至少为8位,要求包括数字，大小写字母和特殊字符"
          type="password"
          style="width:70%"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input
          v-model="form.mobile"
          style="width:70%"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="建平台数量"
        prop="application_number"
        v-if="role_name != '操作员'"
      >
        <el-input
          v-model.number="form.application_number"
          placeholder="请输入建平台数量"
          style="width:70%"
        ></el-input>
        <div class="tip">创建平台数量(为0或为空则不允许创建)</div>
      </el-form-item>
      <el-form-item label="有效期" prop="endtime">
        <el-date-picker
          v-model="form.endtime"
          :disabled="is_unlimited"
          type="date"
          placeholder="请选择有效期"
          style="width:50%"
        ></el-date-picker>
        <el-checkbox v-model="is_unlimited" style="width:5%">永久 </el-checkbox>
      </el-form-item>

      <el-form-item label="头像" prop="avatar">
        <el-input
          v-model="form.avatar"
          style="width:70%"
          disabled
          placeholder="请上传头像"
        ></el-input>
        <el-button size="small" type="primary" @click="openUpload('avatar')"
          >点击上传
        </el-button>
        <div class="avatar-uploader-box">
          <img v-if="form.avatar" :src="form.avatar" class="avatar" />
          <!--<div slot="tip" class="el-upload-tip">(请上传100*60px方形图片)</div>-->
          <i
            v-show="form.avatar"
            class="el-icon-circle-close"
            @click="clearImg('avatar')"
            title="点击清除图片"
          ></i>
        </div>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="form.remark"
          type="textarea"
          rows="7"
          placeholder="可输入备注信息"
          style="width:70%"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm('form')">
          保存
        </el-button>
      </el-form-item>
    </el-form>

    <!--弹框上传图片-->
    <el-dialog :visible.sync="centerDialogVisible" width="65%" center>
      <el-tabs v-model="activeName2" type="card">
        <el-tab-pane label="上传图片" name="first">
          <div
            style="text-align: center"
            class="submit_Img"
            v-loading="submit_loading"
          >
            <el-upload
              class="avatar-uploader"
              action="/admin/all/upload"
              accept="image/*"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :before-upload="beforeUpload"
            >
              <div class="avatar_box" v-if="uploadImg">
                <img :src="uploadImg" class="avatar" />
              </div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-tab-pane>
        <el-tab-pane label="提取网络图片" name="second">
          <el-input
            v-model="uploadImg"
            placeholder="请输入网络图片地址"
            style="width:90%"
          ></el-input>
        </el-tab-pane>
        <el-tab-pane label="浏览图片" name="third">
          <div>
            <el-radio-group v-model="radio1" size="medium" @change="chooseYear">
              <el-radio-button label="不限"></el-radio-button>
              <el-radio-button label="2019">2019年</el-radio-button>
              <el-radio-button label="2018">2018年</el-radio-button>
              <el-radio-button label="2017">2017年</el-radio-button>
              <el-radio-button label="2016">2016年</el-radio-button>
            </el-radio-group>
          </div>

          <div style="margin-top: 10px;">
            <el-radio-group v-model="radio2" size="small" @change="chooseMonth">
              <el-radio-button label="不限"></el-radio-button>
              <el-radio-button label="1">1月</el-radio-button>
              <el-radio-button label="2">2月</el-radio-button>
              <el-radio-button label="3">3月</el-radio-button>
              <el-radio-button label="4">4月</el-radio-button>
              <el-radio-button label="5">5月</el-radio-button>
              <el-radio-button label="6">6月</el-radio-button>
              <el-radio-button label="7">7月</el-radio-button>
              <el-radio-button label="8">8月</el-radio-button>
              <el-radio-button label="9">9月</el-radio-button>
              <el-radio-button label="10">10月</el-radio-button>
              <el-radio-button label="11">11月</el-radio-button>
              <el-radio-button label="12">12月</el-radio-button>
            </el-radio-group>
          </div>

          <div id="upload-img" class="imgList">
            <div class="avatar-uploader-box" v-for="(img,index) in ImgList" :key="index">
              <img
                @click="chooseTheImg(img.url)"
                :src="img.url"
                class="avatar"
              />
              <i
                class="el-icon-circle-close"
                @click="deleteImg(img.id)"
                title="点击清除图片"
              ></i>
            </div>
          </div>

          <el-pagination
            style="margin-top: 10px;text-align: right"
            background
            @current-change="currentChange"
            :page-size="pageSize"
            :current-page.sync="current_page"
            :total="total"
            layout="prev, pager, next"
          >
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureImg">确 定 </el-button>
      </span>
    </el-dialog>
    <!--end-->
  </div>
</template>

<script>
export default {
  name: "AdminUserDetail",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let validity_time = (rule, value, callback) => {
      if (this.is_unlimited) {
        callback();
      } else {
        if (value === "") {
          callback(new Error("请选择有效日期"));
        }
      }
      callback();
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      submit_loading: false,
      ImgList: [],
      //弹框上传图片的路径
      uploadImg: "",
      chooseImg: "",
      radio1: "不限", //年
      radio2: "不限", //月
      activeName2: "first",
      //是否显示弹框
      centerDialogVisible: false,
      pageSize: 0,
      current_page: 0,
      total: 0,
      role_name: "非操作员", //判断是否是操作员，操作员隐藏建平台数

      is_unlimited: false, //有效期是否有限制
      form: {
        username: "",
        password: "",
        re_password: "",
        mobile: "",
        application_number: "",
        endtime: new Date(),
        avatar: "",
        remark: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名" }
          // { min: 3, max: 30, message: "长度在 3 到 30 个字符", trigger: "blur" }
        ],
        password: { required: true, message: "请输入密码" },
        re_password: [
          { validator: validatePass2, required: true, trigger: "blur" }
        ],
        mobile: { required: true, message: "请输入手机" }
      },
      uid: ""
    };
  },
  computed: {},
  created() {
    if (this.isEdit) {
      this.uid = this.$route.params.id;
      this.getData();
    }
    this.currentChange(1);
  },
  methods: {
    getData() {
      $http
        .post("/admin/user/edit", { uid: this.uid }, " ")
        .then(response => {
          if (response.result === 1) {
            this.form.username = response.data.username;
            this.form.mobile = response.data.has_one_profile.mobile;
            this.form.avatar = response.data.has_one_profile.avatar;
            this.form.application_number = response.data.application_number;
            this.form.remark = response.data.remark;
            if (response.data.has_one_app_user) {
              this.role_name = response.data.has_one_app_user.role_name;
            }
            if (!response.data.endtime) {
              this.is_unlimited = true;
              this.form.endtime = new Date();
            } else {
              this.form.endtime = response.data.endtime * 1000;
            }
          } else {
            // this.$message.error("获取失败!");
            if(response.msg && response.msg!='') {
              this.$message.error(response.msg);
            }
          }
        })
        .catch(err => {
          // this.$message.error("获取失败!");
          console.error(err);
        });
    },
    currentChange(val) {
      $http
        .get(
          "/admin/all/list",
          { page: val, year: this.radio1, month: this.radio2 },
          "loading"
        )
        .then(response => {
          if (response.result === 1) {
            this.total = response.data.total;
            this.ImgList = response.data.data;
            this.current_page = response.data.current_page;
            this.pageSize = response.data.per_page;
          } else {
            // this.list = response.data;
            if(response.msg && response.msg!='') {
              this.$message.error(response.msg);
            }
            // this.$message.error("接口请求错误");
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    chooseTheImg(img) {
      this.form[this.chooseImg] = img;
      this.centerDialogVisible = false;
    },
    chooseYear(year) {
      this.currentChange(1);
    },
    chooseMonth(month) {
      this.currentChange(1);
    },
    openUpload(str) {
      this.chooseImg = str;
      this.uploadImg = "";
      this.centerDialogVisible = true;
    },
    sureImg() {
      this.form[this.chooseImg] = this.uploadImg;
      this.centerDialogVisible = false;
    },
    clearImg(str) {
      this.form[str] = "";
    },
    deleteImg(id) {
      $http
        .get("/admin/all/delImg", { id: id }, " ")
        .then(response => {
          if (response.result === 1) {
            if(response.msg && response.msg!='') {
              this.$message.success("系统删除成功");
            }
            // this.$message.success("系统删除成功");
            this.currentChange(1);
          } else {
            if(response.msg && response.msg!='') {
              this.$message.error(response.msg);
            }
            // this.$message.error("删除出错");
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    uploadSuccess(res, file) {
      if (res.result === 1) {
        if (res.data.success) {
          this.uploadImg = res.data.success;
          this.$message.success("上传成功！");
        } else {
          this.$message.error(res.data.fail);
        }
      } else {
        if(res.msg && res.msg!='') {
          this.$message.error(res.msg);
        }
      }
      this.submit_loading = false;
    },
    beforeUpload(file) {
      this.submit_loading = true;
      const isLt2M = file.size / 1024 / 1024 < 4;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 4MB!");
        this.submit_loading = false;
      }
      return isLt2M;
    },
    submitForm(form) {
      if (this.is_unlimited) {
        this.form.endtime = 0;
      } else {
        if (Number.isInteger(this.form.endtime)) {
          this.form.endtime = this.form.endtime / 1000;
        } else {
          this.form.endtime = parseInt(this.form.endtime.getTime() / 1000);
        }
      }
      // if (this.form.application_number === 0) {
      //   this.$message.error("创建平台数量为0不允许创建！");
      //   return;
      // }
      let url = "";
      let dataJSON = {};
      if (this.isEdit) {
        url = "/admin/user/edit";
        delete this.form.password;
        delete this.form.re_password; // 编辑接口要去掉密码参数
        dataJSON = { user: this.form };
        dataJSON.uid = this.uid;
      } else {
        url = "/admin/user/create";
        dataJSON = { user: this.form };
      }
      this.$refs[form].validate(valid => {
        if (valid) {
          $http
            .post(url, dataJSON, "保存中")
            .then(response => {
              if (response.result === 1) {
                if(response.msg && response.msg!='') {
                  this.$message.success("添加成功！");
                }
                this.$router.push(this.fun.getUrl("Admin"));
                this.$refs[form].resetFields();
              } else {
                if(response.msg instanceof Array) {
                  var message = "";
                  response.msg.forEach(item => {
                    message += item + "   ";
                  });
                  if(message && message!='') {
                    this.$message.error(message);
                  }
                }
                else {
                  this.$message.error(response.msg);
                }
                this.form.endtime = new Date();
                this.is_unlimited = false;
              }
            })
            .catch(() => {
            });
        } else {
          console.log("error submit!!");
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
  .el-breadcrumb {
    padding: 30px 0;
    font-size: 16px;
  }
  .el-breadcrumb__inner {
    a {
      font-weight: 500;
    }
  }
  .tip {
    color: #999;
    font-size: 12px;
  }
}
.avatar-uploader .el-upload {
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
.special{
  color: #f56c6c !important;
}
</style>
