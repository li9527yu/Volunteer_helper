<template>
	<view class="container">
		<view></view>
		<view class="inputContext">
			<uni-row>
				<uni-col :span="18">
					<uni-easyinput placeholder="请输入聊天内容"></uni-easyinput>
				</uni-col>
				<uni-col :span="6">
					<button type="default">发送</button>
				</uni-col>
			</uni-row>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		}
	}
</script>

<style>
	.container{
		width: 100%;
		font-size: 28rpx;
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
		background-color: #F3F3F3;
		
		/* 兼容iPhoneX */
		padding-bottom: 0;  
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);  
	}
</style>
