<div class="modal fade" id="ref_add_modal" role="dialog" style="overflow-y: auto" aria-labelledby="myLargeModalLabel">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header" >
				<a class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
				<h4 class="modal-title" id="myModalLabel">Tambah Mobil Baru</h4>
			</div>

			<form class="form-horizontal form-label-left" enctype="multipart/form-data" action="{{ url('AddDataRef') }}" method="POST">
				<div class="modal-body">
					<div class="row">
						<div class="form-group">
						    <label class="control-label col-md-3 col-sm-3 col-xs-12">Merk Mobil<span class="required"> *</span></label>
						    <div class="col-md-8 col-sm-8 col-xs-12">
						        <input class="form-control" id="dataref_add_merk" name="dataref_add_merk" required>
						    </div>
						</div>
                    </div>
                    <div class="row">
                        <div class="form-group">
						    <label class="control-label col-md-3 col-sm-3 col-xs-12">Model Mobil<span class="required"> *</span></label>
						    <div class="col-md-8 col-sm-8 col-xs-12">
                                <input class="form-control" id="dataref_add_model" name="dataref_add_model" required>
						    </div>
						</div>
                    </div>
                    <div class="row">
                        <div class="form-group">
						    <label class="control-label col-md-3 col-sm-3 col-xs-12">Nomor Polisi/Plat<span class="required"> *</span></label>
                            <div class="col-md-8 col-sm-8 col-xs-12">
                                <input class="form-control" id="dataref_add_nomor_polisi" name="dataref_add_nomor_polisi" required>
                            </div>
						</div>
                    </div>
                    <div class="row">
                        <div class="form-group">
							<label class="control-label col-md-3 col-sm-3 col-xs-12">Harga Sewa<span class="required"> *</span></label>
                            <div class="col-md-6 col-sm-6 col-xs-10">
                                <input size="10" class="form-control money" id="dataref_add_price" name="dataref_add_price" required>
                            </div>
                            <div class="col-md-2 col-sm-2 col-xs-2">
                                <label class="control-label">IDR</label>
                            </div>
						</div>
                    </div>
		      		<span class="required"><font size="2px">(*) is a mandatory field</font></span>
		      	</div>

		      	<div class="modal-footer">	      		
	      			<div class="form-group col-md-12 col-sm-12 col-xs-12"> 	
	      				<input type="hidden" name="_token" value="{{ csrf_token() }}">
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