$( document ).on( "pagebeforecreate", "#pageLogin", function() {


});



$( document ).on( "pagecreate", "#pageLogin", function() {
	
	
	$("#btn_login").click(function() {
		funclogin();
	});
	
});


function funclogin(){
	
var usr = 	$("#desc_user").val();
var pass = 	$("#desc_senha").val();


$.ajax({
	type : "POST",
	url : "php/?.php",//criar pag
	dataType : "json",
	async : true,
	data : {
		cmd : 'logar',
		usr:usr,
		pass:pass
	},
	success : function(data) {

	//do something

	},
	error : function(msg) {
		$.unblockUI();
		alert("Erro: " + msg.msg);
	}
});
	
	
}