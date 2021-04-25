<template>
	<view class="container">
		<view class="showOverlay" v-if="!isVolunteer">
			<van-overlay :show="!isVolunteer">
				<view class="showlay">
					<!-- <text class="tips" v-if="status==0">您的志愿者申请正在审核中</text> -->
					<button type="warn" @click="registerVolunteer">+申请成为志愿者</button>
				</view>
			</van-overlay>
		</view>
		<view class="volunteerFunction" v-else>
			<view class="chooseState">
				<van-row>
					<van-col offset="1" span="10" class="showstate"><text class="choose">请选择当前状态：</text></van-col>
					<van-col  span="13">
						<view class="end-title">
						     <view v-for="(item,index) in items" :key="index" :class="{btna:count == index}" @tap="change(index)">
						       <span class="item-title">{{item}}</span>
						    </view>
						</view>
					</van-col>
				</van-row>
			</view>
			<view class="chooseFunction">
				<!-- <uni-grid :column="2" @change="chooseFunction">
				    <uni-grid-item>
				        <text>文本</text>
				    </uni-grid-item>
					<uni-grid-item>
					    <text>文本</text>
					</uni-grid-item>
				    <uni-grid-item>
				        <text>文本</text>
				    </uni-grid-item>
				    <uni-grid-item>
				        <text>文本</text>
				    </uni-grid-item>
				</uni-grid> -->
				<van-grid clickable column-num="2">
				  <van-grid-item
				    icon="home-o"
				    link-type="navigateTo"
				    url="./task"
				    text="任务大厅"
				  />
				  <van-grid-item
				    icon="orders-o"
				    link-type="navigateTo"
				    url="./taskHistory"
				    text="我的任务"
				  />
				  <van-grid-item
				    icon="edit"
				    link-type="navigateTo"
				    url="../Info/VchangeInfo"
				    text="修改信息"
				  />
				  <van-grid-item
				    icon="delete-o"
				    link-type="navigateTo"
					@click="Vcancel()"
				    text="注销志愿者"
				  />
				</van-grid>
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
				btnnum: 0,
				items:["正常","请假","装备异常"],
				count:4,
				// sendToken:''
			}
		},
		computed: {
			...mapState(['isLogin','isVolunteer','vid','token','status','uid'])
		},
		created() {
			// this.sendToken=`Bearer ${this.token}`;
			console.log(this.vid)
			console.log(this.isVolunteer)
		},
		onShow() {
			this.getVolunteerInfo()
		},
		methods:{
			getVolunteerInfo(){
				var that=this;
				var token=`Bearer ${this.token}`;
				if(this.isVolunteer){
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
								// that.btnnum=;
								that.change(res.data.data.volunteer.status-1)
								// console.log(that.btnnum)
								// store.commit("volunteer",res.data.data.volunteer)
							}else{
								console.log(res.data)
							}
							
						},
						fail: (err) => {
								console.log(err)
						}
					})
				}
			},
			change(e) {
			     this.count = e
			     this.btnnum = e
			     console.log(this.count)
				 this.chooseState(this.count)
			  },
			registerVolunteer(){
				if(!this.isLogin){
					// console.log('login!')
					uni.showToast({
						title:'请先登录！',
						icon:'none',
						mask:true,
						image:'../../static/img/error.png'
					})
					return
				}
				else{
					console.log(this.status)
					if(this.status==0){
						console.log('qqq')
						uni.showToast({
							title:'您已申请志愿者！',
							icon:'none',
							mask:true,
							image:'../../static/img/error.png'
						})
					}
					else{
						uni.navigateTo({
							url:'../Info/volunteerInfo'
						})
					}
					
				}
				
			},
			chooseState(index){
				switch (index){
					case 0:
						this.BeIdle();
						break;
					case 1:
						this.BeBusy();
						break;
					case 2:
						this.BeFault();
						break;
				}
			},
			BeBusy(){
				// console.log(this.sendToken)
				var that=this;
				var sendToken=`Bearer ${this.token}`;
				uni.request({
					url:'https://fwwb2020-proxy-slk.tgucsdn.com/volunteer/beBusy',
					header:{
						"content-type":"application/json",
						"Authorization":sendToken,
					},
					data:{
						vid:this.vid
					},
					method:'POST',
					success: (res) => {
						console.log(res.data)
						// if(res){
							
						// }
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			BeFault(){
				var that=this;
				var sendToken=`Bearer ${this.token}`;
				uni.request({
					url:'https://fwwb2020-proxy-slk.tgucsdn.com/volunteer/beFault',
					header:{
						"content-type":"application/json",
						"Authorization":sendToken,
					},
					method:'POST',
					data:{
						vid:this.vid
					},
					success: (res) => {
						console.log(res.data)
						// if(res){
							
						// }
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			BeIdle(){
				var that=this;
				var sendToken=`Bearer ${this.token}`;
				console.log(sendToken)
				uni.request({
					url:'https://fwwb2020-proxy-slk.tgucsdn.com/volunteer/beIdle',
					header:{
						"content-type":"application/json",
						"Authorization":sendToken,
					},
					method:'POST',
					data:{
						vid:this.vid
					},
					success: (res) => {
						console.log(res.data)
						// if(res){
							
						// }
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			Vcancel(){
				console.log('cacelVolunteer')
				var that=this;
				var sendToken=`Bearer ${this.token}`;
				uni.showModal({
					title:'确定注销志愿者服务？',
					success: (res) => {
						if(res.confirm){
							uni.request({
								url:'https://fwwb2020-proxy-slk.tgucsdn.com/volunteer/deRegister',
								header:{
									"content-type":"application/json",
									"Authorization":sendToken,
								},
								method:'POST',
								data:{
									vid:that.vid
								},
								success: (res) => {
									if(res.data.status==200){
										uni.showToast({
											title:'注销成功！',
											icon:'none',
											mask:true,
											image:'../../static/img/success.png'
										})
										store.commit('cancelVolunteer')
									}
									else{
										uni.showToast({
											title:`${res.data.msg}`,
											icon:'none',
											mask:true,
											image:'../../static/img/error.png'
										})
									}
									// console.log(res.data)
									// // if(res){
										
									// // }
								},
								fail: (err) => {
									console.log(err)
									uni.showToast({
										title:`注销失败`,
										icon:'none',
										mask:true,
										image:'../../static/img/error.png'
									})
								}
							})
						}
					}
					
				})
			}
		}
	}
</script>

<style>
	.showlay{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.end-title{
	        display: flex;
	    }
	.end-title view{
		text-align: center;
		border: 1px solid #9c958d;
		border-radius: 3px;
		margin: 3px;
		flex: 1;
	}
	.btna{
		font-weight: 600;
		/* padding-bottom: 5px; */
		/* border-bottom: 2px #007AFF solid; */
		color: #FFFFFF;
		background-color: #FF2003;
	}
	.item-title{
		font-size: 28rpx;
		line-height: 28rpx;
	}
	.chooseState{
		margin: 5px;
		padding: 5px;
	}
	.choose{
		font-size: 32rpx;
		font-weight: 600;
	}
</style>
