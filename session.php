<?php

session_start();
echo getSessionAns();

function getSessionAns(){
    $ret = "";
    $ret .= var_export($_SESSION, true);

    return $ret;
}
