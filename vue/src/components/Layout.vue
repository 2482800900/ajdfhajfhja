<template>
	<el-container class="page">
		<el-header>header</el-header>
		<el-container>
			<el-aside style="width:150px;">
                <!-- 
                    el-menu属性
                        default-active 激活的菜单
                        text-color 菜单文字颜色
                        active-text-color 激活菜单的颜色
                        router 启用路由模式
                 -->

				<el-menu
					:default-active="defaultActive"
					class="el-menu-vertical-demo"
					background-color="#545c64"
					text-color="#fff"
					active-text-color="#ffd04b"
                    router
					unique-opened
				>
					<el-menu-item index="/">
					<i class="el-icon-s-home"></i>
					首页
				  </el-menu-item>
					<el-submenu v-for="item of menus" :key="item.id" :index="item.title">
						<template slot="title">
							<i :class="item.icon"></i>
							<span>{{item.title}}</span>
						</template>
						<el-menu-item v-for="subitem of item.children" :key="subitem.id" :index="subitem.url">{{subitem.title}}</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-main>
                <router-view></router-view>
            </el-main>
		</el-container>
	</el-container>
</template>

<script>
import axios from 'axios'
export default {
	data(){
		return{
			menus:[],
			defaultActive:''
		}
	},
	mounted() {
		this.defaultActive = this.$route.meta.selected;
		axios.get('api/menulist',{params:{istree:true}}).then(result=>{
			this.menus = result.data.list
		})
	},
	 watch:{
	 	$route(newVal){
	 		this.defaultActive = newVal.meta.selected;
	 	}
	 }
}
</script>

<style scoped>
.page {
	width: 100vw;
	height: 100vh;
}
.el-header {
	background-color: skyblue;
}
.el-aside {
	background-color:#545c64;
}
.el-submenu .el-menu-item{
    min-width: 150px;
}
</style>