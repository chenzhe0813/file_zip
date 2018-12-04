<template>
	<div>
	  <el-form ref="templateForm" :model="form" label-width="80px" class="formBox">
		<el-form-item label="选择语言" prop="programLanguageId">
		    <el-select v-model="form.programLanguageId" placeholder="请选择开发语言" @change="handleClick">
		      <el-option v-for="item in lang" :label="item.name" :value="item.id" :key="item.id"></el-option>
		    </el-select>
		</el-form-item>
		<el-form-item label="选择平台" prop="systemPlatForm">
		    <el-radio-group v-model="form.systemPlatForm">
		      <el-radio label="1" border size="medium">x86（32位）</el-radio>
		      <el-radio label="2" border size="medium">x64（64位）</el-radio>
		    </el-radio-group>
	    </el-form-item>
	  	<el-form-item label="选择主题" prop="serviceCategoryId">
		    <el-select v-model="form.serviceCategoryId" placeholder="请选择主题"  @change="handleClick">
		      <el-option v-if="!item.description" v-for="item in serviceType" :label="item.name" :value="item.id" :key="item.id"></el-option>
		      <el-option v-if="item.description" v-for="item in serviceType" :label="item.name+' （'+item.description+'）'" :value="item.id" :key="item.id"></el-option>
		    </el-select>
		</el-form-item>
	  	<el-form-item label="选择功能" prop="functionCategoryId">
		    <el-select v-model="form.functionCategoryId" placeholder="请选择功能"  @change="handleClick">
		      <el-option v-if="!item.description" v-for="item in funcType" :label="item.name" :value="item.id" :key="item.id"></el-option>
		      <el-option v-if="item.description" v-for="item in funcType" :label="item.name+' （'+item.description+'）'" :value="item.id" :key="item.id"></el-option>
		    </el-select>
		</el-form-item>
	  	<el-form-item label="选择模式" prop="type">
			<el-tabs v-model="form.type" class="tabBox" @tab-click="handleClick">
			    <el-tab-pane label="向导模式" name="1">
		    		<el-input rows="15" type="textarea" v-model="desc"></el-input>
			    </el-tab-pane>
			    <el-tab-pane label="插件模式" name="2">
		    		<el-input rows="15" type="textarea" v-model="desc"></el-input>
			    </el-tab-pane>
		 	</el-tabs>
		</el-form-item>
	  </el-form>
	  <div class="btns-class">
		  <div class="btns-wrap">
			<el-button type="primary" @click="handleCancel">放弃</el-button>
			<el-button type="primary" @click="handleSave" class="fRight">确定</el-button>
		  </div>
	  </div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import axios from 'axios';
	import { MessageBox, Message } from 'element-ui';
	import JSZip from 'jszip';
	import saveAs from 'file-saver';
	export default {
	   data() {
	      return {
	        form: {
	          programLanguageId: '',
	          systemPlatForm: '1',
	          serviceCategoryId: '',
	          functionCategoryId: '',
	          type: '1',
	        },
	        lang: [],
	        serviceType: [],
	        funcType: [],
	        desc: '',
	        wzipName: '',// 保存的zip包名
	        fileDirName: '',// 需要修改的文件名（包含路径）
	        wzip: null,
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
	      },
	      getDataList(type) {
	      	let _this = this;
	      	let url = '';
	      	// let id = '';
	   	  	switch(type)
			{
			case 'lang':
			  url = '/api/v1/template/program-languages';
			  // id = 'programLanguageId';
			  break;
			case 'serviceType':
			  url = '/api/v1/template/service-categories';
			  // id = 'serviceCategoryId';
			  break;
			case 'funcType':
			  url = '/api/v1/template/function-categories';
			  // id = 'functionCategoryId';
			  break;
			}
	    	axios.get(url)
			.then(function (response) {
				if(response.status === 200 && response.data.status === 0){
					_this[type] = response.data.data;
					// _this.$set(_this.form, id, response.data.data[0].id);
				}else{
					Message.error(response.data.msg);
				}
			})
			.catch(function (err) {
				console.log(err);
			});
	      },
    	  downloadTemplate(){
			let _this = this;
			_this.desc = '';
			_this.wzipName = '';
			_this.fileDirName = '';
			_this.wzip = null;
    	  	axios({ // 用axios发送post请求
	          method: 'post',
	          url: 'api/v1/template/download', // 请求地址
	          data: _this.form, // 参数
	          responseType: 'blob' // 表明返回服务器返回的数据类型
	        })
			.then(function (response) {
				if(response.headers && response.headers.templatefilename){
					let name = response.headers.templatefilename;
					if(name.indexOf('_')>=0){
						_this.wzipName = name.substr(name.indexOf('_')+1);// 获取压缩文件名称
					}
				}

				_this.wzip = new JSZip();
		    	_this.wzip.loadAsync(response.data).then(function (zip) {
	    			for(let i in zip.files){
	    				if(zip.files[i].name.indexOf('package.json')>=0){
		    				_this.fileDirName = zip.files[i].name;
		    				break;
		    			}
	    			}
		    		if(zip.file(`${_this.fileDirName}`)){
		    			zip.file(`${_this.fileDirName}`).async("string").then(function success(content) {
		    				_this.desc = content;
		    			})
		    		}
				}, function (e) {
		    		console.log(e);
				});
			})
			.catch(function (err) {
				console.log(err);
			});
    	  },
	      handleCancel() {
	      	MessageBox.confirm('是否放弃当前操作?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$refs['templateForm'].resetFields();
				this.desc = '';
				this.wzipName = '';
				this.fileDirName = '';
				this.wzip = null;
			}).catch(() => {
			});
	      },
	      handleSave() {
	      	let _this = this;
	      	if(_this.wzip){
	      		_this.wzip.file(`${_this.fileDirName}`, _this.desc);
		      	_this.wzip.generateAsync({type:"blob"})
						.then(function (content) {
							saveAs(content, `${_this.wzipName}`);
						}).catch((error) => {
							console.log(error)
						})
	      		return;
	      	}else{
	      		return Message.error('没有匹配到模板！');
	      	}
	      },
	      checkParams(){
	      	let { programLanguageId, serviceCategoryId, functionCategoryId } = this.form;
	      	return programLanguageId && serviceCategoryId && functionCategoryId;
	      },
	      handleClick(){
	      	let status = this.checkParams();
	      	if(status){
	    		this.downloadTemplate();
	      	}
	      },
	    }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
$fontColor: #909399;
.el-tabs{
	border-top: 2px solid #e4e7ed;
	margin-left: 10px;
}
.formBox{
	.el-form-item{
		min-height: 97px;
	}
	.el-form-item__label{
		margin-right: 20px;
	}
	.tabBox{
		width: 730px;
	}
}
.select-options{
	max-width: 350px;
	white-space:nowrap;
	overflow:hidden; 
	text-overflow:ellipsis;
}
.btns-class{
	margin-top: 40px;
	width: 810px;
	.btns-wrap{
		width: 226px;
		margin: 0 auto;
	}
}
.fRight{
	float: right;
}
</style>
