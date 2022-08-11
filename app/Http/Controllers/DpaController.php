<?php

namespace App\Http\Controllers;

use App\Models\Dpa;
use App\Models\Subunit;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DpaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $dpa = Dpa::all();
        return response()->json(['dpas' => $dpa]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated=$this->dpaValidator($request);
        if($validated->fails()){
            return response()->json(['errors'=>$validated->errors()],422);
        }
        $sub=Subunit::find($request->subunit_id);
        $sub->dpas()->create([
            'tahun'=>Carbon::create($request->tahun)->format('Y'),
            'tahapan'=>$request->ahapan,
            'no_dpa'=>$request->no_dpa,
            'type'=>$request->type,
            'total'=>$request->total,
            'total_after'=>$request->total_after
        ]);

        return response()->json(['subunit'=>$sub]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Dpa  $dpa
     * @return \Illuminate\Http\Response
     */
    public function show(Dpa $dpa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Dpa  $dpa
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Dpa $dpa)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Dpa  $dpa
     * @return \Illuminate\Http\Response
     */
    public function destroy(Dpa $dpa)
    {
        //
    }

    public function dpaValidator(Request $request)
    {
        return Validator::make($request->all(), [
            'tahun'=>'required',
            'tahapan'=>'required',
            'no_dpa'=>'required',
            'type'=>'required',
            'total'=>'required',
            'total_after'=>'required',
            'subunit_id'=>'required'
        ]);
    }
}
