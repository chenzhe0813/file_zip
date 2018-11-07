<template>
  <div id="app">
    <el-container>
      <el-header height="100px">
        <!-- <img src="./assets/logo.png">
        <p>微服务开发向导</p> -->
      </el-header>
      <el-container style="position: absolute;bottom: 0;top: 100px;width: 100%;">
        <el-aside width="250px">
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router>
            <el-submenu index="1">
              <template slot="title">
                <span>服务模板</span>
              </template>
              <el-menu-item index="/template">模板生成</el-menu-item>
              <el-menu-item index="/templateAdmin">模板管理</el-menu-item>
            </el-submenu>
            <el-menu-item index="/contractGeneration">
              契约生成
            </el-menu-item>
            <el-menu-item index="/servicePackagingIndex">
              服务打包
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { 
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Container,
    Header,
    Aside,
    Main, } from 'element-ui'
  import 'normalize-css'

  Vue.use(Menu);
  Vue.use(Submenu);
  Vue.use(MenuItem);
  Vue.use(MenuItemGroup);
  Vue.use(Container);
  Vue.use(Header);
  Vue.use(Aside);
  Vue.use(Main);
  export default {
    name: 'App',
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 10%;
  right: 10%;
}
.el-header, .el-footer {
    color: #333;
    line-height: 60px;
    border-bottom: 1px solid #ccc;
  }
  .el-header img{
    float: left;
    margin: 26px 20px 0;
  }
  .el-header p{
    color: #000;
    font-size: 22px;
    font-weight: 700;
    float: left;
  }
  
  .el-aside {
    color: #333;
    text-align: center;
    border-right: 1px solid #ccc;
  }
  
  .el-main {
    color: #333;
    padding-bottom: 30px;
  }

  .el-submenu .el-menu-item{
    text-indent: 20px;
  }
</style>
