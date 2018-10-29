<template>
	<div>
	 	<el-card class="box-card">
		  <div slot="header">
		    <span>基本信息</span>
		  </div>
		  <div>
		  	<el-form ref="basicForm" :model="basic" label-width="80px">
				<el-form-item label="应用名">
				    <el-input v-model="basic.name"></el-input>
				</el-form-item>
			  	<el-form-item label="版本信息">
				    <el-input v-model="basic.versionInfo"></el-input>
				</el-form-item>
			  	<el-form-item label="路径">
				    <el-input type="file" webkitdirectory directory multiple class="file-input"></el-input>
				</el-form-item>
			  	<el-form-item label="应用描述">
				    <el-input v-model="basic.desc"></el-input>
				</el-form-item>
			</el-form>
		  </div>
		</el-card>

	 	<el-card class="box-card">
		  <div slot="header">
		    <span>用户信息</span>
		  </div>
		  <div>
		  	<el-form ref="userForm" :model="userInfo" label-width="80px">
				<el-form-item label="发布人">
				    <el-input v-model="userInfo.user"></el-input>
				</el-form-item>
			  	<el-form-item label="组织结构">
				    <el-input v-model="userInfo.org"></el-input>
				</el-form-item>
				<el-form-item label="联系电话">
				    <el-input v-model="userInfo.tel"></el-input>
				</el-form-item>
			  	<el-form-item label="电子邮件">
				    <el-input v-model="userInfo.email"></el-input>
				</el-form-item>
				<el-form-item label="通信地址">
				    <el-input v-model="userInfo.addr"></el-input>
				</el-form-item>
			</el-form>
		  </div>
		</el-card>

		<el-card class="box-card dependency-card">
	      <div slot="header" class="clearfix">
	        <span>依赖关系</span>
	      </div>

	      <el-collapse v-model="activeNames">
	        <el-collapse-item title="环境依赖" name="1">
	          <el-table
	            :data="tableData"
	            style="width: 100%">
	            <el-table-column
	              prop="date"
	              label="依赖项"
	              width="180">
	            </el-table-column>
	            <el-table-column
	              prop="name"
	              label="版本号"
	              width="180">
	            </el-table-column>
	            <el-table-column
	              prop="address"
	              label="描述">
	            </el-table-column>
	          </el-table>

			    <el-select v-model="form.lang" class="w180">
			      <el-option label="Java" value="1"></el-option>
			      <el-option label="C++" value="2"></el-option>
			      <el-option label="C#" value="3"></el-option>
			    </el-select>
			    <el-select v-model="form.type" class="w180">
			      <el-option label="111" value="1"></el-option>
			      <el-option label="222" value="2"></el-option>
			      <el-option label="333" value="3"></el-option>
			    </el-select>
			    <el-select v-model="form.func">
			      <el-option label="444" value="1"></el-option>
			      <el-option label="555" value="2"></el-option>
			      <el-option label="666" value="3"></el-option>
			    </el-select>
	        </el-collapse-item>

	        <el-collapse-item title="本地依赖" name="2">
	          <el-table
	            :data="tableData"
	            style="width: 100%">
	            <el-table-column
	              prop="date"
	              label="应用名"
	              width="180">
	            </el-table-column>
	            <el-table-column
	              prop="name"
	              label="版本号"
	              width="180">
	            </el-table-column>
	            <el-table-column
	              prop="address"
	              label="描述">
	            </el-table-column>
	          </el-table>
	        </el-collapse-item>
	      </el-collapse>
	    </el-card>
	</div>
</template>

<script>
import Vue from 'vue'
import { Card, Collapse, CollapseItem, Row, Col } from 'element-ui'
Vue.use(Card);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Row);
Vue.use(Col);
export default {
  data () {
    return {
      basic: {
      	name: '',
      	versionInfo: '',
      	path: '',
      	desc: '',
      },
      userInfo: {
      	user: '',
      	org: '',
      	tel: '',
      	email: '',
      	addr: '',
      },
      activeNames: [''],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江'
      }],
      form: {
        lang: '1',
        type: '1',
        desc: '',
      },
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .box-card {
    width: 680px;
    margin: 10px 0 30px 15px;
  }
  .el-form-item {
    margin-bottom: 15px;
  }
  .el-input__inner{
  	height: 34px;
  }
  .el-card__header{
  	color: #909399;
  	font-weight: 700;
  }
  .el-form-item__label, .el-form-item__content, .el-input__inner{
  	line-height: 34px;
  }
  .file-input input{
  	line-height: 32px;
  }
.dependency-card .el-card__body{
  padding-top: 0;
}
.dependency-card .el-collapse{
  border-top-width: 0;
}
.dependency-card .el-collapse-item__wrap{
  padding-left: 5px;
  border-top: 1px solid #ebeef5;
}
.dependency-card .el-collapse-item__header{
  color: #909399;
  text-indent: 5px;
  font-size: 15px;
  font-weight: 700;
}
.w180{
	width: 180px;
}
</style>
