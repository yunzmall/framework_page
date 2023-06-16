<template>
  <div class="white-list" >
    <div class="right-head">
      <div class="right-head-con1">IP白名单</div>
      <el-button size="small" type="primary" @click="dialogVisible = true"><i class="el-icon-plus"></i>添加白名单</el-button>
    </div>
    <div class="white-top">
      <div style="width: 100%;">
        <el-input v-model="form.ip" style="width:10%" placeholder="请输入IP地址"></el-input>
        <el-select v-model="form.is_open" placeholder="状态" clearable filterable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button type="success" icon="el-icon-search" @click="currentChange(1)">搜索</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="ipList" style="width: 100%">
      <el-table-column label="IP地址" align="center">
        <template slot-scope="scope">
          <div @mouseleave="leave(scope.$index)">
            <span @mouseenter="enter(scope.$index)" >{{scope.row.ip}}</span>
            <el-popover placement="top" width="250" :ref="`popover-${scope.$index}`" trigger="hover"> 
              <div style="display:flex;padding: 15px;"  @mouseenter="enter(scope.$index)">
                <el-input v-model="scope.row[scope.column.property]" style="margin-right: 10px"></el-input>
                <el-button plain size="mini" @click="determinePopover(scope.row[scope.column.property],scope)">确定</el-button>
              </div>
              <i class="el-icon-edit" slot="reference" v-show="scope.row.seen" @mouseenter="enter(scope.$index)" style="color:#409EFF;"></i>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" >
        <template slot-scope="scope">
          <el-switch v-model="scope.row.is_open" :active-value="1" :inactive-value="0" @change="changeStatus(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" >
        <template slot-scope="scope">
          <i class="el-icon-delete" @click="deletedWhiteList(scope.row.id)"></i>
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
    <!-- 添加白名单弹窗 -->
    <el-dialog
      title="添加白名单"
      :visible.sync="dialogVisible"
      class="add-white-dialog"
      width="40%"
      :before-close="btnCancel">
      <div><span class="tip-weight">请输入有效IP地址</span> <span class="tip">(如:XXX.XXX.XXX.XXX)</span></div>
      <textarea v-model="keyword" ></textarea>
      <div class="tip">按 “回车” 可添加多个</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="btnCancel">取 消</el-button>
        <el-button type="primary" @click="btnAddWhiteList">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import axios from "axios";
export default {
  name: "website-setting",
  components: {
    Tinymce
  },
  data() {
    return {
      form:{
        ip:"",
        is_open:""
      },
      options: [{
          value: 0,
          label: '禁用'
        }, {
          value: 1,
          label: '开启'
        }],
      ipList:[],
      dialogVisible: false,
      keyword:"",
      pageSize: 0,
      current_page: 0,
      total: 0
    };
  },
  mounted(){
    this.getWhiteList(1)
  },
  methods: {
    // 封装axios的put请求
    put(url, params) {
      return new Promise((resolve, reject) => {
        axios
          .put(url, params)
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 封装axios的delete请求
    delete(url, params) {
      return new Promise((resolve, reject) => {
        axios
          .delete(url, {data:params})
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async  getWhiteList(page){
      let res = await $http.post("/admin/system/whiteList", {
        page,
        search:{...this.form}
      },"加载中");
      if (!res.result) {
        this.$message.error(res.msg);
        return;
      }
      this.total = res.data.total;
      this.ipList = res.data.data;
      this.current_page = res.data.current_page;
      this.pageSize = res.data.per_page;
      for(let item of this.ipList){
        this.$set(item,'seen',false)
      }
    },
    enter(index){
      this.ipList.forEach((item,itemIndex) => {
        if(itemIndex === index){
          item.seen = true
        }else{
          item.seen = false
        }
      })
    },
    leave(index){
      this.ipList[index].seen = false
    },
    currentChange(page){
      this.getWhiteList(page)
    },
    // 编辑ip
    determinePopover(data, scope){
      // this.ipList[`${scope.$index}`].ip = data
      scope._self.$refs[`popover-${scope.$index}`].doClose()
      this.editorPopover(scope.row.id,data,scope.row.is_open)
    },
    async editorPopover(id,ip,is_open){
      let res = await this.put("/admin/system/setWhiteList", {
        id,
        edit:{
          ip,
          is_open
        }
      });
      if (!res.result) {
        this.$message.error(res.msg);
        return;
      }else{
        this.$message.success(res.msg);
        location.reload();
      }
      
    },
    // 删除
    async deletedWhiteList(id){
      let res = await this.delete("/admin/system/setWhiteList",{id});
      if (!res.result) {
        this.$message.error(res.msg);
        return;
      }else{
        this.$message.success(res.msg);
        location.reload();
      }
    },
    // 添加白名单
    btnAddWhiteList(){
      // 对数据进行筛选
      let newArray = this.keyword.split(/[(\r\n)\r\n]+/); // 根据换行或者回车进行识别
      newArray.forEach((item, index) => { // 删除空项
      if (!item) {
          newArray.splice(index, 1);
        }
      })
      newArray = Array.from(new Set(newArray)); // 去重
      this.addWhiteListData(newArray)
    },
    async addWhiteListData(white_list){
      let res = await $http.post("/admin/system/setWhiteList", {
        white_list
      },"加载中");
      if (!res.result) {
        this.$message.error(res.msg);
        return;
      }else{
        this.$message.success(res.msg);
        this.dialogVisible = false
        location.reload();
      }
    },
    // 修改状态
    changeStatus(state){
      this.editorPopover(state.id,state.ip,state.is_open)
    },
    // 取消
    btnCancel(){
      this.dialogVisible = false
      this.keyword = ""
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.el-popover {
  padding: 0;
}
.white-list {
  padding-left: 30px;
  .right-head {
    padding: 15px 0;
    display: flex;
    align-items: center;
    border-bottom: 1px #ccc solid;
    margin-bottom: 15px;
    .right-head-con1 {
      // float:left;
      padding-right: 20px;
      font-size: 16px;
      color: #888;
    }
  }

  .white-top {
    display: flex;
    justify-content: space-between;

    button {
      margin-right: 20px;
    }
  }
  
  .add-white-dialog {
    .el-dialog{
      display: flex;
      flex-direction: column;
      margin:0 !important;
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      border-radius: 10px;
    }

    .tip {
      color: #909097;
    }
    
    .tip-weight {
      color: #4e514e;
    }

    textarea {
      height: 250px;
      margin: 20px 0;
      width: 100%;
      border-color: #e1e1e1;
      resize:none;
    }

    textarea:focus { 
      outline: none !important; 
      border-color: #e1e1e1; 
    }

    .dialog-footer {
      display: flex;
      justify-content: center;

      button {
        margin-right: 20px;
        width: 100px;
      }
    }

    .el-dialog__headerbtn {
      top: 7px;
      right: 7px;
      font-size: 28px;
      color: #4e514e;
    }
  }
}
</style>
