<?php

    session_start(); //Стартуем сессию

    //Если в сессии нет массива корзины, то создаём его
    if ( ! isset($_SESSION['cart'])) {
        $_SESSION['cart'] = array();
    }


    include_once '../config/config.php';            // Подключение файла конфигурации
    include_once '../config/db.php';                // Подключение баз данных
    include_once '../library/mainFunctions.php';    // Подключение общих функций

    // Определяем вызываемый контроллер
    $controllerName = isset($_GET['controller']) ? ucfirst($_GET['controller']) : 'index';

    // Определяем вызываемый экшен
    $actionName = isset($_GET['action']) ? $_GET['action'] : 'index';

    // Если в сессии есть данные об авторизованном пользователе, то передаем их в шаблон
    if (isset($_SESSION['user'])) {
        $smarty->assign('arUser', $_SESSION['user']); //arUser - массив пользователя
    }


    // Инициализируем переменную шаблонизатора количества элементов в корзине
    $smarty->assign('cartCntItems', count($_SESSION['cart']));
    /*
        Вызываем функцию загрузки страницы
        $smarty - объект шаблонизатора
        $controllerName - имя контроллера
        $actionName - имя экшена
    */
    loadPage($smarty, $controllerName, $actionName);