<template>
  <div class="right">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <router-link to="/users/admin">管理员用户组</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span v-if="isEdit == false">新增</span><span v-else>编辑</span>用户组
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" :rules="rules" label-width="15%">
      <el-form-item label="用户组名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入用户组名称"
          style="width:70%"
        ></el-input>
      </el-form-item>
      <el-form-item label="创建平台数量" prop="amount">
        <el-input
          v-model="form.amount"
          placeholder="请输入数量"
          style="width:70%"
        >
          <template slot="append"
            >个</template
          >
        </el-input>
        <div class="tip">允许该用户创建的平台数量，为0或为空则不允许创建！</div>
      </el-form-item>
      <el-form-item label="有效期" prop="at_valid">
        <el-input
          v-model="form.at_valid"
          placeholder="请输入有效期"
          style="width:70%"
        >
          <template slot="append"
            >天</template
          >
        </el-input>
        <div class="tip">设置用户组有效期，为0则永久有效！</div>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm('form')">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AdminUserDetail",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {},
      rules: {}
    };
  },
  computed: {},
  created() {
    if (this.isEdit == false) {
      console.log("this is add !");
    }
    if (this.isEdit == true) {
      console.log(this.$route.params.id);
      console.log("this is edit !");
    }
  },
  methods: {
    submitForm() {}
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.right {
  padding-left: 30px;
  .el-breadcrumb {
    padding: 30px 0;
    font-size: 16px;
  }
  .el-breadcrumb__inner {
    a {
      font-weight: 500;
    }
  }
  .tip {
    color: #999;
  }
}
</style>
