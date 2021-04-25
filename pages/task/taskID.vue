<template>
	<view class="container">
		<view>
			<van-row>
				<van-col :span="24"><text>请输入任务ID:</text></van-col>
			</van-row>
			<van-row>
				<van-col :span="24">
					<van-field
						type="text"
						placeholder="请输入得到的任务ID"
						clearable
						/>
				</van-col>
			</van-row>
			<van-row>
				<van-col :span="12"><van-button type="primary" @click="enterTask">确认</van-button></van-col>
			</van-row>
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
			enterTask(){
				uni.navigateTo({
					url:'./map'
				})
			}
		}
	}
</script>

<style>
</style>
