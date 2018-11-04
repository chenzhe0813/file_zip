	<template>
		<div>
			<el-card class="box-card">
				<div slot="header">
					<span>基本信息</span>
				</div>
				<div>
					<el-form ref="basic" :model="basic" label-width="100px">
						<el-form-item label="应用名">
							<el-input v-model="basic.name"></el-input>
						</el-form-item>
						<el-form-item label="版本信息">
							<el-input v-model="basic.versionInfo"></el-input>
						</el-form-item>
						<el-form-item label="配置版本信息">
							<el-input v-model="basic.configVersion" readonly></el-input>
						</el-form-item>
						<el-form-item label="路径" class="input-type-file multiple-file">
							<p class="show-file-name">{{wzipName}}</p>
							<el-input type="file" @change='addLocalFiles()' webkitdirectory directory multiple id="dir_input" class="file-input"></el-input>
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
										<ul class="scripts-ul input-type-file">
											<li v-for="item in scriptsListWindows">
												<p @click="addScript(item)">{{item.name}}</p>
											</li>
											<input type="file" @change='addLocalScript()' id="win_script_input"/>
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
										<div class="scripts-choosen clearfix" v-for="step in scriptSteps">
											<div class="scripts-steps">{{step.name}}</div>

											<div class="scripts-files">
												<div v-for="(file, index) in scriptsChoosenWindows[step.key]" class="file-item clearfix" v-dragging="{ item: file, list: scriptsChoosenWindows[step.key], group: `${step.key}win` }" :key="`${file.name}${step.key}${index}win`">
													<p class="scripts-files-name">{{file.name}}</p>
													<p class="scripts-files-desc">{{file.desc}}</p>
													<p class="scripts-files-operate">
														<span @click="scriptsDelete(index, scriptsChoosenWindows[step.key])">删除</span>
														<span @click="scriptsEdit(file, index, step.key)">修改</span>
													</p>
												</div>
											</div>
										</div>
									</div>
								</el-col>
							</el-row>
						</el-tab-pane>
						<el-tab-pane label="Linux" name="linux">
							<el-row :gutter="20">
								<el-col :span="6">
									<div class="scripts-box">
										<div class="scripts-title">脚本库</div>
										<ul class="scripts-ul">
											<li v-for="item in scriptsListLinux">
												<p @click="addScript(item)">{{item.name}}</p>
											</li>
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
										<div class="scripts-choosen clearfix" v-for="step in scriptSteps">
											<div class="scripts-steps">{{step.name}}</div>

											<div class="scripts-files">
												<div v-for="(file, index) in scriptsChoosenLinux[step.key]" class="file-item clearfix" v-dragging="{ item: file, list: scriptsChoosenLinux[step.key], group: `${step.key}Lin` }" :key="`${file.name}${step.key}${index}Lin`">
													<p class="scripts-files-name">{{file.name}}</p>
													<p class="scripts-files-desc">{{file.desc}}</p>
													<p class="scripts-files-operate">
														<span @click="scriptsDelete(index, scriptsChoosenLinux[step.key])">删除</span>
														<span @click="scriptsEdit(file, index, step.key)">修改</span>
													</p>
												</div>
											</div>
										</div>
									</div>
								</el-col>
							</el-row>
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
<!-- 弹出框 start-->
<el-dialog title="添加脚本" :visible.sync="dialogFormVisible" width="600px" class="script-dialog">
	<el-form :model="dialogScriptForm">
		<el-form-item label="文件名" label-width="120px">
			<el-input v-model="dialogScriptForm.name" readonly></el-input>
		</el-form-item>
		<el-form-item label="脚本描述" label-width="120px">
			<el-input v-model="dialogScriptForm.desc" ></el-input>
		</el-form-item>
		<el-form-item v-if="dialogShowCheckbox" label="添加至" label-width="120px">
			<el-checkbox-group v-model="dialogScriptForm.steps">
				<el-checkbox v-for="item in scriptSteps" :key="item.key" :label="item.key">{{item.name}}</el-checkbox>
			</el-checkbox-group>
		</el-form-item>
	</el-form>
	<div slot="footer" class="dialog-footer">
		<el-button @click="dialogFormVisible = false">取 消</el-button>
		<el-button type="primary" @click="addScriptSubmit">确 定</el-button>
	</div>
</el-dialog>
<!-- 弹出框 end-->
<button @click="test">测试</button>
</div>
</template>

<script>
	import Vue from 'vue'
	import { Card, Collapse, CollapseItem, Row, Col, CheckboxGroup, MessageBox, Message } from 'element-ui'
	import axios from 'axios';
	import JSZip from 'jszip';
	import saveAs from 'file-saver';
		//拖拽
		import VueDND from 'awe-dnd'
		Vue.use(VueDND)

		Vue.use(Card);
		Vue.use(Collapse);
		Vue.use(CollapseItem);
		Vue.use(Row);
		Vue.use(Col);
		Vue.use(CheckboxGroup);
		export default {
			data () {
				return {
					dialogFormVisible: false,// 控制弹出框显示
					dialogShowCheckbox: true,// 控制弹出框中复选框显示（编辑时无需复选框）
					editFileToStep: null,// 记录在哪一步编辑执行脚本
					packageJson: { //保存的package.json文件内容

					},
					dialogScriptForm: {// 弹框表单，需要添加的脚本信息
						id: undefined,
						name: '',
						desc: '',
						steps: [],
					},
					basic: {// 基本信息
						name: '',
						versionInfo: '',
						path: '',
						desc: '',
					},
					userInfo: {// 用户信息
						user: '',
						org: '',
						tel: '',
						email: '',
						addr: '',
					},
					flatTab: 'windows',// 切换平台tab
					activeNames: [''],
					envTableData:[],// 环境依赖
					localTableData: [],// 本地依赖
					netTableData: [],// 网络依赖
					envForm: {// 环境依赖添加表单
						name: '',
						version: '',
						desc: '',
					},
					localForm: {// 本地依赖添加表单
						name: '',
						version: '',
						desc: '',
					},
					netForm: {// 网络依赖添加表单
						name: '',
						version: '',
						desc: '',
					},
					basicMirror: 'mirror1',// 基础镜像
					scriptsListWindows:[{// Windows脚本库
						id: 1,
						name: 'test.bat',
					},{
						id: 2,
						name: 'czcz.bat',
					},{
						id: 3,
						name: '测试脚本.bat',
					},{
						id: 4,
						name: '清理文件.bat',
					}
					],
					scriptsListLinux:[{// Linux脚本库
						id: 1,
						name: '1111.bat',
					},{
						id: 2,
						name: '22222.bat',
					},{
						id: 3,
						name: '测试脚本.bat',
					},{
						id: 4,
						name: '清理文件.bat',
					}
					],
					scriptsChoosenWindows:{// 选择Windows的脚本信息
						fileBeforeUnload:[
						],
						fileAfterUnload:[
						],
						fileBeforeInstall:[
						],
						fileAfterInstall:[
						],
						fileBeforeRun:[
						],
						fileRunning:[
						],
						fileAfterRun:[
						],
					},
					scriptsChoosenLinux:{// 选择Linux的脚本信息
						fileBeforeUnload:[
						],
						fileAfterUnload:[
						],
						fileBeforeInstall:[
						],
						fileAfterInstall:[
						],
						fileBeforeRun:[
						],
						fileRunning:[
						],
						fileAfterRun:[
						],
					},
					scriptSteps:[// 执行脚本模块步骤array
					{
						key: 'fileBeforeUnload',
						name: '卸载前'
					},
					{
						key: 'fileAfterUnload',
						name: '卸载后'
					},
					{
						key: 'fileBeforeInstall',
						name: '安装前'
					},
					{
						key: 'fileAfterInstall',
						name: '安装后'
					},
					{
						key: 'fileBeforeRun',
						name: '启动前'
					},
					{
						key: 'fileRunning',
						name: '启动'
					},
					{
						key: 'fileAfterRun',
						name: '启动后'
					}
					],
					wzip: null,
					wzipName: '请选择文件',
				}
			},
			created(){
				this.$dragging.$on('dragged', ({ value }) => {
					console.log(value)
			        // console.log(value.item)
			        // console.log(value.list)
			        // console.log(value.group)
			    })
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
			test(){
				console.log(this.wzip);
			},
			addLocalFiles(){
				var _this = this;
				var fileList = document.getElementById('dir_input').files;
				if(fileList && fileList.length){
					_this.wzip = new JSZip();
					_this.wzipName = fileList[0].webkitRelativePath.split('/')[0];
					for (let i = 0; i<fileList.length; i++) {
						let file = fileList[i];
						_this.wzip.file(file.webkitRelativePath, file)
					}
				}else{
					_this.wzip = null;
					_this.wzipName = '请选择文件';
				}
			},
			scriptsDelete(index, arr){
				arr.splice(index, 1);
			},
			scriptsEdit(item, index, step){
				this.dialogScriptForm = {
					id: item.id,
					name: item.name,
					desc: item.desc,
				};
				this.editFileToStep = {step, index};
				this.dialogShowCheckbox = false;
				this.dialogFormVisible = true;
			},
			addScript(script){
				this.dialogScriptForm = {
					id: script.id,
					name: script.name,
					desc: '',
					steps: [],
				};
				this.dialogShowCheckbox = true;
				this.dialogFormVisible = true;
			},
			addScriptSubmit(){
				let _this = this;
				if(_this.dialogShowCheckbox && _this.dialogScriptForm.steps.length === 0){
					return Message.error('请选择添加至哪一步骤!');
				}
				let data = {
					id: _this.dialogScriptForm.id,
					name: _this.dialogScriptForm.name,
					desc: _this.dialogScriptForm.desc,
				}
				let flat = _this.flatTab === 'windows' ? 'scriptsChoosenWindows' : 'scriptsChoosenLinux';
				if(_this.dialogShowCheckbox){
					_this.dialogScriptForm.steps.map((item)=>{
						_this[flat][item].push(data);
					})
				}else{
					_this[flat][_this.editFileToStep.step][_this.editFileToStep.index] = data;
				}

				_this.dialogFormVisible = false;
			},
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
				let _this = this;
				if(!_this.wzip){
					return Message.error('请选择本地文件路径!');
				}
				_this.wzip.generateAsync({type:"blob"})
				.then(function (content) {
					console.log(content)
	              // see FileSaver.js
	              saveAs(content, `${_this.wzipName}.zip`);
	          	});
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
.input-type-file{
	position: relative;
	.show-file-name{
		margin: 0;
		position: absolute;
		z-index: 999;
		left: 15px;
	}
	input{
		font-size: 0;
	}
	input::-webkit-file-upload-button {
        background: #efeeee;
        color: #333;
        border: 1px solid #dcdfe6;
        padding: 2px 4px;
        border-radius: 5px;
        font-size: 12px;
        position: absolute;
        right: 15px;
    }
} 
.multiple-file{
	input::-webkit-file-upload-button {
        top: 6px;
        right: 15px;
    }
}
.box-card {
	width: 800px;
	margin: 10px auto 30px;
}
.scripts-card{
	min-height: 640px;

	.scripts-box{
		min-height: 550px;
		margin: 5px;
		border: 1px solid $gray;
		text-align: center;

		.scripts-ul{
			list-style: none;
			padding: 0;
			li{
				cursor: pointer;
				font-size: 14px;
				&:hover{
					color: #409EFF;
				}
			}
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
	}	

	.scripts-choosen-box{
		border: 1px solid $gray;
		min-height: 550px;
		margin-top: 5px;

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
		.scripts-choosen{
			margin-bottom: 10px;

			.scripts-steps{
				width: 90px;
				text-indent: 20px;
				font-size: 15px;
				margin-top: 10px;
				float: left;
			}
			.scripts-files{
				padding: 5px;
				min-height: 50px;
				font-size: 14px;
				width: 420px;
				float: left;
				border: 1px solid $gray;
				p{
					margin: 3px 0;
					float: left;
				}
				.scripts-files-name{
					width: 140px;
					margin-right: 10px;
					word-wrap: break-word;
				}
				.scripts-files-desc{
					width: 150px;
					margin-right: 10px;
					word-wrap: break-word;
				}
				.scripts-files-operate{
					width: 90px;
					span{
						cursor: pointer;
						&:hover{
							color: #409EFF;
						}
					}
				}
				.file-item{
					&:hover{
						background-color: #ecf5ff;
					}
				}
			}
		}
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
.script-dialog{
	.el-input{
		width: 400px;
	}
	.el-checkbox{
		width: 80px;
		margin-right: 30px;
		margin-left: 0;
	}
}
</style>
