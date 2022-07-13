<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
   
    public function register(Request $request){
        $validated=$this->signUpValidator($request);
        if($validated->fails()){
            return response()->json([
                'errors'=>$validated->errors()
            ],422);
        }
        $newUser=User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'username' => $request->username,
            'nip'=>$request->nip,
            'password'=>Hash::make($request->password),
            'role_id'=>1,
            'unit'=>$request->unit
        ]);
        return response()->json([
            "message"=>"User created succefuly"
        ]);
    }

    public function login(Request $request){
        $validated=$this->signUpValidator($request);
        if($validated->fails()){
            return response()->json([
                'errors'=>$validated->errors()
            ],422);
        }
    }

    protected function loginValidator(Request $request){
        return Validator::make($request->all(),[
            'username'=>'required|string|max:255|unique:users',
            'password'=>'required|string|min:4'
        ]);
    }

    protected function signUpValidator(Request $request){
        return Validator::make($request->all(),[
            'name'=>'required|string|max:255',
            'email'=>'required|string|email|max:255|unique:users',
            'username'=>'required|string|max:255|unique:users',
            'password'=>'required|string|min:4',
            'confirmPassword'=>'required|same:password|',
            'nip'=>'required|string|max:255',
            'unit'=>'required|string|max:255',
        ]);
    }
}
