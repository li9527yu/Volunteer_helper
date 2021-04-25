<template>
	<view class="content">
		<view class="Info">
			<uni-row>
				<uni-col><text class="tips">修改信息</text></uni-col>
			</uni-row>
			<uni-forms>
				<!-- 姓名 -->
			   <uni-forms-item label="姓名:">					
			        <uni-easyinput  :disabled="changeStatus":inputBorder="false" clearable v-model="info.name" placeholder="请输入您的名字" ></uni-easyinput>
			    </uni-forms-item>
				<!-- 性别 -->
				<uni-forms-item label="性别:">
				    <uni-data-checkbox selectedColor="#ff0000" mode="tag" v-model="value" :localdata="range" @change="onChange()"></uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item label="出生日期:">
				    <uni-datetime-picker type="date" :value="date" start="1900-6-15" end="2035-6-15" @change="dateChange"></uni-datetime-picker>
				</uni-forms-item>
				<uni-forms-item label="上传照片">
						<uni-file-picker 
						    v-model="imageValue" 
						    fileMediatype="image" 
						    mode="grid" 
							:auto-upload="false"
						    @select="select" 
						    @progress="progress" 
						    @success="success" 
						    @fail="fail"
							limit="1"
						/>
				</uni-forms-item>
				

			</uni-forms> 		
			<!-- 选择地区 -->	
					
		</view>
		<view class="InfoConfirm">
				<button @click="changeInfo" class="confirmButton" type="warn" >{{infoStatus}}</button>
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js';//需要引入store
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var QQMapWX = require('../../static/js/qqmap-wx-jssdk.js');
	var qqmapsdk;
	export default{
		data(){
			return{
				flag:false,
				changeStatus:true,
				info:{
					radio:0,
					name:'',
					phone:'',
					picture:'',
					uid:'',
					birthday:'',
				},
				date:'',
				value: 0,
				range: [{"value": 0,"text": "男士"    },{"value": 1,"text": "女士"}],
				imageValue:[],
			}
		},
		computed:{
			...mapState(['name','token','gender','picture','birthday','uid']),
			infoStatus:function(){
				return this.flag?`完成`:`修改信息`
			},
			
		},
		created() {
			qqmapsdk = new QQMapWX({
			            key: 'QV7BZ-6M76X-TFL4M-TGKDY-FFC76-VJF7O'
			        });
			this.info.name=this.name;
			this.info.radio=this.gender;
			this.info.birthday=this.birthday;
			this.date=this.birthday;
			this.info.name=this.name;
			this.value=this.gender;
			this.info.uid=this.uid;
			this.info.picture=this.picture
			var imageItem= {
				name:"userImage",
				extname:"png",
				url:this.picture,
			}
			this.imageValue.splice(0,0,imageItem)
		},
		methods:{
			dateChange(value){
				// console.log(value)
				this.info.birthday=`${value}`;
			},
			 // 获取上传状态
			select(e){
				var that=this;
				// console.log('选择文件：',e)
				var path=e.tempFilePaths;
				var token=`Bearer ${this.token}`;
				uni.uploadFile({
					url:'https://fwwb2020-proxy-slk.tgucsdn.com/file/upload',
					header:{
						"Authorization":token,
						"Content-Type": "multipart/form-data"
					},
					filePath:path[0],
					name:'photo',
						success: (res) => {
							// console.log(res.data)
							var data=JSON.parse(res.data)
							console.log(data)
							if(data.status==202){
								// var data=JSON.parse(res.data);
								// console.log(data)
								that.info.picture=data.data.url;
							}
							console.log(that.info)
							
							
						},
						fail: (err) => {
							console.log(err)
						}
				})
			
			},
			onChange(event) {
				console.log(event.detail)
				this.info.radio=event.detail.value
				// console.log(this.info.radio)
			},
			changeInfo(){
				var that=this;
				var token=`Bearer ${this.token}`;
				console.log(this.info)
				if(this.flag){
					console.log(this.info)
					if (!this.info.name) {
						uni.showToast({
							mask:true,
							image:'../../static/img/error.png',
							icon: 'none',
							title: '请填写姓名'
						});
						return;
					}
					
					if (!this.info.birthday) {
						uni.showToast({
							mask:true,
							image:'../../static/img/error.png',
							icon: 'none',
							title: '请填写出生日期'
						});
						return;
					}
					if (this.imageValue.length==0) {
						uni.showToast({
							mask:true,
							image:'../../static/img/error.png',
							icon: 'none',
							title: '请上传照片'
						});
						return;
					}
					uni.request({
						url:'https://fwwb2020-proxy-slk.tgucsdn.com/user/changeUser',
						method:'POST',
						header:{
							"content-type":"application/json",
							"Authorization":token,
						},
						data:{
							gender:that.info.radio,
							name:that.info.name,
							picture:that.info.picture,
							uid:that.info.uid,
							birthday:that.info.birthday,
						},
						success: (res) => {
							console.log(res.data)
							if(res.data.status==200){
								uni.showToast({
									title:'修改成功',
									icon:'none',
									mask:true,
									image:'../../static/img/success.png'
								})
								var data=res.data.data;
								data.token=that.token;
								console.log(data);
								store.commit("login",res.data.data)
								setTimeout(function(){
									uni.switchTab({
										url:"./person"
									})
								},1000)
								// console.log(res.data)
								
							}else{
								uni.showToast({
									title:`${res.data.msg}`,
									icon:'none',
									mask:true,
									image:'../../static/img/error.png'
								})	
							}
						},
						fail: (err) => {
							uni.showToast({
								title:'修改失败！',
								icon:'none',
								mask:true,
								image:'../../static/img/error.png'
							})
						}
					})
				 }
				else{
					this.flag=true
					this.changeStatus=false
				}
			}
	},
	}
</script>

<style>
	.content{
		flex-direction: column;
		padding-top: 5%;
	}
	
	.Info{
		flex:1;
		width: 90%;
		display: flex;
		margin: 10px auto;
		padding: 15px;
		flex-direction: column;
		border: 1px solid #eeefeb;
		border-radius: 20px;
	}
	.InfoConfirm{
		flex:1;
		width: 80%;
		margin: 10px auto;
	}
	.tips{
		font-size: 16px;
		font-weight: 600;
		margin-bottom: 20px;
	}
	.confirmButton{
		width: 100%;
	}
	.formRow{
		width: 100%;
		flex: 1;
		margin-bottom: 5px;
		/* border: 1px solid #000000; */
	}
	
	.text{
		/* height: 44px; */
		line-height: 44px;
		font-size: 14px;
		margin: 0 auto;
		color: #646566;
	}
	.Sextext{
		line-height: 20px;
		font-size: 14px;
		color: #646566;
	}
	.selectOne{
		font-size: 14px;
	}
	.selectCity{
		width: 100%;
		line-height: 44px;
		font-size: 14px;
		font-weight: 300;
		text-align: center;
		
	}
</style>
