<template>
  <div class="right">
    <div class="right-head">
      <div class="right-head-con">使用者管理</div>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="visDia()"
        >添加使用者</el-button
      >
    </div>
    <el-form :inline="true" :model="search_form" ref="search_form">
      <el-row>
        <el-col :span="20">
          <el-form-item>
            <el-input
              v-model="search_form.name"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" align="right">
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

    <template>
      <!-- 表格start -->
      <el-table :data="userList" style="width: 100%">
        <el-table-column
          prop="role_name"
          label="权限"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="has_one_user.username"
          label="用户名"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" min-width="180" align="center">
          <template slot-scope="scope">
            <el-button type="danger" @click="delRow(scope.row)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格end -->
      <el-row>
        <el-col :span="24" align="right" style="padding:15px 5% 15px 0">
          <el-pagination
            layout="prev, pager, next"
            @current-change="currentChange"
            :current-page.sync="current_page"
            :total="total"
            :page-size="pageSize"
            background
            v-loading="loading"
          ></el-pagination>
        </el-col>
      </el-row>
    </template>
    <el-dialog title="添加账号操作员/管理员" :visible.sync="dialogTableVisible">
      <el-form ref="form" :model="form" :rules="rules" label-width="15%">
        <!--<el-form-item label="权限">-->
        <!--<el-radio v-model="form.type" :label="1">管理员</el-radio>-->
        <!--<el-radio v-model="form.type" :label="2">操作员</el-radio>-->
        <!--</el-form-item>-->
        <el-form-item label="用户名">
          <el-autocomplete
            style="width: 75%"
            v-model="form.username"
            :fetch-suggestions="searchUser"
            :trigger-on-focus="false"
            placeholder="请输入用户名"
            @select="chooseUser"
          ></el-autocomplete>
          <div class="tip" v-if="list.length <= 0">
            请输入完整的已有用户名
            <router-link
              to="/users/admin/add"
              style="padding-left:10px;color:#52d1ef"
              >添加新用户
            </router-link>
          </div>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PlatformUserList",
  data() {
    return {
      search_form: { name: "" },
      list: [],
      userList: [],
      userId: "",
      form: {
        type: 1,
        username: ""
      },
      pageSize: 0,
      current_page: 0,
      total: 0,
      loading: false,
      dialogTableVisible: false,
      id: "",
      rules: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.currentChange(1);
  },
  destroyed() {},
  methods: {
    visDia() {
      this.dialogTableVisible = true;
    },
    currentChange(val) {
      this.loading = true;
      $http
        .post(
          "/admin/appuser",
          { uniacid: this.id, page: val, search: this.search_form },
          "加载中"
        )
        .then(response => {
          if (response.result === 1) {
            this.total = response.data.total;
            this.pageSize = response.data.per_page;
            this.userList = response.data.data;
            this.current_page = response.data.current_page;
          } else {
            this.list = response.data;
            if(response.msg && response.msg!='') {
              this.$message.error(response.msg);
            }
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          console.error(err);
        });
    },
    searchUser(queryString, cb) {
      $http
        .post("/admin/appuser/checkname", {
          name: queryString,
          uniacid: this.id
        })
        .then(response => {
          if (response.result === 1) {
            this.list = [];
            response.data.forEach(item => {
              this.list.push({ value: item.username, id: item.uid });
            });
            cb(this.list);
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
    chooseUser(item) {
      this.userId = item.id;
    },
    addUser() {
      $http
        .post("/admin/appuser/add", {
          uniacid: this.id,
          uid: this.userId,
          role: "manager"
        })
        .then(response => {
          if (response.result === 1) {
            if(response.msg && response.msg!='') {
              this.$message.success(response.msg);
            }
            this.currentChange(1);
            this.form.username = "";
            this.dialogTableVisible = false;
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
    deleteUser(id) {
      $http
        .get("/admin/appuser/delete", { id: id })
        .then(response => {
          if (response.result === 1) {
            if(response.msg && response.msg!='') {
              this.$message({ type: "success", message: "删除成功!" });
            }
            this.currentChange(1);
          } else {
            if(response.msg && response.msg!='') {
              this.$message.error(response.msg);
            }
          }
        })
        .catch(err => {
          // this.$message.error("删除失败!");
          console.error(err);
        });
    },
    delRow(item) {
      this.$confirm("确定删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteUser(item.id);
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消删除" });
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
}
</style>
