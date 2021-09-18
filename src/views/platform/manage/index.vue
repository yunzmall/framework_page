<template>
  <div class="right">
    <div class="right-head">
      <div class="right-head-con">平台管理</div>
      <el-button
        v-if="is_show_add == true"
        type="primary"
        v-loading.fullscreen.lock="loading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 1)"
        @click="toAdd"
        size="small"
        icon="el-icon-plus"
        >添加平台
      </el-button>
    </div>
    <el-form :inline="true" :model="search" ref="search">
      <el-row>
        <el-col :span="17">
          <el-form-item>
            <el-input
              v-model="search.name"
              placeholder="请输入平台名称关键词"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-select
              v-model="search.maturity"
              clearable
              placeholder="是否到期"
            >
              <el-option label="已到期" :value="1"></el-option>
              <el-option label="未到期" :value="2"></el-option>
              <!-- <el-option v-for="item in industry_list" :key="item.id" :label="item.industry_name" :value="item.id"></el-option>-->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" align="right">
          <el-form-item>
            <el-button
              type="success"
              icon="el-icon-search"
              @click="currentChange(1)"
              >搜索
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row type="flex" class="list_box">
      <el-col
        :md="7"
        :sm="12"
        :xs="24"
        v-for="(item, index) in list"
        :key="index"
        class="user"
      >
        <div class="temp">
          <el-row class="temp_top">
            <el-col
              :xs="24"
              :sm="24"
              :md="6"
              :lg="6"
              class="user_box"
              style="padding:30px 0 0 0"
            >
              <div class="temp-img">
                <img :src="item.img" alt="" />
              </div>
            </el-col>
            <el-col
              :xs="24"
              :sm="24"
              :md="12"
              :lg="14"
              style="padding:30px 0 0 0"
            >
              <div class="name_time">
                <div class="name">
                  {{ item.name }}
                </div>
                <div
                  class="effective_time"
                  :class="item.is_expire && (item.is_expire === 1||item.is_expire === 2) ? 'red' : ''"
                >
                  有效期：
                  {{ !item.validity_time ? "无限制" : item.validity_time }}
                </div>

                <!--<div style="">目前平台状态：{{ item.status_name }}</div>-->
              </div>
            </el-col>
            <el-col
              :xs="24"
              :sm="24"
              :md="6"
              :lg="4"
              style="padding:30px 0 0 0;"
            >
              <div  @click="setTop(item)" class="edit_topping" >
                <svg t="1572506953743" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1837" width="25" height="25"><path d="M576 452.266667v422.4h-85.333333v-422.4l-89.6 89.6L341.333333 477.866667l192-192 192 192-59.733333 59.733333-89.6-85.333333z m213.333333-217.6h-512v-85.333334h512v85.333334z" :fill= "item.is_top == 1 ? '#e00406':'#2c2c2c'" p-id="1838"></path></svg>
              </div>

              <router-link
                :to="{
                  path: '/manage/add',
                  query: { type: 'edit', id: item.id }
                }"
              >
                <div class="edit_box">
                  <i class="el-icon-edit-outline"></i>
                </div>
              </router-link>
            </el-col>
          </el-row>
          <el-row class="btn_box">
            <el-col :span="8" align="center">
              <el-button type="danger" @click="stopUse(item)" style="width:86%;"
                >{{ item.status === 0 ? "启用" : "停用" }}
              </el-button>
            </el-col>
            <el-col :span="8" align="center">
              <router-link :to="'/manage/user/' + item.id">
                <el-button style="width:86%;">使用者</el-button>
              </router-link>
            </el-col>
            <el-col :span="8" align="center">
              <el-button
                type="primary"
                :disabled="item.is_expire === 2"
                style="width:86%;"
                @click="toShop(item)"
                >管理
              </el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-col :span="24" align="right" style="padding:15px 5% 15px 0">
      <el-pagination
        layout="prev, pager, next"
        @current-change="currentChange"
        :current-page.sync="current_page"
        :page-size="pageSize"
        :total="total"
        background
      >
      </el-pagination>
    </el-col>
  </div>
</template>

<script>
window.isFirst = 0;
export default {
  name: "PlatformManage",
  data() {
    return {
      search: {
        name: "",
        maturity: ""
      },
      list: [],
      pageSize: 0,
      current_page: 0,
      total: 0,
      loading: false,
      showDialog: false,
      redirect: undefined,
      is_show_add:false,
    };
  },
  created() {
    // 获取管理员头像
    this.$store.dispatch("GetUserInfo");
    this.currentChange(1);
    this.getData();
  },
  destroyed() {},
  methods: {
    getData() {
      $http
        .get("/admin/application/checkAddRole")
        .then(response => {
          if (response.result === 1) {
            this.is_show_add = true;
          } else {
            this.is_show_add = false;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    toAdd() {
      if(this.is_show_add == true) {
        this.$router.push(this.fun.getUrl("add_platform"));
      }
      // $http
      //   .get("/admin/application/checkAddRole")
      //   .then(response => {
      //     if (response.result === 1) {
      //       this.$router.push(this.fun.getUrl("add_platform"));
      //     } else {
      //       this.$message.error(response.msg);
      //     }
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   });
    },
    //分页
    currentChange(val) {
      if (window.isFirst === 0) {
        this.loading = true;
      }
      $http
        .post(
          "/admin/application",
          { page: val, search: this.search },
          "loading"
        )
        .then(response => {
          if (response.result === 1) {
            this.total = response.data.total;
            this.pageSize = response.data.per_page;
            this.list = response.data.data;
            this.current_page = response.data.current_page;
          } else {
            this.list = [];
            if (response.data.status === -1) {
              this.currentChange(1);
            }
            if(response.msg && response.msg!='') {
              this.$message.error(response.msg);
            }
          }
          window.isFirst = 1;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          console.error(err);
        });
    },
    toShop(item) {
      let routeData = this.$router.resolve({
        path: "/blank",
        query: { id: item.id }
      });
      window.open(routeData.href, "_blank");
    },
    stopUse(item) {
      let text = item.status === 0 ? "启用" : "停用";
      this.$confirm("确定" + text + "吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          $http
            .get("/admin/application/delete/" + item.id, {}, "正在" + text)
            .then(response => {
              if (response.result === 1) {
                this.currentChange(1);
                this.$message({ type: "success", message: text + "成功!" });
              } else {
                if(response.msg && response.msg!='') {
                  this.$message.error(response.msg);
                }
                // this.$message.error({
                //   type: "success",
                //   message: text + "失败!"
                // });
              }
            })
            .catch(err => {
              console.error(err);
              // this.$message.error({ type: "success", message: text + "失败!" });
            });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消" + text });
        });
    },
    setTop(item) {
          let text = item.is_top === 0 ? "确定置顶？" : "取消置顶？";
          this.$confirm(text, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
          })
              .then(() => {
                  $http
                      .get("/admin/application/setTop/" + item.id, {}, "正在操作")
                      .then(response => {
                          if (response.result === 1) {
                              this.currentChange(1);
                              if(response.msg && response.msg!='') {
                                this.$message.success(response.msg);
                              }
                          } else {
                              if(response.msg && response.msg!='') {
                                this.$message.error(response.msg);
                              }
                          }
                      })
                      .catch(err => {
                          console.error(err);
                          // this.$message.error({ type: "success", message: "操作失败!" });
                      });
              })
              .catch(() => {
                  this.$message({ type: "info", message: "已取消" });
              });
      }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.right {
  padding: 0 30px;
  .right-head {
    padding: 15px 0;
    line-height: 50px;
    border-bottom: 1px #ccc solid;
    margin-bottom: 15px;
    .right-head-con {
      display:inline-block;
      padding-right: 20px;
      font-size: 16px;
      color: #888;
    }
  }
  .temp {
    border: 1px #dcdfe6 solid;
    border-radius: 8px;
    margin: 0 16px;
    .temp_top {
      display: flex;
    }
    .name_time {
      .name {
        font-size: 20px;
        line-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .effective_time {
        font-size: 14px;
        line-height: 24px;
        color: #ccc;
        font-weight: normal;
      }
      .red {
        color: red;
      }
    }
    .edit_box {
      line-height: 40px;
      text-align: left;
      padding-left: 10px;
      color: #666;
      i {
        font-size: 20px;
      }
    }
    .edit_topping {
      float: left;
      line-height: 43px;
      margin-left: -25px;
      cursor: pointer;
      font-size: 25px;
    }
    .user_box {
      display: flex;
      margin-right: 10px;
    }
    .temp-img {
      overflow: hidden;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .btn_box {
      margin: 28px 0;
      padding: 0 10px;
    }
  }
  .list_box {
    flex-wrap: wrap;
    .user {
      width: 33.33% !important;
      margin: 16px 0;
    }
  }
}
</style>
