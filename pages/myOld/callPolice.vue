<template>
	<view class="container">	
		<view class="CallPolice">
			<view class="confirmDetail">
				<uni-forms>
					<!-- 姓名 -->
				   <uni-forms-item label="姓名:">					
				        <uni-easyinput :disabled="changeStatus" :inputBorder="false" clearable v-model="Oldinfo.name" placeholder="请输入老人的名字" ></uni-easyinput>
				    </uni-forms-item>
					<!-- 性别 -->
					<uni-forms-item label="性别:">
					    <uni-data-checkbox :disabled="changeStatus"  selectedColor="#ff0000" mode="tag" v-model="value" :localdata="range"></uni-data-checkbox>
					</uni-forms-item>
					<!-- 出生日期 -->
					<!-- <uni-forms-item label="出生日期:">
					    <uni-datetime-picker :disabled="changeStatus" type="date" :value="date" start="1900-6-15" end="2035-6-15" @change="dateChange"></uni-datetime-picker>
					</uni-forms-item> -->
					<!-- 身高 -->
					<uni-forms-item label="身高:">
							<uni-easyinput :disabled="changeStatus" :inputBorder="false" clearable v-model="Oldinfo.height" placeholder="请输入老人的身高" ></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="居住位置:">
						<uni-easyinput :disabled="changeStatus" type="text" :inputBorder="false" clearable v-model="Oldinfo.address" placeholder="请输入老人的居住位置" ></uni-easyinput>
					</uni-forms-item>
					<!-- 病情等级 -->
					<!-- <uni-forms-item label="病情等级 :">
							<uni-easyinput :disabled="changeStatus" :inputBorder="false" clearable v-model="Oldinfo.level" placeholder="请输入老人的病情等级" ></uni-easyinput>
					</uni-forms-item> -->
					<!-- 居住位置 -->
					<uni-forms-item label="走失时间:">
							<uni-datetime-picker :hideSecond="true" type="datetime" :value="TaskInfo.LoseTime" start="2010-6-10 08:30:30" :end="nowDate" @change="dateChange"></uni-datetime-picker>
					</uni-forms-item>
					<uni-forms-item label="走失地点:">
							<uni-easyinput @focus="chooseLocation"  :inputBorder="false" clearable v-model="TaskInfo.place" placeholder="请填写老人走失位置" ></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="老人描述:">
							<uni-easyinput   :inputBorder="false" clearable v-model="TaskInfo.description" placeholder="请填写老人的描述" ></uni-easyinput>
					</uni-forms-item>
					<!-- 上传照片 -->
					<!-- <uni-forms-item label="上传老人照片">
						<uni-file-picker
							v-model="Oldimage" 
							fileMediatype="image" 
							mode="grid" 
							limit="2"
							:auto-upload="false"
							@select="selectImg"  
						>
						</uni-file-picker> -->
					</uni-forms-item>
				</uni-forms> 
			</view>
			<view class="callPolice">
				<uni-row>
					<uni-col>
						<button type="warn" @click="CallPolice">快速报警</button>
					</uni-col>
				</uni-row>
			</view>
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
				TaskInfo:{
					// LoseLocation:'',
					LoseTime:'',
					description:'',
					latitude: "",
					longitude: "",
					city: "",
					district: "",
					province: "",
					address: "",
					place: "",
					eid:'',
				},
				Oldinfo:{
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
					  level: "",
					  province: "",
					  birthday:'',
					  height:'',
					  uid:'',
					  eid:''
				},
				oldInfo:{},
				value: 0,
				range: [{"value": 0,"text": "男"  },{"value": 1,"text": "女"}],
				date:'',
				changeStatus:true,
				Oldimage:[],
				nowDate:''
			}
		},
		created() {
			qqmapsdk = new QQMapWX({
			            key: 'QV7BZ-6M76X-TFL4M-TGKDY-FFC76-VJF7O'
			        });
			var date=this.dateFormat(new Date())
			this.nowDate=date;
			console.log(this.nowDate)
			// var date=new Date();
			console.log(date)
		},
		computed:{
			...mapState(['token','uid','tel','pw']),
		},
		methods:{
			dateFormat:function(time) {
					var date=new Date(time);
					var year=date.getFullYear();
					/* 在日期格式中，月份是从0开始的，因此要加0
					 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
					 * */
					var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
					var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
					var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
					var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
					var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
					// 拼接
					// return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
					return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
			},
			chooseLocation(){
				var that=this;
				uni.chooseLocation({
					success(res) {
						// console.log(res)
						that.TaskInfo.latitude=res.latitude;
						that.TaskInfo.longitude=res.longitude;
						that.TaskInfo.address=res.address;
						that.TaskInfo.place=res.name;
						that.analysisLocation(res.latitude,res.longitude)
					}
				})
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
						that.TaskInfo.province=res.result.address_component.province;
						that.TaskInfo.city=res.result.address_component.city;
						that.TaskInfo.district=res.result.address_component.district;
					}
				})
				console.log(this.TaskInfo)
			},
			dateChange(value){
				// console.log(value)
				this.TaskInfo.LoseTime=`${value}`;
			},
			selectImg(e){
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
								var data=JSON.parse(res.data);
								console.log(data)
								// that.Oldinfo.front_card=data.data.url;
							}
							// console.log(that.Oldinfo)
							
							
						},
						fail: (err) => {
							console.log(err)
						}
				})
			},
			CallPolice(){
				var that=this;
				var token=`Bearer ${this.token}`;
				console.log(this.Oldinfo)
				console.log(this.TaskInfo)
				if (!this.TaskInfo.LoseTime) {
					uni.showToast({
						mask:true,
						image:'../../static/img/error.png',
						icon: 'none',
						title: '请填写走失时间'
					});
					return;
				}
				if (!this.TaskInfo.place) {
					uni.showToast({
						mask:true,
						image:'../../static/img/error.png',
						icon: 'none',
						title: '请填写走失地点'
					});
					return;
				}
				if (!this.TaskInfo.description) {
					uni.showToast({
						mask:true,
						image:'../../static/img/error.png',
						icon: 'none',
						title: '请填写老人描述'
					});
					return;
				}
				uni.request({
					url:'https://fwwb2020-proxy-slk.tgucsdn.com/task/addTask',
					method:'POST',
					header:{
						"content-type":"application/json",
						"Authorization":token,
					},
					data:{
						address: that.TaskInfo.address,
						city: that.TaskInfo.city,
						district: that.TaskInfo.district,
						eid: that.Oldinfo.eid,
						description:that.TaskInfo.description,
						start:that.TaskInfo.LoseTime,
						latitude: that.TaskInfo.latitude,
						longitude: that.TaskInfo.longitude,
						place: that.TaskInfo.place,
						province: that.TaskInfo.province,
					},
					success: (res) => {
						console.log(res.data)
						if(res.data.status==200){
							uni.showToast({
								title:'报警成功',
								icon:'none',
								mask:true,
								image:'../../static/img/success.png'
							})
							setTimeout(function(){
								uni.switchTab({
									url:"./oldPeople"
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
							title:'报警失败！',
							icon:'none',
							mask:true,
							image:'../../static/img/error.png'
						})
					}
				})
				
				
				
				
			}
		},
		onLoad(option) {
			if(option!=null){
				var info=JSON.parse(option.oldInfo)
				// console.log(info)
				info.back_card=decodeURIComponent(info.back_card);
				info.front_card=decodeURIComponent(info.front_card);
				// console.log(info)
				this.Oldinfo=info
				this.date=this.Oldinfo.birthday;
				this.value=this.Oldinfo.gender;
				this.TaskInfo.eid=this.Oldinfo.eid;
			}
			console.log(this.Oldinfo)
		}
	}
</script>

<style>
	.container{
		width: 100%;
		margin-top: 30rpx;
		padding: 6rpx;
	}
	.CallPolice{
		width: 95%;
		border: 2rpx solid #e5e5e5;
		border-radius: 30rpx;
		padding: 18rpx;
		margin: 0 auto;
	}
	.confirmDetail{
		
	}
</style>
