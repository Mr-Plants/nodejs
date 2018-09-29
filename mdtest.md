# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题（最小）  


* 无序列表1
* 二级列表1 
  * 二级列表
* 无序列表2


1. 有序列表1
2. 有序列表2
3. 有序列表3


`底色`  
**加粗**  
*斜体*  
两个空格  
换行  
~~删除线~~

>这是一段引用文字（离离原上草）  

![头像](http://img.xgo-img.com.cn/209_500x375/208169.jpg)  

[点击此链接访问百度](www.baidu.com)  

底线在此!

---
***  


放代码！
```
 import { Component } from '@angular/core';
 
 @Component({
   selector: 'nz-demo-button-basic',
   template: `
     <button nz-button nzType="primary">Primary</button>
     <button nz-button nzType="default">Default</button>
     <button nz-button nzType="dashed">Dashed</button>
     <button nz-button nzType="danger">Danger</button>`,
   styles  : [
       `
       [nz-button] {
         margin-right: 8px;
         margin-bottom: 12px;
       }
     `
   ]
 })
 export class NzDemoButtonBasicComponent {
 }
  ```
  
  <!--放一段注释冷静一下，不会被编译的哦-->
  
 
| header1 | header2 | 第三列 |
| --- | --- | --- |
| row1 | row2 | 3 |
| row1 | row2 | 4 |
