$(document).on("pagebeforecreate", "#pageCadastro", function() {

});


$(document).on('pagebeforeshow', "#pageCadastro", function() {

	loadBairros();
	
	$("#c_cadastrar").click(function() {
		cadastrar();
	});
	
	$("#c_update").click(function() {
		updateCadastro();
	});

	setTimeout(function(){ carregaDadosUser();} , 1000);
	//se ficar tudo na mesma tela, tem q desabilitar o campo de nome de usuario no cadastro e mostar numero cartao. E MUDAR OUTRAS COISAS
	
});


function carregaDadosUser(){
	

	
	$.ajax({
		type : "POST",
		url : urlhost + "/php/m_cadastro_user.php",
		dataType : "jsonp",
		crossDomain : true,
		async: false,
		data : {
			cmd : 'carregaUser'
		
			
		},
		success : function(data) {
			$("#c_desc_usuario").val(data[0].DESC_USER);
			$("#c_desc_senha").val(data[0].DESC_SENHA);
			$("#c_desc_email").val(data[0].DESC_EMAIL);
			$("#c_desc_nome").val(data[0].DESC_NOME);
			$("#c_desc_telefone").val(data[0].DESC_TELEFONE);
			$("#c_cod_cidade").val(data[0].COD_CIDADE);
			$("#c_cod_bairro").val(data[0].COD_BAIRRO);
			$("#c_desc_endereco").val(data[0].DESC_ENDERECO);
			
			$('#c_cod_bairro').selectmenu('refresh', true);
			
		},
		error : function(msg) {
			$.unblockUI();
			alert("Erro: " + msg.msg);
		}
	});
	
	
}

function loadBairros(){
	
	
	var cod_cidade =  $("#c_cod_cidade").val();
	
	$.ajax({
		type : "POST",
		url : urlhost + "/php/m_cadastro_user.php",
		dataType : "jsonp",
		crossDomain : true,
		async: false,
		data : {
			cmd : 'loadBairro',
			cod_cidade:cod_cidade

		},
		success : function(data) {

			var html = "<option value=''  > Escolha um bairro  </option>  ";
			for (t = 0; t < data.length; t++) {

				html = html + "<option value='" + data[t].cod_bairro + "'  > " + data[t].desc_bairro + "  </option>  ";

			}

			$("#c_cod_bairro").html(html);

			
		
		},
		error : function(msg) {
			alert("Erro: " + msg.msg);
		}
	});
	
	
	
	
}



function cadastrar() {

	
	var c_desc_senha = $("#c_desc_senha").val();
	var c_desc_senha_conf = $("#c_desc_senha_conf").val();
	var c_desc_email = $("#c_desc_email").val();
	var c_desc_nome = $("#c_desc_nome").val();
	var c_desc_telefone = $("#c_desc_telefone").val();
	var c_cod_cidade = $("#c_cod_cidade").val();
	var c_cod_bairro = $("#c_cod_bairro").val();
	var c_desc_endereco = $("#c_desc_endereco").val();
	
	
	$.ajax({
		type : "POST",
		url : urlhost + "/php/m_cadastro_user.php",
		dataType : "jsonp",
		crossDomain : true,
		data : {
			cmd : 'inserirUser',
			c_desc_senha:c_desc_senha,
			c_desc_senha_conf:c_desc_senha_conf,
			c_desc_email:c_desc_email,
			c_desc_nome:c_desc_nome,
			c_desc_telefone:c_desc_telefone,
			c_cod_cidade:c_cod_cidade,
			c_cod_bairro:c_cod_bairro,
			c_desc_endereco:c_desc_endereco
			
		},
		success : function(data) {


			if (data.msg == 'ok') {

				alert("Usuário cadastrado!");
				
			} else {

				alert(data.erro);

			}

		},
		error : function(msg) {
			alert("Erro: " + msg.msg);
		}
	});
	

	

	
}

function updateCadastro() {

	
	var c_desc_senha = $("#c_desc_senha").val();
	var c_desc_email = $("#c_desc_email").val();
	var c_desc_nome = $("#c_desc_nome").val();
	var c_desc_telefone = $("#c_desc_telefone").val();
	var c_cod_cidade = $("#c_cod_cidade").val();
	var c_cod_bairro = $("#c_cod_bairro").val();
	var c_desc_endereco = $("#c_desc_endereco").val();
	var c_desccartao = $("#c_desccartao").val();
	var c_desc_senha_conf = $("#c_desc_senha_conf").val();
	
	$.ajax({
		type : "POST",
		url : urlhost + "/php/m_cadastro_user.php",
		dataType : "jsonp",
		crossDomain : true,
		data : {
			cmd : 'updateUser',
			c_desc_senha:c_desc_senha,
			c_desc_senha_conf:c_desc_senha_conf,
			c_desc_email:c_desc_email,
			c_desc_nome:c_desc_nome,
			c_desc_telefone:c_desc_telefone,
			c_cod_cidade:c_cod_cidade,
			c_cod_bairro:c_cod_bairro,
			c_desc_endereco:c_desc_endereco,
			c_desccartao:c_desccartao
			
		},
		success : function(data) {


			if (data.msg == 'ok') {

				alert("Dados atualizados!");
				
			} else {

				alert(data.erro);

			}

		},
		error : function(msg) {
			alert("Erro: " + msg.msg);
		}
	});
	

	

	
}
