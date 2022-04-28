<template>
  <div>
    <el-card>
      <!-- 添加与搜索框 -->
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input placeholder="请输入待查询工具名称" v-model="queryInfo" clearable @clear="searchTool">
            <el-button slot="append" icon="el-icon-search" @click="searchTool"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2" style="float: right">
          <el-button type="primary" plain  @click="uploadTools">上传</el-button>
        </el-col>
      </el-row>
      <!-- 端口扫描结果表格 -->
      <el-row :gutter="20" class="row-box">
        <el-col :span="6" v-for="tools in toolsList" :key="tools.toolid" >
          <el-card class="el-card">
            <div class="card-heading" @click="showDetails(tools.toolid)">
              <span><img src="https://android-artworks.25pp.com/fs08/2021/08/10/11/110_771cb42bcbfdb1b7b5e9200e6a3fc4bc_con_130x130.png" class="image"></span>
              <span class="card-title">{{tools.vulname}}</span>
            </div>
            <div class="card-body">
              {{tools.vulintro.length > 16? tools.vulintro.substr(0, 16) + '...': tools.vulintro }}
              <el-button type="text" icon="el-icon-delete" circle size="medium " @click="deleteTool(tools.toolid)"></el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <el-dialog
      title="上传工具"
      :visible.sync="toolsdialogVisible"
      width="60%"
      :before-close="handleClose"
      size="mini">

      <el-form ref="uploadToolForm" :model="uploadToolForm" label-width="100px">
        <el-form-item label="针对漏洞名称">
          <el-input v-model="uploadToolForm.vulname"></el-input>
        </el-form-item>
        <el-form-item label="漏洞类型">
          <el-input v-model="uploadToolForm.vultype"></el-input>
        </el-form-item>
        <el-form-item label="漏洞简介">
          <el-input v-model="uploadToolForm.vulintro"></el-input>
        </el-form-item>
        <el-form-item label="影响范围">
          <el-input v-model="uploadToolForm.vuleffect"></el-input>
        </el-form-item>
        <el-form-item label="参数说明">
          <el-input v-model="uploadToolForm.vulparas"></el-input>
        </el-form-item>
        <el-form-item label="使用说明">
          <el-input v-model="uploadToolForm.vulinstructions"></el-input>
        </el-form-item>
        <el-form-item label="上传工具:" prop="toolfile">
          <el-upload
          class="upload-demo"
          action
          accept=".zip"
          ref="toolUpload"
          :http-request="httptoolRequest"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="1"
          :on-exceed="handleExceed">
          <el-button size="small" type="primary">上传工具</el-button>
          <div slot="tip" class="el-upload__tip">只能上传zip文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传使用说明:" prop="toolmanualfile">
          <el-upload
            class="upload-demo"
            action
            accept=".doc, .docx"
            :http-request="httptoolmanualRequest"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed">
            <el-button size="small" type="primary">上传使用手册</el-button>
            <div slot="tip" class="el-upload__tip">只能上传doc/docx文件</div>
          </el-upload>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="toolsdialogVisible = false" plain>取 消</el-button>
        <el-button type="primary" @click="submitForm('uploadToolForm')" plain>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toolsdialogVisible: false, 
      toolsList: [],
      uploadToolForm: {},
      toolfileList: [],
      toolmanualfileList: [],
      queryInfo: ''
    };
  },
  methods: {
    getTools() {
      this.$http.get("http://192.168.32.169:8080/toolsmanage/")
      .then((res) => {
        console.log(res)
        if (res.data.status == 'success') {
          this.toolsList = res.data.data
        }
      });
    },
    searchTool() {
      this.$http.get("http://192.168.32.169:8080/toolsmanage/search", {params: {
        'vulname': this.queryInfo
        }})
      .then((res) => {
        console.log(res)
        if (res.data.status == 'success') {
          this.toolsList = res.data.data
        }
      });

    },
    uploadTools() {
      this.toolsdialogVisible = true;
    },
    deleteTool(toolid) {
      // 弹框询问确认删除数据
      this.$confirm("此操作将永久删除工具, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
        this.$http.get("http://192.168.32.169:8080/toolsmanage/deletetool", {params: {
        'toolid': toolid
        }})
        .then((res) => {
              if (res.data.status == 'success') {
                this.getTools();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 覆盖默认的上传行为，可以自定义上传的实现，将上传的文件依次添加到fileList数组中,支持多个文件
    httptoolRequest(option) {
      this.toolfileList.push(option)
    },
    httptoolmanualRequest(option) {
      this.toolmanualfileList.push(option)
    },
    submitForm(formName) {
      const params = new FormData()
      console.log(this.toolfileList)
      // 将上传文件数组依次添加到参数paramsData中
      params.append('toolfile', this.toolfileList[0].file)
      params.append('toolmanualfile', this.toolmanualfileList[0].file)

      // 将输入表单数据添加到params表单中
      params.append('vulname', this.uploadToolForm.vulname)
      params.append('vultype', this.uploadToolForm.vultype)
      params.append('vulintro', this.uploadToolForm.vulintro)
      params.append('vuleffect', this.uploadToolForm.vuleffect)
      params.append('vulparas', this.uploadToolForm.vulparas)
      params.append('vulinstructions', this.uploadToolForm.vulinstructions)
      //显示值
      for (var value of params.values()) {
        console.log(value);
      }
      this.$http.post("http://192.168.32.169:8080/toolsmanage/upload", params)
      .then((res) => {
        if (res.data.status == 'success') {
          this.getTools();
        }
      });
      this.toolsdialogVisible = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    showDetails(toolid) {
      this.$router.push({ path: `/tools/toolsdetails/${toolid}` });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed() {
      this.$message.error('一次只能上传一个文件');
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  },
  created() {
    this.getTools();
  }
};
</script>

<style lang='less' scoped>
.el-card {
  margin: 20px;
}

.row-box {
  display: flex;
  flex-flow: wrap;
}
.row-box .el-card {
  min-width: 100%;
  height: 70%;
  margin-right: 20px;
  // border: 0px;
  // box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.card-heading {
  overflow: hidden;
  margin-bottom: 7px;
  display: block;
  cursor: pointer;
  padding: 10px 18px 0;
  color: #333;
}

.image {
  width: 32px;
  height: 32px;
  border-radius: 32px;
  float: left;
  display: block;
}
.card-title {
  display: block;
  padding-left: 40px;
  margin-top: 6px;
  font-weight: 700;
  font-size: 15px;
  color: inherit;
}

.card-body {
  color: #666666;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 2px;
  padding: 0 18px;
}
</style>
