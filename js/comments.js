/**
 * Created by Tean on 2016/12/1.
 */
$(function () {

    $('.face-show').click(function () {
        $('.face-icons').fadeIn();
        return false;
    });

    $(document).click(function (event) {
        $('.face-icons').fadeOut();
    });

    $('.face-icons').click(function () {
        return false;
    });

    $('.face-page i').click(function () {
        $(this).css('backgroundColor', '#70ca10').siblings().css('backgroundColor', '#ccc');
        $('.face-icons li').eq($(this).index()).show().siblings().hide();
    });

    $('#txtMsg').keyup(function () {
        var v = $(this).val().replace(/\[::\d+::\]/g, 'aa').length;
        $('.input-info').html(v + ' / 240');
    });

    $('.face-icons li span').click(function () {
        var src = $(this).find('img').attr('src');
        //$('#txtMsg').val($('#txtMsg').val() + '[::' + src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('@')) + '::]').trigger('keyup');
        insertText($('#txtMsg')[0], '[::' + src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('@')) + '::]');
        $('#txtMsg').trigger('keyup');
    });

    $('.btn-publish').click(function () {
        if($('#txtMsg').val() == '') {
            $('#txtMsg').attr('placeholder', '你丫的到是写点东西啊!!!');
            return;
        }
        // var lh = 0, rh = 0;
        // $('.pl').each(function () {
        //     lh += $(this).height();
        // });
        // $('.pr').each(function () {
        //     rh += $(this).height();
        // });

        var val = $('#txtMsg').val().replace(/\[::(\d+)::\]/g, ' <img src="images/icon/$1@2x.png"> ');
        $('.comments-list').prepend(`<div class="single-comments">
        <div class="msg-head-pic"><img src="images/default-face.jpg" width="50" height="50"></div>
        <dl class="msg-content">
            <dt><span>2016-11-25 14:59</span><a href="#">Tean</a></dt>
            <dd>${val}</dd>
        </dl>
    </div>`);
        $('#txtMsg').val('');

    });


    function insertText(obj,str) {
        if (document.selection) {
            var sel = document.selection.createRange();
            sel.text = str;
        } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
            var startPos = obj.selectionStart,
                endPos = obj.selectionEnd,
                cursorPos = startPos,
                tmpStr = obj.value;
            obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
            cursorPos += str.length;
            obj.selectionStart = obj.selectionEnd = cursorPos;
        } else {
            obj.value += str;
        }
    }
    function moveEnd(obj){
        obj.focus();
        var len = obj.value.length;
        if (document.selection) {
            var sel = obj.createTextRange();
            sel.moveStart('character',len);
            sel.collapse();
            sel.select();
        } else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
            obj.selectionStart = obj.selectionEnd = len;
        }
    }

});