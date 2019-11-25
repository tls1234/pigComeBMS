<template>
  <div class="take">
    <el-form :inline="true" :model="formObj" label-width="5px" size="mini"  class="searchForm">
      <el-form-item class="float_left">
          <el-input placeholder="请输入订单手机号" v-model="formObj.val" clearable></el-input>
      </el-form-item>
      <el-form-item class="float_left">
          <el-button @click="earchForm" type="primary">确定</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      empty-text="没有新东西"
      v-loading="loading" 
      :default-sort = "{prop: 'condition', order: 'descending'}"
      element-loading-text="加载中..."
      style="
      height: calc(100% -105px)"
      class="take-table">
      <el-table-column width="200px" prop="orderNum" align="center" label="订单号"></el-table-column>
      <el-table-column prop="commodityName"  align="center" label="商品名称"></el-table-column>
      <el-table-column prop="shName"  align="center" label="姓名"></el-table-column>
      <el-table-column width="200px" prop="address" align="center" label="送货地址"></el-table-column>
      <el-table-column width="150px" prop="shPhone" align="center" label="联系电话"></el-table-column>
      <!-- <el-table-column width="150px" prop="startTime" align="center" label="取件时间"></el-table-column>
      <el-table-column width="150px" prop="endTime" align="center" label="送件时间"></el-table-column> -->
      <el-table-column prop="status" align="center" label="支付状况">
          <template slot-scope="scope"> 
          <span v-if="scope.row.status==0">未支付</span>
          <span v-if="scope.row.status==1">支付失败</span>
          <span v-if="scope.row.status==2">支付成功</span>
        </template>
      </el-table-column>
      <el-table-column prop="payMethod" align="center" label="支付方式">
        <template slot-scope="scope"> 
          <span v-if="scope.row.payMethod==0">微信支付</span>
          <span v-if="scope.row.payMethod==1">支付宝支付</span>
        </template>
      </el-table-column>
      <el-table-column prop="actualMoney" align="center" label="应付金额"></el-table-column>
      <el-table-column  align="center" label="商家打折"></el-table-column>
      <el-table-column prop="discountMoney" align="center" label="平台满减"></el-table-column>
      <el-table-column prop="money" align="center" label="实付金额"></el-table-column>
      <el-table-column prop="remark" align="center" label="客户备注"></el-table-column>
      <el-table-column
        align="center"
        width="200px"
        label="操作">
      <template slot-scope="scope" width="80%">
          <el-button
          size="mini"
          @click="handleEdit(scope)">接单</el-button>
      </template>
      </el-table-column>
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
    <audio src="/static/audio/newgoods.mp3"  :id="music" hidden></audio>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formObj:{//搜索框值
        val:null
      },
      music:'music',
      loading:false,
      list:null,
      seachObject:{
        input:'',
        starDate: '',
        endDate: '',
        money: '',
        state: '',
        region: ''
      },
      searchObj:{
        pageSize:10,
        pageNum:1,
        totalCount:0
      },
      newTotalCount:null
    }
  },
  created () {
    this.orderAll();
    this.timer = setInterval(()=>{
       this.orderAll();
    },60000);
  },
  beforeUpdate () {
    this.$watch("newTotalCount",function(val) {
      this.$nextTick(function(){
        var audio = document.getElementById('music');
        audio.play();
      })
    })
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
    orderAll () {
      this.$api('orderAll',{params:{pageNum:this.searchObj.pageNum,pageSize:this.searchObj.pageSize,type:"0"}}).then((res)=>{
          console.log(res)
          var list = res.data.data.list;
          this.list = list;
          this.searchObj.pageSize = res.data.data.pageSize;
          this.searchObj.pageNum = res.data.data.pageNum;
          this.searchObj.totalCount = res.data.data.total;
          this.newTotalCount = res.data.data.total;

      })
    },
    handleEdit(scope) {//点击接单改变状态
            console.log(scope)
            this.$api("orderType",{params:{type:"1",orderId:scope.row.id,outTradeNo:scope.row.orderNum}}).then((res)=>{
                // debugger;
                console.log(res)
                var num = scope.$index
                console.log(num)
                this.list[num] = null;
                this.orderAll();
                this.music = "music2"
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
  .take {
    width: 100%;
    height: 100%;
    text-align: center;
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
<style class="less">
  .take-table {
    width: 100%;
    height: calc(100% - 105px)
  }
</style>


