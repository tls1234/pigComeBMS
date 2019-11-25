import axios from 'axios'
// import Vue from 'vue';
const baseURL = process.env.baseURL || "/api";
// console.log(process.env.baseURL);

// 请求对象实例，具体的方法
const create = function() {
    let http = axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
    // 请求拦截器
    http.interceptors.request.use(config => {
        // debugger;
        // if (config.method === 'post') {
        //     config.data = JSON.stringify(config.data)
        // }
        // const token = localStorage.getItem('token');
        // if(token){
        //     config.headers = {
        //         cookie: `token=${token}`
        //     }
        // }

        return config
    }, error => {
        return Promise.reject(error)
    })

    // 响应拦截器
    http.interceptors.response.use(response => {
        // debugger;
        // 响应状态统一处理
        return response;
        // if (response.data.retCode == 200) {
        //     return response;
        // } else if (response.data.retCode == -200) {
        //     window.location.replace('/sangjie/panel/login');
        //     // Vue.prototype.$router.replace('/login');
        // }
    }, error => {
        return Promise.reject(error)
    })

    return http
}
const instance = create();

// 柯理化

// const ['get', 'post'] = ['get', 'post'].map(item => {
//     return (url) => {
//         return (data) => {
//             return (config) => {
//                 instance[item](url, data, config);
//             }
//         };
//     };
// });
const get = (url) => {
    return (data) => {
        return (config) => {
            return instance.get(url, data, config);
        }
    }
};
const post = (url) => {
    return (data) => {
        return (config) => {
            return instance.post(url, data, config);
        }
    }
};

// 接口map 表
const apis = {
    //商户后台登录的接口
    login: post('/merchant/login'),
    cancellation: get('/merchant/cancellation'),
    //商家认证信息
    archivesAll: get("/archives/all"),
    //查询商家个人基本信息
    merchantChange: get("/merchant/order/findByMerchantidDetail"),
    //修改商家个人信息
    updataByMer: post("/archives/updateByMerchant"),
    //注册送好礼接口
    network: post('/archives/network'),
    //商品接口
    myshop: get('/commodity/all'), //查询所有商品
    addshop: post('/commodity/addCommodity'), //添加商品
    delshop: post('/commodity/deleteByCommodityid'), //删除商品
    upshop: post('/commodity/updateByCommodityid'), //修改商品
    // 耗材添加商品规格
    addStandards: post('/type/addStandards'),
    //耗材修改商品规格
    updateByStandards: post('/type/updateByStandards'),
    //耗材删除商品规格
    deleteStand: get('/type/deleteByStandards'),
    //添加产品的类型
    addByType: get("/type/addByType"),
    //商品类型
    typeFind: get('/type/findByTypeHigherup'), //根据一级下单栏查询下级
    typeStatus: get('/type/findByTypeStatus'), //查询一级下单栏
    commitFindMerId: get('/commodity/findByTypeIdAndMerId'), //根据快速下单栏查询商品接口
    //优惠活动
    discountAll: get('/discount/all'), //查询所有优惠
    discountAddDis: post('/discount/addDiscount'), //新增打折优惠
    discountFull: post('/discount/addDiscountByFull'), //新增满减优惠
    deledDiscount: post('/discount/delteDiscount'), //删除优惠
    updateDiscount: post('/discount/updateDiscount'), //修改优惠
    // 商家认证
    archives: get("/archives/all"), //所有商家认证
    //审核通过或不通过
    upArchives: post('/archives/updateByArchivesStatus'),
    //boss圈查询所有帖子
    queryAll: get("/archives/findByMessageAll"),
    //删除boss圈对应帖子
    deleteStatus: get("/archives/updateMessageStatus"),
    //搜索boss圈对应的帖子
    messageAll: get("/archives/findByMessageAll"),
    //订单查询
    orderAll: get("/merchant/order/all"),
    //修改订单
    orderType: get("/merchant/order/updateByOrderType"),

}
const request = function(name, data, config) {
    return apis[name](data)(config);
}
export default request;