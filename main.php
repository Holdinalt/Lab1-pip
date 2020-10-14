<?php


start();


function calc($x, $y, $R){
    switch ($x >= 0){
        case (true) : switch ($y > 0){
            case (true) : return false;
            case (false) : return ((2 * $x - $R) <= $y);
            default : return false;
        }
        case (false) : switch ($y > 0){
            case (true) : return ($y <= $R + 0 && $x >= -1 * $R + 0);
            case (false) : return ($x ^ 2 + $y ^ 2 <= $R ^ 2);
            default : return false;
        }
        default : return false;
    }
}

function validation(){
    $pathText = "/^((-[1-4](\.)[0-9])|([0-2](\.)[0-9])|-5(\.)0|3(\.)0|-[1-5]|[0-3])$/";
    $pathX = "/^(-[1-4]|[0-4])$/";
    $pathR = "/^[1-3]\.0$/";
        if(preg_match($pathText, $_POST["formTextY"]) != 1 ||
            preg_match($pathX, $_POST["formRadiosX"]) != 1 ||
            preg_match($pathR, $_POST["formCheckBoxesR"]) != 1){
        return false; }
        return true;
}

function start(){
    global $start_time, $end_time;
    date_default_timezone_set('Europe/Moscow');
    session_start();
    $start_time = microtime(true);
    makeSession();
    if (validation() != true){
        echo '<span class="badAns">Неверные входные данные</span>';
        return;
    }
    $result = calcForm();
    sendResponse($result);
    addToSession($result);

}

function calcForm(){
    if(calc($_POST["formRadiosX"], $_POST["formTextY"], $_POST["formCheckBoxesR"])){
        return true;
    }else{
        return false;

    }
}

function sendResponse($bool){
    if($bool === true){
        echo '<span class="goodAns">Точка попадает в заданую область</span>';
    }else{
        echo '<span class="badAns">Точка не попадает в заданую область</span>';

    }
}

function makeSession(){
    $_SESSION['answers'] = array();
}


function fillSessionAns($answer){
    if($answer){
        return 'Попал';
    }else{
        return 'Не попал';
    }
}


function addToSession($answer){
    global $start_time, $end_time;
    $str = '<tr><td>' . $_POST["formRadiosX"] . '</td>
                        <td>' . $_POST["formTextY"] . '</td>
                        <td>' . $_POST["formCheckBoxesR"] . '</td>
                        <td>' . fillSessionAns($answer) . '</td>
                        <td>' . date('H:i:s') . '</td>
                        <td>' . (microtime(true) - $start_time) * 1000000 . '</td></tr>';
    array_push($_SESSION['answers'], $str);

}
