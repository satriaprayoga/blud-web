<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
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
        $validated=$this->loginValidator($request);
        if($validated->fails()){
            return response()->json([
                'errors'=>$validated->errors()
            ],422);
        }else{
            $attempt=Auth::attempt($request->only('username','password'));
            if(!$attempt){
                return response()->json([
                    'message'=>'Username dan Password salah'
                ],401);
            }
            $user=User::where('username',$request['username'])->firstOrFail();
            $token=$user->createToken('token')->plainTextToken;
            return response()->json([
                'user'=>$user,
                'access_token'=>$token,
                'token_type'=>'Bearer',
                'message'=>'Welcome!'
            ],200);
        }
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged Out'], 200);
    }

    public function me(Request $request){
        $user=$request->user();
        return response()->json(['user'=>$user ]);
    }

    public function edit(Request $request){
        $validated=$this->editValidator($request);
        if($validated->fails()){
            return response()->json([
                'errors'=>$validated->errors()
            ],422);
        }
        $user=User::where('id',$request->id)->firstOrFail();
        $user->name=$request->user;
        $user->username=$request->username;
        $user->email=$request->email;
        $user->nip=$request->nip;
        $user->unit=$request->unit;
        $user=$user->save();
        return response()->json(["user"=>$user]);
    }

    protected function loginValidator(Request $request){
        return Validator::make($request->all(),[
            'username'=>'required|string|max:255',
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

    protected function editValidator(Request $request){
        return Validator::make($request->all(),[
            'name'=>'required|string|max:255',
            'email'=>'required|string|email|max:255|unique:users',
            'username'=>'required|string|max:255|unique:users',
            'nip'=>'required|string|max:255',
            'unit'=>'required|string|max:255',
        ]);
    }
}
