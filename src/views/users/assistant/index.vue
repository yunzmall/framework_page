<template>
  <div class="right">
    <div class="right-head">
      <div class="right-head-con1">店员用户</div>
    </div>
    <el-form :inline="true" :model="search_form" ref="search_form">
      <el-row>
        <el-col :span="20">
          <el-form-item>
            <el-input
              v-model="search_form.keyword"
              placeholder="请输入用户名/手机号"
            ></el-input>
          </el-form-item>

          <el-form-item label="注册时间">
            <el-date-picker
              v-model="times"
              value-format="timestamp"
              type="datetimerange"
              @change="onDatePick"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="search_form.status"
              clearable
              placeholder="状态"
              clearable
            >
              <el-option label="有效" :value="2"></el-option>
              <el-option label="已禁用" :value="3"></el-option>
              <el-option label="已过期" :value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3" align="right">
          <el-form-item>
            <el-button type="success" icon="el-icon-search" @click="search()"
              >搜索
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template>
      <!-- 表格start -->
      <el-table :data="list" style="width: 100%">
        <el-table-column
          prop="uid"
          label="ID"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          align="center"
          width="110"
        ></el-table-column>
        <el-table-column
          prop="has_one_profile.mobile"
          label="手机号"
          align="center"
          width="160"
        ></el-table-column>
        <el-table-column
          prop="has_one_app_user.app_name"
          label="所属平台"
          align="center"
          width="160"
        ></el-table-column>
        <el-table-column
          prop="create_at"
          label="注册时间"
          align="center"
          width="160"
        ></el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          align="center"
          width="110"
        ></el-table-column>
        <el-table-column label="操作" min-width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="visDia(scope.row.status, scope.row.uid)"
              >修改密码
            </el-button>
            <el-button
              type="danger"
              v-if="scope.row.status === 2"
              @click="changeStatus(scope.row.status, scope.row.uid)"
              >禁用
            </el-button>
            <el-button
              type="success"
              v-if="scope.row.status === 3"
              @click="changeStatus(scope.row.status, scope.row.uid)"
              >启用
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
            :page-size="pageSize"
            :total="total"
            background
          ></el-pagination>
        </el-col>
      </el-row>
    </template>
    <el-dialog title="修改密码" :visible.sync="dialogTableVisible">
      <el-form ref="form" :model="form" :rules="rules" label-width="20%">
        <el-form-item label="原密码" prop="old_password">
          <el-input
            style="width: 80%"
            placeholder="请输入原密码"
            v-model="form.old_password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input
            style="width: 80%"
            placeholder="请输入新密码"
            v-model="form.password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="re_password">
          <el-input
            style="width: 80%"
            placeholder="请输入确认密码"
            v-model="form.re_password"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePwd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PlatformUserList",
  data() {
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
      list: [],
      form: {
        old_password: "",
        password: "",
        re_password: ""
      },
      times: "",
      search_form: {
        keyword: "",
        searchtime: "",
        status: "",
        times: {
          start: "",
          end: ""
        }
      },
      dialogTableVisible: false,
      change_pwd_id: "",
      rules: {
        old_password: [
          { required: true, trigger: "blur", message: "请输入原密码" }
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
        re_password: [
          { validator: validatePass2, required: true, trigger: "blur" }
        ]
      },
      pageSize: 0,
      current_page: 0,
      total: 0
    };
  },
  created() {
    this.currentChange(1);
  },
  destroyed() {},
  methods: {
    visDia(index, id) {
      this.dialogTableVisible = true;
      this.change_pwd_id = id; //通过id值知道修改哪条数据的密码
    },
    search() {
      this.search_form.searchtime = 1;
      this.currentChange(1);
    },
    onDatePick(val) {
      if (val) {
        this.search_form.times = {
          start: parseInt(val[0] / 1000),
          end: parseInt(val[1] / 1000)
        };
      } else {
        this.search_form.times = { start: "", end: "" };
      }
    },
    currentChange(val) {
      $http
        .post(
          "/admin/user/clerk_list",
          { page: val, search: this.search_form },
          "加载中"
        )
        .then(response => {
          if (response.result === 1) {
            this.total = response.data.total;
            this.pageSize = response.data.per_page;
            this.list = response.data.data;
            this.current_page = response.data.current_page;
          } else {
            this.list = response.data;
            if(response.msg && response.msg!='') {
              this.$message.error(response.msg);
            }
          }
        })
        .catch(err => {
          this.$message.error("获取失败!");
          console.error(err);
        });
    },
    changePwd() {
      $http
        .post(
          "/admin/user/change",
          { user: this.form, uid: this.change_pwd_id },
          " "
        )
        .then(response => {
          if (response.result === 1) {
            this.dialogTableVisible = false;
            this.$refs["form"].resetFields();
            this.$message.success("修改成功!");
          } else {
            if(response.msg && response.msg!='') {
              this.$message.error(response.msg);
            }
          }
        })
        .catch(err => {
          this.$message.error("修改失败!");
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
          this.$message.error(text + "失败!");
          console.error(err);
        });
    },
    changeStatus(status, id) {
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
  .right-head {
    padding: 15px 0;
    line-height: 50px;
    border-bottom: 1px #ccc solid;
    margin-bottom: 15px;
    .right-head-con1 {
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
