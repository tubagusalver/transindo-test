@extends('layouts.layout')
@section('main_container')
	<div class="row">
	    <div class="col-lg-12">
	        <h2 class="page-header">Data Referensi Mobil</h2>
	    </div>
        <div class="col-lg-12">
            <a type="button" class="btn btn-success" data-toggle="modal" data-target="#ref_add_modal" onclick=""><i class="fa fa-plus"></i> Tambah Mobil Baru</a>
		</div>
	    <div class="col-lg-12"><br>
      		<div class="panel panel-default">
                <!-- /.panel-heading -->
                <div class="panel-body">
                        @if (session('alert'))
                            <div class="alert alert-danger alert-dismissable">
                                {{ session('alert') }}
                            </div>
                        @endif
                        @if (session('success'))
                            <div class="alert alert-success alert-dismissable">
                                {{ session('success') }}
                            </div>
                        @endif
                    <table width="100%" class="table table-striped table-bordered table-hover" id="DataRefTable">
                        <thead>
                            <tr>
                                <th width="3%" style="text-align: center;">No.</th>
                                <th width="9%" style="text-align: center;">Merk</th>
                                <th width="9%" style="text-align: center;">Model</th>
                                <th width="" style="text-align: center;">Nomor Polisi</th>
                                <th width="12%" style="text-align: center;">Harga Sewa</th>
                                <th width="9%" style="text-align: center;">Status</th>
                                <th width="9%" style="text-align: center;">Action</th>
                            </tr>
                        </thead>
                        @php $no=0; @endphp
                        <tbody>
                          @foreach($dataref as $getData)
                            @php $no++; @endphp					
                            <tr>
                              <td style="text-align: center;">{{ $no }}</td>
                              <td>{{ $getData->ref_merk }}</td>
                              <td>{{ $getData->ref_model }}</td>
                              <td style="text-align: center;">{{ $getData->ref_plat }}</td>
                              <td style="text-align: right;">{{ number_format($getData->ref_price) }}</td>
                              <td style="text-align: center;">{{ $getData->ref_status }}</td>
                              <td style="text-align: center;">
                                <button type="button" class="btn btn-warning"  data-toggle="modal" data-target="#ref_update_modal" onclick="
                                    ref_update_modal('{{ $getData->ref_id }}'
                                        , '{{ $getData->ref_merk }}'
                                        , '{{ $getData->ref_model }}'
                                        , '{{ $getData->ref_price }}'
                                        , '{{ $getData->ref_plat }}'
                                        , '{{ $getData->ref_status }}')">
                                        <i class="fa fa-pencil"></i>
                                </button>
                                <button type="button" class="btn btn-danger" data-toggle="tooltip" title="Menghapus Mobil"
                                    onclick="ref_delete_modal('{{ $getData->ref_id }}')">
                                        <i class="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>

                        @endforeach
                        </tbody>
                    </table>
                    <!-- /.table-responsive -->
                </div>
                <!-- /.panel-body -->
            </div>
        </div>
    </div>

    <script>
        $(document).ready(function () {
            $('.money').autoNumeric("init", {
                aSep: ',',
                unSetOnSubmit: true
            });

            $('#DataRefTable').DataTable({
                responsive: true,
                "aaSorting": [],
            });
        });

        function ref_update_modal(ref_id, ref_merk, ref_model, ref_price, ref_plat, ref_status){
            $('#dataref_update_id').val(ref_id);
            $('#dataref_update_merk').val(ref_merk);
            $('#dataref_update_model').val(ref_model);
            $('#dataref_update_nomor_polisi').val(ref_plat);
            $('#dataref_update_price').val(ref_price);
            $('#dataref_update_status').val(ref_status);
        }

        function ref_delete_modal(ref_id){
            swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this entry !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                  $.ajax({
                          url: "DeleteDataRef?ref_id="+ref_id,
                          type: "GET",
                          success: function (data) {}         
                      });
                  swal("Poof! The vehicle has been deleted!", {
                  icon: "success",
                  }).then(function () {
                      location.reload();
                  });
                } 
            });
        };
    </script>
@endsection

@section('modal-content')
  @include('dataref.modal.add')
  @include('dataref.modal.update')
@endsection
