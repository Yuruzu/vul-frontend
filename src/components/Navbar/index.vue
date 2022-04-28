<template>
  <div class="nav-head">
    <breadcrumb />
    <!-- <div class="right-menu"> -->
      <el-dropdown >
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  <!-- </div> -->
</template>

<script>
import Breadcrumb from "../Breadcrumb";

export default {
  data() {
    return {};
  },
  components: {
    Breadcrumb,
  },
  methods: {
    logout() {
      // 清空token 并 跳转到登录页
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang='less' scoped>
.nav-head {
  height: 50px;
  // overflow: hidden;
  // position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}


.el-dropdown {
  padding-right: 30px;
  display:inline;
  float: right;
  margin-top: -50px;
  // display: flex;
  // justify-content: right;
}
.right-menu {
  line-height: 50px;
}
</style>
