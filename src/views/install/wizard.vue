<template>
  <div class="right">
    <div class="right-head">
      <el-row>
        <el-col :span="16">
          <div class="right-head-con">系统安装向导</div>
        </el-col>
        <el-col :span="7">
          <div align="right" class="right-head-con1">版本：{{version}}</div>
        </el-col>
      </el-row>
    </div>
    <!-- 系统安装协议 -->
    <div v-if="is_agree === 0" >
      <!-- <div class="right-content">
        系统安装协议
      </div> -->
      <div class="panel panel-default" style="width:80%;margin:0 auto">
        <div class="panel-heading text-center" style="font-size:20px;font-weight:900;padding:10px 0">芸众商城系统安装协议</div>
        <div class="panel-body" style="overflow-y:scroll;max-height:700px;line-height:20px;">
          <h3>版权所有 (c) 2019-2029，广州市芸众信息科技有限公司（以下简称芸众公司）保留所有权利。</h3>
          <p style="line-height:32px;">
            感谢您选择芸众产品。希望我们的努力能为您提供一个高效快速、强大的站点解决方案，和强大的电商系统解决方案。芸众公司网址为<a href="https://www.yunzmall.com" target="_blank">https://www.yunzmall.com</a>，产品官方讨论区网址为 <a href="https://bbs.yunzmall.com/forum.php" target="_blank">https://bbs.yunzmall.com/forum.php</a>。
          </p>
          <p style="line-height:32px;">
            用户须知：本协议是您与芸众公司之间关于您使用芸众公司提供的各种软件产品及服务的法律协议。无论您是个人或组织、盈利与否、用途如何（包括以学习和研究为目的），均需仔细阅读本协议，包括免除或者限制芸众责任的免责条款及对您的权利限制。请您审阅并接受或不接受本服务条款。如您不同意本服务条款及/或芸众随时对其的修改，您应不使用或主动取消芸众公司提供的芸众产品。否则，您的任何对芸众产品中的相关服务的注册、登陆、下载、查看等使用行为将被视为您对本服务条款全部的完全接受，包括接受芸众对服务条款随时所做的任何修改。
          </p>
          <p style="line-height:32px;">
            本服务条款一旦发生变更, 芸众将在网页上公布修改内容。修改后的服务条款一旦在网站管理后台或者芸众官网上公布即有效代替原来的服务条款。您可随时登陆芸众官方论坛查阅最新版服务条款。如果您选择接受本条款，即表示您同意接受协议各项条件的约束。如果您不同意本服务条款，则不能获得使用本服务的权利。您若有违反本条款规定，芸众公司有权随时中止或终止您对芸众产品的使用资格并保留追究相关法律责任的权利。
          </p>
          <p style="line-height:32px;">
            在理解、同意、并遵守本协议的全部条款后，方可开始使用芸众产品。您可能与芸众公司直接签订另一书面协议，以补充或者取代本协议的全部或者任何部分。
          </p>
          <p style="line-height:32px;">
            芸众拥有本软件的全部知识产权。本软件只供许可协议，并非出售。芸众只允许您在遵守本协议各项条款的情况下复制、下载、安装、使用或者以其他方式受益于本软件的功能或者知识产权。
          </p>
          <p>
            <strong>I. 协议许可的权利</strong>
            <ol style="line-height:32px;">
              <li>您可以在完全遵守本许可协议的基础上，将本软件应用于非商业用途，而不必支付软件版权许可费用。</li>
              <li>您可以在协议规定的约束和限制范围内修改芸众产品源代码(如果被提供的话)或界面风格以适应您的网站要求。</li>
              <li>您拥有使用本软件构建的网站中全部会员资料、文章及相关信息的所有权，并独立承担与使用本软件构建的网站内容的审核、注意义务，确保其不侵犯任何人的合法权益，独立承担因使用芸众软件和服务带来的全部责任，若造成芸众公司或用户损失的，您应予以全部赔偿。</li>
              <li>若您需将芸众软件或服务用户商业用途，必须另行获得芸众的书面许可，您在获得商业授权之后，您可以将本软件应用于商业用途，同时依据所购买的授权类型中确定的技术支持期限、技术支持方式和技术支持内容，自购买时刻起，在技术支持期限内拥有通过指定的方式获得指定范围内的技术支持服务。商业授权用户享有反映和提出意见的权力，相关意见将被作为首要考虑，但没有一定被采纳的承诺或保证。</li>
              <li>您可以从芸众提供的应用中心服务中下载适合您网站的应用程序，但应向应用程序开发者/所有者支付相应的费用。</li>

            </ol>
          </p>
          <p>
            <strong>II. 协议规定的约束和限制 </strong>
            <ol style="line-height:32px;">
              <li>未获芸众公司书面商业授权之前，不得将本软件用于商业用途（包括但不限于企业网站、经营性网站、以营利为目或实现盈利的网站）。购买商业授权请登陆<a href="https://www.yunzmall.com/" target="_blank">https://www.yunzmall.com/</a>参考相关说明，也可以致电020-29887215了解详情。</li>
              <li>未经芸众许可，不得对本软件或与之关联的商业授权进行出租、出售、抵押或发放子许可证。</li>
              <li>禁止在芸众产品的整体或任何部分基础上以发展任何派生版本、修改版本或第三方版本用于重新分发。</li>
              <li>您从应用中心下载的应用程序，未经应用程序开发者/所有者的书面许可，不得对其进行反向工程、反向汇编、反向编译等，不得擅自复制、修改、链接、转载、汇编、发表、出版、发展与之有关的衍生产品、作品等。</li>
              <li>如果您未能遵守本协议的条款，您的授权将被终止，所许可的权利将被收回，同时您应承担相应法律责任。</li>

            </ol>
          </p>
          <p>
            <strong>III. 有限担保和免责声明</strong>
            <ol style="line-height:32px;">
              <li>本软件及所附带的文件是作为不提供任何明确的或隐含的赔偿或担保的形式提供的。</li>
              <li>用户出于自愿而使用本软件，您必须了解使用本软件的风险，在尚未购买产品技术服务之前，我们不承诺提供任何形式的技术支持、使用担保，也不承担任何因使用本软件而产生问题的相关责任。</li>
              <li>芸众公司不对使用本软件构建的网站中的商品或信息承担责任，全部责任由您自行承担。</li>
              <li>芸众公司无法全面监控由第三方上传至应用中心的应用程序，因此不保证应用程序的合法性、安全性、完整性、真实性或品质等；您从应用中心下载应用程序时，同意自行判断并承担所有风险，而不依赖于芸众公司。但在任何情况下，芸众公司有权依法停止应用中心服务并采取相应行动，包括但不限于对于相关应用程序进行卸载，暂停服务的全部或部分，保存有关记录，并向有关机关报告。由此对您及第三人可能造成的损失，芸众公司不承担任何直接、间接或者连带的责任。</li>
              <li>芸众公司对芸众提供的软件和服务之及时性、安全性、准确性不作担保，由于不可抗力因素、芸众公司无法控制的因素（包括黑客攻击、停断电等）等造成软件使用和服务中止或终止，而给您造成损失的，您同意放弃追究芸众公司责任的全部权利。</li>
              <li>芸众公司特别提请您注意，芸众公司为了保障公司业务发展和调整的自主权，芸众公司拥有随时经或未经事先通知而修改服务内容、中止或终止部分或全部软件使用和服务的权利，修改会公布于芸众公司网站相关页面上，一经公布视为通知。 芸众公司行使修改或中止、终止部分或全部软件使用和服务的权利而造成损失的，芸众公司不需对您或任何第三方负责。</li>
              <li>有关芸众产品最终用户授权协议、商业授权与技术服务的详细内容，均由芸众公司独家提供。芸众公司拥有在不事先通知的情况下，修改授权协议和服务价目表的权利，修改后的协议或价目表对自改变之日起的新授权用户生效。</li>

            </ol>
          </p>
          <p>
            一旦您开始安装芸众产品，即被视为完全理解并接受本协议的各项条款，在享有上述条款授予的权利的同时，受到相关的约束和限制。协议许可范围以外的行为，将直接违反本授权协议并构成侵权，我们有权随时终止授权，责令停止损害，并保留追究相关责任的权力。
          </p>
          <p>
            本许可协议条款的解释，效力及纠纷的解决，适用于中华人民共和国大陆法律。
          </p>
          <p>
            若您和芸众之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，您在此完全同意将纠纷或争议提交芸众所在地广州市白云区人民法院管辖。芸众公司拥有对以上各项条款内容的解释权及修改权。
          </p>
          <p>
            （正文完）
          </p>
          <p>
            芸众公司
          </p>
        </div>
      </div>
      <div class="right-content-btn">
        <el-button type="primary" @click="agree()">同意协议进入安装</el-button>
        <el-button type="info">取消</el-button>
      </div>
    </div>
    <!-- 步骤 -->
    <div v-if="is_agree === 1">
      <div class="step-head">
        <div v-show="active == 1">Step.1 运行环境检测</div>
        <div v-show="active == 2">Step.2 文件权限设置</div>
        <div v-show="active == 3">Step.3 创建数据</div>
        <div v-show="active == 4">Step.4 账号设置</div>
        <div v-show="active == 5">Step.5 安装完成</div>
      </div>
      <div class="right-content1">
        <el-steps :active="active" align-center>
          <el-step title="运行环境检测" icon="el-icon-menu"></el-step>
          <el-step title="文件权限设置" icon="el-icon-setting"></el-step>
          <el-step title="账号设置" icon="el-icon-news"></el-step>
          <el-step title="创建数据" icon="el-icon-edit"></el-step>
          <el-step title="安装完成" icon="el-icon-success"></el-step>
        </el-steps>

        <div v-show="active == 1">
          <!-- <div class="right-content-main1">环境检查</div> -->
           <h5 class="rightlist-head">
              环境检查
            </h5>
          <!-- 表格start -->
          <el-table :data="sysytem_environment" style="width: 100%" border>
            <el-table-column
              prop="name"
              label="项目"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="need"
              label="程序所需"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="optimum"
              label="最佳配置推荐"
              align="center"
            ></el-table-column>
            <el-table-column label="当前服务器" align="center">
              <template slot-scope="scope">
                <span v-show="scope.row.check == true"
                  ><i style="color:#409eff" class="el-icon-success"></i
                ></span>
                <span v-show="scope.row.check == false"
                  ><i style="color:red" class="el-icon-error"></i
                ></span>
                <span>{{ scope.row.value }}</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- 表格end -->
          <!-- <div class="right-content-main1">函数检查</div> -->
           <h5 class="rightlist-head">
              函数检查
            </h5>
          <!-- 表格start -->
          <el-table :data="check_function" style="width: 100%" border>
            <el-table-column
              prop="name"
              label="目录文件"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="need"
              label="所需状态"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="value"
              label="当前状态"
              align="center"
            ></el-table-column>
          </el-table>
          <!-- 表格end -->
          <!-- <div class="right-content-main1">服务器信息</div> -->
          <h5 class="rightlist-head">
              服务器信息
            </h5>
          <!-- 表格start -->
          <el-table :data="server_info" style="width: 100%" border>
            <el-table-column
              prop="name"
              label="参数"
              min-width="200"
            ></el-table-column>
            <el-table-column
              prop="value"
              label="值"
              min-width="600"
            ></el-table-column>
          </el-table>
          <!-- 表格end -->
        </div>
        <div v-show="active == 2">
          <!-- <div class="right-content-main1">目录、文件权限检查</div> -->
          <h5 class="rightlist-head">
              目录、文件权限检查
            </h5>
          <!-- 表格start -->
          <el-table :data="file_list" style="width: 100%" border>
            <el-table-column
              prop="name"
              label="目录文件"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="need"
              label="所需状态"
              align="center"
            ></el-table-column>
            <el-table-column prop="value" label="当前状态" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.value == true">可写</span>
                <span v-else>不可写</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- 表格end -->
        </div>
        <div v-show="active == 3">
          <el-form ref="form" :model="form" :rules="rules" label-width="15%">
            <h5 class="rightlist-head">
              数据库信息
            </h5>
            <el-form-item label="数据库服务器" prop="set.DB_HOST">
              <el-input v-model="form.set.DB_HOST" style="width:70%"></el-input>
              <div class="tip">数据库服务器地址，一般为127.0.0.1或localhost</div>
            </el-form-item>
            <el-form-item label="数据库名" prop="set.DB_DATABASE">
              <el-input
                v-model="form.set.DB_DATABASE"
                style="width:70%"
              ></el-input>
            </el-form-item>
            <el-form-item label="数据库用户名" prop="set.DB_USERNAME">
              <el-input
                v-model="form.set.DB_USERNAME"
                style="width:70%"
              ></el-input>
            </el-form-item>
            <el-form-item label="数据库密码" prop="set.DB_PASSWORD">
              <el-input
                v-model="form.set.DB_PASSWORD"
                type="password"
                style="width:70%"
              ></el-input>
            </el-form-item>
            <el-form-item label="数据库表前缀" prop="set.DB_PREFIX">
              <el-input
                v-model="form.set.DB_PREFIX"
                style="width:70%"
              ></el-input>
              <div class="tip">同一数据库表运行多个程序时，请修改前缀</div>
            </el-form-item>
            <el-form-item label="数据库端口" prop="set.DB_PORT">
              <el-input v-model="form.set.DB_PORT" style="width:70%"></el-input>
              <div class="tip">数据库默认端口一般为3306</div>
            </el-form-item>
            <!-- <el-form-item label="" prop="is_install_data">
              <el-checkbox
                v-model.number="form.is_install_data"
                :true-label="1"
                :false-label="0"
                border
                >安装演示数据</el-checkbox
              >
            </el-form-item> -->
            <h5 class="rightlist-head">
              REDIS设置
            </h5>
            <el-form-item label="域名（redis_host）" prop="redis.host">
              <el-input v-model="form.redis.host" style="width:70%"></el-input>
              <div class="tip">
                为空时默认为127.0.0.1
              </div>
            </el-form-item>
            <el-form-item label="密码（redis_password）" prop="redis.password">
              <el-input
                v-model="form.redis.password"
                type="password"
                style="width:70%"
              ></el-input>
              <div class="tip">redis没设置密码时此行不用填写，为空时默认为NULL</div>
            </el-form-item>
            <el-form-item label="端口（port）" prop="redis.port">
              <el-input
                v-model="form.redis.port"
                type="text"
                style="width:70%"
              ></el-input>
              <div class="tip">为空时默认为6379</div>
            </el-form-item>
            <el-form-item label="库（database）" prop="redis.database">
              <el-input
                v-model="form.redis.database"
                type="text"
                style="width:70%"
              ></el-input>
              <div class="tip">为空时默认为0</div>
            </el-form-item>
            <el-form-item label="cache库（cache_database）" prop="redis.cache_database">
              <el-input
                v-model="form.redis.cache_database"
                type="text"
                style="width:70%"
              ></el-input>
              <div class="tip">为空时默认为1</div>
            </el-form-item>
            <h5 class="rightlist-head">
              网站信息
            </h5>
            <el-form-item label="站点名称" prop="user.name">
              <el-input v-model="form.user.name" style="width:70%"></el-input>
              <div class="tip">
                输入站点名称，安装后可以在平台设置中进行修改
              </div>
            </el-form-item>
            <el-form-item label="管理员账号" prop="user.username">
              <el-input
                v-model="form.user.username"
                style="width:70%"
              ></el-input>
              <el-button type="primary" @click="randomUser">随机账号</el-button>
            </el-form-item>
            <el-form-item label="管理员密码" prop="user.password">
              <el-input
                v-model="form.user.password"
                :type="is_show_repassword?'password':'text'"
                style="width:70%"
              ></el-input>
              <el-button type="primary" @click="randomPass">随机密码</el-button>
              <div class="tip">管理员密码不少于6个字符</div>
            </el-form-item>
            <el-form-item label="重复密码" prop="user.repassword" v-if="is_show_repassword">
              <el-input
                v-model="form.user.repassword"
                type="password"
                style="width:70%"
              ></el-input>
              <div class="tip">确保两次输入的密码一致</div>
            </el-form-item>
            <el-form-item label="手机号" prop="user.mobile">
              <el-input
                v-model="form.user.mobile"
                type="text"
                style="width:70%"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div v-show="active == 4">
          创建数据...
        </div>
        <div v-show="active == 5">
          <div
            class=""
            style="font-size:50px;text-align:center;color:#409eff;padding:100px 0;font-weight:900"
          >
            <i class="el-icon-success"> 安装完成</i>
          </div>
          <router-link to="/login">
            <el-button type="primary">跳到登录页面</el-button>
          </router-link>
        </div>
        <div class="right-content-btn">
          <el-button
            type="primary"
            @click="change(0)"
            v-show="(active != 1) & (active != 5)"
            >上一步</el-button
          >
          <el-button
            type="primary"
            @click="change(1)"
            v-show="active != 4 && active != 5"
            >下一步</el-button
          >
          <el-button type="primary" @click="install()" v-show="active == 4"
            >确认安装</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Fun from "@/utils/fun";
export default {

  name: "PlatformManage",
  data() {
    const validRepwd = (rule, value, callback) => {
      if (value != this.form.user.password) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    };
    const validRepwd1 = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码长度不能少于6"));
      } else {
        callback();
      }
    };
    const validMobile = (rule, value, callback) => {
      if (!/^1\d{10}$/.test(value)) {
        callback(new Error("请输入正确的手机格式"));
      } else {
        callback();
      }
    };
    return {
      is_agree: 0,
      active: 1,
      version:"",//版本号
      form: {
        set: {
          DB_HOST:"127.0.0.1",
          DB_PORT:3306,
          DB_PREFIX:"ims_",
        },
        user: {
          username: '',
          password: '',
        },
        redis:{
          host:"127.0.0.1",
          port:"6379",
          database:"0",
          cache_database:"1",
          password:"",
        },
      },
      sysytem_environment: [],
      server_info: [],
      check_function: [],
      file_list: [],
      rules: {
        set: {
          DB_HOST: { required: true, message: "请输入数据库服务器" },
          DB_DATABASE: { required: true, message: "请输入数据库名" },
          DB_USERNAME: { required: true, message: "请输入数据库用户名" },
          DB_PASSWORD: { required: true, message: "请输入数据库密码" },
          DB_PREFIX: { required: true, message: "请输入数据库前缀" },
          DB_PORT: { required: true, message: "请输入数据库端口" }
        },
        user: {
          name: { required: true, message: "请输入站点名称" },
          username: { required: true, message: "请输入管理员账号" },
          password: [
            { required: true, message: "请输入管理员密码" },
            { validator: validRepwd1 }
          ],
          repassword: [
            { required: true, message: "请输入重复密码" },
            { validator: validRepwd },
            { validator: validRepwd1 }
          ],
          mobile:[
            { required: true, message: "请输入手机号" },
            { validator: validMobile }
          ]
        }
      },
      is_show_repassword: true, // 是否显示 确认密码框
    };
  },
  created() {
    this.getVersion();
  },
  destroyed() {},
  methods: {
    getVersion(){
      $http
        .post("/admin/install/agreement", {}, "加载中")
        .then(response => {
          console.log(response)
          if(response.data.status==-1) {
            if(response.msg && response.msg!='') {
              this.$message.error(response.msg);
            }
            window.location.href = Fun.getSiteRootAdmin();
          }
          this.version = response.data.version;
        })
        .catch(() => {
          console.log("获取数据失败！");
        });
    },
    getDetectionData() {
      $http
        .post("/admin/install/check", {}, "加载中")
        .then(response => {
          if(response.data.status==-1) {
            if(response.msg && response.msg!='') {
              this.$message.error(response.msg);
            }
            window.location.href = Fun.getSiteRootAdmin();
          }
          this.sysytem_environment = response.data.sysytem_environment;
          this.check_function = response.data.check_function;
          this.server_info = response.data.server_info;
        })
        .catch(() => {
          console.log("获取数据失败！");
        });
    },
    getFileData() {
      $http
        .post("/admin/install/file_power", {}, "加载中...")
        .then(response => {
          if(response.data.status==-1) {
            if(response.msg && response.msg!='') {
              this.$message.error(response.msg);
            }
            window.location.href = Fun.getSiteRootAdmin();
          }
          this.file_list = response.data;
        })
        .catch(() => {
          console.log("获取数据失败！");
        });
    },
    submit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (!this.is_show_repassword) {
            this.form.user.repassword = this.form.user.password;
          }
          $http
            .post(
              "/admin/install/set_info",
              { set: this.form.set, user: this.form.user,redis:this.form.redis },
              "提交中..."
            )
            .then(response => {
              if (response.result === 1) {
                if(response.msg && response.msg!='') {
                  this.$message.success("创建数据成功");
                }
              } else {
                if(response.data.status==-1) {
                  window.location.href = Fun.getSiteRootAdmin();
                }
                if(response.msg && response.msg!='') {
                  this.$message.error(response.msg);
                }
                this.active = 3;
              }
            })
            .catch(() => {
              // this.$message.error(response.msg);
              this.active = 3;
            });
        } else {
          console.log("error submit!!");
          this.active = 3;
          return false;
        }
      });
    },
    agree() {
      this.is_agree = 1;
      this.getDetectionData();
    },
    change(x) {
      if (x === 1) {
        this.active++;
        if (this.active == 2) {
          this.sysytem_environment.map((item, index) => {
            if (item.check == false) {
              this.active = 1;
              this.$message.error("当前环境不支持安装！");
              return false;
            }
          });
          if (
            this.file_list == [] ||
            !this.file_list ||
            this.file_list == undefined ||
            this.file_list.length == 0
          ) {
            //判断是否已获取数据
            this.getFileData();
          }
        }
        if (this.active == 4) {
          this.submit("form");
        }

        if (this.active > 5) {
          this.active = 5;
        }
      }
      if (x === 0) {
        this.active--;
        if (this.active < 1) {
          this.active = 1;
        }
        if (x == 3) {
          // console.log("sdsds");
        }
      }
    },
    install() {
      $http
        .post("/admin/install/create_data", {}, "安装中...")
        .then(response => {
          if (response.result === 1) {
            this.active++;
            this.delete();
          } else {
            if(response.msg && response.msg!='') {
              this.$message.error(response.msg);
            }
          }
        })
        .catch(() => {
          // this.$message.error(response.msg);
        });
    },
    // delete
    delete() {
      $http
        .post("/admin/install/delete", {}, "")
        .then(response => {
          if (response.result === 1) {
          } else {
            if(response.data.status==-1) {
              window.location.href = Fun.getSiteRootAdmin();
            }
            if(response.msg && response.msg!='') {
              this.$message.error(response.msg);
            }
          }
        })
        .catch(() => {
          // this.$message.error(response.msg);
        });
    },

    // 随机生成账号密码
    async randomUser () {
       let res = await $http.post("/admin/install/random_user", { },"生成中...");
       if (!res.result) {
         this.$message.error(res.msg);
         return;
       }
       this.form.user.username = res.data;
       this.$message.success("生成随机账号成功");
    },
    async randomPass () {
       let res = await $http.post("/admin/install/random_psw", { },"生成中...");
       if (!res.result) {
         this.$message.error(res.msg);
         return;
       }
       this.form.user.password = res.data;
       this.form.user.repassword = res.data;
       this.rules.repassword = [];
       this.is_show_repassword = false;
       this.$message.success("生成随机密码成功");
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.right-head {
  line-height: 70px;
  border-bottom: 1px solid #ccc;
}
.right-head-con {
  font-size: 26px;
  padding-left: 5%;
  color: #409eff;
  font-weight: 900;
}
.right-head-con1 {
  color: #999;
}
.right-content {
  border: 1px solid #ccc;
  width: 80%;
  margin: 0 auto;
  height: 600px;
  overflow-y: scroll;
  margin-top: 50px;
  text-align: center;
}
.right-content-btn {
  text-align: center;
  margin: 30px 0;
}
.right-content1 {
  width: 80%;
  margin: 0 auto;
}
.step-head {
  font-size: 35px;
  font-weight: 900;
  text-align: center;
  padding: 50px 0;
}
.right-content-main1 {
  margin-top: 30px;
  font-size: 18px;
}
.tip {
  font-size: 12px;
  color: #999;
}
.rightlist-head {
  padding: 15px 0;
  line-height: 50px;
  font-size: 18px;
  border-bottom: 1px solid #ccc;
}
</style>
