<template>
  <div>
    <el-card>
      <!-- 添加与搜索框 -->
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 端口扫描结果表格 -->
      <el-table :data="logsData" border>
        <el-table-column prop="id" label="id">
        </el-table-column>
        <el-table-column prop="name" label="被扫描端口">
        </el-table-column>
        <el-table-column prop="state" label="端口状态"> </el-table-column>
        <el-table-column prop="service" label="端口开放服务"> </el-table-column>
        <el-table-column prop="taskstate" label="任务状态"> </el-table-column>
        <el-table-column prop="delete" label="删除"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
        logsData: [{

      },
      ]

    }
  },

  methods: {

  },
  computed: {

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
