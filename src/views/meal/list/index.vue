<template>
  <div class="right">
    <div class="right-head">
      <div class="right-head-con">套餐列表</div>
      <router-link to="/meal/list/add">
        <el-button type="primary" size="small" icon="el-icon-plus">新增套餐</el-button>
      </router-link>
    </div>
      <!-- 表格start -->
      <el-table :data="mealList" style="width: 100%">
        <el-table-column  prop="updated_at"  label="添加时间" align="center"></el-table-column>
        <el-table-column  prop="name"  label="套餐名称" align="center"></el-table-column>
        <el-table-column  prop="num"  label="添加平台" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" :active-value="1" :inactive-value="0" @change="changeState($event,scope.row.id)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column  label="操作" align="center">
          <template slot-scope="scope">
            <router-link :to="`/meal/list/add/${scope.row.id}`">
              编辑
            </router-link>
            <span class="del-sty" @click="delMeal(scope.row.id)">删除</span>
          </template>
        </el-table-column>
      </el-table>

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
      pageSize: 0,
      current_page: 0,
      total: 0,
    };
  },
  mounted() {
    this.getData(1);
  },
  methods: {
    getData(page) {
      $http.post("/admin/pluginsSetMeal/mealList",{page}).then(({result,data,msg}) => {
        if(result) {
          this.mealList = data.data;
          this.total = data.total;
          this.pageSize = data.per_page;
          this.current_page = data.current_page;
        }
      })
      .catch(err => {
        console.error(err);
      });
    },
    currentChange(page) {
      this.getData(page);
    },
    delMeal(id) {
      this.$confirm('此操作将永久删除该套餐, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $http.post("/admin/pluginsSetMeal/delMeal",{plugins_meal_id:id}).then(({result,data,msg}) => {
          if(result) {
            this.$message.success(msg);
            this.getData();
          }else {
            this.$message.error(msg);
          }
        })
        .catch(err => {
          console.error(err);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    changeState(state,id) {
      $http.post("/admin/pluginsSetMeal/changeSate",{state,id}).then(({result,data,msg}) => {
        if(result) {
          this.$message.success(msg);
        }else {
          this.$message.error(msg);
        }
      })
      .catch(err => {
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
      float: left;
      padding-right: 20px;
      font-size: 16px;
      color: #888;
    }
  }
}

.del-sty {
  cursor: pointer;
  margin-left: 10px;
}
</style>
