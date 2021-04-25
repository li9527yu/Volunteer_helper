<template>
    <view class="container">
		<view class="content">
			<view class="login-type">
				<view 
					v-for="(item,index) in loginTypeList" 
					:key="index" 
					@click="loginType = index" 
					:class="{act: loginType === index}"
					class="login-type-btn">{{item}}</view>
			</view>
			<view class="loginMain">
				<view  v-if="loginType === 0">
					<uni-forms border>
					    <uni-forms-item label="手机号:">					
					        <uni-easyinput :inputBorder="false" clearable v-model="phone" placeholder="请输入手机号" ></uni-easyinput>
					    </uni-forms-item>
					    <uni-forms-item label="密码:">
					        <uni-easyinput type="password" :inputBorder="false" clearable v-model="password" placeholder="请输入密码" ></uni-easyinput>
					    </uni-forms-item>
					</uni-forms>
				</view>
				<view  v-else>
					<uni-forms border>
					    <uni-forms-item label="手机号:">					
					        <uni-easyinput :inputBorder="false" clearable v-model="phone" placeholder="请输入手机号" ></uni-easyinput>
					    </uni-forms-item>
						<uni-forms-item label="验证码:">
							<view class="input-row">
								<uni-easyinput :inputBorder="false" clearable v-model="code" placeholder="请输入短信验证码" ></uni-easyinput>
								<button class="send-code-btn" @click="sendCode" :disabled="clickable">{{codeDuration ? codeDuration + 's' : '发送验证码' }}</button>
							</view>
						</uni-forms-item>
					</uni-forms>
				</view>
			</view>
			<view class="login">
				<button type="warn" :loading="loading" @tap="bindLogin()" class="loginbtn"> {{ loading ? "登录中...":"登 录"}} </button>
			</view>
			<view class="footer">
				<uni-row>
					<uni-col :span="6" :offset="18"><text class="register"@click="registerTo">立即注册</text></uni-col>
				</uni-row>
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
	export default {
		data() {
			return {
				phone:'',
				password:'',
				code:'',
				loginType: 0,
				loginTypeList: ['密码登录','免密登录'],
				loading: false,
				codeDuration: 0,
				codeInterVal:null,
				clickable:false

			};
		},
		// computed: {
		// 	...mapState(['isLogin','userId'])
		// },
		methods:{
			registerTo(){
				console.log('register')
				uni.navigateTo({
					url:'../register/register'
				})
			},
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
					url:'https://fwwb2020-proxy-slk.tgucsdn.com/user/getMsgCode',
					data:{
						tel:that.phone,
					},
					header:{
						"content-type":"application/json"
					},
					method:'POST',
					success: (res) => {
						console.log(res)
						if(res.data.status==201){
							uni.showToast({
								title:'发送成功！',
								icon:'none',
								mask:true,
								image:'../../static/img/success.png'
							})
							this.codeDuration = 60
							this.codeInterVal = setInterval(() => {
								this.clickable=true
								this.codeDuration--
								if (this.codeDuration === 0) {
									this.clickable=false
									if (this.codeInterVal) {
										clearInterval(this.codeInterVal)
										this.codeInterVal = null
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
			loginBySms() {
				var that=this;
				if (!/^1\d{10}$/.test(this.phone)) {					
					uni.showToast({
						title:'手机号填写错误',
						icon:'none',
						mask:true,
						image:'../../static/img/error.png'
					})
					return
				}
				if (!/^\d{6}$/.test(this.code)) {					
					uni.showToast({
						title:'验证码为6位数',
						icon:'none',
						mask:true,
						image:'../../static/img/error.png'
					})
					return;
				}
				that.loading = true;
				setTimeout((e=>{
					that.loading = false;
				}),1500);
				uni.request({
					url:'https://fwwb2020-proxy-slk.tgucsdn.com/user/loginByMessage',
					data:{
						tel:that.phone,
						code:that.code
					},
					method:'POST',
					header:{
						"content-type":"application/json"
					},
					success: res => {
						console.log(res.data)
						if(res.data.status==200){							
							uni.showToast({
								title:'登录成功',
								icon:'none',
								mask:true,
								image:'../../static/img/success.png'
							})
							store.commit("login",res.data.data)
							setTimeout(function(){
								uni.switchTab({
									url:"../person/person"
								})
							},1000)
						}
						else if(res.data.status==500){
							uni.showToast({
								title:'服务器错误',
								icon:'none',
								mask:true,
								image:'../../static/img/error.png'
							})
						}else{
							// console.log(res.data.msg)
							uni.showToast({
								title:`${res.data.msg}`,
								icon:'none',
								mask:true,
								image:'../../static/img/error.png'
							})	
						}
					},
					fail: (err) => {
						console.log()
						uni.showToast({
							title:'登录失败！',
							icon:'none',
							mask:true,
							image:'../../static/img/error.png'
						})
					}
				})
				
			},
			bindLogin() {
				// console.log(this.loginType)
				switch (this.loginType) {
					case 0:
						this.defaultHandlerLogin()
						break;
					case 1:
						this.loginBySms()
						break;
					default:
						break;
				}
			},
			defaultHandlerLogin:function(){
				var that=this;
				console.log(this.phone)
				console.log(this.password)
				if (!/^1\d{10}$/.test(this.phone)) {
					uni.showToast({
						title:'手机号填写错误',
						icon:'none',
						mask:true,
						image:'../../static/img/error.png'
					})
					return
				}
				if (this.password.length < 6) {
					
					uni.showToast({
						title:'密码最短为 6 个字符',
						icon:'none',
						mask:true,
						image:'../../static/img/error.png'
					})
					return;
				}
				that.loading = true;
				setTimeout((e=>{
					that.loading = false;
				}),1500);
				// console.log(JSON.stringify(this.login));
				uni.request({
					url: "https://fwwb2020-proxy-slk.tgucsdn.com/user/loginByPassword",
					method: "POST",
					header: {
						"Content-Type": "application/json"
					},
					data: {
						"tel": that.phone,
						"password": that.password
					},
					success: res => {
						console.log(res.data);
						if(res.data.status===200) {
							uni.showToast({
								title:'登录成功!',
								icon:'none',
								mask:true,
								image:'../../static/img/success.png'
							})
							store.commit("login",res.data.data)
							console.log(res.data.data)
							setTimeout(function(){
								uni.switchTab({
									url:"../person/person"
								})
							},1000)
						}
						else if(res.data.status==500){
							uni.showToast({
								title:'服务器错误',
								icon:'none',
								mask:true,
								image:'../../static/img/error.png'
							})
						}
						else{
							uni.showToast({
								title:`${res.data.msg}`,
								icon:'none',
								mask:true,
								image:'../../static/img/error.png'
							})
						}
						
					},
					fail: (err) => {
						uni.showToast({
							title:'登录错误',
							icon:'none',
							mask:true,
							image:'../../static/img/error.png'
						})
					}
				});
			}
			
			}
	}
</script>

<style>
	.container{
		width: 100%;
	}
    .content {
    	width: 90%;
    	margin: 0 auto;
		display: flex;
		flex-direction: column;
    }
    .login-type {
		flex: 1;
		margin: 0 auto;
    	display: flex;
    	justify-content: center;
    }
    
    .login-type-btn {
    	line-height: 30px;
    	margin: 0px 15px;
    }
    
    .login-type-btn.act {
    	color: #ff0000;
    	border-bottom: solid 1px #ff0000;
    }
    .loginMain{
		margin-top: 10px;
	}
    .login{
    	width: 100%;
    	margin: 0 auto;
    	padding-top: 10px;
    }
	.footer{
		margin-top: 10px;
	}
	.register{
		font-size: 16px;
		font-weight: 500;
		color: #ff0000;
	}
	.input-row {
		/* width: 95vw; */
		display: flex;
		flex-direction: row;
		position: relative;

	}
	
	.send-code-btn {
		width: 280rpx;
		text-align: center;
		background-color: #ff0000;
		color: #FFFFFF;
		font-size: 24rpx;
	}
</style>

