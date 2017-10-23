<template>
    <div class="tmpl">
        <!--面包屑导航-->
        <el-row>
            <el-col :span="24">
                <div class="abread bt-line">
                    <!-- 使用elementUI中的面包屑导航组件完成 -->
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                        <el-breadcrumb-item>商品新增</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-col>
        </el-row>

        <!-- 表单元素布局 -->
        <el-row class="martop">
            <el-col >
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="80px" class="demo-ruleForm">
                    <el-col :span="12">
                        <el-form-item label="标题" prop="title" >
                            <el-input v-model="ruleForm.title" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="副标题" prop="sub_title">
                            <el-input v-model="ruleForm.sub_title"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="类别" prop="category_id">
                            <el-select v-model="ruleForm.category_id" placeholder="请选择类别">
                                <el-option v-for="(cate,index) in categorylist" :key="index" :label="cate.title"
                                           :value="cate.category_id">
                                    <span v-for="count in (cate.class_layer-1)">&nbsp;</span>
                                    <span v-if="cate.class_layer>1">|-</span>
                                    <span v-text="cate.title"></span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="是否发布">
                            <el-switch v-model="ruleForm.status" on-text="发布" off-text="未发布" :width="70">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="推荐类型">
                            <el-switch v-model="ruleForm.is_slide" on-text="轮播图" off-text="轮播图" :width="70">
                            </el-switch>
                            <el-switch v-model="ruleForm.is_top" on-text="置顶" off-text="置顶" :width="60">
                            </el-switch>
                            <el-switch v-model="ruleForm.is_hot" on-text="推荐" off-text="推荐" :width="60">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <div style="float: left;width:100%"></div>
                    <el-col :span="12">
                        <el-form-item label="上传封面">
                        <el-upload
                                class="upload-demo"
                                action="http://157.122.54.189:9095/admin/article/uploadimg"
                                :file-list="ruleForm.imgList"
                                :on-success="imgUploaded"
                                list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="相册上传">
                            <el-upload
                                    class="upload-demo"
                                    action="http://157.122.54.189:9095/admin/article/uploadimg"
                                    :file-list="ruleForm.fileList"
                                    :on-success="fileUploaded"
                                    list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="商品货号" prop="goods_no" >
                            <el-input v-model="ruleForm.goods_no" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="库存数量" prop="stock_quantity" >
                            <el-input v-model="ruleForm.stock_quantity" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="市场价格" prop="market_price" >
                            <el-input v-model="ruleForm.market_price" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="销售价格" prop="sell_price" >
                            <el-input v-model="ruleForm.sell_price" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="文章摘要" prop="zhaiyao">
                            <el-input type="textarea" v-model="ruleForm.zhaiyao"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="详细内容" prop="content">
                            <quill-editor v-model="ruleForm.content" ref="myQuillEditor">
                            </quill-editor>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-col>
                    <div style="clear: both"></div>
                </el-form>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    //引入编辑器组件
    import { quillEditor } from 'vue-quill-editor'

    export default{
        //创建私有组件
        components: {
            quillEditor
        },
        data(){

        var checkNumber = (rule,value,callback)=>{
            if(!value){
                return callback(new Error('不能为空'))
            }
            if(isNaN(value)){
                return callback(new Error('必须是数字'))
            }else{
                callback()
            }
        }

        return {
            categorylist:[],
            ruleForm:{
                title:'',        //标题
                sub_title:'',    //副标题
                category_id:"",  //选择器id
                status:true,     //是否发布
                is_slide:true,   //轮播图
                is_top:true,     //是否置顶
                is_hot:true,     //是否热门
                imgList: [],     //图片对象
                fileList:[],     //相册图片
                goods_no:'',     //商品货号
                stock_quantity:0,//库存数量
                market_price:0,  //市场价格
                sell_price:0,    //销售价格
                zhaiyao:'',      //文章摘要
                content:''       //详细内容
            },
            rules:{
                title:[
                    {required: true, message:'请输入标题', trigger: 'blur' }
                ],
                zhaiyao:[
                    {required: true, message:'请输入摘要', trigger: 'blur' }
                ],
                stock_quantity: [
                    { validator: checkNumber, trigger: 'blur' }
                ],
                market_price: [
                    { validator: checkNumber, trigger: 'blur' }
                ],
                sell_price: [
                    { validator: checkNumber, trigger: 'blur' }
                ]

            }
        }
    },
    created(){
        this.getCatelist()
    },
    methods:{

        getCatelist(){
            this.$http.get('/admin/category/getlist/goods')
                    .then(res=>{
                this.categorylist = res.data.message
            })
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http.post('/admin/goods/add/goods',this.ruleForm)
                            .then(res=>{
                        if(res.data.status == 1){
                            this.$message.error(res.data.message);
                            return;
                        }
                        this.$router.push({name:'goodslist'})
                    })
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        //多图片上传方法
        fileUploaded(response,file, fileList){
            this.ruleForm.fileList.push(response)
        },
        //图片上传方法
        imgUploaded(response,file, fileList) {
            this.ruleForm.imgList = [response]
        },
    }
    
    }

</script>

<style>
.demo-ruleForm{
    padding:10px 10px 10px 0px;
    margin:10px;
    border:1px solid #eee;
    border-radius: 5px;
}
.ql-editor {
    min-height: 200px;
    height: 200px;
    max-height: 400px;
}

</style>