<template>
	<view class="container">
		<view class="searchTask">
			<uni-search-bar bgColor="#FFFFFF" @cancel="cancelSearch" @clear="clearSearch" placeholder="请输入您收到的任务码" v-model="searchValue" :radius="100" @confirm="search"></uni-search-bar>
		</view>
		<view class="Empty" v-if="!tasksNum">
			<image class="EmptyImg" src="../../static/img/empty.png"></image>
		</view>
		<view class="taskLists" v-if="!searchTo">
			<view class="taskItem" v-for="(item,index) in taskLists" :key="index">
				<uni-row>
					<uni-col :span="4" :offset="1"><text class="taskTitle">时间:</text></uni-col>
					<uni-col :span="18"><text class="taskInfo">{{item.start}}</text></uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="6" :offset="1"><text class="taskTitle">走失老人:</text></uni-col>
					<uni-col :span="16"><text class="taskInfo">{{oldsList[index].name}}</text></uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="4" :offset="1"><text class="taskTitle">地点:</text></uni-col>
					<uni-col :span="18"><text class="taskInfo">{{item.place}}</text></uni-col>
				</uni-row>
				
				<uni-row>
					<uni-col :span="8" :offset="1"><text class="taskTitle">任务描述:</text></uni-col>
					<uni-col :span="14"><text class="taskInfo">{{item.description}}</text></uni-col>
				</uni-row>
				<!-- <uni-row>
					<uni-col><text>老人信息:</text></uni-col>
					<uni-col><text>{{item.details.name}}</text></uni-col>
				</uni-row> -->
				<uni-row>
					<uni-col :span="8" :offset="15"><button class="enterTask" type="warn" @click="startDefaultTask(index)">加入救援</button></uni-col>
				</uni-row>
			</view>
		</view>
		<view class="taskLists" v-else>
			<view class="taskItem" v-if="searchTask">
				<uni-row>
					<uni-col :span="4" :offset="1"><text class="taskTitle">时间:</text></uni-col>
					<uni-col :span="18"><text class="taskInfo">{{searchTask.start}}</text></uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="6" :offset="1"><text class="taskTitle">走失老人:</text></uni-col>
					<uni-col :span="16"><text class="taskInfo">{{searchOld.name}}</text></uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="4" :offset="1"><text class="taskTitle">地点:</text></uni-col>
					<uni-col :span="18"><text class="taskInfo">{{searchTask.place}}</text></uni-col>
				</uni-row>
				
				<uni-row>
					<uni-col :span="4" :offset="1"><text class="taskTitle">任务描述:</text></uni-col>
					<uni-col :span="18"><text class="taskInfo">{{searchTask.description}}</text></uni-col>
				</uni-row>
				
				<uni-row>
					<uni-col :span="8" :offset="15"><button class="enterTask" type="warn" @click="startSearchTask">加入救援</button></uni-col>
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
		data(){
			return{
				searchTo:false,
				searchValue:'',
				searchTask:{},
				searchOld:{},
				taskLists:[],
				oldsList:[],
				tasksNum:false,
			}
		},
		computed:{
			...mapState(['token','uid','tel','pw','vid'])
		},
		created() {
			this.showTasks()
		},
		methods:{
			getOlds(eid){
				console.log(eid)
				var that=this;
				var token=`Bearer ${this.token}`;
				uni.request({
					url:'https://fwwb2020-proxy-slk.tgucsdn.com/elder/get',
					method:'POST',
					data:{
						eid:eid
					},
					header:{
						"content-type":"application/json",
						"Authorization":token,
					},
					success: (res) => {
						// console.log(res.data.data.elder)
						var old=res.data.data.elder;
						that.oldsList.push(old)
						// console.log(that.oldsList)
					},
					fail: (err) => {
						console.log(err)
					}
				})
				// console.log(this.searchOld)
			},
			getOldInfo(eid){
				console.log(eid)
				var that=this;
				var token=`Bearer ${this.token}`;
				uni.request({
					url:'https://fwwb2020-proxy-slk.tgucsdn.com/elder/get',
					method:'POST',
					data:{
						eid:eid
					},
					header:{
						"content-type":"application/json",
						"Authorization":token,
					},
					success: (res) => {
						console.log(res.data.data.elder)
						that.searchOld=res.data.data.elder
					},
					fail: (err) => {
						console.log(err)
					}
				})
				console.log(this.searchOld)
			},
			clearSearch(){
				this.searchTo=false
			},
			cancelSearch(){
				this.searchTo=false
			},
			search(e){
				console.log(e)
				var that=this;
				var token=`Bearer ${this.token}`;
				uni.showLoading({
					title:'正在搜索任务'
				})
				uni.request({
					url:'https://fwwb2020-proxy-slk.tgucsdn.com/task/getTaskByCode',
					method:'POST',
					data:{
						code:that.searchValue
					},
					header:{
						"content-type":"application/json",
						"Authorization":token,
					},
					success: (res) => {
						if(res.data.status==200){
							console.log(res.data.data.task);
							var taskItem=res.data.data.task;
							that.searchTask=taskItem;
							that.getOldInfo(taskItem.eid)
							that.searchTo=true;
							console.log(that.searchTo)
							console.log(that.searchTask)
							uni.hideLoading()
						}else{
							uni.hideLoading()
							setTimeout(function(){
								uni.showToast({
									title:'搜索失败！',
									icon:'none',
									mask:true,
									image:'../../static/img/error.png'
								})
							},1000)
							
						}
					},
					fail: (err) => {
						uni.hideLoading()
						setTimeout(function(){
							uni.showToast({
								title:'搜索失败！',
								icon:'none',
								mask:true,
								image:'../../static/img/error.png'
							})
						},1000)
						console.log(err)
					}
				})
			},
			showTasks(){
				var that=this;
				var token=`Bearer ${this.token}`;
				console.log('showTasks')
				uni.showLoading({
					title:'正在加载任务'
				})
				uni.request({
					url:'https://fwwb2020-proxy-slk.tgucsdn.com/task/getDefault',
					method:'POST',
					data:{
						vid:that.vid
					},
					header:{
						"content-type":"application/json",
						"Authorization":token,
					},
					success: (res) => {
						console.log(res.data);
						if(res.data.status==200){
							var tasks=res.data.data.task;
							// console.log(tasks)
							if(tasks.length!=0){
								that.tasksNum=true
								console.log(that.tasksNum)
							}
							else{
								uni.showToast({
									title:'当前暂无任务！',
									icon:'none',
									mask:true,
									image:'../../static/img/error.png'
								})
							}
							tasks.forEach(function(item,index){
								that.taskLists.splice(index,1,item);
								that.getOlds(item.eid)
							})
							uni.hideLoading()
						}else{
							uni.showToast({
								title:'任务获取失败！',
								icon:'none',
								mask:true,
								image:'../../static/img/error.png'
							})
							uni.hideLoading()
						}
					// console.log(that.taskLists)
					console.log(that.oldsList)
					},
					fail: (err) => {
						uni.showToast({
							title:'任务获取失败！',
							icon:'none',
							mask:true,
							image:'../../static/img/error.png'
						})
						uni.hideLoading()
						console.log(err)
					}
				})
			},
			startSearchTask(){
				var that=this;
				var token=`Bearer ${this.token}`;
				var oldInfo=JSON.stringify(this.searchOld);
				console.log(oldInfo)
				var taskInfo=JSON.stringify(that.searchTask)
				console.log(taskInfo)
				console.log('enterTask')
				uni.showModal({
					content:'确认加入该救援任务吗？',
					success: (res) => {
						if(res.confirm){
							uni.request({
								url:'https://fwwb2020-proxy-slk.tgucsdn.com/volunteer/joinTask',
								method:'POST',
								data:{
									vid:that.vid,
									tid:that.searchTask.tid
								},
								header:{
									"content-type":"application/json",
									"Authorization":token,
								},
								success: (res) => {
									console.log(res)
								},
								fail: (err) => {
									console.log(err)
								}
							})
							uni.navigateTo({
								// url:'../task/taskID'
								url:'/pages/task/map?oldInfo='+oldInfo+'&taskInfo='+taskInfo
							})
						}
					}
				})
				
			},
			startDefaultTask(index){
				var that=this;
				var token=`Bearer ${this.token}`;
				this.oldsList[index].front_card=encodeURIComponent(this.oldsList[index].front_card);
				this.oldsList[index].back_card=encodeURIComponent(this.oldsList[index].back_card);
				var oldInfo=JSON.stringify(this.oldsList[index])
				console.log(oldInfo)
				var taskInfo=JSON.stringify(that.taskLists[index])
				console.log(taskInfo)
				console.log('enterTask')
				uni.showModal({
					content:'确认加入该救援任务吗？',
					success: (res) => {
						if(res.confirm){
							uni.request({
								url:'https://fwwb2020-proxy-slk.tgucsdn.com/volunteer/joinTask',
								method:'POST',
								data:{
									vid:that.vid,
									tid:that.taskLists[index].tid
								},
								header:{
									"content-type":"application/json",
									"Authorization":token,
								},
								success: (res) => {
									console.log(res)
								},
								fail: (err) => {
									console.log(err)
								}
							})
							uni.navigateTo({
								// url:'../task/taskID'
								url:'/pages/task/map?oldInfo='+oldInfo+'&taskInfo='+taskInfo
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	.taskTitle{
		font-size: 28rpx;
		font-weight: 500;
	}
	.taskInfo{
		font-size: 32rpx;
		font-weight: 500;
	}
	.taskLists{
		margin: 0 auto;
		width: 90%;
		padding: 10rpx;
	}
	.taskItem{
		border: 4rpx solid #e2e2e2;
		border-radius: 32rpx;
		padding: 4rpx;
		margin: 20rpx 0;
		
		box-shadow: #666 0px 2rpx 6rpx;
		/* background: #fcfcfc; */
	}
	.enterTask{
		font-size: 28rpx;
		color: #FFFFFF;
		border-radius: 28rpx;
	}
	.Empty{
		width: 100%;
	}
	.EmptyImg{
		width: 750rpx;
		height: 750rpx;
	}
</style>
