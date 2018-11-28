<template>
  <div>
    <h3>{{ title }}</h3>
    <!-- <div class="checkbox-wrap">
      <el-checkbox v-model="windowsFlat32" label="Windows x86(32位)" border></el-checkbox>
      <el-checkbox v-model="linuxFlat32" label="Linux x86(32位)" border class="label-right"></el-checkbox>
    </div>
    <div class="checkbox-wrap">
      <el-checkbox v-model="windowsFlat64" label="Windows x64(64位)" border></el-checkbox>
      <el-checkbox v-model="linuxFlat64" label="Linux x64(64位)" border class="label-right"></el-checkbox>
    </div> -->

	<div class="box-wrapper clearfix">
	    <div class="checkbox-box floatLeft">
	      <el-checkbox v-model="windowsFlat" label="Windows" border></el-checkbox>
	      <div>
		      <div class="radio-box">
		      	<el-radio :disabled="!windowsFlat" v-model="windowsFlatBit" label="32bit">x86(32位)</el-radio>
				<el-radio :disabled="!windowsFlat" v-model="windowsFlatBit" label="64bit">x64(64位)</el-radio>
		      </div>
	      </div>
	    </div>
	    <div class="checkbox-box floatRight">
	      <el-checkbox v-model="linuxFlat" label="Linux" border></el-checkbox>
	      <div>
		      <div class="radio-box">
		      	<el-radio :disabled="!linuxFlat" v-model="linuxFlatBit" label="32bit">x86(32位)</el-radio>
	    		<el-radio :disabled="!linuxFlat" v-model="linuxFlatBit" label="64bit">x64(64位)</el-radio>
		      </div>
		  </div>
	    </div>
	</div>
    <el-button type="primary" @click="btnClickPush">下一步</el-button>
  </div>
</template>

<script>
	import Vue from 'vue'
	import { Message } from 'element-ui'
	export default {
	  data () {
	    return {
	      title: '选择服务包平台',
	      windowsFlat: true,
	      linuxFlat: false,
	      windowsFlatBit: '32bit',
	      linuxFlatBit: '32bit',
	      // windowsFlat32: true,
	      // windowsFlat64: false,
	      // linuxFlat32: false,
	      // linuxFlat64: false,
	    }
	  },
	  methods: {
	      btnClickPush(){
	      	if(!this.windowsFlat && !this.linuxFlat){
	      		return Message.error('请至少选择一个服务包平台!');
	      	}
	      	let status = this.windowsFlat ? (this.linuxFlat ? 3 : 1) : 2;
	      	let winFlatBit = '', linuxFlatBit = '';
	      	if(this.windowsFlat){
	      		winFlatBit = this.windowsFlatBit;
	      	}
	      	if(this.linuxFlat){
	      		linuxFlatBit = this.linuxFlatBit;
	      	}
	      	this.$store.dispatch({
	            type: 'change_flat',
	            status: status
	        });
	        this.$store.dispatch({
	            type: 'change_win_flat_bit',
	            winFlatBit: winFlatBit
	        });
	        this.$store.dispatch({
	            type: 'change_linux_flat_bit',
	            linuxFlatBit: linuxFlatBit
	        });
	        this.$router.push({ name: 'servicePackaging' });
	      },
	  }
	}
</script>

<style scoped>
h3{
	margin-left: 50px;
}
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
.checkbox-wrap{
	width: 465px;
	margin: 30px auto;
}
.box-wrapper{
	width: 400px;
	margin: 30px auto;
}
.floatLeft{
	float: left;
}
.floatRight{
	float: right;
}
.radio-box{
	float: right;
	width: 90px;
}
.el-checkbox{
	width: 150px;
}
.el-radio{
	margin-top: 10px;
	margin-left: 0!important;
}
.label-right{
	float: right;
}
.el-button{
	display: block;
	margin: 0 auto;
	padding-left: 25px;
	padding-right: 25px;
}
</style>
