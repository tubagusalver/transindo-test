<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rent;
use App\Models\Referensi;
use App\Models\History;
use DB;
Use Session;
use DateTime;
use DateInterval;
use DatePeriod;

class RentController extends Controller
{
    // history_id	history_rent_id	history_ref_id	history_date	
// ref_id	
// ref_merk	
// ref_model	
// ref_price	
// ref_plat	
// ref_status
    // rent_id	rent_vehicle_id	rent_start_date	rent_end_date	rent_created_id	rent_created_name	rent_created_date	rent_status	rent_take_date	rent_return_date	
    public function index()
    {
        $rent   = Rent::leftjoin('dataref', 'dataref.ref_id', '=', 'rent_request.rent_vehicle_id')->get();
        $dataref = Referensi::get();

        $getData = ['rent'=>$rent, 'dataref'=>$dataref];

        return view('rent.index', $getData);
    }

    public function add(Request $request)
    {
        $begin                      = new DateTime($request->rent_start_date);
        $end                        = new DateTime($request->rent_end_date);
        $end->modify('+1 day');
        $interval                   = DateInterval::createFromDateString('1 day');
        $period                     = new DatePeriod($begin, $interval, $end);
        $array_start_date = "'2000-01-01'";
        $array_start = array();
        foreach ($period as $dt) 
        {
            $dt = date_format($dt, "Y-m-d");
            $array_start_date = $array_start_date.",'".$dt."'";
            array_push($array_start, $dt);
        }

        $dataref = DB::connection('mysql')->SELECT('SELECT * FROM history
                                                            WHERE history_ref_id = '.$request->rent_add_vehicle.' AND history_date IN ('.$array_start_date.')');
        
        if($dataref){
            return redirect()->back()->with('alert', 'Oops! Mobil yang anda pilih tidak tersedia pada tanggal '.$dataref[0]->history_date.' !');
        } else {
            $rent = new Rent;
            $rent->rent_vehicle_id      = $request->rent_add_vehicle;
            $rent->rent_start_date      = $request->rent_start_date;
            $rent->rent_end_date        = $request->rent_end_date;
            $rent->rent_created_id      = Session::get('id_user');
            $rent->rent_created_name    = Session::get('nama_user');
            $rent->rent_created_date    = date('Y-m-d H:i:s');
            $rent->rent_status          = 'Sudah dipesan';
            $rent->save();

            $rent = Rent::where('rent_vehicle_id', $request->rent_add_vehicle)->where('rent_created_id', Session::get('id_user'))->orderBy('rent_created_date', 'DESC')->first();
            foreach($array_start as $date){
                $history = new History;
                $history->history_rent_id   = $rent->rent_id;
                $history->history_ref_id    = $request->rent_add_vehicle;
                $history->history_date      = $date;
                $history->save();
            }

            return redirect()->back()->with('message', 'Hooray! Penyewaan mobil berhasil dipesan!');
        }
    }

    public function update(Request $request)
    {
        $begin                      = new DateTime($request->rent_start_date);
        $end                        = new DateTime($request->rent_end_date);
        $end->modify('+1 day');
        $interval                   = DateInterval::createFromDateString('1 day');
        $period                     = new DatePeriod($begin, $interval, $end);
        $array_start_date = "'2000-01-01'";
        $array_start = array();
        foreach ($period as $dt) 
        {
            $dt = date_format($dt, "Y-m-d");
            $array_start_date = $array_start_date.",'".$dt."'";
            array_push($array_start, $dt);
        }

        $dataref = DB::connection('mysql')->SELECT('SELECT * FROM history
                                                            WHERE history_rent_id != '.$request->rent_update_id.' 
                                                                    AND history_ref_id = '.$request->rent_update_vehicle.' 
                                                                    AND history_date IN ('.$array_start_date.')');
        
        if($dataref){
            return redirect()->back()->with('alert', 'Oops! Mobil yang anda pilih tidak tersedia pada tanggal '.$dataref[0]->history_date.' !');
        } else {
            $rent = Rent::where('rent_id', $request->rent_update_id)->first();
            $rent->rent_vehicle_id  = $request->rent_update_vehicle;
            $rent->rent_start_date  = $request->rent_start_date;
            $rent->rent_end_date    = $request->rent_end_date;
            $rent->save();
            
            $history = History::where('history_rent_id', $request->rent_update_id)->delete();

            foreach($array_start as $date){
                $history = new History;
                $history->history_rent_id   = $request->rent_update_id;
                $history->history_ref_id    = $request->rent_update_vehicle;
                $history->history_date      = $date;
                $history->save();
            }

            return redirect()->back()->with('message', 'Hooray! Penyewaan mobil berhasil dirubah!');
        }
    }

    public function delete(Request $request)
    {
        $history = History::where('history_rent_id', $request->rent_id)->delete();
        $rent = Rent::where('rent_id', $request->rent_id)->first();
        $rent->delete();

        return Redirect()->back()->with('message', 'Data mobil berhasil dihapus');
    }
    
    public function return_detail(Request $request)
    {
        $rent = Rent::where('rent_id', $request->rent_id)->first();
        $dataref = Referensi::where('ref_id', $rent->rent_vehicle_id)->first();

        $getData = ['rent'=>$rent, 'dataref'=>$dataref];
        return view('rent.return', $getData);
    }

    public function return(Request $request)
    {
        $rent = Rent::where('rent_id', $request->rent_return_id)->first();
        if($rent->rent_created_id == Session::get('id_user')){
            $rent->rent_return_date = $request->rent_return_vehicle_date;
            $rent->rent_status = 'Sewa selesai';
            $rent->save();

            $rent   = Rent::leftjoin('dataref', 'dataref.ref_id', '=', 'rent_request.rent_vehicle_id')->get();
            $dataref = Referensi::get();

            $getData = ['rent'=>$rent, 'dataref'=>$dataref];

            return view('rent.index', $getData);
        } else {
            return redirect()->back()->with('alert', 'Oops! Tidak bisa menyelesaikan sewa, bukan anda yang sewa mobil!');
        }
    }

    public function take(Request $request)
    {
        $rent = Rent::where('rent_id', $request->rent_take_id)->first();
        $rent->rent_take_date = $request->rent_take_vehicle_date;
        $rent->rent_status = 'Sedang disewa';
        $rent->save();

        return redirect()->back()->with('message', 'Hooray! Mobil berhasil disewa!');
    }
}
