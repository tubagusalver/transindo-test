@extends('layouts.layout')
@section('main_container')
	<div class="row">
	    <div class="col-lg-12">
	        <h2 class="page-header">Data Penyewaan Mobil</h2>
	    </div>
        <div class="col-lg-12">
            <a type="button" class="btn btn-success" data-toggle="modal" data-target="#rent_add_modal" onclick=""><i class="fa fa-plus"></i> Request Sewa Mobil</a>
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
                    <table width="100%" class="table table-striped table-bordered table-hover" id="RentListTable">
                        <thead>
                            <tr>
                                <th width="3%" style="text-align: center;">No.</th>
                                <th width="9%" style="text-align: center;">Merk</th>
                                <th width="9%" style="text-align: center;">Model</th>
                                <th width="" style="text-align: center;">Nomor Polisi</th>
                                <th width="12%" style="text-align: center;">Mulai Sewa</th>
                                <th width="12%" style="text-align: center;">Selesai Sewa</th>
                                <th width="9%" style="text-align: center;">Oleh</th>
                                <th width="9%" style="text-align: center;">Status</th>
                                <th width="12%" style="text-align: center;">Pengambilan Mobil Sewa</th>
                                <th width="12%" style="text-align: center;">Pengembalian Mobil Sewa</th>
                                <th width="9%" style="text-align: center;">Action</th>
                            </tr>
                        </thead>
                        @php $no=0; @endphp
                        <tbody>
                          @foreach($rent as $getData)
                            @php $no++; @endphp					
                            <tr>
                              <td style="text-align: center;">{{ $no }}</td>
                              <td>{{ $getData->ref_merk }}</td>
                              <td>{{ $getData->ref_model }}</td>
                              <td style="text-align: center;">{{ $getData->ref_plat }}</td>
                              <td style="text-align: center;">{{ date("d F Y", strtotime($getData->rent_start_date)) }}</td>
                              <td style="text-align: center;">{{ date("d F Y", strtotime($getData->rent_end_date)) }}</td>
                              <td style="text-align: center;">{{ $getData->rent_created_name }}</td>
                              <td style="text-align: center;">{{ $getData->rent_status }}</td>
                              <td style="text-align: center;">@if($getData->rent_take_date) {{ date("d F Y | H:i", strtotime($getData->rent_take_date)) }} @else - @endif</td>
                              <td style="text-align: center;">@if($getData->rent_return_date) {{ date("d F Y | H:i", strtotime($getData->rent_return_date)) }} @else - @endif</td>
                              <td style="text-align: center;">
                                @if($getData->rent_status == 'Sudah dipesan')
                                    <button type="button" class="btn btn-success"  data-toggle="modal" data-target="#rent_take_modal" onclick="
                                        rent_take_modal('{{ $getData->rent_id }}'
                                            , '{{ $getData->rent_vehicle_id }}')">
                                            <i class="fa fa-key"></i>
                                    </button>
                                    <button type="button" class="btn btn-warning"  data-toggle="modal" data-target="#rent_update_modal" onclick="
                                        rent_update_modal('{{ $getData->rent_id }}'
                                            , '{{ $getData->rent_vehicle_id }}'
                                            , '{{ $getData->rent_start_date }}'
                                            , '{{ $getData->rent_end_date }}'
                                            , '{{ $getData->rent_status }}')">
                                            <i class="fa fa-pencil"></i>
                                    </button>
                                    <button type="button" class="btn btn-danger" data-toggle="tooltip" title="Menghapus Mobil"
                                        onclick="rent_delete_modal('{{ $getData->rent_id }}')">
                                            <i class="fa fa-trash"></i>
                                    </button>
                                @elseif($getData->rent_status == 'Sedang disewa')
                                    <a type="button" class="btn btn-info" 
                                        href="{{ url('ReturnRentDetail?rent_id='.$getData->rent_id) }}">
                                        <i class="fa fa-eye"></i>
                                    </a>
                                @endif
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
            $('#RentListTable').DataTable({
                responsive: true,
                "aaSorting": [],
            });
        });

        function rent_update_modal(rent_id, rent_vehicle_id, rent_start_date, rent_end_date, rent_status){
            $('#rent_update_id').val(rent_id);
            $('#rent_start_date').val(rent_start_date);
            $('#rent_end_date').val(rent_end_date);
            $('#rent_update_vehicle').val(rent_vehicle_id).change();
        }
        
        function rent_take_modal(rent_id, rent_vehicle_id){
            $('#rent_take_id').val(rent_id);
            $('#rent_take_vehicle').val(rent_vehicle_id).change();
        }
        function rent_delete_modal(rent_id){
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
                          url: "DeleteRent?rent_id="+rent_id,
                          type: "GET",
                          success: function (data) {}         
                      });
                  swal("Poof! The rent request has been deleted!", {
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
  @include('rent.modal.add')
  @include('rent.modal.update')
  @include('rent.modal.take')
  @include('rent.modal.return')
@endsection
