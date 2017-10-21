<template>
    <!-- 通常编写组件的html结构，注意vue2.0中一定要有一个根元素 -->
    <div class="tmpl">
        <el-row>
            <!--1.0 左边菜单 -->
            <el-col :span="leftcol">
                <!--<img src="../../../statics/imgs/logo.png" alt="">-->
                <div class="layout menu">
                    <el-menu default-active="1-2" :collapse="iscollapse" class="el-menu-vertical-demo" >
                        <!--购物商城  -->
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-message"></i>购物商城</template>
                            <el-menu-item-group>
                                <router-link to="/admin/goodslist">
                                    <el-menu-item index="1-1">内容管理</el-menu-item>
                                </router-link>
                                <el-menu-item index="1-2">类别管理</el-menu-item>
                                <el-menu-item index="1-3">评论管理</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                        <!-- 订单管理 -->
                        <el-submenu index="2">
                            <template slot="title"><i class="el-icon-message"></i>订单管理</template>
                            <el-menu-item-group>
                                <el-menu-item index="2-1">订单列表</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </div>
            </el-col>

            <!--右边区域-->
            <el-col :span="rightcol">
                <!-- 2.0.1 顶部区域 -->
                <el-row>
                    <el-col :span="24">
                        <div class="topbg">
                            <el-row>
                                <el-col :span="1">
                                    <!-- 控制菜单的展开和收缩图标 -->
                                    <i @click='show' class="el-icon-menu layout area"></i>
                                </el-col>
                                <el-col :span="23">
                                    <span>欢迎xxx登录</span>
                                    <el-dropdown split-button type="primary">
                                        更多
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item>修改密码</el-dropdown-item>
                                            <el-dropdown-item>注销登录</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </el-col>
                            </el-row>
                        </div>

                    </el-col>
                </el-row>
                <!-- 2.0.2 内容矛 -->
                <el-row>
                    <el-col :span="24">
                        <!-- 利用vue-router进行填充 -->
                        <router-view></router-view>
                    </el-col>
                </el-row>
            </el-col>






        </el-row>
    </div>
</template>

<script>


    export default{
        data (){
        return {
            iscollapse:false,
            leftcol:4,
            rightcol:20
        }
    }
    ,
    methods:{
        show(){
            this.iscollapse = !this.iscollapse
            this.rightcol = 23;
            if(this.iscollapse){
                this.leftcol = 1
                this.rightcol = 23
            }else{
//                rightcol = 20;
                this.leftcol = 4
                this.rightcol = 20
            }
        }
    }
    }
</script>

<style>

</style>