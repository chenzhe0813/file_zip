<template>
	<div class="template-admin">
		<el-card v-for="card in cards" class="box-card" :key="card.data">
			<div slot="header">
				<span>{{card.name}}</span>
				<el-button type="primary" @click="addItem" class="addItemBtn" size="small">添加</el-button>
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
	        	table:[{
	        		prop: 'name',
	        		label: '语言类种'
	        	}]
	        },{
	        	name: '服务类别',
	        	data: 'serviceType',
	        	table:[{
	        		prop: 'name',
	        		label: '服务类别'
	        	}]
	        },{
	        	name: '功能类别',
	        	data: 'funcType',
	        	table:[{
	        		prop: 'name',
	        		label: '功能类别'
	        	}]
	        },{
	        	name: '模板类型',
	        	data: 'templateType',
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
	        }
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
	      addItem() {

	      }
	    }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.template-admin{
	.box-card {
		width: 800px;
		margin: 10px 50px 30px;
	}
	.addItemBtn{
		float: right;
		margin-top: -3px;
	}
}
</style>
