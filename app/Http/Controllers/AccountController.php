<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AccountController extends Controller
{
    public function index()
    {
        $accounts = Account::all();
        return response()->json(['accounts' => $accounts]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $this->accountValidator($request);
        if ($validated->fails()) {
            return response()->json([
                'errors' => $validated->errors()
            ], 422);
        }
        $account=Account::create(
            [
                'kode'=>$request->parentKode.$request->kode,
                'name'=>$request->name,
                'root'=>$request->root,
                'report'=>$request->report,
                'type'=>$request->type,
                'group'=>$request->group,
                'parent_id'=>$request->parent_id
            ]
        );
        return response()->json([
            'account'=>$account,
            'message'=>'Akun baru berhasil ditambah'
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
        $account = Account::find($id);
        if ($account == null) {
            return response()->json(['message' => 'Akun tidak ditemukan'], 404);
        }
        $account->children;
        $account->parent;
        return response()->json(['account' => $account]);
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
        $validated=$this->accountValidator($request);
        if($validated->fails()){
            return response()->json([
                'errors'=>$validated->errors()
            ],422);
        }
        $account=Account::find($id);
        $account->name=$request->name;
        $account->kode=$request->kode;
        $account=$account->save();
        return response()->json(["account"=>$account]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $account=Account::where('id',$id)->firstOrFail();
        if(sizeof($account->children) > 0){
            return response()->json([
                'error'=>'Akun memilik sub akun, hapus terlebih dahulu'
            ],422); 
        }
        $account->delete();
        return response()->json(['message'=>'Akun berhasil di hapus']);
    }

    public function groupRoot($group,$root=null){
        $accounts=Account::where('group',$group)->where('root',$root)->get();
        return response()->json(['accounts'=>$accounts],200);
    }

    public function groupType($group,$type=null){
        $accounts=[];
        if(is_null($type)){
            $accounts=Account::where('group',$group)->get();
        }else{
            $accounts=Account::where('group',$group)->where('type',$type)->get();
        }
       
        return response()->json(['accounts'=>$accounts],200);
    }

    protected function accountValidator(Request $request)
    {
        return Validator::make($request->all(), [
            'kode' => 'required|string|max:255',
            'name' => 'required|string|max:255',

        ]);
    }
}
