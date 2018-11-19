	<template>
		<div>
			<div class="open-zip-box clearfix">
				<h3 class="open-zip-title">{{ title }}</h3>
				<label id="realBtn" class="btn">
					<input type="file" class="hide-inputs" id="openZip" name="file" accept="application/zip" @change='openZip()'>
					<span class="openZip">打开</span>
				</label>
			</div>
			<el-card class="box-card">
				<div slot="header">
					<span>基本信息</span>
				</div>
				<div>
					<el-form ref="basic" label-width="100px">
						<el-form-item label="应用名">
							<el-input v-model="packageJson.name"></el-input>
						</el-form-item>
						<el-form-item label="版本信息">
							<el-input v-model="packageJson.version"></el-input>
						</el-form-item>
						<el-form-item label="配置版本信息">
							<el-input v-model="packageJson['config-version']" readonly></el-input>
						</el-form-item>
						<el-form-item v-if="!isEdit" label="路径" class="input-type-file multiple-file">
							<p class="show-file-name">{{wzipName}}</p>
							<el-input readonly></el-input>
							<label class="btn multiple-file-label">
								<input type="file" class="hide-inputs" @change='addLocalFiles()' webkitdirectory directory multiple id="dir_input" name="file">
								<span class="openZip">选择文件</span>
							</label>
						</el-form-item>
						<el-form-item label="应用描述">
							<el-input rows="5" type="textarea" v-model="packageJson.description"></el-input>
						</el-form-item>
					</el-form>
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header">
					<span>用户信息</span>
				</div>
				<div>
					<el-form ref="userForm" label-width="100px">
						<el-form-item label="发布人">
							<el-input v-model="packageJson.author.name"></el-input>
						</el-form-item>
						<el-form-item label="组织结构">
							<el-input v-model="packageJson.author.organization"></el-input>
						</el-form-item>
						<el-form-item label="联系电话">
							<el-input v-model="packageJson.author['contact-phone']"></el-input>
						</el-form-item>
						<el-form-item label="电子邮件">
							<el-input v-model="packageJson.author['contact-email']"></el-input>
						</el-form-item>
						<el-form-item label="通信地址">
							<el-input v-model="packageJson.author['contact-address']"></el-input>
						</el-form-item>
					</el-form>
				</div>
			</el-card>


			<el-card class="box-card">
				<div slot="header">
					<span>执行脚本</span>
				</div>
				<div>
					<el-tabs class="scripts-card" type="border-card" v-model="flatTab">
						<el-tab-pane v-if="windowsFlat" label="Windows" name="windows">
							<el-row :gutter="20">
								<el-col :span="6">
									<div class="scripts-box">
										<div class="scripts-title">脚本库</div>
										<ul class="scripts-ul input-type-file">
											<li v-for="item in scriptsListWindows">
												<p @click="addScript(item)">{{item.name}}</p>
											</li>
											<li v-for="item in localScriptsListWindows">
												<p @click="addScript(item)">{{item.name}}</p>
											</li>
											<label class="btn">
												<input type="file" class="hide-inputs" @change='addLocalScript(1)' id="win_script_input" name="file">
												<span class="openZip">选择文件</span>
											</label>
										</ul>
									</div>
								</el-col>
								<el-col :span="18">
									<div class="scripts-choosen-box">
										<div class="scripts-choosen-title">
											<span>文件名</span>
											<span>脚本描述</span>
											<span>操作</span>
										</div>
										<div class="scripts-choosen clearfix" v-for="step in scriptSteps">
											<div class="scripts-steps">{{step.name}}</div>

											<div class="scripts-files">
												<div v-for="(file, index) in script.windows[step.key]" class="file-item clearfix" v-dragging="{ item: file, list: script.windows[step.key], group: `${step.key}win` }" :key="`${file.name}${step.key}${index}win`">
													<p class="scripts-files-name">{{file.name}}</p>
													<p class="scripts-files-desc">{{file.desc}}</p>
													<p class="scripts-files-operate">
														<span @click="scriptsDelete(index, script.windows[step.key])">删除</span>
														<span @click="scriptsEdit(file, index, step.key)">修改</span>
													</p>
												</div>
											</div>
										</div>
									</div>
								</el-col>
							</el-row>
						</el-tab-pane>
						<el-tab-pane v-if="linuxFlat" label="Linux" name="linux">
							<el-row :gutter="20">
								<el-col :span="6">
									<div class="scripts-box">
										<div class="scripts-title">脚本库</div>
										<ul class="scripts-ul input-type-file">
											<li v-for="item in scriptsListLinux">
												<p @click="addScript(item)">{{item.name}}</p>
											</li>
											<li v-for="item in localScriptsListLinux">
												<p @click="addScript(item)">{{item.name}}</p>
											</li>
											<label class="btn">
												<input type="file" class="hide-inputs" @change='addLocalScript(2)' id="lin_script_input" name="file">
												<span class="openZip">选择文件</span>
											</label>
										</ul>
									</div>
								</el-col>
								<el-col :span="18">
									<div class="scripts-choosen-box">
										<div class="scripts-choosen-title">
											<span>文件名</span>
											<span>脚本描述</span>
											<span>操作</span>
										</div>
										<div class="scripts-choosen clearfix" v-for="step in scriptSteps">
											<div class="scripts-steps">{{step.name}}</div>

											<div class="scripts-files">
												<div v-for="(file, index) in script.linux[step.key]" class="file-item clearfix" v-dragging="{ item: file, list: script.linux[step.key], group: `${step.key}Lin` }" :key="`${file.name}${step.key}${index}Lin`">
													<p class="scripts-files-name">{{file.name}}</p>
													<p class="scripts-files-desc">{{file.desc}}</p>
													<p class="scripts-files-operate">
														<span @click="scriptsDelete(index, script.linux[step.key])">删除</span>
														<span @click="scriptsEdit(file, index, step.key)">修改</span>
													</p>
												</div>
											</div>
										</div>
									</div>
								</el-col>
							</el-row>
						</el-tab-pane>
					</el-tabs>
				</div>
			</el-card>

			<el-card class="box-card dependency-card">
				<div slot="header" class="clearfix">
					<span>依赖关系</span>
				</div>

				<el-collapse>
					<el-collapse-item v-for="item in dependencyArr" :key="item.id" :title="item.name">
						<el-table
							:data="packageJson[item.id]"
							style="width: 100%">
							<el-table-column
								prop="name"
								:label='item.app'
								width="180">
							</el-table-column>
							<el-table-column
								prop="version"
								label="版本号"
								width="180">
							</el-table-column>
							<el-table-column
								prop="description"
								label="描述"
								>
							</el-table-column>
							<el-table-column
								label="操作"
								width="80">
								<template slot-scope="scope">
									<el-button
										@click.native.prevent="deleteRow(scope.$index, packageJson[item.id])"
										type="text"
										size="small">
										删除
									</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div class="table-form-wrap">
						  <el-input :placeholder="item.placeholder" v-model="$data[item['form']]['name']" class="w140"></el-input>
						  <el-input placeholder="请填写版本号" v-model="$data[item['form']]['version']" class="w140"></el-input>
						  <el-input placeholder="请填写描述" v-model="$data[item['form']]['desc']" class="w315"></el-input>
						  <el-button type="text" size="small" class="addBtn" @click="addDependency(packageJson[item.id],$data[item['form']]['name'],$data[item['form']]['version'],$data[item['form']]['desc'])">添加</el-button>
						</div>
					</el-collapse-item>
				</el-collapse>
				<!-- <span class="basic_mirror">基础镜像选择</span>
				<el-select v-model="basicMirror" class="w140">
					<el-option label="mirror1" value="mirror1"></el-option>
					<el-option label="mirror2" value="mirror2"></el-option>
					<el-option label="mirror3" value="mirror3"></el-option>
				</el-select> -->
			</el-card>


<div class="btns-wrap">
	<el-button type="primary" @click="handleCancel">取消</el-button>
	<el-button type="primary" @click="handleSave" class="fRight">保存</el-button>
</div>
<!-- 弹出框 start-->
<el-dialog title="添加脚本" :visible.sync="dialogFormVisible" width="600px" class="script-dialog">
	<el-form :model="dialogScriptForm">
		<el-form-item label="文件名" label-width="120px">
			<el-input v-model="dialogScriptForm.name" readonly></el-input>
		</el-form-item>
		<el-form-item label="脚本描述" label-width="120px">
			<el-input v-model="dialogScriptForm.desc" ></el-input>
		</el-form-item>
		<el-form-item v-if="dialogShowCheckbox" label="添加至" label-width="120px">
			<el-checkbox-group v-model="dialogScriptForm.steps">
				<el-checkbox v-for="item in scriptSteps" :key="item.key" :label="item.key">{{item.name}}</el-checkbox>
			</el-checkbox-group>
		</el-form-item>
	</el-form>
	<div slot="footer" class="dialog-footer">
		<el-button @click="dialogFormVisible = false">取 消</el-button>
		<el-button type="primary" @click="addScriptSubmit">确 定</el-button>
	</div>
</el-dialog>
<!-- 弹出框 end-->
</div>
</template>

<script>
	import Vue from 'vue'
	import { mapGetters } from 'vuex'
	import { MessageBox, Message } from 'element-ui'
	import axios from 'axios';
	import JSZip from 'jszip';
	import saveAs from 'file-saver';
		//拖拽
		import VueDND from 'awe-dnd'
		Vue.use(VueDND)
		export default {
			data () {
				return {
					title: '服务打包',
					isEdit: false, // 是否为打开之前的zip文件，是 true ，否 false。
					windowsFlat: true,
					linuxFlat: false,
					dialogFormVisible: false,// 控制弹出框显示
					dialogShowCheckbox: true,// 控制弹出框中复选框显示（编辑时无需复选框）
					editFileToStep: null,// 记录在哪一步编辑执行脚本
					packageJson: { //保存的armc_package.json文件内容
						name: '',
						version: '',
						'config-version': 1,
						description: '',
						author: {
							name: '',
							organization: '',
							'contact-phone': '',
							'contact-email': '',
							'contact-address': ''
						},
						platforms: {
						},
						script:{
							windows:{
								'pre-install': [],
								'post-install': [],
								'pre-start': [],
								'start': [],
								'post-start': [],
								'pre-uninstall': [],
								'post-uninstall': []
							},
							linux:{
								'pre-install': [],
								'post-install': [],
								'pre-start': [],
								'start': [],
								'post-start': [],
								'pre-uninstall': [],
								'post-uninstall': []
							}
						},
						'start': 'LightLooping.jar',
						'start-args': '--port 11111',
						'dependency':[],
						'net-dependency':[],
						'engine':[]
					},
					dependencyArr: [{
						id: 'engine',
						name: '环境依赖',
						form: 'envForm',
						app: '依赖项',
						placeholder: '请填写依赖项'
					},{
						id: 'dependency',
						name: '本地依赖',
						form: 'localForm',
						app: '应用名',
						placeholder: '请填写应用名'
					},{
						id: 'net-dependency',
						name: '网络依赖',
						form: 'netForm',
						app: '应用名',
						placeholder: '请填写应用名'
					}],
					script:{
						windows:{
							'pre-install': [],
							'post-install': [],
							'pre-start': [],
							'start': [],
							'post-start': [],
							'pre-uninstall': [],
							'post-uninstall': []
						},
						linux:{
							'pre-install': [],
							'post-install': [],
							'pre-start': [],
							'start': [],
							'post-start': [],
							'pre-uninstall': [],
							'post-uninstall': []
						}
					},
					dialogScriptForm: {// 弹框表单，需要添加的脚本信息
						id: undefined,
						name: '',
						desc: '',
						steps: [],
					},
					flatTab: '',// 切换平台tab
					envForm: {// 环境依赖添加表单
						name: '',
						version: '',
						desc: '',
					},
					localForm: {// 本地依赖添加表单
						name: '',
						version: '',
						desc: '',
					},
					netForm: {// 网络依赖添加表单
						name: '',
						version: '',
						desc: '',
					},
					// basicMirror: 'mirror1',// 基础镜像
					scriptsListWindows:[// Windows脚本库
					],
					scriptsListLinux:[// Linux脚本库
					],
					localScriptsListWindows:[],// 本地选择的Windows脚本库
					localScriptsListLinux:[],// 本地选择的Linux脚本库
					scriptSteps:[// 执行脚本模块步骤array
					{
						key: 'pre-uninstall',
						name: '卸载前'
					},
					{
						key: 'post-uninstall',
						name: '卸载后'
					},
					{
						key: 'pre-install',
						name: '安装前'
					},
					{
						key: 'post-install',
						name: '安装后'
					},
					{
						key: 'pre-start',
						name: '启动前'
					},
					{
						key: 'start',
						name: '启动'
					},
					{
						key: 'post-start',
						name: '启动后'
					}
					],
					wzip: null,
					localScriptsWzip: [],// 缓存本地选择的执行脚本文件
					wzipName: '请选择文件',
				}
			},
			computed: {
			    ...mapGetters({
			      serviceFlat:'serviceFlatGetter',
			      winFlatBit:'winFlatBitGetter',
			      linuxFlatBit:'linuxFlatBitGetter',
			    })
			},
			created(){
				this.$dragging.$on('dragged', ({ value }) => {
				})
				const serviceFlat = this.serviceFlat;
				const winFlatBit = this.winFlatBit;
				const linuxFlatBit = this.linuxFlatBit;
				let _this = this;
				_this.windowsFlat = serviceFlat === 1 || serviceFlat === 3;
				_this.linuxFlat = serviceFlat === 2 || serviceFlat === 3;
				_this.flatTab = (_this.windowsFlat) ? 'windows' : 'linux';
				if(_this.windowsFlat){
					_this.packageJson.platforms['windows'] = _this.winFlatBit;
					_this.loadWinScripts();
				}
				if(_this.linuxFlat){
					_this.packageJson.platforms['linux'] = _this.linuxFlatBit;
					_this.loadLinuxScripts();
				}
			},
			methods: {
		    openZip(event){ //解压本地文件中的zip，获取其json文件的内容。
		    	let file = document.getElementById('openZip').files[0];
		    	let _this = this;
		    	if(file.name.indexOf('.zip')>=0){ 
		    		_this.wzip = new JSZip();
		    		_this.wzip.loadAsync(file)
		    		.then(function (zip) {
		    			let fileDir = '';
		    			for(let i in zip.files){
		    				fileDir = zip.files[i].name;
		    				break;
		    			}
		    			const fileDirStr = fileDir.split('/')[0];
		    			if(zip.file(`${fileDirStr}/armc_package.json`)){
		    				zip.file(`${fileDirStr}/armc_package.json`).async("string").then(function success(content) {
		    					_this.isEdit = true;
		    					let jsonContent = JSON.parse(content);
			                //新的打包文件新增package.json版本文件
			                _this.wzip.file(`${fileDirStr}/armc_package_v${jsonContent['config-version']}.json`, content);
			                for(let i in jsonContent.script){ //给script赋值，每一项附件增加id为"localFile"
			                	for(let x in jsonContent.script[i]){
			                		for(let j in jsonContent.script[i][x]){
			                			jsonContent.script[i][x][j] = {
			                				id: 'localFile',
			                				name: jsonContent.script[i][x][j]['name'].substring(14),
			                				desc: jsonContent.script[i][x][j]['description']
			                			}
			                		}
			                	}
			                }
			                _this.packageJson = jsonContent;
			                _this.packageJson['config-version'] = parseInt(_this.packageJson['config-version']) + 1;
			                _this.script = jsonContent.script;
			                _this.windowsFlat = (jsonContent.platforms.windows && jsonContent.platforms.windows.length>0);
			                _this.linuxFlat = (jsonContent.platforms.linux && jsonContent.platforms.linux.length>0);
			                if(_this.windowsFlat && _this.scriptsListWindows.length === 0){
			                	_this.loadWinScripts();
			                }
			                if(_this.linuxFlat && _this.scriptsListLinux.length === 0){
			                	_this.loadLinuxScripts();
			                }
			                _this.wzipName = fileDirStr;
			            }, function error(e) {

			            });
		    			}else{
		    				Message.error('所选解压文件中没有armc_package.json文件!');
		    			}
		    		}, function (e) {

		    		});
		    	}else{
		    		Message.error('请选择.zip文件!');
		    	}
		    },
			loadWinScripts(){//拉取服务器中windows执行脚本列表
				let _this = this;
				axios.get('/api/v1/default/scripts?platform=WINDOWS')
				.then(function (response) {
					if(response.status === 200){
						for(var i in response.data) {
							let obj = {id: i, name: response.data[i]}
							_this.scriptsListWindows.push(obj);
						}
					}
				})
				.catch(function (response) {
					console.log(response);
				});
			},
			loadLinuxScripts(){//拉取服务器中linux执行脚本列表
				let _this = this;
				axios.get('/api/v1/default/scripts?platform=LINUX')
				.then(function (response) {
					if(response.status === 200){
						for(var i in response.data) {
							let obj = {id: i, name: response.data[i]}
							_this.scriptsListLinux.push(obj);
						}
					}
				})
				.catch(function (response) {
					console.log(response);
				});
			},
			addLocalFiles(){
				var _this = this;
				var fileList = document.getElementById('dir_input').files;
				if(fileList && fileList.length){
					_this.wzip = new JSZip();
					_this.wzipName = fileList[0].webkitRelativePath.split('/')[0];
					for (let i = 0; i<fileList.length; i++) {
						let file = fileList[i];
						_this.wzip.file(file.webkitRelativePath, file)
					}
				}else{
					_this.wzip = null;
					_this.wzipName = '请选择文件';
				}
			},
			addLocalScript(i){
				let fileList =  i===1 ? document.getElementById('win_script_input').files
				: document.getElementById('lin_script_input').files;
				if(fileList && fileList.length){
					let file = {
						id: 'localFile',
						name: fileList[0].name,
					}
					if(i===1){
						this.localScriptsListWindows.push(file);
					}else{
						this.localScriptsListLinux.push(file);
					}
					this.localScriptsWzip.push(fileList[0]);
				}
			},
			scriptsDelete(index, arr){
				arr.splice(index, 1);
			},
			scriptsEdit(item, index, step){
				this.dialogScriptForm = {
					id: item.id,
					name: item.name,
					desc: item.desc,
				};
				this.editFileToStep = {step, index};
				this.dialogShowCheckbox = false;
				this.dialogFormVisible = true;
			},
			addScript(script){
				this.dialogScriptForm = {
					id: script.id,
					name: script.name,
					desc: '',
					steps: [],
				};
				this.dialogShowCheckbox = true;
				this.dialogFormVisible = true;
			},
			addScriptSubmit(){
				let _this = this;
				if(_this.dialogShowCheckbox && _this.dialogScriptForm.steps.length === 0){
					return Message.error('请选择添加至哪一步骤!');
				}
				let data = {
					id: _this.dialogScriptForm.id,
					name: _this.dialogScriptForm.name,
					desc: _this.dialogScriptForm.desc,
				}
				let flat = _this.flatTab;
				if(_this.dialogShowCheckbox){
					_this.dialogScriptForm.steps.map((item)=>{
						_this['script'][flat][item].push(data);
					})
				}else{
					_this['script'][flat][_this.editFileToStep.step][_this.editFileToStep.index] = data;
				}

				_this.dialogFormVisible = false;
			},
			deleteRow(index, rows) {
				rows.splice(index, 1);
			},
			addDependency(arr, name, version, description){
				let info = {name, version, description}
				arr.push(info);
			},
			handleCancel(){
				MessageBox.confirm('是否放弃当前编辑?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$router.push({ name: 'servicePackagingIndex' });
				}).catch(() => {

				});
			},
			handleSave(){
				this.packageJson.script = { //重置packageJson中的script
					windows:{
						'pre-install': [],
						'post-install': [],
						'pre-start': [],
						'start': [],
						'post-start': [],
						'pre-uninstall': [],
						'post-uninstall': []
					},
					linux:{
						'pre-install': [],
						'post-install': [],
						'pre-start': [],
						'start': [],
						'post-start': [],
						'pre-uninstall': [],
						'post-uninstall': []
					}
				};
				let _this = this;
				if(!_this.wzip){
					return Message.error('请选择本地文件路径!');
				}
				// 遍历选择的执行脚本文件 start
				let windowsScripts = _this.script.windows;
				let scriptsArr = [];
				let linuxScripts = _this.script.linux;
				for(let i in windowsScripts){
					for(let x in windowsScripts[i]){
						_this.packageJson.script.windows[i].push({name:`./armc_script/${windowsScripts[i][x]['name']}`, description:windowsScripts[i][x]['desc']});// 赋值执行脚本的name到package.json中
						if(windowsScripts[i][x]['id'] !== 'localFile'){
							scriptsArr.push(windowsScripts[i][x]['id']);// 将脚本id加入临时数组，用于去重后请求远程服务器下载
						}
					}
				}
				for(let j in linuxScripts){
					for(let y in linuxScripts[j]){
						_this.packageJson.script.linux[j].push({name:`./armc_script/${linuxScripts[j][y]['name']}`, description:linuxScripts[j][y]['desc']});// 赋值执行脚本的name到package.json中
						if(linuxScripts[j][y]['id'] !== 'localFile'){
							scriptsArr.push(linuxScripts[j][y]['id']);// 将脚本id加入临时数组，用于去重后请求远程服务器下载
						}
					}
				}
				let choosenScripts = _this.uniqueArr(scriptsArr);

				let promiseArr = [];
				for(let k in choosenScripts){
					let p = new Promise(function(resolve,reject){
						axios.get(`/api/v1/script/${choosenScripts[k]}/stream-content`)
						.then(function (response) {
							if(response.status === 200){
								_this.wzip.file(`${_this.wzipName}/armc_script/${response.data.fileName}`, response.data.fileContent, {base64: true});
						    	// _this.wzip.file(`armc_script/${response.data.fileName}`, 'c3RhcnQgbXlzcWw=', {base64: true});
						    	resolve('ok');
						    }
						})
						.catch(function (response) {
							console.log(response);
							reject('err');
						});
					})
					promiseArr.push(p);
				}

				// 遍历选择的执行脚本文件 end
				Promise.all(promiseArr).then((result) => {
					_this.localScriptsWzip.map((item)=>{
						_this.wzip.file(`${_this.wzipName}/armc_script/${item.name}`, item)
					})
					_this.wzip.file(`${_this.wzipName}/armc_package.json`, JSON.stringify(_this.packageJson));
					_this.wzip.generateAsync({type:"blob"})
					.then(function (content) {
						saveAs(content, `${_this.wzipName}.zip`);
					}); 
				}).catch((error) => {
					console.log(error)
				})
			},
			uniqueArr(arr){// 数组去重
				return Array.from(new Set(arr)); 
			},
			formatJson(json, options) { // 格式化json字符串，不清楚有无操作平台兼容bug，暂时不使用
                 var formatted = '',     //转换后的json字符串
	             padIdx = 0,         //换行后是否增减PADDING的标识
	             PADDING = '    ';   //4个空格符
		         /**
		          * 将对象转化为string
		          */
		          if (typeof json !== 'string') {
		          	json = JSON.stringify(json);
		          }
		          json = json.replace(/([\{\}])/g, '\r\n$1\r\n')
		          .replace(/([\[\]])/g, '\r\n$1\r\n')
		          .replace(/(\,)/g, '$1\r\n')
		          .replace(/(\r\n\r\n)/g, '\r\n')
		          .replace(/\r\n\,/g, ',');
		         /** 
		          * 根据split生成数据进行遍历，一行行判断是否增减PADDING
		          */
		          (json.split('\r\n')).forEach(function (node, index) {
		          	var indent = 0,
		          	padding = '';
		          	if (node.match(/\{$/) || node.match(/\[$/)) indent = 1;
		          		else if (node.match(/\}/) || node.match(/\]/))  padIdx = padIdx !== 0 ? --padIdx : padIdx;
		          		else    indent = 0;
		          		for (var i = 0; i < padIdx; i++)    padding += PADDING;
		          			formatted += padding + node + '\r\n';
		          		padIdx += indent;
		          		console.log('index:'+index+',indent:'+indent+',padIdx:'+padIdx+',node-->'+node);
		          	});
		          return formatted;
		      }
		  }
		}
	</script>

	<!-- Add "scoped" attribute to limit CSS to this component only -->
	<style lang="scss">
	$gray: #909399;
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
	.open-zip-box{
		width: 800px;
		height: 35px;
		margin: 0 auto;

		.open-zip-title{
			float: left;
			margin: 0;
			height: 35px;
			line-height: 35px;
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
		}
	}
	.hide-inputs{
		left:-9999px;
		position:absolute;
	}
	.input-type-file{
		position: relative;
		.show-file-name{
			margin: 0;
			position: absolute;
			z-index: 999;
			left: 15px;
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
			font-size: 14px;
			padding: 6px;
			border-radius: 4px;
			margin-right: 10px;
		}
	} 
	.multiple-file{
		.multiple-file-label{
			position: absolute;
			top: 4px;
			right:3px;
		}
	}
	.box-card {
		width: 800px;
		margin: 10px auto 30px;
	}
	.scripts-card{
		min-height: 640px;

		.scripts-box{
			min-height: 550px;
			margin: 5px;
			border: 1px solid $gray;
			text-align: center;

			.scripts-ul{
				list-style: none;
				padding: 0;
				li{
					cursor: pointer;
					font-size: 14px;
					&:hover{
						color: #409EFF;
					}
				}
			}
			.scripts-title{
				height: 40px;
				line-height: 40px;
				width: 90%;
				margin: 0 auto;
				font-size: 14px;
				font-weight: 700;
				border-bottom: 1px solid $gray;
				color: $gray;
			}
		}	

		.scripts-choosen-box{
			border: 1px solid $gray;
			min-height: 550px;
			margin-top: 5px;

			.scripts-choosen-title{
				height: 40px;
				line-height: 40px;
				font-size: 14px;
				font-weight: 700;
				color: $gray;
			}
			.scripts-choosen-title span{
				margin-left: 100px;
			}
			.scripts-choosen{
				margin-bottom: 10px;

				.scripts-steps{
					width: 90px;
					text-indent: 20px;
					font-size: 15px;
					margin-top: 10px;
					float: left;
				}
				.scripts-files{
					padding: 5px;
					min-height: 50px;
					font-size: 14px;
					width: 420px;
					float: left;
					border: 1px solid $gray;
					p{
						margin: 3px 0;
						float: left;
					}
					.scripts-files-name{
						width: 140px;
						margin-right: 10px;
						word-wrap: break-word;
					}
					.scripts-files-desc{
						width: 150px;
						margin-right: 10px;
						word-wrap: break-word;
					}
					.scripts-files-operate{
						width: 90px;
						span{
							cursor: pointer;
							&:hover{
								color: #409EFF;
							}
						}
					}
					.file-item{
						&:hover{
							background-color: #ecf5ff;
						}
					}
				}
			}
		}
	}

	.el-form-item {
		margin-bottom: 15px;
	}
	.el-input__inner{
		height: 34px;
	}
	.el-card__header{
		color: $gray;
		font-weight: 700;
	}
	.el-form-item__label, .el-form-item__content, .el-input__inner{
		line-height: 34px;
	}
	.file-input{
		input{
			line-height: 32px;
		}
	}
	.dependency-card{
		.el-card__body{
			padding-top: 0;
		}
		.el-collapse{
			border-top-width: 0;
		}
		.el-collapse-item__wrap{
			padding-left: 5px;
			border-top: 1px solid #ebeef5;
		}
		.el-collapse-item__header{
			color: $gray;
			text-indent: 5px;
			font-size: 15px;
			font-weight: 700;
		}
	}
	.table-form-wrap{
		margin-top: 20px;
	}
	.w140{
		width: 140px;
		margin-right: 38px;
	}
	.w315{
		width: 280px;
	}
	.fRight{
		float: right;
	}
	.addBtn{
		margin-left: 38px;
	}
	.basic_mirror{
		display: inline-block;
		height: 68px;
		line-height: 68px;
		font-size: 15px;
		font-weight: 700;
		color: $gray;
		margin: 0 20px 0 4px;
	}
	.btns-wrap{
		width: 226px;
		margin: 0 auto;
	}
	.script-dialog{
		.el-input{
			width: 400px;
		}
		.el-checkbox{
			width: 80px;
			margin-right: 30px;
			margin-left: 0;
		}
	}
</style>
