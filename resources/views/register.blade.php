@extends('layouts.layout')
@section('main_container')
	<div class="row">
        <div class="col-lg-12">
	        <h2 class="page-header">Detail Pengembalian Sewa Mobil</h2>
            <a type="button" class="btn btn-default" style="width:20%" href="{{ url('RentList') }}"> Back To Rent Request List</a>
	    </div>
        <div class="row">
            <form class="form-horizontal form-label-left" enctype="multipart/form-data" action="{{ url('ReturnRent') }}" method="POST">
                <br><br>
                <div class="row">
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Pilih Mobil</label>
                            <div class="col-md-8 col-sm-8 col-xs-12" >
                                @php
                                    $vehicle = $dataref->ref_plat.' | '.$dataref->ref_merk.' - '.$dataref->ref_model.' | '.number_format($dataref->ref_price);
                                @endphp
                                <input class="form-control" value="{{$vehicle}}" id="rent_return_vehicle" name="rent_return_vehicle" readonly>
                            </div>
                        </div>
                </div>
                <div class="row">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Pilih Tanggal Sewa</label>
                        <div class="input-group col-md-8" style="padding-left: 7px; padding-right: 2px">
                            <input class="form-control" value="{{$rent->rent_start_date}}" id="rent_return_start_date" name="rent_return_start_date" readonly>
                            <div class="input-group-addon">hingga</div>
                            <input class="form-control" value="{{$rent->rent_end_date}}" id="rent_return_end_date" name="rent_return_end_date" readonly>
                        </div>
                </div>
                <div class="row">
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Tanggal Pengambilan</label>
                            <div class="col-md-8 col-sm-8 col-xs-12">
                                <input type="datetime-local" class="form-control" value="{{$rent->rent_take_date}}" name="rent_take_vehicle_date" id="rent_take_vehicle_date" placeholder="Tanggal Pengambilan" autocomplete="off" readonly />
                            </div>
                        </div> 
                </div>
                <div class="row">
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Tanggal Pengembalian<span class="required"> *</span></label>
                            <div class="col-md-8 col-sm-8 col-xs-12">
                                <input type="datetime-local" class="form-control" name="rent_return_vehicle_date" id="rent_return_vehicle_date" placeholder="Tanggal Pengembalian" autocomplete="off" required />
                            </div>
                        </div> 
                </div>
                <div class="modal-footer">	      		
                    <div class="form-group col-md-12 col-sm-12 col-xs-12"> 	
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" value="{{$rent->rent_id}}" id="rent_return_id" name="rent_return_id">
                        <div class="col-md-7 col-sm-7 col-xs-12">
                        </div>
                        <div class="col-md-2 col-sm-2 col-xs-12">
                            <a type="button" data-dismiss="modal" class="btn btn-round btn-block btn-default pull-right">Cancel</a>
                        </div>
                        <div class="col-md-2 col-sm-2 col-xs-12">
                            <button type="submit" class="btn btn-round btn-success btn-block pull-left">Save</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection