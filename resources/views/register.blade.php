<div class="row">
        <div class="col-lg-12">
	        <h2 class="page-header">Registrasi</h2>
	    </div>
        <div class="row">
            <form class="form-horizontal form-label-left" enctype="multipart/form-data" action="{{ url('RegisterAccount') }}" method="POST">
                <div class="modal-body">
                    <div class="row">
					    <div class="form-group">
						    <label class="control-label col-md-3 col-sm-3 col-xs-12">Email<span class="required"> *</span></label>
						    <div class="col-md-8 col-sm-8 col-xs-12">
						        <input type="email" class="form-control" id="registrasi_email" name="registrasi_email" required>
						    </div>
						</div>
                    </div>
                    <div class="row">
					    <div class="form-group">
						    <label class="control-label col-md-3 col-sm-3 col-xs-12">Password<span class="required"> *</span></label>
						    <div class="col-md-8 col-sm-8 col-xs-12">
						        <input type="password" class="form-control" id="registrasi_password" name="registrasi_password" required>
						    </div>
						</div>
                    </div>
                    <div class="row">
					    <div class="form-group">
						    <label class="control-label col-md-3 col-sm-3 col-xs-12">Nama<span class="required"> *</span></label>
						    <div class="col-md-8 col-sm-8 col-xs-12">
						        <input class="form-control" id="registrasi_nama" name="registrasi_nama" required>
						    </div>
						</div>
                    </div>
                    <div class="row">
                        <div class="form-group">
						    <label class="control-label col-md-3 col-sm-3 col-xs-12">Alamat<span class="required"> *</span></label>
						    <div class="col-md-8 col-sm-8 col-xs-12">
                                <input class="form-control" id="registrasi_alamat" name="registrasi_alamat" required>
						    </div>
						</div>
                    </div>
                    <div class="row">
                        <div class="form-group">
						    <label class="control-label col-md-3 col-sm-3 col-xs-12">Nomor Telepon<span class="required"> *</span></label>
                            <div class="col-md-8 col-sm-8 col-xs-12">
                                <input class="form-control" id="registrasi_nomortelepon" name="registrasi_nomortelepon" required>
                            </div>
						</div>
                    </div>
                    <div class="row">
                        <div class="form-group">
							<label class="control-label col-md-3 col-sm-3 col-xs-12">Nomor SIM<span class="required"> *</span></label>
                            <div class="col-md-8 col-sm-8 col-xs-12">
                                <input class="form-control" id="registrasi_nomorsim" name="registrasi_nomorsim" required>
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