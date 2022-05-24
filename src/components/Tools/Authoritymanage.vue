<template>
  <div>
    <el-card>
      <!-- 添加与搜索框 -->
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input placeholder="请输入内容" v-model="userQueryInfo.userid">
            <el-button slot="append" icon="el-icon-search" @click="userSearch()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click.native="addaccountFormVisible = true">添加账号</el-button>
        </el-col>
      </el-row>
      <!-- 用户管理表格：所有用户id，用户名，用户注册时间，用户权限，用户上次登录时间，状态，所属单位 -->
      <el-table :data="userData" border>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="username" label="用户名称"></el-table-column>
        <el-table-column prop="createtime" label="创建时间"> </el-table-column>
        <el-table-column prop="authority" label="用户权限"> </el-table-column>
        <el-table-column prop="lastlogintime" label="最后一次登录时间" :formatter="formatTimeDate"> </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
        <el-table-column prop="organizer" label="所属单位"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope"><!-- slot-scope="scope" -->
            <!-- <el-button @click="handleClick()" type="text" size="small">禁用</el-button> -->
            <el-button @click.native="getUserId(scope)" type="text" size="small">工具权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- -->
    <el-dialog title="工具权限" :visible.sync="toolsFormVisible" width="75%">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input placeholder="请输入针对的漏洞名称" v-model="toolsQueryInfo.vulname">
            <el-button slot="append" icon="el-icon-search" @click="toolsSearch()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click.native="toolAuthority()">批量授权</el-button>
        </el-col>
      </el-row>
      <el-table ref="multipleTable" :data="toolsData" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" :selectable="checkSelect"></el-table-column>
        <el-table-column prop="id" label="工具id"></el-table-column>
        <el-table-column prop="uploaduser" label="工具上传者"></el-table-column>
        <el-table-column prop="uploadtime" label="工具上传时间" :formatter="formatTimeDate"> </el-table-column>
        <el-table-column prop="vulname" label="针对的漏洞名称"> </el-table-column>
        <el-table-column prop="vultype" label="漏洞类型"> </el-table-column>
        <el-table-column prop="vulintro" label="漏洞简介"> </el-table-column>
        <el-table-column prop="vuleffect" label="漏洞影响范围"> </el-table-column>
        <el-table-column prop="toolstatus" label="工具权限"> </el-table-column>
        <!-- <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="toolAuthority(scope)" type="primary" size="small" :disabled="scope.row.toolstatus ==1?true:false">授权</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toolsFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toolsFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加账号的Dialog 组件窗口-->
    <el-dialog title="添加账号" :visible.sync="addaccountFormVisible">
      <el-form :model="addaccountForm" status-icon :rules="addaccountRules" ref="addaccountForm">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="addaccountForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="addaccountForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="真名" :label-width="formLabelWidth" prop="fullname">
          <el-input v-model="addaccountForm.fullname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="addaccountForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="telphone">
          <el-input v-model="addaccountForm.telphone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="组织" :label-width="formLabelWidth" prop="organizer">
          <el-input v-model="addaccountForm.organizer" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户权限" :label-width="formLabelWidth" prop="userauthority">
          <el-select v-model="addaccountForm.userauthority" autocomplete="off">
            <el-option label="普通用户" value="0"></el-option>
            <el-option label="管理员" value="1"></el-option>
          </el-select>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addaccountFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addaccountSubmitForm('addaccountForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // methods: {
  //   handleClick() {
  //     console.log();
  //   }
  // },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('输入不能为空'));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    }
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }

    return {
      targetUserId: '',
      toolsQueryInfo: {
        vulname: 'a'
      },
      userQueryInfo: {
        userid: 'admin12',
        pagenum: 1,
        pagesize: 2
      },
      userData: [{
            "authority": "1",
            "createip": null,
            "createtime": null,
            "email": null,
            "fullname": null,
            "id": "admin12",
            "lastip": null,
            "lastlogintime": "Tue, 26 Apr 2022 13:30:25 GMT",
            "organizer": null,
            "status": true,
            "telphone": null,
            "username": "admin12"
        },
      ],
      toolsFormVisible: false,
      addaccountFormVisible: false,
      addaccountForm : {
        username: 'tom',
        password: '123345',
        fullname: '张伟',
        email: '12435@qq.com',
        telphone: '13050009983',
        organizer: '漏洞组',
        userauthority: '0'
      },
      addaccountRules: {
        username: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        fullname: [
          { validator: validatePass, trigger: 'blur' }
        ],
        organizer: [
          { validator: validatePass, trigger: 'blur' }
        ],
        userauthority: [
          { validator: validatePass, trigger: 'blur' }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        telphone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      },
      toolsData: [{
        id: '12435',
        uploaduser: 'tom',
        uploadtime: '2022-02-02',
        vulname: 'nmap',
        vultype: 'xxx',
        vulintro: 'introduce',
        vuleffect: 'xxx1',
        toolstatus: 1
      },
      ],
      formLabelWidth: '120px',
      multipleSelection: [],

    }
  },

  methods: {
    addaccountSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var temp = JSON.stringify(this.addaccountForm)
          console.log(temp)
          // const {data:res} = await this.$http.patch('Register', temp)
          this.$http.post("http://192.168.32.41:5000/account/addaccount", temp, {headers: {'Content-Type':'application/json'}}).then((res) => {
            console.log(res);
            if (res.data.status=='success'){
              this.$message({
                message:'创建账号成功',
                type:'success'
              })
              this.userData = res.data.data;
              this.$data.addaccountFormVisible = false;
            }else{
              this.$message({
                message:res.data.remarks,
                type:'error'
              })
            }
            
          });
        } else {
          alert('error submit!!');
          return false;
        }
      });
    },

    async userSearch() {
      var temp = JSON.stringify(this.userQueryInfo)
      console.log(temp)
      this.$http.post("http://192.168.32.41:5000/account/selectaccount", temp, {headers: {'Content-Type':'application/json'}}).then((res) => {
        console.log(res);
        if (res.data.status=='success'){
          this.$message({
            message:'搜索成功',
            type:'success'
          })
          this.userData = [res.data.data]
        }else{
          this.$message({
            message:res.data.remarks,
            type:'error'
          })
        }
      });
    },

    async toolsSearch() {
      var temp = JSON.stringify({"vulname": this.toolsQueryInfo.vulname, "userid": this.targetUserId})
      console.log(temp)
      this.$http.post("http://192.168.32.41:5000/toolsmanage/search", temp, {headers: {'Content-Type':'application/json'}}).then((res) => {
        console.log(res);
        if (res.data.status=='success'){
          this.$message({
            message:'搜索成功',
            type:'success'
          })
          this.toolsData = res.data.data
        }else{
          this.$message({
            message:res.data.remarks,
            type:'error'
          })
        }
      });
    },

    async getUserData() {
      this.$http.post("http://192.168.32.41:5000/account/index", {headers: {'Content-Type':'application/json'}}).then((res) => {
        console.log(res);
        if (res.data.status=='success'){
          this.$message({
            message:'加载用户数据成功',
            type:'success'
          })
          this.userData = res.data.data
        }else{
          this.$message({
            message:res.data.remarks,
            type:'error'
          })
        }
      });
    },

    async getToolsData() {
      var temp = JSON.stringify({'userid': this.targetUserId})
      console.log(temp)
      this.$http.post("http://192.168.32.41:5000/toolsmanage/usertool", temp, {headers: {'Content-Type':'application/json'}}).then((res) => {
        console.log(res);
        if (res.data.status=='success'){
          this.$message({
            message:'加载用户工具数据成功',
            type:'success'
          })
          this.toolsData = res.data.data
        }else{
          this.$message({
            message:res.data.remarks,
            type:'error'
          })
        }
      });

    },

    getUserId(scope) {
      console.log(scope.row.id);
      this.targetUserId = scope.row.id;
      this.$data.toolsFormVisible = true;
      this.getToolsData();
    },

    // toolAuthority(scope) {
    //   console.log(scope.row.toolid);
    //   var temp = JSON.stringify({userid: this.targetUserId, toolid: scope.row.toolid})
    //   console.log(temp)
    //   this.$http.post("http://192.168.32.41:5000/authoritymanageroute/tool_add", temp, {headers: {'Content-Type':'application/json'}}).then((res) => {
    //     console.log(res);
    //     if (res.data.status=='success'){
    //       this.$message({
    //         message:'工具授权成功',
    //         type:'success'
    //       })
    //       this.toolsData[scope.index].authority = 1
          
    //     }else{
    //       this.$message({
    //         message:res.data.remarks,
    //         type:'error'
    //       })
    //     }
    //   });
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },

    toolAuthority() {
      if(this.multipleSelection.length == 0) {
        this.$message({
          message: "请选择工具！",
          type:'error'
        })
      } else {
        var toolid_list = []
        this.multipleSelection.forEach(function (value) {
          toolid_list.push(value.id)
        })
        console.log(toolid_list)
        var temp = JSON.stringify({userid: this.targetUserId, toolid: toolid_list})
        console.log(temp)
        this.$http.post("http://192.168.32.41:5000/authoritymanageroute/tool_add", temp, {headers: {'Content-Type':'application/json'}}).then((res) => {
          console.log(res);
          if (res.data.status=='success'){
            this.$message({
              message:'工具授权成功',
              type:'success'
            })
            this.multipleSelection.forEach(function (value) {
              value.toolstatus = 1
            })
            
          }else{
            this.$message({
              message:res.data.remarks,
              type:'error'
            })
          }
        });
      }
    },
    checkSelect(row) {
      let isCheck = true;
      if (row.toolstatus == 0) {
        isCheck = true;
      } else {
        isCheck = false;
      }
      return isCheck;
    },

  },
  computed: {

  },
  created() {
    this.getUserData();
  }
}
</script>

<style lang='less' scoped>
  .el-card {
    margin: 20px;
    width: 95%;
    // margin-left: 20px;
  }
  .el-table {
    width: 100%;
    margin-top: 20px;
  }
</style>
