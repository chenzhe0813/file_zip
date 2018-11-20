<template>
	<div>
	  <el-form ref="form" :model="form" label-width="80px" class="formBox">
		<el-form-item label="选择语言">
		    <el-select v-model="form.lang" placeholder="请选择开发语言">
		      <el-option label="Java" value="1"></el-option>
		      <el-option label="C++" value="2"></el-option>
		      <el-option label="C#" value="3"></el-option>
		    </el-select>
		</el-form-item>
		<el-form-item label="选择平台">
		    <el-radio-group v-model="form.flat">
		      <el-radio label="32" border size="medium">x86（32位）</el-radio>
		      <el-radio label="64" border size="medium">x64（64位）</el-radio>
		    </el-radio-group>
	    </el-form-item>
	  	<el-form-item label="选择主题">
		    <el-select v-model="form.type" placeholder="请选择开发语言">
		      <el-option class="select-options" label="主题微服务（描述描述描述描述描述描述描述描述描述）" title="主题微服务（描述描述描述描述描述描述描述描述描述）" value="1"></el-option>
		      <el-option label="222" value="2"></el-option>
		      <el-option label="333" value="3"></el-option>
		    </el-select>
		</el-form-item>
	  	<el-form-item label="选择功能">
		    <el-select v-model="form.func" placeholder="请选择开发语言">
		      <el-option label="444" value="1"></el-option>
		      <el-option label="555" value="2"></el-option>
		      <el-option label="666" value="3"></el-option>
		    </el-select>
		</el-form-item>
	  	<el-form-item label="选择模式">
			<el-tabs v-model="modeTab" class="tabBox" @tab-click="handleClick">
			    <el-tab-pane label="向导模式" name="guide">
		    		<el-input rows="15" type="textarea" v-model="form.desc"></el-input>
			    </el-tab-pane>
			    <el-tab-pane label="插件模式" name="plug">
		    		<el-input rows="15" type="textarea" v-model="form.desc"></el-input>
			    </el-tab-pane>
		 	</el-tabs>
		</el-form-item>

	  </el-form>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
	   data() {
	      return {
	        form: {
	          lang: '1',
	          type: '1',
	          flat: '32',
	          desc: '',
	        },
	        modeTab: 'guide',
	      }
	    },
	    methods: {
	      onSubmit() {
	        console.log('submit!');
	      },
	      handleClick(tab, event) {
	        console.log(tab, event);
	      }
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
		height: 97px;
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
</style>
