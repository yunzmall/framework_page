import axios from "axios";
import Fun from "@/utils/fun";
import store from "../store"
import { Loading, MessageBox, Message } from "element-ui";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
var loading;

export default {
  // 封装axios的post请求
  axiosPost(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 封装axios的get请求
  axiosGet(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params: params })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //封装的 GET请求
  get(url, params, message) {
    if (message) {
      loading = Loading.service({
        lock: true,
        text: message,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    }

    if (params) {
      let paramsArray = [];
      Object.keys(params).forEach(key =>
        paramsArray.push(key + "=" + params[key])
      );
      url += "?" + paramsArray.join("&");
    }

    return new Promise(function(resolve, reject) {
      fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      })
        .then(response => {
          if (response.ok) {
            if (message) {
              loading.close();
            }
            return response.json();
          } else {
            if (message) {
              loading.close();
            }
            reject({ status: response.status });
          }
        })
        .then(response => {
          if (
            response.result === 0 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.status === -5
          ) {
            //注册站点
            window.location.href = Fun.getSiteRootAdmin() + "#/website/register_website";
          } else if (
            response.result === 0 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.status === -4
          ) {
            //安装向导
            window.location.href = Fun.getSiteRootAdmin() + "#/install";
            // Message.error(response.msg);
          } else if (
            response.result === 0 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.status === -3
          ) {
            //无权限
            window.location.href = Fun.getSiteRootAdmin() + "#/manage/index";
            Message.error(response.msg);
          } else if (
            response.result === 0 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.status === -2
          ) {
            window.location.href = Fun.getSiteRootAdmin() + "#/login";
            Message.error(response.msg);
          } else if (
            response.result === 0 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.login_status === 1
          ) {
            window.location.href = Fun.getSiteRootAdmin() + "#login";
            console.log("无权限，跳入登录入口");
          } else if (
            response.result === 1 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.status === -5
          ) {
            window.location.href = Fun.getSiteRootAdmin() + "#/login";
            Message.error(response.msg);
          }  else if (
            response.result === 0 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.status == 'upgrade'
          ) {
            window.location.href = Fun.getSiteRootAdmin() + "#/website/system_upgrade";
            console.log("跳入系统升级页面");
          }
          if (
            response.result === 1 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.pwd_remind === 1
          ) {
            // 提示修改密码弹出框
            store.dispatch("IsOpenPwd", true);
            store.dispatch("tips_word", response.data.msg);
            console.log("提示修改密码弹出框")
          }
          if (
            response.result === 1 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.pwd_remind === 2
          ) {
            // 提示修改密码强度
            store.dispatch("IsOpenPwd", true);
            store.dispatch("tips_word", response.data.msg);
            console.log("提示修改密码强度")
          }
          if (
            response.result === 1 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.url &&
            !response.data.url instanceof Object
          ) {
            // 操作员直接跳进主商城
            window.location.href = response.data.url;
          }
          else {
            return response;
          }
        })
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          if (message) {
            loading.close();
          }
          window.location.href = Fun.getSiteRootAdmin() + "#/500";
          console.error(err);
          reject({ status: -1 });
        });
    });
  },
  // POST请求  FormData 表单数据

  post(url, formData, message) {
    if (message) {
      loading = Loading.service({
        lock: true,
        text: message,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    }
    return new Promise(function(resolve, reject) {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include"
      })
        .then(response => {
          if (response.ok) {
            if (message) {
              loading.close();
            }
            return response.json();
          } else {
            if (message) {
              loading.close();
            }
            reject({ status: response.status });
          }
        })
        .then(response => {
          if (
            response.result === 0 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.status === -5
          ) {
            //注册站点
            window.location.href = Fun.getSiteRootAdmin() + "#/website/register_website";
          } else if (
            response.result === 0 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.status === -4
          ) {
            //安装向导
            window.location.href = Fun.getSiteRootAdmin() + "#/install";
            // Message.error(response.msg);
          } else if (
            response.result === 0 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.status === -3
          ) {
            //无权限
            window.location.href = Fun.getSiteRootAdmin() + "#/manage/index";
            Message.error(response.msg);
          } else if (
            response.result === 0 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.status === -2
          ) {
            window.location.href = Fun.getSiteRootAdmin() + "#/login";
            Message.error(response.msg);
          } else if (
            response.result === 0 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.login_status === 1
          ) {
            window.location.href = Fun.getSiteRootAdmin() + "#/login";
            console.log("无权限，跳入登录入口");
          } else if (
            response.result === 1 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.status === -5
          ) {
            window.location.href = Fun.getSiteRootAdmin() + "#/login";
            Message.error(response.msg);
          } else if (
            response.result === 0 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.status == 'upgrade'
          ) {
            window.location.href = Fun.getSiteRootAdmin() + "#/website/system_upgrade";
            console.log("跳入系统升级页面");
          }
          if (
            response.result === 1 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.pwd_remind === 1
          ) {
            // 提示修改密码弹出框
            store.dispatch("IsOpenPwd", true);
            store.dispatch("tips_word", response.data.msg);
            console.log("提示修改密码弹出框")
          }
          if (
            response.result === 1 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.pwd_remind === 2
          ) {
            // 提示修改密码强度
            store.dispatch("IsOpenPwd", true);
            store.dispatch("tips_word", response.data.msg);
            console.log("提示修改密码强度")
          }
          if (
            response.result === 1 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.url &&
            !response.data.url instanceof Object
          ) {
            // 操作员直接跳进主商城
            window.location.href = response.data.url;
          }
          else {
            return response;
          }
        })
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          if (message) {
            loading.close();
          }
          window.location.href = Fun.getSiteRootAdmin() + "#/500";
          console.error(err);
          reject({ status: -1 });
        });
    });
  }
};
