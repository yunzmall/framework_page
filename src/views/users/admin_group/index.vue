<template>
  <div class="right">
    <div class="right-head">
      <div class="right-head-con">管理员用户组</div>
      <router-link to="/users/admin_group/add">
        <el-button>新增用户组</el-button>
      </router-link>
    </div>
    <el-form :inline="true" :model="search_form" ref="search_form">
      <el-row>
        <el-col :span="20">
          <el-form-item>
            <el-input
              v-model="search_form.id"
              placeholder="请输入用户名组名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" align="right">
          <el-form-item>
            <el-button type="success" icon="el-icon-search" @click="search()"
              >搜索</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template>
      <!-- 表格start -->
      <el-table :data="list" style="width: 100%" v-loading="table_loading">
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column
          prop="name"
          label="用户组名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="at_period"
          label="有效期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="amount"
          label="平台数量"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" min-width="180" align="center">
          <template slot-scope="scope">
            <router-link :to="'/users/admin_group/edit/' + scope.row.id">
              <el-button>编辑</el-button>
            </router-link>
            <el-button type="danger" @click="delRow(scope.$index, scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格end -->
      <!--<el-row>
                <el-col :span="24" align="right" style="padding:15px 5% 15px 0">
                    <el-pagination layout="prev, pager, next" @current-change="currentChange" :total="total" :page-size="page_size" background v-loading="loading"></el-pagination>
                </el-col>
            </el-row>-->
    </template>
    <el-dialog title="修改密码" :visible.sync="dialogTableVisible">
      <el-form ref="form" :model="form" :rules="rules" label-width="20%">
        <el-form-item label="原密码" prop="pwd">
          <el-input
            style="width: 80%"
            type="text"
            v-model="form.pwd"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_pwd">
          <el-input
            style="width: 80%"
            type="text"
            v-model="form.new_pwd"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="again_pwd">
          <el-input
            style="width: 80%"
            type="text"
            v-model="form.again_pwd"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePwd()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PlatformUserList",
  data() {
    return {
      list: [
        { id: 1, name: "lala", at_period: "2019年2月12日", amount: 12 },
        { id: 2, name: "jaja", at_period: "2019年2月22日", amount: 13 },
        { id: 3, name: "kaka", at_period: "2019年2月22日", amount: 14 },
        { id: 4, name: "sasa", at_period: "2019年2月23日", amount: 15 },
        { id: 5, name: "lala", at_period: "2019年2月22日", amount: 16 }
      ],
      form: {},
      search_form: {},
      loading: false,
      table_loading: false,
      dialogTableVisible: false,
      change_pwd_id: "",
      id: "",
      rules: {}
    };
  },
  created() {
    console.log("created");
    this.id = this.$route.params.id;
  },
  destroyed() {
    console.log("destroyed");
  },
  methods: {
    visDia(index, id) {
      this.dialogTableVisible = true;
      this.change_pwd_id = id; //通过id值知道修改哪条数据的密码
    },
    changePwd() {
      //   确认修改密码
      console.log(this.change_pwd_id);
      this.dialogTableVisible = false;
    },
    search() {
      console.log(this.search_form);
    },
    delRow(index, id) {
      this.$confirm("确定删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({ type: "success", message: "删除成功" });
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
