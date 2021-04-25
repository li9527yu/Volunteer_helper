<template>
	<view class="container">
		<view class="oldLists" >
			
			<view class="oldItem" v-for="(oldItem,index) in olds" :key="index"  v-if="oldShow">
				
				<uni-row>
					<uni-col :span="6" :offset="1">
						<!-- <view class="oldImg"><image src="../../static/img/defaultImg.png"/></view> -->
						<view class="oldImg">
							<image v-if="photosNum[index]==1" :src="photos[index].photo1"/>
							<image v-if="photosNum[index]==0" src="../../static/img/defaultImg.png"/>
						</view>
					</uni-col>
					<uni-col :span="12"  >
						<ul class="oldDetail" @click="change(index)">
							<li><text>ID:<text class="oldInfo">{{oldItem.eid}}</text></text></li>
							<li><text>姓名:<text class="oldInfo">{{oldItem.name}}</text></text></li>
							<!-- <li><text>年龄:<text class="oldInfo">{{oldage(index)}}</text></text></li> -->
							<li><text>地址:<text class="oldInfo">{{oldItem.address}}</text></text></li>
							<!-- <li><text>地址:<text class="oldInfo">{{oldItem.address}}</text></text></li> -->
							<li><text>状态:<text class="oldInfo">{{oldItem.status?'通过审核':'正在审核中'}}</text></text></li>
						</ul>
					</uni-col>
					<uni-col :span="2" :offset="1">
						<view class="functionButton">
							<uni-icons type="phone-filled" class="Fbutton"size="30" @click="call(index)"> </uni-icons>
							<uni-icons type="more-filled" class="Fbutton" size="30" @click="deleteOld(index)"></uni-icons>
							<!-- <uni-button class="Fbutton" type="primary" >一键报警</uni-button>
							<uni-button class="Fbutton" type="primary"  >更改信息</uni-button> -->
						</view>
					</uni-col>
				</uni-row>	
			</view>
			<view class="Empty" v-if="oldsNum">
				<image class="EmptyImg" src="../../static/img/empty.png"></image>
			</view>
			<view class="Empty" v-if="!oldShow">
				<image class="EmptyImg" src="../../static/img/empty.png"></image>
			</view>
		</view>	
		<view class="addOld">
			<uni-row>
				<uni-col :span="20" :offset="2">
					<button icon="plus" type="warn" size="large" @click="addOld">添加老人</button>
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
	export default{
		data(){
			return{
				olds:[],
				photos:[],
				oldShow:false,
				oldsNum:false,
				photosNum:[]
			}
		},
		computed:{
			...mapState(['token','uid','tel','pw','isLogin']),
		},
		created() {
			this.oldShow=false;
			if(!this.isLogin){
				uni.showModal({
					title:'您还未登录，是否现在登录？',
					success: (res) => {
						if(res.confirm){
							uni.reLaunch({
								url:'../login/login'
							})
						}
					}
				})
			}
			else{
				this.getAllOlds()
			}
			
		},
		onShow() {
			if(!this.isLogin){
				this.oldShow=false
			}
		},
		onLoad() {
			if(this.isLogin){
				this.getAllOlds()
			}
			
		},
		onPullDownRefresh() {
			this.getAllOlds()
			setTimeout(function(){
				uni.stopPullDownRefresh()
			},1500)
		},
		methods:{
			getAllOlds(){
				var that=this;
				var token=`Bearer ${this.token}`;
				if(this.isLogin){
					uni.request({
						url:'https://fwwb2020-proxy-slk.tgucsdn.com/elder/getAll',
						method:'POST',
						data:{
							uid:this.uid
						},
						header:{
							"Authorization":token,
							"Content-Type": "application/json"
						},
						success: (res) => {
							if(res.data.status==200){
								var elders=res.data.data.elders;
								if(elders.length==0){
									that.oldsNum=true;
									uni.showToast({
										title:`当前暂无老人`,
										icon:'none',
										mask:true,
										image:'../../static/img/success.png'
									})
								}
								else{
									uni.showToast({
										title:`成功获得老人！`,
										icon:'none',
										mask:true,
										image:'../../static/img/success.png'
									})
								}
								that.oldShow=true;
								
								// console.log(res.data.data.elders)
								
								// console.log(elders)
								elders.forEach(function(item,index){
									if(item.photo.photo1!=null){
										// that.photosNum.push(1);
										that.photosNum.splice(index,1,1)
									}
									else{
										// that.photosNum.push(0);
										that.photosNum.splice(index,1,0)
									}
									console.log(item)
									console.log(that.photosNum)
									that.olds.splice(index,1,item.elder);
									that.photos.splice(index,1,item.photo)
								})
							}
							else{
								uni.showToast({
									title:`${res.data.msg}`,
									icon:'none',
									mask:true,
									image:'../../static/img/error.png'
								})
							}
							
						},
						fail: (err) => {
							that.oldsNum=true
							uni.showToast({
								title:`获得老人失败`,
								icon:'none',
								mask:true,
								image:'../../static/img/error.png'
							})
							console.log(err)
						}
					})
					console.log(this.olds)
					console.log(this.photos)
				}
				else{
					uni.showToast({
						title:'请先登录！',
						icon:'none',
						mask:true,
						image:'../../static/img/error.png'
					})
				}
				// console.log(this.photos)
			},
			deleteOld(index){
				var eid=this.olds[index].eid
				var that=this;
				var token=`Bearer ${this.token}`;
				uni.showModal({
					title:'确定删除老人？',
					success: (res) => {
						if(res.confirm){
							uni.request({
								url:'https://fwwb2020-proxy-slk.tgucsdn.com/elder/delete',
								method:'POST',
								data:{
									eid:eid
								},
								header:{
									"Authorization":token,
									"Content-Type": "application/json"
								},
								success: (res) => {
									console.log(res.data)
									if(res.data.status==200){
										uni.showToast({
											title:'删除成功！',
											icon:'none',
											mask:true,
											image:'../../static/img/success.png'
										})
										setTimeout(function(){
											uni.reLaunch({
												url:'./oldPeople'
											})
										},1000)
									}
									else{
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
										title:`删除失败`,
										icon:'none',
										mask:true,
										image:'../../static/img/error.png'
									})
									console.log(err)
								}
							})
						}
						
					}
				})
				
			},
			call(index){
				if(this.olds[index].status){
					var sendInfo=this.olds[index];
					sendInfo.back_card=encodeURIComponent(sendInfo.back_card)
					sendInfo.front_card=encodeURIComponent(sendInfo.front_card)
					sendInfo=JSON.stringify(sendInfo)
					uni.navigateTo({
						url:'./callPolice?oldInfo='+sendInfo
					})
				}else{
					uni.showToast({
						title:`老人未通过审核`,
						icon:'none',
						mask:true,
						image:'../../static/img/error.png'
					})	
				}
			},
			addOld(){
				if(this.isLogin){
					uni.navigateTo({
						url:'./AddOld'
					})
				}
				else{
					uni.showToast({
						title:'请先登录！',
						icon:'none',
						mask:true,
						image:'../../static/img/error.png'
					})
				}
			},
			change(index){
				if(this.olds[index].status){
					var sendInfo=this.olds[index];
					var oldsImage=this.photos[index]
					sendInfo.back_card=encodeURIComponent(sendInfo.back_card)
					sendInfo.front_card=encodeURIComponent(sendInfo.front_card)
					sendInfo=JSON.stringify(sendInfo)
					// console.log(sendInfo)
					uni.navigateTo({
						url:'./changeOldInfo?oldInfo='+sendInfo
					})
				}else{
					uni.showToast({
						title:`老人未通过审核`,
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
		/* display: flex;
		flex-direction: column; */
		margin: 0;
		padding: 0;
	}
	.oldLists{
		margin-top: 20rpx;
		width: 100%;
		
		/* padding: 0 5px; */
	}
	.addOld{
		margin-top: 20rpx;
		flex: 1;
	}
	.oldItem{
		margin: 10rpx auto;
		width: 90%;
		padding: 2rpx;
		border: 4rpx solid #e5e5e5;
		border-radius: 20rpx;
	}
	.oldImg{
		display: flex;
		width: 100%;
		/* text-align: center; */
		justify-items: center;
		align-items: center;
	}
	.oldImg image{
		width:150rpx;
		height: 180rpx;
		border-radius: 10rpx;
	}
	.oldDetail text{
		font-size: 14px;
		font-weight: 500;
		font-family: '楷体';
	}
	.oldInfo{
		font-weight: 600;
		font-size: 16px;
	}
	.Fbutton{
		display: flex;
		flex-direction: column;
	}
	.Fbutton{
		flex: 1;
		/* font-size: 14px; */
		
	}
	.Empty{
		width: 100%;
	}
	.EmptyImg{
		width: 750rpx;
		height: 750rpx;
	}
</style>
