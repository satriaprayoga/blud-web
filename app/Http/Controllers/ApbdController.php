<?php

namespace App\Http\Controllers;

use App\Models\Apbd;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ApbdController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $apbd=Apbd::all();
        return response()->json(['apbds'=>$apbd]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $validated=$this->apbdValidator($request);
        if($validated->fails()){
            return response()->json(['errors'=>$validated->errors()],422);
        }
        $apbd=Apbd::create([
            'tahun'=>Carbon::create($request->tahun)->format('Y'),
            'tahapan'=>$request->tahapan,
            'perda'=>$request->perda,
            'perkada'=>$request->perkada,
            'status'=>$request->status
        ]);
        return response()->json(['apbd'=>$apbd]);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Apbd  $apbd
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $apbd=Apbd::find($id);
        if($apbd==null){
            return response()->json(['message'=>'APBD tidak ditemukan'],404);
        }
        return response()->json(['apbd'=>$apbd]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Apbd  $apbd
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Apbd $apbd)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Apbd  $apbd
     * @return \Illuminate\Http\Response
     */
    public function destroy(Apbd $apbd)
    {
        //
    }

    protected function apbdValidator(Request $request)
    {
        return Validator::make($request->all(), [
            'tahun'=>'required',
            'tahapan'=>'required',
            'perda'=>'required',
            'perkada'=>'required',
            'status'=>'required'

        ]);
    }
}
