<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="7">
        <el-card shadow="hover">
          <!-- 小标题 -->
          <el-divider content-position="center">
            <div class="topTitle">
              <p>漏洞工具</p>
            </div>
          </el-divider>
          <div id="echarts_box_tools" style="width: 400px;height:400px;"></div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card shadow="hover">
          <!-- 小标题 -->
          <el-divider content-position="center">
            <div class="topTitle">
              <p>用户情况</p>
            </div>
          </el-divider>
          <div id="echarts_box_user" style="width: 400px;height:400px;"></div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <!-- <el-card shadow="hover">
          <el-divider content-position="center">
            <div class="topTitle">
              <p>登录情况</p>
            </div>
          </el-divider>
          <el-table :data="loginData" border>
            <el-table-column prop="logid" label="日志id" align="center">
            </el-table-column>
            <el-table-column prop="operate" label="操作" align="center">
            </el-table-column>
            <el-table-column prop="optime" label="操作时间" align="center">
            </el-table-column>
            <el-table-column prop="userid" label="用户id" align="center">
            </el-table-column>
            <el-table-column prop="username" label="用户名" align="center">
            </el-table-column>
          </el-table>
        </el-card> -->
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="20" offset="2">
        <el-card shadow="hover">
          <el-divider content-position="center">
            <div class="topTitle">
              <p>登录情况</p>
            </div>
          </el-divider>
          <el-table :data="loginData" border>
            <el-table-column prop="logid" label="日志id" align="center">
            </el-table-column>
            <el-table-column prop="operate" label="操作" align="center">
            </el-table-column>
            <el-table-column prop="optime" label="操作时间" align="center">
            </el-table-column>
            <el-table-column prop="userid" label="用户id" align="center">
            </el-table-column>
            <el-table-column prop="username" label="用户名" align="center">
            </el-table-column>
          </el-table>
        </el-card>
        <!-- <el-card shadow="hover">
          <el-divider content-position="center">
            <div class="topTitle">
              <p>下载情况</p>
            </div>
          </el-divider>
          <el-table :data="toolData" border>
            <el-table-column prop="toolid" label="工具id" align="center">
            </el-table-column>
            <el-table-column prop="uploaduser" label="工具上传者" align="center">
            </el-table-column>
            <el-table-column prop="uploadtime" label="工具上传时间" align="center">
            </el-table-column>
            <el-table-column prop="vulname" label="针对的漏洞名称" align="center">
            </el-table-column>
            <el-table-column prop="vultype" label="最漏洞类型" align="center">
            </el-table-column>
            <el-table-column prop="vulinstructions" label="使用说明" align="center">
            </el-table-column>
            <el-table-column prop="toolpath" label="工具保存路径" align="center">
            </el-table-column>
            <el-table-column prop="download" label="下载数量" align="center">
            </el-table-column>
          </el-table>
        </el-card> -->
      </el-col>
    </el-row>

  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      loginData: [{
        logid: "32",
        operate: "登录",
        optime: "Fri, 13 May 2022 14:48:03 GMT",
        userid: "lisi165182499",
        username: "lisi"
      }, ],

      // toolData: [{
      //   toolid: '3254',
      //   uploaduser: 'Bob',
      //   uploadtime: '2022-03-03 14:23:03',
      //   vulname: 'CVE-2019-19642',
      //   vultype: '命令注入漏洞',
      //   vulinstructions: 'XXXXXXXXXXXXXXXXX',
      //   toolpath: '/sldjf/sdf/sdf',
      //   download: '1235'
      // }, 
      // {
      //   toolid: '3254',
      //   uploaduser: 'Bob',
      //   uploadtime: '2022-03-03 14:23:03',
      //   vulname: 'CVE-2019-19642',
      //   vultype: '命令注入漏洞',
      //   vulinstructions: 'XXXXXXXXXXXXXXXXX',
      //   toolpath: '/sldjf/sdf/sdf',
      //   download: '1235'
      // }

      // ],
      

    }
  },
  mounted() {
		  // 1. 基于准备好的dom，初始化echarts实例
		  var myChart_tools = echarts.init(document.getElementById('echarts_box_tools'))
      var myChart_user = echarts.init(document.getElementById('echarts_box_user'))
      // 2. 网络加载数据 
      this.$http.post("http://192.168.32.41:5000/homepageroute/homepage", {headers: {'Content-Type':'application/json'}}).then((res) => {
        console.log(res);
        if (res.data.status=='success'){
          this.$message({
            message:'数据加载成功',
            type:'success'
          })
          myChart_user.setOption(res.data.data[1]['usernumber'])
          myChart_tools.setOption(res.data.data[0]['toolnumber'])
          this.loginData = res.data.data[2]['loginfmation']
          
        }else{
          this.$message({
            message:res.data.remarks,
            type:'error'
          })
        }
        
      });

      // this.$http.post("http://192.168.32.41:5000/logmanageroute/selectbyuser", {headers: {'Content-Type':'application/json'}}).then((res) => {
      //   console.log(res);
      //   if (res.data.status=='success'){
      //     this.$message({
      //       message:'数据加载成功',
      //       type:'success'
      //     })
      //     this.loginData = res.data.data
          
      //   }else{
      //     this.$message({
      //       message:res.data.remarks,
      //       type:'error'
      //     })
      //   }
        
      // });
		  

		  // 3. 使用刚指定的配置项和数据，显示图表
		  // myChart.setOption({
      //   'title': {
      //     // text: 'Referer of a Website',
      //     // subtext: 'Fake Data',
      //     left: 'center'
      //   },
      //   tooltip: {
      //     trigger: 'item'
      //   },
      //   legend: {
      //     orient: 'vertical',
      //     'left': 'left'
      //   },
      //   series: [
      //     {
      //       name: '漏洞工具',
      //       type: 'pie',
      //       radius: '60%',
      //       data: [
      //         { value: 1048, name: 'Search Engine' },
      //         { value: 735, name: 'Direct' },
      //         { value: 580, name: 'Email' },
      //         { value: 484, name: 'Union Ads' },
      //         { value: 300, name: 'Video Ads' }
      //       ],
      //       emphasis: {
      //         itemStyle: {
      //           shadowBlur: 10,
      //           shadowOffsetX: 0,
      //           shadowColor: 'rgba(0, 0, 0, 0.5)'
      //         }
      //       }
      //     }
      //   ]
      // })

		  
		  // myChart.setOption( {
      //   tooltip: {
      //     trigger: 'item',
      //     formatter: '{a} <br/>{b} : {c}%'
      //   },
      //   legend: {
      //     data: ['User', 'Admin']
      //   },
      //   series: [
      //     {
      //       'name': '用户情况',
      //       type: 'funnel',
      //       left: '10%',
      //       top: 60,
      //       bottom: 60,
      //       width: '80%',
      //       min: 0,
      //       max: 100,
      //       minSize: '0%',
      //       maxSize: '100%',
      //       sort: 'ascending', // 金字塔形:'ascending',  漏斗图形:'descending'
      //       gap: 2,
      //       label: {
      //         show: true,
      //         position: 'inside'
      //       },
      //       labelLine: {
      //         length: 10,
      //         lineStyle: {
      //           width: 1,
      //           type: 'solid'
      //         }
      //       },
      //       itemStyle: {
      //         borderColor: '#fff',
      //         borderWidth: 1
      //       },
      //       emphasis: {
      //         label: {
      //           fontSize: 20
      //         }
      //       },
      //       data: [
      //         { 'value': 40, 'name': 'Admin' },
      //         { 'value': 100, 'name': 'User' }
      //       ]
      //     }
      //   ]
      // })





		},
  methods: {

  },
  computed: {

  }
}
</script>

<style lang='less' scoped>
  .topTitle {
    // background-image: linear-gradient(45deg, #006fe7, #0084c249);
    width: 100%;
    padding: 8px 15px;
    box-sizing: border-box;
    p {
      color: black;
      font-size: 20px;
      font-weight: bold;
    }
  }

</style>
