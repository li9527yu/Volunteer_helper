<template>
	<view class="container">
		<view class="messageBody">
			<view class="talk-list">
				<view v-for="(item,index) in talkList" :key="index" >
					<view class="item flex_col" :class=" item.type == 1 ? 'push':'pull' ">
						<text class="userName">{{item.name}}</text>
					</view>
					<view class="item flex_col" :class=" item.type == 1 ? 'push':'pull' ">
						<image :src="item.pic" mode="aspectFill" class="pic"></image>
						<view class="content"><text class="talksMessage">{{item.content}}</text></view>
					</view>
				</view>
			</view>
		</view>
		<view class="inputContext">
			<view class="flex_col">
				<view class="flex_grow">
					<input class="Inputcontent" v-model="chatContent" placeholder="请输入聊天内容"></input>
				</view>
				<button class="send" type="primary" @click="sendMessage">发送</button>
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
				talkList:[],
				taskID:'',
				chatContent:'',
				socketTask: null,
				is_open_socket: false,
				timer:null
			}
		},
		computed:{
			...mapState(['token','uid','tel','pw','vid','picture','name']),
		},
		onLoad(options) {
			console.log(options.taskID)
			this.taskID=options.taskID;
			this.connectSocketInit()
			// console.log(this.name)
		},
		beforeDestroy() {
			this.closeSocket();
		},
		destroyed() {
			this.closeSocket();
		},
		onShow() {
			this.connectSocketInit()
		},
		onHide() {
			this.closeSocket();
		},
		methods:{
			sendMessage(){
				if(!this.chatContent){
					uni.showToast({
						title:'请输入有效的内容',
						icon:'none'
					})
					return;
				}
				if(this.is_open_socket){
					var that=this;
					var time=new Date();
					console.log(time)
					console.log(that.name)
					var messageItem={
						vid:that.vid,
						tid:that.taskID,
						picture:that.picture,
						time:time,
						name:that.name,
						message:that.chatContent
					}
					console.log(messageItem)
					messageItem=JSON.stringify(messageItem);
					// console.log(messageItem)
					this.socketTask.send({
						data:messageItem
					})
					uni.showLoading({
						title:'正在发送'
					})
					setTimeout(()=>{
						uni.hideLoading();
						this.$nextTick(()=>{
							// 清空内容框中的内容
							this.chatContent = '';
							uni.pageScrollTo({
							    scrollTop: 999999,	// 设置一个超大值，以保证滚动条滚动到底部
							    duration: 0
							});
						})
					},1500);
					
					
				}
				else{
					
				}
				
				// uni.showLoading({
				// 	title:'正在发送'
				// })
				// setTimeout(()=>{
				// 	uni.hideLoading();
					
					// 将当前发送信息 添加到消息列表。
					// let data = {
					// 	"id":new Date().getTime(),
					// 	"content":this.content,
					// 	"type":1,
					// 	"pic":"/static/logo.png"
					// }
					// this.talkList.push(data);
					
					
			},
			connectSocketInit(){
				var that=this;
				// 创建一个this.socketTask对象【发送、接收、关闭socket都由这个对象操作】
				this.socketTask = uni.connectSocket({
					// 【非常重要】必须确保你的服务器是成功的,如果是手机测试千万别使用ws://127.0.0.1:9099【特别容易犯的错误】
					url: "wss://fwwb2020-proxy-slk.tgucsdn.com/websocket/message/"+that.taskID,
					success(data) {
						console.log("websocket连接成功");
					},
				});
			 
				// 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则会失败】
				this.socketTask.onOpen((res) => {
					console.log("WebSocket连接正常打开中...！");
					that.is_open_socket = true;
						
					// 注：只有连接正常打开中 ，才能正常成功发送消息
					// 注：只有连接正常打开中 ，才能正常收到消息
					this.socketTask.onMessage((res) => {
						// console.log(JSON.parse(res.data))
						var objs=JSON.parse(res.data);
						console.log(objs)
						objs.forEach(function(item,index){
							var message={};
							if(item.vid==that.vid){
								message.type=1
							}else{
								message.type=0;
							}
							message.time=item.time;
							message.name=item.name;
							message.pic=item.picture;
							message.content=item.message;
							message.vid=item.vid;
							console.log(message);
							that.talkList.splice(index,1,message)
						})
						
						console.log(that.talkList)
					})
				})
				// 这里仅是事件监听【如果socket关闭了会执行】
				this.socketTask.onClose(() => {
					console.log("已经被关闭了")
				})
			},
			// 关闭websocket【离开这个页面的时候执行关闭】
			closeSocket() {
				var that=this;
				// this.timer=null;
				// clearInterval(this.timer)
				// this.timer = null
				this.socketTask.close({
						success(res) {
							that.is_open_socket = false;
							console.log("关闭成功", res)
						},
						fail(err) {
							console.log("关闭失败", err)
						}
					})
			},
		}
	}
</script>

<style lang="scss">
	.container{
		width: 100%;
		font-size: 28rpx;
	}
	.messageBody{
		width: 100%;
		height: auto;
		padding-bottom: 100rpx;
		box-sizing: content-box;
		
		/* 兼容iPhoneX */
		margin-bottom: 0;  
		margin-bottom: constant(safe-area-inset-bottom);  
		margin-bottom: env(safe-area-inset-bottom);  
	}
	.inputContext{
		position: fixed;
		left: 0;
		width: 100%;
		bottom: 0;
		height: auto;
		z-index: 2;
		border-top: #e5e5e5 solid 1px;
		box-sizing: content-box;
		background-color: #ffffff;
		
		/* 兼容iPhoneX */
		padding-bottom: 0;  
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);  
	}

	.messageBody{
		width: 100%;
		height: auto;
		padding-bottom: 100rpx;
		box-sizing: content-box;
		
		/* 兼容iPhoneX */
		margin-bottom: 0;  
		margin-bottom: constant(safe-area-inset-bottom);  
		margin-bottom: env(safe-area-inset-bottom);  
	}
	.userName{
		display: block;
		font-size: 28rpx;
		font-weight: 300;
	}
	.talk-list{
		padding-bottom: 20rpx;
		
		/* 消息项，基础类 */
		.item{
			padding: 20rpx 20rpx 0 20rpx;
			align-items:flex-start;
			align-content:flex-start;
			color: #333;
			
			.pic{
				width: 92rpx;
				height: 92rpx;
				border-radius: 50%;
				border: #fff solid 1px;
			}
			
			.content{
				padding: 20rpx;
				border-radius: 4px;
				max-width: 400rpx;
				word-break: break-all;
				line-height: 52rpx;
				position: relative;
			}
			
			/* 收到的消息 */
			&.pull{
				.content{
					margin-left: 32rpx;
					background-color: #e5e5e5;
					
					&::after{
						content: '';
						display: block;
						width: 0;
						height: 0;
						border-top: 16rpx solid transparent;
						border-bottom: 16rpx solid transparent;
						border-right: 20rpx solid #fff;
						position: absolute;
						top: 30rpx;
						left: -18rpx;
					}
				}
			}
			
			/* 发出的消息 */
			&.push{
				/* 主轴为水平方向，起点在右端。使不修改DOM结构，也能改变元素排列顺序 */
				flex-direction: row-reverse;
				
				.content{
					margin-right: 32rpx;
					background-color: #a0e959;
					
					&::after{
						content: '';
						display: block;
						width: 0;
						height: 0;
						border-top: 16rpx solid transparent;
						border-bottom: 16rpx solid transparent;
						border-left: 20rpx solid #a0e959;
						position: absolute;
						top: 30rpx;
						right: -18rpx;
					}
				}
			}
		}
	}
	.flex_col {
	  display: flex;
	  flex-direction: row;
	  flex-wrap: nowrap;
	  justify-content: flex-start;
	  align-items: center;
	  align-content: center;
	}
	.flex_col .flex_grow
	{width:0;flex-grow: 1;}
	// .pic{
	// 	width: 92rpx;
	// 	height: 92rpx;
	// 	border-radius: 50%;
	// 	border: #fff solid 1px;
	// }
	.send{
		background-color: #42b983;
		color: #FFFFFF;
		height: 80rpx;
		margin-left: 20rpx;
		border-radius: 32rpx;
		border: 2rpx solid #ffffff;
		padding: 0;
		width: 120rpx;
		line-height: 80rpx;
		font-size: 32rpx;
	}
	.talksMessage{
		font-size: 32rpx;
		font-weight: 300;
	}
	.send::after{
		border-color: transparent;
	}
	.Inputcontent{
		background-color: #fff;
		height: 80rpx;
		padding: 0 20rpx;
		border: 2rpx solid #000000;
		border-radius: 32rpx;
		margin: 8rpx;
		font-size: 28rpx;
	}
</style>
