<template>
  <div class="right">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        ><router-link to="/home/theme/index"
          >主题管理</router-link
        ></el-breadcrumb-item
      >
      <el-breadcrumb-item>填写记录</el-breadcrumb-item>
    </el-breadcrumb>
    
    <template>
      <!-- 表格start -->
      <el-table :data="list" style="width: 100%">
        <el-table-column
          prop="created_at"
          label="填写时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="nickname"
          label="姓名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
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
        .post("/admin/user/contact_list", { page: val, }, "加载中")
        .then(response => {
          if (response.result === 1) {
            this.userData = response.data;
            this.total = response.data.total;
            this.pageSize = response.data.per_page;
            this.list = response.data.data;
            this.current_page = response.data.current_page;
          } else {
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
