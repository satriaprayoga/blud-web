<?php

namespace App\Http\Controllers;

use App\Models\Subunit;
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
        $subunit=Subunit::create($request->all());
        return response()->json(['subunit'=>$subunit]);
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
        return response()->json(['subunit'=>$subunit]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Subunit  $subunit
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Subunit $subunit)
    {
        //
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
        $subunit->destroy();
        return response()->json(['message'=>'Sub Unit berhasil dihapus'],400);
    }

    protected function subunitValidation(Request $request){
        return Validator::make($request->all(),[
            'nama'=>'required|string|max:255',
            'kode'=>'required|string|max:255',
            'singkatan'=>'required|string|max:255',
            'nama_bend'=>'required|string|max:255',
            'nip_bend'=>'required|string|max:255',
            'jabatan_bend'=>'required|string|max:255',
            'nama_sptjm'=>'required|string|max:255',
            'nip_sptjm'=>'required|string|max:255',
            'nama_sp2b'=>'required|string|max:255',
            'nip_sp2b'=>'required|string|max:255',
            'jabatan_sp2b'=>'required|string|max:255',
            'unit_id'=>'required|integer'

        ]);
    }
}
