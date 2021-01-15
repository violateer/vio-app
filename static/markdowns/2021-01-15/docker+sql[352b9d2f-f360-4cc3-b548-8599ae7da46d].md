## 1.一些基本命令-docker

+ `docker ps` ：查看容器运行状态
+ `docker kill mysql1`：关掉容器
+ `docker container start mysql1`：开启刚关掉的容器
+ `docker rm mysql1`：删掉容器，添加`-f`参数强制删除
+ `docker run`：启动新容器
+ `docker exec -it mysql1 bash`：命令行连接mysql
+ `mysql -u root -p`：登录mysql

## 2.一些基本命令-sql

+ `CREATE DATABASE db_name ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';`：创建数据库
+ `show databases;`：查看数据库
+ `use mysql;`：使用数据库
+ `show tables;`：查看数据库中的表
+ `select * from user;`：查看表内容
+ `select name,age from user;`：查看指定表内容
+ `select name,age from user limit 10;`：查看指定前十个表内容
+ `describe user;`：描述表包含的字段
+ `DROP table user;`：删除表
+ `DROP database vio lateer;`：删除数据库
+ `INSERT INTO  user (name, age) VALUES ('yang', 18); `：表中插入数据
+ `DELETE FROM user WHERE name='yang';`：表中删除数据
+ `UPDATE user SET age=20 [where name='yang'];`：更新/修改数据
+ `ALTER TABLE user ADD id serial;`：表添加列
+ `DELETE FROM users;`：清空表

## 3.一些基本命令-typeORM

+ `psql -U user -W`：进入pg命令行

+ `\l`：显示数据库，即`list databases`

+ `\c`：连接数据库，即`connect to a databases`

+ `\dt`：展示表tables，即`display tables`

+ `\d`：描述表包含的字段

+ ```mysql
  // 断开连接到数据库上的所有连接
  SELECT pg_terminate_backend(pg_stat_activity.pid)
  FROM pg_stat_activity
  WHERE datname='mydb' AND pid<>pg_backend_pid();
  ```

## 4.一些基本命令-MongoDB

+ `mongo 127.0.0.1/<dbname> -u <用户名> -p`：连接指定数据库
+ `help`：Help查看命令提示
+ `show dbs;`：查询所有数据库
+ `show users;`：查询当前数据库所有用户
+ `db.dropDatabase();`：删除当前使用数据库
+ `db.stats();`：显示当前db状态
+ `db.getName()/db;`：查看当前使用的数据库
+ `db.createCollection("name",[options])`：创建集合
+ `db.getCollectionNames();`：得到当前db的所有聚集集合
+ `db.getCollection("account");`：得到指定名称的聚集集合（table）
+ `show collections;`：显示集合
+ `db.collection.find([query], [projection]);`：查询集合
+ `db.collection.count();`：显示集合的数据数量
+ `db.collection.deleteMany({});`：删除集合下所有文档
+ `db.collection.deleteMany({ status : "A" })`：删除 status 等于 A 的全部文档
+ `db.collection.delete.One({ status : "D" })`：删除 status 等于 D 的一个文档
+ 创建用户：`db.createUser({ user: 'root', pwd: 'root', roles: [ { role: "dbOwner", db: "admin" }]});`
  + role参数
    + 数据库用户角色：read、readWrite；
    + 数据库管理角色：dbAdmin、**dbOwner**(项目中violateer使用这个角色)、userAdmin;
    + 集群管理角色：clusterAdmin、clusterManager、4. clusterMonitor、hostManage；【只有admin数据库可用】
    + 备份恢复角色：backup、restore；【只有admin数据库可用】
    + 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase【只有admin数据库可用】
    + 超级用户角色：root【只有admin数据库可用】
    + 内部角色：__system
+ 认证用户：`db.auth("用户名","密码")`
+ 删除用户：`db.dropUser("用户名")`

## 5.MYSQL五大数据类型

+ 数字类型
  + big
  + tinyint
  + bool, boolean
  + smallint
  + mediumint
  + int
  + bigint
  + decimal
  + float
  + double
  + serial等价于`BIGINT UNSIGNED NOT NULLAUTO_INCREMENT UNIQUE`
+ 字符串类型
  + char(100)
  + varchar(100)
  + binary(1024)
  + varbinary(1024)
  + blob
  + text
  + enum('v1','v2')
  + set('v1','v2')
+ 时间和日期类型
  + date
  + time
  + datetime
  + timestamp
  + year
+ JSON类型(5.7.8以上)
+ 其他特殊类型

## 6. 将日期数据库处理为iSO 8601格式再返回给前端



## 7.范式--设计标准

+ 第一范式 1NF	
  + 定义：字段不可再分
  + 举例：我们要存储体检者的双眼视力，那么应该存为左眼视力和右眼视力两个字段，即存为`left_eye`和`right_eye`，而不能把他们存在一个字段
  + 缺点：数据冗余、创建列时插入一异常、删除数据可能会导致列消失、数据改动时要改动多处
+ 第二范式 2NF
  + 定义(非标准)：
    + 在1NF的基础上，要有键(键可由多个字段组合)
    + 所有字段分别**完全**依赖于键
    + 如果键时多个字段组合，则**不允许部分依赖**于该键
  + 依赖关系：给出键，就能确定唯一字段的值，如给出学号，就能唯一确定姓名，反之则不行，则称姓名依赖于学号
+ 第三范式 3NF
  + 定义(非标准)：
    + 一个表里不能有两层依赖
  + 举例：
    + 给出学号，就能确定系名：系名依赖于学号
    + 给出系名，就能确定系主任：系主任依赖于系名
    + 所以，系主任**间接依赖**于学号，则不满足第三范式
+ BC范式
  + 定义：键中的属性也不存在间接依赖

## 8.数据库设计经验

+ 高内聚
  + 把相关的字段放到一起，不相关的分开建表
  + 如果两个字段能够单独建表，那就单独建表
+ 低耦合
  + 如果两个表之间有弱关系
  + 一对一可放在一个表，也可两个表加外键
  + 一对多一般用外键
  + 多对多一般用中间表

## 9.事务

+ 多条语句有一条执行失败则全部不生效

+ ```mysql
  > start transaction;
  > 语句1;语句2;语句3;
  > commit;
  ```

## 10.存储引擎

+ 命令：`SHOW ENGINES;`--查看可用的引擎
+ 常见的存储引擎：
  + InnoDB--默认
  + MyISAM--拥有较高的插入、查询速度，但不支持事务
  + Memory--内存中，快速访问数据
  + Archive--只支持insert和select

## 11.索引

+ 语法：`CREATE UNIQUE INDEX index1 ON users(name(100));`
+ 查看索引：`SHOW INDEX IN users;`
+ 用途：提高搜索效率