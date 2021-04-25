<template>
	<view class="content">
		<view class="choose-body">
			<view class="choose-content">
				<text class="choose-text">请选择您的身份:</text>
			</view>
			<view class="choose-content">
				<van-button  type="primary" block round size="large" @click="volunteer">志愿者</van-button>
			</view>
			<view class="choose-content">
				<van-button  type="primary" block round size="large" @click="family">家属</van-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			volunteer(){
				uni.navigateTo({
					url:'../Info/volunteerInfo'
				})
				console.log('volunteer')				
			},
			family(){
				uni.navigateTo({
					url:'../Info/familyInfo'
				})
				console.log('family')				
			}
		}
		
	}
</script>

<style>
	
	.choose-body{
		width: 80%;
		margin: 10% auto;
		display: flex;
		flex-direction: column;
	}
	.choose-content{
		
		flex: 1;
		margin: 20px 0;
	}
	.choose-text{
		padding-left:10px;
		font-size:18px;
		font-weight: 400;
	}
	.ButtonType{
		padding: 10vh 0;
	}
</style>
