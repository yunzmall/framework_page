<template>
  <div class="right">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        ><router-link to="/manage/index"
          >平台管理</router-link
        ></el-breadcrumb-item
      >
      <el-breadcrumb-item>{{ text }}平台</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="15%"
      style="margin-top: 30px"
    >
      <el-form-item label="平台名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入平台名称"
          style="width:70%"
        ></el-input>
      </el-form-item>
      <!--<el-form-item label="平台跳转地址" prop="url">-->
      <!--<el-input-->
      <!--v-model="form.url"-->
      <!--placeholder="例如：https://dev8.yunzshop.com"-->
      <!--style="width:70%"-->
      <!--&gt;</el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="平台LOGO" prop="img">
        <el-input
          v-model="form.img"
          style="width:70%"
          disabled
          placeholder="请上传平台LOGO"
        ></el-input>
        <el-button size="small" type="primary" @click="openUpload('img')"
          >点击上传
        </el-button>
        <div class="avatar-uploader-box">
          <img v-if="form.img" :src="form.img" class="avatar" />
          <!--<div slot="tip" class="el-upload-tip">(请上传100*60px方形图片)</div>-->
          <i
            v-show="form.img"
            class="el-icon-circle-close"
            @click="clearImg('img')"
            title="点击清除图片"
          ></i>
        </div>
      </el-form-item>
      <el-form-item label="套餐">
        <el-select v-model="form.plugins_meal_id" filterable placeholder="请选择" style="width: 20%;">
          <el-option
            v-for="item in pluginsMealList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="有效期" prop="validity_time">
        <el-date-picker
          v-model="form.validity_time"
          :disabled="is_unlimited || isfounder==0 || type == 2"
          type="date"
          placeholder="请选择有效期"
          style="width:50%"
        ></el-date-picker>
        <el-checkbox v-model="is_unlimited" :disabled="isfounder==0" style="width:5%" v-if="type !== 1 && type !== 2">无限制</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm('form')">
          {{ text }}平台
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
            v-loading="imgLoading"
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
              <el-radio-button :label="item" v-for="(item,index) in yearData" :key="index">{{item}}年</el-radio-button>
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
  name: "PlatformManage",
  data() {
    var validity_time = (rule, value, callback) => {
      if (this.is_unlimited) {
        callback();
      } else {
        if (value === "") {
          callback(new Error("请选择有效日期"));
        }
      }
      callback();
    };
    return {
      ImgList: [],
      //弹框上传图片的路径
      uploadImg: "",
      chooseImg: "",
      radio1: "不限", //年
      radio2: "不限", //月
      activeName2: "first",
      yearData:[], //获取动态年份
      //是否显示弹框
      centerDialogVisible: false,
      pageSize: 0,
      current_page: 0,
      total: 0,

      text: "添加",
      search_form: {},
      is_unlimited: false,
      form: {
        validity_time: new Date(),
        img: "",
        // url: "",
        name: "",
        plugins_meal_id:""
      },
      loading: false,
      showDialog: false,
      redirect: undefined,
      imgLoading: false,
      isfounder:1,//是否能编辑到期时间
      rules: {
        name: [{ required: true, message: "请输入平台名称", trigger: "blur" }],
        // url: [
        //   { required: true, message: "请输入平台跳转地址", trigger: "blur" }
        // ],
        validity_time: [
          {
            validator: validity_time,
            type: "date",
            trigger: "change"
          }
        ],
        img: [{ required: true, message: "请选择上传图片", trigger: "blur" }]
      },
      pluginsMealList: [],
      type: "",  //0为不限制 ,1为不超过,2为指定时间
    };
  },
  created() {
    if (this.$route.query.type === "edit") {
      this.text = "编辑";
      this.id = this.$route.query.id;
      this.getData();
    }
    this.currentChange(1);
    // 获取套餐
    this.geTempower();
    //获取动态年份
    let year = (new Date()).getFullYear();
    for(let i = 0; i <= (year - 2016) ;i++){
      this.yearData.push(year - i)
    }
  },
  destroyed() {},
  methods: {
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
    getData() {
      $http
        .post("/admin/application/getApp", { id: this.id }, "加载中")
        .then(response => {
          if (response.result === 1) {
            this.form = response.data;
            this.isfounder = response.data.isfounder;
            if (!response.data.validity_time) {
              this.is_unlimited = true;
              this.form.validity_time = new Date();
            } else {
              this.form.validity_time = response.data.validity_time * 1000;
            }
          } else {
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
          "加载中"
        )
        .then(response => {
          if (response.result === 1) {
            this.total = response.data.total;
            this.ImgList = response.data.data;
            this.current_page = response.data.current_page;
            this.pageSize = response.data.per_page;
          } else {
            this.list = response.data;
            if(response.msg && response.msg!='') {
              this.$message.error(response.msg);
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
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
            this.currentChange(1);
          } else {
            // this.$message.error("删除出错");
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
          if (this.is_unlimited) {
            this.form.validity_time = 0;
          } else {
            if (Number.isInteger(this.form.validity_time)) {
              this.form.validity_time = this.form.validity_time / 1000;
            } else {
              this.form.validity_time = parseInt(
                this.form.validity_time.getTime() / 1000
              );
            }
          }
          let url = "";
          if (this.$route.query.type === "edit") {
            url = "/admin/application/update/" + this.id;
            this.form.id = this.id;
          } else {
            url = "/admin/application/add";
          }
          $http
            .post(url, this.form, "提交中")
            .then(response => {
              if (response.result === 1) {
                if(response.msg && response.msg!='') {
                  this.$message.success("提交成功！");
                }
                this.$refs[formName].resetFields();
                this.$router.push({ path: "/manage/index" });
              } else {
                // this.$message.error("提交失败!");
                if(response.msg && response.msg!='') {
                  this.$message.error(response.msg);
                }
              }
              this.loading = false;
            })
            .catch(err => {
              // this.$message.error("提交失败!");
              this.loading = false;
              console.error(err);
            });
        } else {
          return false;
        }
      });
    },
    uploadSuccess(res, file) {
      if (res.result === 1) {
        if (res.data.success) {
          this.uploadImg = res.data.success;
          if(res.msg && res.msg!='') {
            this.$message.success("上传成功！");
          }
        } else {
          this.$message.error(res.data.fail);
        }
      } else {
        if(res.msg && res.msg!='') {
          this.$message.error(res.msg);
        }
      }
      this.imgLoading = false;
    },
    beforeUpload(file) {
      this.imgLoading = true;
      const isLt2M = file.size / 1024 / 1024 < 4;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 4MB!");
        this.imgLoading = false;
      }
      return isLt2M;
    },
    // 获取套餐
    geTempower() {
      $http.get("/admin/application/getMessage",{}).then(({result,data,msg}) => {
        if(result) {
          this.pluginsMealList = data.plugin;
          if(this.$route.query.type !== "edit") {
            this.form.validity_time = data.type == 2 ? data.validity_time * 1000 : this.form.validity_time;
            this.type = data.type;
          }
        }else {
          this.$message.error(msg);
        }
      })
      .catch(err => {
        console.error(err);
      });
    },
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
    top: 0;
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
