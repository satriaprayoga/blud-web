<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UnitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $units=Unit::all();
        return response()->json(['units'=>$units]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated=$this->unitValidator($request);
        if($validated->fails()){
            return response()->json(['errors'=>$validated->errors()],422);
        }
        $newUnit=Unit::create([
            'name'=>$request->name,
            'kode'=>$request->kode,
            'singkatan'=>$request->singkatan,
            'lokasi'=>$request->lokasi,
            'nama_kepala'=>$request->nama_kepala,
            'nip_kepala'=>$request->nip_kepala,
            'jabatan_kepala'=>$request->jabatan_kepala
        ]);
        return response()->json([
            'unit'=>$newUnit,
            'message'=>'Unit baru berhasil dibuat'
        ],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $unit=Unit::find($id);
        if($unit==null){
            return response()->json(['message'=>'Unit tidak ditemukan'],404);
        }
        $subunits=$unit->subunits();
        return response()->json(['unit'=>$unit,'subunits'=>$subunits]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        $unit=Unit::find($id);
        if($unit==null){
            return response()->json(['message'=>'Unit tidak ditemukan'],404);
        }
        $unit->name=$request->name;
        $unit->kode=$request->kode;
        $unit->singkatan=$request->singkatan;
        $unit->lokasi=$request->lokasi;
        $unit->nama_kepala=$request->nama_kepala;
        $unit->nip_kepala=$request->nip_kepala;
        $unit->jabatan_kepala=$request->jabatan_kepala;
        $unit->save();
        
        return response()->json(['unit'=>$unit,'message'=>'Unit berhasil diupdate'],200);
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $unit=Unit::find($id);
        if($unit==null){
            return response()->json(['message'=>'Unit tidak ditemukan'],404);
        }else{
            if($unit->subunits->isNotEmpty()){
                return response()->json(['message'=>'Unit memiliki Sub Unit'],404);
            }
            $unit->delete();
            return response()->json(['message'=>'Unit berhasil dihapus'],200);
        }
        
    }

    protected function unitValidator(Request $request){
        return Validator::make($request->all(),[
            'name'=>'required|string|max:255',
            'kode'=>'required|string|max:255|unique:units',
            'singkatan'=>'required|string|max:255',
            'lokasi'=>'required|string|max:255',
            'nama_kepala'=>'required|string|max:255',
            'nip_kepala'=>'required|string|max:255',
            'jabatan_kepala'=>'required|string|max:255'
        ]);
    }



}
