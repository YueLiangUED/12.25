/**
 * Created by wangbiaozy on 2017/8/29.
 */
$(function () {
    function banner(url,interval){
        var $banner = $(this),
            $bannerInner = $banner.find('.bannerInner'),
            $focusList = $banner.find('.focusList'),
            $left = $banner.find('.left'),
            $right = $banner.find('.right'),
            $imgs = null,
            $divs = null,
            $lis = null,
            res = null;
//获取数据
        /*(function getData() {
            $.ajax({
                url: url + '?_=' + Math.random,
                type: 'get',
                dataType: 'json',
                async: false,
                success: function (data) {
                    res = data;
                }
            });
        })();
        console.log(res);*/
//绑定数据
        (function bindData() {
            res = [{"src":"images/banner1.jpg","title":"biaoti","desc":"miaoshu"},
                {"src":"images/banner2.jpg","title":"biaoti","desc":"miaoshu"},
                {"src":"images/banner3.jpg","title":"biaoti","desc":"miaoshu"}]
            var str = '';
            var strLi = '';
            $.each(res, function (index, item) {
                str += '<div><img src="" trueSrc="' + item.src + '" /></div>';
                strLi += index == 0 ? '<li class="bg"></li>' : '<li></li>';
            });
            $bannerInner.html(str);
            $focusList.html(strLi);
            $imgs = $bannerInner.find("img");
            $divs = $bannerInner.children('div');
            $lis = $focusList.children('li');
        })();
//图片延迟加载
        function imgsDelay() {
            $.each($imgs, function (index, item) {
                var tempImg = new Image();
                $(tempImg).prop('src', $(item).attr('trueSrc'));
                $(tempImg).on('load', function () {
                    $(item).prop('src', $(this).prop('src')).css('display', 'block');
                });
            });
            $divs.eq(0).css('zIndex', 1).stop().animate({opacity: 1}, 300);
        }
        window.setTimeout(imgsDelay, 500);
//自动轮播
        var timer = null;
        interval = interval || 2000;
        var step = 0;
        timer = window.setInterval(autoMove, interval);
        function autoMove() {
            if (step == res.length - 1) {
                step = -1;
            }
            step++;
            setBanner();
        }
        function setBanner() {
            $.each($imgs, function (index, item) {
                if (index == step) {
                    $(item).parent().css('zIndex', 1).stop().animate({opacity: 1}, 300, 'linear', function () {
                        $(item).parent().siblings().css('opacity', 0);
                    })
                } else {
                    $(item).parent().css('zIndex', 0);
                }
                index == step && $lis.eq(index).addClass('bg').siblings().removeClass('bg');
            });
        }
        $banner.off('mouseover').on('mouseover', function () {
            $left.css('display', 'block');
            $right.css('display', 'block');
            window.clearInterval(timer);
        }).off('mouseout').on('mouseout', function () {
            $left.css('display', 'none');
            $right.css('display', 'none');
            timer = window.setInterval(autoMove, interval);
        });
        (function bindEvent() {
            $.each($lis, function (index, item) {
                $(this).on('click', function () {
                    step = $(this).index();
                    setBanner();
                });
            });
        })();
        $left.on('click',function (){
            if(step == 0){
                step = res.length;
            }
            step--;
            setBanner();
        });
        $right.on('click',autoMove);
    }
    $.extend({
        banner : banner
    });
    $.fn.extend({
        banner : banner
    });
    $('#banner').banner('data.json');
    
    //轮播图链接
    $('.bannerInner>div:nth-child(1)').on('click',function () {
        window.location.href = '';
    });
    $('.bannerInner>div:nth-child(2)').on('click',function () {
        window.location.href = '';
    });
    $('.bannerInner>div:nth-child(3)').on('click',function () {
        window.location.href = '';
    });
    
});