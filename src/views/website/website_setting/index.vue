<template>
  <div class="right">
    <div class="right-head">
      <div class="right-head-con1">站点设置</div>
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="15%">
      <!--<el-form-item label="关闭站点" prop="status">
        <el-tooltip
          :content="form.status ? '已开启' : '已关闭'"
          placement="top"
        >
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </el-tooltip>
      </el-form-item>-->
      <el-form-item label="站点名称" prop="name">
        <el-input
          v-model="form.name"
          style="width:70%"
          placeholder="请输入站点名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台LOGO" prop="site_logo">
        <el-input
          v-model="form.site_logo"
          placeholder="请上传平台LOGO"
          style="width:70%"
          disabled
        ></el-input>
        <el-button size="small" type="primary" @click="openUpload('site_logo')"
          >点击上传
        </el-button>
        <div class="avatar-uploader-box">
          <img v-if="form.site_logo" :src="form.site_logo" class="avatar" />
          <!--<div slot="tip" class="el-upload-tip">(请上传100*60px方形图片)</div>-->
          <i
            v-show="form.site_logo"
            class="el-icon-circle-close"
            @click="clearImg('site_logo')"
            title="点击清除图片"
          ></i>
        </div>
      </el-form-item>
      <el-form-item label="favorite icon" prop="title_icon">
        <el-input
          v-model="form.title_icon"
          placeholder="请上传favorite icon"
          style="width:70%"
          disabled
        ></el-input>
        <el-button size="small" type="primary" @click="openUpload('title_icon')"
          >点击上传
        </el-button>
        <div class="avatar-uploader-box">
          <img v-if="form.title_icon" :src="form.title_icon" class="avatar" />
          <div slot="tip" class="el-upload-tip">(显示在浏览器标题的图标)</div>
          <i
            v-show="form.title_icon"
            class="el-icon-circle-close"
            @click="clearImg('title_icon')"
            title="点击清除图片"
          ></i>
        </div>
      </el-form-item>
      <el-form-item label="登录页广告" prop="advertisement">
        <el-input
          v-model="form.advertisement"
          placeholder="请上传登录页广告"
          style="width:70%"
          disabled
        ></el-input>
        <el-button
          size="small"
          type="primary"
          @click="openUpload('advertisement')"
          >点击上传
        </el-button>
        <div class="avatar-uploader-box">
          <img
            v-if="form.advertisement"
            :src="form.advertisement"
            class="avatar"
          />
          <div slot="tip" class="el-upload-tip">
            (请上传750*365px方形图片)
          </div>
          <i
            v-show="form.advertisement"
            class="el-icon-circle-close"
            @click="clearImg('advertisement')"
            title="点击清除图片"
          ></i>
        </div>
      </el-form-item>
      <el-form-item label="底部信息" prop="information">
        <div style="width:70%">
          <tinymce :height="300" v-model="form.information" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm('form')">
          保存设置
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
import Tinymce from "@/components/Tinymce";

export default {
  name: "website-setting",
  components: { Tinymce },
  data() {
    return {
      ImgList: [],
      submit_loading: false,
      //弹框上传图片的路径
      uploadImg: "",
      chooseImg: "",
      radio1: "不限", //年
      radio2: "不限", //月
      activeName2: "first",
      //是否显示弹框
      centerDialogVisible: false,
      //提交的数据
      form: {
        name: "",
        site_logo: "",
        title_icon: "",
        advertisement: "",
        information: ""
      },
      pageSize: 0,
      current_page: 0,
      total: 0,
      rules: {}
    };
  },
  created() {
    this.getData();
    this.currentChange(1);
    window.addEventListener("beforeunload", e => {
      window.onbeforeunload = null;
    });
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
            // this.list = response.data;
            // this.$message.error("接口请求错误");
            if (response.msg && response.msg != "") {
              this.$message.error(response.msg);
            }
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
        if (res.msg && res.msg != "") {
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
    clearImg(str) {
      this.form[str] = "";
    },
    deleteImg(id) {
      $http
        .get("/admin/all/delImg", { id: id }, " ")
        .then(response => {
          if (response.result === 1) {
            if (response.msg && response.msg != "") {
              this.$message.success("系统删除成功");
            }
            this.currentChange(1);
          } else {
            if (response.msg && response.msg != "") {
              this.$message.error(response.msg);
            }
            // this.$message.error("删除出错");
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          $http
            .post("/admin/system/site", { setdata: this.form }, "保存中")
            .then(response => {
              if (response.result === 1) {
                if (response.msg && response.msg != "") {
                  this.$message.success("保存成功！");
                }
                window.location.reload();
              }
              else{
                if (response.msg && response.msg != "") {
                  this.$message.error(response.msg);
                }
              }
            })
            .catch(() => {
              // this.$message.error("保存失败！");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getData() {
      $http
        .post("/admin/system/site", {}, "加载中")
        .then(response => {
          if(response.result == 1) {
            this.form = response.data;
            if(!this.form.name) {
              this.form.name = '';
            }
            if(!this.form.site_logo) {
              this.form.site_logo = '';
            }
            if(!this.form.title_icon) {
              this.form.title_icon = '';
            }
            if(!this.form.advertisement) {
              this.form.advertisement = '';
            }
            if(!this.form.information) {
              this.form.information = '';
            }
          }
          else{
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
