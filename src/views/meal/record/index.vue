<template>
  <div class="right">
    <div class="right-head">
      <div class="right-head-con">套餐记录</div>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addGrant">新增授权</el-button>
    </div>
      <!-- 表格start -->
      <el-table :data="mealList" style="width: 100%">
        <el-table-column  prop="created_at"  label="添加时间" align="center"></el-table-column>
        <el-table-column  prop="updated_at"  label="更新时间" align="center"></el-table-column>
        <el-table-column  prop="has_one_uniacid_app.name"  label="平台名称" align="center"></el-table-column>
        <el-table-column  prop="has_one_plugins_meal.name"  label="最近授权套餐名称" align="center"></el-table-column>
        <el-table-column  prop="has_one_plugins_meal.count_plugins"  label="当前插件数量" align="center"></el-table-column>
        <el-table-column  label="操作" align="center">
          <template slot-scope="scope">
            <span @click="reauthorization(scope.row)" class="agein-grant">重新授权</span>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        title="新增授权"
        :visible.sync="dialogVisible"
        width="30%"
        :show-close="false">
        <el-form ref="form" label-width="25%">
          <el-form-item label="选择平台">
            <el-select v-model="uniacid" clearable filterable placeholder="请选择" :disabled="againIshow ? false : true" style="width: 70%;">
              <el-option
                v-for="item in platformList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择套餐">
            <el-select v-model="plugins_meal_id" clearable filterable placeholder="请选择" style="width: 70%;">
              <el-option
                v-for="item in pluginsMealList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <div class="tip">当前选中套餐插件数量: {{getNum}}</div>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </div>
      </el-dialog>

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
  </div>
</template>

<script>
export default {
  name: "mealList",
  data() {
    return {
      mealList:[],
      dialogVisible:false,
      pluginsMealList:[],
      platformList:[],
      uniacid:"",
      plugins_meal_id:"",
      pageSize: 0,
      current_page: 0,
      total: 0,
      againIshow: true, //判断是否重新授权
      power_type:""
    };
  },
  mounted() {
    this.getPluginsRecord(1);
    this.geTempower();
  },
  computed:{
    getNum() {
      let newPluginsList = this.pluginsMealList.filter(item => item.id == this.plugins_meal_id);
      return newPluginsList.length ? newPluginsList[0].count : 0
    }
  },
  methods: {
    getPluginsRecord(page){
      $http.get("/admin/pluginsSetMeal/pluginsRecord",{page}).then(({result,data,msg}) => {
        if(result) {
          this.mealList = data.data;
          this.total = data.total;
          this.pageSize = data.per_page;
          this.current_page = data.current_page;
        }else {
          this.$message.error(msg);
        }
      })
      .catch(err => {
        console.error(err);
      });
    },
    geTempower() {
      $http.get("/admin/pluginsSetMeal/empower",{}).then(({result,data,msg}) => {
        if(result) {
          this.pluginsMealList = data.pluginsMealList;
          this.platformList = data.platformList;
        }else {
          this.$message.error(msg);
        }
      })
      .catch(err => {
        console.error(err);
      });
    },
    currentChange(page) {
      this.getPluginsRecord(page);
    },
    addGrant() {
      this.uniacid = "";
      this.plugins_meal_id = "";
      this.dialogVisible = true;
      this.againIshow = true;
      this.power_type = "add";
    },
    submit() {
      $http.post("/admin/pluginsSetMeal/empower",{uniacid:this.uniacid,plugins_meal_id:this.plugins_meal_id,power_type:this.power_type},'loading').then(({result,data,msg}) => {
        if(result) {
          this.$message.success(msg);
          this.dialogVisible = false;
          this.getPluginsRecord(1);
        }else {
          this.$message.error(msg);
        }
      })
      .catch(err => {
        console.error(err);
      });
    },
    // 重新授权
    reauthorization(row) {
      this.dialogVisible = true;
      this.againIshow = false;
      this.uniacid = row.uniacid;
      this.plugins_meal_id = row.plugins_meal_id;
      this.power_type = "reset";
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

  .agein-grant {
    cursor: pointer;
  }
}

.dialog-footer {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 50px;
}

.dialog-footer .el-button {
  margin-right: 30px;
}
</style>
