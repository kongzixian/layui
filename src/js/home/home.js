    
    var navHtml='<div class="header-nav">\
                    <ul class="layui-nav">\
                        <li class="layui-nav-item"><a href="">最新活动</a></li>\
                        <li class="layui-nav-item layui-this">\
                            <a href="javascript:;">产品</a>\
                            <dl class="layui-nav-child">\
                              <dd><a href="">选项1</a></dd>\
                              <dd><a href="">选项2</a></dd>\
                              <dd><a href="">选项3</a></dd>\
                            </dl>\
                        </li>\
                        <li class="layui-nav-item"><a href="">大数据</a></li>\
                        <li class="layui-nav-item">\
                            <a href="javascript:;">解决方案</a>\
                            <dl class="layui-nav-child">\
                              <dd><a href="">移动模块</a></dd>\
                              <dd><a href="">后台模版</a></dd>\
                              <dd class="layui-this"><a href="">选中项</a></dd>\
                              <dd><a href="">电商平台</a></dd>\
                            </dl>\
                        </li>\
                        <li class="layui-nav-item"><a href="">社区</a></li>\
                    </ul>\
                </div>\
                <div class="allWrap">\
                    <div class="siderLeft"></div>\
                    <div class="pageContent">\
                        <div style="width:100%;height:600px;background:red;">\
                            <div class="btn"><button class="layerBtn">弹出框</button>\
                            </div>\
                        <div class="form">\
                            <input type="text" class="layui-input" id="test1" style="width:250px;float:left;margin-right:30px;">\
                            <input type="text" class="layui-input" id="test2" style="width:250px;float:left">\
                            <input type="text"  id="myInput" >\
                        </div>\
                         <br>\
                        <div class="showDate"><div class="layui-inline" id="test-n1"></div></div>\
                        </div>\
                    </div>\
                </div>';
    $('body').html(navHtml)
    layui.use('element', function(){
      var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
      
      //监听导航点击
      element.on('nav(demo)', function(elem){
        //console.log(elem)
        layer.msg(elem.text());
      });
    });



    $('.layerBtn').on('click',function(){
        layui.use('layer', function(){
          var layer = layui.layer;
          var msg='成功'
          layer.msg(msg);
        });
    })



    layui.use('laydate', function(){
      var laydate = layui.laydate;
      laydate.render({
            elem: '#test2' //指定元素
            // ,range: true
            ,show: true
            ,format :'yyyy-MM-dd'
            
            
          });
      //执行一个laydate实例
      laydate.render({
        elem: '#test1' //指定元素
        // ,range: true
        ,show: true
        ,format :'yyyy-MM-dd'
        ,done: function(value, date, endDate){
           laydate.render({
            elem: '#test2' //指定元素
            // ,range: true
            ,show: true
            ,format :'yyyy-MM-dd'
            
            
          });
            
                
        }
        
      });


        laydate.render({
            elem: '#test-n1'
            ,position: 'static',
            range: true
            ,done: function(value, date, endDate){
                // console.log(value); //得到日期生成的值，如：2017-08-18
                // console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                // console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
            }
        });
    });
    

    $('#myInput').val(555)