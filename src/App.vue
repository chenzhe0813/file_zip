<template>
  <div id="app">
    <el-container>
      <el-header>
        <p>{{ title }}</p>
      </el-header>
      <el-container style="position: absolute;bottom: 0;top: 63px;width: 100%;">
        <el-aside width="250px">
          <el-menu class="el-menu-vertical-demo" router :default-active="sideActive" :default-openeds="openedMenus">
            <template v-for="item in menus">
              <el-menu-item class="father-menu" :index="item.path" :key="item.path" v-if="item.path!=='/' && !item.children && !item.hide">
                <i :class="item.icon"></i>
                <span>{{ item.sideName }}</span>
              </el-menu-item>
              <el-submenu :index="item.sideName" :key="item.sideName" v-if="item.children && item.children.length > 1 && !item.hide">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{ item.sideName }}</span>
                </template>
                <template v-for="child in item.children" v-if="!child.hide">
                  <el-menu-item :index="child.path" :key="child.path">
                    <span>{{ child.sideName }}</span>
                  </el-menu-item>
                </template>
              </el-submenu>
            </template>
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
  import 'normalize-css'

  export default {
    name: 'App',
    data() {
      return {
        title: '微服务开发向导',
        openedMenus: [],
      }
    },
    computed: {
      sideActive () {
        return this.$route.meta.sideActive || this.$route.path
      },
      menus () {
        return this.$router.options.routes
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
  left: 0;
  right: 0;
}
.el-header, .el-footer {
    color: #333;
    line-height: 60px;
    border-bottom: 1px solid #ccc;
  }
  .el-header{
    background: #1867c0;
    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 2px 4px 0px rgba(0,0,0,0.14);
  }
  .el-header p{
    color: #FFF;
    font-size: 18px;
    float: left;
    margin: 0 0 0 50px;
  }
  
  .el-aside {
    color: #333;
    text-align: left;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2);
  }
  
  .el-main {
    color: #333;
    padding-bottom: 0;
  }
  .el-menu-item span {
    margin-left: 25px;
  }
  .el-submenu__title span {
    margin-left: 25px;
  }
  .el-menu .el-menu--inline li span {
    padding-left: 3px;
  }

  .el-submenu.is-opened {
    border-bottom: 1px solid #E0E0E0;
  }
  .iconfont{

  }
</style>
