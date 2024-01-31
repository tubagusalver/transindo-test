<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Referensi;

class DataRefController extends Controller
{
    public function index()
    {
        $dataref = Referensi::get();

        $getData = ['dataref'=>$dataref];

        return view('dataref.index', $getData);
    }

    public function add(Request $request)
    {
        $ref = new Referensi;
        $ref->ref_merk      = $request->dataref_add_merk;
        $ref->ref_model     = $request->dataref_add_model;		
        $ref->ref_plat      = $request->dataref_add_nomor_polisi;
        $ref->ref_price     = $request->dataref_add_price;
        $ref->ref_status    = 'Tersedia';
        $ref->save();

        return redirect()->back()->with('message', 'Hooray! Data mobil baru berhasil ditambahkan!');
    }

    public function update(Request $request)
    {
        $ref = Referensi::where('ref_id', $request->dataref_update_id)->first();
        $ref->ref_merk      = $request->dataref_update_merk;
        $ref->ref_model     = $request->dataref_update_model;		
        $ref->ref_plat      = $request->dataref_update_nomor_polisi;
        $ref->ref_price     = $request->dataref_update_price;
        $ref->ref_status    = $request->dataref_update_status;
        $ref->save();

        return redirect()->back()->with('message', 'Hooray! Data mobil  berhasil dirubah!');
    }

    public function delete(Request $request)
    {
        $ref = Referensi::where('ref_id', $request->ref_id)->first();
        $ref->delete();

        return Redirect()->back()->with('message', 'Data mobil berhasil dihapus');
    }
}
