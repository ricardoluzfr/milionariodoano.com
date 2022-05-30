// Label no topo do campo
$('.labeled_input_group input').on("change keyup keydown",function(e){
  var elem = $(this);
  if(elem.val()){
    elem.closest('.labeled_input_group').addClass('hasValue');
  }else{
    elem.closest('.labeled_input_group').removeClass('hasValue');
  }
});

//ignora numeros no campo nome
$(".iName").keyup(function(){
  this.value = this.value.replace( /[0-9]*/g, '');
});
