


function loadScripts(){
    yInForm.yListener();
    rInForm.rListener();
    buttonForm.buttonListener();
}


const xInForm = {

    isXSubmit : function checkXSubmit(){
        if($('input[name="formRadiosX"]:checked').length !== 0){
            return true
        } else{
            return  false
        }
    }
}

const yInForm = {

    isSubmit : false,
    Str : "",

    checkStr : function (str){
        let path = /^0*((-[1-4](\.|,)[0-9]*)|([0-2](\.|,)[0-9]*)|-5(\.|,)0|3(\.|,)0|-[1-5]|[0-3])$/
        this.Str = "";
        if(path.test(str)){
        }else{
            this.makeError(" Y");
            return false
        }
        yInForm.delError();
        for (const char of str){
            if ((char === ",") || (char === ".")){
                this.Str += ".";
            }else{
                this.Str += char;
            }
        }
        console.log(this.Str)
        return this.Str
    },


    makeError : function (thing){
        let error = document.getElementById("errorAns");
        error.innerHTML = ("Введены неверные данные для " + thing.toString() );
        this.isSubmit = false;
        //buttonForm.checkSub(this.isSubmit);
    },

    delError : function (){
        let error = document.getElementById("errorAns");
        error.innerHTML = "";
        this.isSubmit = true;
        //buttonForm.checkSub(this.isSubmit);
    },

    yListener : function yListener(){
        let rad = document.getElementById("formTextY")
        rad.addEventListener('input', function() {
            if(!yInForm.checkStr(rad.value) === false){
                yInForm.delError();
            }
            buttonForm.check();
        })
    },

    pop : function(str){
        str = str.replace(/^0+/, '')
        str = str.replace(/0+$/, '')
        return str
    },



}

const rInForm = {

    rListener : function(){
        $('input[name="formCheckBoxesR"]').each(function() {
            $(this).on('change', function(){
                buttonForm.check();
            })
        })
    },

    isRSubmit : function (){

        if($('input[name="formCheckBoxesR"]:checked').length !== 0){
            return  true
        } else{
            return  false
        }
        },
}

const buttonForm = {

    /*checkSub : function (){
        let button = document.getElementById("submitFormButton")
        if(yInForm.isSubmit === true && xInForm.isXSubmit() === true && rInForm.isRSubmit() === true){
            button.disabled = false;
        }else{
            button.disabled = true;
        }
    },

    buttonChecker : function (){
        let button = document.getElementById("submitFormButton")
        button.addEventListener("mouseover", function (){
            buttonForm.checkSub();
        })
    },*/




    check : function (){
        let error2 = document.getElementById("errorAns2");
        if(yInForm.isSubmit === true && xInForm.isXSubmit() === true && rInForm.isRSubmit() === true){
            error2.innerHTML = ("");
            return true
        }else{
            error2.innerHTML = ("Введены не все данные ");
            return false
        }

    },

    buttonListener : function (){
        let button = document.getElementById("submitFormButton")
        button.addEventListener("click", function (){
            if(buttonForm.check() === true){
                buttonForm.send();
            }
        })
    },

    send : function() {
        $('input[name="formCheckBoxesR"]:checked').each(function(){
            let formRadiosX = $("input[name='formRadiosX']:checked").val();
            let formTextY = yInForm.pop(yInForm.Str);
            let formBoxR = $(this).val();
            console.log(formRadiosX)
            console.log(formTextY)
            console.log(formBoxR)
            $.ajax({
                type: 'POST',
                url: 'main.php',
                data: {
                    formRadiosX: formRadiosX,
                    formTextY: formTextY,
                    formCheckBoxesR: formBoxR,
                },
                success: function (data) {
                    $('#answer').html(data);
                }
            }).then(preveusAnsvers)
        })
    }
}

function preveusAnsvers() {
    $.ajax({
        type: 'POST',
        url: 'session.php',
        success: function (data) {
            $('#prevAns').html(data);
        }
    })
}








