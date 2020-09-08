
function loadScripts(){
    xInForm.xListener();
    yInForm.yListener();
}

const xInForm = {

    isSubmit : false,

    xListener : function xListener(){
        let rad = document.formRadiosX;
        let prev = null;
        for (let i = 0; i < rad.length; i++) {
            rad[i].addEventListener('change', function() {
                alert("sdf")
                this.isSubmit = true;
                (prev) ? console.log(prev.value): null;
                if (this !== prev) {
                    prev = this;
                }
            }, false);
        }
    },

    isXSubmit : function checkXSubmit(){
        let rad = document.formRadiosX;
        for (let i = 0; i < rad.length; i++) {
            (rad[i].value)? this.isSubmit = true : null;
            }
    }
}

const yInForm = {

    isSubmit : false,

    makeError : function (thing){
        alert("error")
        let error = document.getElementById("errorAns");
        error.innerHTML = "Введены неверные данные для " + thing ;
    },

    delError : function (){
        let error = document.getElementById("errorAns");
        error.innerHTML = "";
    },

    yListener : function yListener(){
        let rad = document.formTextY;
        rad.addEventListener('input', function() {
            alert("fsdfs")
            if (isNaN(rad.value)) {
                this.isSubmit = true;
                this.delError()
            } else this.makeError("Y");
        })
    },

}




