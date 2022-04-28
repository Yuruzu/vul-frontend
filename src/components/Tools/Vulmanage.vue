<template>
  <div>
    <div class="search-input-box">
      <div>
        <el-select v-model="value" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="input-suffix">
        <el-input v-model="input" placeholder="请输入内容">
          <el-button
            slot="append"
            icon="el-icon-search"
            size="small"
          ></el-button>
        </el-input>
      </div>
    </div>
    <el-card>
      <el-table :data="vultableData" border>
        <el-table-column prop="name" label="漏洞名称">
        </el-table-column>
        <el-table-column prop="type" label="漏洞类型">
        </el-table-column>
        <el-table-column prop="profile" label="漏洞简介"> 
        </el-table-column>
        <el-table-column prop="instruction" label="使用说明"> 
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>


<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "漏洞名称",
        },
        {
          value: "选项2",
          label: "CVE",
        },
        {
          value: "选项3",
          label: "CNVD",
        },
        {
          value: "选项4",
          label: "CNNVD",
        },
      ],
      value: "选项1",
      vultableData: []
    };
  },
  methods: {},
};
</script>

<style lang='less' scoped>
.search-input-box {
  width: 480px;
  display: inline-block;
  border-radius: 4px;
  opacity: 1;
  margin: 20px;
}
.el-select {
  float: left;
  width: 100px;
  display: block;
}
.el-input {
  position: relative;
  font-size: 14px;
}
/deep/.el-input__inner {
  padding: 0 5px;
}

.input-suffix {
  margin-left: 100px;
  color: hsla(0, 0%, 100%, 0.7);
}
</style>
