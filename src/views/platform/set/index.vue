<template>
  <div class="set">
    <div class="right-head">
      <div class="right-head-con">平台 / 基础设置</div>
    </div>
    <div class="content-row">
      <div style="flex:1"> 管理员添加平台有效期</div>
      <div style="flex:6">
        <el-radio-group v-model="type">
          <el-radio :label="0">不限制</el-radio>
          <el-radio :label="1">不大于管理员有效期</el-radio>
          <el-radio :label="2">
            指定天数 
            <el-input placeholder="请输入数值" style="width:60%;" v-model="endtime"></el-input>
            <span class="date-sty">天</span>
          </el-radio> 
        </el-radio-group>
        <div class="tip">不大于管理员有效期: 管理员添加平台时，选择的有效期不能大于管理员自身有效期!</div>
        <div class="tip">指定天数: 管理员添加平台时起叠加设置天数。</div>
      </div>
    </div>
    <div class="content-row">
      <div style="flex:1"> </div>
      <div style="flex:6">
        <el-button @click="save" type="primary">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "set",
  data() {
    return {
      type: 0,
      endtime:''
    };
  },
  mounted() {
    this.getBasicSettings();
  },
  methods: {
    getBasicSettings() {
      $http.get("/admin/application/basic_settings", {}).then(({data,result,msg}) => {
        if (result) {
          this.type = data.type;
          this.endtime = data.endtime;
        } else {
          this.$message.error(msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    save() {
      $http.post("/admin/application/basic_settings", {term_of_validity: {
        type: this.type,
        endtime: this.endtime
      }}).then(({data,result,msg}) => {
        if (result) {
          this.$message.success(msg);
          this.endtime = this.type == 2 ? this.endtime : "";
        } else {
          this.$message.error(msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.set {
  padding-left: 30px;
  .right-head {
    padding: 15px 0;
    line-height: 50px;
    border-bottom: 1px #ccc solid;
    margin-bottom: 15px;
    .right-head-con {
      padding-right: 20px;
      font-size: 16px;
      color: #888;
    }
  }

  .content-row {
    display: flex;
    margin-bottom: 20px;
  }

  .date-sty {
    color: #606266;
  }
  
  .tip {
    color: #999;
    font-size: 12px;
    margin-top: 10px;
  }
}
</style>
