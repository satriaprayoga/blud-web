<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\ApbdController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DpaController;
use App\Http\Controllers\OperasionalController;
use App\Http\Controllers\SubunitController;
use App\Http\Controllers\UnitController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::apiResource('accounts',AccountController::class);
Route::get('/accounts/group/{group}/root/{root?}',[AccountController::class,'groupRoot']);
Route::get('/accounts/group/{group}/type/{type?}',[AccountController::class,'groupType']);


Route::apiResource('units',UnitController::class);
Route::apiResource('subunits',SubunitController::class);
Route::apiResource('operasionals',OperasionalController::class);


Route::apiResource('apbd',ApbdController::class);
Route::apiResource('dpa',DpaController::class);

Route::get('/dpa/sub/{subunit_id}/type/{type?}',[DpaController::class,'subunitDpa']);
Route::put('/dpa/activate/{id}',[DpaController::class,'activate']);

Route::get('/operasionals/subunit/{subunit_id}',[OperasionalController::class,'oprSubunit']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout',[AuthController::class,'logout']);
    Route::get('/me',[AuthController::class,'me']);
   
 });
