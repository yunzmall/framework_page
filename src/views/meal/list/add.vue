<template>
  <div class="meal-add">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <router-link to="/meal/list/index">套餐列表</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span v-if="!id">新增</span><span v-else>编辑</span>套餐
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" label-width="13%">
      <el-form-item label="套餐排序">
        <el-input
          v-model="form.order_by"
          placeholder="数值越大排序靠前"
          style="width:40%"
        ></el-input>
      </el-form-item>
      <el-form-item label="套餐名称">
        <el-input
          v-model="form.name"
          placeholder="请输入名称"
          style="width:40%"
        ></el-input>
      </el-form-item>
      <el-form-item label="添加平台显示">
        <el-switch
          v-model="form.state"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
        <div class="tip">
          开启后管理员用户添加平台时间可选择对应的套餐,添加后平台自动启用对应的插件!
        </div>
      </el-form-item>
      <el-form-item label="套餐插件">
        <div class="meal-list">
          <span :class="pluginsType == item.id ? 'category-name active-category-name': 'category-name'"
            v-for="(item, index) in categoryList"
            :key="index"
            @click="clickCategory(item.id)"
            >{{ item.name }}</span
          >
        </div>
        <div class="status-list" v-if="categoryList.length && checkList.length">
          <span :class="statusId == item.id? 'status-name active-status-name': 'status-name'"
            v-for="(item, index) in statusList"
            :key="index"
            @click="clickStatus(item.id)"
            >{{ item.name }}</span
          >
        </div>
        <div class="checkbox-sty" v-if="categoryList.length">
          <el-checkbox v-model="item.checked" v-for="(item, index) in checkList" :key="index" @change="checkedChange">{{item.name}}</el-checkbox>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveData">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "mealList",
  data() {
    return {
      form:{
        order_by:'',
        name:'',
        state:1
      },
      plugins:[],
      pluginsType:'',
      categoryList:[],
      statusId:'',
      statusList:[{
        id: 1,
        name:'全选'
      },{
        id: 2,
        name:'反选'
      },{
        id: 3,
        name:'全不选'
      }],
      checkList:[],
      id:'',
      info: false,
    };
  },
  mounted() {
    this.id = this.$route.params.id !== undefined ? this.$route.params.id * 1 : '';
    if(this.id) {
      this.editMeal();
    }else{
      this.getClassification();
    }
  },
  methods: {
    // 获取编辑数据
    editMeal() {
      $http.get("/admin/pluginsSetMeal/editMeal",{plugins_meal_id:this.id}).then(({result,data,msg}) => {
        this.form.name = data.name;
        this.form.order_by = data.order_by;
        this.form.state = data.state;
        this.plugins = data.plugins;
        this.getClassification();
      })
      .catch(err => {
        console.error(err);
      });
    },
    // 获取分类
    getClassification() {
      $http.post("/admin/pluginsSetMeal/pluginsList",{type:""}).then(({result,data,msg}) => {
        if(result) {
          if(data.classification !== null && data.classification !== undefined) {
            this.categoryList = data.classification
          }
          this.pluginsType = this.categoryList.length ? this.categoryList[0].id : '';
          this.getPluginsList();
        }
      })
      .catch(err => {
        console.error(err);
      });
    },
    // 获取分类下面的数据
    getPluginsList() {
      this.info = false;
      $http.post("/admin/pluginsSetMeal/pluginsList",{type:this.pluginsType },'loading').then(({result,data,msg}) => {
        if(result) {
          this.checkList = data.data;
          for(let item of this.checkList) {
            for(let cItem of this.plugins) {
              if(item.title == cItem) {
                this.$set(item,'checked',true);
                this.plugins.splice(this.plugins.indexOf(cItem),1)
                break
              }else {
                this.$set(item,'checked',false);
              }
            }
          }

          // 删除当前插件的 已选中的分类
          for(let item of this.checkList) {
            for(let cItem of this.plugins) {
              if(item.title == cItem) {
                this.plugins.splice(this.plugins.indexOf(cItem),1)
                break
              }
            }
          }

          //用来处理全选 反选 全不选
          let allCheckedList= this.checkList.filter(item => item.checked);
          let allNoCheckedList = this.checkList.filter(item => !item.checked);
          this.statusId = '';
          if(allCheckedList.length == this.checkList.length) {
            this.statusId = 1;
          }
          if(allNoCheckedList.length == this.checkList.length) {
            this.statusId = 3;
          }
          this.info = true;
        }
      })
      .catch(err => {
        console.error(err);
      });
    },
    // 保存
    saveData() {
      for(let item of this.checkList) {
        if(item.checked) {
          this.plugins.push(item.title);
        }
      }
      let url = this.id ? 'admin/pluginsSetMeal/editMeal' : '/admin/pluginsSetMeal/addPluginsMeal';
      let parms = null;
      if(!this.id) {
        parms =  {
          ...this.form,
          'plugins':this.plugins
        }
      }else {
        parms = {
          form: {
            ...this.form,
            'plugins':this.plugins,
            'id':this.id
          }
        }
      }
      $http.post(url,{...parms}).then(({result,data,msg}) => {
        console.log(result,data,msg,'保存');
        if(result) {
          this.$message.success(msg);
          this.$router.push(this.fun.getUrl("List"));
        }else {
          this.$message.error(msg);
        }
      })
      .catch(err => {
        console.error(err);
      });
    },
    // 切换
    clickCategory(item) {
      if(!this.info) return;
      this.pluginsType = item;
      for(let item of this.checkList) {
        if(item.checked) {
          this.plugins.push(item.title);
        }
      }
      this.getPluginsList();
    },
    allChecked(){
      for(let item of this.checkList) {
        item.checked = true;
      }
    },
    reverseChecked(){
      for(let item of this.checkList) {
        item.checked = !item.checked;
      }
    },
    noAllChecked(){
      for(let item of this.checkList) {
        item.checked = false;
      }
    },
    clickStatus(id) {
      this.statusId = id;
      switch (id) {
        case 1:
          this.allChecked();
          break;
        case 2:
          this.reverseChecked();
          break;
        case 3:
          this.noAllChecked();
          break;
        default:
          break;
      }
    },
    checkedChange(val) {
      //全选
      for(let item of this.checkList) {
        if(!item.checked) {
          this.statusId = '';
          break
        }else {
          this.statusId = 1;
        }
      }
      //全不选
      let newCheckList = this.checkList.filter(item => !item.checked)
      if(newCheckList.length == this.checkList.length) {
        this.statusId = 3;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.el-checkbox+.el-checkbox {
  margin-left: 0 !important;
  margin-right: 30px;
}

.el-checkbox {
  margin-right: 30px !important;
}
.active-category-name {
  color: #298ff8;
  text-decoration: underline;
  text-underline-offset: 5px;
  text-decoration-color: #7ebafb;
}

.active-status-name {
  color: #298ff8;
}

.meal-add {
  padding-left: 30px;

  .el-breadcrumb {
    padding: 30px 0;
    font-size: 16px;
    display: flex;
    align-items: center;
  }

  .tip {
    color: #999;
    font-size: 12px;
  }

  .meal-list {
    display: flex;
    flex-wrap: wrap;

    .category-name {
      margin-right: 30px;
      cursor: pointer;
    }
  }

  .status-list {
    display: flex;
    flex-wrap: wrap;

    .status-name {
      margin-right: 20px;
      cursor: pointer;
    }
  }
}
</style>
