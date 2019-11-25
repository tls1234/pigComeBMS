<template>
    <div class="business">
       <el-form :inline="true" :model="formObj" label-width="5px" size="mini"  class="searchForm">
            <el-form-item class="float_left">
                <el-input  placeholder="电话号码搜索" v-model="formObj.phone" clearable prefix-icon="el-icon-search" style="width:217px"></el-input>
            </el-form-item>
            <!-- <el-form-item class="float_left">
                <el-date-picker type="date" clearable placeholder="选择上传时间"  class="wd"></el-date-picker>
            </el-form-item>
            <el-form-item class="float_left">
                <el-date-picker type="date" clearable placeholder="选择最后编辑"  class="wd"></el-date-picker>
            </el-form-item> -->
            <!-- <el-form-item class="float_left">
                <el-select  placeholder="商品类型" clearable>
                    <el-option >
                    </el-option>
                </el-select>
            </el-form-item > -->
            <el-form-item class="float_left">
                <el-button type="primary" @click="search">确定</el-button>
            </el-form-item>
            <el-form-item class="float_right">
                <p>实到金额合计：{{countMoney}} 元</p>
            </el-form-item> 
        </el-form>

    <!-- table列表展示页 -->
        <el-table class="list-table"  height="calc(100%-160px)" border :data="list">
            <el-table-column prop="orderNum"  width="200px"  label="订单号" align="center"></el-table-column>
            <el-table-column prop="commodityName"  label="商品名称" align="center"></el-table-column>
            <!-- <el-table-column prop="" label="商品类型" align="center"></el-table-column> -->
            <el-table-column prop="endTime" width="200px"  label="确认时间" align="center"></el-table-column>
            <el-table-column prop="shName" label="客户姓名" align="center"></el-table-column>
            <el-table-column prop="shPhone" label="客户电话" align="center"></el-table-column>
            <el-table-column prop="actualMoney" label="应收金额" align="center"></el-table-column>
            <el-table-column prop="fee" label="取送费" align="center"></el-table-column>
            <el-table-column prop="discountMoney" label="商家满减" align="center"></el-table-column>
            <el-table-column prop="money"  label="实收金额" align="center"></el-table-column>
            <el-table-column prop="extract" label="平台提成" align="center"></el-table-column>
            <el-table-column prop="account" label="商户实到金额" align="center"></el-table-column>
        </el-table>
        <!-- <el-table :data="list" class="list-tableTwo">
            <el-table-column prop="countMoney" label="实到金额合计(元)" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.countMoney==null">0</span>
                    <span v-if="scope.row.countMoney>0">{{scope.row.countMoney}}</span>
                </template>
            </el-table-column>
            <div>dadadd</div>
        </el-table> -->
        <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginObj.pageNum"
            background
            :page-sizes="[3, 5, 6, 8]"
            :page-size="paginObj.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginObj.total">
            </el-pagination>
        </div>

    </div>
</template>
<script>
    // 商家列表
    export default {
        data () {
            return {
            countMoney:null,
            paginObj: {
                pagnum:1,
                pageSize:3,
                total:0
            },
            formObj:{
                phone:null
            },
            list:[],
            dataNum:[],//需要渲染的条数
            pagingnum: '',//一共有多少条
            tableData: []
        
        }
            },
        created(){
            // this.getList()
            this.getObj();
        },
        methods: {
            search () {
                this.$api('orderAll',{params:{pageNum:this.paginObj.pagnum,phone:this.formObj.phone,pageSize:this.paginObj.pageSize,type:'10'}}).then((res)=> {
                    this.paginObj.pagnum = res.data.data.list.pageNum;
                    this.paginObj.pageSize = res.data.data.list.pageSize;
                    this.paginObj.total = res.data.data.list.total;
                    this.list = res.data.data.list.list;
                    console.log(res);
                })
            },
            getObj () {//查询所有财务
                this.$api('orderAll',{params:{pageNum:this.paginObj.pagnum,pageSize:this.paginObj.pageSize,type:'10'}}).then((res)=> {
                    this.paginObj.pagnum = res.data.data.list.pageNum;
                    this.paginObj.pageSize = res.data.data.list.pageSize;
                    this.paginObj.total = res.data.data.list.total;
                    this.list = res.data.data.list.list;
                    this.countMoney = res.data.data.countMoney;
                    console.log(res);
                })
            },
            getList () {
            //这里用来组件一进来渲染的数据
            this.loading = true 
            this.$api('mock').then((data)=>{
                console.log(data)
            this.tableData = data.data.data.projects
            for(let i = 0; i<this.paginObj.pageSize&&i<this.tableData.length;i++) {
                this.dataNum.push(this.tableData[i])   
            }
            })
            this.loading = false
        },
        handleSizeChange(val) {
            this.paginObj.pageSize = val;
            this.getObj();
            console.log(val)
        },
        handleCurrentChange (val) {
            this.paginObj.pagnum = val;
            this.getObj();
            console.log(val)
        },
        getconfig () {
            this.dataNum = [1, 2, 3, 4, 5]
        }
    }
    }
</script>
<style lang="less" scoped>
    .business{
        height: 100%;
        width: 100%;
        // border:1px solid red;
        overflow: hidden;
    }
</style>
<style lang="less">
   .searchForm{
        padding:10px;
        // border: 1px solid blue;
        overflow: hidden;
    }
    .list-table{
        width:100%;
        height:calc(~"100% - 150px");
        margin-top: 10px;
        // background-color: red;
    }
    .list-tableTwo{
        width:200px;
        float: right;
        color:black;
    }
    .list{
        background-color: red;
    }
    
</style>

