<template>
	<view>
		<view class="confirmDetail">
			<uni-forms>
				<!-- 姓名 -->
			   <uni-forms-item label="姓名:">					
			        <uni-easyinput :disabled="changeStatus" :inputBorder="false" clearable v-model="Oldinfo.name" placeholder="请输入老人的名字" ></uni-easyinput>
			    </uni-forms-item>
				<!-- 性别 -->
				<uni-forms-item label="性别:">
				    <uni-data-checkbox :disabled="changeStatus"  selectedColor="#ff0000" mode="tag" v-model="value" :localdata="range" @change="genderChange"></uni-data-checkbox>
				</uni-forms-item>
				<!-- 出生日期 -->
				<uni-forms-item label="出生日期:">
				    <uni-datetime-picker :disabled="changeStatus" type="date" :value="date" start="1900-6-15" end="2035-6-15" @change="dateChange"></uni-datetime-picker>
				</uni-forms-item>
				<!-- 身高 -->
				<uni-forms-item label="身高:">
						<uni-easyinput :disabled="changeStatus" :inputBorder="false" clearable v-model="Oldinfo.height" placeholder="请输入老人的身高" ></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="居住位置:">
					<uni-easyinput :disabled="changeStatus" @focus="chooseLocation" type="text" :inputBorder="false" clearable v-model="Oldinfo.address" placeholder="请输入老人的居住位置" ></uni-easyinput>
				</uni-forms-item>
				<!-- 病情等级 -->
				<uni-forms-item label="病情等级 :">
						<uni-data-checkbox :disabled="changeStatus" selectedColor="#ff0000" mode="tag" v-model="Dvalue" :localdata="diseases" @change="diseaseChange"></uni-data-checkbox>
						<!-- <uni-easyinput :inputBorder="false" clearable v-model="Oldinfo.level" placeholder="请输入老人的病情等级" ></uni-easyinput> -->
				</uni-forms-item>
				<!-- 居住位置 -->
				
				
				<!-- 上传照片 -->
				<uni-forms-item label="上传老人照片">
					<uni-file-picker
						:disabled="changeStatus"
						v-model="Oldimage" 
						fileMediatype="image" 
						mode="grid" 
						limit="3"
						:auto-upload="false"
						@select="selectImg" 
					    @delete="deleteIamge"
					>
					</uni-file-picker>
					</uni-file-picker>
				</uni-forms-item>
			</uni-forms> 
			
		</view>
		<view class="callPolice">
			<uni-row>
				<uni-col>
					<button type="warn" @click="changeInfo">{{infoStatus}}</button>
				</uni-col>
			</uni-row>
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
					  eid:'',
					  status:'',
					  pid:''
				},
				oldInfo:{},
				value: 0,
				Dvalue:1,
				range: [{"value": 0,"text": "男"    },{"value": 1,"text": "女"}],
				diseases: [{"value": 1,"text": "轻微"    },{"value": 2,"text": "中度"},{"value": 3,"text": "严重"}],
				date:'',
				changeStatus:true,
				Oldimage:[],
				sendImage:[
					// {
					// 	tempPath:'',
					// 	Path:''
					// },
					// {
					// 	tempPath:'',
					// 	Path:''
					// },
					// {
					// 	tempPath:'',
					// 	Path:''
					// },
				],
				TempImg:[],
				imageNum:0,
				pid:''
			}
		},
		computed:{
			...mapState(['token','uid','tel','pw']),
			infoStatus:function(){
				return this.flag?`完成`:`修改信息`
			}
		},
		methods:{
			getOldImage(){
				var that=this;
				var token=`Bearer ${this.token}`;
				uni.request({
					url:'https://fwwb2020-proxy-slk.tgucsdn.com/photo/get',
					method:'POST',
					data:{
						eid:that.Oldinfo.eid
					},
					header:{
						"Authorization":token,
						"Content-Type": "application/json"
					},
					success: (res) => {
						console.log(res.data)
						if(res.data.status==200){
							var photos=res.data.data.photo;
							that.pid=photos.pid;
							// for(int i=1;i<photos.len)
							if(photos.photo1!=null){
								var photoItem={
									name:'photo1',
									extname:"png",
									url:photos.photo1,
								}
								that.Oldimage.push(photoItem)
								that.TempImg.push(photos.photo1)
								// that.Oldimage.splice(0,1,photoItem)
							}
							if(photos.photo2!=null){
								var photoItem2={
									name:'photo2',
									extname:"png",
									url:photos.photo2,
								}
								that.Oldimage.push(photoItem2)
								that.TempImg.push(photos.photo2)
								// that.Oldimage.splice(0,1,photoItem2)
							}
							if(photos.photo3!=null){
								var photoItem3={
									name:'photo3',
									extname:"png",
									url:photos.photo3,
								}
								that.Oldimage.push(photoItem3)
								that.TempImg.push(photos.photo3)
								// that.Oldimage.splice(2,1,photoItem3)
							}
						}
					},
					fail: (err) => {
						console.log(err)
					}
				})
				console.log(that.Oldimage)
			},
			chooseLocation(){
				var that=this;
				uni.chooseLocation({
					success(res) {
						// console.log(res)
						that.Oldinfo.latitude=res.latitude;
						that.Oldinfo.longitude=res.longitude;
						that.Oldinfo.address=res.address;
						that.Oldinfo.place=res.name;
						that.analysisLocation(res.latitude,res.longitude)
					}
				})
			},
			dateChange(value){
				// console.log(value)
				this.Oldinfo.birthday=`${value}`;
			},
			genderChange(e){
				console.log(e)
				this.Oldinfo.gender=e.detail.value;
				// console.log(this.Oldinfo.gender)
			},
			diseaseChange(e){
				console.log(e)
				this.Oldinfo.level=e.detail.value;
				console.log(this.Oldinfo.level)
			},
			selectImg(e){
				var that=this;
				console.log('选择文件：',e)
				// console.log('选择文件：',e)
				var path=e.tempFilePaths;
				var token=`Bearer ${this.token}`;
				// uni.request({
				// 	url:'https://fwwb2020-proxy-slk.tgucsdn.com/file/upload',
				// 	header:{
				// 			"Authorization":token,
				// 			"Content-Type": "multipart/form-data"
				// 	},
				// 	data:{
						
				// 	}
				// })
				uni.uploadFile({
					url:'https://fwwb2020-proxy-slk.tgucsdn.com/file/upload',
					header:{
						"Authorization":token,
						"Content-Type": "multipart/form-data"
					},
					filePath:path[0],
					name:'photo',
						success: (res) => {
							console.log(JSON.parse(res.data))
							// console.log(res.data.status)
							var data=JSON.parse(res.data);
							if(data.status==202){
								that.imageNum++;
								console.log(that.imageNum)
								if(that.imageNum==3){
									uni.showToast({
										mask:true,
										image:'../../static/img/success.png',
										icon: 'none',
										title: '图片上传成功'
									});
								}
								else{
									uni.showToast({
										mask:true,
										image:'../../static/img/success.png',
										icon: 'none',
										title: '图片正在上传'
									});
								}
								var imageItem={};
								imageItem.tempPath=e.tempFilePaths[0];
								imageItem.Path=data.data.url;
								console.log(imageItem)
								// console.log(data)
								// that.Oldinfo.front_card=data.data.url;
								that.sendImage.push(imageItem)
							}
							// console.log(that.Oldinfo)
							
							
						},
						fail: (err) => {
							console.log(err)
						}
				})
				// console.log(that.sendImage)
				// console.log(that.imageNum)
			},
			
			deleteIamge(e){
				var that=this;
				console.log(e)
				if(this.sendImage.length==0){
					that.Oldimage.pop();
				}
				else{
					var images=this.sendImage;
					images.forEach(function(item,index){
						// console.log(item)
						if(e.tempFilePath==item.tempPath){
							that.sendImage.splice(index,1)
							that.imageNum--;
						}
					})
				}
				
				// console.log(this.sendImage)
				// console.log(this.imageNum)
			},
			changeInfo(){
				var that=this;
				var token=`Bearer ${this.token}`;
				if(this.flag){
					console.log(this.Oldinfo)
					if (!this.Oldinfo.birthday) {
						uni.showToast({
							mask:true,
							image:'../../static/img/error.png',
							icon: 'none',
							title: '请填写出生日期'
						});
						return;
					}
					if (!this.Oldinfo.height) {
						uni.showToast({
							mask:true,
							image:'../../static/img/error.png',
							icon: 'none',
							title: '请填写身高'
						});
						return;
					}
					if (!this.Oldinfo.address) {
						uni.showToast({
							mask:true,
							image:'../../static/img/error.png',
							icon: 'none',
							title: '请填写居住位置'
						});
						return;
					}
					if(that.sendImage.length==0&&this.Oldimage.length==0){
						uni.showToast({
							title:'请先选择照片',
							icon:'none',
							mask:true,
							image:'../../static/img/error.png'
						})
						return;
					}
					if(that.sendImage.length>0&&that.sendImage.length<3&&this.Oldimage.length==0){
						uni.showToast({
							title:'请上传三张图片',
							icon:'none',
							mask:true,
							image:'../../static/img/error.png'
						})
						return;
					}
					// if(that.sendImage.length==3&&this.Oldimage.length==0){
					// 	uni.showToast({
					// 		title:'请等待图片上传',
					// 		icon:'none',
					// 		mask:true,
					// 		image:'../../static/img/error.png'
					// 	})
					// 	return;
					// }
					// if (!this.Oldinfo.back_card||!this.Oldinfo.front_card) {
					// 	uni.showToast({
					// 		mask:true,
					// 		image:'../../static/img/error.png',
					// 		icon: 'none',
					// 		title: '请上传身份证照片'
					// 	});
					// 	return;
					// }
					
					if(this.sendImage.length!=0||this.TempImg.length!=0){
						console.log(that.sendImage.length)
						console.log(that.TempImg.length)
						for(var i=0;i<3;i++){
							if(this.sendImage[i]!=undefined){
								this.TempImg[i]=this.sendImage[i].Path;
							}
						}
						var photo1=this.TempImg[0];
						var photo2=this.TempImg[1];
						var photo3=this.TempImg[2];
						console.log(photo1)
						console.log(photo2)
						console.log(photo3)
						uni.request({
							url:'https://fwwb2020-proxy-slk.tgucsdn.com/photo/change',
							method:'POST',
							header:{
								"content-type":"application/json",
								"Authorization":token,
							},
							data:{
								eid:that.Oldinfo.eid ,
								photo1:photo1,
								photo2:photo2,
								photo3:photo3,
								pid:that.pid
							},
							success: (res) => {
								console.log(res.data)
								if(res.data.status==200){
									uni.showToast({
										title:'完善照片成功',
										icon:'none',
										mask:true,
										image:'../../static/img/success.png'
									})
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
									title:'完善照片失败！',
									icon:'none',
									mask:true,
									image:'../../static/img/error.png'
								})
							}
						})
					}
					uni.request({
						url:'https://fwwb2020-proxy-slk.tgucsdn.com/elder/change',
						method:'POST',
						header:{
							"content-type":"application/json",
							"Authorization":token,
						},
						data:{
							address: that.Oldinfo.address,
							eid:that.Oldinfo.eid,
							// back_card: that.Oldinfo.back_card,
							city: that.Oldinfo.city,
							district: that.Oldinfo.district,
							birthday:that.Oldinfo.birthday,
							// eid: that.Oldinfo.address,
							// front_card: that.Oldinfo.front_card,
							gender: that.Oldinfo.gender,
							height: that.Oldinfo.height,
							latitude: that.Oldinfo.latitude,
							level: that.Oldinfo.level,
							longitude: that.Oldinfo.longitude,
							name: that.Oldinfo.name,
							place: that.Oldinfo.place,
							province: that.Oldinfo.province,
							// status: that.Oldinfo.address,
							uid:that.Oldinfo.uid 
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
										url:"./oldPeople"
									})
								},1000)
								console.log(res.data)
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
					this.changeStatus=false
					this.flag=true;
					console.log(that.sendImage)
				}
				
				
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
				this.getOldImage()
				this.date=this.Oldinfo.birthday;
				this.Dvalue=this.Oldinfo.level;
				this.value=this.Oldinfo.gender
			}
			console.log(this.Oldinfo)
		}
	}
</script>

<style>
</style>
