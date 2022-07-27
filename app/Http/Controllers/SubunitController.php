<?php

namespace App\Http\Controllers;

use App\Models\Subunit;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubunitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $subunits=Subunit::all();
        return response()->json(['subunits'=>$subunits]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated=$this->subunitValidation($request);
        if($validated->fails()){
            return response()->json(['errors'=>$validated->errors()],422);
        }
        $unit=Unit::find($request->unit_id);
        $unit->subunits()->create([
            'nama'=>$request->nama,
            'kode'=>$request->kode,
            'singkatan'=>$request->singkatan,
            'nama_bend'=>$request->nama_bend,
            'nip_bend'=>$request->nip_bend,
            'jabatan_bend'=>$request->jabatan_bend,
            'nama_sptjm'=>$request->nama_sptjm,
            'jabatan_sptjm'=>$request->jabatan_sptjm,
            'nip_sptjm'=>$request->nip_sptjm,
            'nama_sp2b'=>$request->nama_sp2b,
            'nip_sp2b'=>$request->nip_sp2b,
            'jabatan_sp2b'=>$request->jabatan_sp2b,
        ]);
        return response()->json(['subunit'=>$request->all()]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Subunit  $subunit
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $subunit=Subunit::find($id);
        if($subunit==null){
            return response()->json(['message'=>'Sub Unit tidak ditemukan'],404);
        }
        $subunit->unit;
        return response()->json(['subunit'=>$subunit]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Subunit  $subunit
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validated=$this->EditSubunitValidation($request);
        if($validated->fails()){
            return response()->json(['errors'=>$validated->errors()],422);
        }
        $subunit=Subunit::find($id);
        $subunit->update([
            'nama'=>$request->nama,
            'singkatan'=>$request->singkatan,
            'nama_bend'=>$request->nama_bend,
            'nip_bend'=>$request->nip_bend,
            'jabatan_bend'=>$request->jabatan_bend,
            'nama_sptjm'=>$request->nama_sptjm,
            'jabatan_sptjm'=>$request->jabatan_sptjm,
            'nip_sptjm'=>$request->nip_sptjm,
            'nama_sp2b'=>$request->nama_sp2b,
            'nip_sp2b'=>$request->nip_sp2b,
            'jabatan_sp2b'=>$request->jabatan_sp2b,
        ]);
        
        return response()->json(['subunit'=>$subunit]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Subunit  $subunit
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $subunit=SubUnit::find($id);
        if($subunit==null){
            return response()->json(['message'=>'Sub Unit tidak ditemukan'],404);
        }
        $subunit->delete();
        return response()->json(['message'=>'Sub Unit berhasil dihapus'],200);
    }

    protected function subunitValidation(Request $request){
        return Validator::make($request->all(),[
            'nama'=>'required|string|max:255',
            'kode'=>'required|string|max:255|unique:subunits',
            'singkatan'=>'required|string|max:255',
            'nama_bend'=>'required|string|max:255',
            'nip_bend'=>'required|string|max:255',
            'jabatan_bend'=>'required|string|max:255',
            'nama_sptjm'=>'required|string|max:255',
            'jabatan_sptjm'=>'required|string|max:255',
            'nip_sptjm'=>'required|string|max:255',
            'nama_sp2b'=>'required|string|max:255',
            'nip_sp2b'=>'required|string|max:255',
            'jabatan_sp2b'=>'required|string|max:255',
            'unit_id'=>'required|integer'

        ]);
    }

    protected function editSubunitValidation(Request $request){
        return Validator::make($request->all(),[
            'nama'=>'required|string|max:255',
            'singkatan'=>'required|string|max:255',
            'nama_bend'=>'required|string|max:255',
            'nip_bend'=>'required|string|max:255',
            'jabatan_bend'=>'required|string|max:255',
            'nama_sptjm'=>'required|string|max:255',
            'jabatan_sptjm'=>'required|string|max:255',
            'nip_sptjm'=>'required|string|max:255',
            'nama_sp2b'=>'required|string|max:255',
            'nip_sp2b'=>'required|string|max:255',
            'jabatan_sp2b'=>'required|string|max:255',
            'unit_id'=>'required|integer'

        ]);
    }
}
