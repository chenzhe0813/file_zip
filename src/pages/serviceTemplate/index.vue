<template>
  <el-form ref="form" :model="form" label-width="80px">
  	<el-row :gutter="20">
	  <el-col :span="8">
		<el-form-item label="开发语言">
		    <el-select v-model="form.lang" placeholder="请选择开发语言">
		      <el-option label="Java" value="1"></el-option>
		      <el-option label="C++" value="2"></el-option>
		      <el-option label="C#" value="3"></el-option>
		    </el-select>
		</el-form-item>
	  </el-col>
	  <el-col :span="8">
	  	<el-form-item label="服务类别">
		    <el-select v-model="form.type" placeholder="请选择开发语言">
		      <el-option label="111" value="1"></el-option>
		      <el-option label="222" value="2"></el-option>
		      <el-option label="333" value="3"></el-option>
		    </el-select>
		</el-form-item>
	  </el-col>
	  <el-col :span="8">
	  	<el-form-item label="功能选择">
		    <el-select v-model="form.func" placeholder="请选择开发语言">
		      <el-option label="444" value="1"></el-option>
		      <el-option label="555" value="2"></el-option>
		      <el-option label="666" value="3"></el-option>
		    </el-select>
		</el-form-item>
	  </el-col>
	</el-row>

	<el-tabs v-model="modeTab" @tab-click="handleClick">
	    <el-tab-pane label="向导模式" name="guide">
    		<el-input rows="15" type="textarea" v-model="form.desc"></el-input>
	    </el-tab-pane>
	    <el-tab-pane label="插件模式" name="plug">
    		<el-input rows="15" type="textarea" v-model="form.desc"></el-input>
	    </el-tab-pane>
 	</el-tabs>
  </el-form>
</template>

<script>
	import Vue from 'vue'
	export default {
	   data() {
	      return {
	        form: {
	          lang: '1',
	          type: '1',
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
<style scoped>
.el-tabs{
	border-top: 2px solid #e4e7ed;
	margin-top: 50px;
	margin-left: 10px;
}
</style>
