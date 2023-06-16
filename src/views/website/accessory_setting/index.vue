<template>
  <div class="right">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全局设置" name="all">
        <el-form
          ref="all_form"
          :model="all_form"
          :rules="rules"
          label-width="15%"
        >
          <el-tag
            style="width:100%;padding:25px 0 25px 25px;height:70px;font-size:20px;"
          >
            <i class="el-icon-info"></i>全局设置只对上传到服务器的文件才有效
          </el-tag>
          <el-form-item label="PHP环境说明">
            <div>
              1.当前PHP环境允许最大单个上传文件大小为：
              {{ formData.upload_max_filesize }}
            </div>
            <div>
              2.当前PHP环境允许最大POST表单大小为：{{ formData.post_max_size }}
            </div>
          </el-form-item>
          <h5 class="rightlist-head">
            附件缩略设置
          </h5>
          <el-form-item label="是否启用缩略" prop="thumb">
            <el-radio v-model="all_form.thumb" :label="0">不启用缩略</el-radio>
            <el-radio v-model="all_form.thumb" :label="1">启用缩略</el-radio>
          </el-form-item>
          <el-form-item
            v-if="all_form.thumb === 1"
            label="缩略宽度"
            prop="thumb_width"
          >
            <el-input
              v-model="all_form.thumb_width"
              style="width:70%;"
              placeholder="请输入缩略宽度"
            >
              <template slot="append"
                >px
              </template>
            </el-input>
          </el-form-item>
          <h5 class="rightlist-head">
            图片附件设置
          </h5>
          <el-form-item label="支持图片后缀" prop="image_extentions">
            <el-input
              v-model="all_form.image_extentions"
              type="textarea"
              style="width:70%;"
              rows="5"
              placeholder="请输入支持图片后缀"
            ></el-input>
            <div class="tip">
              填写图片后缀名称，如：jpg，换行输入，一行一个后缀（如果为空，则采用系统默认设置）.
            </div>
          </el-form-item>
          <el-form-item label="支持图片大小" prop="image_limit">
            <el-input
              v-model="all_form.image_limit"
              style="width:70%;"
              placeholder="请输入支持图片大小"
            >
              <template slot="append"
                >KB
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="图片压缩" prop="zip_percentage">
            <el-input
              v-model="all_form.zip_percentage"
              style="width:70%;"
              placeholder="请输入图片压缩率"
            >
              <template slot="append"
                >%
              </template>
            </el-input>
            <div class="tip">
              100是不压缩，输入的值越大越清晰.
            </div>
          </el-form-item>
          <h5 class="rightlist-head">
            音频视频附件设置
          </h5>
          <el-form-item label="支持文件后缀" prop="audio_extentions">
            <el-input
              v-model="all_form.audio_extentions"
              type="textarea"
              style="width:70%;"
              rows="5"
              placeholder="请输入支持文件后缀"
            ></el-input>
            <div class="tip">
              填写音视频后缀名称，如：mp3，换行输入，一行一个后缀（如果为空，则采用系统默认设置）.
            </div>
          </el-form-item>
          <el-form-item label="支持文件大小" prop="audio_limit">
            <el-input
              v-model="all_form.audio_limit"
              style="width:70%;"
              placeholder="请输入支持文件大小"
            >
              <template slot="append"
                >KB</template
              >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="success"
              @click.stop.prevent="submitForm('all_form', 'all')"
            >
              提交
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="远程附件" name="accessory">
        <el-form
          ref="distance_form"
          :model="distance_form"
          :rules="rules"
          label-width="15%"
        >
          <el-form-item label="" prop="type">
             <el-radio-group v-model="distance_form.type" @input="radioChange">
            <el-radio v-model="distance_form.type" :label="0">关闭</el-radio>
            <el-radio v-model="distance_form.type" :label="2"
              >阿里云OSS</el-radio
            >
            <el-radio v-model="distance_form.type" :label="4"
              >腾讯云存储</el-radio
            >
            <el-radio v-model="distance_form.type" :label="5"
            >华为云存储</el-radio
            >
            </el-radio-group>
            <div class="tip" v-if="distance_form.type!=0">
              把/static/upload/images/整个images目录上传到对象存储上
            </div>
             <div class="tip" v-if="distance_form.type==2">
              阿里云oss上传教程,请前往阿里云了解
            </div>
             <div class="tip" v-if="distance_form.type==4">
              腾讯云对象存储上传教程,请前往腾讯云了解
            </div>
            <div class="tip" v-if="distance_form.type==5">
              华为云对象存储上传教程,请前往华为云了解
            </div>
          </el-form-item>

          <el-form
            ref="alioss"
            :model="distance_form.alioss"
            :rules="rules"
            label-width="15%"
          >
            <div v-if="distance_form.type == 2">
              <el-form-item label="Access Key ID" prop="key">
                <el-input
                  v-model="distance_form.alioss.key"
                  style="width:70%;"
                  @change="getBucket"
                  placeholder="请输入Access Key ID"
                ></el-input>
                <div class="tip">
                  Access Key
                  ID是您访问阿里云API的密钥，具有该用户完全的权限。请您妥善保管。
                </div>
              </el-form-item>
              <el-form-item label="Access Key Secret" prop="secret">
                <el-input

                  v-model="distance_form.alioss.secret"
                  @blur="keyBlur"
                  style="width:70%;"
                  placeholder="请输入Access Key Secret"
                ></el-input>
                <div class="tip">
                  Access Key
                  Secret是您访问阿里云API的密钥，具有该用户完全的权限。请您妥善保管。（填写完Access
                  Key ID和Access Key Secret后请选择bucket）
                </div>
              </el-form-item>
              <el-form-item label="内网上传" prop="internal">
                <el-radio v-model="distance_form.alioss.internal" :label="1"
                  >是
                </el-radio>
                <el-radio v-model="distance_form.alioss.internal" :label="0"
                  >否
                </el-radio>
                <div class="tip">
                  如果此站点使用的是阿里云ecs服务器，并且服务器与bucket在同一地区（如：同在华北一区），您可以选择通过内网上传的方式上传附件，以加快上传速度、节省带宽。
                </div>
              </el-form-item>

              <el-form-item
                label="bucket"
                prop="bucket"
                v-show="options.length > 0 || distance_form.alioss.bucket"
              >
                <el-select
                  v-model="distance_form.alioss.bucket"
                  placeholder="请选择"
                  @change="bucketChange"
                  style="width: 45%"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.loca_name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="自定义URL" prop="url">
                <el-input
                  v-model="distance_form.alioss.url"
                  style="width:70%;"
                  placeholder="默认URL不需要填写（默认包含aliyuncs.com）的URL不显示"
                ></el-input>
                <div class="tip">
                  阿里云oss支持用户自定义访问域名，如果自定义了URL则用自定义的URL，如果未自定义，则用系统生成出来的URL。注：自定义url开头加http://或https://结尾不加
                  ‘/’例：http://abc.com
                </div>
              </el-form-item>
            </div>
          </el-form>

          <el-form
            ref="cos"
            :model="distance_form.cos"
            :rules="rules"
            label-width="15%"
          >
            <div v-if="distance_form.type == 4">
              <el-form-item label="APPID" prop="appid">
                <el-input
                  v-model="distance_form.cos.appid"
                  style="width:70%;"
                  placeholder="请输入APPID"
                ></el-input>
                <div class="tip">APPID 是您项目的唯一ID</div>
              </el-form-item>
              <el-form-item label="SecretID" prop="secretid">
                <el-input
                  v-model="distance_form.cos.secretid"
                  style="width:70%;"
                  placeholder="请输入SecretID"
                ></el-input>
                <div class="tip">
                  SecretID 是您项目的安全秘钥，具有该账户完全的权限，请妥善保管
                </div>
              </el-form-item>
              <el-form-item label="SecretKEY" prop="secretkey">
                <el-input

                  v-model="distance_form.cos.secretkey"
                  style="width:70%;"
                  placeholder="请输入SecretKEY"
                ></el-input>
                <div class="tip">
                  SecretKEY 是您项目的安全秘钥，具有该账户完全的权限，请妥善保管
                </div>
              </el-form-item>
              <el-form-item label="Bucket" prop="bucket">
                <el-input
                  v-model="distance_form.cos.bucket"
                  style="width:70%;"
                  placeholder="请输入Bucket"
                ></el-input>
                <div class="tip">请保证bucket为可公共读取的</div>
              </el-form-item>
              <el-form-item label="bucket所在区域" prop="local">
                <el-select
                  v-model="distance_form.cos.local"
                  style="width:70%;"
                  placeholder="请选择bucket所在区域"
                  clearable
                >
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <div class="tip">选择bucket对应的区域，如果没有选择无</div>
              </el-form-item>
              <el-form-item label="Url" prop="url">
                <el-input
                  v-model="distance_form.cos.url"
                  style="width:70%;"
                  placeholder="请输入Url"
                ></el-input>
                <div class="tip">
                  腾讯云支持用户自定义访问域名。注：url开头加http://或https://结尾不加
                  ‘/’例：http://abc.com
                </div>
              </el-form-item>
            </div>
          </el-form>

          <el-form
                  ref="obs"
                  :model="distance_form.obs"
                  :rules="rules"
                  label-width="15%"
          >
            <div v-if="distance_form.type == 5">
              <el-form-item label="key" prop="key">
                <el-input
                        v-model="distance_form.obs.key"
                        style="width:70%;"
                        placeholder="请输入Access Key Id"
                ></el-input>
                <div class="tip">
                  Access Key Id 是您项目的安全秘钥，具有该账户完全的权限，请妥善保管
                </div>
              </el-form-item>
              <el-form-item label="secret" prop="secret">
                <el-input

                        v-model="distance_form.obs.secret"
                        style="width:70%;"
                        placeholder="请输入Secret Access Key"
                ></el-input>
                <div class="tip">
                  Secret Access Key 是您项目的安全秘钥，具有该账户完全的权限，请妥善保管
                </div>
              </el-form-item>
              <el-form-item label="Bucket" prop="bucket">
                <el-input
                        v-model="distance_form.obs.bucket"
                        style="width:70%;"
                        placeholder="请输入Bucket"
                ></el-input>
                <div class="tip">请保证bucket为可公共读取的</div>
              </el-form-item>
                <el-form-item label="Endpoint" prop="endpoint">
                    <el-input
                            v-model="distance_form.obs.endpoint"
                            style="width:70%;"
                            placeholder="请输入Endpoint"
                    ></el-input>
                </el-form-item>
            </div>
          </el-form>

          <el-form-item>
            <el-button
              type="success"
              @click.stop.prevent="submitForm('distance_form', 'save')"
            >
              保存配置
            </el-button>
            <el-button
              v-show="distance_form.type != 0"
              type="primary"
              @click.stop.prevent="submitForm('distance_form', 'test')"
            >
              测试配置（无需保存）
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";

export default {
  name: "website-setting",
  components: {
    Tinymce
  },
  data() {
    return {
      options1: [
        {
          value: "无"
        },
        {
          value: "南京"
        },
        {
          value: "成都"
        },
        {
          value: "北京"
        },
        {
          value: "广州"
        },
        {
          value: "上海"
        },
        {
          value: "重庆"
        },
        {
          value: "北京金融"
        },
        {
          value: "上海金融"
        },
        {
          value: "深圳金融"
        },
        {
          value: "香港"
        }
      ],
      options: [],
      formData: {},
      activeName: "all",
      all_form: {
        thumb: 0,
        thumb_width: "",
        image_extentions: "",
        image_limit: "",
        zip_percentage: "",
        audio_extentions: "",
        audio_limit: ""
      },
      distance_form: {
        type: 0,
        alioss: {
          key: "",
          secret: "",
          bucket: "",
          loca_name: "",
          internal: 0,
          url: ""
        },
        cos: {
          appid: "",
          secretid: "",
          secretkey: "",
          bucket: "",
          local: "",
          url: ""
        },
        obs: {
          key: "",
          secret: "",
          bucket: "",
        }
      },
      rules: {
        image_extentions: [
          {
            required: true,
            message: "请输入支持图片后缀",
            trigger: "blur"
          }
        ],
        image_limit: [
          {
            required: true,
            message: "请输入支持图片大小",
            trigger: "blur"
          }
        ],
        audio_extentions: [
          {
            required: true,
            message: "请输入支持文件后缀",
            trigger: "blur"
          }
        ],
        audio_limit: [
          {
            required: true,
            message: "请输入支持文件大小",
            trigger: "blur"
          }
        ],
        key: [
          {
            required: true,
            message: "请输入Access Key ID",
            trigger: "blur"
          }
        ],
        secret: [
          {
            required: true,
            message: "请输入Access Key Secret",
            trigger: "blur"
          }
        ],
        bucket: [
          {
            required: true,
            message: "请输入bucket",
            trigger: "change"
          }
        ],
          endpoint: [
              {
                  required: true,
                  message: "请输入endpoint",
                  trigger: "change"
              }
          ],
        internal: [
          {
            required: true,
            message: "请选择是否内网上传",
            trigger: "blur"
          }
        ],
        appid: [
          {
            required: true,
            message: "请输入APPID",
            trigger: "blur"
          }
        ],
        secretid: [
          {
            required: true,
            message: "请输入SecretID",
            trigger: "blur"
          }
        ],
        secretkey: [
          {
            required: true,
            message: "请输入SecretKEY",
            trigger: "blur"
          }
        ],
        local: [
          {
            required: true,
            message: "请输入bucket所在区域",
            trigger: "blur"
          }
        ]
      },
      is_auth:false
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    this.getDistance();
  },
  destroyed() {},
  methods: {
    handleClick() {
      // console.log("change");
    },
    bucketChange(value) {
      let obj = {};
      obj = this.options.find(item => {
        return item.value === value;
      });
      this.distance_form.alioss.loca_name = obj.loca_name;
    },
    getDistance() {
      $http
        .post("/admin/system/remote")
        .then(response => {
          if (response.result === 1) {
            if (response.data) {
              this.distance_form.type = response.data.type;
              this.distance_form.alioss = response.data.alioss;
              this.distance_form.cos = response.data.cos;
              if(response.data.obs) {
                this.distance_form.obs = response.data.obs;
                  if(this.distance_form.obs.key ){
                    this.distance_form.obs.secret = '**********'
                  }
                }
              if(this.distance_form.alioss.key){
                this.distance_form.alioss.secret = '**********'
              }
              if(this.distance_form.cos.secretid){
                this.distance_form.cos.secretkey = '**********'
              }
            }
            if(this.distance_form.type == 2) {
                if(this.distance_form.alioss.key && this.distance_form.alioss.secret){
                      this.is_auth = true
                      this.getBucket()
               }
            }
          } else {
            if(response.msg && response.msg!='') {
              this.$message.error(response.msg);
            }
          }
        })
        .catch(err => {
          this.$message.error("获取失败!");
          console.error(err);
        });
    },
    getData() {
      $http
        .post("/admin/system/globals", {}, "加载中")
        .then(response => {
          if (response.result === 1) {
            this.formData = response.data;
            this.all_form = this.formData.global;
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
    submitForm(formName, type) {
      let url = "";
      let dataJSON = {};
      switch (type) {
        case "all":
          url = "/admin/system/globals";
          dataJSON = {
            upload: this.all_form
          };
          break;
        case "save":
          url = "/admin/system/remote";
          dataJSON = this.distance_form;
          if (this.distance_form.type == 2) {
            formName = "alioss";
          } else if (this.distance_form.type == 4) {
            formName = "cos";
          } else {
            formName = "obs";
          }
          break;
        case "test":
          if (this.distance_form.type == 2) {
            url = "/admin/system/oss";
            dataJSON = {
              alioss: this.distance_form.alioss
            };
            formName = "alioss";
          } else if (this.distance_form.type == 4) {
            url = "/admin/system/cos";
            dataJSON = {
              cos: this.distance_form.cos
            };
            formName = "cos";
          } else {
            url = "/admin/system/obs";
            dataJSON = {
              obs: this.distance_form.obs
            };
            formName = "obs";
          }
          break;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          $http
            .post(url, dataJSON, "提交中")
            .then(response => {
              if (response.result === 1) {
                if(response.msg && response.msg!='') {
                  this.$message.success(response.msg);
                }
                if (type === "all") {
                  this.getData();
                  this.$refs[formName].resetFields();
                } else if (type === "save") {
                  this.getDistance();
                  this.$refs[formName].resetFields();
                }
              } else {
                if(response.msg && response.msg!='') {
                  this.$message.error(response.msg);
                }
              }
            })
            .catch(err => {
              // this.$message.error("提交失败!");
              console.error(err);
            });
        } else {
          return false;
        }
      });
    },
    getBucket() {
      if (!this.distance_form.alioss.key || !this.distance_form.alioss.secret) {
        return;
      }
      $http
        .post(
          "/admin/system/bucket",
          {
            key: this.distance_form.alioss.key,
            secret: this.distance_form.alioss.secret,
            is_auth:this.is_auth
          },
          " "
        )
        .then(response => {
          if (response.result === 1) {
            this.options = response.data;
          } else {
            this.options = response.data;
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
    radioChange(val){
      if(val == 2 && this.distance_form.alioss.key && this.distance_form.alioss.secret){
          this.is_auth = true
          this.getBucket()
      }
    },
    keyBlur(){
            if(this.distance_form.type == 2 && this.distance_form.alioss.key && this.distance_form.alioss.secret){
          this.is_auth = false
          this.getBucket()
      }
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
      // float:left;
      padding-right: 20px;
      font-size: 16px;
      color: #888;
    }
  }

  .rightlist-head {
    font-weight: 500;
    font-size: 18px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
  }

  .tip {
    color: #999;
  }
}

/* 上传图片 */
.avatar-uploader .el-upload {
  margin-top: 15px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-upload-tip {
  width: 178px;
  margin: 0;
  padding: 0;
  color: #999;
  text-align: center;
}

input[type="file"] {
  display: none;
}

.avatar-uploader-box {
  position: relative;
  width: 200px;

  .el-icon-circle-close {
    position: absolute;
    top: 10px;
    right: 0;
    color: #999;
  }
}
</style>
