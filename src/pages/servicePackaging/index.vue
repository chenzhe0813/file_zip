<template>
  <div>
    <h3>选择服务包平台</h3>
    <div class="checkbox-wrap">
      <el-checkbox v-model="windowsFlat32" label="Windows x86(32位)" border></el-checkbox>
      <el-checkbox v-model="linuxFlat32" label="Linux x86(32位)" border class="label-right"></el-checkbox>
    </div>
    <div class="checkbox-wrap">
      <el-checkbox v-model="windowsFlat64" label="Windows x64(64位)" border></el-checkbox>
      <el-checkbox v-model="linuxFlat64" label="Linux x64(64位)" border class="label-right"></el-checkbox>
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
	      windowsFlat32: true,
	      windowsFlat64: false,
	      linuxFlat32: false,
	      linuxFlat64: false,
	    }
	  },
	  methods: {
	      btnClickPush(){
	      	if(!this.windowsFlat32 && !this.windowsFlat64 && !this.linuxFlat32 && !this.linuxFlat64){
	      		return Message.error('请至少选择一个服务包平台!');
	      	}
	      	let windowsFlat = this.windowsFlat32 || this.windowsFlat64;
	      	let linuxFlat = this.linuxFlat32 || this.linuxFlat64;
	      	let status = windowsFlat ? (linuxFlat ? 3 : 1) : 2;
	      	let winFlatBit = [], linuxFlatBit = [];
	      	if(this.windowsFlat32){
	      		winFlatBit.push('32bit');
	      	}
	      	if(this.windowsFlat64){
	      		winFlatBit.push('64bit');
	      	}
	      	if(this.linuxFlat32){
	      		linuxFlatBit.push('32bit');
	      	}
	      	if(this.linuxFlat64){
	      		linuxFlatBit.push('64bit');
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
.checkbox-wrap{
	width: 465px;
	margin: 30px auto;
}
.el-checkbox{
	width: 180px;
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
