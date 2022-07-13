<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function register(Request $request){
        $validator= Validator::make($request->all,[
            'name'=>'required|string|max:255',
            'email'=>'required|string|email|max:255|unique:users',
            'username'=>'required|string|max:255|unique:users',
            'password'=>'required|string|min:4',
            'nip'=>'required|string|max:255'
        ]);
        if($validator->fails()){
            return response()->json(['errors'=>$validator->errors()],404);
        }
        $user=$this->store($request);
        $token=$user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'user'=>$user,
            'access_token'=>$token,
            'token_type'=>'Bearer',
            'message'=>'registration succesful'
        ],200);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'username'=>$request->username,
            'unit'=>$request->unit,
            'nip'=>$request->nip,
            'password'=>Hash::make($request->password),
        ]);
    }

    public function login(Request $request){
        if(!Auth::attempt($request->only('email','password'))){
            return response()->json(['message'=>'Unauthorized'],401);
        }
        $user=User::where('email',$request['email'])->firstOrFail();
        $token=$user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'user'=>$user,
            'access_token'=>$token,
            'token_type'=>'Bearer',
            'message'=>'Welcome!'
        ],200);
    }

    public function logout(){
        Auth::auth()->user()->tokens()->delete();
        return response()->json(['message' => 'Logged Out'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function profile()
    {
        return response()->json(['message'=>'Your profile','profile'=>Auth::user()]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }

    protected function guard(){
        return Auth::guard();
    }
}
