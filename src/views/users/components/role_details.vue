<template>
  <div class="right">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        ><router-link to="/users/role"
          >角色管理</router-link
        ></el-breadcrumb-item
      >
      <el-breadcrumb-item>
        <span v-if="isEdit == false">新增</span><span v-else>编辑</span>角色
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" :rules="rules" label-width="15%">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name" style="width:70%"></el-input>
      </el-form-item>
      <el-form-item label="角色概述" prop="content">
        <el-input
          v-model="form.content"
          type="textarea"
          rows="5"
          style="width:70%"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限列表"> </el-form-item>
      <el-form-item label="权限管理" prop="">
        <div style="width:70%">
          <el-checkbox
            v-model.number="form.checked1"
            :true-label="1"
            :false-label="0"
            :label="1"
            >权限列表</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked2"
            :true-label="1"
            :false-label="0"
            :label="1"
            >权限添加</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked3"
            :true-label="1"
            :false-label="0"
            :label="1"
            >权限修改</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked4"
            :true-label="1"
            :false-label="0"
            :label="1"
            >权限删除</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked5"
            :true-label="1"
            :false-label="0"
            :label="1"
            >角色列表</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked6"
            :true-label="1"
            :false-label="0"
            :label="1"
            >角色添加</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked7"
            :true-label="1"
            :false-label="0"
            :label="1"
            >角色修改</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked8"
            :true-label="1"
            :false-label="0"
            :label="1"
            >角色删除</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked9"
            :true-label="1"
            :false-label="0"
            :label="1"
            >用户管理</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked10"
            :true-label="1"
            :false-label="0"
            :label="1"
            >用户添加</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked11"
            :true-label="1"
            :false-label="0"
            :label="1"
            >用户编辑</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked12"
            :true-label="1"
            :false-label="0"
            :label="1"
            >用户删除</el-checkbox
          >
        </div>
      </el-form-item>
      <el-form-item label="授权管理" prop="">
        <div style="width:70%">
          <el-checkbox
            v-model.number="form.checked13"
            :true-label="1"
            :false-label="0"
            :label="1"
            >插件列表</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked14"
            :true-label="1"
            :false-label="0"
            :label="1"
            >客户列表</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked3"
            :true-label="1"
            :false-label="0"
            :label="1"
            >应用列表</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked4"
            :true-label="1"
            :false-label="0"
            :label="1"
            >产品列表</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked5"
            :true-label="1"
            :false-label="0"
            :label="1"
            >订单列表</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked6"
            :true-label="1"
            :false-label="0"
            :label="1"
            >会员列表</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked7"
            :true-label="1"
            :false-label="0"
            :label="1"
            >客户应用列表</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked8"
            :true-label="1"
            :false-label="0"
            :label="1"
            >客户插件列表</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked9"
            :true-label="1"
            :false-label="0"
            :label="1"
            >灰度测试</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked10"
            :true-label="1"
            :false-label="0"
            :label="1"
            >黑名单</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked11"
            :true-label="1"
            :false-label="0"
            :label="1"
            >插件列表编辑</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked12"
            :true-label="1"
            :false-label="0"
            :label="1"
            >客户列表编辑</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked7"
            :true-label="1"
            :false-label="0"
            :label="1"
            >灰度测试编辑</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked8"
            :true-label="1"
            :false-label="0"
            :label="1"
            >黑名单编辑</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked9"
            :true-label="1"
            :false-label="0"
            :label="1"
            >添加用户</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked10"
            :true-label="1"
            :false-label="0"
            :label="1"
            >添加订单</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked11"
            :true-label="1"
            :false-label="0"
            :label="1"
            >添加产品</el-checkbox
          >
          <el-checkbox
            v-model.number="form.checked12"
            :true-label="1"
            :false-label="0"
            :label="1"
            >免费客服列表</el-checkbox
          >
        </div>
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
  name: "RoleDetail",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        checked1: 0,
        checked2: 0,
        checked3: 0,
        checked4: 0,
        checked5: 0,

        checked6: 0,
        checked7: 0,
        checked8: 0,
        checked9: 0,
        checked10: 0,

        checked11: 0,
        checked12: 0,
        checked13: 0,
        checked14: 0
      },
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
    submitForm(formName) {
      console.log(this.form);
    }
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
  .el-checkbox + .el-checkbox {
    width: 150px;
    margin-left: 50px;
  }
  .el-checkbox {
    width: 150px;
    margin-left: 50px;
  }
}
</style>
