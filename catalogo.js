$(document).ready(function() {
    $("#alert_cotizacion_error").hide();
    $("#alert_cotizacion_success").hide();
    $('#select_subcategorias').on('change', function() {
        top.location = this.value;
    });

    $("#select_subcategorias").select2();
    var select_subcategorias = $("#select_subcategorias").val();
    if (select_subcategorias == 1) {
        $("#sub_categorias").hide();
    }
    $('#submit-form-se').click(function(e) {
        e.preventDefault();
        var l = Ladda.create(this);
        l.start();
        $("#alert_login_error").hide();
        setTimeout(function() {
            revisarSinExistencia();
        }, 1000);
    });

    /*var currentUrl = window.location.pathname;
    var currentUrl2 = window.location.href;*/
    var currentUrl = window.location.search;
    //console.log("currentUrl: "+currentUrl);
    if (currentUrl == '?busq=(COVID-19)') {
        $(document).ready(function() {
            $.magnificPopup.open({
                items: {
                    src: '#magnific-covid'
                },
                type: 'inline'
            });
        });

        $(document).on('click', '#btn-magnific', function(e) {
            e.preventDefault();
            $.magnificPopup.close();
        });

    }
});

/*var count = 1;
var countEl = document.getElementById("count");

function plus() {
    alert('plus');
    count++;
    countEl.value = count;
}

function minus() {
    alert('minus');
    if (count > 1) {
        count--;
        countEl.value = count;
    }
}*/

var count = 1;

function plus(id) {
    count = $("#" + id).val();
    count++;
    $("#" + id).val(count);
}

function minus(id) {
    count = $("#" + id).val();
    if (count > 1) {
        count--;
        $("#" + id).val(count);
    } else {
        $("#" + id).val(1);
    }
}


$(".image-popup-no-margins").magnificPopup({
    type: "image",
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: "mfp-with-zoom",
    image: {
        verticalFit: true
    },
    zoom: {
        enabled: true,
        duration: 300
    }
});

function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

$("#price-slider").slider();
$("#price-slider").on("slide", function(slideEvt) {
    var p1 = slideEvt.value[0];
    var p2 = slideEvt.value[1];

    precio1 = p1.toFixed(2).replace(/./g, function(c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? "," + c : c;
    })
    precio2 = p2.toFixed(2).replace(/./g, function(c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? "," + c : c;
    })
    $("#prince-range").html("<b>$" + precio1 + " - $" + precio2 + "</b>");
    setTimeout(function() {
        var tam = '';
        var col = '';
        var min = '';
        var max = '';
        if (getURLParameter('tam') !== '') {
            tam = 'tam=' + getURLParameter('tam');
        }

        if (getURLParameter('col') !== '') {
            col = 'col=' + getURLParameter('col');
        }
        if (getURLParameter('min') !== '') {
            min = 'min=' + getURLParameter('min');
        }
        if (getURLParameter('max') !== '') {
            max = 'max=' + getURLParameter('max');
        }
        var url = window.location.pathname;
        filtrosUrlPrecio(url, tam, col, min, max);

    }, 2000);

});
$("#price-slider").on("touchstart", function(slideEvt) {
    var p1 = slideEvt.value[0];
    var p2 = slideEvt.value[1];
    precio1 = p1.toFixed(2).replace(/./g, function(c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? "," + c : c;
    })
    precio2 = p2.toFixed(2).replace(/./g, function(c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? "," + c : c;
    })

    $("#prince-range").html("<b>$" + precio1 + " - $" + precio2 + "</b>");
    setTimeout(function() {
        var tam = '';
        var col = '';
        var min = '';
        var max = '';
        if (getURLParameter('tam') !== '') {
            tam = 'tam=' + getURLParameter('tam');
        }

        if (getURLParameter('col') !== '') {
            col = 'col=' + getURLParameter('col');
        }
        if (getURLParameter('min') !== '') {
            min = 'min=' + getURLParameter('min');
        }
        if (getURLParameter('max') !== '') {
            max = 'max=' + getURLParameter('max');
        }
        var url = window.location.pathname;
        filtrosUrlPrecio(url, tam, col, min, max);
    }, 2000);

    var municipio_storage = localStorage.getItem("municipio") || '0';
    if (municipio_storage == '0') {
        $("#ModalBoletin").modal();
        $("#myModalExistenciaTien").modal({ backdrop: 'static' });
    }
    $('#select_estado').change(function() {
        $("#tiendas").html('');
        $("#select_estado option:selected").each(function() {
            select_estado = $(this).val() || 0;
        })
        url = $('#myModalExistenciaTien').attr('url_municipio');
        $.post(url, {
            "estado_id": select_estado,
        }, function(response) {
            if (response.success) {
                $("#select_municipio").html(response.select_ciudades);
                // $("#select_municipio").select2();
            } else {
                $.alert({
                    title: 'Error',
                    content: "<i class='fa fa-times-circle' aria-hidden='true'></i> Se perdio la conexión con el servidor, por favor inténtalo más tarde.",
                    confirmButtonClass: "btn-success"
                });
            }
        }, 'json');
    });
    $('#select_municipio').change(function() {
        $("#select_municipio option:selected").each(function() {
            select_municipio = $(this).val() || 0;
        })
        var articulo_id = $("#artid").val() || 0;
        url = $('#myModalExistenciaTien').attr('url_existencia');
        $.post(url, {
            "articulo_id": articulo_id,
            "ciudad": select_municipio
        }, function(response) {
            if (response.success) {
                $("#tiendas").html('');
                $("#tiendas").html(response.list_existenciah);
            } else {
                $.alert({
                    title: 'Error',
                    content: "<i class='fa fa-times-circle' aria-hidden='true'></i> Se perdio la conexión con el servidor, por favor inténtalo más tarde.",
                    confirmButtonClass: "btn-success"
                });
            }
        }, 'json');
    });
});

function revisarSinExistencia() {
    var articulo_id = $('#articulo_id').val();
    var nombre_cliente = $('#nombre_cliente_cotizador').val();
    var correo_cliente = $('#correo_cliente_cotizador').val();
    var telefono_cliente = $('#telefono_cliente_cotizador').val();
    var cantidad = $('#cantidad_cotizador').val();
    var recaptcha_response = $("#g-recaptcha-response").val();
    url = $('#myModalSinExistencia').attr('url');
    if (nombre_cliente == "") {
        $("#nombre_cliente_cotizador").css("border-color", "#f35958");
        $("#nombre_cliente_cotizador").css("background", "#faebe7");
        $("#nombre_cliente_cotizador").focus();
        $.alert({
            title: 'Alerta',
            content: "<i class='fa fa-exclamation-circle' aria-hidden='true'></i> Debes ingresar tu nombre.",
            confirmButtonClass: "btn-success"
        });
        $('#submit-form-se').attr("disabled", false);
        $('#submit-form-se').removeAttr("data-loading");
        return false;
    } else {
        $("#nombre_cliente_cotizador").css("border-color", "#e5e9ec");
        $("#nombre_cliente_cotizador").css("background", "#fff");
    }

    if (correo_cliente == "") {
        $("#correo_cliente_cotizador").css("border-color", "#f35958");
        $("#correo_cliente_cotizador").css("background", "#faebe7");
        $("#correo_cliente_cotizador").focus();
        $.alert({
            title: 'Alerta',
            content: "<i class='fa fa-exclamation-circle' aria-hidden='true'></i> Debes ingresar tu correo.",
            confirmButtonClass: "btn-success"
        });
        $('#submit-form-se').attr("disabled", false);
        $('#submit-form-se').removeAttr("data-loading");
        return false;
    } else {
        $("#correo_cliente_cotizador").css("border-color", "#e5e9ec");
        $("#correo_cliente_cotizador").css("background", "#fff");
    }
    if (telefono_cliente == "") {
        $("#telefono_cliente_cotizador").css("border-color", "#f35958");
        $("#telefono_cliente_cotizador").css("background", "#faebe7");
        $("#telefono_cliente_cotizador").focus();
        $.alert({
            title: 'Alerta',
            content: "<i class='fa fa-exclamation-circle' aria-hidden='true'></i> Debes ingresar tu correo.",
            confirmButtonClass: "btn-success"
        });
        $('#submit-form-se').attr("disabled", false);
        $('#submit-form-se').removeAttr("data-loading");
        return false;
    } else {
        $("#telefono_cliente_cotizador").css("border-color", "#e5e9ec");
        $("#telefono_cliente_cotizador").css("background", "#fff");
    }
    if (cantidad == "") {
        $("#cantidad_cotizador").css("border-color", "#f35958");
        $("#cantidad_cotizador").css("background", "#faebe7");
        $("#cantidad_cotizador").focus();
        $.alert({
            title: 'Alerta',
            content: "<i class='fa fa-exclamation-circle' aria-hidden='true'></i> Debes ingresar tu correo.",
            confirmButtonClass: "btn-success"
        });
        $('#submit-form-se').attr("disabled", false);
        $('#submit-form-se').removeAttr("data-loading");
        return false;
    } else {
        $("#cantidad_cotizador").css("border-color", "#e5e9ec");
        $("#cantidad_cotizador").css("background", "#fff");
    }
    $.post(url, {
        "articulo_id": articulo_id,
        "nombre_cliente": nombre_cliente,
        "correo_cliente": correo_cliente,
        "telefono_cliente": telefono_cliente,
        "cantidad": cantidad,
        "recaptcha_response": recaptcha_response
    }, function(response) {
        if (response.success) {
            $("#alert_cotizacion_success").show();
            setTimeout(function() {
                $('#articulo_id').val('');
                $('#nombre_cliente_cotizador').val('');
                $('#correo_cliente_cotizador').val('');
                $('#telefono_cliente_cotizador').val('');
                $('#cantidad_cotizador').val('');
                $("#myModalSinExistencia").modal('hide');
                $('#submit-form-se').attr("disabled", false);
                $('#submit-form-se').removeAttr("data-loading");
                $("#alert_cotizacion_success").hide();
            }, 2000);
        } else {

        }
    }, 'json');
}

function guardaTienda() {

    $("#select_estado option:selected").each(function() {
        select_estado = $(this).val() || 0;
    })
    $("#select_municipio option:selected").each(function() {
        select_municipio = $(this).val() || 0;
    })
    if (select_estado != 0) {
        if (select_municipio != 0) {
            localStorage.setItem("municipio", select_municipio);
            localStorage.setItem("estado", select_estado);
            $("#myModalExistenciaTien").modal('hide');
        } else {
            $.alert({
                title: 'Alerta',
                content: "<i class='fa fa-exclamation-circle' aria-hidden='true'></i> Debes ingresar tu municipio-ciudad.",
                confirmButtonClass: "btn-success"
            });
        }
    } else {
        $.alert({
            title: 'Alerta',
            content: "<i class='fa fa-exclamation-circle' aria-hidden='true'></i> Debes ingresar tu estado.",
            confirmButtonClass: "btn-success"
        });
    }
}