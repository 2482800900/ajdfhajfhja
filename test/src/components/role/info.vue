<template>
    <div>
         <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path: '/role'}">角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色{{tip}}页</el-breadcrumb-item>
    </el-breadcrumb>
        <!-- 
            el-form 表单验证
                model 要验证的数据
                rules 验证规则
                ref 可以通过dom操作来实现调用组件的属性和方法
         -->
        <el-form :model="info" :rules="rules" ref="form" style="width:400px;" label-width="80px">
            <!-- prop属性是rules验证规则中的键名 -->
            <el-form-item label="角色名称" prop="rolename">
                <el-input placeholder="请输入角色名称" v-model="info.rolename"></el-input>
            </el-form-item>
            <el-form-item label="角色权限">
                <!-- 
                    el-tree属性
                    data 要展示的树形结构的数据
                    props 树形结构数据的默认属性
                    show-checkbox 显示复选框
                    node-key 选中节点的value 值的字段名
                    default-expanded-keys 展开默认选中的节点 类型是数组
                 -->
                <el-tree 
                :data="menusarr" 
                :props="defaultProps"
                show-checkbox
                node-key="id"
                ref="mytree"
                :default-expanded-keys="checkedKeys"
                ></el-tree>
            </el-form-item>
            <el-form-item label="状态">
                <el-switch v-model="info.status" :active-value="1" :inactive-value="2"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        // 定义角色的初始数据
        return{
            tip:'添加',
            info:{
                rolename:'',
                menus:'',
                status:1
            },
            rules:{
                rolename:[
                    { required:true,message:'请填写角色名称' },
                    { min:3,max:20,message:'角色名称应该在3-20个字符之间' }
                ]
            },
            menusarr:[],
            checkedKeys:[],
            defaultProps: {
                children: 'children',
                label: 'title'
        }
        }
    },
    // 角色信息页面组件挂载完成后，请求接口，获取上级角色选项数据
    mounted(){
        //如果动态路由携带了参数，则认为是编辑页面
        if(this.$route.params.id){
            this.tip = '编辑'
            //如果是编辑操作，则通过接口获取角色详情数据
            axios.get('/api/roleinfo',{ params:{id:this.$route.params.id} }).then(result=>{
                this.info = result.data.list
                //进入角色编辑 根据id选中权限 刚才后台要字符串 现在是default-expanded-keys需要数字数组 不是字符串数组所以split后需在遍历
                this.checkedKeys= this.info.menus.split(',').map(d=>parseInt(d))
                this.$refs.mytree.setCheckedKeys(this.checkedKeys)
            })
        }
        axios.get('/api/menulist?istree=true').then(result=>{
            this.menusarr = result.data.list
        })
    },
    methods:{
        submit(){
            this.$refs['form'].validate((val)=>{
                if(val){
                    //验证成功
                    //调用接口，完成数据的添加操作
                    var url = '/api/roleadd'
                    if(this.$route.params.id){
                        //如果是编辑操作，则执行修改的接口，并添加接口需要的必要参数
                        url = '/api/roleedit'
                        this.info.id = this.$route.params.id
                    }
                    //把选中的节点数组转换为字符串并赋值给对象
                    //getCheckedKeys 获取选中节点的id属性 是数组 需要转换成字符串
                    this.info.menus = this.$refs.mytree.getCheckedKeys().join(',');
                    axios.post(url,this.info).then(res=>{
                        if(res.data.code === 200){
                            this.$router.push('/role')
                        }
                    })
                }
            })
        },
    }
}
</script>

<style>

</style> 