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
				<uni-forms-item label="性别:">
				    <uni-data-checkbox :disabled="changeStatus" selectedColor="#ff0000" mode="tag" v-model="value" :localdata="range" @change="onChange()"></uni-data-checkbox>
				</uni-forms-item>
				<!-- 职业 -->
				<uni-forms-item label="职业:">
				    <uni-easyinput  :disabled="changeStatus":inputBorder="false" clearable v-model="info.profession" placeholder="请输入您的职业" ></uni-easyinput>
				</uni-forms-item>
				<!-- 电话 -->
				<uni-forms-item label="电话:">
						<uni-easyinput  :disabled="changeStatus":inputBorder="false" clearable v-model="info.tel" placeholder="请输入您的电话号码" ></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="常驻位置:">
					<uni-easyinput :disabled="changeStatus" @focus="chooseLocation" type="text" :inputBorder="false" clearable v-model="info.address" placeholder="请输入您的常驻位置" ></uni-easyinput>
				</uni-forms-item>
				<!-- 交通工具 -->
			    <uni-forms-item label="交通工具:">
			        <uni-easyinput type="number"  :disabled="changeStatus":inputBorder="false" clearable v-model="info.transportation" placeholder="请输入您常用的交通工具" ></uni-easyinput>
			    </uni-forms-item>
				<!-- 常驻位置 -->
				

			</uni-forms> 		
			<!-- 选择地区 -->	
					
		</view>
		<view class="InfoConfirm">
				<button @click="changeInfo" class="confirmButton" type="warn" >{{infoStatus}}</button>
		</view>
	</view>
</template>

<script>
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
					  vid:''
				},
				value: 0,
				range: [{"value": 0,"text": "男"    },{"value": 1,"text": "女"}],
			}
		},
		computed:{
			...mapState(['name','profession','tel','transportation','address','token','gender','uid']),
			infoStatus:function(){
				return this.flag?`完成`:`修改信息`
			},
			
		},
		created() {
			qqmapsdk = new QQMapWX({
			            key: 'QV7BZ-6M76X-TFL4M-TGKDY-FFC76-VJF7O'
			        });
			this.info.name=this.name;
			this.info.profession=this.profession;
			this.info.tel=this.tel;
			this.info.transportation=this.transportation;
			this.info.address=this.address;
			this.info.gender=this.gender;
			this.value=this.gender;
			this.getVolunteerInfo()
		},
		methods:{
			onChange(event) {
				// console.log(event.detail)
				this.info.gender=event.detail.value
				console.log(this.info.gender)
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
			changeInfo(){
				var that=this;
				var token=`Bearer ${this.token}`;
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
					if (!this.info.profession) {
						uni.showToast({
							mask:true,
							image:'../../static/img/error.png',
							icon: 'none',
							title: '请填写职业'
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
					if (!this.info.transportation) {
						uni.showToast({
							mask:true,
							image:'../../static/img/error.png',
							icon: 'none',
							title: '请填写交通工具'
						});
						return;
					}
					uni.request({
						url:'https://fwwb2020-proxy-slk.tgucsdn.com/volunteer/change',
						method:'POST',
						header:{
							"content-type":"application/json",
							"Authorization":token,
						},
						data:{
							address: that.info.address,
							city: that.info.city,
							district: that.info.district,		
							gender: that.info.gender,
							latitude: that.info.latitude,
							longitude: that.info.longitude,
							profession:that.info.profession,
							name: that.info.name,
							place: that.info.place,
							province: that.info.province,
							transportation:that.info.transportation,
							vid:that.info.vid,
							tel:that.info.tel,
							back_card:that.info.back_card,
							front_card:that.info.front_card
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
								setTimeout(function(){
									uni.switchTab({
										url:"../volunteer/registerVolunteer"
									})
								},1000)	
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
			},
			getVolunteerInfo(){
				var that=this;
				var token=`Bearer ${this.token}`;
				uni.request({
					url:'https://fwwb2020-proxy-slk.tgucsdn.com/volunteer/get',
					method:'POST',
					data:{
						uid:that.uid
					},
					header:{
						"content-type":"application/json",
						"Authorization":token,
					},
					success: (res) => {
						console.log(res.data);
						if(res.data.status==200){
							uni.showToast({
								title:'获得志愿者成功！',
								icon:'none',
								mask:true,
								image:'../../static/img/success.png'
							})
							var volunteer=res.data.data.volunteer;
							that.info.latitude=volunteer.latitude;
							that.info.longitude=volunteer.longitude;
							that.info.district=volunteer.district;
							that.info.place=volunteer.place;
							that.info.province=volunteer.province;
							that.info.city=volunteer.city;
							that.info.vid=volunteer.vid;
							that.info.back_card=volunteer.back_card;
							that.info.front_card=volunteer.front_card;
							// that.info.profession=volunteer.profession,
							// console.log('volunteer get success')
							// store.commit("volunteer",res.data.data.volunteer)
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
							title:'获取失败',
							icon:'none',
							mask:true,
							image:'../../static/img/error.png'
						})
							console.log(err)
					}
				})
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
</style>
