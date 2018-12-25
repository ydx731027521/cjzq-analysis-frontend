# 经纪合规质检管理系统

使用技术：
  - jwtToken：axios拦截器的使用，token自动刷新
  - 角色权限控制：根据后台返回的用户角色列表，生成符合该角色的路由表，动态添加（使用sessionStorage，通过localStorage实现session在多页面共享，实现网页多开效果）

遇到的坑：
  - 缓存的使用
  - 路由传参刷新路径丢失，fullPath改变指向
  - 生成路由表的顺序问题

