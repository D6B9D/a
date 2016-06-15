$( document ).on( "pagebeforecreate", "#pageProduto", function() {
	$("#left_menu_prod").load("left_menu.html");
});

$(document).on('pagebeforeshow', "#pageProduto",function () {
	
	//$("#left_menu_prod").load("left_menu.html");
	
	var parameters = $(this).data("url").split("?")[1];
    parameter = parameters.replace("id=","");  
    var id_prod = parameter;
	
	if(id_prod && id_prod>0) {
    	
    	$.ajax({
            url: urlhost + "/php/m_produto.php",
            dataType: "jsonp",
            crossDomain: true,
            data: {
                id : id_prod
            }
        })
        .success ( function ( response ) { /* alert('sucksass'); */ })
        .error   ( function ( response ) { /* alert(response); console.log(response); */ })
        .complete( function ( response ) { $('#loading_produto').hide(); })
        .then    ( function ( response ) {
        	
        	//alert('http://10.0.0.100/b/images/produtos/'+response.image);
        	
        	$('#image').css('background-image', 'url('+urlhost+'/images/produtos/'+response.image+')');
        	$('#image').css('display','block');
        	//alert($('#image').css('background-image'));
        	
        	$('#desc_abreviado').html(response.desc_abreviado);
        	$('#desc_produto').html(response.desc_produto);
        	$('#val_prod').html(response.val_prod);
        	$('#nome_distribuidora').html(response.nome_distribuidora);
        	$('#id_distribuidora').html(response.id_distribuidora);
        	$('#erro').html(response.erro);
        	
        });
    } else {
    	$('#erro').html('erro '+id_prod);
    }
	
});