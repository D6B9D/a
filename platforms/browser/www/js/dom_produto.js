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
            url: "http://10.0.0.100/b/produto.php",
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
        	$.each( response, function ( id, val ) {
                $('#'+id).html(val);
            });
        	
        });
    } else {
    	$('#erro').html('erro '+id_prod);
    }
	
});