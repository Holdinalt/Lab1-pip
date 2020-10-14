<?php

session_start();
echo getSessionAns();

function getSessionAns(){
    $ret = "";
    foreach ($_SESSION['answers'] AS $answer){
        $ret .= $answer;
    }
    return $ret;
}
