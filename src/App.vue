<template>
  <div id="app">
    <router-view />
    <el-dialog title="" :visible.sync="$store.state.user.is_open_pwd" @close="closePwd">
      <div style="text-align:center;">
        <div style="font-size:50px;color:#ff7676;padding:50px 0">
          <i class="el-icon-warning"></i>
        </div>
        <div style="padding-bottom:50px;font-size:16px">
          提示：{{$store.state.user.tips_word}}
        </div>
        <div style="padding-bottom:50px">
          <el-button type="primary" @click="gotoChangePwd">
            修改密码
          </el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      is_tips : false,

    };
  },
  watch: {
    //监测路由变化
    $route(to, from) {
      if (to.meta.title) {
        this.fun.setTitle(to.meta.title);
      } else {
        this.fun.setTitle(" ");
      }
    }
  },
  created() {
    this.is_tips = this.$store.state.user.is_open_pwd;
  },
  methods: {
    closePwd() {
      if(this.$route.name !== 'changePwd') {
        this.$router.push(this.fun.getUrl("Manage"));
      }
    },
    gotoChangePwd() {
      this.$store.dispatch("IsOpenPwd", false);
      this.$router.push(this.fun.getUrl("changePwd"));
    },
  },
};
</script>
