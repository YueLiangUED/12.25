/**
 * Created by wangbiaozy on 2017/12/23.
 */
$(function () {
    //点击搜索分类&字母
    function tab($selected) {
        $selected.on('click','li',function () {
            $(this).addClass('act').siblings().removeClass('act');
            if($(this).parent().hasClass('desc')){
                $('#letter').children().removeClass('act');
            }else{
                $('#classes').children().removeClass('act');
            }
        });
    }
    tab($('.letterBox'));
    //点击分类下详细分类
    $('#classes').on('click','span',function () {
        $(this).parent().hide().end().parent().parent().addClass('act').siblings().removeClass();
    });
    $('#classes').on('mouseover','li',function () {
        $(this).children('div').show().end().siblings('li').children('div').hide();
    });
    $('#classes').on('mouseout','li',function () {
        $(this).children('div').hide();
    });
});
