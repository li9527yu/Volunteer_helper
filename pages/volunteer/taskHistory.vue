<template>
	<view class="container">
		<view class="enterpriseOrder">
			<view class="titleInfo">
				<view 	v-for="(item,index) in Lists" 
					:key="index" 
					@click="ListNum = index" 
					:class="{act: ListNum === index}"
					 class="titleInfo-btn">{{item}}</view>
			</view>
			<view class="task" v-if="taskGet">
				<task-list :task="tasklists" :Tasktype="ListNum"></task-list>
			</view>
			<view class="Empty" v-else>
				<image class="EmptyImg" src="../../static/img/empty.png"></image>
			</view>
			<!-- <view class="task" v-else>
				<task-list :task="tasklists" :Tasktype="ListNum"></task-list>
			</view> -->
			<!-- <view v-show="showEmpty" class="empty">
				<image 
				src="../../static/img/empty.png" 
				class="emptyImg"
				style="width: 100%;height: 100%;opacity: 0.4;z-index: -1;" mode="widthFix"></image>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import taskList from '../taskList/taskList.vue'
	export default{
		components:{
			taskList
			
		},
		data(){
			return{
				taskGet:false,
				ListNum: 0,
				Lists:["正在进行","已完成"],
				count:"",
				tasklists:[]
			}
		},
		computed:{
			...mapState(['token','vid'])
		},
		onLoad() {
			this.getHistory()
		},
		methods:{
			getHistory(){
				var that=this;
				var token=`Bearer ${this.token}`;
				console.log('getHistory')
				uni.request({
					url:'https://fwwb2020-proxy-slk.tgucsdn.com/volunteer/getMyTasks',
					method:'POST',
					data:{
						vid:that.vid
					},
					header:{
						"content-type":"application/json",
						"Authorization":token,
					},
					success: (res) => {
						console.log(res.data)
						if(res.data.status==200){
							var tasks=res.data.data.task;
							console.log(tasks)
							if(tasks.length!=0){
								that.taskGet=true
							}
							tasks.forEach(function(item,index){
								var TaskItem=item;
								if(item.end==null){
									// item.end=0;
									TaskItem.type=0
								}
								else{
									// item.end=1;
									TaskItem.type=1;
								}
								// var taskitem={};
								// taskitem.start=item.start;
								// taskitem.eid=item.eid;
								// taskitem.tid=item.tid;
								// taskitem.code=item.code;
								// taskitem.end=item.end;
								// taskitem.city=item.city;
								// taskitem.province=item.province;
								// taskitem.district=item.district;
								// taskitem.place=item.place;
								that.tasklists.splice(index,1,TaskItem)
							})
						}
					},
					fail: (err) => {
						
					}
				})
				console.log(that.tasklists)
			}
		}
	}
</script>

<style>
	.container{
		width: 100%;
		/* background-color: #f9f9f9; */
	}
	.enterpriseOrder{
		width: 100%;
		
	}
	.titleInfo {
		display: flex;
		margin-top: 20rpx;
	}
	.titleInfo-btn {
		flex: 1;
		margin: 0 20rpx;
		font-size: 36rpx;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}
	.titleInfo-btn.act {
		font-weight: 600;
		border-bottom: solid 2px rgb(255, 0, 0);
	}
	.Empty{
		width: 100%;
	}
	.EmptyImg{
		width: 750rpx;
		height: 750rpx;
	}
</style>
