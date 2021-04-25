<template>
	<view>
		<view class="articleTitle">
			<uni-row>
				<uni-col :span="24"><text class="newsTitle">{{newsDetail.title}}</text></uni-col>
			</uni-row>
			<uni-row>
				<uni-col :span="24"><image v-if="imgFlag" class="newsCover" :src="newsDetail.cover"></image></uni-col>
			</uni-row>
			<uni-row>
				<uni-col :span="6" :offset="2"><text class="newsSubTitle">{{newsDetail.username}}</text></uni-col>
				<uni-col :span="9" offset="4"><text class="newsSubTitle">{{newsDetail.time}}</text></uni-col>
			</uni-row>
		</view>
		<view class="articleContent">
			<!-- <text>{{newsDetail.context}}</text> -->
			<!-- <rich-text :nodes="Rstring"></rich-text> -->
			 <u-parse  :content="Rstring" ></u-parse>
		</view>
	</view>
</template>

<script>
	import uParse from '../../components/u-parse/u-parse.vue';
	export default{
		data(){
			return{
				newsDetail:{},
				Rstring:"",
				imgFlag:false
			}
		},
		components:{
			uParse
		},
		onLoad(options){
			// var item={};
			if(options!=null){
				var item=decodeURIComponent(options.detail);
				// var item=JSON.parse(options.detail);
				item=JSON.parse(item)
				console.log(item)
				// item.cover=decodeURIComponent(item.cover)
				this.imgFlag=true;
				// console.log(item.cover)
				this.newsDetail=item;
				this.Rstring=this.newsDetail.context
				console.log(this.newsDetail.cover)
			}
			
		}
	}
</script>

<style>
	@import url("@/components/u-parse/u-parse.css");
	.articleTitle{
		width: 90%;
		margin: 10rpx;
		padding: 10rpx;
		
	}
	.newsTitle{
		font-size: 36rpx;
		font-weight: 600;
		text-align: center;	
	}
	.newsCover{
		width: 100%;
		margin: 10rpx auto;
	}
	.newsSubTitle{
		font-weight: 28rpx;
		font-weight: 300;
	}
	.articleContent{
		width: 90%;
		margin: 20rpx auto;
	}
	.articleContent text{
		font-size: 32rpx;
		
	}
</style>
