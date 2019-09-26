<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-header style="font-size: 12px">
        <h1>林三心博客后台管理</h1>
      </el-header>

      <el-container>
        <el-aside width="180px" style="background-color: rgb(238, 241, 246);overflow-x: hidden">
          <el-menu class="elm" router :default-openeds="['1', '3']">
            <el-menu-item index="/index">
              <i class="el-icon-s-home"></i>首页
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-box"></i>文章管理
              </template>
              <el-menu-item-group>
                <el-menu-item index="/index/all">
                  <i class="el-icon-notebook-1"></i>所有文章
                </el-menu-item>
                <el-menu-item index="/index/html">
                  <i class="el-icon-notebook-2"></i>HTML文章
                </el-menu-item>
                <el-menu-item index="/index/css">
                  <i class="el-icon-notebook-2"></i>CSS文章
                </el-menu-item>
                <el-menu-item index="/index/javascript">
                  <i class="el-icon-notebook-2"></i>JavaScript文章
                </el-menu-item>
                <el-menu-item index="/index/vue">
                  <i class="el-icon-notebook-2"></i>Vuejs文章
                </el-menu-item>
                <el-menu-item index="/index/nodejs">
                  <i class="el-icon-notebook-2"></i>Nodejs文章
                </el-menu-item>
                <el-menu-item index="/index/life">
                  <i class="el-icon-bicycle"></i>生活趣事
                </el-menu-item>
                <el-menu-item index="/index/book">
                  <i class="el-icon-reading"></i>书籍推荐
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-tools"></i>信息管理
              </template>
              <el-menu-item-group>
                <el-menu-item index="/index/user">
                  <i class="el-icon-user"></i>个人信息
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  data() {
    return {
      identities:false
    };
  },
  created() {
    //解析token
    const decoded = jwt_decode(localStorage.eleToken);
    console.log(decoded);
    //将docoded传到vuex保存
    this.$store.commit("changeUser", decoded);
    if (this.$store.state.User.identity == "manager") {
      this.identities = true;
    } else {
      this.identities = false;
    }
  }
};
</script>


<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.touxiang {
  width: 15%;
  display: flex;
  justify-content: space-between;
}
.touxiang .demo-basic--circle {
  padding-top: 5px;
}
.userName {
  width: 60px;
}
</style>