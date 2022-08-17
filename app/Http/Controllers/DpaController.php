<?php

namespace App\Http\Controllers;

use App\Models\Dpa;
use App\Models\Subunit;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
            'tahapan'=>$request->tahapan,
            'no_dpa'=>$request->no_dpa,
            'type'=>$request->type,
            'total'=>$request->total,
            'total_after'=>$request->total_after,
            'kegiatan'=>$request->kegiatan,
            'kode_kegiatan'=>$request->kode_kegiatan,
            'subkegiatan'=>$request->subkegiatan,
            'kode_subkegiatan'=>$request->kode_subkegiatan,
            'kode_rekening'=>$request->kode_rekening,
        ]);

        return response()->json(['dpa'=>$request->all()]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Dpa  $dpa
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $dpa=Dpa::find($id);
        if($dpa==null){
            return response()->json(['message'=>'Sub Unit tidak ditemukan'],404);
        }
        
        return response()->json(['dpa'=>$dpa,'subunit'=>$dpa->subunit]);
    }

    public function subunitDpa($subunit_id, $type=null){
        $dpas=[];
        if(is_null($type)){
            $dpas=Dpa::where('subunit_id',$subunit_id)->get();
        }else{
            $dpas=Dpa::where('subunit_id',$subunit_id)->where('type',$type)->get();
        }
        return response()->json(['dpas'=>$dpas]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Dpa  $dpa
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validated=$this->editDpaValidator($request);
        if($validated->fails()){
            return response()->json(['errors'=>$validated->errors()],422);
        }
        $dpa=Dpa::find($id);
        $dpa->update([
            'tahapan'=>$request->tahapan,
            'no_dpa'=>$request->no_dpa,
            'total'=>$request->total,
            'total_after'=>$request->total_after
        ]);
        return response()->json(['dpa'=>$dpa]);
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Dpa  $dpa
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $dpa=Dpa::find($id);
        if($dpa==null){
            return response()->json(['message'=>'DPA tidak ditemukan'],404);
        }
        if($dpa->aktif==true){
            return response()->json(['message'=>'Harap non aktifkan DPA terlebih dahulu'],402);
        }
        $dpa->delete();
        return response()->json(['msg'=>'DPA berhasil dihapus']);
    }

    public function activate(Request $request,$id){
        $next=Dpa::find($id);
        if(DB::table('dpas')->where('aktif',true)->exists()){
            $current=Dpa::where('aktif',true)->first();
            $current->update(['aktif'=>false]);
        }
        $next->update(['aktif'=>$request->aktif]);
        return response()->json(['dpa'=>$next]);
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

    public function editDpaValidator(Request $request)
    {
        return Validator::make($request->all(), [
            'tahapan'=>'required',
            'no_dpa'=>'required',
            'total'=>'required',
            'total_after'=>'required'
        ]);
    }
}
