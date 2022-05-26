<template>
  <div>
    <el-card>
      <!-- 添加与搜索框 -->
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input placeholder="请输入内容"  v-model="queryInfo.host" clearable @clear="seachScans">
            <el-button slot="append" icon="el-icon-search" @click="seachScans"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2" style="float: right">
          <el-button type="primary" plain @click="portdialogVisible = true">新建扫描</el-button>
        </el-col>
      </el-row>
      <!-- 端口扫描结果表格 -->
      <el-table :data="scanportsData.slice((currentPage-1)*pageSize,currentPage*pageSize) " border stripe>
        <el-table-column prop="host" label="域名"></el-table-column>
        <el-table-column prop="port" label="端口"></el-table-column>
        <el-table-column prop="state" label="端口状态">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state === 'closed' ? 'danger' : scope.row.state ==='filtered'?'info':'success'"
              disable-transitions>{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="service_name" label="端口开放服务"> </el-table-column>
        <el-table-column prop="scan_time" label="完成时间" :formatter="formatTimeDate"> </el-table-column> 
        <!-- :formatter="formatTimeDate" -->
        <el-table-column prop="delete" label="删除">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="deleteScan(scope.$index, scope.row)"
              plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        align="center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChangeD"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="totalScans">
      </el-pagination>
    </el-card>
    <el-dialog
      title="新建端口扫描"
      :visible.sync="portdialogVisible"
      width="40%"
      :before-close="handleClose">
      <el-form ref="portform" :model="portform" >
        <el-form-item label="">
          <el-input v-model="portform.host" placeholder="请输入IP或域名"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="portform.port" placeholder="请输入端口号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="portdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="scanPorts" plain>开始扫描</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scanportsData: [
      ],
      portdialogVisible: false,
      portform: {
        host: '',
        port: '',
        userid: 'admin'
      },
      queryInfo: {
        host: '',
        userid: 'admin'
      },
      deleteScanData: {
        id: '',
        userid: 'admin'
      },
      totalScans: 0,
      currentPage: 1, // 当前页数
      pageSize: 8,
    };
  },
  methods: {
    seachScans() {
      this.$http.post("http://192.168.32.126:8080/collectmessage/scanportshistory", this.queryInfo)
      .then((res) => {
        this.scanportsData = res.data.data.reverse();
        this.totalScans = res.data.data.length;
        // if (res.data.success) {
        //   // 隐藏对话框
        //   this.portdialogVisible = false
        //   // 重新查询所有用户信息
        // }
      });

    },
    scanPorts() {
      console.log(this.portform);
      this.portdialogVisible = false
      this.$http.post("http://192.168.32.126:8080/collectmessage/scanports", this.portform)
      .then((res) => {
        if (res.data.status == 'success') {
          // 隐藏对话框
          this.portdialogVisible = false
          // 重新查询所有用户信息
          this.seachScans();
        }
      });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    deleteScan(index, row) {
      // 弹框询问确认删除数据
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteScanData.id = row.id
          this.$http.post("http://192.168.32.126:8080/collectmessage/scanportsdelete", this.deleteScanData)
            .then((res) => {
              if (res.data.status == 'success') {
                this.seachScans();
                this.$message({
                  message: '删除扫描成功！',
                  type: 'success'
                });
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
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChangeD(val) {
      this.currentPage = val;
    },

  },
  created() {
    this.seachScans();
  },
};
</script>

<style lang='less' scoped>
.el-card {
  margin: 20px;
  width: 96%;
  // margin-left: 20px;
}
.el-table {
width: 100%;
margin-top: 20px;
}
.el-pagination {
  position: fixed;
  bottom: 0;
  height: 40px;
  width: 80%;
  text-align: center;
}
</style>
