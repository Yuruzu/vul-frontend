<template>
  <div class="main">
    <div class="banner">
      <h2>{{detail.vulname}}</h2>
      <div class="info">
        <span>工具编号：{{detail.toolid}}</span>
        <el-button type="primary" plain size="mini" @click="downloadTool">工具下载</el-button>
        <el-button type="primary" plain size="mini" @click="downloadToolManual">工具说明下载</el-button>
      </div>
    </div>
    <el-card>
      <div class="basic-info">
        <h3>基础信息</h3>
        <ul>
          <li>
            <i class="el-icon-user"></i>
            <span class="label-name">工具上传者：</span>
            <span class="input-icon">{{detail.uploaduser}}</span>
          </li>
          <li>
            <i class="el-icon-time"></i>
            <span class="label-name">工具上传时间：</span>
            <span class="input-icon">{{detail.uploadtime}}</span>
          </li>
          <li>
            <i class="el-icon-warning-outline"></i>
            <span class="label-name">针对的漏洞名称：</span>
            <span class="input-icon">{{detail.vulname}}</span>
          </li>
          <li>
            <i class="el-icon-aim"></i>
            <span class="label-name">漏洞类型：</span>
            <el-tag type="danger">{{detail.vultype}}</el-tag>
          </li>
          <li>
            <i class="el-icon-bell"></i>
            <span class="label-name">漏洞影响范围：</span>
            <span class="input-icon">{{detail.vuleffect}}</span>
          </li>
        </ul>
      </div>
      <div class="details-info">
        <h3>详细信息</h3>
        <div>
          <h4>漏洞简介</h4>
          <p>{{detail.vulintro}}</p>
        </div>
        <div>
          <h4>工具参数说明</h4>
          <p>{{detail.vulparas}}</p>
        </div>
        <div>
          <h4>工具使用说明</h4>
          <p>{{detail.vulinstructions}}</p>
        </div>
      </div>

    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {
        toolid: '',
        uploaduser: '',
        uploadtime: '',
        vulname: '',
        vultype: '',
        vulintro: '',
        vuleffect: '',
        vulparas: '',
        vulinstructions: '',
        toolmanual: '',
        toolmanualpath: '',
        toolpath: '',
      }

    }
  },
  created: {

  },
  methods: {
    downloadTool() {
      this.$http.get("http://192.168.32.169:8080/toolsmanage/download", {params: {
        'toolid': this.detail.toolid,
        'type': 'tool'
      }})
      .then((res) => {
        window.open("http://192.168.32.169:8080/toolsmanage/download?toolid=" + this.detail.toolid + "&type=tool") // 新窗口打开外链接
        // console.log(res.data)
        // var data  = new Blob( [ res.data ], {type: 'application/octet-stream'} )
        // var downloadUrl = window.URL.createObjectURL(data)

        // var anchor = document.createElement( 'a' )
        // anchor.href = downloadUrl
        // anchor.style.display = 'none'
        // // 这里的filename 带有后缀，能决定文件的类型
        // anchor.downolad =  'gz.zip'
        // anchor.click()
        // window.URL.revokeObjectURL( data )
      });     
    },
    downloadToolManual() {
      this.$http.get("http://192.168.32.169:8080/toolsmanage/download", {params: {
        'toolid': this.detail.toolid,
        'type': 'toolmanual'
      }})
      .then((res) => {
        window.open("http://192.168.32.169:8080/toolsmanage/download?toolid=" + this.detail.toolid + "&type=toolmanual") // 新窗口打开外链接
      }); 
    }
  },
  created() {
  },
  mounted() {
    this.detail.toolid = this.$route.params.id;
    this.$http.get("http://192.168.32.169:8080/toolsmanage/get", {params: {
        'toolid': this.detail.toolid
      }})
      .then((res) => {
        if (res.data.status == 'success') {
          this.detail.uploaduser = res.data.data[0].uploaduser;
          this.detail.uploadtime = res.data.data[0].uploadtime;
          this.detail.vulname = res.data.data[0].vulname;
          this.detail.vultype = res.data.data[0].vultype;
          this.detail.vulintro = res.data.data[0].vulintro;
          this.detail.vuleffect = res.data.data[0].vuleffect;
          this.detail.vulparas = res.data.data[0].vulparas;
          this.detail.vulinstructions = res.data.data[0].vulinstructions;
          this.detail.toolmanual = res.data.data[0].toolmanual;
        }
      });
  }
}
</script>

<style lang='less' scoped>
.main {
  height: 80%;
}
.banner {
  text-align: center;
}
.info {
  display: inline-block;
  font-size: 14px;
}
.el-card {
  margin: 20px;
  height: 560px;
  overflow: auto;
}

div {
  display: block;

}
.basic-info
.details-info{
  width: 400px;
}

.details-info{
  float: left;
}

// h3 {
//   padding-right: 10px;
//   margin: 0;
//   line-height: 30px;
//   font-size: 18px;
//   font-weight: 600;
// }
h4, p {
  margin: 5px 30px 15px 30px;
}

.el-button {
  margin-left: 15px;
}

ul {
  padding-right: 150px;
  list-style: none
}

// .right-ul {
//   float: left;
//   list-style: none
// }

li {
  line-height: 35px;
  padding-bottom: 2px;
}
</style>
