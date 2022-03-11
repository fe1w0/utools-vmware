# utools-wmare

utools插件: 快速开启虚拟机

项目地址: [https://github.com/fe1w0/utools-vmware](https://github.com/fe1w0/utools-vmware)

> 如果有什么问题或者建议,也可以在issue中提出。
>
> 觉得还🆗的，⭐(疯狂暗示)


# 使用说明
有四种指令，`vminit`用于配置虚拟机文件夹地址，`vmopen`用于打开虚拟机，`vmrun`用于启动虚拟机， `vmstop`用于关闭虚拟机。同时，在`vmopen` , `vmrun` 和 `vmstop` 处，支持查询。

* `vminit`

![](http://img.xzaslxr.xyz/20210810211237.png)

* `vmopen`

![](http://img.xzaslxr.xyz/20210810211247.png)


* `vmrun`

![](http://img.xzaslxr.xyz/20210810211253.png)

* `vmstop`

![](http://img.xzaslxr.xyz/20220312062203.png)

* 演示

![](http://img.xzaslxr.xyz/20210810211312.gif)



感谢 [lanyuanxiaoyao](https://yuanliao.info/u/lanyuanxiaoyao)、u_tools的帮助

# Update


1.0.4 修复之前 1.0.3 版上 vminit 手动添加 vmware地址后,页面依旧没有显示设置的 vmware地址,以及 vmopne和vmrun 无法使用的问题

1.0.6 添加自定义开启和通知功能

1.0.7 修改settingUI , 添加vmstop, 以及修补issue (弹窗和无效指令问题)
