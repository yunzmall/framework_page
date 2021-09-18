<template>
  <div class="right">
    <div class="right-head">
      <div class="right-head-con">页面列表</div>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="addPane"
        >添加页面
      </el-button>
    </div>
    <div style="font-size:14px;padding:20px 0;color:red;line-height:24px;">
      提示：每次提交保存只能保存当前页面，请保存当前页面后再添加/编辑别的页面，已免保存失败！
    </div>
    <div class="content" style="display:flex" v-if="form.length > 0">
      <div class="left">
        <div
          class="left-li"
          :class="{ 'left-li-select': index == choose_index }"
          v-for="(item, index) in form"
          :key="index"
          @click="choose(index)"
        >
          {{ item.name }}
        </div>
      </div>
      <div style="flex:1">
        <div style="padding-bottom:10px;">
          <el-input
            ref="link"
            v-if="form.length > 0 && choose_index != -1"
            v-model="form[choose_index].url"
            type="text"
            readonly="readonly"
            style="width:50%"
          ></el-input>
          <el-button @click="copy">复制链接</el-button>
          <el-button @click="openDialog">页面信息设置</el-button>
        </div>
        <!-- <tinymce
          v-for="(item, index) in form"
          v-if="form.length > 0"
          :key="index"
          :height="500"
          v-model="form[index].detail"
          v-show="choose_index == index"
        /> -->
        <textarea
          v-for="(item, index) in form"
          v-if="form.length > 0"
          :key="index"
          v-model="form[index].detail"
          v-show="choose_index == index"
          style="width:90%;height:70vh"
        ></textarea>
      </div>
    </div>
    <el-button
      type="primary"
      @click.native.prevent="submitForm('form')"
      style="margin:50px 0 0 200px;"
      >提交</el-button
    >
    <el-dialog
      :visible.sync="is_dialog"
      width="65%"
      center
      v-if="form.length > 0"
    >
      <div>
        <el-form
          ref="mes_form"
          :model="mes_form"
          :rules="mes_rules1"
          label-width="15%"
        >
          <el-form-item label="标题">
            <el-input
              v-model="mul_title"
              style="width:70%"
              placeholder="请输入标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="关键词">
            <el-input
              v-model="keyword"
              style="width:70%"
              placeholder="请输入关键词"
            ></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              v-model="describe"
              style="width:70%"
              type="textarea"
              rows="5"
              placeholder="请输入描述"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="is_dialog = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定 </el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="is_dialog1" width="65%" title="添加页面" center>
      <div>
        <el-form
          ref="mes_form"
          :model="mes_form"
          :rules="mes_rules"
          label-width="15%"
        >
          <el-form-item label="页面名称" prop="title">
            <el-input
              v-model="mes_form.title"
              style="width:70%"
              placeholder="请输入页面名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="页面路径名" prop="link_name">
            <el-input
              v-model="mes_form.link_name"
              style="width:70%"
              placeholder="请输入页面路径名"
            ></el-input>
            <div class="tip">在链接中定义的路径名称!</div>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="is_dialog1 = false">取 消</el-button>
        <el-button type="primary" @click="sure1">确 定 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";

export default {
  components: {
    Tinymce
  },
  name: "PlatformUserList",
  data() {
    return {
      is_dialog: false,
      is_dialog1: false,
      form: [],
      identification_list: [],
      choose_index: -1,
      mes_form: {
        title: "",
        link_name: ""
      },
      describe: "",
      keyword: "",
      mul_title: "",

      title: "",

      times: "",

      mes_rules: {
        title: { required: true, message: "请输入页面名称" },
        link_name: {
          required: true,
          message: "请输入页面路径名"
        }
      },
      mes_rules1: {},
      pageSize: 0,
      current_page: 0,
      total: 0
    };
  },
  created() {
    this.getData();
  },
  destroyed() {},
  mounted: function() {
    window.addEventListener("beforeunload", e => {
      window.onbeforeunload = null;
    });
  },
  methods: {
    choose(index) {
      this.choose_index = index;
      if (this.choose_index < this.identification_list.length) {
        this.getRealData(this.choose_index);
      }
    },
    copy() {
      let Url = this.$refs.link;
      Url.select();
      document.execCommand("Copy", false);
      this.$message.success("复制成功");
    },
    openDialog() {
      this.is_dialog = true;
      this.describe = this.form[this.choose_index].describe;
      this.keyword = this.form[this.choose_index].keyword;
      this.mul_title = this.form[this.choose_index].mul_title;
    },
    addPane() {
      this.is_dialog1 = true;
      this.mes_form.title = "";
      this.mes_form.link_name = "";
    },
    sure() {
      this.form[this.choose_index].describe = this.describe;
      this.form[this.choose_index].keyword = this.keyword;
      this.form[this.choose_index].mul_title = this.mul_title;
      this.is_dialog = false;
    },
    sure1() {
      if (!this.mes_form.title || !this.mes_form.link_name) {
        return;
      }
      this.form.push({
        identification: this.mes_form.link_name,
        name: this.mes_form.title,
        theme_id: this.$route.params.id
      });
      this.is_dialog1 = false;
      this.choose_index = this.form.length - 1;
    },

    getData() {
      $http
        .post(
          "/admin/user/dent_list",
          { theme_id: this.$route.params.id },
          "加载中"
        )
        .then(response => {
          if (response.result == 1) {
            if (response.data.length > 0) {
              this.identification_list = response.data;
              this.identification_list.forEach((item, index) => {
                this.form.push({
                  theme_id: item.theme_id,
                  name: item.name,
                  identification: item.identification
                });
              });
              this.getRealData(0);
              // this.choose_index = 0;
            }
          } else {
            if (response.msg && response.msg != "") {
              this.$message.error(response.msg);
            }
          }
        })
        .catch(() => {});
    },
    getRealData(x) {
      $http
        .post(
          "/admin/user/multiple_list",
          {
            theme_id: this.$route.params.id,
            identification: this.identification_list[x].identification
          },
          "加载中"
        )
        .then(response => {
          if (response.result == 1) {
            this.form[x] = {
              theme_id: response.data.theme_id,
              describe: response.data.describe,
              detail: response.data.detail,
              identification: response.data.identification,
              name: response.data.name,
              mul_title: response.data.mul_title,
              keyword: response.data.keyword,
              url: response.data.url
            };
            this.choose_index = x;
            this.$forceUpdate();
            console.log(this.form);
          } else {
            if (response.msg && response.msg != "") {
              this.$message.error(response.msg);
            }
          }
        })
        .catch(() => {});
    },
    submitForm(form) {
      if (this.form.length <= 0) {
        this.$message.error("请添加设置页面");
        return false;
      }
      let json = {
        theme_id: this.form[this.choose_index].theme_id,
        identification: this.form[this.choose_index].identification,
        data: this.form[this.choose_index]
      };
      delete json.data.theme_id;
      delete json.data.identification;
      $http
        .post("/admin/user/multiple_list", json, "保存中")
        .then(response => {
          if (response.result === 1) {
            this.$message.success("保存成功！");
            // this.$router.push(this.fun.getUrl("ThemeIndex"));
            window.location.reload();
            // this.getData();
          } else {
            this.form[this.choose_index].theme_id = json.theme_id;
            this.form[this.choose_index].identification = json.identification;
            if (response.msg && response.msg != "") {
              if (response.msg instanceof Array == true) {
                this.$message.error(response.msg[0]);
              } else {
                this.$message.error(response.msg);
              }
            }
          }
        })
        .catch(() => {
          this.form[this.choose_index].theme_id = json.theme_id;
          this.form[this.choose_index].identification = json.identification;
          // this.$message.error("保存失败！");
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
      float: left;
      padding-right: 20px;
      font-size: 16px;
      color: #888;
    }
  }
  .tip {
    font-size: 12px;
    color: #999;
  }
  .content {
    display: flex;
    .left {
      padding: 20px 20px 0 0;
      flex: 0 0 150px;
      margin-right: 35px;
      overflow-x: hidden;
      text-align: right;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .left-li {
        line-height: 36px;
        cursor: pointer;
      }
      .left-li-select {
        color: #409eff;
      }
    }
  }
}
</style>
