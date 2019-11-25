export default [
    // {
    //     id: '1',
    //     name: '耗材管理',
    //     path: 'material',
    //     icon: 'resource',
    //     children: [
    //         { id: 1, name: "待接单", path: "take", icon: "resource" },
    //         { id: 2, name: "待发货", path: "deliver", icon: "resource" },
    //         { id: 3, name: "已完成", path: "accomplish", icon: "resource" },
    //         { id: 4, name: "退款", path: "refunded", icon: "resource" },
    //         { id: 5, name: "商品管理", path: "upshop", icon: "resource" },
    //         { id: 6, name: "活动管理", path: "activity", icon: "resource" },
    //         { id: 7, name: " 财务管理", path: "consumable", icon: "resource" }
    //     ]
    // }
    { id: '1', name: "待接单", path: "/manager/take", icon: "resource", children: [] },
    { id: '2', name: "待发货", path: "/manager/deliver", icon: "resource", children: [] },
    { id: '3', name: "已完成", path: "/manager/accomplish", icon: "resource", children: [] },
    // { id: '4', name: "退款", path: "/manager/refunded", icon: "resource", children: [] },
    { id: '4', name: "商品管理", path: "/manager/upshop", icon: "resource", children: [] },
    { id: '5', name: "活动管理", path: "/manager/activity", icon: "resource", children: [] },
    { id: '6', name: " 财务管理", path: "/manager/consumable", icon: "resource", children: [] }

];