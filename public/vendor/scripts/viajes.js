$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

function mostrarform() {
    $.ajax({
        url: "listar_crear_viaje",
        type: "POST",
        success: function (res) {
            Swal.fire({
                title: '<strong>Crear Viaje</strong>',
                html:
                    '<form action="" name="formularioCrearViaje" id="formularioCrearViaje" method="POST">' +
                    '<br><label class="d-flex justify-content-between" for="">Codigo(*): <button class="btn btn-info btn-sm" onclick="limpiarFormulario()" type="button">Limpiar</button></label><input type="text" id="viaje_codigo" disabled="true" class="form-control">' +
                    '<br><label class="d-flex justify-content-start" for="">Chofer (*):</label>' +
                    '<select class="form-control" required name="viaje_chofer" id="viaje_chofer">' +
                    res.choferes +
                    '</select>' +
                    '<br><label class="d-flex justify-content-start" for="">Chuto (*):</label>' +
                    '<select class="form-control" required name="viaje_chuto" id="viaje_chuto">' +
                    res.chutos +
                    '</select>' +
                    '<br><label class="d-flex justify-content-start" for="">Cava (*):</label>' +
                    '<select class="form-control" required name="viaje_cava" id="viaje_cava">' +
                    res.cavas +
                    '</select>' +

                    '<br><label class="d-flex justify-content-start" for=""><span>¿Este Viaje tiene Flete de <span class="text-primary"> IDA</span></span>?</label>' +
                    '<select class="form-control" id="comprobar_flete_ida" name="comprobar_flete_ida" required>' +
                    '<option class="text-white" value="">Seleccione</option>' +
                    '<option class="text-success" value="si">Si</option>' +
                    '<option class="text-danger" value="no">No</option>' +
                    '</select>' +

                    '<div class="d-none" id="divFleteIda"><br><label class="d-flex justify-content-start" for=""><span class="text-primary">Flete IDA: (*):</span></label>' +
                    '<select class="form-control" name="viaje_flete_ida" id="viaje_flete_ida">' +
                    '</select></div>' +

                    '<br><label class="d-flex justify-content-start" for=""><span>¿Este Viaje tiene Flete de <span class="text-success"> RETORNO</span>?</span></label>' +
                    '<select class="form-control" id="comprobar_flete_retorno" name="comprobar_flete_retorno" required>' +
                    '<option class="text-white" value="">Seleccione</option>' +
                    '<option class="text-success" value="si">Si</option>' +
                    '<option class="text-danger" value="no">No</option>' +
                    '</select>' +

                    '<div class="d-none" id="divFleteRetorno"><br><label class="d-flex justify-content-start" for=""><span class="text-success">Flete Retorno: (*):</span></label>' +
                    '<select class="form-control" name="viaje_flete_retorno" id="viaje_flete_retorno">' +
                    '</select></div>' +

                    '<br><label class="d-flex justify-content-start" for="">Descripcion de la Carga:</label><input type="text" name="viaje_descripcion" autocomplete="off" placeholder="Descripción Carga" id="viaje_descripcion" class="form-control" required>' +
                    '<br><label class="d-flex justify-content-start" for="">Dia de Salida:</label><input type="date" class="form-control" name="viaje_dia_salida" id="viaje_dia_salida"  autocomplete="off">' +
                    '<br><label class="d-flex justify-content-start" for="">Dia de Retorno:</label><input type="date" class="form-control" name="viaje_dia_retorno" id="viaje_dia_retorno"  autocomplete="off">' +
                    '<br><label class="d-flex justify-content-start" for="">Observacion del Viaje:</label><input type="text" name="viaje_observacion" autocomplete="off" placeholder="Observación Viaje" id="viaje_observacion" class="form-control" required>' +
                    '<div class="d-flex justify-content-around"><button class="btn btn-success mt-3" type="submit" id="boton_submit">' +
                    'Guardar' +
                    '</button>' +
                    '<button class="btn btn-info mt-3 ml-2" onclick="limpiarFormulario()" type="button">' +
                    'Limpiar' +
                    '</button></div>' +
                    '</form>',
                showCloseButton: true,
                showConfirmButton: false,
                showCancelButton: false,
                focusConfirm: false,
            })
            generar_cod()
        },
        error: function (err) {
            toastr.error(err.responseJSON.message);
        }
    });

}
function generar_cod() {
    $.post("generar_cod_viaje", function (res) {
        $('#viaje_codigo').val(res.codViaje)
    });
}
function mostrarViaje(id) {
    $.ajax({
        url: "mostrar_viaje",
        type: "POST",
        data: 'viaje_id=' + id,
        success: function (res) {
            Swal.fire({
                title: '<strong>Actualizar Viaje</strong>',
                html:
                    '<form action="" name="formularioUpdateViaje" id="formularioUpdateViaje" method="POST">' +
                    '<input type="hidden" name="id_viaje" id="id_viaje" value="' + res.id + '">' +
                    '<br><label class="d-flex justify-content-between" for="">Codigo(*): </label><input type="text"  id="viaje_codigo" class="form-control" disabled="true" value="' + res.codigo + '">' +
                    '<br><label class="d-flex justify-content-start" for="">Chofer (*):</label>' +
                    '<select class="form-control" required name="viaje_chofer" id="viaje_chofer">' +
                    res.choferes +
                    '</select>' +
                    '<br><label class="d-flex justify-content-start" for="">Chuto (*):</label>' +
                    '<select class="form-control" required name="viaje_chuto" id="viaje_chuto">' +
                    res.chutos +
                    '</select>' +
                    '<br><label class="d-flex justify-content-start" for="">Cava (*):</label>' +
                    '<select class="form-control" required name="viaje_cava" id="viaje_cava">' +
                    res.cavas +
                    '</select>' +

                    '<br><label class="d-flex justify-content-start" for=""><span>¿Este Viaje tiene Flete de <span class="text-primary"> IDA</span></span>?</label>' +
                    '<select class="form-control" id="comprobar_flete_ida" name="comprobar_flete_ida" required>' + res.pregunta_ida + '</select>' +

                    '<div class="d-none" id="divFleteIda"><br><label class="d-flex justify-content-start" for=""><span class="text-primary">Flete IDA: (*):</span></label>' +
                    '<select class="form-control" name="viaje_flete_ida" id="viaje_flete_ida">' +
                    res.flete_ida +
                    '</select></div>' +

                    '<br><label class="d-flex justify-content-start" for=""><span>¿Este Viaje tiene Flete de <span class="text-success"> RETORNO</span>?</span></label>' +
                    '<select class="form-control" id="comprobar_flete_retorno" name="comprobar_flete_retorno" required>' + res.pregunta_retorno + '</select>' +

                    '<div class="d-none" id="divFleteRetorno"><br><label class="d-flex justify-content-start" for=""><span class="text-success">Flete Retorno: (*):</span></label>' +
                    '<select class="form-control" name="viaje_flete_retorno" id="viaje_flete_retorno">' + res.flete_retorno +
                    '</select></div>' +

                    '<br><label class="d-flex justify-content-start" for="">Descripcion de la Carga:</label><input type="text" name="viaje_descripcion" autocomplete="off" placeholder="Descripción Carga" id="viaje_descripcion" class="form-control" required value="' + res.descripcion_carga + '">' +
                    '<br><label class="d-flex justify-content-start" for="">Dia de Salida:</label><input type="date" class="form-control" name="viaje_dia_salida" id="viaje_dia_salida"  autocomplete="off" value="' + res.dia_salida + '">' +
                    '<br><label class="d-flex justify-content-start" for="">Dia de Retorno:</label><input type="date" class="form-control" name="viaje_dia_retorno" id="viaje_dia_retorno"  autocomplete="off" value="' + res.dia_retorno + '">' +
                    '<br><label class="d-flex justify-content-start" for="">Observacion del Viaje:</label><input type="text" name="viaje_observacion" autocomplete="off" placeholder="Observación Viaje" id="viaje_observacion" class="form-control" required value="' + res.observacion + '">' +
                    '<div class="d-flex justify-content-around"><button class="btn btn-success mt-3" type="submit" id="boton_submit">' +
                    'Guardar' +
                    '</button></div>' +
                    '</form>',
                showCloseButton: true,
                showConfirmButton: false,
                showCancelButton: false,
                focusConfirm: false,
            })
            if (res.flete_ida != null) {
                document.getElementById('divFleteIda').classList.remove('d-none')
                document.getElementById('viaje_flete_ida').setAttribute("requerid", "")
            }
            if (res.flete_retorno != null) {
                document.getElementById('divFleteRetorno').classList.remove('d-none')
                document.getElementById('viaje_flete_retorno').setAttribute("requerid", "")
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function listarFletesIda() {
    // Verifico de que no se haya seleccionado un flete retorno para asi mostrar un flete distinto para cada tipo flete
    let flete_retorno_actual = document.getElementById('viaje_flete_retorno').value
    if (document.getElementById('id_viaje') != undefined) {
        // Vista Update Viaje
        let id_viaje_actual = document.getElementById('id_viaje').value
        if (flete_retorno_actual == '') {
            $.ajax({
                url: "listar_fletes_ida",
                type: "POST",
                data: 'id_viaje_actual=' + id_viaje_actual,
                success: function (res) {
                    let select = document.getElementById('viaje_flete_ida')
                    select.innerHTML = res.fletes_ida
                    select.setAttribute("requerid", "")
                    document.getElementById('divFleteIda').classList.remove('d-none')
                },
                error: function (err) {
                    toastr.error(err.responseJSON.message);
                    document.getElementById('comprobar_flete_ida').classList.remove('text-success')
                    document.getElementById('comprobar_flete_ida').classList.remove('text-danger')
                    document.getElementById('comprobar_flete_ida').classList.add('text-white')
                    document.getElementById('comprobar_flete_ida').classList.remove('text-white')
                    document.getElementById('comprobar_flete_ida').value = ""
                }
            });

        }
        if (flete_retorno_actual != '') {
            $.ajax({
                url: "listar_fletes_ida",
                type: "POST",
                data: "flete_no_mostrar=" + flete_retorno_actual + '&id_viaje_actual=' + id_viaje_actual,
                success: function (res) {
                    let select = document.getElementById('viaje_flete_ida')
                    select.innerHTML = res.fletes_ida
                    select.setAttribute("requerid", "")
                    document.getElementById('divFleteIda').classList.remove('d-none')
                },
                error: function (err) {
                    toastr.error(err.responseJSON.message);
                    document.getElementById('comprobar_flete_ida').classList.remove('text-success')
                    document.getElementById('comprobar_flete_ida').classList.remove('text-danger')
                    document.getElementById('comprobar_flete_ida').classList.add('text-white')
                    document.getElementById('comprobar_flete_ida').classList.remove('text-white')
                    document.getElementById('comprobar_flete_ida').value = ""
                }
            });
        }
    } else {
        // Vista Crear Viaje
        if (flete_retorno_actual == '') {
            $.ajax({
                url: "listar_fletes_ida",
                type: "POST",
                success: function (res) {
                    let select = document.getElementById('viaje_flete_ida')
                    select.innerHTML = res.fletes_ida
                    select.setAttribute("requerid", "")
                    document.getElementById('divFleteIda').classList.remove('d-none')
                },
                error: function (err) {
                    toastr.error(err.responseJSON.message);
                    document.getElementById('comprobar_flete_ida').classList.remove('text-success')
                    document.getElementById('comprobar_flete_ida').classList.remove('text-danger')
                    document.getElementById('comprobar_flete_ida').classList.add('text-white')
                    document.getElementById('comprobar_flete_ida').classList.remove('text-white')
                    document.getElementById('comprobar_flete_ida').value = ""
                }
            });

        }
        if (flete_retorno_actual != '') {
            $.ajax({
                url: "listar_fletes_ida",
                type: "POST",
                data: "flete_no_mostrar=" + flete_retorno_actual,
                success: function (res) {
                    let select = document.getElementById('viaje_flete_ida')
                    select.innerHTML = res.fletes_ida
                    select.setAttribute("requerid", "")
                    document.getElementById('divFleteIda').classList.remove('d-none')
                },
                error: function (err) {
                    toastr.error(err.responseJSON.message);
                    document.getElementById('comprobar_flete_ida').classList.remove('text-success')
                    document.getElementById('comprobar_flete_ida').classList.remove('text-danger')
                    document.getElementById('comprobar_flete_ida').classList.add('text-white')
                    document.getElementById('comprobar_flete_ida').classList.remove('text-white')
                    document.getElementById('comprobar_flete_ida').value = ""
                }
            });
        }
    }

}
function listarFletesRetorno() {
    // Verifico de que no se haya seleccionado un flete ida para asi mostrar un flete distinto para cada tipo flete
    let flete_ida_actual = document.getElementById('viaje_flete_ida').value
    if (document.getElementById('id_viaje') != undefined) {
        // Vista Update Viaje
        let id_viaje_actual = document.getElementById('id_viaje').value
        if (flete_ida_actual == '') {
            $.ajax({
                url: "listar_fletes_retorno",
                type: "POST",
                data: 'id_viaje_actual=' + id_viaje_actual,
                success: function (res) {
                    let select = document.getElementById('viaje_flete_retorno')
                    select.innerHTML = res.fletes_retorno
                    select.setAttribute("requerid", "")
                    document.getElementById('divFleteRetorno').classList.remove('d-none')
                },
                error: function (err) {
                    toastr.error(err.responseJSON.message);
                    document.getElementById('comprobar_flete_retorno').classList.remove('text-success')
                    document.getElementById('comprobar_flete_retorno').classList.remove('text-danger')
                    document.getElementById('comprobar_flete_retorno').classList.add('text-white')
                    document.getElementById('comprobar_flete_retorno').classList.remove('text-white')
                    document.getElementById('comprobar_flete_retorno').value = ""
                }
            });

        }
        if (flete_ida_actual != '') {
            $.ajax({
                url: "listar_fletes_retorno",
                type: "POST",
                data: "flete_no_mostrar=" + flete_ida_actual + '&id_viaje_actual=' + id_viaje_actual,
                success: function (res) {
                    let select = document.getElementById('viaje_flete_retorno')
                    select.innerHTML = res.fletes_retorno
                    select.setAttribute("requerid", "")
                    document.getElementById('divFleteRetorno').classList.remove('d-none')
                },
                error: function (err) {
                    toastr.error(err.responseJSON.message);
                    document.getElementById('comprobar_flete_retorno').classList.remove('text-success')
                    document.getElementById('comprobar_flete_retorno').classList.remove('text-danger')
                    document.getElementById('comprobar_flete_retorno').classList.add('text-white')
                    document.getElementById('comprobar_flete_retorno').classList.remove('text-white')
                    document.getElementById('comprobar_flete_retorno').value = ""
                }
            });
        }
    } else {
        // Vista Crear Viaje
        if (flete_ida_actual == '') {
            $.ajax({
                url: "listar_fletes_retorno",
                type: "POST",
                success: function (res) {
                    let select = document.getElementById('viaje_flete_retorno')
                    select.innerHTML = res.fletes_retorno
                    select.setAttribute("requerid", "")
                    document.getElementById('divFleteRetorno').classList.remove('d-none')
                },
                error: function (err) {
                    toastr.error(err.responseJSON.message);
                    document.getElementById('comprobar_flete_retorno').classList.remove('text-success')
                    document.getElementById('comprobar_flete_retorno').classList.remove('text-danger')
                    document.getElementById('comprobar_flete_retorno').classList.add('text-white')
                    document.getElementById('comprobar_flete_retorno').classList.remove('text-white')
                    document.getElementById('comprobar_flete_retorno').value = ""
                }
            });

        }
        if (flete_ida_actual != '') {
            $.ajax({
                url: "listar_fletes_retorno",
                type: "POST",
                data: "flete_no_mostrar=" + flete_ida_actual,
                success: function (res) {
                    let select = document.getElementById('viaje_flete_retorno')
                    select.innerHTML = res.fletes_retorno
                    select.setAttribute("requerid", "")
                    document.getElementById('divFleteRetorno').classList.remove('d-none')
                },
                error: function (err) {
                    toastr.error(err.responseJSON.message);
                    document.getElementById('comprobar_flete_retorno').classList.remove('text-success')
                    document.getElementById('comprobar_flete_retorno').classList.remove('text-danger')
                    document.getElementById('comprobar_flete_retorno').classList.add('text-white')
                    document.getElementById('comprobar_flete_retorno').classList.remove('text-white')
                    document.getElementById('comprobar_flete_retorno').value = ""
                }
            });
        }
    }

}

function enviarViajeCompletado(id) {
    $.ajax({
        url: 'viaje_completado',
        method: 'POST',
        data: 'id_viaje=' + id,

        success: function () {
            toastr.success('Viaje Completado Exitosamente')
            tabla.ajax.reload();
        },

        error: function (err) {
            toastr.error(err.responseJSON.message)
        }

    });
}

function viajeCompletado(id) {

    Swal.fire({
        title: '¿Desea Completar este Viaje?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        preConfirm: () => {
            enviarViajeCompletado(id)
        }
    })
}


// Enviar Formc Crear Viaje
function crearViaje() {

    let fleteIda = document.getElementById('viaje_flete_ida').value
    let fleteRetorno = document.getElementById('viaje_flete_retorno').value

    if (fleteIda == fleteRetorno) {
        return toastr.error('El Flete de Ida no puede ser el Mismo que el Retorno. Origin: JS')
    }

    let diaSalida = new Date(document.getElementById('viaje_dia_salida').value)
    let diaRetorno = new Date(document.getElementById('viaje_dia_retorno').value)

    if (diaSalida >= diaRetorno) {
        return toastr.error('La Fecha de Retorno no puede ser anterior a la de Salida. Origin: JS')
    }

    let datos = $('#formularioCrearViaje').serialize();

    $.ajax({

        url: 'crear_viaje',
        method: 'POST',
        data: datos,

        success: function () {
            toastr.success('Datos Registrados Correctamente')
            tabla.ajax.reload();
        },

        error: function (err) {
            toastr.error(err.responseJSON.message)
        }

    });
}

function updateViaje() {

    let fleteIda = document.getElementById('viaje_flete_ida').value
    let fleteRetorno = document.getElementById('viaje_flete_retorno').value

    if (fleteIda == fleteRetorno) {
        return toastr.error('El Flete de Ida no puede ser el Mismo que el Retorno. Origin: JS')
    }

    let datos = $('#formularioUpdateViaje').serialize();

    $.ajax({

        url: 'update_viaje',
        method: 'POST',
        data: datos,

        success: function (res) {
            toastr.success(res.message)
            tabla.ajax.reload();
        },

        error: function (err) {
            toastr.error(err.responseJSON.message)
        }

    });
}

document.querySelector("#centro_central").addEventListener("submit", ev => {
    if (ev.target.matches('#formularioCrearViaje')) {
        ev.preventDefault()
        crearViaje()
    }

    if (ev.target.matches('#formularioUpdateViaje')) {
        ev.preventDefault()
        updateViaje()
    }

});

document.querySelector("#centro_central").addEventListener("change", ev => {

    if (ev.target.matches('#comprobar_flete_ida')) {

        let selectForm = document.getElementById('comprobar_flete_ida')

        switch (selectForm.value) {
            case 'si':
                listarFletesIda()
                selectForm.classList.remove('text-danger')
                selectForm.classList.add('text-success')
                break;

            case 'no':

                let divFleteIda = document.getElementById('divFleteIda').classList
                if ((divFleteIda.value == 'd-none') == false) {
                    divFleteIda.add('d-none')
                    document.getElementById('viaje_flete_ida').innerHTML = ''
                }
                selectForm.classList.remove('text-success')
                selectForm.classList.add('text-danger')
                document.getElementById('viaje_flete_ida').removeAttribute('requerid')
                break;
        }
    }

    if (ev.target.matches('#comprobar_flete_retorno')) {

        let selectForm = document.getElementById('comprobar_flete_retorno')

        switch (selectForm.value) {
            case 'si':
                listarFletesRetorno()
                selectForm.classList.remove('text-danger')
                selectForm.classList.add('text-success')
                break;

            case 'no':

                let divFleteRetorno = document.getElementById('divFleteRetorno').classList
                if ((divFleteRetorno.value == 'd-none') == false) {
                    divFleteRetorno.add('d-none')
                    document.getElementById('viaje_flete_retorno').innerHTML = ''
                }
                selectForm.classList.remove('text-success')
                selectForm.classList.add('text-danger')
                document.getElementById('viaje_flete_ida').removeAttribute('requerid')
                break;
        }
    }

});

function resetInputsForm() {
    $.ajax({

        url: 'listar_crear_viaje',
        method: 'POST',

        success: function (res) {
            document.getElementById('viaje_chofer').innerHTML = res.choferes
            document.getElementById('viaje_chuto').innerHTML = res.chutos
            document.getElementById('viaje_cava').innerHTML = res.cavas
        },

        error: function (err) {
            toastr.error(err.responseJSON.message)
            $("#viaje_chofer").prop("disabled", true);
            $("#viaje_chuto").prop("disabled", true);
            $("#viaje_cava").prop("disabled", true);
            $("#boton_submit").prop("disabled", true);
        }

    });
}

function limpiarFormulario() {
    document.getElementById("formularioCrearViaje").reset();
    let divFleteIda = document.getElementById('divFleteIda').classList
    if ((divFleteIda.value == 'd-none') == false) {
        divFleteIda.add('d-none')
        document.getElementById('viaje_flete_ida').innerHTML = ''
    }
    let divFleteRetorno = document.getElementById('divFleteRetorno').classList
    if ((divFleteRetorno.value == 'd-none') == false) {
        divFleteRetorno.add('d-none')
        document.getElementById('viaje_flete_retorno').innerHTML = ''
    }
    let ida = document.getElementById('viaje_flete_ida')
    ida.innerHTML = ''
    ida.removeAttribute('requerid')
    document.getElementById('comprobar_flete_ida').classList.remove('text-success')
    document.getElementById('comprobar_flete_ida').classList.remove('text-danger')
    document.getElementById('comprobar_flete_ida').classList.add('text-white')
    document.getElementById('comprobar_flete_ida').classList.remove('text-white')
    let retorno = document.getElementById('viaje_flete_retorno')
    retorno.innerHTML = ''
    retorno.removeAttribute('requerid')
    document.getElementById('comprobar_flete_retorno').classList.remove('text-success')
    document.getElementById('comprobar_flete_retorno').classList.remove('text-danger')
    document.getElementById('comprobar_flete_retorno').classList.add('text-white')
    document.getElementById('comprobar_flete_retorno').classList.remove('text-white')
    retorno.classList.add('text-white')

    resetInputsForm()

    document.getElementById('viaje_codigo').focus()
}
var tabla;

//funcion que se ejecuta al inicio
function init() {
    $("#viajes").addClass("active");
    $("#transporte").addClass("active");
    listar();
}

//funcion listar
function listar() {
    tabla = $('#tbllistado').dataTable({
        "aProcessing": true,//activamos el procedimiento del datatable
        "aServerSide": true,//paginacion y filrado realizados por el server
        "responsive": true, "lengthChange": false, "autoWidth": false,
        dom: 'Bfrtip',//definimos los elementos del control de la tabla
        buttons: [
            'copy',
            'excel',
            'pdf',
            'print',
            'colvis'
        ],
        "ajax":
        {
            url: 'listar_viajes',
            type: "get",
            dataType: "json",
            error: function (e) {
                console.log(e.responseText);
            }
        },
        "bDestroy": true,
        "iDisplayLength": 10,//paginacion
        "order": [[0, "desc"]]//ordenar (columna, orden)
    }).DataTable();
}
init();