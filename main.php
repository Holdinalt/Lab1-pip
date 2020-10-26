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
    $pathText = "/^0*((-[1-4](\.|,)[0-9]*)|([0-2](\.|,)[0-9]*)|-5(\.|,)0|3(\.|,)0|-[1-5]|[0-3])$/";
    $pathX = "/^(-[1-4]|[0-4])$/";
    $pathR = "/(^[1-3]\.0$)|(^[1-3]\.5$)/";
        if(preg_match($pathText, $_POST["formTextY"]) != 1 ||
            preg_match($pathX, $_POST["formRadiosX"]) != 1 ||
            preg_match($pathR, $_POST["formCheckBoxesR"]) != 1){
        return false; }
        return true;
}

function start(){
    //typeLogs();
    global $start_time;
    date_default_timezone_set('Europe/Moscow');
    session_start();
    $start_time = microtime(true);
    makeSession();
    if (validation() != true){
        echo '<span class="badAns">Неверные входные данные</span>';
        return;
    }
    $result = calcForm();
    addToSession($result);
    //typeSessionLogs();
    sendResponse($result);

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
    if (empty($_SESSION)) {
        $_SESSION['answers'] = array();
        $_SESSION['answers'][0] = "<tr>
                        <td>X</td>
                        <td>Y</td>
                        <td>R</td>
                        <td>Результат</td>
                        <td>Время вопроса</td>
                        <td>Время выполнения</td>
                    </tr>";
    }
}


function fillSessionAns($answer){
    if($answer){
        return 'Попал';
    }else{
        return 'Не попал';
    }
}


function addToSession($answer){
    global $start_time;
    $str = '<tr><td>' . $_POST["formRadiosX"] . '</td>
                        <td>' . $_POST["formTextY"] . '</td>
                        <td>' . $_POST["formCheckBoxesR"] . '</td>
                        <td>' . fillSessionAns($answer) . '</td>
                        <td>' . date('H:i:s') . '</td>
                        <td>' . (microtime(true) - $start_time) * 1000000 . '</td></tr>';
    array_push($_SESSION['answers'], $str);

}

function typeLogs(){
    $file_post = $_SERVER["DOCUMENT_ROOT"] . "/post.log";
    if (!empty($_POST)) {
        $fw = fopen($file_post, "a");
        fwrite($fw, "POST " . var_export($_POST, true));
        fclose($fw);
    }
}

function typeSessionLogs(){
    $file_post = $_SERVER["DOCUMENT_ROOT"] . "/session.log";
    if (!empty($_SESSION)) {
        $fw = fopen($file_post, "a");
        fwrite($fw, "SESSION " . var_export($_SESSION, true));
        fclose($fw);
    }
}
