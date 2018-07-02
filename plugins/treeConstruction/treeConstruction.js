/*
 * @Author: zhongjiaxin
 * @Date:   2018-04-01 16:34:13
 * @Last Modified by:   anchen
 * @Last Modified time: 2018-04-10 09:07:24
 */
;(function(factory){
    if(typeof define === 'function' && define.amd){
        define(['jquery','lodash'],factory);
    }else if (typeof exports !== 'undefined') {
        // For Node.js or CommonJS.
        var _ = require('lodash');
        var $ = require('jquery');
        module.exports = factory($, _);
    }else{
        factory(jQuery,_);
    }
}(function($,_){
    //防冲突处理，如果原型链上有，将之移给old变量
    var old = $.fn.treeStatus;
    //构造函数
    var TreeConstruction=function TreeConstruction(element,options){
        var self=this;
        this.$element = $(element);
        self.options = $.extend({},$.fn.treeConstruction.defaults,options);
        self.init();


    };

    // 定义原型
    TreeConstruction.prototype ={
        // 初始化
        init:function(){
            this.loadTreeUrl();

        },
        loadTreeUrl:function(){
            var self=this;
            $.ajax({
                type:"POST",
                url:self.options.treeJson,
                dataType:"json",
                contentType:"application/json",
                success:function(data){
                    // console.log(data)
                   self.buildTreeStatusDom(data)
                }
            });
        },
        buildTreeStatusDom:function(jsonData){
            var self=this;
            var html='<div class="treeConstruction">'
                        +'<div class="clear">'
                            +'<ul class="ulGrade1 ulGrade1-1">';
            $.each(jsonData,function (index,sonData) {
                html +=self.buildTreeStaLevHtml(sonData,jsonData.length);
            });
            html+=      '</ul>'
                    +'</div>'
                +'</div>';
            self.$element.html(html);

        },
        buildTreeStaLevHtml:function(sonData,long){
            var num=1;
            var self=this;
            var vstring ='';
            if(sonData.children && sonData.children.length>0){
                num++;
                vstring +='<li class="liGrade'+sonData.grade+' liGrade'+sonData.grade+'-'+long+'">'
                            +'<div class="treeStatusBox treeStatusBox'+sonData.grade+'">'
                                +'<div class="contentLabel">'
                                    +'<h3 class="title">'+sonData.name+'</h3>'
                                +'</div>'
                                +'<div class="detailBox">'
                                    +'<div class="detailText clear">'
                                        +'<div class="name fl">完成值</div>'
                                        +'<div class="value-detail fr">'
                                            +'<span class="value">'
                                                +''+sonData.finishRateVal+'<span class="icon">'+sonData.yoyGrowthRateUnit+'</span>'
                                            +'</span>'
                                        +'</div>'
                                    +'</div>'
                                    +'<div class="detailText clear">'
                                        +'<div class="name fl">同比增长率</div>'
                                        +'<div class="value-detail fr">'
                                            +'<span class="value">'
                                                +''+sonData.yoyGrowthRateVal+'<span class="icon">'
                                                    +'<i class="fa fa-arrow-up"></i>'
                                                +'</span>'
                                            +'</span>'
                                        +'</div>'
                                    +'</div>'
                                +'</div>'
                            +'</div>'
                            +'<ul class="ulGrade'+(sonData.grade+1)+' ulGrade'+(sonData.grade+1)+'-'+sonData.children.length+'">';
                $.each(_.sortBy(sonData.children,function (entity) {
                  return entity.orderId;
                }),function (index,tempData) {

                  vstring +=self.buildTreeStaLevHtml(tempData,sonData.children.length);

                });
                vstring +='</ul>';
                        +'</li>';
              }else{
                vstring += '<li class="liGrade'+sonData.grade+' liGrade'+sonData.grade+'-'+long+'">'
                            +'<div class="treeStatusBox treeStatusBox'+sonData.grade+'">'
                               +'<div class="contentLabel">'
                                    +'<h3 class="title">'+sonData.name+'</h3>'
                                +'</div>'
                                +'<div class="detailBox clear">'
                                    +'<div class="detailText">'
                                        +'<div class="name fl">完成值</div>'
                                        +'<div class="value-detail fr">'
                                            +'<span class="value">'
                                                +''+sonData.finishRateVal+'<span class="icon">'+sonData.yoyGrowthRateUnit+'</span>'
                                            +'</span>'
                                        +'</div>'
                                    +'</div>'
                                    +'<div class="detailText clear">'
                                        +'<div class="name fl">同比增长率</div>'
                                        +'<div class="value-detail fr">'
                                            +'<span class="value">'
                                                +''+sonData.yoyGrowthRateVal+'<span class="icon">'
                                                    +'<i class="fa fa-arrow-up"></i>'
                                                +'</span>'
                                            +'</span>'
                                        +'</div>'
                                    +'</div>'
                                +'</div>' 
                            +'</div>'
                          +'</li>';
              }
            return vstring;
        }
        
    };


    // 为了避免多次实例化
    $.fn.treeConstruction = function treeConstruction(option,value) {
        var retval;
        var $set = this.each(function () {
            var $this = $(this);
            var data = $this.data('makerui.treeConstruction');
            var options = typeof option === 'object' && option;

            $this.data('makerui.treeStatus', (data = new TreeConstruction(this, options)));
            if (typeof option === 'string') retval = data[option](value);
        });
        return (retval === undefined) ? $set : retval;
    };

    $.fn.treeConstruction.defaults = {
        treeJson:"json/foshanTree.json",
        levelTypeArr:[
            {"noId":1,"bgClr":"#FDF3EA","borderClr":"#EDA361"},
            {"noId":2,"bgClr":"#EAFAF0","borderClr":"#53D48A"},
            {"noId":3,"bgClr":"#EBF4FB","borderClr":"#5CAAE2"}
        ]
    };
    $.fn.treeConstruction.Constructor = TreeConstruction;
    $.fn.treeConstruction.noConflict = function () {
        $.fn.TreeConstruction = old;
        return this;
    };

}));