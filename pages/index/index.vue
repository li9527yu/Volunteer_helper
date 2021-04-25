<template>
	<view class="content">
		<view class="indexHead">
			
			<swiper :autoplay="true">
				<swiper-item><image class="oldImageItem" src="../../static/img/index1.jpg"></image></swiper-item>
				<swiper-item><image class="oldImageItem" src="../../static/img/index2.jpg"></image></swiper-item>
				<swiper-item><image class="oldImageItem" src="../../static/img/index3.jpg"></image></swiper-item>
			</swiper>
		</view>
		<view class="IndexArticle" v-if="newsGet">
			<uni-list>
				<uni-list-item
					class="messageItem"
					clickable="true"
					@click="enterDetail(index)"
					v-for="(item,index) in newsList" :key="index"
					:thumb="item.cover"
					ellipsis="1"
					thumbSize="lg"
					>
					<view class="newsBody" slot="body" >
						<uni-row>
							<uni-col :span="24"><text class="newsTitle">{{item.title}}</text></uni-col>
						</uni-row>
						<uni-row>
							<!-- <uni-col :span="8"><text class="newsEditor">{{item.username}}</text></uni-col> -->
							<uni-col :span="16">
								<rich-text class="newsContext" :nodes="contextList[index]"></rich-text>
								<!-- <text class="newsContext">{{item.context}}</text> -->
							</uni-col>
						</uni-row>
					</view>
					<view class="newsfooter" slot="footer" >
						<uni-row>
							<uni-col :offset="2" :span="24"><text class="newsEditor">{{item.username}}</text></uni-col>
						</uni-row>
						<uni-row>
							<uni-col :offset="2" :span="24"><text class="newsEditor">{{item.time}}</text></uni-col>
						</uni-row>
					</view>
				</uni-list-item>
			</uni-list>
		</view>
		<view class="Empty" v-else>
			<image class="EmptyImg" src="../../static/img/empty.png"></image>
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
				newsGet:false,
				newsList:[],
				contextList:[],
				newsImage:'/static/img/indexNews.png',
				indexImg1:'tatic/img/index1.png',
				indexImg2:'/static/img/index2.png',
				indexImg3:'/static/img/index3.png',
			}
		},
		computed:{
			...mapState(['token','uid','tel','pw','vid','isLogin','status']),
			// timeEdit:function(index){
				
			// }
		},
		created() {
			this.newsGet=false
			if(!this.isLogin){
				uni.showModal({
					title:'您还未登录，是否现在登录？',
					success: (res) => {
						if(res.confirm){
							uni.reLaunch({
								url:'../login/login'
							})
						}
					}
				})
			}
			console.log(this.status)
		},
		onLoad() {
			
			if(this.isLogin){
				this.getworks()
				this.getVolunteerInfo();
			}
		},
		onShow() {
			console.log(this.status)
			if(!this.isLogin){
				this.newsGet=false
			}
		},
		onPullDownRefresh() {
			this.getworks()
			setTimeout(function(){
				uni.stopPullDownRefresh()
			},1500)
		},
		methods: {
			enterDetail(index){
				var detail=this.newsList[index]
				
				// detail.cover=encodeURIComponent(detail.cover)
				detail=JSON.stringify(detail)
				detail=encodeURIComponent(detail)
				console.log(detail)
				uni.navigateTo({
					url:'./indexDetail?detail='+detail
				})
			},
			getVolunteerInfo(){
				var that=this;
				var token=`Bearer ${this.token}`;
				if(this.isLogin){
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
				}
				else{
					uni.showToast({
						title:'请先登录！',
						icon:'none',
						mask:true,
						image:'../../static/img/error.png'
					})
				}
				
			},
			getworks(){
				var that=this;
				var token=`Bearer ${this.token}`;
				if(this.isLogin){
					uni.request({
						url:'https://fwwb2020-proxy-slk.tgucsdn.com/article/get15',
						method:'POST',
						data:{},
						header:{
							"Authorization":token,
						},
						success: (res) => {
							console.log(res.data)
							if(res.data.status==200){
								uni.showToast({
									title:`成功获得文章！`,
									icon:'none',
									mask:true,
									image:'../../static/img/success.png'
								})
								var news=res.data.data.article;
								if(news.length!=0){
									that.newsGet=true;
									news.forEach(function(item,index){
										item.time=item.time.slice(0,10)
										if(item.username==null){
											item.username="匿名"
										}
										that.contextList.splice(index,1,item.context)
										that.newsList.splice(index,1,item)
										// console.log(item)
										// console.log(index)
									})
								}
								
							}else{
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
								title:`获得文章失败`,
								icon:'none',
								mask:true,
								image:'../../static/img/error.png'
							})
							console.log(err)
						}
					})
					console.log(that.newsList)
				}
				else{
					uni.showToast({
						title:'请先登录！',
						icon:'none',
						mask:true,
						image:'../../static/img/error.png'
					})
				}
				
			},
		}
	}
</script>

<style>
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.IndexArticle{
		width: 100%;
		/* margin-top: 4rpx; */
	}
	.messageItem{
		width: 100%;
	}
	.Title{
		font-size: 36rpx;
		font-weight: 600;
		line-height: 36rpx;
	}
	.TitleBody{
		background-color: #a2a2a2;
	}
	.newsTitle{
		font-size: 36rpx;
		font-weight: 600;
		 display: inline-block;
		  white-space: nowrap; 
		  width: 100%; 
		  overflow: hidden;
		  text-overflow:ellipsis;
	}
	.newsEditor{
		font-size: 24rpx;
		font-weight: 200;
	}
	.newsContext{
		font-size: 28rpx;
		font-weight: 200;
		overflow: hidden;
		  text-overflow: ellipsis;
		  display: -webkit-box;
		  -webkit-line-clamp: 2;
		  -webkit-box-orient: vertical;
		
	}
	/* .newsHeadr{
		width: 20%;
	} */
	.newsBody{
		width: 65%;
	}
	.newsfooter{
		/* width: 50%; */
	}
	.indexHead{
		width: 100%;
	}
	.oldImageItem{
		width: 100%;
		text-align: center;
		/* border: 1px solid #FFFFFF; */
		/* border-radius: 28rpx 28rpx 0 0; */
	}
	.Empty{
		width: 100%;
	}
	.EmptyImg{
		width: 750rpx;
		height: 500rpx;
	}
</style>
