<div class="modal fade" id="rent_take_modal" role="dialog" style="overflow-y: auto" aria-labelledby="myLargeModalLabel">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header" >
				<a class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
				<h4 class="modal-title" id="myModalLabel">Pengambilan Mobil Sewa</h4>
			</div>

			<form class="form-horizontal form-label-left" enctype="multipart/form-data" action="{{ url('TakeRent') }}" method="POST">
				<div class="modal-body">
					<div class="row">
						<div class="form-group">
						    <label class="control-label col-md-3 col-sm-3 col-xs-12">Pilih Mobil<span class="required"> *</span></label>
						    <div class="col-md-8 col-sm-8 col-xs-12">
                                <select class="form-control selectpicker" id="rent_take_vehicle" name="rent_take_vehicle" autocomplete="off" style="width:100%" readonly>
                                    <option value="">-- Pilih Mobil --</option>
                                    @foreach($dataref as $getdata)
                                        <option value="{{ $getdata->ref_id }}">{{ $getdata->ref_plat }} | {{ $getdata->ref_merk }} - {{ $getdata->ref_model }} | {{ number_format($getdata->ref_price) }}</option>
                                    @endforeach
                                </select>
						    </div>
						</div>
                    </div>
                    <div class="row">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Pilih Tanggal Sewa<span class="required"> *</span></label>
                        <div class="input-group col-md-8" style="padding-left: 7px; padding-right: 2px">
                            <input type="date" class="form-control" style="text-align:center" id="rent_start_date" name="rent_start_date"
                            value="" readonly>

                            <div class="input-group-addon">hingga</div>

                            <input type="date" class="form-control" style="text-align:center" id="rent_end_date" name="rent_end_date"
                            value="" readonly>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">Date<span class="required"> *</span></label>
                            <div class="col-md-8 col-sm-8 col-xs-12">
                                <input type="datetime-local" class="form-control" name="rent_take_vehicle_date" id="rent_take_vehicle_date" placeholder="Tanggal Pengambilan" autocomplete="off" required />
                            </div>
                        </div> 
                    </div>
		      		<span class="required"><font size="2px">(*) is a mandatory field</font></span>
		      	</div>

		      	<div class="modal-footer">	      		
	      			<div class="form-group col-md-12 col-sm-12 col-xs-12"> 	
	      				<input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" id="rent_take_id" name="rent_take_id">
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
</div>