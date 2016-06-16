var numerico = {
	aSep : '.',
	aDec : ',',
	mDec : 2,
	vMin : 0,
	aSign : 'R$ '
};

$(document).on("pagebeforecreate", "#pageinfoPedidos", function() {
});

$(document).on("pagecreate", "#pageinfoPedidos", function() {

	var parameters = $(this).data("url").split("?")[1];
	parameter = parameters.replace("id=", "");
	var id_ped = parameter;

	loadPedido(id_ped);

	$("#pi_valprods").autoNumeric('init', numerico);
	$("#pi_valentrega").autoNumeric('init', numerico);
	$("#pi_valtotal").autoNumeric('init', numerico);

});

function loadPedido(id_ped) {

	$('#lista_produtos').html("");
	$
			.ajax({
				url : urlhost + "/php/m_pedidos.php",
				dataType : "jsonp",
				crossDomain : true,
				data : {
					cmd : 'loadpedido',
					id_ped : id_ped

				}
			})
			.success(
					function(data) {

						$("#pi_numped").html(data.num_ped);
						$("#pi_sit").html(data.flag_status);
						$("#pi_dataped").html(data.data_pedido);
						$("#pi_endereco").html(data.desc_bairro);
						$("#id_descdist").html(data.DESC_NOME_ABREV);
						$("#pi_valprods")
								.autoNumeric('set', data.VAL_TOTALPROD);
						$("#pi_valentrega")
								.autoNumeric('set', data.VAL_ENTREGA);
						$("#pi_valtotal").autoNumeric(
								'set',
								parseFloat(data.VAL_ENTREGA)
										+ parseFloat(data.VAL_TOTALPROD));
						$('#lista_produtos').html("");
						for (x = 0; x < data.prods.length; x++) {
							var html = "";
							html += "<li><a href='produto.html?id="
									+ data.prods[x].id_prod
									+ "' data-transition='slide'><div class='lista_produtos_img' style='background-image:url("
									+ urlhost + "/images/produtos/"
									+ data.prods[x].image + ");'>";
							html += "</div><div class='lista_produtos_nome'>"
									+ data.prods[x].desc_abreviado + "</div>";
							html += "<div class='lista_produtos_valor'> ";
						/*	html += "Valor unitario <label id='lbl_valprod_"
									+ data.prods[x].id_pedido_item
									+ "'> </label> ";
							html += " Valor total: <label id='lbl_valtotal_"
									+ data.prods[x].id_pedido_item
									+ "'> </label> ";
							html += " Quantidade: " + data.prods[x].QTD_PROD
									+ "</div>  ";*/
							html += "</a></li>";

							$('#lista_produtos').append(html);

						/*	$("#lbl_valprod_" + data.prods[x].id_pedido_item)
									.autoNumeric('init', numerico);
							$("#lbl_valtotal_" + data.prods[x].id_pedido_item)
									.autoNumeric('init', numerico);

							$("#lbl_valprod_" + data.pedidos[x].id_pedido_item)
									.autoNumeric('set', data.prods[x].VAL_UNIT);
							$("#lbl_valtotal_" + data.pedidos[x].id_pedido_item)
									.autoNumeric('set', data.prods[x].VAL_TOTAL);*/

						}

					}).error(function(request, status, error) { /* alert(status+'\n'+error); */
			}).complete(function(response) {
			}).then(function(response) {
				$('#lista_produtos').listview("refresh");
				$('#lista_produtos').trigger("updatelayout");
			});

}
