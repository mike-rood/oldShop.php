function addToCart(itemId) {
    console.log("js - addToCart()");
    $.ajax({
        type: 'POST',
        url: "/cart/addtocart/" + itemId + '/',
        dataType: 'json',
        success: function(data) {
            if (data['success']) {
                $('#cartCntItems').html(data['cntItems']);
                $('#addCart_'+ itemId).hide();
                $('#removeCart_'+ itemId).show();
            }
        }
    });
}

function removeFromCart(itemId) {
    console.log("js - removeFromCart("+itemId+")");
    $.ajax({
        type: 'POST',
        url: "/cart/removefromcart/" + itemId + '/',
        dataType: 'json',
        success: function(data) {
            if (data['success']) {
                $('#cartCntItems').html(data['cntItems']);
                $('#addCart_'+ itemId).show();
                $('#removeCart_'+ itemId).hide();
            }
        }
    });
}

function conversionPrice(itemId) {
    let newCnt = $('#itemCnt_' + itemId).val();
    let itemPrice = $('#itemPrice_' + itemId).attr('value');
    let itemRealPrice = newCnt * itemPrice;

    $('#itemRealPrice_' + itemId).html(itemRealPrice);
}

function getData(obj_form) {
    let hData = {};
    $('input, textarea, select', obj_form).each(function(){
        if (this.name && this.name != '') {
            hData[this.name] = this.value;
            console.log('hData[' + this.name + '] = ' + hData[this.name]);
        }
    });
    return hData;
}

function registerNewUser() {
    let postData = getData('#registerBox');
    $.ajax({
        type: 'POST',
        url: "/user/register/",
        data: postData,
        dataType: 'json',
        success: function(data) {
            if (data['success']) {
                alert('Регистрация прошла успешно');
                //> Блок в левом столбце
                $('#registerBox').hide();
                $('#userLink').attr('href', '/user/');
                $('#userLink').html(data['userName']);
                $('#userBox').show();
                //<
                //>Страница заказа
                $('#loginBox').hide();
                $('#btnSaveOrder').show();
                //<                
            } else {
                alert(data['message']);
            }
        }
    });
}

/**
 * Авторизация пользователя
 */
function login() 
{
    let email = $('#loginEmail').val();
    let pwd = $('#loginPwd').val();

    let postData = "email="+ email +"&pwd=" +pwd;

    $.ajax({
        type: 'POST',
        url: "/user/login/",
        data: postData,
        dataType: 'json',
        success: function(data) {
            if (data['success']) {
                $('#registerBox').hide();
                $('#loginBox').hide();

                $('#userLink').attr('href', '/user/');
                $('#userLink').html(data['displayName']);
                $('#userBox').show();
            } else {
                alert(data['message']);
            }
        }
    });
}

function logout() {
    $.ajax({
        type: 'POST',
        url: "/user/logout/",
        success: function() {
            alert("Вы вышли из аккаунта");
            $('#userBox').hide();
            $('#loginBox').show();
            $('#registerBox').show();
        }
    });
}