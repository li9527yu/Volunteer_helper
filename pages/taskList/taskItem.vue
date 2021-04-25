<template>
	<view>
		<view class="taskItem">
			<view class="orderInfo">
				<uni-row class="OrderBody">
					<uni-col :span="20">
						<ul>
							<li>时间：{{taskItem.start}}</li>
							<li v-if="tasktype==1">开始时间：{{taskItem.start}}</li>
							<li>地点：{{taskItem.place}}</li>
							<li>辖区：{{taskItem.district}}-{{taskItem.city}}-{{taskItem.province}}</li>
							<li>描述：{{taskItem.description}}</li>
							<li v-if="tasktype==1">结束时间：{{taskItem.end}}</li>
						</ul>
					</uni-col>
				</uni-row>
				<uni-row class="cancel" v-if="tasktype==0">
					<!-- <uni-col :span="8" :offset="2" >
						<button id="endtask" class="functionButton" type="default" @click="endTask">结束任务</button>
					</uni-col> -->
					<uni-col :span="8" :offset="14" >
						<button id="continuetask" class="functionButton" type="warn" @click="turnToTask">继续任务</button>
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
	export default {
		name:'taskItem',
		props:{
			taskItem:{
				type:Object,
				default(){
					return {
						taskItem:{}
					}
				}
			},
			tasktype:{
				type:Number
			}
		},
		data(){
			return{
				OldInfo:{}
			}
		},
		computed:{
			...mapState(['token','uid','tel','pw','vid'])
		},
		onLoad() {
			
		},
		created() {
			// console.log(this.taskItem.eid)
			this.getOldInfo()
		},
		methods:{
			getOldInfo(){
				// console.log(eid)
				var that=this;
				var token=`Bearer ${this.token}`;
				uni.request({
					url:'https://fwwb2020-proxy-slk.tgucsdn.com/elder/get',
					method:'POST',
					data:{
						eid:that.taskItem.eid
					},
					header:{
						"content-type":"application/json",
						"Authorization":token,
					},
					success: (res) => {
						// console.log(res.data)
						if(res.data.status==200){
							// console.log(res.data.data.elder)
							that.OldInfo=res.data.data.elder
						}
						// console.log(that.OldInfo)
					},
					fail: (err) => {
						console.log(err)
					}
				})
				// console.log(this.searchOld)
			},
			// endTask(){
			// 	console.log('endTask')
			// 	// uni.navigateTo({
					
			// 	// })
			// },
			turnToTask(){
				console.log('turnToTask')
				this.OldInfo.front_card=encodeURIComponent(this.OldInfo.front_card)
				this.OldInfo.back_card=encodeURIComponent(this.OldInfo.back_card)
				var oldInfo=JSON.stringify(this.OldInfo);
				var taskInfo=JSON.stringify(this.taskItem);
				uni.navigateTo({
					// url:'../task/taskID'
					url:'/pages/task/map?oldInfo='+oldInfo+'&taskInfo='+taskInfo
				})
			}
		}
	}
</script>

<style>
	.taskItem{
		position: relative;
		width: 100%;
		border: 2px solid #ffffff; 
		padding: 6rpx;
		box-shadow: #666 0px 2rpx 6rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
	}
	.orderInfo{
		/* border: 2rpx solid #000000; */
		border-radius: 32rpx;
		padding: 10rpx;
	}
	.Ordertitle{
		padding: 2px;
		border-bottom: 1px solid #f0f0f0;
	}
	.titleText{
		font-size: 14px;
		line-height:31.25px;
		font-weight: 600;
	}
	.orderState{
		font-size: 14px;
		line-height:31.25px;
		color: #4c4c4c;
	}
	.orderImg{
		width: 100%;
		height: 100%;
		margin: 0 auto;
	}
	/* ul{
		margin: 0;
		padding-left: 20px;
	}
	ul li{
		list-style: none;
		padding: 2.5px;
		font-size: 12px;
	} */
	.OrderBody{
		margin-top: 4px;
	}
	.orderButton{
		display: flex;
		
	}
	.buttonTurn{
		flex: 1;
		padding: 10px;
	}
	/* .buttonTurn button{
		font-size: 16px;
		font-weight: 300;
	} */
	.orderIcon{
		width: 15vw;
		height: 15vw;
	}
	.titleIcon{
		width: 7vw;
		height: 7vw;
	}
	.cancel{
		margin-top: 2px;
	}
	.cancelOrder{
		font-size: 12px;
		font-weight: 500;
		color: #FFFFFF;
		background-color: #f50000;
		border-radius: 5px;
	}
	.confirmOrder{
		font-size: 12px;
		font-weight: 500;
		color: #FFFFFF;
		background-color: #ffaf0e;
		border-radius: 5px;
	}
	.EDconfirmOrder{
		font-size: 12px;
		font-weight: 500;
		color: #676767;
		background-color: #e3e7d9;
		border-radius: 5px;
	}
	.confirmDetail{
		background-color: #FFFFFF;
		border: 1px solid #F0F0F0;
		border-radius: 5px;
		padding: 5px;
		margin: 5px;
	}
	/* .confirmDetail text{
		font-size: 14px;
	} */
	.orderRow{
		margin-top: 5px;
	}
	.itemTitle{
		font-weight: 500;
	}
	.functionButton{
		font-size: 32rpx;
		border-radius: 36rpx;
		background-color: #07C160;
	}
	#endtask{
		background-color: #FF3355;
	}
	#continuetask{
		color: #FFFFFF;
	}
</style>
