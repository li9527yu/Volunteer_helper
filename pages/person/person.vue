<template>
	<view class="container">
		<view class="InfoTitle" @click="longinTo" :hover-class="!isLogin?'logo-hover' : ''">
			<uni-row>
				<uni-col span="6" offset="2" >
					<view class="imgDiv">
						<image v-if="picture" class="personImg" :src="picture"/>
						<image v-else class="personImg" src="../../static/img/defaultImg.png"/>
					</view>
				</uni-col>
				<uni-col span="12">
					<view class="NameInfo">
						<text class="titleName">欢迎您！</text>
						<text class="titleName">{{isLogin?(name?name:tel):`请先登录！`}}</text>
					</view>
				</uni-col>
				<uni-col span="4">
					<view class="changeButton" v-if="!isLogin">
						<!-- <text class="changeInfo">修改资料</text> -->
						<uni-icons  class="changeArrow" type="arrowright" size="18px" color="#FFFFFF"/>
					</view>
				</uni-col>
			</uni-row>
		</view>
		<view class="InfoBody">
			<view class="InfoShow" v-if="isLogin">
				<uni-row v-if="!isPerfectInfo">
					<uni-col :span="24">
						<view class="perfectInfo">
							<button
								class="perfectButton"
								type="warn" 
								@click="perfectInfo"
								>+完善信息</button>
						</view>
					</uni-col>
				</uni-row>
				<view class="userInfo" v-if="isPerfectInfo">
					<uni-row>
						<uni-col span="6" offset="1"><text class="userInfoTitle">个人信息：</text></uni-col>
						<uni-col span="6" offset="10">
							<text class="changeInfo" @click="changeInfo">修改资料</text>
							<uni-icons type="arrowright"></uni-icons>
						</uni-col>
					</uni-row>
					<uni-row >
						<uni-col offset="3">
							<ul class="Item">
								<li><text class="ItemTitle">ID:<text class="itemBody">{{uid}}</text></text></li>
								<li><text class="ItemTitle">状态：<text class="itemBody">已实名认证</text></text></li>
								<li><text class="ItemTitle">姓名：<text class="itemBody">{{name}}</text></text></li>
								<li><text class="ItemTitle">性别：<text class="itemBody">{{genderTo}}</text></text></li>
								<li><text class="ItemTitle">电话：<text class="itemBody">{{tel}}</text></text></li>
								<li><text class="ItemTitle">志愿者状态：<text class="itemBody">{{vStatus}}</text></text></li>
							</ul>
						</uni-col>
					</uni-row>
				</view>
			</view>
			<!-- <view class="function" v-if="">
				<uni-row>
					<uni-col :span="24">
						<uni-list >
			
							<uni-list-item  title="申请成为志愿者" icon="user-o" link to="../Info/volunteerInfo" showArrow showExtraIcon	:extraIcon="exr2"></uni-list-item>
						</uni-list>
					</uni-col>
				</uni-row>
			</view> -->
			<view v-if="isLogin" class="changePw">
				<uni-list :border="false">
					<uni-list-item to="./changePw" showExtraIcon="true" link title="修改密码" :extraIcon="exr1"></uni-list-item>
				</uni-list>
			</view>
			<view v-if="isLogin" class="ButtonView">
				<button class="loginout" type="warn" @click="loginout">退出登录</button>
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
			return {
				  isShow:true,
					exr1:{color: '#071409',size: '22',type: 'gear-filled'},
					exr2:{color: '#051107',size: '22',type: 'personadd'},
					hasPhoto:false
			  }
		},
		onShow() {
			if(this.picture!=null){
				this.hasPhoto=true;
				console.log(this.hasPhoto)
				console.log(this.picture)
				
			}
			console.log(this.status)
			if(this.status==''){
				console.log('qqq')
			}
		},
		computed: {
			...mapState(['isLogin','name','isPerfectInfo','uid','name','gender','tel','token','picture','isVolunteer','status']),
			genderTo:function(){
				return this.gender?'女':'男'
			},
			vStatus:function(){
				switch(this.status){
					case 0:
						return `正在审核中`;
						break;
					case 10:
						return `未申请`;
						break;
					case 1:
						return `可服务`;
						break;
					case 2:
						return `请假`;
						break;
					case 3:
						return `设备故障`;
						break;
					
				}
				// if(this.status==0){
				// 	return `正在审核中`
				// }
				// else if(this.status!=10){
				// 	return `成功通过审核`
				// }else if
			}
		},
		onLoad() {
			console.log(this.status)
			// console.log(this.isLogin)
			// console.log(this.tel)
			// console.log(this.isPerfectInfo)
			if(this.isLogin){
				this.getVolunteerInfo();
			}
			// console.log(this.picture)
			// console.log(this.token)
		},
		onShow(){
			console.log(this.status)
			if(this.isLogin){
				console.log(this.isLogin)
				console.log(this.tel)
				console.log(this.isPerfectInfo)
				this.getVolunteerInfo();
			}
		},
		created() {
			if(this.isLogin){
				console.log(this.isLogin)
				console.log(this.tel)
				console.log(this.isPerfectInfo)
				this.getVolunteerInfo();
			}
		},
		methods:{
			changeInfo(){
				uni.navigateTo({
					url:'./changeInfo'
				})
			},
			perfectInfo(){
				console.log('111')
				uni.navigateTo({
					url:'../Info/perfectInfo'
				})
			},
			getVolunteerInfo(){
				var that=this;
				var token=`Bearer ${this.token}`;
				uni.request({
					url:'https://fwwb2020-proxy-slk.tgucsdn.com/volunteer/get',
					method:'POST',
					data:{
						uid:that.uid
					},
					header:{
						"content-type":"application/json",
						"Authorization":token,
					},
					success: (res) => {
						console.log(res.data);
						if(res.data.status==200){
							console.log('volunteer get success')
							store.commit("volunteer",res.data.data.volunteer)
						}else{
							console.log(res.data)
						}
						
					},
					fail: (err) => {
							console.log(err)
					}
				})
			},
			longinTo(){
				if(!this.isLogin){
					uni.navigateTo({
						url:'../login/login'
					})
				}
				else{
					
				}
			},
			loginout(){
				var that=this;
				uni.showModal({
					content:'确认退出？',
					success: (res) => {
						if(res.confirm)
						{
							store.commit('loginOut')
							uni.showToast({
								title:'退出成功！',
								icon:'none',
								mask:true,
								image:'../../static/img/success.png'
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	.container{
	/* 	display: flex;
		flex-direction: column; */
		width: 750rpx;
		/* height: 1500rpx; */
		/* background-color: #ff5500; */
	}
	.InfoTitle{
		/* flex: 1; */
		width: 100%;
		padding: 10px 0;
		/* border-bottom: 2px solid #f5f5f5; */
		background-color: #ff2003;
	}
	.logo-hover{
		opacity: 0.8;
	}
	.personImg{
		width: 220rpx;
		height: 220rpx;
		border-radius: 110rpx;
	}
	.imgDiv{
		width: 220rpx;
		height: 220rpx;
		background-color: #e5e5e5;
		border-radius: 110rpx;
		display: flex;
		justify-content:center;
		align-items: center;
	}
	.NameInfo{
		display: flex;
		flex-direction: column;
		text-align: center;
		
	}
	.titleName{
		flex: 1;
		font-size: 44rpx;
		color: #FFFFFF;
		font-weight: 600;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		line-height: 110rpx;
	}
	.changeButton{
		display: flex;
		justify-content:center;
		align-items: center;
		height: 220rpx;
		
	}
	.changeInfo{
		font-size: 36rpx;
		color: #ff0000;
		font-weight: 600;
	}
	.showstate{
		line-height: 41px;
		
	}
	.showstate text{
		font-size: 16px;
		font-weight: 600;
	}
	
	.perfectInfo{
		height: 40px;
		padding: 20px;
		background-color: #a8a8a8;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.perfectButton{
		font-size: 16px;
		font-weight: 500;
	}
	.InfoBody{
		width: 100%;
		height: 750rpx;
		margin-top: -15rpx;
		position: relative;
		background-color: #FFFFFF;
		border: 2rpx solid #ffffff;
		border-radius: 30rpx 30rpx 0 0;
	}
	.ButtonView{
		position: fixed;
		bottom: 30rpx;
		left: 0;
		right: 0;
		padding: 15rpx;
	}
	.changePw{
		margin-top: 40rpx;
	}
	.userInfo{
		margin-top: 80rpx;
	}
	.userInfoTitle{
		font-size: 36rpx;
		font-weight: 500;
	}
	.Item{
		margin-top: 60rpx;
	}
	.Item li{
		margin-top: 15rpx;
		font-size: 36rpx;
		font-weight: 300;
	}
	.ItemTitle{
		margin-right: 20rpx;
	}
	.itemBody{
		font-size: 40rpx;
	}
</style>
