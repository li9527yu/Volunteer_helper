<template>
	<view class="Old">
		<view class="oldDetail">
			<view class="oldImage">
				<swiper :autoplay="true">
					<swiper-item>
						<image v-if="oldImage[0]" class="oldImageItem" :src="oldImage[0]"></image>
						<image v-else class="oldImageItem" src="../../static/img/defaultImg.png"></image>
					</swiper-item>
					<swiper-item>
						<image v-if="oldImage[1]" class="oldImageItem" :src="oldImage[1]"></image>
						<image v-else class="oldImageItem" src="../../static/img/defaultImg.png"></image>
					</swiper-item>
					<swiper-item>
						<image v-if="oldImage[2]" class="oldImageItem" :src="oldImage[2]"></image>
						<image v-else class="oldImageItem" src="../../static/img/defaultImg.png"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="OldInfo">
				<uni-row>
					<uni-col :span="6" :offset="2"><text class="taskTitle">老人姓名:</text></uni-col>
					<uni-col :span="14"><text class="taskInfo">{{OldInfo.name}}</text></uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="6" :offset="2"><text class="taskTitle">身高:</text></uni-col>
					<uni-col :span="14"><text class="taskInfo">{{OldInfo.height}}</text></uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="6" :offset="2"><text class="taskTitle">走失时间:</text></uni-col>
					<uni-col :span="14"><text class="taskInfo">{{TaskInfo.start}}</text></uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="6" :offset="2"><text class="taskTitle">走失地点:</text></uni-col>
					<uni-col :span="14"><text class="taskInfo">{{TaskInfo.place}}</text></uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="6" :offset="2"><text class="taskTitle">家属联系方式:</text></uni-col>
					<uni-col :span="14"><text class="taskInfo">{{FamilyTel}}</text></uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="6" :offset="2"><text class="taskTitle">常去地点:</text></uni-col>
					<uni-col :span="14"><text class="taskInfo">{{OldInfo.place}}</text></uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="6" :offset="2"><text class="taskTitle">老人描述:</text></uni-col>
					<uni-col :span="14"><text class="taskInfo">{{TaskInfo.description}}</text></uni-col>
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
	export default{
		name:'OldInfoShow',
		data(){
			return{
				// FamilyTel:''
			}
		},
		computed:{
			...mapState(['token','uid','tel','pw']),
		},
		props:{
			OldInfo:{
				type:Object,
				default(){
					return {
						OldInfo:{}
					}
				}
			},
			TaskInfo:{
				type:Object,
				default(){
					return {
						TaskInfo:{}
					}
				}
			},
			FamilyTel:{
				type:Number
			},
			oldImage:{
				type:Array,
				default(){
					return []
				}
			}
		},
		onLoad(){
			// this.getFamilyTel()
			// this.getOldImage()
			console.log(this.oldImage)
		},
		created() {
			
		},
		methods:{
			// getOldImage(){
			// 	var that=this;
			// 	var token=`Bearer ${this.token}`;
			// 	uni.request({
			// 		url:'http://81.70.249.142:9033/photo/get',
			// 		method:'POST',
			// 		data:{
			// 			uid:this.OldInfo.uid
			// 		},
			// 		header:{
			// 			"Authorization":token,
			// 			"Content-Type": "application/json"
			// 		},
			// 		success: (res) => {
			// 			console.log(res.data)
			// 			if(res.data.status==200){
			// 				// that.oldShow=true
			// 				// console.log(res.data.data.elders)
			// 				// var elders=res.data.data.elders
			// 				// // console.log(elders)
			// 				// elders.forEach(function(item,index){
			// 				// 	// console.log(index)
			// 				// 	console.log(item)
			// 				// 	that.olds.splice(index,1,item.elder);
			// 				// 	that.photos.splice(index,1,item.photo)
			// 				// })
			// 			}
						
			// 		},
			// 		fail: (err) => {
			// 			console.log(err)
			// 		}
			// 	})
			// },
			
		}
		}
</script>

<style>
	.Old{
		width: 100%;
		background-color: #FFFFFF;
		border: 1px solid #FFFFFF;
		border-radius: 28rpx 28rpx 0 0;
		
	}
	.oldDetail{
		margin: 0 auto;
		width: 95%;
		padding: 10rpx;
	}
	.taskTitle{
		font-size: 28rpx;
		font-weight: 600;
	}
	.taskInfo{
		font-size: 32rpx;
		font-weight: 300;
	}
	.OldInfo{
		width: 100%;
		margin-top: 10rpx;
	}
	.oldImage{
		width: 100%;
	}
	.oldImageItem{
		width: 100%;
		text-align: center;
		border: 1px solid #FFFFFF;
		/* border-radius: 28rpx 28rpx 0 0; */
	}
</style>
