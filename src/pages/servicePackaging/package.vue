<template>
	<div>
	 	<el-card class="box-card">
		  <div slot="header">
		    <span>基本信息</span>
		  </div>
		  <div>
		  	<el-form ref="basicForm" :model="basic" label-width="100px">
				<el-form-item label="应用名">
				    <el-input v-model="basic.name"></el-input>
				</el-form-item>
			  	<el-form-item label="版本信息">
				    <el-input v-model="basic.versionInfo"></el-input>
				</el-form-item>
			  	<el-form-item label="配置版本信息">
				    <el-input v-model="basic.configVersion" readonly></el-input>
				</el-form-item>
			  	<el-form-item label="路径">
				    <el-input type="file" webkitdirectory directory multiple class="file-input"></el-input>
				</el-form-item>
			  	<el-form-item label="应用描述">
				    <el-input rows="5" type="textarea" v-model="basic.desc"></el-input>
				</el-form-item>
			</el-form>
		  </div>
		</el-card>

	 	<el-card class="box-card">
		  <div slot="header">
		    <span>用户信息</span>
		  </div>
		  <div>
		  	<el-form ref="userForm" :model="userInfo" label-width="100px">
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


	 	<el-card class="box-card">
		  <div slot="header">
		    <span>执行脚本</span>
		  </div>
		  <div>
			<el-tabs class="scripts-card" type="border-card" v-model="flatTab">
			    <el-tab-pane label="Windows" name="windows">
		    		<el-row :gutter="20">
					  <el-col :span="6">
					  	<div class="scripts-box">
					  		<div class="scripts-title">脚本库</div>
					  		<ul class="scripts-ul">
					  			<li>test.bat</li>
					  			<li>test.bat</li>
					  			<li>test.bat</li>
					  			<li>test.bat</li>
					  			<li>test.bat</li>
					  			<li>test.bat</li>
					  			<li>test.bat</li>
					  		</ul>
					  	</div>
					  </el-col>
					  <el-col :span="18">
					  	<div class="scripts-choosen-box">
					  		<div class="scripts-choosen-title">
					  			<span>文件名</span>
					  			<span>脚本描述</span>
					  			<span>操作</span>
					  		</div>
					  		<div class="scripts-choosen clearfix">
					  			<div class="scripts-steps">卸载前</div>
					  			<div class="scripts-files">
					  				<div>
					  					<p class="scripts-files-name">清理脚本.bat</p>
					  					<p class="scripts-files-desc">清理临时文件</p>
					  					<p class="scripts-files-operate">
					  						<span>删除</span>
					  						<span>修改</span>
					  					</p>
					  				</div>
					  				<div>
					  					<p class="scripts-files-name">清理脚本.bat</p>
					  					<p class="scripts-files-desc">清理临时文件</p>
					  					<p class="scripts-files-operate">
					  						<span>删除</span>
					  						<span>修改</span>
					  					</p>
					  				</div>
					  			</div>
					  		</div>
					  	</div>
					  </el-col>
					</el-row>
			    </el-tab-pane>
			    <el-tab-pane label="Linux" name="linux">
		    		
			    </el-tab-pane>
		 	</el-tabs>
		  </div>
		</el-card>

		<el-card class="box-card dependency-card">
	      <div slot="header" class="clearfix">
	        <span>依赖关系</span>
	      </div>

	      <el-collapse v-model="activeNames">
	        <el-collapse-item title="环境依赖" name="1">
	          <el-table
	            :data="envTableData"
	            style="width: 100%">
	            <el-table-column
	              prop="name"
	              label="依赖项"
	              width="180">
	            </el-table-column>
	            <el-table-column
	              prop="version"
	              label="版本号"
	              width="180">
	            </el-table-column>
	            <el-table-column
	              prop="desc"
	              label="描述"
	              >
	            </el-table-column>
	            <el-table-column
			      label="操作"
			      width="80">
			      <template slot-scope="scope">
			        <el-button
			          @click.native.prevent="deleteRow(scope.$index, envTableData)"
			          type="text"
			          size="small">
			          删除
			        </el-button>
			      </template>
			    </el-table-column>
	          </el-table>
	          <div class="table-form-wrap">
	          	<!-- <el-select v-model="envForm.name" class="w140">
			      <el-option label="Java" value="Java"></el-option>
			      <el-option label="C++" value="C++"></el-option>
			      <el-option label="C#" value="C#"></el-option>
			    </el-select>
			    <el-select v-model="envForm.version" class="w140">
			      <el-option label="1.1.0" value="1.1.0"></el-option>
			      <el-option label="2.0.2" value="2.0.2"></el-option>
			      <el-option label="3.1.0" value="3.1.0"></el-option>
			    </el-select> -->
				<el-input placeholder="请填写依赖项" v-model="envForm.name" class="w140"></el-input>
				<el-input placeholder="请填写版本号" v-model="envForm.version" class="w140"></el-input>
				<el-input placeholder="请填写描述" v-model="envForm.desc" class="w315"></el-input>
				<el-button type="text" size="small" class="addBtn" @click="addDependency(envTableData,envForm.name,envForm.version,envForm.desc)">添加</el-button>
	          </div>
	        </el-collapse-item>

	        <el-collapse-item title="本地依赖" name="2">
	          <el-table
	            :data="localTableData"
	            style="width: 100%">
	            <el-table-column
	              prop="name"
	              label="应用名"
	              width="180">
	            </el-table-column>
	            <el-table-column
	              prop="version"
	              label="版本号"
	              width="180">
	            </el-table-column>
	            <el-table-column
	              prop="desc"
	              label="描述">
	            </el-table-column>
	            <el-table-column
			      label="操作"
			      width="80">
			      <template slot-scope="scope">
			        <el-button
			          @click.native.prevent="deleteRow(scope.$index, localTableData)"
			          type="text"
			          size="small">
			          删除
			        </el-button>
			      </template>
			    </el-table-column>
	          </el-table>
	          <div class="table-form-wrap">
				<el-input placeholder="请填写应用名" v-model="localForm.name" class="w140"></el-input>
				<el-input placeholder="请填写版本号" v-model="localForm.version" class="w140"></el-input>
				<el-input placeholder="请填写描述" v-model="localForm.desc" class="w315"></el-input>
				<el-button type="text" size="small" class="addBtn" @click="addDependency(localTableData,localForm.name,localForm.version,localForm.desc)">添加</el-button>
	          </div>
	        </el-collapse-item>

	        <el-collapse-item title="网络依赖" name="3">
	          <el-table
	            :data="netTableData"
	            style="width: 100%">
	            <el-table-column
	              prop="name"
	              label="应用名"
	              width="180">
	            </el-table-column>
	            <el-table-column
	              prop="version"
	              label="版本号"
	              width="180">
	            </el-table-column>
	            <el-table-column
	              prop="desc"
	              label="描述">
	            </el-table-column>
	            <el-table-column
			      label="操作"
			      width="80">
			      <template slot-scope="scope">
			        <el-button
			          @click.native.prevent="deleteRow(scope.$index, netTableData)"
			          type="text"
			          size="small">
			          删除
			        </el-button>
			      </template>
			    </el-table-column>
	          </el-table>
	          <div class="table-form-wrap">
				<el-input placeholder="请填写应用名" v-model="netForm.name" class="w140"></el-input>
				<el-input placeholder="请填写版本号" v-model="netForm.version" class="w140"></el-input>
				<el-input placeholder="请填写描述" v-model="netForm.desc" class="w315"></el-input>
				<el-button type="text" size="small" class="addBtn" @click="addDependency(netTableData,netForm.name,netForm.version,netForm.desc)">添加</el-button>
	          </div>
	        </el-collapse-item>
	      </el-collapse>
	      <span class="basic_mirror">基础镜像选择</span>
	      <el-select v-model="basicMirror" class="w140">
		    <el-option label="mirror1" value="mirror1"></el-option>
		    <el-option label="mirror2" value="mirror2"></el-option>
		    <el-option label="mirror3" value="mirror3"></el-option>
		  </el-select>
	    </el-card>
	    <div class="btns-wrap">
			<el-button type="primary" @click="handleCancel">取消</el-button>
			<el-button type="primary" @click="handleSave" class="fRight">保存</el-button>
	    </div>
	</div>
</template>

<script>
import Vue from 'vue'
import { Card, Collapse, CollapseItem, Row, Col, MessageBox } from 'element-ui'
import axios from 'axios';
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
      flatTab: 'windows',
      activeNames: [''],
      envTableData:[],
      localTableData: [],
      netTableData: [],
      envForm: {
        name: '',
        version: '',
        desc: '',
      },
      localForm: {
        name: '',
        version: '',
        desc: '',
      },
      netForm: {
        name: '',
        version: '',
        desc: '',
      },
      basicMirror: 'mirror1',
    }
  },
  created(){
  	// console.log(this.$store.state.serviceFlat);
  	// console.log(this.$store.state.winFlatBit);
  	// console.log(this.$store.state.linuxFlatBit);

  	// axios.get('http://element-cn.eleme.io/versions.json')
	  // .then(function (response) {
	  //   console.log(response);
	  // })
	  // .catch(function (response) {
	  //   console.log(response);
	  // });
  },
  methods: {
  	deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    addDependency(arr, name, version, desc){
    	let info = {name, version, desc}
    	arr.push(info);
    },
    handleCancel(){
        MessageBox.confirm('是否放弃当前编辑?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
    		this.$router.push({ name: 'servicePackagingIndex' });
        }).catch(() => {

        });
    },
    handleSave(){

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
$gray: #909399;
 .clearfix:after{
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
}
.clearfix{
    zoom:1;
}
  .box-card {
    width: 800px;
    margin: 10px 0 30px 15px;
  }
  .scripts-card{
  	min-height: 600px;
  }
  .scripts-box{
  	min-height: 510px;
  	margin: 5px;
  	border: 1px solid $gray;
  	text-align: center;
  }
  .scripts-title{
  	height: 40px;
  	line-height: 40px;
  	width: 90%;
  	margin: 0 auto;
  	font-size: 14px;
  	font-weight: 700;
  	border-bottom: 1px solid $gray;
  	color: $gray;
  }
  .scripts-choosen-box{
  	border: 1px solid $gray;
  	min-height: 510px;
  	margin-top: 5px;
  }
  .scripts-choosen-title{
  	height: 40px;
  	line-height: 40px;
  	font-size: 14px;
  	font-weight: 700;
  	color: $gray;
  }
  .scripts-choosen-title span{
  	margin-left: 100px;
  }
  .scripts-ul{
  	list-style: none;
  	padding: 0;
  	overflow: auto;
  }
  .scripts-steps{
  	width: 90px;
  	text-indent: 20px;
  	font-size: 15px;
  	margin-top: 10px;
  	float: left;
  }
  .scripts-files{
  	padding: 5px;
  	min-height: 40px;
  	font-size: 14px;
  	width: 420px;
  	float: left;
  	border: 1px solid $gray;
  	p{
  		margin: 3px 0;
  		float: left;
  	}
  	.scripts-files-name{
  		width: 150px;
  	}
  	.scripts-files-desc{
  		width: 160px;
  	}
  	.scripts-files-operate{
  		width: 90px;
  	}
  }
  .el-form-item {
    margin-bottom: 15px;
  }
  .el-input__inner{
  	height: 34px;
  }
  .el-card__header{
  	color: $gray;
  	font-weight: 700;
  }
  .el-form-item__label, .el-form-item__content, .el-input__inner{
  	line-height: 34px;
  }
  .file-input{
  	input{
  		line-height: 32px;
  	}
  }
.dependency-card{
	.el-card__body{
 		padding-top: 0;
	}
	.el-collapse{
  		border-top-width: 0;
	}
	.el-collapse-item__wrap{
	  padding-left: 5px;
	  border-top: 1px solid #ebeef5;
	}
	.el-collapse-item__header{
	  color: $gray;
	  text-indent: 5px;
	  font-size: 15px;
	  font-weight: 700;
	}
}
.table-form-wrap{
	margin-top: 20px;
}
.w140{
	width: 140px;
	margin-right: 38px;
}
.w315{
	width: 280px;
}
.fRight{
	float: right;
}
.addBtn{
	margin-left: 38px;
}
.basic_mirror{
	display: inline-block;
	height: 68px;
    line-height: 68px;
	font-size: 15px;
	font-weight: 700;
	color: $gray;
	margin: 0 20px 0 4px;
}
.btns-wrap{
	width: 226px;
	margin: 0 auto;
}
</style>
