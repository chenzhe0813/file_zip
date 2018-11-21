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
					max-height="250"
					:header-cell-style="cellStyle"
					:cell-style="cellStyle">
					<el-table-column
						v-for="item in $data[card.type]"
						:key="item.prop"
						:prop="item.prop"
						:label="item.label">
					</el-table-column>
					<el-table-column
						label="操作"
						width="80">
						<template slot-scope="scope">
							<el-button
								@click.native.prevent="deleteRow(scope.$index, $data[card.data])"
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
			<el-form :model="$data[dialogInfo.form]">
				<el-form-item v-for="item in $data[dialogInfo.type]" :key="item.prop" :label="item.label" label-width="120px">
					<el-input v-model="$data[dialogInfo.form][item.prop]" class="dialog-input"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addItemSubmit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
	   data() {
	      return {
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
	        },{
	        	name: '插件类型',
	        	data: 'pluginType',
	        	type: 'tempOrPlugTypeList',
	        	form: 'tempOrPlugTypeForm',
	        }],
	        // 表格数据
	        lang: [{
	          name: 'JAVA',
	        }, {
	          name: 'C++',
	        }],
	        serviceType: [{
	          name: '主题',
	        }, {
	          name: '信息',
	        }],
	        funcType: [{
	          name: '负载均衡',
	        }, {
	          name: '注册发现',
	        }],
	        cellStyle:{
	        	'text-align': 'center'
	        },
	        dialogFormVisible: false,
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
	        tempOrPlugTypeList: [{
        		prop: 'lang',
        		label: '开发语言'
        	},{
        		prop: 'flat',
        		label: '平台'
        	},{
        		prop: 'serviceType',
        		label: '服务类别'
        	},{
        		prop: 'funcType',
        		label: '功能类别'
        	},{
        		prop: 'templateName',
        		label: '模板名字'
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
        	},
	        dialogInfo: {
	        	data: '',
	        	name: '',
	        	type: '',
	        	form: '',
	        },
	      }
	    },
	    methods: {
	      onSubmit() {
	        console.log('submit!');
	      },
	      handleClick(tab, event) {
	        console.log(tab, event);
	      },
	      deleteRow(index, rows) {
	        rows.splice(index, 1);
	      },
	      addItem(item) {
	      	this.dialogInfo = {
	      		data: item.data,
	      		name: item.name,
	      		type: item.type,
	      		form: item.form
	      	}
			this.dialogFormVisible = true;
	      },
	   	  addItemSubmit(){
	   	  	let form = this.dialogInfo.form;
	   	  	console.log(this.$data[form]);
			this.dialogFormVisible = false;
		  },
	    }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.template-admin{
	.box-card {
		width: 1000px;
		margin: 10px 50px 30px;
	}
	.addItemBtn{
		float: right;
		margin-top: -3px;
	}
	.dialog-input{
		width: 340px;
	}
}
</style>
