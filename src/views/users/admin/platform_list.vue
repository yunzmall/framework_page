<template>
  <div class="right">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        ><router-link to="/users/admin"
          >管理员用户</router-link
        ></el-breadcrumb-item
      >
      <el-breadcrumb-item>平台列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-col :span="16">
      <el-tag
        style="height:50px;line-height:50px;font-size:20px;margin-top:10px"
      >
        用户名：<span style="font-weight:900;">{{ userData.username }}</span>
      </el-tag>
    </el-col>
    <el-col align="right" :span="7">
      <el-button
        :type="userData.status === 3 ? 'success' : 'danger'"
        style="margin-top:10px"
        @click="changeStatus"
        >{{ userData.status === 3 ? "启用" : "禁用" }}
      </el-button>
    </el-col>
    <template>
      <!-- 表格start -->
      <el-table :data="list" style="width: 100%">
        <el-table-column
          prop="has_one_app.name"
          label="平台名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="role_name"
          label="账号类型"
          align="center"
        ></el-table-column>
      </el-table>
      <!-- 表格end -->
      <el-row>
        <el-col :span="24" align="right" style="padding:15px 5% 15px 0">
          <el-pagination
            layout="prev, pager, next"
            @current-change="currentChange"
            :current-page.sync="current_page"
            :page-size="pageSize"
            :total="total"
            background
          ></el-pagination>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script>
export default {
  name: "PlatformUserList",
  data() {
    return {
      list: [],
      userData: {},
      pageSize: 0,
      current_page: 0,
      total: 0,
      dialogTableVisible: false,
      uid: ""
    };
  },
  created() {
    this.uid = this.$route.params.id;
    this.currentChange(1);
  },
  destroyed() {},
  methods: {
    currentChange(val) {
      $http
        .post("/admin/user/app_list", { page: val, uid: this.uid }, "加载中")
        .then(response => {
          if (response.result === 1) {
            this.userData = response.data;
            this.total = response.data.total;
            this.pageSize = response.data.per_page;
            this.list = response.data.has_many_app_user;
            this.current_page = response.data.current_page;
          } else {
            this.list = response.data;
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
    toChangeStatus(status, id) {
      let text = status === 2 ? "启用" : "禁用";
      $http
        .post("/admin/user/status", { status: status, uid: id }, " ")
        .then(response => {
          if (response.result === 1) {
            if(response.msg && response.msg!='') {
              this.$alert("用户已" + text + "成功！！", text + "用户", {
                confirmButtonText: "确定",
                type: "success"
              });
            }
            this.currentChange(1);
          } else {
            if(response.msg && response.msg!='') {
              this.$message.error(response.msg);
            }
          }
        })
        .catch(err => {
          // this.$message.error(text + "失败!");
          console.error(err);
        });
    },
    changeStatus(status, id) {
      status = this.userData.status;
      id = this.userData.uid;
      if (status === 2) {
        this.$confirm("确定禁用吗", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.toChangeStatus(3, id);
          })
          .catch(() => {
            this.$message({ type: "info", message: "已取消禁用" });
          });
      }
      if (status === 3) {
        this.$confirm("确定启用吗", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.toChangeStatus(2, id);
          })
          .catch(() => {
            this.$message({ type: "info", message: "已取消启用" });
          });
      }
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
    border-bottom: 1px solid #ccc;
  }
  .el-breadcrumb__inner {
    a {
      font-weight: 500;
    }
  }
  .tip {
    font-size: 12px;
    color: #999;
  }
}
</style>
