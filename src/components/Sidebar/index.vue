<template>
  <!-- 侧边栏 -->
  <el-aside el-aside :width="isCollapse ? '64px' : '200px'">
    <div class="toggle-button" @click="toggleCollapse">|||</div>
    <el-menu
      background-color="#314561"
      text-color="#fff"
      active-text-color="#409eff"
      unique-opened
      :collapse="isCollapse"
      :collapse-transition="false"
      router
      :default-active="this.$route.path"
    >
      <!-- 一级菜单 -->
      <!-- index要用字符串格式，item.id是数值型，要转换，:是动态绑定 -->
      <el-submenu index="1">
        <!-- 一级菜单模板区域 -->
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-odometer"></i>
          <!-- 文本 -->
          <span>扫描任务</span>
        </template>
        <!-- 二级菜单 -->
        <!-- router开启路由模式，index当作跳转地址 -->
        <el-menu-item index="/scan/scanports">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-menu"></i>
            <!-- 文本 -->
            <span>端口扫描</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/scan/scanfiles">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-menu"></i>
            <!-- 文本 -->
            <span>敏感路径</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/scan/cscan">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-menu"></i>
            <!-- 文本 -->
            <span>C段扫描</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-key"></i>
          <span>漏洞利用</span>
        </template>
        <el-menu-item index="/tools/toolsmanage">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-menu"></i>
            <!-- 文本 -->
            <span>漏洞工具</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/tools/authoritymanage">
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-menu"></i>
            <!-- 文本 -->
            <span>权限分配</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/logs/logsmanage">
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-menu"></i>
          <!-- 文本 -->
          <span>日志管理</span>
        </template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      iconObj: {
        125: "el-icon-user-solid",
        103: "el-icon-lock",
        101: "el-icon-s-goods",
        102: "el-icon-s-order",
        145: "el-icon-s-data",
      },
      isCollapse: false,
    };
  },
  created() {
    // this.getMenuList();
  },
  methods: {
    getMenuList() {
      // 获取所有的菜单名称
      this.$http.get("menus").then((res) => {
        console.log(res);
        if (res.data.meta.status == 200) {
          this.menulist = res.data.data;
          console.log("2222");
          console.log(this.menulist);
        } else {
          return this.$message.error(res.data.meta.msg);
        }
      });
    },
    toggleCollapse() {
      // 点击按钮，切换菜单的折叠与展开
      this.isCollapse = !this.isCollapse;
    },
  },
  computed: {},
};
</script>

<style lang='less' scoped>
.el-aside {
  background-color: #314561;
  .el-menu {
    border-right: 0; // 菜单右侧边框线
  }
}

.toggle-button {
  padding-top: 5px;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em; // 三个竖线之间的间距
  cursor: pointer; // 鼠标放上去变成小手的形状
}
</style>
