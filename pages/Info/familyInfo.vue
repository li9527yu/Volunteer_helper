<template>
	<view class="content">
		<view class="Info">
			<!-- 姓名 -->
			<van-row class="formRow">
				<van-col offset="1" span="22">
					 <van-field
						class="text"
						label="姓名:"
						v-model="value"
						:error-message="nameError"
					    :value="info.name"
					    placeholder="请输入用户名"
					    :border="false"
						:clearable="true"
						:required="true"
					  />
				</van-col>
			</van-row>
			<!-- 性别 -->
			<van-row class="formRow">
				<van-col span="4" offset="2" class="Sextext">性别:</van-col>
				<van-col offset="2"  span="16">
					 <van-radio-group
					   :value="info.radio"
					   @change="onChange"
					   direction="horizontal"
					 >
					   <van-radio name="1" class="selectOne">先生</van-radio>
					   <van-radio name="2" class="selectOne">女士</van-radio>
					 </van-radio-group>
				</van-col>
			</van-row>	  
			<!-- 电话 -->
			<van-row class="formRow">
				<van-col offset="1" span="22">
					 <van-field
						label="电话:"
						v-model="value"
					    :value="info.phone"
						@change="phoneInput"
						type="number"
					    placeholder="请输入电话号码"
						:error-message="phoneError"
					    :border="false"
						:clearable="true"
						:required="true"
					  />
				</van-col>
			</van-row>
			<!-- 选择地区 -->
			<van-row class="formRow"  >
				<van-col span="6" offset="2"  class="text">选择地区:</van-col>
							<van-col span="16"><text @click="showPopup" class="selectCity">{{info.city}}</text></van-col>
				            <van-popup :show="show" round position="bottom" :overlay="true" @close="onClose">
				                <van-picker 
										id="picker"
										show-toolbar 
										title="请选择城市" 
										:columns="columns" 
										@cancel="onCancel"
										@confirm="onConfirm" 
										@change="cityChange" />
				            </van-popup>
			</van-row>
			<!-- 详细地址 -->
			<van-row class="formRow"  >
			 			<!-- <van-col span="6" offset="2"   class="text">详细地址:</van-col> -->
			 			<van-col  offset="1" span="22">
			 				 <van-field
								label="详细地址:"
			 				    :value="info.address"
			 					type="number"
			 				    placeholder="请输入详细地址"
			 				    :border="false"
								:clearable="true"
								:required="true"
			 				  />
			 			</van-col>  
			</van-row>
			<!-- 身份证号 -->
			<van-row class="formRow"  >
			 			<!-- <van-col span="6" offset="2"   class="text">身份证号:</van-col> -->
			 			<van-col offset="1" span="22">
			 				 <van-field
								label="身份证号:"
			 				    :value="info.numID"
			 					type="number"
			 				    placeholder="请输入身份证号 "
			 				    :border="false"
								:clearable="true"
								:required="true"
			 				  />
			 			</van-col>
			           
			</van-row>
			<!-- 上传照片 -->
			<van-row class="formRow"  >
				<van-col span="10" offset="2">
					<van-uploader 
						:file-list="fileList1"
						@after-read="afterRead1"
						max-count="1">
					</van-uploader>
				</van-col>
				<van-col span="10">
					<van-uploader 
						:file-list="fileList2" 
						@after-read="afterRead2" />
				</van-col>
			</van-row>
		</view>
		<view class="InfoConfirm">
				<van-button @click="finisnInfo" class="confirmButton" type="primary" size="large" block round>完成</van-button>
		</view>
	</view>
</template>

<script>
	const citys = {
	  浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
	  福建: ['福州', '厦门', '莆田', '三明', '泉州'],
	};
	export default{
		data(){
			return{
				info:{
					radio:'',
					name:'12323',
					phone:'',
					address:'',
					numID:"",
					city:'暂未选择',
				},
				show:false,
				columns: [
				      {
				        values: Object.keys(citys),
				        className: 'column1',
				      },
				      {
				        values: citys['浙江'],
				        className: 'column2',
				        defaultIndex: 2,
				      },
				    ],
				
				fileList1: [],
				fileList2:[],
				nameError:'',
				phoneError:''
			}
		},
		methods:{
			onChange(event) {
				console.log(event.detail)
				this.radio=event.detail
			},
			cityChange(event) {
				const { picker, value, index } = event.detail;
				picker.setColumnValues(1, citys[value[0]]);
			},
			onClose(){
				this.show=false
			},
			onCancel(){
				this.show=false
			},
			onConfirm(){
				this.show=false
				const picker =this.selectComponent('#picker').getValues()
				console.log(picker)
				this.info.city=`${picker[0]}省/${picker[1]}市`;
				console.log(this.info.city)
			},
			showPopup(){
				this.show=true
			},
			afterRead1(event){
				const file= event.detail;
				console.log(file)
			},
			afterRead2(event){
				const file =event.detail;
				console.log(file)
			},
			phoneInput(event){
				// let phone=event.detail;
				// let reg = /^1[3|4|5|7|8][0-9]{9}$/; 
				// if(!reg.test(phone)){
				// 	// console.log('手机号有误')
				// 	this.phoneError='手机号有误'
				// }else{
				// 	this.phoneError='';
				// 	console.log('手机号无误')
				// }
			},
			finisnInfo(){
				// let reg = /^1[3|4|5|7|8][0-9]{9}$/; 
				// if(this.info.name.length<1){
				// 	console.log(this.info.name)
				// 	console.log(this.info.name.length)
				// 	console.log('name err')
				// }
				// else if(reg.test(this.info.phone)){
				// 	console.log(this.info.phone)
				// 	// console.log(this.info.phone.length)
				// 	console.log('phone err')
				// }
				// else if(this.info.address.length<1){
				// 	console.log(this.info.address.length)
				// 	console.log('address err')
				// }
				// else if(this.info.numID.length<1)
				// {
				// 	console.log(this.info.numID.length)
				// 	console.log('id err')
				// }else{
				// 	console.log(this.info)
				// 	console.log('yes')
				// }
				uni.switchTab({
					url: '/pages/index/index'		
				})
			}
	},
	}
</script>

<style>
	.content{
		flex-direction: column;
		padding-top: 5%;
	}
	.Info{
		flex:1;
		width: 90%;
		display: flex;
		margin: 10px auto;
		padding: 5px;
		flex-direction: column;
		border: 1px solid #eeefeb;
		border-radius: 20px;
	}
	.InfoConfirm{
		flex:1;
		width: 80%;
		margin: 10px auto;
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
</style>
