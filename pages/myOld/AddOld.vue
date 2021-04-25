<template>
	<view class="content">
		<view class="Info">
			<uni-row>
				<uni-col><text class="tips">添加老人，请您填写下列信息：</text></uni-col>
			</uni-row>
			<uni-forms>
				<!-- 姓名 -->
			   <uni-forms-item label="姓名:">					
			        <uni-easyinput :inputBorder="false" clearable v-model="Oldinfo.name" placeholder="请输入老人的名字" ></uni-easyinput>
			    </uni-forms-item>
				<!-- 性别 -->
				<uni-forms-item label="性别:">
				    <uni-data-checkbox selectedColor="#ff0000" mode="tag" v-model="value" :localdata="range" @change="onChange()"></uni-data-checkbox>
				</uni-forms-item>
				<!-- 出生日期 -->
				<uni-forms-item label="出生日期:">
				    <uni-datetime-picker type="date" :value="date" start="1900-6-15" end="2035-6-15" @change="dateChange"></uni-datetime-picker>
				</uni-forms-item>
				<!-- 身高 -->
				<uni-forms-item label="身高:">
						<uni-easyinput :inputBorder="false" clearable v-model="Oldinfo.height" placeholder="请输入老人的身高" ></uni-easyinput>
				</uni-forms-item>
				<!-- 病情等级 -->
				<uni-forms-item label="病情等级 :">
						<uni-data-checkbox  selectedColor="#ff0000" mode="tag" v-model="Dvalue" :localdata="diseases" @change="diseaseChange"></uni-data-checkbox>
						<!-- <uni-easyinput :inputBorder="false" clearable v-model="Oldinfo.level" placeholder="请输入老人的病情等级" ></uni-easyinput> -->
				</uni-forms-item>
				<!-- 居住位置 -->
				<uni-forms-item label="居住位置:">
					<uni-easyinput @focus="chooseLocation" type="text" :inputBorder="false" clearable v-model="Oldinfo.address" placeholder="请输入老人的居住位置" ></uni-easyinput>
				</uni-forms-item>
				
				<!-- 上传照片 -->
				<uni-forms-item label="上传证明材料">
					<uni-file-picker
						v-model="Backimage" 
						fileMediatype="image" 
						mode="grid" 
						limit="1"
						:auto-upload="false"
						@select="selectBack" 
					   
					>
					<image src="../../static/img/back_card.png" style="width:100%;height: 100%;"></image>
					</uni-file-picker>
					<uni-file-picker
						v-model="Frontimage" 
						fileMediatype="image" 
						mode="grid" 
						limit="1"
						:auto-upload="false"
						@select="selectFront" 
					>
					<image src="../../static/img/front_card.png" style="width:100%;height: 100%;"></image>
					</uni-file-picker>
				</uni-forms-item>
			</uni-forms> 			
					
		</view>
		<view class="InfoConfirm">
				<button @click="AddOldInfo()" class="confirmButton" type="warn" >完成</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var QQMapWX = require('../../static/js/qqmap-wx-jssdk.js');
	var qqmapsdk;
	export default{
		data(){
			return{
				Oldinfo:{
					  address: "",
					  back_card: "",
					  city: "",
					  district: "",
					  front_card: "",
					  gender: 0,
					  latitude: "",
					  longitude: "",
					  name: "",
					  place: "",
					  level: 1,
					  province: "",
					  birthday:'',
					  height:'',
					  uid:''
				},
				value: 0,
				Dvalue:1,
				range: [{"value": 0,"text": "男"    },{"value": 1,"text": "女"}],
				diseases: [{"value": 1,"text": "轻微"    },{"value": 2,"text": "中度"},{"value": 3,"text": "严重"}],
				Backimage:[],
				Frontimage:[]
			}
		},
		created() {
			qqmapsdk = new QQMapWX({
			            key: 'QV7BZ-6M76X-TFL4M-TGKDY-FFC76-VJF7O'
			        });
			this.Oldinfo.uid=this.uid
		},
		computed:{
			...mapState(['token','uid','tel','pw'])
		},
		methods:{
			onChange(event) {
				// console.log(event.detail)
				this.Oldinfo.gender=event.detail.value
				console.log(this.Oldinfo.gender)
			},
			dateChange(value){
				// console.log(value)
				this.Oldinfo.birthday=`${value}`;
			},
			diseaseChange(e){
				console.log(e)
				this.Oldinfo.level=e.detail.value;
				console.log(this.Oldinfo.level)
			},
			selectBack(e){
				var that=this;
				// console.log('选择文件：',e)
				var path=e.tempFilePaths;
				var token=`Bearer ${this.token}`;
				uni.uploadFile({
					url:'https://fwwb2020-proxy-slk.tgucsdn.com/file/upload',
					header:{
						"Authorization":token,
						"Content-Type": "multipart/form-data"
					},
					filePath:path[0],
					name:'photo',
						success: (res) => {
							// console.log(res.data)
							var data=JSON.parse(res.data)
							console.log(data)
							if(data.status==202){
								that.Oldinfo.back_card=data.data.url
									uni.showToast({
										title:'上传成功',
										icon:'none',
										mask:true,
										image:'../../static/img/success.png'
									})
								}
							
							console.log(that.Oldinfo)
						},
						fail: (err) => {
							console.log(err)
						}
				})
			},
			selectFront(e){
				var that=this;
				// console.log('选择文件：',e)
				var path=e.tempFilePaths;
				var token=`Bearer ${this.token}`;
				uni.uploadFile({
					url:'https://fwwb2020-proxy-slk.tgucsdn.com/file/upload',
					header:{
						"Authorization":token,
						"Content-Type": "multipart/form-data"
					},
					filePath:path[0],
					name:'photo',
						success: (res) => {
							console.log(res.data)
							var data=JSON.parse(res.data)
							if(data.status==202){
								uni.showToast({
									title:'上传成功',
									icon:'none',
									mask:true,
									image:'../../static/img/success.png'
								})
								that.Oldinfo.front_card=data.data.url;
							}
							console.log(that.Oldinfo)
						},
						fail: (err) => {
							console.log(err)
						}
				})
			},
			chooseLocation(){
				var that=this;
				uni.chooseLocation({
					success(res) {
						// console.log(res)
						that.Oldinfo.latitude=res.latitude;
						that.Oldinfo.longitude=res.longitude;
						that.Oldinfo.address=res.address;
						that.Oldinfo.place=res.name;
						that.analysisLocation(res.latitude,res.longitude)
					}
				})
				console.log(that.info)
			},
			analysisLocation(lat,lon){
				var that=this;
				qqmapsdk.reverseGeocoder({
					location:{
						latitude:lat,
						longitude:lon
					},
					success:(res)=>{
						// console.log(res);
						that.Oldinfo.province=res.result.address_component.province;
						that.Oldinfo.city=res.result.address_component.city;
						that.Oldinfo.district=res.result.address_component.district;
					}
				})
				console.log(this.Oldinfo)
			},
			AddOldInfo(){
				console.log('finish')
				console.log(this.Oldinfo)
				var that=this;
				var token=`Bearer ${this.token}`;
				if (!this.Oldinfo.birthday) {
					uni.showToast({
						mask:true,
						image:'../../static/img/error.png',
						icon: 'none',
						title: '请填写出生日期'
					});
					return;
				}
				if (!this.Oldinfo.height) {
					uni.showToast({
						mask:true,
						image:'../../static/img/error.png',
						icon: 'none',
						title: '请填写身高'
					});
					return;
				}
				if (!this.Oldinfo.address) {
					uni.showToast({
						mask:true,
						image:'../../static/img/error.png',
						icon: 'none',
						title: '请填写居住位置'
					});
					return;
				}
				if (!this.Oldinfo.back_card&&!this.Oldinfo.front_card) {
					uni.showToast({
						mask:true,
						image:'../../static/img/error.png',
						icon: 'none',
						title: '请上传身份证照片'
					});
					return;
				}
				uni.request({
					url:'https://fwwb2020-proxy-slk.tgucsdn.com/elder/add',
					method:'POST',
					header:{
						"content-type":"application/json",
						"Authorization":token,
					},
					data:{
						address: that.Oldinfo.address,
						back_card: that.Oldinfo.back_card,
						city: that.Oldinfo.city,
						district: that.Oldinfo.district,
						// eid: that.Oldinfo.address,
						birthday:that.Oldinfo.birthday,
						front_card: that.Oldinfo.front_card,
						gender: that.Oldinfo.gender,
						height: that.Oldinfo.height,
						latitude: that.Oldinfo.latitude,
						level: that.Oldinfo.level,
						longitude: that.Oldinfo.longitude,
						name: that.Oldinfo.name,
						place: that.Oldinfo.place,
						province: that.Oldinfo.province,
						// status: that.Oldinfo.address,
						uid:that.Oldinfo.uid 
					},
					success: (res) => {
						if(res.statusCode==200){
							uni.showToast({
								title:'添加成功',
								icon:'none',
								mask:true,
								image:'../../static/img/success.png'
							})
							setTimeout(function(){
								uni.switchTab({
									url:"./oldPeople"
								})
							},1000)
							console.log(res.data)
							
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
							title:'添加失败！',
							icon:'none',
							mask:true,
							image:'../../static/img/error.png'
						})
					}
				})
			}
	},
	}
</script>

<style>
	.content{
		flex-direction: column;
	}
	
	.Info{
		flex:1;
		width: 90%;
		display: flex;
		margin: 10px auto;
		padding: 15px;
		flex-direction: column;
		border: 1px solid #eeefeb;
		border-radius: 20px;
	}
	.InfoConfirm{
		flex:1;
		width: 80%;
		margin: 10px auto;
	}
	.tips{
		font-size: 16px;
		font-weight: 600;
		margin-bottom: 20px;
	}
	.confirmButton{
		width: 100%;
	}
	.formRow{
		width: 100%;
		flex: 1;
		margin-bottom: 5px;
		/* border: 1px solid #000000; */
	}
	
	.text{
		/* height: 44px; */
		line-height: 44px;
		font-size: 14px;
		margin: 0 auto;
		color: #646566;
	}
	.Sextext{
		line-height: 20px;
		font-size: 14px;
		color: #646566;
	}
	.selectOne{
		font-size: 14px;
	}
	.selectCity{
		width: 100%;
		line-height: 44px;
		font-size: 14px;
		font-weight: 300;
		text-align: center;
		
	}
	.upload{
		display: flex;
	}
	.uploadfile{
		flex: 1;
		
	}
</style>
