$(document).on("pagebeforecreate", "#pageRecsenha", function() {

});

$(document).on("pagecreate", "#pageRecsenha", function() {

	$("#r_recuperar").click(function() {
		recSenha();
	});

});

function recSenha() {

	var desc_email = $("#r_desc_email").val();

	$.ajax({
		type : "POST",
		url : urlhost + "/php/m_rec_senha.php",
		dataType : "jsonp",
		crossDomain : true,
		data : {
			cmd : 'recsenha',
			desc_email : desc_email

		},
		success : function(data) {
			
			if (data.msg == 'ok') {
				alert("Email enviado!");
				//mandar para tela de login
			} else {
				alert(data.erro);
			}
			// do something

		},
		error : function(msg) {
			alert("Erro: " + msg.msg);
		}
	});

}