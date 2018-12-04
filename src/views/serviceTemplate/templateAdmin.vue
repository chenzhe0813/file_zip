<template>
	<div class="template-admin">
		<el-card v-for="card in cards" class="box-card" :key="card.data">
			<div slot="header">
				<span>{{card.name}}</span>
				<el-button type="primary" @click="addItem(card)" class="addItemBtn" size="small">添加</el-button>
			</div>
			<div>
				<el-table
					:data="$data[card.data]"
					style="width: 100%"
					max-height="250">
					<el-table-column
						v-for="item in $data[card.type]"
						:key="item.prop"
						:prop="item.prop"
						:label="item.label"
						:formatter="formatter">
					</el-table-column>
					<el-table-column
						label="操作"
						width="80">
						<template slot-scope="scope">
							<el-button
								@click.native.prevent="deleteRow(scope.row, card.data)"
								type="text"
								size="small">
								删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-card>
		<el-dialog :title="dialogInfo.name" :visible.sync="dialogFormVisible" width="600px" class="script-dialog">
			<el-form :model="$data[dialogInfo.form]" ref="ruleForm" :rules="rules">
				<el-form-item v-for="item in $data[dialogInfo.type]" :key="item.prop" :prop="item.prop" :label="item.label" label-width="120px">
					<el-input v-model="$data[dialogInfo.form][item.prop]" class="dialog-input"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addItemSubmit">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 模板类型弹窗 -->
		<el-dialog title="模板类型" :visible.sync="dialogFormVisible2" width="600px" class="script-dialog">
			<el-form :model="tempOrPlugTypeForm" ref="ruleForm2" :rules="rules2">
				<el-form-item label="开发语言" label-width="120px" prop="lang">
				    <el-select v-model="tempOrPlugTypeForm.lang" placeholder="请选择" class="dialog-input">
				      <el-option v-for="item in lang" :key="item.id" :label="item.name" :value="item.id""></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="平台" label-width="120px" prop="flat">
				    <el-select v-model="tempOrPlugTypeForm.flat" placeholder="请选择" class="dialog-input">
				      <el-option v-for="item in flat" :key="item.id" :label="item.name" :value="item.id""></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="服务类别" label-width="120px" prop="serviceType">
				    <el-select v-model="tempOrPlugTypeForm.serviceType" placeholder="请选择" class="dialog-input">
				      <el-option v-for="item in serviceType" :key="item.id" :label="item.name" :value="item.id""></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="功能类别" label-width="120px" prop="funcType">
				    <el-select v-model="tempOrPlugTypeForm.funcType" placeholder="请选择" class="dialog-input">
				      <el-option v-for="item in funcType" :key="item.id" :label="item.name" :value="item.id""></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="模式" label-width="120px" prop="type">
				    <el-select v-model="tempOrPlugTypeForm.type" placeholder="请选择" class="dialog-input">
				      <el-option v-for="item in type" :key="item.id" :label="item.name" :value="item.id""></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="模板名称" label-width="120px" prop="templateName">
					<el-input v-model="tempOrPlugTypeForm.templateName" class="dialog-input"></el-input>
				</el-form-item>
				<el-form-item label="选择文件" label-width="120px" class="input-type-file multiple-file">
					<p class="show-file-name">{{tempOrPlugTypeForm.file}}</p>
					<el-input readonly class="dialog-input"></el-input>
					<label id="realBtn" class="btn">
						<input type="file" class="hide-inputs" id="openZip" name="file" @change="openZip()" accept="application/zip">
						<span class="openZip">选择</span>
					</label>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible2 = false">取 消</el-button>
				<el-button type="primary" @click="addItemSubmit2">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Vue from 'vue'
	import axios from 'axios';
	import { Message } from 'element-ui'
	let instance = axios.create({
		baseURL: '',
		timeout: 5000,
		headers:{// 这里可设置所有的请求头
	        'Content-Type':'multipart/form-data'
	    }
	})
	Vue.prototype.$http=instance;
	export default {
	   data() {
	      return {
	      	rules: {
	          name: [
	            { required: true, message: '请输入名称', trigger: 'blur' },
	          ],
	        },
	      	rules2: {
	          lang: [
	            { required: true, message: '请选择开发语言', trigger: 'blur' }
	          ],
	          flat: [
	            { required: true, message: '请选择平台', trigger: 'blur' }
	          ],
	          serviceType: [
	            { required: true, message: '请选择服务类别', trigger: 'blur' }
	          ],
	          funcType: [
	            { required: true, message: '请选择功能类别', trigger: 'blur' }
	          ],
	          type: [
	            { required: true, message: '请选择模式', trigger: 'blur' },
	          ],
	          templateName: [
	            { required: true, message: '请输入模板名称', trigger: 'blur' },
	          ],
	        },
	        title: '服务管理',
	        // 分类
	        cards:[{
	        	name: '开发语言',
	        	data: 'lang',
	        	type: 'langList',
	        	form: 'langForm',
	        },{
	        	name: '服务类别',
	        	data: 'serviceType',
	        	type: 'serviceTypeList',
	        	form: 'serviceTypeForm',
	        },{
	        	name: '功能类别',
	        	data: 'funcType',
	        	type: 'funcTypeList',
	        	form: 'funcTypeForm',
	        },{
	        	name: '模板类型',
	        	data: 'templateType',
	        	type: 'tempOrPlugTypeList',
	        	form: 'tempOrPlugTypeForm',
	        }],
	        // 表格数据
	        lang: [],
	        serviceType: [],
	        funcType: [],
	        templateType: [],
	        flat: [{
        		id: 1,
        		name: 'x86(32位)'
        	},{
        		id: 2,
        		name: 'x64(64位)'
        	}],
	        type: [{
        		id: 1,
        		name: '向导模式'
        	},{
        		id: 2,
        		name: '插件模式'
        	}],
	        dialogFormVisible: false,
	        dialogFormVisible2: false,
	        // 表格head及弹框表单item
	        langList: [{
        		prop: 'name',
        		label: '语言类种'
        	}],
	        serviceTypeList: [{
        		prop: 'name',
        		label: '服务类别'
        	},{
        		prop: 'description',
        		label: '描述'
        	}],
	        funcTypeList: [{
        		prop: 'name',
        		label: '功能类别'
        	},{
        		prop: 'description',
        		label: '描述'
        	}],
	        tempOrPlugTypeList: [{//弹窗增加模板文件
        		prop: 'programLanguageName',
        		label: '开发语言'
        	},{
        		prop: 'systemPlatForm',
        		label: '平台'
        	},{
        		prop: 'serviceCategoryName',
        		label: '服务类别'
        	},{
        		prop: 'functionCategoryName',
        		label: '功能类别'
        	},{
        		prop: 'name',
        		label: '模板名称'
        	},{
        		prop: 'fileName',
        		label: '文件名'
        	},{
        		prop: 'type',
        		label: '模式'
        	}],
        	// 表单model
        	langForm: {
        		name: '',
        	},
        	serviceTypeForm: {
        		name: '',
        		description: '',
        	},
        	funcTypeForm: {
        		name: '',
        		description: '',
        	},
        	tempOrPlugTypeForm: {
        		lang: '',
        		flat: '',
        		serviceType: '',
        		funcType: '',
        		templateName: '',
        		type: '',
        		file: '请选择.zip文件',
        	},
	        dialogInfo: {
	        	data: '',
	        	name: '',
	        	type: '',
	        	form: '',
	        },
	      }
	    },
	    created(){
	    	this.dataInit();
	    },
	    methods: {
	      dataInit() {
	    	this.getDataList('lang');
	    	this.getDataList('serviceType');
	    	this.getDataList('funcType');
	    	this.getDataList('templateType');
	      },
	      getDataList(type) {
	      	let _this = this;
	      	let url = '';
	   	  	switch(type)
			{
			case 'lang':
			  url = '/api/v1/template/program-languages';
			  break;
			case 'serviceType':
			  url = '/api/v1/template/service-categories';
			  break;
			case 'funcType':
			  url = '/api/v1/template/function-categories';
			  break;
			case 'templateType':
			  url = '/api/v1/templates';
			  break;
			}
	    	axios.get(url)
			.then(function (response) {
				if(response.status === 200 && response.data.status === 0){
					_this[type] = response.data.data;
				}else{
					Message.error(response.data.msg);
				}
			})
			.catch(function (err) {
				console.log(err);
			});
	      },
	      formatter(row, column) {
	      	//格式化模板类型--平台
	      	if(column.property === 'systemPlatForm'){
	      		return row.systemPlatForm === 1 ? 'x86(32位)' : 'x64(64位)'
	      	}
	      	//格式化模板类型--模式
	      	if(column.property === 'type'){
	      		return row.type === 1 ? '向导模式' : '插件模式'
	      	}
	      	//格式化模板类型--文件名
	      	if(column.property === 'fileName'){
	      		let name = row.fileName;
				if(name.indexOf('_')>=0){
					return name.substr(name.indexOf('_')+1);// 获取压缩文件名称
				}else{
					return name;
				}
	      	}
	      	return row[column.property];
	      },
	      openZip() {
			let file = document.getElementById('openZip').files[0];
		    let _this = this;
		    if(file && file.name){
			    if(file.name.indexOf('.zip')>=0 || file.name.indexOf('.rar')>=0){
			    	_this.tempOrPlugTypeForm.file = document.getElementById('openZip').value;
			    }else{
			    	document.getElementById('openZip').value='';
			    	_this.tempOrPlugTypeForm.file = '请选择.zip文件';
					Message.error('请选择.zip文件!');
				}
		    }else{
		    	_this.tempOrPlugTypeForm.file = '请选择.zip文件';
		    }
	      },
	      deleteRow(row, type) {
	      	let _this = this;
	      	let deleteURL = '';
	   	  	switch(type)
			{
			case 'lang':
			  deleteURL = '/api/v1/template/program-languages';
			  break;
			case 'serviceType':
			  deleteURL = '/api/v1/template/service-categories';
			  break;
			case 'funcType':
			  deleteURL = '/api/v1/template/function-categories';
			  break;
			case 'templateType':
			  deleteURL = '/api/v1/templates';
			  break;
			}
	      	axios.delete(`${deleteURL}/${row.id}`)
			.then(function (response) {
				if(response.status === 200 && response.data.status === 0){
	    			_this.getDataList(type);
				}else{
					Message.error(response.data.msg);
				}
			})
			.catch(function (err) {
				console.log(err);
			});
	      },
	      addItem(item) {
	      	for(let i in this[item.form]){
	      		if(item.form === 'tempOrPlugTypeForm' && i === 'file'){

	      		}else{
		      		this[item.form][i] = '';
		      	}
	      	}
	      	if(item.form !== 'tempOrPlugTypeForm'){
		      	this.dialogInfo = {
		      		data: item.data,
		      		name: item.name,
		      		type: item.type,
		      		form: item.form
		      	}
				this.dialogFormVisible = true;
	      	}else{
	      		this.dataInit();
	      		this.dialogFormVisible2 = true;
	      	}
	      	// 移除校验结果
	      	if(this.$refs['ruleForm']){
	   	  		this.$refs['ruleForm'].clearValidate();
	      	}
	      	if(this.$refs['ruleForm2']){
	   	  		this.$refs['ruleForm2'].clearValidate();
	      	}
	      },
	   	  addItemSubmit(){
	   	  	this.$refs['ruleForm'].validate((valid) => {
	          if (valid) {
	          	let _this = this;
		   	  	let form = _this.dialogInfo.form;
		   	  	let type = _this.dialogInfo.data;
		   	  	let postURL = '';
		   	  	switch(type)
				{
				case 'lang':
				  postURL = '/api/v1/template/program-language';
				  break;
				case 'serviceType':
				  postURL = '/api/v1/template/service-category';
				  break;
				case 'funcType':
				  postURL = '/api/v1/template/function-category';
				  break;
				}
		   	  	axios.post(postURL,_this.$data[form])
				.then(function (response) {
					if(response.status === 200 && response.data.status === 0){
		    			_this.getDataList(type);
						_this.dialogFormVisible = false;
					}else{
						Message.error(response.data.msg);
					}
				})
				.catch(function (err) {
					console.log(err);
				});
	          } else {
	            return false;
	          }
	        });
		  },
	   	  addItemSubmit2(){
	   	  	this.$refs['ruleForm2'].validate((valid) => {
	          if (valid) {
		   	  	let _this = this;
				let file = document.getElementById('openZip').files[0];
				if(_this.tempOrPlugTypeForm.file === '请选择.zip文件'){//不用file做判断，原因是有可能选择了非压缩格式的文件
					return Message.error('请选择.zip文件!');
				}
		   	  	let data = new FormData();
		   	  	data.append("file", file);
		   	  	_this.$http.post('/api/v1/template/upload', data)
				.then(function (response) {
					if(response.status === 200 && response.data.status === 0){
						let tempOrPlugTypeForm = _this.$data['tempOrPlugTypeForm'];
						let params = {
							filePath: response.data.data,
							functionCategoryId: tempOrPlugTypeForm.funcType,
							name: tempOrPlugTypeForm.templateName,
							programLanguageId: tempOrPlugTypeForm.lang,
							serviceCategoryId: tempOrPlugTypeForm.serviceType,
							systemPlatForm: tempOrPlugTypeForm.flat,
							type: tempOrPlugTypeForm.type
						}
						axios.post('/api/v1/template', params)
						.then(function (res) {
							if(res.status === 200 && res.data.status === 0){
		    					_this.getDataList('templateType');
								_this.dialogFormVisible2 = false;
							}else{
								Message.error(res.data.msg);
							}
						})
					}else{
						Message.error(response.data.msg);
					}
				})
				.catch(function (err) {
					console.log(err);
				});
	          } else {
	            return false;
	          }
	        });
		  },
	    }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.template-admin{
	.box-card {
		width: 1100px;
		margin: 10px 50px 30px;
	}
	.addItemBtn{
		float: right;
		margin-top: -3px;
		margin-right: 30px;
	}
	.dialog-input{
		width: 340px;
	}
	.input-type-file{
		position: relative;
		.show-file-name{
			margin: 0;
			position: absolute;
			z-index: 999;
			left: 15px;
		}
		.hide-inputs{
			left:-9999px;
			position:absolute;
		}
		.openZip{
			cursor: pointer;
			display: inline-block;
			float: right;
			color: #fff;
			background-color: #409EFF;
			border-color: #409EFF;
			text-align: center;
			line-height: 1;
			font-weight: 500;
			font-size: 14px;
			padding: 10px 20px;
			border-radius: 4px;
			margin-top: 2px;
			margin-right: 20px;
		}
	}
}
</style>
