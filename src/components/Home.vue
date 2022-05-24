<template>
  <div class="home-container">
    <!-- 侧边栏 -->
    <sidebar class="sidbar-container" />
    <div class="main-container">
      <navbar />
      <!-- 路由占位符 -->
      <router-view></router-view>  
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
export default {
  components: {
    Sidebar,
    Navbar,
  },
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
    logout() {
      // 清空token 并 跳转到登录页
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // getMenuList() {
    //   // 获取所有的菜单名称
    //   this.$http.get("menus").then((res) => {
    //     console.log(res);
    //     if (res.data.meta.status == 200) {
    //       this.menulist = res.data.data;
    //       console.log(this.menulist);
    //     } else {
    //       return this.$message.error(res.data.meta.msg);
    //     }
    //   });
    // },
    toggleCollapse() {
      // 点击按钮，切换菜单的折叠与展开
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  display: flex;
}

.sidbar-container {
  height: 100%;
  background-color: #314561;
}

.main-container {
  width: 100%;
  height: 100%;
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
.el-main {
  background-color: #eaedf1;
}
</style>
