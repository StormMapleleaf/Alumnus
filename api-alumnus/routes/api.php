<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', 'App\Http\Controllers\Auth\LoginController@login');
Route::post('/logout', 'App\Http\Controllers\Auth\LoginController@logout')->middleware('auth');
Route::post('/register', 'App\Http\Controllers\Auth\RegisterController@register');
Route::post('/user/update', 'App\Http\Controllers\Auth\UserInfoController@update');
Route::post('/user/get', 'App\Http\Controllers\Auth\UserInfoController@getUserInfo');
Route::post('/user/verify', 'App\Http\Controllers\Auth\UserVerifyController@store');
Route::post('/user/verify/list', 'App\Http\Controllers\Auth\UserVerifyController@getVerifyList');
Route::post('/user/verify/update', 'App\Http\Controllers\Auth\UserVerifyController@updateVerifyStatus');
Route::post('/user/search', 'App\Http\Controllers\Auth\UserSearchController@search');
