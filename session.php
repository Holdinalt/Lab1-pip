<?php

echo getSessionAns();

function getSessionAns(){
    $ret = "";
    foreach ($_SESSION['answers'] as $answer){
        $ret .= $answer;
    }
    return $ret;
}
