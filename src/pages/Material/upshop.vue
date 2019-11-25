<template>
    <div class="goods">
      <el-form :inline="true" :model="searchObj" label-width="5px" size="mini"  class="searchForm">
        <el-form-item class="float_left">
          <el-select v-model="searchObj.productType" placeholder="商品类型" @change="changeValue" clearable>
            <el-option v-for="channel in shopType" :key="channel.id" :label="channel.name" :value="channel.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="float_left">
            <el-button @click="earchForm" type="primary">确定</el-button>
        </el-form-item>
        <el-form-item class="float_right">
          <el-button type="primary" @click="add">添加商品</el-button>
        </el-form-item>
        <!-- <el-form-item class="float_right">
          <el-button type="primary" @click="addtype">添加商品类型</el-button>
        </el-form-item> -->
      </el-form>
      <el-table class="goods-table" height="calc(100% - 105px)" border :data="list1">
        <el-table-column type="expand">
           <template slot-scope="props">
            <el-table id="stand-table" border :data="props.row.standardsModelList">
              <el-table-column prop="name" label="商品规格" align="center" ></el-table-column>
              <el-table-column prop="price" label="规格价格(元)" align="center"></el-table-column>
              <el-table-column label="操作" align="center" width="200">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="editModel(scope)">编辑</el-button>
                <el-button @click="deleShop(scope.row)" type="text" size="mini">删除</el-button>
              </template>  
            </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" align="center" ></el-table-column>
        <el-table-column prop="upName" label="商品类型" align="center"></el-table-column>
        <el-table-column prop="img" label="商品logo" align="center">
          <template slot-scope="scope">
            <img :src="'http://www.pigcome.com:81/' + scope.row.img" alt="商品logo" class="itemImage">
          </template>
        </el-table-column>
        <el-table-column prop="price" label="商品默认价格" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="edit(scope)">编辑</el-button>
             <el-button @click="upStand(scope.row)" type="text" size="mini">添加规格</el-button>
          </template>  
        </el-table-column>
      </el-table>
      <el-dialog :modal-append-to-body="false" :title="title" center @close="close(addform)" :visible.sync="dialogVisible" :show-close="false" width="900px">
        <el-form :inline="true" :model="addform" ref="addform" label-width="150px" class="searchFrom demo-form-inline" >
          <el-form-item :label="updateShop.name1" prop="upName" class="myitem" value-key="id">
            <el-select v-model="addform.type" clearable :placeholder="updateShop.inputName1" @change="getShop" :disabled='typeId' value-key="id">
              <el-option v-for="item in this.shopType" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="updateShop.name2" prop="id" class="myitem" value-key="id">
            <el-select v-model="addform.id" clearable :placeholder="updateShop.name2" :disabled="typeId" value-key="id">
              <el-option v-for="item in this.classShop" :key="item.id" :label="item.name" :value="item.id" :disabled="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="remark" label="详细信息：" class="myitem">
            <el-input clearable autosize type="textarea" placeholder= "输入商品详细信息" v-model="addform.remark" :disabled="typeId" size="large" class="myInput"></el-input>
          </el-form-item>
          <el-form-item v-if="addform.standName==null" :label="updateShop.name3" prop="price" class="myitem">
            <el-input type="text" :placeholder="updateShop.name3" v-model="addform.price" >
              <template slot="append">元</template>
            </el-input> 
          </el-form-item>
          <el-form-item label="规格价格" prop="standPrice" class="myitem" v-if="addform.standName !=null">
            <el-input type="text" placeholder="填写该规格商品价格"  v-model="addform.standPrice" >
              <template slot="append">元</template>
            </el-input> 
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="close(addform)">取消</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </span>
      </el-dialog>

      <el-dialog :modal-append-to-body="false" :title="title" center @close="close(modelList)" :visible.sync="modelDisable" :show-close="false" width="900px">
        <el-form :inline="true" :model="modelList" ref="modelList" label-width="150px" class="searchFrom demo-form-inline">
          <el-form-item label="商品规格：" prop="name" class="myitem" >
            <el-input
              placeholder="商品规格"
              v-model="modelList.name"
              :disabled='true'
              clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="规格价格：" prop="upName" class="myitem" >
            <el-input placeholder="规格价格：" v-model="modelList.price" :disabled='false' clearable>
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="close(modelList)">取消</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </span>
      </el-dialog>
      
      <el-dialog :modal-append-to-body="false" :title="title" center @close="close(addform)" :visible.sync="standDisc" :show-close="false" width="900px">
        <el-form :inline="true" :model="addform" ref="addform" label-width="150px" class="searchFrom demo-form-inline" >
          <el-form-item label="商品类型：" prop="upName" class="myitem" >
            <el-input
              placeholder="商品类型"
              v-model="addform.upName"
              :disabled='typeId'
              clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="商品名称：" prop="name" class="myitem">
            <el-input
              placeholder="商品名称"
              v-model="addform.name"
              :disabled='typeId'
              clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="商品规格：" prop="standName" class="myitem1">
            <el-input
              size="mini"
              class="newInput"
              placeholder="商品规格"
              v-model="standNameNum"
              clearable>
            </el-input>
            <el-select class="newSelect" v-model="unitCh" clearable placeholder="单位" size="mini">
              <el-option v-for="item in unit" :key="item.id" :label="item.name" :value="item.name" :disabled="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规格价格：" prop="standPrice" class="myitem">
            <el-input type="text" placeholder="填写该规格商品价格"  v-model="addform.standPrice" >
              <template slot="append">元</template>
            </el-input> 
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="close(addform)">取消</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </span>
      </el-dialog>
      <!-- 这里是分页功能 -->
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
  // import GoodsObj from ' ./unit.js '
import unit from './unit.js';
  export default {
    data () {
      return {
        modelDisable:false,
        modelList:{},
        shopNameId:null,//编辑商品时候商品的id
        standNameNum:null,
        unit:unit.unit,
        unitCh:null,
        standDisc:false,//添加规格弹框状态     
        imageUrl:null,//上传图片img的地址
        imgType:{
          name:null,
          img:null
        },
        tableData:{
          name:null,
          higherup:null,
          status:"4"
        },
        myDisable:false,
        updateShop:{
          name1:"商品类型：",
          name2:"商品名称：",
          name3:"商品无规格价格：",
          name4:"编辑时间：",
          inputName1:'请选择商品类型',
          inputName2:"请选择商品名称",
          inputName3:"输入商品价格（大于十五的商品金额）",
          inputName4:"编辑时间"
        },
        arr:[],//这是耗材规格的数组
        typeId:false,
        disable:false,//是否禁用select框
        dialogVisible: false,
        dis:false,
        title: null,
        searchObj: {
          createDay: null,
          searchContent: null,
          sortField: null,
          sortOrder: null,
          updateDay: null,
          topicalName: null,
          channelId: null,
          productType: null,
          pageNum: 1,
          pageSize: 10,
          totalCount:0
        },
        actionType:null,//操作类型
        higherup:null, //搜索框需要传递的参数(这是商品类型)
        shopId:null,
        addform: {
          id:null,
          merchantid:null,
          name:null,
          number:null,
          type:null,
          standType:null,
          upName:null,
          price:null,
          standPrice:null,
          standName:null,
          standardsModelList:null,
          remark: "  "
        },
        shopType:[],//商品类型
        classShop:[],//根据商品类型获得相应的商品
        addShop:[],
        productTypes: [],
        list1:[]
      }
    },
    created () {
      // this.allshop()
      // this.addshop();
      // this.get()
      this.ces();
      this.status();
      // this.clasShop();
    },
    methods: {
      editModel(scope) {//编辑规格函数
        this.modelList = scope.row;
        this.modelDisable =true;
        this.title = '修改规格'
        this.actionType = 5
      },
      handleAvatarSuccess(res, file) {//图片上传函数
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {//图片上传函数
        const isJPG = /image\/[jpeg|jpg|png]/.test(file.type);
          const isLt1M = file.size / 1024 / 1024 < 10;

          if (!isJPG) {
          this.$message.error("上传LOGO图片格式应为jpeg|jpg|png!");
          }
          if (!isLt1M) {
          this.$message.error("上传LOGO图片大小不能超过 10MB!");
          }
          return isJPG && isLt1M;
      }, 
      ImgClose (tableData) {//添加商品类型的函数取消函数
        this.myDisable = false;
        // console.log(tableData)
        for(var i = 0;i<tableData.length;i++) {
          tableData[i].name = null;
          tableData[i].higherup = null;
        }
      },
      ImgSave (tableData) {//


      },
      addtype() {//添加商品的按钮
        this.myDisable = true;
        this.actionType = 3;
        this.disable = false;
        this.title = "添加商品类型"
        
      },
      num() {//当下拉结束后找值
      // debugger;
        console.log(this.addform.standName)
        var arr = this.addform.standardsModelList;
        for (var i=0;i<arr.length;i++) {
          if(arr[i].name == this.addform.standName) {
            this.addform.standPrice = arr[i].price;
            this.addform.standType = arr[i].id;
          }
        }
      },
      // BDE26ECBCA139F77558947031658700E
      // BDE26ECBCA139F77558947031658700E
      input1 () {//输入的金额判断
        var reg = /^1[6-9]$|^[2-9]\d$|^1\d{2}$/;
        if(reg.test(this.addform.price)){
          this.addform.pice = reg.test(this.addform.price);
        }else if (/[^\d]/.test(this.addform.price)) {
          this.addform.price=this.addform.price.replace(/[^\d]/g,'')
        }
        else{
          this.$message("请正确输入大于十五的金额");
          this.addform.price = null;
        }
      },
      stop() {
        this.dis = true;
      },
      getShop(){//这里是点击商品类型获取相应商品
        this.clasShop()
      },
      deleStand(scope) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
            this.$api("deleteStand",{id:scope.id}).then((res)=>{
              if(res.data.retCode==200){
                this.ces()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }else {
                this.$message({
                  type: 'success',
                  message: '删除失败!'
                });
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
      },
      deleShop(scope) {//删除商品相当于下架订单
        console.log(scope);
        // debugger;
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
            this.$api("deleteStand",{params:{id:scope.id}}).then((res)=>{
              if(res.data.retCode==200){
                this.ces()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }else {
                this.$message({
                  type: 'success',
                  message: '删除失败!'
                });
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
      },
       save () {//保存
        this.dialogVisible = false;
        this.modelDisable = false;
        if(this.actionType==1){
            if(this.addform.remark == null) {
              this.addform.remark = "无"
            }
            this.$api("addshop",{typeid:this.addform.id, price:this.addform.price,remark:this.addform.remark}).then((res)=>{
            if(res.data.retCode!==200) {
            this.$message(res.data.message)
            }else{
              this.$message(res.data.message)
            }
            console.log(res)
          })
          this.ces()
          }else if(this.actionType==2) {
          // console.log(this.addform)
          // debugger;
          if(this.addform.standName) {
            this.$api('updateByStandards',{id:this.addform.standType,name:this.addform.standName,price:this.addform.standPrice}).then((res)=>{
              if(res.data.retCode!==200) {
              this.$message('修改失败')
            }else{
              this.$message('修改成功')
            }
            })
          }else{
            this.$api('upshop',{id:this.shopNameId,price:this.addform.price}).then((res)=>{
            console.log(res)
            if(res.data.retCode!==200) {
              this.$message('修改失败')
            }else{
              this.$message('修改成功')
            }
          })
          }
          this.ces()
        }else if(this.actionType == 4) {
            this.addform.standName = this.standNameNum  + this.unitCh
             this.$api('addStandards',{commodityid:this.addform.id,name:this.addform.standName,price:this.addform.standPrice}).then((res)=>{
              if(res.data.retCode!==200) {
              this.$message('添加规格失败')
            }else{
              this.$message('添加规格成功')
            }
            })
            this.standDisc = false;
            this.ces()
        }else if(this.actionType == 5) {
          this.$api('updateByStandards',{id:this.modelList.id,name:this.modelList.name,price:this.modelList.price}).then((res)=>{
            if(res.data.retCode!==200) {
              this.$message('修改规格失败')
            }else{
              this.$message('修改规格成功')
            }
          })
        }
      },
      close (addform) {//取消的时候数据消失
        this.ces()
        this.modelDisable = false;
        this.dialogVisible = false;
        this.typeId =false;
        this.standDisc = false;
        this.unitCh = null;
        this.standNameNum = null;
        for(var i in addform) {
          addform[i] = null;
        }
      },
      changeValue (value) {//这里获取搜索框的id
        var obj={};
        obj = this.productTypes.find((item)=>{
          return item.id == value
        });
         this.higherup = value
         console.log(this.higherup)
         console.log(obj)
      },
      status () {//查询我们的所有商品的类型
        this.$api('typeStatus',{params:{status:"3"}}).then((res)=>{
          console.log(res.data.data);
          this.shopType = res.data.data
        })
      },
      clasShop () {//这里根据商品类型查询相应的商品集
      // debugger;
        this.$api('typeFind',{params:{id:this.addform.type}}).then((res)=>{
          console.log(res);
          this.classShop = res.data.data;
          for(var i=0;i<this.classShop.length;i++) {
            console.log(this.classShop)
            if(this.classShop[i].type) {
              // console.log(this.classShop[i].type)
              this.classShop[i].type = true;
              console.log(this.dis)
            }else{
              this.classShop[i].type = false;
            }
          }
        })
      },
     
      earchForm () {       //搜索框搜索内容的
         this.$api("myshop",{params:{pageNum:this.searchObj.pageNum,pageSize:this.searchObj.pageSize,higherup:this.searchObj.productType}}).then((res)=>{
           console.log(res)
           var list = res.data.data.list;
          this.searchObj.pageNum = res.data.data.pageNum || 1;  
          this.searchObj.pageSize = res.data.data.pageSize;
          this.searchObj.totalCount = res.data.data.total;
          this.list1 = list;
         })
      },  
      ces (){ //查询所有商品(模版)
        // debugger;
        this.$api("myshop",{params:{pageNum:this.searchObj.pageNum,pageSize:this.searchObj.pageSize}}).then((res)=>{
          console.log(res.data)
          var list = res.data.data.list;
          this.searchObj.pageNum = res.data.data.pageNum || 1;  
          this.searchObj.pageSize = res.data.data.pageSize;
          this.searchObj.totalCount = res.data.data.total;
          this.list1 = list;
           for(var i=0;i<this.list1.length;i++) {
            this.arr=this.list1[i].standardsModelList
            console.log(this.arr)
          }
        })
      },
      handleSizeChange (val) {   //点击每页多少条的时候触发的函数(end)
        // debugger;
        this.searchObj.pageSize = val
        this.ces()
      },
      handleCurrentChange (val) { //点击前往第几页的时候触发的函数(end)
        this.searchObj.pageNum = val;
        this.ces();
      },
      // upshop () { //修改商品
      //   this.$api('upshop',{id:'2',price:'34'}).then((res)=>{
      //     console.log(res)
      //   })
      // },
      add () {       //添加商品函数
        this.actionType =1;
        this.disable = false
        this.title = "添加商品"
        this.dialogVisible = true
      },
      upStand(scope) {//添加商品规格
        this.title = "添加产品规格",
        this.typeId = true;
        this.standDisc = true;
        this.actionType = 4;
        this.addform.name = scope.name;
        this.addform.upName = scope.upName;
        this.addform.id = scope.id;
      },

      edit (myCode) {      //编辑商品
        this.typeId =true;
        console.log(myCode.row)
        this.dialogVisible = true;
        this.actionType=2;
        var row =  myCode.row;
        this.shopNameId = row.id;
        this.addform.name = row.name;
        this.addform.upName = row.upName;
        this.addform.id = row.name;
        this.addform.type = row.upName;
        this.addform.price = row.price;
        this.addform.standardsModelList  = row.standardsModelList;

        console.log(myCode)
        this.title = '编辑商品';
        
      },
    },
    computed: {
    } 
  }
</script>
<style long="less">
  .myitem{
    padding: 30px 0;
  }
  .myitem1{
    padding: 30px 0;
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .myitem1>.el-form-item__content {
    width: 60%;
  }
  /* .searchFrom{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  } */
  .goods{
        width: 100%;
        height:100%;
        text-align: center;
        color: black;
        color: rgba(0, 0, 0, 0.349)
    }
  .searchForm{
      padding: 10px;
  }
  .el-form-item__content>.newInput{
    width: 60%;
  }
  .newSelect{
    /* display: inline-block; */
    width: 30%;
  }
  .form{
    padding: 10px 0;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .itemImage{
    height: 50px;
    vertical-align: middle;
  }
</style>

