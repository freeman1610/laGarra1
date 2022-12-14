<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Estado;
use App\Models\Flete;
use App\Models\Municipio;
use App\Models\Parroquia;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FleteController extends Controller
{
    public function listar_fletes()
    {
        $selectFletes = Flete::orderBy('created_at', 'desc')->get();
        $arrayDatos = [];
        foreach ($selectFletes as $datos) {
            $selectEstado = Estado::find($datos->flete_destino_estado);
            $selectMunicipio = Municipio::find($datos->flete_destino_municipio);
            $selectParroquia = Parroquia::find($datos->flete_destino_parroquia);
            $strDestino = $selectEstado->estado . ', ' . $selectMunicipio->municipio . ', ' . $selectParroquia->parroquia;
            switch ($datos->flete_estado) {
                case 0:
                    $estadoFlete = '<span class="btn btn-warning">Sin Asignar</span>';
                    $tipo_flete = '<span class="btn btn-warning">Sin Asignar</span>';
                    break;
                case 1:
                    if ($datos->flete_tipo == 1) {
                        $verificarCodFlete = DB::table('viajes')
                            ->select('viajes_id')
                            ->where('viajes_idflete_ida', $datos->flete_id)
                            ->get();
                        $estadoFlete = '<span class="btn btn-info" style="width:100px;cursor:default;" onclick="mostrarViaje(' . $verificarCodFlete[0]->viajes_id . ')">En Viaje</span>';
                        $tipo_flete = '<span class="btn btn-info" style="cursor:default;">Ida</span>';
                    }
                    if ($datos->flete_tipo == 2) {
                        $verificarCodFlete = DB::table('viajes')
                            ->select('viajes_id')
                            ->where('viajes_idflete_retorno', $datos->flete_id)
                            ->get();
                        $estadoFlete = '<span class="btn btn-info" style="width:100px;cursor:default;" onclick="mostrarViaje(' . $verificarCodFlete[0]->viajes_id . ')">En Viaje</span>';
                        $tipo_flete = '<span class="btn btn-info" style="cursor:default;">Retorno</span>';
                    }
                    break;
                case 2:
                    if ($datos->flete_tipo == 1) {
                        $verificarCodFlete = DB::table('viajes')
                            ->select('viajes_id')
                            ->where('viajes_idflete_ida', $datos->flete_id)
                            ->get();
                        $estadoFlete = '<span class="btn btn-success" style="cursor:default;" onclick="mostrarViaje(' . $verificarCodFlete[0]->viajes_id . ')">Completado</span>';
                        $tipo_flete = '<span class="btn btn-success" style="cursor:default;">Ida</span>';
                    }
                    if ($datos->flete_tipo == 2) {
                        $verificarCodFlete = DB::table('viajes')
                            ->select('viajes_id')
                            ->where('viajes_idflete_retorno', $datos->flete_id)
                            ->get();
                        $estadoFlete = '<span class="btn btn-success" style="cursor:default;" onclick="mostrarViaje(' . $verificarCodFlete[0]->viajes_id . ')">Completado</span>';
                        $tipo_flete = '<span class="btn btn-success" style="cursor:default;">Retorno</span>';
                    }
                    break;
            }
            $arrayDatos[] = [
                "0" => '<button class="btn btn-primary btn-xs" title="Editar" onclick="mostrarFlete(' . $datos->flete_id . ')"><i class="fa fa-edit"></i></button>' . ' ' . '<button class="btn btn-danger btn-xs" title="Eliminar" onclick="eliminar(' . $datos->flete_id . ')"><i class="fa fa-trash"></i></button>',
                "1" => $datos->flete_codigo,
                "2" => $strDestino,
                "3" => $datos->flete_kilometros,
                "4" => 'VES ' . $datos->flete_valor_en_carga,
                "5" => 'VES ' . $datos->flete_valor_sin_carga,
                "6" => $estadoFlete,
                "7" => $tipo_flete
            ];
        }
        $results = [
            "sEcho" => 1, //info para datatables
            "iTotalRecords" => count($arrayDatos), //enviamos el total de registros al datatable
            "iTotalDisplayRecords" => count($arrayDatos), //enviamos el total de registros a visualizar
            "aaData" => $arrayDatos
        ];
        return response()->json($results, status: 200);
    }
    public function listar_estados()
    {
        $selectEstados = Estado::all();
        $optionEstados = '<option value="">Seleccione</option>';
        foreach ($selectEstados as $datos) {
            $optionEstados = $optionEstados . '<option value="' . $datos->id_estado . '">' . $datos->estado . '</option>';
        }
        return response()->json(['estados' => $optionEstados], status: 200);
    }
    public function listar_municipios(Request $request)
    {
        $this->validate($request, [
            'id_estado' => 'required|numeric'
        ]);
        $selectMunicipios = Municipio::where('id_estado', '=', $request->id_estado)
            ->get();
        $optionMunicipios = '<option value="">Seleccione</option>';
        foreach ($selectMunicipios as $datos) {
            $optionMunicipios = $optionMunicipios . '<option value="' . $datos->id_municipio . '">' . $datos->municipio . '</option>';
        }
        return response()->json(['municipios' => $optionMunicipios], status: 200);
    }
    public function listar_parroquias(Request $request)
    {
        $this->validate($request, [
            'id_municipio' => 'required|numeric'
        ]);
        $selectParroquias = Parroquia::where('id_municipio', '=', $request->id_municipio)
            ->get();
        $optionParroquias = '<option value="">Seleccione</option>';
        foreach ($selectParroquias as $datos) {
            $optionParroquias = $optionParroquias . '<option value="' . $datos->id_parroquia . '">' . $datos->parroquia . '</option>';
        }
        return response()->json(['parroquias' => $optionParroquias], status: 200);
    }
    public function registrar_flete(Request $request)
    {
        $this->validate($request, [
            'flete_destino_estado' => 'required|numeric',
            'flete_destino_municipio' => 'required|numeric',
            'flete_destino_parroquia' => 'required|numeric',
            'flete_kilometros' => 'required',
            'flete_valor_en_carga' => 'required',
            'flete_valor_sin_carga' => 'required',
        ]);

        $selectCountFlete = Flete::whereDate('created_at', date('Y-m-d'))
            ->select('flete_id')
            ->get();

        $selectCountFlete = count($selectCountFlete);

        $selectCountFlete++;

        if ($selectCountFlete < 10) {
            $cod = 'FLETE-' . date('dmY' . '-0' . $selectCountFlete);
        } else {
            $cod = 'FLETE-' . date('dmY' . '-' . $selectCountFlete);
        }

        $verificarCodFlete = DB::table('fletes')
            ->select('flete_codigo')
            ->where('flete_codigo', $cod)
            ->get();
        if (isset($verificarCodFlete[0]->flete_codigo)) {
            return response()->json(['message' => 'La Codigo Ingresado Ya Ha Sido Registrado'], status: 422);
        }

        $newFlete = new Flete;
        $newFlete->flete_idusuario = Auth::user()->idusuario;
        $newFlete->flete_codigo = $cod;
        $newFlete->flete_destino_estado = $request->flete_destino_estado;
        $newFlete->flete_destino_municipio = $request->flete_destino_municipio;
        $newFlete->flete_destino_parroquia = $request->flete_destino_parroquia;
        $newFlete->flete_kilometros = $request->flete_kilometros;
        $newFlete->flete_valor_en_carga = $request->flete_valor_en_carga;
        $newFlete->flete_valor_sin_carga = $request->flete_valor_sin_carga;
        $newFlete->save();
    }
    public function generar_cod_flete()
    {
        // Para generar el codigo tomamos en cuenta la fecha actual y el numero de
        // flete registrados al dia, generando algo similar a esto:
        // FLETE-DDMMYYYY-XX
        $selectCountFlete = Flete::whereDate('created_at', date('Y-m-d'))
            ->select('flete_id')
            ->get();

        $selectCountFlete = count($selectCountFlete);

        $selectCountFlete++;

        if ($selectCountFlete < 10) {
            $cod = 'FLETE-' . date('dmY' . '-0' . $selectCountFlete);
        } else {
            $cod = 'FLETE-' . date('dmY' . '-' . $selectCountFlete);
        }

        return response()->json(['codflete' => $cod], status: 200);
    }
    public function mostrar_flete(Request $request)
    {
        $this->validate($request, [
            'flete_id' => 'required|numeric',
        ]);
        $selectFlete = Flete::find($request->flete_id);

        // Seleccion del valor actual del destino
        $selectEstado = Estado::find($selectFlete->flete_destino_estado);
        $selectMunicipio = Municipio::find($selectFlete->flete_destino_municipio);
        $selectParroquia = Parroquia::find($selectFlete->flete_destino_parroquia);

        // Seleccion de todos los lugares para organizar en un json en forma de option para solo imprimir en pantalla
        $selectEstados = Estado::all();
        $selectMunicipios = Municipio::where('id_estado', '=', $selectFlete->flete_destino_estado)
            ->get();
        $selectParroquias = Parroquia::where('id_municipio', '=', $selectFlete->flete_destino_municipio)
            ->get();

        // Estados
        $optionEstados = '<option value="' . $selectEstado->id_estado . '">' . $selectEstado->estado . '</option>';

        foreach ($selectEstados as $datos) {
            $optionEstados = $optionEstados . '<option value="' . $datos->id_estado . '">' . $datos->estado . '</option>';
        }
        // Municipios
        $optionMunicipios = '<option value="' . $selectMunicipio->id_municipio . '">' . $selectMunicipio->municipio . '</option>';

        foreach ($selectMunicipios as $datos) {
            $optionMunicipios = $optionMunicipios . '<option value="' . $datos->id_municipio . '">' . $datos->municipio . '</option>';
        }

        // Parroquias
        $optionParroquias = '<option value="' . $selectParroquia->id_parroquia . '">' . $selectParroquia->parroquia . '</option>';
        foreach ($selectParroquias as $datos) {
            $optionParroquias = $optionParroquias . '<option value="' . $datos->id_parroquia . '">' . $datos->parroquia . '</option>';
        }

        return response()->json([
            'flete' => $selectFlete,
            'estados' => $optionEstados,
            'municipios' => $optionMunicipios,
            'parroquias' => $optionParroquias
        ], status: 200);
    }

    public function update_flete(Request $request)
    {
        $this->validate($request, [
            'flete_id' => 'required|numeric',
            'flete_destino_estado' => 'required|numeric',
            'flete_destino_municipio' => 'required|numeric',
            'flete_destino_parroquia' => 'required|numeric',
            'flete_kilometros' => 'required',
            'flete_valor_en_carga' => 'required',
            'flete_valor_sin_carga' => 'required'
        ]);

        $selectFlete = Flete::find($request->flete_id);

        $selectFlete->flete_destino_estado = $request->flete_destino_estado;
        $selectFlete->flete_destino_municipio = $request->flete_destino_municipio;
        $selectFlete->flete_destino_parroquia = $request->flete_destino_parroquia;
        $selectFlete->flete_kilometros = $request->flete_kilometros;
        $selectFlete->flete_valor_en_carga = $request->flete_valor_en_carga;
        $selectFlete->flete_valor_sin_carga = $request->flete_valor_sin_carga;

        $selectFlete->save();

        return response()->json('Fino Pa', status: 200);
    }
    public function eliminar_flete(Request $request)
    {
        $this->validate($request, [
            'flete_id' => 'required|numeric',
        ]);
        $comprobarEstado = Flete::find($request->flete_id);
        if ($comprobarEstado->flete_estado == 1 || $comprobarEstado->flete_estado == 2) {
            return response()->json(['message' => 'El Flete no se puede Eliminar por que ya ha sido Asignado a un Viaje'], status: 422);
        }
        Flete::destroy($request->flete_id);
        return response()->json('Eliminado Exitosamente!', status: 200);
    }
}
