<template>
	<view>
		<view class="taskList">
			<task-item
				v-if="item.type==Tasktype"
				v-for="(item,index) in task" 
				:taskItem="item"
				 :tasktype="Tasktype"
				:key="index" 
				class="itemContainer"></task-item>
		</view>
		<view class="Empty" v-if="!End&&Tasktype==1">
			<image class="EmptyImg" src="../../static/img/empty.png"></image>
		</view>
		<view class="Empty" v-if="!Contiune&&Tasktype==0">
			<image class="EmptyImg" src="../../static/img/empty.png"></image>
		</view>
	</view>
</template>

<script>
	import taskItem from './taskItem.vue'
	export default{
		name:'taskList',
		components:{
			taskItem
		},
		props:{
			Tasktype:{
				type:Number,
				default:0
			},
			task:{
				type:Array,
				default(){
					return []
				}
			}
		},
		created() {
			this.taskRecognintion()
			console.log(this.task)
		},
		data(){
			return{
				Contiune:false,
				End:false
			}
		},
		methods:{
			taskRecognintion(){
				var taskEnd=0;
				var taskContiune=0;
				if(this.task.length>0){
					this.task.forEach(function(item,index){
						if(item.type==1){
							taskEnd++;
						}
						else{
							taskContiune++;
						}
					})
					console.log(taskEnd)
					console.log(taskContiune)
					if(this.task.length==taskEnd){
						this.End=true
					}
					if(this.task.length==taskContiune){
						this.Contiune=true
					}
				}
			}
		}
	}
</script>

<style>
	.taskList{
	        display: flex;
	        flex-wrap: wrap;
	        justify-content: space-around;
			
	    }
	.itemContainer{
		margin: 0 auto;
		width: 90%;
		padding: 10rpx;
		
	}
	.Empty{
		width: 100%;
	}
	.EmptyImg{
		width: 750rpx;
		height: 750rpx;
	}
</style>
