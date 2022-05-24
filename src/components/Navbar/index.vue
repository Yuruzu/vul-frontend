<template>
  <div class="nav-head">
    <breadcrumb />
    <!-- <div class="right-menu"> -->
      <el-dropdown >
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided @click.native="changepasswdFormVisible = true">
            <span style="display: block">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 修改用户密码的Dialog 组件窗口-->
      <el-dialog title="修改密码" :visible.sync="changepasswdFormVisible">
        <el-form :model="userForm" status-icon :rules="rules" ref="userForm">
          <el-form-item label="原始密码" :label-width="formLabelWidth" prop="oldpasswd">
            <el-input v-model="userForm.oldpasswd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" :label-width="formLabelWidth" prop="newpasswd">
            <el-input v-model="userForm.newpasswd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkpasswd">
            <el-input v-model="userForm.checkpasswd" autocomplete="off"></el-input>
          </el-form-item>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="changepasswdFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('userForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  <!-- </div> -->
</template>

<script>
import Breadcrumb from "../Breadcrumb";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.userForm.checkpasswd !== '') {
          this.$refs.userForm.validateField('checkpassword');
        }
        callback();
      }
    };

    var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value !== this.userForm.newpasswd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    
    return {
      changepasswdFormVisible: false,
      userForm: {
        oldpasswd: '',
        newpasswd: '',
        checkpasswd: ''
      },
      formLabelWidth: '120px',
      rules: {
        oldpassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        newpassword: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        checkpassword: [
          { validator: validatePass3, trigger: 'blur' }
        ]
      }
    };
  },
  components: {
    Breadcrumb,
  },
  methods: {
    logout() {
      // 清空token 并 跳转到登录页
      // window.sessionStorage.clear();
      // this.$router.push("/login");
      this.$http.post("http://192.168.32.41:5000/auth/logout", {headers: {'Content-Type':'application/json'}}).then((res) => {
        console.log(res);
        if (res.data.status=='success') {
          // 这里前面不能加return
          this.$message.success("注销成功");
          window.sessionStorage.clear();
          
          this.$router.push("/login");

        } else {
          this.$message.error("注销失败");
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          var temp = JSON.stringify(this.userForm)
          console.log(temp)
          // const {data:res} = await this.$http.patch('Register', temp)
          this.$http.post("http://192.168.32.41:5000/account/changepasswd", temp, {headers: {'Content-Type':'application/json'}}).then((res) => {
            console.log(res);
            if (res.data.status=='success'){
              this.$message({
                message:'修改密码成功',
                type:'success'
              })
            }else{
              this.$message({
                message:res.data.remarks,
                type:'error'
              })
            }
            this.$data.changepasswdFormVisible = false;
          });
        } else {
          alert('error submit!!');
          return false;
        }
      });
    },
    
  },
};
</script>

<style lang='less' scoped>
.nav-head {
  height: 50px;
  // overflow: hidden;
  // position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}


.el-dropdown {
  padding-right: 30px;
  display:inline;
  float: right;
  margin-top: -50px;
  // display: flex;
  // justify-content: right;
}
.right-menu {
  line-height: 50px;
}
</style>
