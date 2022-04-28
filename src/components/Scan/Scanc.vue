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
      <el-table :data="scanfilesData.slice((currentPage-1)*pageSize,currentPage*pageSize) " border stripe>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <ul>
                <li  v-for="(item, index) in props.row.c_info" :key="index">{{item}}</li>
              </ul>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="host" label="域名"></el-table-column>
        <el-table-column prop="scan_time" label="完成时间" :formatter="formatTimeDate"> </el-table-column>
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
      title="新建敏感路径扫描"
      :visible.sync="portdialogVisible"
      width="40%"
      :before-close="handleClose">
      <el-form ref="fileform" :model="fileform" >
        <el-form-item label="">
          <el-input v-model="fileform.host" placeholder="请输入域名"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="portdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="scanFiles" plain>开始扫描</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scanfilesData: [
      ],
      portdialogVisible: false,
      fileform: {
        host: '',
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
      totalScans: '',
      currentPage: 1, // 当前页数
      pageSize: 8
    };
  },
  methods: {
    seachScans() {
      this.$http.post("http://192.168.32.126:8080/collectmessage/cscanhistory", this.queryInfo)
      .then((res) => {
        console.log(res)
        this.scanfilesData = res.data.data.reverse();
        this.totalScans = res.data.data.length;
        // if (res.data.success) {
        //   // 隐藏对话框
        //   this.portdialogVisible = false
        //   // 重新查询所有用户信息
        // }
      });

    },
    scanFiles() {
      console.log(this.fileform);
      this.portdialogVisible = false
      this.$http.post("http://192.168.32.126:8080/collectmessage/cscan", this.fileform)
      .then((res) => {
        console.log(res)
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
          this.$http.post("http://192.168.32.126:8080/collectmessage/cscandelete", this.deleteScanData)
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
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChangeD(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    formatTimeDate (row, column, cellValue, index) {
      const daterc = row.scan_time
      let date = new Date(row.scan_time)
      let dateArr = row.scan_time.split(' ');
      let Str=date.getFullYear() + '-' +
      (date.getMonth() + 1) + '-' + 
      date.getDate() + ' ' +
      dateArr[4]  
      return Str
    }
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
  width: 100%;
  text-align: center;
}
</style>