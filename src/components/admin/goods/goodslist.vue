<template>

    <div class="arttmpl ">
        <el-row>
            <el-col :span="24">
                <div class="abread bt-line">
                    <!-- 使用elementUI中的面包屑导航组件完成 -->
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-col>
        </el-row>

        <div class="operation">
            <el-row>
                <el-col :span="8">
                    <!-- 新增，删除，全选按钮 -->
                    <el-button>全选</el-button>
                    <el-button>新增</el-button>
                    <el-button>删除</el-button>
                </el-col>
                <el-col :span="4"  class="searchInput">
                    <!-- 搜索框 -->
                    <el-input placeholder="请输入搜索条件" icon="search" v-model="searchValue" >
                    </el-input>
                </el-col>
            </el-row>
        </div>

        <!--列表-->
        <el-row>
            <el-col :span="24">
                <el-table :data="list" style="width: 100%" :row-class-name="tableRowClassName">
                    <el-table-column prop="date" label="全选" width="80" type="selection">
                    </el-table-column>
                    <el-table-column prop="title" label="标题">
                    </el-table-column>
                    <el-table-column prop="categoryname" label="类别" width="100">
                    </el-table-column>
                    <el-table-column label="发布人/发布时间"  width="150">
                        <template scope="scope">
                            {{scope.row.user_name }}  / {{scope.row.add_time}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="属性" width="100">
                    </el-table-column>
                    <el-table-column label="操作" width="80">
                        <template scope="scope">
                            <a href="#">修改</a>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        

    </div>

</template>

<script type="text/javascript">


    export default{
        data(){
        return {
            searchValue:'',
            list:[]
        }
    },
    created(){
        // 获取到列表数据
        this.getlist();
    },
    methods:{
        getlist(){
            var url = '/admin/goods/getlist?pageIndex=1&pageSize=10&searchvalue='
            this.$http.get(url).then(res=>{
                if(res.data.status == 1){
                    this.$message.error(res.data.message);
                    return;
                }
                this.list = res.data.message
                console.log(this.list)
            })
        },

    }

    }

</script>

<style>

</style>