<template>
  <div>
    <h3>选择服务包平台</h3>
    <div class="checkbox-wrap">
      <el-checkbox v-model="windowsFlat" label="Windows" border></el-checkbox>
      <el-checkbox v-model="linuxFlat" label="Linux" border class="label-right"></el-checkbox>
    </div>
    <el-button type="primary" @click="btnClickPush">下一步</el-button>
  </div>
</template>

<script>
	import Vue from 'vue'
	import { Checkbox, Message } from 'element-ui'
	Vue.use(Checkbox)
	export default {
	  data () {
	    return {
	      windowsFlat: true,
	      linuxFlat: false,
	    }
	  },
	  methods: {
	      btnClickPush(){
	      	if(!this.windowsFlat && !this.linuxFlat){
	      		return Message.error('请至少选择一个服务包平台!');
	      	}
	      	let status = this.windowsFlat ? (this.linuxFlat ? 3 : 1) : 2;
	      	this.$store.dispatch({
	            type: 'change_flat',
	            status: status
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
	width: 425px;
	margin: 50px auto;
}
.el-checkbox{
	width: 150px;
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
