/* Detectando o comando Ctrl/Command para exibir modal */
jQuery(document).ready(function() {

    var tempo = 0
    setTimeout(function() {
        tempo = 1
    }, 5000);


    /* verificando navegador */
    if (navigator.userAgent.indexOf('Chrome') != -1) {
        leavePage();
    } else if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
        leavePage();
    } else if (navigator.userAgent.indexOf('Firefox') != -1) {
        leavePage();
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
        leavePage();
    }

    // VAR PRA EXIBIR O EXIT POP-UP APENAS UMA VEZ
    var exibePopup = false;

    /* FUNCAO VERIFICANDO INTENCAO DE SAIR DA PAGE */
    function leavePage() {
        document.addEventListener("mouseout", function(e) {
            if (e.clientY < 0) {
                if (exibePopup == false) {
                    if (tempo) {
                        modalDisplay();
                        exibePopup = true;
                    }
                    // modalDisplay();

                }
            }
        }, false);
    }

    function modalDisplay() {
        $(".modal").attr('style', 'visibility: visible; height: 100%;');
        console.log('ok?');
    }
});

//-------------------/>


//MODAL
document.addEventListener("DOMContentLoaded", init);

function init() {

    // elements
    var openModal = document.querySelectorAll('.showModal');
    var closeModal = document.querySelector('.hiddenModal');
    var closeModalOverlay = document.querySelector('.modalOverlay');

    // listeners
    openModal.forEach(function(btn) {
        btn.addEventListener('click', showModal);
    });
    closeModal.addEventListener('click', hiddenModal);
    closeModalOverlay.addEventListener('click', hiddenModal);

    document.addEventListener('keyup', escCallback);
}

// callbacks methods
function showModal(e) {
    // console.log(e);
    document.querySelector('.modal').style.visibility = "visible";
    document.querySelector('.modal').style.height = 100 + "%";
}

function hiddenModal(e) {
    document.querySelector('.modal').style.visibility = "hidden";
    document.querySelector('.modal').style.height = 0;
}

function escCallback(e) {
    if (e.keyCode === 27) {
        hiddenModal();
    };
}

// confirma .btn-submit com enter the enter key code
// $('.input-email').keypress(function (e) {
//  var key = e.which;
//  if(key == 13)
//   {
//     $('.btn-submit').click();
//     return false;
//   }
// });

//da foco no campo e-mail assim que abrir a modal
$('.showModal').click(function() {
    setTimeout(function() {
        $('.input-email').focus();
    }, 0);
});