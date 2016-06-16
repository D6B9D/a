var numerico = {
		aSep : '.',
		aDec : ',',
		mDec : 2,
		vMin : 0,
		aSign : 'R$ '
	};

$( document ).on( "pagebeforecreate", "#pagePedidos", function() {
});





$( document ).on( "pagecreate", "#pagePedidos", function() { 
    
	loadPedidos();
	
	$('#p_flag_status').change(function(){
		loadPedidos();
	});
	
});


function loadPedidos(){	
	
	
	var status = $("#p_flag_status").val();
	 
	$('#lista_pedidos').html( "" );
		$.ajax({
	        url: urlhost +"/php/m_pedidos.php",
	        dataType: "jsonp",
	        crossDomain: true,
            data: {
                cmd: 'listapedidos',
                status:status
                
            }
	    })
	    .success ( function ( data ) {
	   
	    	
	    	for (t = 0; t < data.pedidos.length; t++) {
	    		var	html = "";
	    	 	html += "<li><a href='pedido_info.html?id="+data.pedidos[t].id_pedido+"' data-transition='slide'><div>" + data.pedidos[t].status + " - <label style='display:inline-block' id='lbl_val_"+data.pedidos[t].id_pedido+"'> "  +"</label></div>" ;
	    	 	html +=	"<div class=''>" + data.pedidos[t].DATA_PEDIDO + "</div></a></li>";
	    	 	
	    	 	$('#lista_pedidos').append( html );
	    	 	$("#lbl_val_"+data.pedidos[t].id_pedido).autoNumeric('init', numerico);
	    	 	$("#lbl_val_"+data.pedidos[t].id_pedido).autoNumeric('set',  data.pedidos[t].val_total);
	    		
	    	 	 
			}
	    	
	    	 
	    } )
	    .error   ( function ( request, status, error ) { /* alert(status+'\n'+error); */ } )
	    .complete( function ( response ) { } )
	    .then    ( function ( response ) {
	    	 $('#lista_pedidos').listview( "refresh" );
	    	 $('#lista_pedidos').trigger( "updatelayout");
	    } );
		
	

	
}
