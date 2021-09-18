<template>
  <div class="right">
    <div class="right-head">
      <div class="right-head-con">主题设置</div>
      <!-- <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="addTheme"
        >添加主题
      </el-button> -->
    </div>
    <template>
      <!-- 表格start -->
      <el-table :data="list" style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          align="center"
          width="110"
        ></el-table-column>
        <el-table-column label="主题信息" align="center">
          <template slot-scope="scope">
            <div>
              {{ scope.row.title }}
            </div>
          </template></el-table-column
        >
        <el-table-column
          prop="state"
          label="是否默认"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <div>
              <el-switch
                v-model="scope.row.is_default"
                :active-value="1"
                :inactive-value="0"
                @change="
                  changeStatus(scope.row.id, scope.row.is_default, scope.$index)
                "
              >
              </el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180" align="center">
          <template slot-scope="scope">
            <router-link :to="'/home/theme/list/' + scope.row.id" v-if="scope.row.identification!='uniacid_theme'">
              <el-button>页面列表</el-button>
            </router-link>
            <router-link :to="'/home/theme/top/' + scope.row.id" v-if="scope.row.identification!='uniacid_theme'">
              <el-button>顶部设置 </el-button>
            </router-link>
            <router-link :to="'/home/theme/bottom/' + scope.row.id" v-if="scope.row.identification!='uniacid_theme'">
              <el-button>底部设置 </el-button>
            </router-link>
            <router-link :to="'/home/theme/basic/' + scope.row.id">
              <el-button>基础设置</el-button>
            </router-link>
            <router-link :to="'/home/theme/record/' + scope.row.id" v-if="scope.row.identification!='uniacid_theme'">
              <el-button>填写记录</el-button>
            </router-link>
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
    <el-dialog title="添加主题" :visible.sync="dialogTableVisible">
      <el-form ref="form" :model="form" :rules="rules" label-width="20%">
        <el-form-item label="主题名称" prop="title">
          <el-input
            style="width: 80%"
            v-model="form.title"
            placeholder="请输入主题名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否默认" prop="is_default">
          <el-radio v-model="form.is_default" :label="1">是</el-radio>
          <el-radio v-model="form.is_default" :label="0">否</el-radio>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureTheme('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ThemeIndex",
  data() {
    return {
      list: [],
      form: {
        title: "",
        is_default: 0
      },

      dialogTableVisible: false,
      change_pwd_id: "",
      rules: {
        title: [{ required: true, trigger: "blur", message: "请输入标题" }],
        is_default: {
          required: true,
          trigger: "blur",
          message: "请选择是否默认"
        }
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
    addTheme() {
      this.dialogTableVisible = true;
    },
    sureTheme() {
      $http
        .post("/admin/user/create_theme", { data: this.form }, "保存中")
        .then(response => {
          if (response.result === 1) {
            this.$message.success(response.msg);
            this.dialogTableVisible = false;
            this.currentChange(1);
          } else {
            if (response.msg && response.msg != "") {
              this.$message.error(response.msg);
            }
          }
        })
        .catch(err => {
          this.$message.error("获取失败!");
          console.error(err);
        });
    },
    changeStatus(id, status, index) {
      // console.log(id);
      console.log(index);
      $http
        .post(
          "/admin/user/edit_theme",
          { id: id, status: 4, data: { is_default: status } },
          "保存中"
        )
        .then(response => {
          if (response.result === 1) {
            this.$message.success(response.msg);
            this.currentChange(1);
          } else {
            if (response.msg && response.msg != "") {
              this.$message.error(response.msg);
              this.list[index].is_default == 1 ? 0 : 1;
            }
          }
        })
        .catch(err => {
          this.$message.error("获取失败!");
          this.list[index].is_default == 1 ? 0 : 1;

          console.error(err);
        });
    },
    currentChange(val) {
      $http
        .post("/admin/user/theme_list", { page: val }, "加载中")
        .then(response => {
          if (response.result === 1) {
            this.total = response.data.total;
            this.pageSize = response.data.per_page;
            this.list = response.data.data;
            this.current_page = response.data.current_page;
          } else {
            if (response.msg && response.msg != "") {
              this.$message.error(response.msg);
            }
          }
        })
        .catch(err => {
          this.$message.error("获取失败!");
          console.error(err);
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
      // float: left;
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
