<template>
  <div class="right">
    <div class="right-head">
      <div class="right-head-con">
        <router-link to="/users/permissions">
          <el-button type="warning" size="small" icon="el-icon-back"
            >返回顶级菜单</el-button
          >
        </router-link>
      </div>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="edit(0)"
        >添加权限</el-button
      >
    </div>
    <el-form :inline="true" :model="search_form" ref="search_form">
      <el-form-item>
        <el-input v-model="search_form.keyword" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="search()">搜索</el-button>
      </el-form-item>
    </el-form>
    <template>
      <!-- 表格start -->
      <el-table :data="list" style="width: 100%" v-loading="table_loading">
        <el-table-column prop="id" label="" align="center"></el-table-column>
        <el-table-column
          prop="username"
          label="权限规则"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="user_group"
          label="权限名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="at_register"
          label="权限概述"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="at_expire"
          label="权限创建日期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="权限修改日期"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" min-width="180" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" @click="delRow(scope.row.id)"
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
    <el-dialog title="添加/编辑权限" :visible.sync="dialogTableVisible">
      <el-form ref="form" :model="form" :rules="rules" label-width="15%">
        <el-form-item label="权限规则" prop="rule">
          <el-input type="text" v-model="form.rule"></el-input>
        </el-form-item>
        <el-form-item label="权限名称" prop="name">
          <el-input type="text" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="权限概述" prop="content">
          <el-input type="textarea" :rows="5" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PermissionsList",
  data() {
    return {
      list: [
        {
          id: 1,
          is_open: 1,
          user_group: "标准版",
          username: "hdnjsd",
          at_register: "2019年2月21日",
          at_expire: "2019年12月31日",
          status: "有效"
        },
        {
          id: 2,
          is_open: 0,
          user_group: "定制版",
          username: "yan",
          at_register: "2019年2月21日",
          at_expire: "2019年12月31日",
          status: "已过期"
        },
        {
          id: 3,
          is_open: 1,
          user_group: "标准版",
          username: "leng",
          at_register: "2019年2月21日",
          at_expire: "2019年12月31日",
          status: "已禁用"
        },
        {
          id: 4,
          is_open: 0,
          user_group: "标准版",
          username: "liang",
          at_register: "2019年2月21日",
          at_expire: "2019年12月31日",
          status: "有效"
        }
      ],
      dialogTableVisible: false,
      search_form: {},
      form: {},

      loading: false,
      table_loading: false,
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
    //   添加/修改权限
    edit(id) {
      //   添加时id为0
      console.log(id);
      var that = this;
      that.dialogTableVisible = true;
    },
    //   确认添加修改
    confirm() {
      console.log(this.form);
      var that = this;
      that.dialogTableVisible = false;
    },

    search() {
      console.log(this.search_form);
    },
    delRow(id) {
      var that = this;
      that
        .$confirm("确定删除吗", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that.$message({ type: "success", message: "删除成功!" });
        })
        .catch(() => {
          that.$message({ type: "info", message: "已取消删除" });
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
