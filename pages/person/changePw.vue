<template>
	<view class="container">
		<view class="registerMain">
			<uni-forms border>
			    <uni-forms-item label="手机号:">					
			        <uni-easyinput :inputBorder="false" clearable v-model="phone" placeholder="请输入手机号" ></uni-easyinput>
			    </uni-forms-item>
			    <uni-forms-item label="旧密码:">
			        <uni-easyinput type="password" :inputBorder="false" clearable v-model="oldpassword" placeholder="请输入密码" ></uni-easyinput>
			    </uni-forms-item>
				<uni-forms-item label="新密码:">
				    <uni-easyinput type="password" :inputBorder="false" clearable v-model="newpassword" placeholder="请设置新密码" ></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="验证码:">
					<view class="input-row">
						<uni-easyinput :inputBorder="false" clearable v-model="code" placeholder="请输入短信验证码" ></uni-easyinput>
						<button class="send-code-btn" @click="sendCode" :disabled="clickable">{{codeDuration ? codeDuration + 's' : '发送验证码' }}</button>
					</view>
				</uni-forms-item>
			</uni-forms>
			<view class="registerButton">
				<button @click="changePw" type="warn">修改密码</button>
			</view>
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js';//需要引入store
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default{
		data(){
			return{
				phone:'',
				oldpassword:'',
				newpassword:'',
				code:'',
				codeDuration:0,
				codeInterVal:null,
				clickable:false
			}
		},
		created() {
			this.phone=this.tel;
		},
		computed:{
			...mapState(['token','uid','tel','pw','vid'])
		},
		methods:{
			sendCode(){
				var that=this;
				console.log(this.phone)
				if (this.codeDuration) {
					uni.showToast({
						title:`请在${this.codeDuration}秒后重试`,
						icon:'none',
						mask:true,
						image:'../../static/img/error.png'
					})
				}
				if (!/^1\d{10}$/.test(this.phone)) {
					uni.showToast({
						title:'手机号填写错误',
						icon:'none',
						mask:true,
						image:'../../static/img/error.png'
					})
					
					return
				}
				uni.request({
					url:'https://fwwb2020-proxy-slk.tgucsdn.com/user/getMsgCode'+'?tel='+this.phone,
					method:'POST',
					data:{
						tel:that.phone
					},
					success: (res) => {
						console.log(res)
						if(res.statusCode==200){
							uni.showToast({
								title:'发送成功！',
								icon:'none',
								mask:true,
								image:'../../static/img/success.png'
							})
							that.codeDuration = 60
							that.codeInterVal = setInterval(() => {
								that.clickable=true
								that.codeDuration--
								if (that.codeDuration === 0) {
									that.clickable=false
									if (that.codeInterVal) {
										clearInterval(that.codeInterVal)
										that.codeInterVal = null
									}
								}
							}, 1000)
						}else{
							uni.showToast({
								title:'发送失败！',
								icon:'none',
								mask:true,
								image:'../../static/img/error.png'
							})
						}	
					},
					fail: (err) => {
						console.log(err)
						uni.showToast({
							title:'发送失败'
						})
					}
				})
			},
			changePw(){
				var that=this;
				var token=`Bearer ${this.token}`;
				console.log(this.phone)
				if (!/^1\d{10}$/.test(this.phone)) {
						uni.showToast({
							title:'手机号填写错误！',
							icon:'none',
							mask:true,
							image:'../../static/img/error.png'
						})
						return
					}
					else if(!/^\d{6}$/.test(this.code)){
						uni.showToast({
							title:'验证码为6位纯数字！',
							icon:'none',
							mask:true,
							image:'../../static/img/error.png'
						})
						return;
					}
					else if(this.newpassword==this.oldpassword) {
						uni.showToast({
							title:'新旧密码不能相同',
							icon:'none',
							mask:true,
							image:'../../static/img/error.png'
						})
						
						return;
					}
					else if(this.newpassword.length < 6) {
						uni.showToast({
							title:'密码最短为 6 个字符',
							icon:'none',
							mask:true,
							image:'../../static/img/error.png'
						})
						
						return;
					}
					else{
						uni.request({
							url:'https://fwwb2020-proxy-slk.tgucsdn.com/user/changePassword',
							method: 'POST',
							header: {
								"content-type": "application/json",
								"Authorization":token,
							},
							data: {
								  newPassword: that.newpassword,
								  tel: that.phone,
								  code: that.code,
								  uid:that.uid
							},
							success: (res) => {
								// console.log("注册成功")
								console.log(res.data)
								if(res.data.status==200){
									uni.showToast({
										title:'修改成功！',
										icon:'none',
										mask:true,
										image:'../../static/img/success.png'
									})
									
									setTimeout(function(){
										uni.showToast({
											title:'请重新登录',
											icon:'none',
											mask:true,
											image:'../../static/img/success.png'
										})
										store.commit('loginOut')
									},1000)
									
									setTimeout(function(){
										uni.switchTab({
											url:'./person'
										})
										
									},2000)
									
								}
								else{
									uni.showToast({
										title:`${res.data.msg}`,
										icon:'none',
										mask:true,
										image:'../../static/img/error.png'
									})
								}
								// 获得token，以及username并存储在localstorage
								// uni.setStorageSync('uniIdToken', )
								// uni.setStorageSync('username', )
								// uni.reLaunch({
								// 	url:'../main/main'
								// })
								
							},
							fail: (err) => {
								uni.showToast({
									title:'修改失败',
									icon:'none',
									mask:true,
									image:'../../static/img/error.png'
								})							
							}
						})
					} 
				}
			}
	}
</script>

<style>
	.container{
		width: 100%;
		display: flex;
	}
	.registerMain{
		width: 90%;
		margin: 40rpx auto;
		border: 2rpx solid #F1F1F1;
		padding: 20rpx;
		border-radius: 20rpx;
	}
	.input-row {
		/* width: 95vw; */
		display: flex;
		flex-direction: row;
		position: relative;
		/* padding:1px 2px; */
		/* font-size: 18px; */
		/* margin-top: 10px; */
		/* line-height: 40px; */
		/* border: 1px solid #e4e5ea;
		border-radius: 10px;
		background-color: #FFFFFF; */
	}
	
	.send-code-btn {
		width: 280rpx;
		text-align: center;
		background-color: #ff0000;
		color: #FFFFFF;
		font-size: 24rpx;
	}
</style>
