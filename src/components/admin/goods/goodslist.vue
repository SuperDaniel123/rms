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
                    <router-link to="/admin/goodsAdd">
                        <el-button>新增</el-button>
                    </router-link>
                    <el-button @click="deldata">删除</el-button>
                </el-col>
                <el-col :span="4"  class="searchInput">
                    <!-- 搜索框 -->
                    <el-input placeholder="请输入搜索条件" icon="search" v-model="searchvalue" @change="getlist">
                    </el-input>
                </el-col>
            </el-row>
        </div>

        <!--列表-->
        <el-row>
            <el-col :span="24">
                <el-table :data="list" style="width: 100%" @selection-change =
                        "getRows" height="500">
                    <el-table-column prop="date" label="全选" width="80" type="selection" >
                    </el-table-column>
                    <el-table-column prop="title" label="标题">
                    </el-table-column>
                    <el-table-column prop="categoryname" label="类别" width="100">
                    </el-table-column>
                    <el-table-column label="发布人/发布时间" width="200">
                        <template scope="scope">
                            {{scope.row.user_name }}  / {{scope.row.add_time | datefmt}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="属性" width="100">
                        <template scope = 'scope'>
                            <el-tooltip class="item" effect="dark"
                                        v-bind="{content:(scope.row.is_slide ==1?'显示轮播':'不显示轮播')}"
                                        placement="bottom">
                                <i v-bind="{class:'el-icon-picture '+(scope.row.is_slide == 1?'':'imgactive')}" ></i>
                            </el-tooltip>

                            <i v-bind="{class:'el-icon-upload '+(scope.row.is_slide == 1?'':'imgactive')}" ></i>
                            <i v-bind="{class:'el-icon-star-on '+(scope.row.is_slide == 1?'':'imgactive')}" ></i>

                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80">
                        <template scope="scope">
                            <router-link v-bind="{to:'/admin/goodsedit/'+scope.row.id}">
                                <el-button type="success" size="mini">修改</el-button>
                            </router-link>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>

        </el-row>
        <el-row>
            <el-col :span="24">
                <el-pagination
                        @size-change="sizeChange"
                        @current-change="changePage"
                        :current-page="currentPage"
                        :page-sizes="[10,20,30,50]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </el-col>
        </el-row>


    </div>

</template>

<script type="text/javascript">


    export default{
        data(){
        return {
            //选中id
            ids : '',
            //搜索属性
            searchvalue:'',
            //数据数组
            list:[],
            //显示每一页的条数
            pageSize:10,
            //当前第几页
            currentPage:1,
            //总条数
            total:0


        }
    },

    created(){
        // 获取到列表数据
        this.getlist();
    },
    methods:{
        deldata(){
            if(this.ids.length<=0){
                alert('请选勾选要删除的商品')
                return
            }
            this.$confirm('真的要删除商品吗?','提示删除',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=> {
                this.$http.get('/admin/goods/del/'+this.ids)
                        .then(res=>{
                    if(res.data.message ==1){
                        console.log('error')
                        return
                    }
                    alert('删除成功')
                    this.getlist()
                })
            })
        .catch(_ => {});
        },

        sizeChange(currentSize){
            this.pageSize = currentSize
            this.getlist()
        },
        changePage(pageindex){
            this.currentPage = pageindex
            this.getlist()
        },
        //获取选中元素id
        getRows(val){
            this.ids = '';
            var dot = ",";
            for (var i = 0; i < val.length; i++){
                if(i >= val.length - 1){
                    dot = ""
                }
                this.ids += val[i].id + dot
            }
        },
        getlist(){
            var url = '/admin/goods/getlist?pageIndex='+this.currentPage+'&pageSize='+this.pageSize+'&searchvalue='+this.searchvalue
            this.$http.get(url).then(res=>{
                if(res.data.status == 1){
                    this.$message.error(res.data.message);
                    return;
                }
                this.list = res.data.message
                this.total = res.data.totalcount
            })
        },

    }

    }

</script>

<style>

</style>