<template>
  <div class="take">
    <el-table :data="list" empty-text="没有新东西" v-loading="loading" :default-sort = "{prop: 'condition', order: 'descending'}" element-loading-text="加载中..." style="height: calc(100% -105px)" class="take-table">
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
      <el-table-column prop="actualMoney" align="center" label="应付金额"></el-table-column>
      <el-table-column  align="center" label="平台打折"></el-table-column>
      <el-table-column prop="discountMoney" align="center" label="平台满减"></el-table-column>
      <el-table-column prop="account" align="center" label="实付金额"></el-table-column>
      <el-table-column prop="remark" align="center" label="客户备注"></el-table-column>
      <el-table-column
        align="center"
        width="200px"
        label="操作">
      <template slot-scope="scope" width="80%">
          <el-button
          size="mini"
          @click="handleEdit(scope)">发货</el-button>
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
  </div>
</template>
<script>
export default {
  data () {
    return {
      formObj:{//搜索框值
        val:null
      },
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
      }
    }
  },
  created () {
    this.orderAll();
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
      this.$api('orderAll',{params:{pageNum:this.searchObj.pageNum,pageSize:this.searchObj.pageSize,type:"1"}}).then((res)=>{
          // console.log(res)
          var list = res.data.data.list;
          this.list = list;
          this.searchObj.pageSize = res.data.data.pageSize;
          this.searchObj.pageNum = res.data.data.pageNum;
          this.searchObj.totalCount = res.data.data.total;

      })
    },
    handleEdit(scope) {//点击接单改变状态
            // console.log(scope)
            this.$api("orderType",{params:{type:"2",orderId:scope.row.id,outTradeNo:scope.row.orderNum}}).then((res)=>{
                // debugger;
                // console.log(res)
                var num = scope.$index
                // console.log(num)
                this.list[num] = null;
                this.orderAll();
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
</style>
<style class="less">
  .take-table {
    width: 100%;
    height: calc(100% - 60px)
  }
</style>


