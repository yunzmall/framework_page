<template>
  <div class="right" v-loading="init_loading">
    <div class="right-head">
      <div class="right-head-con1">系统升级</div>
    </div>
    <el-col :span="12">
      <template>
        <div
          v-if="is_update == 99"
          style="color:green;fonr-weight:800;line-height:50px;"
        >
          恭喜您,当前版本为最新版!
        </div>
        <div v-if="is_update == -1" style="fonr-weight:800;line-height:50px;">
          暂未授权!
        </div>
        <div
          v-if="is_update == 3"
          style="color:green;fonr-weight:800;line-height:50px;"
        >
          检查更新中...
        </div>
        <div
          v-if="is_update == 0"
          style="color:red;fonr-weight:800;line-height:50px;"
        >
          网络请求超时!
        </div>
        <div
          v-if="is_update == 98"
          style="color:red;fonr-weight:800;line-height:50px;"
        >
          {{ error_msg }}
        </div>
        <div
          v-if="is_update == 1 && is_update_type == 1"
          style="overflow-y:scroll;height:700px"
        >
          <div style="color:red;fonr-weight:800;line-height:50px;">
            更新之前请注意数据备份!
          </div>
          <div>更新文件(选中则不更新文件):</div>
          <div style="padding-top:20px;">
            <div v-for="(item, index) in files" :key="index" style="line-height:30px;">
              <el-checkbox
                v-model.number="item.is_choose"
                :true-label="1"
                :false-label="0"
              ></el-checkbox>
              {{ item.path }}
            </div>
          </div>
        </div>
        <div v-if="is_update == 1 && is_update_type == 2">
          当前版本号：<span
            style="color:red;fonr-weight:900;line-height:50px;"
            >{{ version }}</span
          >
        </div>
      </template>
    </el-col>
    <el-col
      :span="12"
      v-if="is_update == 1"
      style="padding-left:30px;overflow-y :scroll;height:700px"
    >
      <el-button
        type="success"
        icon="el-icon-download"
        v-if="is_update_type === 1"
        @click="upgrade()"
        :loading="is_show_progress === 1"
        >立即升级</el-button
      >
      <el-button
        type="success"
        icon="el-icon-download"
        v-if="is_update_type === 2"
        @click="upgradeFront()"
        :loading="is_show_progress === 1"
        >立即升级</el-button
      >
      <div
        style="display:inline-block;padding-left:10px;color:#999;"
        v-if="is_show_progress === 1"
      >
        <div v-if="is_show_progress_type === 1">
          后台文件已更新
          <span style="color:red;font-weight:900">
            {{ updated_file }}
          </span>
          个文件 / 共
          <span style="color:red;font-weight:900">
            {{ total_file }} </span
          >个文件！
        </div>
        <div v-if="is_show_progress_type === 2">
          前端文件正在下载更新
        </div>
        <div v-if="is_show_progress_type === 3">
          更新完成
        </div>
        <div v-if="is_show_progress_type === 4">
          网络请求超时
        </div>
      </div>
      <div style="padding:30px 0;">
        最新版本号：
        <span style="color:red;font-weight:900;" v-if="is_update_type === 2">{{
          new_version
        }}</span>
        <span style="color:red;font-weight:900;" v-if="is_update_type === 1">{{
          version
        }}</span>
      </div>
      <div style="font-size:14px;color:#666">版本说明：</div>
      <div
        style="padding:30px 0 10px 15px;color:#333;font-size:15px;line-height:24px;"
      >
        <!-- <div v-html="log"></div> -->
        <div class="version-box" v-for="(item, index) in log" :key="index">
          <div class="version-radius"></div>
          <div class="version-margin-left">
            <div class="version-num">{{ item.title }}</div>
            <div class="version-margin-bottom">
              <span class="version-time">{{ item.created_at }}</span>
            </div>
            <div style="padding-bottom:30px">
              <div v-for="(item1, index1) in item.content" :key="index1" v-html="item1">
                <!-- {{ item1 }} -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
export default {
  name: "website-setting",
  components: { Tinymce },
  data() {
    return {
      loading: false,
      init_loading: false,
      version: "", //后台版本号
      filecount: "", //后台文件数
      frontendUpgrad: "", //前端文件数
      log: "",
      files: [],
      not_files: [],
      showDialog: false,
      is_update: 3,
      is_update_type: 1, //显示哪个升级按钮
      redirect: undefined,
      is_show_progress: 0,
      is_show_progress_type: 0,
      updated_file: 0,
      total_file: 0,
      new_version: 0, //前端版本号
      error_msg:'',//错误提示
      rules: {}
    };
  },
  created() {
    this.getData();
  },
  destroyed() {},
  methods: {
    getData() {
      var that = this;
      that.init_loading = true;
      $http
        .get("/admin/system/update/verifyCheck", {}, "正在检查更新")
        .then(response => {
          if (response.result == 1) {
            if (response.filecount > 0) {
              that.files = response.files;
              that.version = response.version; //后台版本号
              if (response.list && response.list.length > 0) {
                that.new_version =
                  response.list[response.frontendUpgrad - 1].version; //前端版本号
              }
              that.filecount = response.filecount; //后台文件数
              that.frontendUpgrad = response.frontendUpgrad; //前端文件数
              that.log = response.log;
              // 升级说明数据处理
              if (that.log && that.log.length >= 0) {
                let content = [];
                for (let i = 0; i < that.log.length; i++) {
                  that.log[i].created_at = that.log[i].created_at.split(" ")[0];
                  // console.log(that.log[i].content.split("\n"))
                  that.log[i].content = that.log[i].content.split("\n");
                }
                // this.content_list.push(content)
              }
              that.is_update = 1;
              that.is_update_type = 1;
            }
            //后台没有更新文件
            else if (response.filecount <= 0) {
              // 前后端都没有更新文件
              if (response.frontendUpgrad == 0) {
                that.is_update = 99;
              }
              // 后台没有更新文件,前端有更新文件
              else {
                that.filecount = response.filecount; //后台文件数
                that.frontendUpgrad = response.frontendUpgrad; //前端文件数
                that.new_version =
                  response.list[response.frontendUpgrad - 1].version; //前端版本号
                that.version = response.version; //后台版本号
                that.is_update = 1;
                that.is_update_type = 2;
              }
            }
            that.init_loading = false;
          } else if (response.result == -1) {
            that.$message.error("暂未授权!");
            that.is_update = -1;
            that.init_loading = false;
          } else if (response.result == 0) {
            that.$message.error("网络请求超时!");
            that.is_update = 0;
            that.init_loading = false;
          } else if (response.result == 99) {
            that.$message.success("当前版本为最新版!");
            that.is_update = 99;
            that.init_loading = false;
          } else if (response.result == 98) {
            that.$message.error(response.msg);
            that.error_msg = response.msg;
            that.is_update = 98;
            that.init_loading = false;
          }
        })
        .catch(() => {
          that.init_loading = false;
        });
    },
    upgrade() {
      console.log(this.files);
      var that = this;
      that.is_show_progress = 1;
      for (let i = 0; i < that.files.length; i++) {
        if (that.files[i].is_choose === 1) {
          that.not_files.push(that.files[i].path);
        }
      }
      $http
        .post("/admin/system/update/fileDownload", { nofiles: that.not_files })
        .then(response => {
          console.log(response);
          if (response.result == 1) {
            that.is_show_progress_type = 1;
            that.updated_file = response.success;
            that.total_file = response.total;
            that.upgrade();
          }
          // 更新前端
          else if (response.result == 2) {
            if (that.frontendUpgrad > 0) {
              that.upgradeFront();
            } else {
              that.is_show_progress_type = 3;
              that.is_show_progress = 0;
              that.getData();
            }
          }
          //不更新的文件
          else if (response.result == 3) {
            that.upgrade();
          }
        })
        .catch(() => {
          // this.loading = false;
        });
      console.log(that.not_files);
    },
    upgradeFront() {
      var that = this;
      that.is_show_progress = 1;
      that.is_show_progress_type = 2;
      $http
        .post("/admin/system/update/startDownload", {})
        .then(response => {
          console.log(response);
          if (response.status == 1) {
            that.is_show_progress_type = 3;
            that.getData();
            that.is_show_progress = 0;
          } else {
            that.is_show_progress_type = 4;
            that.is_show_progress = 0;
          }
        })
        .catch(() => {
          // this.loading = false;
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
.version-box {
  border-left: 1px solid #e9e9e9;
  margin: 0;
}
.version-radius {
  background: #409eff;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  float: left;
  position: relative;
  left: -5px;
}
.version-margin-left {
  margin-left: 30px;
}
.version-num {
  font-weight: 900;
  font-size: 22px;
  line-height: 24px;
  margin-bottom: 20px;
}
.version-margin-bottom {
  margin-bottom: 20px;
}
.version-time {
  background: #f9f9f9;
  border: 1px solid #e9e9e9;
  padding: 5px 10px;
  font-weight: 500;
}
.version-content {
  font-weight: 500;
  line-height: 28px;
}
</style>
