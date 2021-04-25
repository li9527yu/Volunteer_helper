<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		onLaunch: function() {
			uni.getStorage({
				key:'userInfo',
				success: (res) => {						
					this.login(res.data)					
					console.log(res.data)
				},
				fail: (err) => {
					console.log(err)
				}
			})
			uni.getStorage({
				key:'VolunteerInfo',
				success: (res) => {						
					this.volunteer(res.data)					
					console.log(res.data)
				},
				fail: (err) => {
					console.log(err)
				}
			})
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			...mapMutations(['login','volunteer'])
		}
	}
</script>

<style>
	/*每个页面公共css */
	.content{
		display: flex;
		width: 100%;
	}
</style>
