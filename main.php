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
    if (validation() != true){
        echo '<span class="badAns">Неверные входные данные</span>';
        return;
    }
    calcForm();

}

function calcForm(){
    if(calc($_POST["formRadiosX"], $_POST["formTextY"], $_POST["formCheckBoxesR"])){
        echo '<span class="goodAns">Точка попадает в заданую область</span>';
    }else{
        echo '<span class="badAns">Точка не попадает в заданую область</span>';

    }
}




