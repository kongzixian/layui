var commonPrint={
    // 节流处理
    throttleClickFun:function(handler,wait,obj){
        var lastTime=0;
        return function(e){
            var nowTime=new Date().getTime();
            if(nowTime-lastTime>wait){
                handler(e,obj);
                lastTime=nowTime;
            }
        }
    },
    // 局部改变
    // option={
    //   id:"#btn" ,
    //   tableId:"test",
    //   layFilter:"demo",
    //   prop:"score",
    //   clickFun:clickFun,
    //   wait:1000,
    //   className:'.kong',
    //   layEvent:'kong',
    //   ids:'ids',
    //   handleProp:handleProp
    // }
    Btnclick:function(option){
        var self=this;
        var params={
                layFilter:option.layFilter,
                tableId:option.tableId,
                prop:option.prop,
                className:option.className,
                ids:option.ids,
                layEvent:option.layEvent,
                handleProp:option.handleProp
            }
        $(option.id).on('click',self.throttleClickFun(option.clickFun,option.wait,params));
    },
    clickFun:function(e,opt){
        console.log(opt)
        layui.use(['table'],function(){
           var data= table.checkStatus(opt.tableId).data;
            $.each(data,function(index,item){
                item[opt.prop]=opt.handleProp(item[opt.prop]);
                table.on('tool('+opt.layFilter+')', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
                var data = obj.data //获得当前行数据
                ,layEvent = obj.event; //获得 lay-event 对应的值
                if(layEvent === ''+opt.layEvent+''){
                    obj.update({
                        score:item[opt.prop]
                    })
                }
              });
            $('#'+opt.tableId).next().find('tbody tr '+opt.className+'['+opt.ids+'='+item[opt.ids]+']').click();
            })
        })
    },
    handleProp:function(vaule){
        return vaule-0+1;
    }
}