<?php

namespace App\Http\Controllers;

use App\Models\Operasional;
use App\Models\Subunit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OperasionalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $oprs=Operasional::all();
        return response()->json(['oprs'=>$oprs]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated=$this->oprValidation($request);
        if($validated->fails()){
            return response()->json(['errors'=>$validated->errors()],422);
        }
        $opr=Operasional::create([
            'name'=>$request->name,
            'kode'=>$request->kode,
            'type'=>$request->type,
            'pendapatan'=>$request->pendapatan,
            'subunit_id'=>$request->subunit_id
        ]);
        return response()->json([
            'opr'=>$opr,
            'message'=>'Operasional baru berhasil dibuat'
        ],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Operasional  $operasional
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $opr=Operasional::find($id);
        if($opr==null){
            return response()->json(['message'=>'Unit tidak ditemukan'],404);
        }
        return response()->json(['opr'=>$opr]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Operasional  $operasional
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Operasional $operasional)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Operasional  $operasional
     * @return \Illuminate\Http\Response
     */
    public function destroy(Operasional $operasional)
    {
        //
    }

    public function oprSubunit($subunit_id){
        $subunit=Subunit::find($subunit_id);
        $oprs=Operasional::where('subunit_id',$subunit_id)->get();
        return response()->json(['subunit'=>$subunit,'oprs'=>$oprs]);
    }

    protected function oprValidation(Request $request){
        return Validator::make($request->all(),[
            'name'=>'required|string|max:255',
            'kode'=>'required|string|max:255|unique:subunits',
            'type'=>'required|string|max:255',
            'subunit_id'=>'required|integer'

        ]);
    }
}
