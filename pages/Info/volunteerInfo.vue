<template>
	<view class="content">
		<view class="Info">
			<uni-row>
				<uni-col><text class="tips">为了注册成为志愿者，请您填写下列信息：</text></uni-col>
			</uni-row>
			<uni-forms>
				<!-- 姓名 -->
			   <uni-forms-item label="姓名:">					
			        <uni-easyinput :inputBorder="false" clearable v-model="info.name" placeholder="请输入您的名字" ></uni-easyinput>
			    </uni-forms-item>
				<uni-forms-item label="性别:">
				    <uni-data-checkbox selectedColor="#ff0000" mode="tag" v-model="value" :localdata="range" @change="onChange()"></uni-data-checkbox>
				</uni-forms-item>
				<!-- 职业 -->
				<uni-forms-item label="职业:">
				    <uni-easyinput :inputBorder="false" clearable v-model="info.profession" placeholder="请输入您的职业" ></uni-easyinput>
				</uni-forms-item>
				<!-- 电话 -->
				<uni-forms-item label="电话:">
						<uni-easyinput :inputBorder="false" clearable v-model="info.tel" placeholder="请输入您的电话号码" ></uni-easyinput>
				</uni-forms-item>
				<!-- 交通工具 -->
			    <uni-forms-item label="交通工具:">
			        <uni-easyinput type="text" :inputBorder="false" clearable v-model="info.transportation" placeholder="请输入您常用的交通工具" ></uni-easyinput>
			    </uni-forms-item>
				<!-- 常驻位置 -->
				<uni-forms-item label="常驻位置:">
					<uni-easyinput @focus="chooseLocation" type="text" :inputBorder="false" clearable v-model="info.address" placeholder="请输入您的常驻位置" ></uni-easyinput>
				</uni-forms-item>
				<!-- 详细地址 -->
			<!-- 	<uni-forms-item label="详细地址:">
						<uni-easyinput :inputBorder="false" clearable v-model="info.address" placeholder="请输入详细地址" ></uni-easyinput>
				</uni-forms-item> -->
				<!-- 身份证号 -->
				<!-- <uni-forms-item label="身份证号:">
						<uni-easyinput :inputBorder="false" clearable v-model="info.numID" placeholder="请输入身份证号" ></uni-easyinput>
				</uni-forms-item> -->
				<!-- 上传照片 -->
				<uni-forms-item label="上传证明材料">
					<!-- <uni-row>
						<uni-col :span="12"></uni-col>
						<uni-col :span="12"></uni-col>
					</uni-row> -->
					<!-- <view class="upload"> -->
						<!-- <view class="uploadfile"> -->
							<uni-file-picker
							    v-model="Backimage" 
							    fileMediatype="image" 
							    mode="grid" 
								limit="1"
								:auto-upload="false"
							    @select="selectBack" 
							   
							>
							<image src="../../static/img/back_card.png" style="width:100%;height: 100%;"></image>
							</uni-file-picker>
						<!-- </view> -->
						<!-- <view class="uploadfile"> -->
							<uni-file-picker
							    v-model="Frontimage" 
							    fileMediatype="image" 
							    mode="grid" 
								limit="1"
								:auto-upload="false"
							    @select="selectFront" 
							>
							<image src="../../static/img/front_card.png" style="width:100%;height: 100%;"></image>
							</uni-file-picker>
						<!-- </view> -->
					<!-- </view>	 -->
						
				</uni-forms-item>
			</uni-forms> 		
			<!-- 选择地区 -->	
					
		</view>
		<view class="InfoConfirm">
				<button @click="finisnInfo" class="confirmButton" type="warn" >完成</button>
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
				info:{
					  address: "",
					  back_card: "",
					  city: "",
					  district: "",
					  front_card: "",
					  gender: 0,
					  latitude: "",
					  longitude: "",
					  name: "",
					  place: "",
					  profession: "",
					  province: "",
					  tel: "",
					  transportation: "",
				},
				Backimage:[],
				Frontimage:[],
				frontFlag:false,
				backFlag:false,
				value: 0,
				range: [{"value": 0,"text": "男"    },{"value": 1,"text": "女"}],
			}
		},
		created() {
			qqmapsdk = new QQMapWX({
			            key: 'QV7BZ-6M76X-TFL4M-TGKDY-FFC76-VJF7O'
			        });
			this.info.tel=this.tel;
			this.info.name=this.name;
			this.info.gender=this.gender;
			this.value=this.gender;
			// this.getcitys()
		},
		computed:{
			...mapState(['token','uid','tel','pw','name','gender'])
		},
		methods:{
			onChange(event) {
				// console.log(event.detail)
				this.info.gender=event.detail.value
				console.log(this.info.gender)
			},
			selectBack(e){
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
							if(res.statusCode==200){
								that.backFlag=true;
								var data=JSON.parse(res.data);
								console.log(data)
								that.info.back_card=data.data.url;
							}
							console.log(that.info)
							
							
						},
						fail: (err) => {
							console.log(err)
						}
				})
			},
			selectFront(e){
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
							if(res.statusCode==200){
								that.frontFlag=true;
								var data=JSON.parse(res.data);
								console.log(data)
								that.info.front_card=data.data.url;
							}
							console.log(that.info)
							
							
						},
						fail: (err) => {
							console.log(err)
						}
				})
			},
			chooseLocation(){
				var that=this;
				uni.chooseLocation({
					success(res) {
						// console.log(res)
						that.info.latitude=res.latitude;
						that.info.longitude=res.longitude;
						that.info.address=res.address;
						that.info.place=res.name;
						that.analysisLocation(res.latitude,res.longitude)
					}
				})
				console.log(that.info)
			},
			analysisLocation(lat,lon){
				var that=this;
				qqmapsdk.reverseGeocoder({
					location:{
						latitude:lat,
						longitude:lon
					},
					success:(res)=>{
						// console.log(res);
						that.info.province=res.result.address_component.province;
						that.info.city=res.result.address_component.city;
						that.info.district=res.result.address_component.district;
					}
				})
				console.log(this.info)
			},
			getcitys(){
				var that=this;
				qqmapsdk.getCityList({
					success:(res)=>{
						console.log(res.result)
					}
				})
			},
			finisnInfo(){
				// console.log('finish')
				// console.log(this.info0)
				var that=this;
				var token=`Bearer ${this.token}`;
				console.log(that.backFlag)
				console.log(that.frontFlag)
				if (!this.info.name) {
					uni.showToast({
						mask:true,
						image:'../../static/img/error.png',
						icon: 'none',
						title: '请填写名字'
					});
					return;
				}
				if (!this.info.profession) {
					uni.showToast({
						mask:true,
						image:'../../static/img/error.png',
						icon: 'none',
						title: '请填写职业'
					});
					return;
				}
				if (!this.info.transportation) {
					uni.showToast({
						mask:true,
						image:'../../static/img/error.png',
						icon: 'none',
						title: '请填写交通工具'
					});
					return;
				}
				if (!this.info.address) {
					uni.showToast({
						mask:true,
						image:'../../static/img/error.png',
						icon: 'none',
						title: '请填写常驻位置'
					});
					return;
				}
				if(!(this.backFlag||this.frontFlag)) {
					uni.showToast({
						mask:true,
						image:'../../static/img/error.png',
						icon: 'none',
						title: '请等待上传'
					});
					return;
				}
				uni.request({
					url:'https://fwwb2020-proxy-slk.tgucsdn.com/volunteer/add',
					method:'POST',
					header:{
						"content-type":"application/json",
						"Authorization":token,
					},
					data:{
						address: that.info.address,
						back_card: that.info.back_card,
						city: that.info.city,
						district: that.info.district,
						front_card: that.info.front_card,
						gender: that.info.gender,
						latitude: that.info.latitude,
						longitude: that.info.longitude,
						name: that.info.name,
						place: that.info.place,
						province: that.info.province,
						profession:that.info.profession,
						tel:that.info.tel,
						transportation:that.info.transportation
					},
					success: (res) => {
						console.log(res.data)
						if(res.data.status==200){
							uni.showToast({
								title:'申请成功',
								icon:'none',
								mask:true,
								image:'../../static/img/success.png'
							})
							store.commit("volunteer",res.data.data.volunteer)
							setTimeout(function(){
								uni.switchTab({
									url:"../volunteer/registerVolunteer"
								})
							},1000)
							// console.log(res.data)
							// that.getVolunteerInfo();
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
							title:'申请失败！',
							icon:'none',
							mask:true,
							image:'../../static/img/error.png'
						})
					}
				})
				// this.$store.commit('volunteer')
				
				// uni.switchTab({
				// 	url: '/pages/volunteer/registerVolunteer'		
				// })
		},

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
	.upload{
		display: flex;
	}
	.uploadfile{
		flex: 1;
		
	}
</style>
