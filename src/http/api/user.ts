// 用户信息

import instance from '../request'

// 用户信息数据接口
export const getUserInfo = ()=> {
    // return instance({
    //     url: '',
    //     method: 'POST',
    //     data: data
    // })
    return Promise.resolve({
        "msg": "操作成功",
        "code": 200,
        data:{
            "userName": "admin",
            "nickName": "管理员",
            "avatar":'https://s11.ax1x.com/2023/12/15/pihx4js.jpg',
        },
    });
}

// {
//     title: 标题
//     path: 跳转路径
//     hidden: 是否隐藏
//     isLink: 外链
//     key: 唯一标识 默认路由,
//     childs: 子集
// }
// 侧边栏路由数据接口
export const getMenuList = ()=> {
    // return instance({
    //     url: '',
    //     method: 'POST',
    //     data: data
    // })

    const menuList : Object = [
        {
            title:'首页',
            path:'/home',
            key: '/home'
        },
        {
            title:'404页面',
            path:'',
            hidden:true,
            key: '404'
        },{
            title:'开源地址',
            isLink:true,
            path:'https://github.com/everyday924/vue-project',
            key:'github',
        },
        {
            title:'外链',
            key:'links',
            childs:[
                {
                    title:'VUE3文档',
                    isLink:true,
                    path:'https://vue3js.cn/',
                    key: 'https://vue3js.cn/',
                },{
                    title:'element-plus',
                    isLink:true,
                    path:'https://element-plus.org/zh-CN/',
                    key: 'https://element-plus.org/zh-CN/',
                },{
                    title:'稀土掘金',
                    isLink:true,
                    path:'https://juejin.cn/',
                    key: 'https://juejin.cn/',
                },{
                    title:'CSDN',
                    isLink:true,
                    path:'https://www.csdn.net/',
                    key: 'https://www.csdn.net/',
                },{
                    title:'博客园',
                    isLink:true,
                    path:'https://www.cnblogs.com/',
                    key: 'https://www.cnblogs.com/',
                },{
                    title:'站搜搜',
                    isLink:true,
                    path:'https://www.zhansousou.com/',
                    key: 'https://www.zhansousou.com/',
                },
            ],
        }, {
            title:'多级菜单',
            key:'/system',
            childs:[
                {
                    title:'父级1',
                    key:'/system1',
                    childs:[
                        {
                            title:'子级1',
                            path:'/sys',
                            key: '/sys',
                        },
                    ],
                },
                {
                    title:'父级2',
                    path:'/system2',
                    key: '/system2',
                },
            ],
        },
    ];
    return Promise.resolve({
        "msg": "操作成功",
        "code": 200,
        data:menuList,
    });
}