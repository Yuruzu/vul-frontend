<template>
  <div class="main">
    <div class="header">
      <div class="header-center fl">
        <div class="header-title">登录界面</div>
        <div class="header-img"></div>
      </div>
      <div class="header-bottom fl"></div>
    </div>
    <div class="content">
      <div class="content-left">
        <!-- <img src="images/d.png" alt=""> -->
      </div>
      <div class="content-right">
        <!-- 登录表单区域 -->
        <el-form
          class="right-infp"
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginFormRules"
        >
          <!-- 用户名区域 -->
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              prefix-icon="el-icon-user"
              size="medium"
            ></el-input>
          </el-form-item>
          <!-- 密码区域 -->
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              prefix-icon="el-icon-lock"
              size="medium"
              type="password"
            ></el-input>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="login" plain>登录</el-button>
            <el-button type="info" @click="resetLoginForm" plain
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 表单的验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 点击重置按钮，对表单数据进行重置
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    // 对表单进行预验证
    login() {
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) return;
        window.sessionStorage.setItem("token", 'xxxxxxx');
        this.$router.push("/home");
        // this.$http.post("login", this.loginForm).then((res) => {
        //   window.sessionStorage.setItem("token", 'xxxxxxx');
        //   this.$router.push("/home");
        //   if (res.data.meta.status == 200) {
        //     // 这里前面不能加return
        //     this.$message.success("登录成功");
        //     console.log(res);
        //     // 1 将登录成功之后的token保存到客户端的sessionStorage中
        //     //     项目中除了登录之外的其他API接口时必须在登录之后才能访问的
        //     //     token只应当在当前网站打开期间生效，所以将其保存在sessionStorage中
        //     window.sessionStorage.setItem("token", res.data.data.token);
        //     // 2 通过编程式导航跳转到后台主页，路由地址是 /home
        //     this.$router.push("/home");

        //   } else {
        //     return this.$message.error("登录失败");
        //   }
        // });
      });
    },
  },
  created() {

  }
};
</script>

<style lang='less' scoped>
.main {
  margin: 0 auto;
  width: 99%;
  height: 99%;
  position: relative;
  background: url("../assets/images/bj.jpg") no-repeat;
  background-size: cover;
  font-size: 0.16rem;
}

/*头部*/
.header {
  width: 100%;
  height: 100px;
  padding-top: 20px;
}

.header .header-center {
  width: 50%;
  height: 10px;
  position: relative;
  margin: 0 auto;
}
.header .header-center .header-title {
  text-align: center;
  color: #ffffff;
  font-size: 30px;
  text-shadow: 0 0 0.3rem #00d8ff;
}
.header .header-img {
  background: url("../assets/images/head.gif") no-repeat center center;
  background-size: 100%;
  height: 60px;
  width: 100%;
  position: absolute;
  padding-top: 15px;
}

.content {
  width: 65%;
  height: 500px;
  padding-top: 100px;
  // background: green;
  margin: 1rem auto 0 auto;
  /*border: 1px solid green;*/
}
.content .content-left {
  width: 500px;
  height: 500px;
  /*border: 1px solid red;*/
  background: url("../assets/images/d.png") no-repeat;
  background-size: 100% 100%;
  margin-left: 10px;
  box-sizing: border-box;
  margin-right: 2%;
  float: left;
  position: relative;
}
@-webkit-keyframes rotation {
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
}

.content .content-left {
  // -webkit-transform: rotate(360deg);
  animation: rotation 15s linear infinite;
  -moz-animation: rotation 15s linear infinite;
  -webkit-animation: rotation 15s linear infinite;
  -o-animation: rotation 15s linear infinite;
}

.content .content-right {
  width: 450px;
  height: 450px;
  margin-right: 20px;
  background: url("../assets/images/e.png") no-repeat;
  background-size: 100% 100%;
  float: right;
  position: relative;
}
.right-infp {
  width: 400px;
  height: 300px;
  margin: auto auto;
  // border: 1px solid red;
  vertical-align: center;
  // position: absolute;
  margin-top: 140px;
}

.el-form-item {
  // background: url("../assets/images/b.png") no-repeat;
  width: 90%;
  height: 30px;
  margin: auto auto;
  padding-top: 35px;
}

.btns {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
}
</style>

