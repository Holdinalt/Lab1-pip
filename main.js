
function loadScripts(){
    //xInForm.xListener();
    yInForm.yListener();
    rInForm.rListener();
    buttonForm.buttonChecker();

    //httpRequest = new XMLHttpRequest();
    //httpRequest.
}

// const xInForm = {
//
//     isSubmit : false,
//
//     // xListener : function xListener(){
//     //     let rad = document.formRadiosX;
//     //     let prev = null;
//     //     for (let i = 0; i < rad.length; i++) {
//     //         rad[i].addEventListener('change', function() {
//     //             alert("sdf")
//     //             this.isSubmit = true;
//     //             (prev) ? console.log(prev.value): null;
//     //             if (this !== prev) {
//     //                 prev = this;
//     //             }
//     //         }, false);
//     //     }
//     // },
//
//     isXSubmit : function checkXSubmit(){
//         let rad = document.formRadiosX;
//         for (let i = 0; i < rad.length; i++) {
//             (rad[i].value)? this.isSubmit = true : null;
//             }
//     }
// }

const yInForm = {

    isSubmit : false,

    checkStr : function (str){
        let path = /^((-[1-4](\.|,)[0-9])|([0-2](\.|,)[0-9])|-5(\.|,)0|3(\.|,)0|-[1-5]|[0-3])$/

        if(path.test(str)){
            for (const char of str){
                if ((char === ",") || (char === ".")){
                    finalstr += ".";
                }
                this.delError();
                return finalstr
            }
        }else{
            this.makeError(" Y");
            return false
        }
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

    checkSub : function (isSubmit){
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
            this.checkSub(yInForm.isSubmit);

        })
    }

}




