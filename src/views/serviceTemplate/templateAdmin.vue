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
						v-for="item in card.table"
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
		<el-dialog :title="dialogInfo.name" :visible.sync="dialogFormVisible1" width="600px" class="script-dialog">
			<el-form :model="dialogForm1">
				<el-form-item :label="dialogForm1.label" label-width="120px">
					<el-input v-model="dialogForm1.data" class="dialog-input"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="addItemSubmit1">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog :title="dialogInfo.name" :visible.sync="dialogFormVisible2" width="600px" class="script-dialog">
			<el-form :model="dialogForm2">
				<el-form-item label="文件名" label-width="120px">
					<el-input v-model="dialogForm2.data" class="dialog-input"></el-input>
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
	export default {
	   data() {
	      return {
	        title: '服务管理',
	        cards:[{
	        	name: '开发语言',
	        	data: 'lang',
	        	type: 'single',
	        	table:[{
	        		prop: 'name',
	        		label: '语言类种'
	        	}]
	        },{
	        	name: '服务类别',
	        	data: 'serviceType',
	        	type: 'single',
	        	table:[{
	        		prop: 'name',
	        		label: '服务类别'
	        	}]
	        },{
	        	name: '功能类别',
	        	data: 'funcType',
	        	type: 'single',
	        	table:[{
	        		prop: 'name',
	        		label: '功能类别'
	        	}]
	        },{
	        	name: '模板类型',
	        	data: 'templateType',
	        	type: 'multiple',
	        	table:[{
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
	        	}]
	        },{
	        	name: '插件类型',
	        	data: 'pluginType',
	        	type: 'multiple',
	        	table:[{
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
	        	}]
	        }],
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
	        dialogFormVisible1: false,
	        dialogForm1: {
	        	label: '',
	        	data: '',
	        },
	        dialogFormVisible2: false,
	        dialogForm2: {
	        	data: '',
	        },
	        dialogInfo: {
	        	data: '',
	        	name: '',
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
	      		name: item.name
	      	}
	      	if(item.type === 'multiple'){
				this.dialogForm2 = {
					data: '',
				};
				this.dialogFormVisible2 = true;
	      	}else{
				this.dialogForm1 = {
					label: item.table[0].label,
					data: '',
				};
				this.dialogFormVisible1 = true;
	      	}
	      },
	   	  addItemSubmit1(){
			_this.dialogFormVisible1 = false;
		  },
	   	  addItemSubmit2(){
			_this.dialogFormVisible2 = false;
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
