$( document ).on( "pagebeforecreate", "#pageIndex", function() {
	$("#left_menu_index").load("left_menu.html");
});

$( document ).on( "pagecreate", "#pageIndex", function() { 
    
	// AUTOCOMPLETE
	
	var ac_options = [];
	
	$.ajax({
        url: "http://10.0.0.100/b/autocomplete_produtos.php",
        dataType: "jsonp",
        crossDomain: true
    })
    .success ( function ( response ) {
    	$.each( response, function ( id, val ) {
        	ac_options.push(val);
        });
    } )
    .error   ( function ( response ) { } )
    .complete( function ( response ) { } )
    .then    ( function ( response ) { } );
	
	var options = {
		data: ac_options,
		list: { match: { enabled: true } },
		adjustWidth: false
	};

	$("#input_pesquisa").easyAutocomplete(options);
		
	// FIM AUTOCOMPLETE
	
	
	
	// PESQUISA PRODUTO
	
	$('#input_pesquisa').on("keypress", function(e) {
        if (e.keyCode == 13) {
        	//alert('enter');
        	$('#pesquisar').click();
        	//$("#input_pesquisa").easyAutocomplete.hideContainer();
        }
	});
	
	$('#pesquisar').click(function(){
		var query = $('#input_pesquisa').val(),
			$ul = $('#lista_produtos'),
			html = "";
		
		$ul.html( "<li>carregando...</li>" );
		
		if(query && query.length>0) {
			
			$.ajax({
		        url: "http://10.0.0.100/b/pesquisa_produtos.php",
		        dataType: "jsonp",
		        crossDomain: true,
                data: {
                    q: query
                }
		    })
		    .success ( function ( response ) {
		    	$.each( response, function ( i, produto ) {
		    		//alert(val);
		    		html += "<li><a href='produto.html?id=" + produto.id + "' data-transition='slide'><div class='lista_produtos_img'></div><div class='lista_produtos_nome'>" + produto.desc_abreviado + "</div><div class='lista_produtos_valor'>" + produto.val_prod + "</div></a></li>";
		        });
		    	$ul.html( html );
		    } )
		    .error   ( function ( response ) { } )
		    .complete( function ( response ) { } )
		    .then    ( function ( response ) {
		    	$ul.listview( "refresh" );
                $ul.trigger( "updatelayout");
		    } );
			
		} else {
			alert('Entre com um termo para pesquisar...');
		}
	});
	
	// FIM PESQUISA PRODUTO

	
	
	
	
	
	var geoOnSuccess = function(position) {
		
		var geolocacao =  
			  'Latitude: '          + position.coords.latitude          + '<br>' +
              'Longitude: '         + position.coords.longitude         + '<br>' +
              'Altitude: '          + position.coords.altitude          + '<br>' +
              'Accuracy: '          + position.coords.accuracy          + '<br>' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br>' +
              'Heading: '           + position.coords.heading           + '<br>' +
              'Speed: '             + position.coords.speed             + '<br>' +
              'Timestamp: '         + position.timestamp                + '<br>'
		;
		
		var reverse_geo_url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+','+position.coords.longitude;
		
		$.ajax({
	        url: reverse_geo_url,
	        dataType: "json",
	        crossDomain: true
	    })
	    .success ( function ( response ) {
	    	//alert(response.results[0]['formatted_address']);
	    	//console.log(response)
	    	geolocacao += '<br>' + response.results[0]['formatted_address'];
	    } )
	    .error   ( function ( response ) { alert('error'); } )
	    .complete( function ( response ) { $('#geolocacao').html(geolocacao); } )
	    .then    ( function ( response ) { });
		
		
    };

    function geoOnError(error) {
    	$('#geolocacao').html( 'code: '    + error.code    + '<br>' +
              'message: ' + error.message + '<br>'
    	);
    }
	
	$('#geolocalizador').click(function(){

		navigator.geolocation.getCurrentPosition(geoOnSuccess, geoOnError);
    
	});
});


$( document ).on( "pagebeforecreate", "#pageTeste1", function() {
	$("#left_menu_teste1").load("left_menu.html");
});

$( document ).on( "pagebeforecreate", "#pageTeste2", function() {
	$("#left_menu_teste2").load("left_menu.html");
});

$( document ).on( "pagebeforecreate", "#pageTeste3", function() {
	$("#left_menu_teste3").load("left_menu.html");
});