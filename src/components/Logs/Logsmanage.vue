<template>
  <div>
    <el-card>
      <!-- 添加与搜索框 -->
      <el-row :gutter="20">
        <el-col :span="9">
          <el-form :inline="true" :model="logsQueryInfo" class="demo-form-inline">
            <el-form-item>
              <el-col :span="8">
                <el-date-picker type="date" placeholder="开始时间" v-model="logsQueryInfo.starttime" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="8">
                <el-date-picker type="date" placeholder="结束时间" v-model="logsQueryInfo.stoptime" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" @click="logsSearch()">查询</el-button>
              </el-col>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!-- 端口扫描结果表格 -->
      <el-table :data="logsData" border>
        <el-table-column prop="logid" label="logid">
        </el-table-column>
        <el-table-column prop="userid" label="userid">
        </el-table-column>
        <el-table-column prop="optime" label="操作时间" :formatter="formatTimeDate"> </el-table-column>
        <el-table-column prop="operate" label="操作"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
        logsData: [{
          "logid": "log.logid",
          "userid": "log.username",
          "optime": "log.optime",
          "operate": "log.operate"
      },
      ],
      logsQueryInfo: {
        starttime: '2022-04-30T16:00:00.000Z',
        stoptime: '2022-05-17T16:00:00.000Z',
      },

    }
  },

  methods: {
    formatting(time){
      var time = new Date(time);
      var y = time.getFullYear();
      var m = time.getMonth()+1;
      var d = time.getDate();
      return y+'-'+this.repair0(m)+'-'+this.repair0(d);
    },
    repair0(m){
      return m<10?'0'+m:m 
    },

    async logsSearch() {
      var new_logsQueryInfo = {starttime: this.formatting(this.logsQueryInfo.starttime), stoptime: this.formatting(this.logsQueryInfo.stoptime)}
      var temp = JSON.stringify(new_logsQueryInfo)
      console.log(temp)
      this.$http.post("http://192.168.32.41:5000/logmanageroute/selectbytime", temp, {headers: {'Content-Type':'application/json'}}).then((res) => {
        console.log(res);
        if (res.data.status=='success'){
          this.$message({
            message:'搜索成功',
            type:'success'
          })
          this.logsData = res.data.data
        }else{
          this.$message({
            message:res.data.remarks,
            type:'error'
          })
        }
      });
    },
    async getLogsData() {
      this.$http.post("http://192.168.32.41:5000/logmanageroute/selectbyuser", {headers: {'Content-Type':'application/json'}}).then((res) => {
      console.log(res);
      if (res.data.status=='success'){
        this.$message({
          message:'数据加载成功',
          type:'success'
        })
        this.logsData = res.data.data
        
      }else{
        this.$message({
          message:res.data.remarks,
          type:'error'
        })
      }
      
    });

    }

  },
  created() {
    this.getLogsData();

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
