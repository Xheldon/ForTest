/**
 * Created by xheldon on 15/8/13.
 */


//小脚本判断人名是否为三个然后调节整齐
$('._introduce_people_introduce span:first-child').each(function () {
    if($(this).text().length==2){
        $(this).css('letterSpacing',"14px");
        //修正一下因为增加间距导致的后移
        $(this).next('span').css("marginLeft",'-14px');
    }
});


//微调导航栏一些效果
    //链接渐变
$('#_top_content li:first-child').on('mouseover',function(){
    $('#_top_content li span').addClass('_just_for_sync_change').css('color','#f59a2e');//不知为何写在后面的类_just_for_sync_change没有覆盖掉前面 span 的默认颜色，故用脚本微调
});
$('#_top_content li:first-child').on('mouseout',function(){
    $('#_top_content li span').removeClass('_just_for_sync_change').css('color','#888');
});
//当前选项变色
$('._top_list li a').each(function(){
    $(this).on('click',function(){
        $('._top_list li a').each(function(){
            //先把所有的 a 链接的样式取消
            $(this).removeClass('_active');
            $(this).children('span').removeClass('_active_span');
        });
        //在添加当前点击的 a 链接的样式
        $(this).addClass('_active');
        $(this).children('span').addClass('_active_span');
    })
});
//添加 select 选项卡变色等效果
$('._select_card_1').on('click',function(){
    //外层选项卡变色
    $('._select_card_1').addClass('_select_card_1_click');
    $('._select_card_2').removeClass('_select_card_2_click');
    $('._select_card_3').removeClass('_select_card_3_click');
    //多边形变色
    $('._select_card_1 ._polygon_top,._select_card_1 ._polygon_middle,._select_card_1 ._polygon_bottom').addClass('_polygon_click_1');
    $('._select_card_2 ._polygon_top,._select_card_2 ._polygon_middle,._select_card_2 ._polygon_bottom').removeClass('_polygon_click_2');
    $('._select_card_3 ._polygon_top,._select_card_3 ._polygon_middle,._select_card_3 ._polygon_bottom').removeClass('_polygon_click_3');
    //右侧文本变色
    $('._select_card_1 p').addClass('_select_card_text_click');
    $('._select_card_2 p').removeClass('_select_card_text_click');
    $('._select_card_3 p').removeClass('_select_card_text_click');
    //显示出来对应内容
    $('._select_content_1').css('display','block');
    $('._select_content_2').css('display','none');
    $('._select_content_3').css('display','none');
    //对应内容文本变色
    $('._select_content_1_bottom ul:first-child a').each(function(){
        $(this).removeClass('_select_list_click_1');
    });
    $('._select_content_1_bottom ul:last-child a').each(function(){
        $(this).removeClass('_select_list_click_1');
    });
    $('._select_content_1_bottom ul:first-child a').eq(0).addClass('_select_list_click_1');
    $('._select_content_1_bottom ul:last-child a').eq(0).addClass('_select_list_click_1');
});
$('._select_card_2').on('click',function(){
    $('._select_card_1').removeClass('_select_card_1_click');
    $('._select_card_2').addClass('_select_card_2_click');
    $('._select_card_3').removeClass('_select_card_3_click');
    $('._select_card_2 ._polygon_top,._select_card_2 ._polygon_middle,._select_card_2 ._polygon_bottom').addClass('_polygon_click_2');
    $('._select_card_1 ._polygon_top,._select_card_1 ._polygon_middle,._select_card_1 ._polygon_bottom').removeClass('_polygon_click_1');
    $('._select_card_3 ._polygon_top,._select_card_3 ._polygon_middle,._select_card_3 ._polygon_bottom').removeClass('_polygon_click_3');
    $('._select_card_1 p').removeClass('_select_card_text_click');
    $('._select_card_2 p').addClass('_select_card_text_click');
    $('._select_card_3 p').removeClass('_select_card_text_click');
    //显示出来对应内容
    $('._select_content_1').css('display','none');
    $('._select_content_2').css('display','block');
    $('._select_content_3').css('display','none');
    //对应内容文本变色
    $('._select_content_2_bottom ul:first-child a').each(function(){
        $(this).removeClass('_select_list_click_2');
    });
    $('._select_content_2_bottom ul:last-child a').each(function(){
        $(this).removeClass('_select_list_click_2');
    });
    $('._select_content_2_bottom ul:first-child a').eq(0).addClass('_select_list_click_2');
    $('._select_content_2_bottom ul:last-child a').eq(0).addClass('_select_list_click_2');
});
$('._select_card_3').on('click',function(){
    $('._select_card_1').removeClass('_select_card_1_click');
    $('._select_card_2').removeClass('_select_card_2_click');
    $('._select_card_3').addClass('_select_card_3_click');
    $('._select_card_3 ._polygon_top,._select_card_3 ._polygon_middle,._select_card_3 ._polygon_bottom').addClass('_polygon_click_3');
    $('._select_card_1 ._polygon_top,._select_card_1 ._polygon_middle,._select_card_1 ._polygon_bottom').removeClass('_polygon_click_1');
    $('._select_card_2 ._polygon_top,._select_card_2 ._polygon_middle,._select_card_2 ._polygon_bottom').removeClass('_polygon_click_2');
    $('._select_card_1 p').removeClass('_select_card_text_click');
    $('._select_card_2 p').removeClass('_select_card_text_click');
    $('._select_card_3 p').addClass('_select_card_text_click');
    //显示出来对应内容
    $('._select_content_1').css('display','none');
    $('._select_content_2').css('display','none');
    $('._select_content_3').css('display','block');
    //对应内容文本变色
    $('._select_content_3_bottom ul:first-child a').each(function(){
        $(this).removeClass('_select_list_click_3');
    });
    $('._select_content_3_bottom ul:last-child a').each(function(){
        $(this).removeClass('_select_list_click_3');
    });
    $('._select_content_3_bottom ul:first-child a').eq(0).addClass('_select_list_click_3');
    $('._select_content_3_bottom ul:last-child a').eq(0).addClass('_select_list_click_3');
});
//选项卡内容点击部分的效果，左边列表第一部分
$('._select_content_1_bottom ul:first-child a').on('click', function () {
    $('._select_content_1_bottom ul:first-child a').each(function(){
        $(this).removeClass('_select_list_click_1');
    });
    $(this).addClass('_select_list_click_1');
});
//选项卡内容点击部分的效果，右边列表第一部分
$('._select_content_1_bottom ul:last-child a').on('click', function () {
    $('._select_content_1_bottom ul:last-child a').each(function(){
        $(this).removeClass('_select_list_click_1');
    });
    $(this).addClass('_select_list_click_1');
});
//选项卡内容点击部分的效果，左边列表第二部分
$('._select_content_2_bottom ul:first-child a').on('click', function () {
    $('._select_content_2_bottom ul:first-child a').each(function(){
        $(this).removeClass('_select_list_click_2');
    });
    $(this).addClass('_select_list_click_2');
});
//选项卡内容点击部分的效果，右边列表第二部分
$('._select_content_2_bottom ul:last-child a').on('click', function () {
    $('._select_content_2_bottom ul:last-child a').each(function(){
        $(this).removeClass('_select_list_click_2');
        //因为类名和前一个列表相同，因此需要移除多余的类
        $(this).removeClass('_select_list_click_1');
        $(this).removeClass('_select_list_click_3');
    });
    $(this).addClass('_select_list_click_2');
});

//选项卡内容点击部分的效果，左边列表第三部分
$('._select_content_3_bottom ul:first-child a').on('click', function () {
    $('._select_content_3_bottom ul:first-child a').each(function(){
        $(this).removeClass('_select_list_click_3');
        //因为类名和前一个列表相同，因此需要移除多余的类
        $(this).removeClass('_select_list_click_1');
        $(this).removeClass('_select_list_click_2');
    });
    $(this).addClass('_select_list_click_3');
});
//选项卡内容点击部分的效果，右边列表第三部分
$('._select_content_3_bottom ul:last-child a').on('click', function () {
    $('._select_content_3_bottom ul:last-child a').each(function(){
        $(this).removeClass('_select_list_click_3');
        //因为类名和前一个列表相同，因此需要移除多余的类
        $(this).removeClass('_select_list_click_1');
        $(this).removeClass('_select_list_click_2');
    });
    $(this).addClass('_select_list_click_3');
});

//增加 video 鼠标悬浮特效
$('._video').each(function(){
    $(this).on('mouseover',function(){
        $(this).children('._video_list_text').addClass('_video_list_text_content_mouseover');
        $(this).children('._video_bar').addClass('_video_bar_mouseover');
    })
});
$('._video').each(function(){
    $(this).on('mouseleave',function(){
        $(this).children('._video_list_text').removeClass('_video_list_text_content_mouseover');
        $(this).children('._video_bar').removeClass('_video_bar_mouseover');
    })
});


//查看详情的特殊箭头悬浮变色
$('._more_detail').on('mouseover',function(){
    $('._more_detail span').css('color','white');
}),
$('._more_detail').on('mouseleave',function(){
    $('._more_detail span').css('color','#e9791b');
});
//调整 main 区域的背景色
var a = $('._main_one').length;
for(var i = 0;i<a;i++){
    if(i==0){
        $('._main_one').eq(0).css("backgroundColor","#f2f5f9")
    }else{
        if(i%2==0){
            $('._main_one').eq(i).css("backgroundColor","#f2f5f9")
        }else{
            $('._main_one').eq(i).css("backgroundColor","#e6eaf0")
        }
    }
}