<?php

calcForm();

function calc($x, $y, $R){
    switch ($x){
        case ($x >= 0) : switch ($y){
            case ($y > 0) : return false;
            case ($y <= 0) : return (2 * $x - $R <= $y);
            default : return false;
        }
        case ($x < 0) : switch ($y){
            case ($y > 0) : return ($y <= $R + 0 && $x >= $R + 0);
            case ($y <= 0) : return ($x ^ 2 + $y ^ 2 <= $R ^ 2);
            default : return false;
        }
        default : return false;
    }
}

function calcForm(){
    global $ansColor;
    if(calc($_GET["formRadiosX"], $_GET["formTextY"], $_GET["formCheckBoxesR"])){
        //echo ""
        echo '<span class="goodAns">Точка попадает в заданую область</span>';
    }else{
        echo '<span class="badAns">Точка не попадает в заданую область</span>';

    }
}




