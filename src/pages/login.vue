<template>
  <div class="login">
    <div class="login-page">
      <el-form class="login-form" :model="login1">
        <el-form-item>
          <el-input
          :autofocus="true"
          placeholder="请输入密码"
          v-model="login1.phone">
          <template slot="prepend"><i class="el-icon-mobile-phone"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="login1.password" @keyup.enter.native="login">
            <template slot="prepend"><i class="el-icon-info"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" @click="login" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Hashes from 'jshashes'
  export default {
    components: {
      Hashes: Hashes
   },
    data () {
      return {
          manager:"manager",
        isBtnLoading: false,
        login1:{
            "phone":'',
            "password": ''
        }
      }
    },
    computed: {
      btnText () {
        if (this.isBtnLoading) return "登录中";
        return '登录';
      }
    },
    created () {

    },
    methods: {
        
      login () {
          var MD5 = new Hashes.MD5;
        // debugger;
        if (!this.login1.phone) {
          this.$message.error("请填写用户名");
          return;
        }
        if(!this.login1.password) {
          this.$message.error("请填写密码");
          return;
        }
        // let loginParams = {name:vm.username,password:vm.password};
        this.$api("login",{phone:this.login1.phone,password: MD5.hex(this.login1.password)}).then((res)=>{
            console.log(res)
            this.isBtnLoading = true;
            var message = res.data.message
          if(res.data.retCode==200) {
              if(res.data.data.type==2){
                  this.isBtnLoading =false;
                  this.$router.replace({ path : this.manager });
                  return
              }else{
                  this.$message.error("请输入正确的账号和密码");
              }
              
          }else {
              this.$message.error(message);
               this.isBtnLoading = false;
          }
        })
      }
    }
  }
</script>
<style long="less" scope>
  .login {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        background: url("~/static/images/index1.png") top center;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-header {
        background: #3e4d5c;
        padding: 20px;
    }
    .valiimg {
        text-align: right;
    }
    .valiimg img {
        width: 100%;
    }
    .login-form {
        width: 257px;
    }
    .login .title {
        position: absolute;
        top: 50%;
        margin-left: -128px;
        left: 50%;
        text-align: center;
        color: #abd0aa;
        font-size: 46px;
    }
    .login-form .input-body {
        line-height: 35px;
        margin: 20px 0;
    }
    .login-form .label-title {
        text-align: right;
        padding-right: 20px;
    }
    .login-form img {
        height: 35px;
    }
    .login-form .last-margin {
        margin-bottom: 0px !important;
    }
    .login-form .menus {
        text-align: center;
    }
    .loginBtn {
        width: 100%;
    }
    .login-form .lxwm {
        margin-top: 100px;
        text-align: center;
    }
    .login-form .lxwm button {
        font-size: 16px;
        color: #fff;
    }
    .forgetPass {
        text-align: right;
        font-size: 14px;
    }
    .wecloeme {
        text-align: right;
        color: #fff;
    }
    .forget-pass {
        position: relative;
        top: -10px;
        margin: 0px 0px 10px !important;
    }
    .login-form .border-bottom {
        margin-bottom: 20px;
    }
    .remenber {
        color: #ded8d8;
    }
    .title img {
        height: 60px;
        vertical-align: text-bottom;
        margin-right: 15px;
    }
    .el-form-item{
        margin-bottom: 20px;
    }
</style>
