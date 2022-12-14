<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;


class PerfilController extends Controller
{
    public function mostrar_perfil_personal()
    {

        $id_u = Auth::user()->idusuario;

        $usuar = DB::table('usuarios')->select(
            'idusuario',
            'nombre',
            'apellido',
            'tipo_documento',
            'num_documento',
            'direccion',
            'telefono',
            'email',
            'cargo',
            'login',
            'idtipousuario',
            'iddepartamento',
            'imagen',
            'condicion'
        )->get()->where('idusuario', $id_u);


        return response()->json($usuar, status: 200);
    }

    public function editar_contra_perfil(Request $request)
    {
        $this->validate($request, [
            'clavec' => 'required|min:6'
        ]);

        $actu = Usuario::find(Auth::user()->idusuario);

        $actu->password = bcrypt($request->clavec);

        $actu->save();
    }

    public function guardar_foto_perfil_editado(Request $request)
    {

        $this->validate($request, [
            'imagen_new' => 'required|image'
        ]);

        $usuario = Usuario::find(Auth::user()->idusuario);

        $imagen = $request->file('imagen_new');
        $rutaDeGuardado = 'vendor/img-users/';
        $nombreImagenNuevo = time() . '-' . $imagen->getClientOriginalName();
        $request->file('imagen_new')->move($rutaDeGuardado, $nombreImagenNuevo);

        $usuario->imagen = $nombreImagenNuevo;

        $usuario->save();

        return response()->json(['nueva_img' => $nombreImagenNuevo], status: 200);
    }

    public function guardar_perfil_editado(Request $request)
    {
        $actu = Usuario::find(Auth::user()->idusuario);
        $actu->nombre = $request->nombre;
        $actu->apellido = $request->apellido;
        $actu->tipo_documento = $request->tipo_documento;
        $actu->num_documento  = $request->num_documento;
        $actu->direccion = $request->direccion;
        $actu->telefono = $request->telefono;
        $actu->login = $request->login;
        $actu->save();
    }
}
