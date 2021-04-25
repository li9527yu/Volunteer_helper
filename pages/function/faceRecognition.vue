<template>
	<view class="container">
		<view class="face">
			<uni-row>
				<uni-col :offset="1"><text class="faceTitle">请在下方上传人脸图片:</text></uni-col>
			</uni-row>
			<uni-row>
				<uni-col>
					<image src="../../static/img/imageFace.png" @click="chooseFace"></image>
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col><button class="functionButton" type="warn" @click="uploadFace">识别人脸</button></uni-col>
				<uni-col><button class="functionButton" type="warn" @click="endtask()">结束任务</button></uni-col>
			</uni-row>
			<!-- <uni-row>
				<uni-col><button type="warn">查看历史结果</button></uni-col>
			</uni-row> -->
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
				FacePhoto:'',
				flag:false,
				endInfo:{
					latitude:'',
					longitude:'',
					address:'',
					place:'',
					province:'',
					city:'',
					district:'',
					tid:'',
					eid:''
				}
			}
		},
		created() {
			qqmapsdk = new QQMapWX({
			            key: 'QV7BZ-6M76X-TFL4M-TGKDY-FFC76-VJF7O'
			        });
		},
		computed:{
			...mapState(['token','uid','tel','pw'])
		},
		onLoad(options) {
			this.endInfo.tid=options.tid;
			this.endInfo.eid=options.eid;
			console.log(options.tid)
			console.log(options.eid)
		},
		methods:{
			chooseLocation(){
				var that=this;
				uni.chooseLocation({
					success(res) {
						// console.log(res)
						that.endInfo.latitude=res.latitude;
						that.endInfo.longitude=res.longitude;
						that.endInfo.address=res.address;
						that.endInfo.place=res.name;
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
						that.endInfo.province=res.result.address_component.province;
						that.endInfo.city=res.result.address_component.city;
						that.endInfo.district=res.result.address_component.district;
					}
				})
				console.log(this.endInfo)
			},
			chooseFace(){
				var that=this;
				var token=`Bearer ${this.token}`;
				uni.chooseImage({
				    success: (chooseImageRes) => {
						console.log(chooseImageRes)
				        const tempFilePaths = chooseImageRes.tempFilePaths[0];
				       uni.uploadFile({
				       	url:'https://fwwb2020-proxy-slk.tgucsdn.com/file/uploadFace',
				       	header:{
				       		"Authorization":token,
				       		"Content-Type": "multipart/form-data"
				       	},
				       	filePath:tempFilePaths,
				       	name:'photo',
				       		success: (res) => {
								console.log(res.data)
								var data=JSON.parse(res.data)
				       			if(data.status==202){
				       				// var data=JSON.parse(res.data);
				       				// console.log(data)
				       				that.FacePhoto=data.data.url;
				       			}
				       		},
				       		fail: (err) => {
				       			console.log(err)
				       		}
				       })
				    }
				});
				// console.log(that.FacePhoto)
			},
			uploadFace(){
				var that=this;
				var token=`Bearer ${this.token}`;
				console.log(that.FacePhoto)
				console.log(that.eid)
				if(that.FacePhoto!=''){
					uni.request({
						url:'https://fwwb2020-proxy-slk.tgucsdn.com/face/compared',
						method:'POST',
						data:{
							photo:that.FacePhoto,
							eid:that.endInfo.eid
						},
						header:{
							"content-type":"application/json",
							"Authorization":token,
						},
						success: (res) => {
							console.log(res.data)
							if(res.data.status==200){
								that.flag=true;
								uni.showModal({
									title:'当前任务已完成！请上传当前位置',
									success: (res) => {
										if(res.confirm){
											this.chooseLocation()
											// this.endtask()
										}
									}
								})	
							}
							else{
								uni.showToast({
									title:'识别失败',
									icon:'none',
									mask:true,
									image:'../../static/img/error.png'
								})
							}
						},
						fail: (err) => {
							
						}
					})
				}
				else{
					uni.showToast({
						title:'请先上传人脸',
						icon:'none',
						mask:true,
						image:'../../static/img/error.png'
					})
				}
			},
			endtask(){
				// this.chooseLocation();
				var that=this;
				var token=`Bearer ${this.token}`;
				if(this.flag){
					uni.request({
						url:'https://fwwb2020-proxy-slk.tgucsdn.com/task/endTask',
						method:'POST',
						data:{
							latitude:that.endInfo.latitude,
							longitude:that.endInfo.longitude,
							address:that.endInfo.address,
							place:that.endInfo.place,
							province:that.endInfo.province,
							city:that.endInfo.city,
							district:that.endInfo.district,
							tid:that.endInfo.tid
						},
						header:{
							"content-type":"application/json",
							"Authorization":token,
						},
						success: (res) => {
							console.log(res.data)
							if(res.data.status==200){
								uni.showToast({
									title:'任务完成',
									icon:'none',
									mask:true,
									image:'../../static/img/success.png'
								})
								setTimeout(function(){
									uni.switchTab({
										url:'../volunteer/registerVolunteer'
									})
								},1000)
							}
							else{
								uni.showToast({
									title:'结束失败',
									icon:'none',
									mask:true,
									image:'../../static/img/error.png'
								})
							}
						},
						fail: (err) => {
							
						}
					})
				}
				else{
					uni.showToast({
						title:'任务还在进行中！',
						icon:'none',
						mask:true,
						image:'../../static/img/error.png'
					})
				}
			}
		}
	}
</script>

<style>
	.container{
		width: 100%;
		/* padding: 8rpx; */
	}
	.face{
		border: 2rpx solid #e2e2e2;
		border-radius: 30rpx;
		padding: 20rpx;
		margin: 0 auto;
	}
	.faceTitle{
		font-size: 32rpx;
		font-weight: 600;
		text-align: center;
	}
	.functionButton{
		margin-top: 20rpx;
	}
</style>
