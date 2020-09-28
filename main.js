


function loadScripts(){
    yInForm.yListener();
    rInForm.rListener();
    buttonForm.buttonChecker();
    buttonForm.buttonListener();
}


const yInForm = {

    Str : "",

    checkStr : function (str){
        let path = /^((-[1-4](\.|,)[0-9])|([0-2](\.|,)[0-9])|-5(\.|,)0|3(\.|,)0|-[1-5]|[0-3])$/
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
        buttonForm.checkSub(this.isSubmit);
    },

    delError : function (){
        let error = document.getElementById("errorAns");
        error.innerHTML = "";
        this.isSubmit = true;
        buttonForm.checkSub(this.isSubmit);
    },

    yListener : function yListener(){
        let rad = document.getElementById("formTextY")
        rad.addEventListener('input', function() {
            if(!yInForm.checkStr(rad.value) === false){
                yInForm.delError();
            }
        })
    },



}

const rInForm = {

    rListener : function (){

            let prev = null;
            for (let i of document.myForm.formCheckBoxesR) {
                i.addEventListener('change', function() {
                    if(prev === null){
                        prev = this;
                    }else{
                        prev.checked = false;
                        prev = this;
                    }
                });
            }
        },
}

const buttonForm = {

    checkSub : function (){
        let button = document.getElementById("submitFormButton")
        if(yInForm.isSubmit === true){
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
    },

    buttonListener : function (){
        let button = document.getElementById("submitFormButton")
        button.addEventListener("click", function (){
                buttonForm.send();
        })

        //$("#submitFormButton").click(buttonForm.send());
    },

    send : function(){
    let formRadiosX = $("input[name='formRadiosX']:checked").val();
    let formTextY = yInForm.Str;
    let formCheckBoxesR = $('input[name="formCheckBoxesR"]').val();
    console.log(formRadiosX);
    console.log(formTextY);
    console.log(formCheckBoxesR);
    console.log("formRadiosX="+formRadiosX+"&formTextY="+formTextY+"&formCheckBoxesR="+formCheckBoxesR);
    $.ajax({
        type: 'POST',
        url: 'main.php',
        data: {
            formRadiosX: formRadiosX,
            formTextY: formTextY,
            formCheckBoxesR: formCheckBoxesR,
        },
        success: function(data){
            $('#answer').html(data);
        }
    })
}

}






