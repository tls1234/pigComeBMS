<template>
    <div class="home">
    <!-- 搜索框的展示  -->
        <el-form :inline="true" :model="formObj" label-width="5px" size="mini"  class="searchForm">
            <el-form-item class="float_left">
                <el-input placeholder="请输入订单手机号" v-model="formObj.val" clearable></el-input>
            </el-form-item>
            <el-form-item class="float_left">
                <el-button @click="earchForm" type="primary">确定</el-button>
            </el-form-item>
        </el-form>

    <!-- 表格的展示 -->
        <el-table
            :data="list"
            empty-text="没有新东西"
            v-loading="loading" 
            :default-sort = "{prop: 'condition', order: 'descending'}"
            element-loading-text="加载中..."
            style="
            height: calc(100% -60px)"
            class="home-table">
            <el-table-column prop="orderNum" align="center" label="订单号"></el-table-column>
            <el-table-column prop="commodityName"  align="center" label="商品名称"></el-table-column>
            <el-table-column prop="address" align="center" label="客户地址"></el-table-column>
            <el-table-column prop="phone" align="center" label="客户电话"></el-table-column>
            <!-- <el-table-column prop="startTime" align="center" label="取件时间"></el-table-column>
            <el-table-column prop="endTime" align="center" label="送件时间"></el-table-column> -->
            <el-table-column prop="status" align="center" label="支付状况">
              <template slot-scope="scope"> 
                <span v-if="scope.row.status==0">未支付</span>
                <span v-if="scope.row.status==1">支付失败</span>
                <span v-if="scope.row.status==2">支付成功</span>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" align="center" label="创建时间"></el-table-column>
            <el-table-column prop="remark" align="center" label="客户备注"></el-table-column>
        </el-table>
        <div class="pageination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="searchObj.pageNum"
                :page-sizes="[10, 15, 20, 35]"
                :page-size="searchObj.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="searchObj.totalCount">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    // import DjObject from './object.js';
    export default {
    data(){
        return {
            formObj:{//搜索框值
                val:null
            },
            list:null,
            right:null,//订单是否接单
            searchObj:{
            pageSize:10,
            pageNum:1,
            totalCount:0
            },
            seachObject:{
                input:'',
                starDate: '',
                endDate: '',
                money: '',
                state: '',
                region: ''
            },
            scopeIndex:"",
            myObject:{},
            centerDialogVis: false,
            // tableData:DjObject.tableData,
            loading: false,
            input1: '',
            formInline: {
                user: '',
                region: ''
            },
            paginObj: {
                pagnum:0,
                pageSize:3,
                currentPages: 1,
                currentPage: 1
            },
            addForm: {

            },
            dataNum:[],//需要渲染的条数
            pagingnum: '',//一共有多少条
        }
    },
    created () {
        // this.getList()
        this.orderAll();
    },
    computed: {

    },
    methods: {
        earchForm() {//搜索函数
            this.$api('orderAll',{params:{pageNum:this.searchObj.pageNum,pageSize:this.searchObj.pageSize,phone:this.formObj.val,type:"0"}}).then((res)=>{
                var list = res.data.data.list;
                this.list = list;
                this.searchObj.pageSize = res.data.data.pageSize;
                this.searchObj.pageNum = res.data.data.pageNum;
                this.searchObj.totalCount = res.data.data.total;
                console.log(res);
            })
        },
        //查询所有订单
        orderAll () {
            this.$api('orderAll',{params:{pageNum:this.searchObj.pageNum,pageSize:this.searchObj.pageSize,type:"3"}}).then((res)=>{
        
                var list = res.data.data.list;
                this.list = list;
                this.searchObj.pageSize = res.data.data.pageSize;
                this.searchObj.pageNum = res.data.data.pageNum;
                this.searchObj.totalCount = res.data.data.total;
            })
        },
        handleSizeChange (val) {//改变每页显示多少条
        this.searchObj.pageSize = val;
        this.orderAll()
      },
      handleCurrentChange (val) { //改变前往多少页
        this.searchObj.pageNum = val;
        this.orderAll()
      }
        }
    }
</script>
<style lang="less" scoped>
    .home{
        width: 100%;
        height:100%;
        text-align: center;
        color: black;
        color: rgba(0, 0, 0, 0.349)
        // background-color: aqua;
    }
    .searchForm{
        padding: 10px;

    }
    .searchForm1{
        display: flex;
        flex-wrap: wrap;
        justify-content:center;
        align-items: center;
    }
</style>
<style lang="less">
    .home-table{
        width: 100%;
        height: calc(100% - 120px);
        // border:1px solid blue;
    }
    .block{
        padding:10px;
    }
</style>



