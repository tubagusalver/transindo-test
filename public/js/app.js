
$('.selectpicker').select2({
    theme: "bootstrap"
});

$('#strava_start_add').datepicker({
    format: 'yyyy-mm-dd',
    autoclose: true,
});
$('#strava_start_update').datepicker({
    format: 'yyyy-mm-dd',
    autoclose: true,
});
$('.datepicker').datepicker({
    format: 'yyyy-mm-dd',
    autoclose: true,
});

////////////////////////////////////START MEDICAL CLAIM//////////////////////////////////////////////////////////
$(document).ready(function(){

  $('#StravaTable').DataTable({
    responsive: true,
    "aaSorting": []
  });
  $('#table-strava-activity-list').DataTable({
    processing: true,
    serverSide: true,
    ajax: 'https://frappe.tracon.co.id/GetStravaActivityList',
    columns: [
      {
        data: 'DT_RowIndex', name: 'DT_RowIndex', searchable: false, orderable: false
      },
      {
        data: 'act_startdate', name: 'act_startdate', visible: false
      },
      {
        data: 'date', name: 'date', orderable: false,
      },
      {
        data: 'employee_name', name: 'employee_name', orderable: true,
      },
      {
        data: 'act_name', name: 'act_name', orderable: true,
      },
      {
        data: 'type', name: 'type', orderable: true, className: "text-center"
      },
      {
        data: 'distance', name: 'distance', orderable: true,
      },
      {
        data: 'duration', name: 'duration', orderable: true,
      },
      {
        data: 'action', name: 'action', className: "text-center",
      }
    ],
    order: [[1, "desc"]],
  });

  $('#MedicalClaimTable').DataTable({
    responsive: true,
    "aaSorting": [],
      orderCellsTop: true,
      fixedHeader: true,
      dom: 'Bfrtip',
      buttons: ['copy', 'excel', 'pdf', 'print']
  });

    $('#claim_amount_add').autoNumeric("init", {
      aSep: '.',
      aDec: ',',
      vMin: '0',
      unSetOnSubmit: true
    });

    $('#patient_name_update_div').hide();
    $('#patient_name_update').prop('required',false);
    
    $('#receipt_date_add').datepicker({
        format: 'yyyy-mm-dd',
        startDate: '-1M',
        endDate: new Date,
        autoclose: true
    });

    $('#receipt_date_update').datepicker({
        format: 'yyyy-mm-dd',
        startDate: '-1M',
        endDate: new Date,
        autoclose: true
    });

    $('.modal').on('hidden.bs.modal', function(e)
      { 
          $(this).find('form')[0].reset();
          $('.selectpicker').select2('destroy');
          $('.selectpicker').select2({
            theme: "bootstrap"
          });
          $('#patient_name_add').prop('disabled',true);
      }) ;

    $('#patient_relationship_add').change(function(){
        var PATIENT_RELATIONSHIP = $('#patient_relationship_add').val();
        $.ajax({
          url: "getPatientName",
          type: "GET",
          data: "PATIENT_RELATIONSHIP="+PATIENT_RELATIONSHIP,
          cache: false,
          success: function(data){
            var obj = $.parseJSON(data);
            $("select#patient_name_add").prop('disabled', false).html(obj.opt);
          }
        }); 
    });

    $('#patient_relationship_update').change(function(){

        $('#patient_name_update_div').show();
        $('#patient_name_disabled_update_div').hide();
        $('#patient_name_update').prop('required',true);
        var PATIENT_RELATIONSHIP = $('#patient_relationship_update').val();
        $.ajax({
          url: "getPatientName",
          type: "GET",
          data: "PATIENT_RELATIONSHIP="+PATIENT_RELATIONSHIP,
          cache: false,
          success: function(data){
            var obj = $.parseJSON(data);
            $("select#patient_name_update").html(obj.opt);
          }
        }); 
    });

});

$('button#medicaldelete').on('click', function(ID){
    var ID = $(this).attr('data-id');
    swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this claim !",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
      if (willDelete) {
        $.ajax({
                url: "MedicalDelete?ID="+ID,
                type: "GET",
                success: function (data) {}         
            });
        swal("Poof! Medical Claim request has been deleted!", {
          icon: "success",
        }).then(function () {
            location.reload();
        });
      } 
  });
});

function medical_update_modal(ID, CLAIMDATE, EMPL_ID, PATIENTRELATIONSHIP, EMPLFAM_ID, PATIENTNAME, CLAIM_TYPE, CLAIMAMOUNT, MEDICALPARTNER, CLAIMTYPE) {

      $.ajax({
          url: "getPatientName",
          type: "GET",
          data: "PATIENT_RELATIONSHIP="+PATIENTRELATIONSHIP,
          cache: false,
          success: function(data){
            var obj = $.parseJSON(data);
            $("select#patient_name_update").html(obj.opt);
          }
      }); 

      $('#medical_id_update').val(ID)
      $('#patient_name_disabled_update').val(PATIENTNAME)
      $('#receipt_date_update').val(CLAIMDATE);
      $('#patient_relationship_update').val(PATIENTRELATIONSHIP);
      $('#claim_type_update').val(CLAIM_TYPE);

      $('#claim_amount_update').autoNumeric("init", {
          aSep: '.',
          aDec: ',',
          vMin: '0',
          mDec: '0',
          unSetOnSubmit: true
      });
      $('#claim_amount_update').autoNumeric('set', CLAIMAMOUNT);
      $('#partner_type_update').val(MEDICALPARTNER);
      $('#claim_type_update').val(CLAIMTYPE);
      $('.selectpicker').select2('destroy');
      $('.selectpicker').select2({
          theme: "bootstrap"
      });

}

function medical_info_modal(ID, CLAIMDATE, EMPL_ID, PATIENTRELATIONSHIP, EMPLFAM_ID, PATIENTNAME, CLAIM_TYPE, CLAIMAMOUNT, MEDICALPARTNER, CLAIMTYPE, PAIDAMOUNT, REJECTAMOUNT, REJECTAMOUNTREASON) {
      
      $('#medical_id_info').val(ID)
      $('#receipt_date_info').val(CLAIMDATE);
      $('#patient_relationship_info').val(PATIENTRELATIONSHIP);
      $('#patient_name_info').val(PATIENTNAME);
      $('#claim_type_info').val(CLAIM_TYPE);
      $('#claim_amount_info').val(CLAIMAMOUNT);
      $('#partner_type_info').val(MEDICALPARTNER);
      $('#claim_type_info').val(CLAIMTYPE);
      $('#paid_amount_info').val(PAIDAMOUNT);
      $('#reject_amount_info').val(REJECTAMOUNT);
      $('#reject_reason_info').val(REJECTAMOUNTREASON);
      $('.selectpicker').select2('destroy');
      $('.selectpicker').select2({
          theme: "bootstrap"
      });
      $('.numeric').autoNumeric("init", {
          aSep: '.',
          aDec: ',',
          vMin: '0',
          mDec: '0',
          unSetOnSubmit: true
      });

}

////////////////////////////////////////////////END MEDICAL CLAIM///////////////////////////////////////////////////

//////////////////////////////////////////////START LEAVE REQUEST///////////////////////////////////////////////////

$(document).ready(function(){

    $('#LeaveRequestTable').DataTable({
        responsive: true,
        "aaSorting": [],
    });
    $('#LeaveApprovalTable').DataTable({
        responsive: true,
        "aaSorting": [],
    });
    $('#leave_over_add_div').hide();
});

$('.modal').on('hidden.bs.modal', function(e)
{ 
    $(this).find('form')[0].reset();
    $('.selectpicker').select2('destroy');
    $('.selectpicker').select2({
      theme: "bootstrap"
    });
    $('#patient_name_add').prop('disabled',true);
    $('#leave_start_periode_add').prop('disabled',true);
    $('#leave_end_periode_add').prop('disabled',true);
    $('#leave_substitute_add').prop('disabled',true);
    $('#leave_approval_add').prop('disabled',true);
    $('#leave_over_add_div').hide();
}) ;

$('.input-daterange input').each(function() {
    $(this).datepicker({
        format: 'yyyy-mm-dd',
        startDate: '+1d',
        autoclose: true
    });
});


$('#leave_start_periode_add').on("change", function(){
   //when chosen from_date, the end date can be from that point forward
   var startVal = $('#leave_start_periode_add').val();
   $('#leave_end_periode_add').data('datepicker').setStartDate(startVal);
});

$('#leave_end_periode_add').on("change", function(){
   //when chosen end_date, start can go just up until that point
   var endVal = $('#leave_end_periode_add').val();
   $('#leave_start_periode_add').data('datepicker').setEndDate(endVal );
});

$('#leave_start_periode_update').on("change", function(){
   //when chosen from_date, the end date can be from that point forward
   var startVal = $('#leave_start_periode_update').val();
   $('#leave_end_periode_update').data('datepicker').setStartDate(startVal);
});
$('#leave_end_periode_update').on("change", function(){
   //when chosen end_date, start can go just up until that point
   var endVal = $('#leave_end_periode_update').val();
   $('#leave_start_periode_update').data('datepicker').setEndDate(endVal );
});


$('button#leavedelete').on('click', function(ID){
    var ID = $(this).attr('data-id');
    swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this request !",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
      if (willDelete) {
        $.ajax({
                url: "LeaveDelete?ID="+ID,
                type: "GET",
                success: function (data) {}         
            });
        swal("Poof! Your leave request has been deleted!", {
          icon: "success",
        }).then(function () {
            location.reload();
        });
      } 
  });
});


function leave_trace_modal(REQUEST_ID) {

    $.ajax({
        url: "getApprovalTrace",
        type: "GET",
        data: "REQUEST_ID="+REQUEST_ID,
        success: function(data){
          var obj = $.parseJSON(data);
          $("#tbody_leave_trace").html(obj.content);
        }
    }); 

}


function leave_update_modal(REQUEST_ID, START_DATE, END_DATE, POL_ID, DAY, REASON, HANDOVERTOID, EMPL_ADDRESS, EMPL_PHONE, LEAVEAPP_EMPL_ID) {

      $('#leave_id_update').val(REQUEST_ID);
      $('#leave_start_periode_update').val(START_DATE);
      $('#leave_end_periode_update').val(END_DATE);
      $('#leave_type_update').val(POL_ID);
      $('#leave_day_update').val(DAY);
      $('#leave_purpose_update').val(REASON);
      $('#leave_substitute_update').val(HANDOVERTOID);
      $('#leave_address_update').val(EMPL_ADDRESS);
      $('#leave_phone_update').val(EMPL_PHONE);
      $('#leave_approval_update').val(LEAVEAPP_EMPL_ID);
      $('.selectpicker').select2('destroy');
      $('.selectpicker').select2({
          theme: "bootstrap"
      });

}

function leave_approve_modal(REQUEST_ID) {
      $('#leave_id_approve').val(REQUEST_ID);
}

function leave_reject_modal(REQUEST_ID) {
      $('#leave_id_reject').val(REQUEST_ID);
}

$('#leave_type_add').change(function(){

    $("#leave_start_periode_add").prop('disabled', false);
    $("#leave_end_periode_add").prop('disabled', false);
    $('#leave_end_periode_add').val('').datepicker('update');
    $('#leave_start_periode_add').val('').datepicker('update');
    $('#leave_day_add').val('');
    $("#leave_substitute_add").prop('disabled', true);
    $("#leave_approval_add").prop('disabled', true);

    var LEAVE_TYPE = $('#leave_type_add').val();
    $.ajax({
      url: "getLeaveQuota",
      type: "GET",
      data: "LEAVE_TYPE="+LEAVE_TYPE,
      cache: false,
      success: function(data){
        var obj = $.parseJSON(data);
        $("#leave_quota_add").val(obj.content);
      }
    }); 
});

$('#leave_day_add').change(function(){

    var LEAVE_DAY = $('#leave_day_add').val();
    var LEAVE_QUOTA = $('#leave_quota_add').val();
    var LEAVE_START = $('#leave_start_periode_add').val();
    var LEAVE_END = $('#leave_end_periode_add').val();

    $.ajax({
      url: "checkLeaveQuota",
      type: "GET",
      data: "LEAVE_DAY="+LEAVE_DAY + "&LEAVE_QUOTA="+LEAVE_QUOTA + "&LEAVE_START="+LEAVE_START + "&LEAVE_END="+LEAVE_END,
      cache: false,
      success: function(data){
        var obj = $.parseJSON(data);
        console.log(obj);
        if(obj < 0){
          $('#leave_end_periode_add').val('').datepicker('update');
          $('#leave_over_add_div').show();
        }
      }
    });
});

$('#leave_end_periode_add').change(function(){

    var LEAVE_START = $('#leave_start_periode_add').val();
    var LEAVE_END = $('#leave_end_periode_add').val();

    $.ajax({
      url: "getLeaveDay",
      type: "GET",
      data: "LEAVE_START="+LEAVE_START + "&LEAVE_END="+LEAVE_END,
      cache: false,
      success: function(data){
        var obj = $.parseJSON(data);
        $("#leave_day_add").val(obj.content);
      }
    }); 

    var LEAVE_DAY = $('#leave_day_add').val();
    var LEAVE_QUOTA = $('#leave_quota_add').val();
    $.ajax({
      url: "checkLeaveQuota",
      type: "GET",
      data: "LEAVE_DAY="+LEAVE_DAY + "&LEAVE_QUOTA="+LEAVE_QUOTA + "&LEAVE_START="+LEAVE_START + "&LEAVE_END="+LEAVE_END,
      cache: false,
      success: function(data){
        var obj = $.parseJSON(data);
        console.log(obj);
        if(obj < 0){
          $('#leave_end_periode_add').val('').datepicker('update');
          $('#leave_over_add_div').show();
        }
      }
    }); 

     
      $.ajax({
        url: "getEmployeePresence",
        type: "GET",
        data: "LEAVE_START="+LEAVE_START + "&LEAVE_END="+LEAVE_END,
        cache: false,
        success: function(data){
          var obj = $.parseJSON(data);
          $("select#leave_substitute_add").prop('disabled', false).html(obj.opt);
        }
      });

      $.ajax({
        url: "getEmployeePresenceApproval",
        type: "GET",
        data: "LEAVE_START="+LEAVE_START + "&LEAVE_END="+LEAVE_END,
        cache: false,
        success: function(data){
          var obj = $.parseJSON(data);
          $("select#leave_approval_add").prop('disabled', false).html(obj.opt);
        }
      }); 

    $('#leave_start_periode_add').change(function(){

      var LEAVE_START = $('#leave_start_periode_add').val();
      var LEAVE_END = $('#leave_end_periode_add').val();
      $.ajax({
        url: "getLeaveDay",
        type: "GET",
        data: "LEAVE_START="+LEAVE_START + "&LEAVE_END="+LEAVE_END,
        cache: false,
        success: function(data){
          var obj = $.parseJSON(data);
          $("#leave_day_add").val(obj.content);
        }
      }); 

      var LEAVE_DAY = $('#leave_day_add').val();
      var LEAVE_QUOTA = $('#leave_quota_add').val();
      $.ajax({
        url: "checkLeaveQuota",
        type: "GET",
        data: "LEAVE_DAY="+LEAVE_DAY + "&LEAVE_QUOTA="+LEAVE_QUOTA + "&LEAVE_START="+LEAVE_START + "&LEAVE_END="+LEAVE_END,
        cache: false,
        success: function(data){
          var obj = $.parseJSON(data);
          console.log(obj);
          if(obj < 0){
            $('#leave_end_periode_add').val('').datepicker('update');
            $('#leave_over_add_div').show();
          }
        }
      });

       $.ajax({
        url: "getEmployeePresence",
        type: "GET",
        data: "LEAVE_START="+LEAVE_START + "&LEAVE_END="+LEAVE_END,
        cache: false,
        success: function(data){
          var obj = $.parseJSON(data);
          $("select#leave_substitute_add").prop('disabled', false).html(obj.opt);
        }
      }); 

      $.ajax({
        url: "getEmployeePresenceApproval",
        type: "GET",
        data: "LEAVE_START="+LEAVE_START + "&LEAVE_END="+LEAVE_END,
        cache: false,
        success: function(data){
          var obj = $.parseJSON(data);
          $("select#leave_approval_add").prop('disabled', false).html(obj.opt);
        }
      });  
    });

});


//////////////////////////////////////////////PACKAGE DELIVERY//////////////////////////////////////////////

$('#table-shipment-list').DataTable({
  processing: true,
  serverSide: true,
  ajax: 'https://frappe.tracon.co.id/GetShipmentList',
  columns: [
    {
      data: 'DT_RowIndex', name: 'DT_RowIndex', searchable: false, orderable: false, className: "text-center"
    },
    {
      data: 'SHM_NO', name: 'SHM_NO', className: "text-center"
    },
    {
      data: 'date', name: 'date', className: "text-center"
    },
    {
      data: 'EMPL_NAME', name: 'EMPL_NAME'
    },
    {
      data: 'SHM_STATUS', name: 'SHM_STATUS', orderable: false, className: "text-center"
    },
    {
      data: 'sent_date', name: 'sent_date', className: "text-center"
    },
    {
      data: 'action', name: 'action', orderable: true,className: "text-center"
    }
  ],
  fixedHeader: true,
      dom: 'Bfrtip',
      buttons: [
          {
             extend: 'copy',
             footer: true,
             exportOptions: {
                  columns: [0,1,2,3,4,5]
              }
         },
          {
             extend: 'excel',
             footer: true,
             exportOptions: {
                  columns: [0,1,2,3,4,5]
              }
         },
          {
             extend: 'pdf',
             footer: true,
             exportOptions: {
                  columns: [0,1,2,3,4,5]
              }
         },
          {
             extend: 'print',
             footer: true,
             exportOptions: {
                  columns: [0,1,2,3,4,5]
              }
         }
      ]
});

$(document).ready(function(){
    $('#shipment_package_add').multiSelect();
    $('#shipment_package_update').multiSelect();

    $('#shipment_file_update_div').hide('150');
    $('#shipment_status_update').change(function(){
        if($('#shipment_status_update').val() == 'RECEIVED ON DESTINATION'){
            $('#shipment_file_update_div').show('150');
        }
        else{
            $('#shipment_file_update_div').hide('150');
        }
    });

});

// $('button#shipmentdelete').on('click', function(SHM_ID){
//     var SHM_ID = $(this).attr('data-id');
//     swal({
//     title: "Are you sure?",
//     text: "Once deleted, you will not be able to recover this shipment !",
//     icon: "warning",
//     buttons: true,
//     dangerMode: true,
//   })
//   .then((willDelete) => {
//       if (willDelete) {
//         $.ajax({
//                 url: "ShipmentDelete?SHM_ID="+SHM_ID,
//                 type: "GET",
//                 success: function (data) {}         
//             });
//         swal("Poof! The shipment has been deleted!", {
//           icon: "success",
//         }).then(function () {
//             location.reload();
//         });
//       } 
//   });
// });

function shipmentdelete(SHM_ID) {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this shipment !",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      $.ajax({
              url: "ShipmentDelete?SHM_ID="+SHM_ID,
              type: "GET",
              success: function (data) {}         
          });
      swal("Poof! The shipment has been deleted!", {
        icon: "success",
      }).then(function () {
          location.reload();
      });
    } 
  });
}

$('#shipment_package_add').multiSelect({
  selectableHeader: "<input type='text' class='search-input form-control' autocomplete='off' placeholder='Cari paket'>",
  selectionHeader: "<input type='text' class='search-input form-control' autocomplete='off' placeholder='Cari paket'>",
  afterInit: function(ms){
    var that = this,
        $selectableSearch = that.$selectableUl.prev(),
        $selectionSearch = that.$selectionUl.prev(),
        selectableSearchString = '#'+that.$container.attr('id')+' .ms-elem-selectable:not(.ms-selected)',
        selectionSearchString = '#'+that.$container.attr('id')+' .ms-elem-selection.ms-selected';

    that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
    .on('keydown', function(e){
      if (e.which === 40){
        that.$selectableUl.focus();
        return false;
      }
    });

    that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
    .on('keydown', function(e){
      if (e.which == 40){
        that.$selectionUl.focus();
        return false;
      }
    });
  },
  afterSelect: function(){
    this.qs1.cache();
    this.qs2.cache();
  },
  afterDeselect: function(){
    this.qs1.cache();
    this.qs2.cache();
  }
});

$('#shipment_package_update').multiSelect({
  selectableHeader: "<input type='text' class='search-input form-control' autocomplete='off' placeholder='Cari paket'>",
  selectionHeader: "<input type='text' class='search-input form-control' autocomplete='off' placeholder='Cari paket'>",
  afterInit: function(ms){
    var that = this,
        $selectableSearch = that.$selectableUl.prev(),
        $selectionSearch = that.$selectionUl.prev(),
        selectableSearchString = '#'+that.$container.attr('id')+' .ms-elem-selectable:not(.ms-selected)',
        selectionSearchString = '#'+that.$container.attr('id')+' .ms-elem-selection.ms-selected';

    that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
    .on('keydown', function(e){
      if (e.which === 40){
        that.$selectableUl.focus();
        return false;
      }
    });

    that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
    .on('keydown', function(e){
      if (e.which == 40){
        that.$selectionUl.focus();
        return false;
      }
    });
  },
  afterSelect: function(){
    this.qs1.cache();
    this.qs2.cache();
  },
  afterDeselect: function(){
    this.qs1.cache();
    this.qs2.cache();
  }
});


function shipment_detail_modal(SHM_ID, SHM_NO, SHM_DATE, EMPL_NAME, SHM_STATUS) {
    $('#shipment_id_detail').val(SHM_ID);
    $('#shipment_no_detail').val(SHM_NO);
    $('#shipment_date_detail').val(SHM_DATE);
    $('#shipment_courier_detail').val(EMPL_NAME);
    $('#shipment_status_detail').val(SHM_STATUS);

    $.ajax({
        url: "getShipmentPackage",
        type: "GET",
        data: "SHM_ID="+SHM_ID,
        success: function(data){
          var obj = $.parseJSON(data);
          $("#tbody_shipment_package_detail").html(obj.content);
        }
    }); 
}

function shipment_update_modal(SHM_ID, SHM_NO, SHM_DATE, EMPL_ID, SHM_STATUS) {
    $('#shipment_id_update').val(SHM_ID);
    $('#shipment_no_update').val(SHM_NO);
    $('#shipment_date_update').val(SHM_DATE);
    $('#shipment_courier_update').val(EMPL_ID);
    $('#shipment_courier_update').select2('destroy');
    $('#shipment_courier_update').select2({
        theme: "bootstrap"
    });
    $('#shipment_status_update').val(SHM_STATUS);
    $('#shipment_status_update').select2('destroy');
    $('#shipment_status_update').select2({
        theme: "bootstrap"
    });

    $.ajax({
        url: "getShipmentPackage",
        type: "GET",
        data: "SHM_ID="+SHM_ID,
        success: function(data){
          var obj = $.parseJSON(data);
          $("#tbody_shipment_package_update").html(obj.content);
        }
    }); 
}


$('#delivery_deadline_add').datetimepicker({
        format: "yyyy-mm-dd hh:ii",
        autoclose: true,
        todayBtn: true,
        startDate: new Date,
        minuteStep: 10
});

$('#delivery_deadline_update').datetimepicker({
        format: "yyyy-mm-dd hh:ii",
        autoclose: true,
        todayBtn: true,
        startDate: new Date,
        minuteStep: 10,
        useCurrent:true
});

$('button#deliverydelete').on('click', function(PACK_ID){
    var PACK_ID = $(this).attr('data-id');
    // alert(ID);
    swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this request !",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
      if (willDelete) {
        $.ajax({
                url: "DeliveryDelete?PACK_ID="+PACK_ID,
                type: "GET",
                success: function (data) {}         
            });
        swal("Poof! Your package delivery request has been deleted!", {
          icon: "success",
        }).then(function () {
            location.reload();
        });
      } 
  });
});

function delivery_update_modal(PACK_ID, PACK_NAME, PACK_TYPE, PACK_DESTINATION, PACK_ADDRESS, PACK_COMPANY, PACK_PIC, PACK_DEADLINE, CREATED_BY_NAME, PACK_COURIER_ID) {

      $('#delivery_package_id_update').val(PACK_ID);
      $('#delivery_package_name_update').val(PACK_NAME);
      var type = PACK_TYPE;
      document.getElementById(type).checked = true;
      // $('#delivery_package_type_update').val(PACK_TYPE).prop('checked',true);
      $('#delivery_receiver_location_update').val(PACK_DESTINATION);
      $('#delivery_receiver_address_update').val(PACK_ADDRESS);
      $('#delivery_receiver_company_update').val(PACK_COMPANY);
      $('#delivery_receiver_pic_update').val(PACK_PIC);
      $('#delivery_deadline_update').val(PACK_DEADLINE);
      $('#delivery_sender_name').val(CREATED_BY_NAME);
      $('#delivery_courier_update').val(PACK_COURIER_ID);

      $('.selectpicker').select2('destroy');
      $('.selectpicker').select2({
          theme: "bootstrap"
      });
}

function delivery_detail_modal(PACK_ID, PACK_NAME, PACK_TYPE, PACK_DESTINATION, PACK_ADDRESS, PACK_REMARK, PACK_COMPANY, PACK_PIC, PACK_DEADLINE, CREATED_BY_NAME, PACK_COURIER_ID, PACK_COSTCODE) {

      $('#delivery_package_id_detail').val(PACK_ID);
      $('#delivery_package_name_detail').val(PACK_NAME);
      $('#delivery_package_remark_detail').val(PACK_REMARK);
      // var type = PACK_TYPE;
      // document.getElementById(type).checked = true;
      $('#delivery_package_type_detail').val(PACK_TYPE);
      $('#delivery_receiver_location_detail').val(PACK_DESTINATION);
      $('#delivery_receiver_address_detail').val(PACK_ADDRESS);
      $('#delivery_receiver_company_detail').val(PACK_COMPANY);
      $('#delivery_receiver_pic_detail').val(PACK_PIC);
      $('#delivery_deadline_detail').val(PACK_DEADLINE);
      $('#delivery_sender_name').val(CREATED_BY_NAME);
      $('#delivery_courier_update').val(PACK_COURIER_ID);
      $('#delivery_package_costcode_detail').val(PACK_COSTCODE);

}

function delivery_trace_modal(PACK_REQUEST_NO, DELIVERY_STATUS) {
  if(DELIVERY_STATUS == 'SCHEDULED FOR PICK-UP'){
    var STATUS = 'ON DELIVERY';
    $('#status_button_div').show();
    $('#delivery_status_nth_button').hide();
    $('#remark_div').hide();
    $('#non_remark_div').show();
    $('#delivery_receiver_remark').prop('required',false);
  }
  else if(DELIVERY_STATUS == 'ON DELIVERY'){
    $('#remark_div').show();
    $('#non_remark_div').hide();

    var STATUS = 'RECEIVED ON DESTINATION';
    $('#status_button_div').show();
    $('#delivery_status_nth_button').show();
    $('#delivery_status_nth_button').val('NOT AT HOME');
  }
  else{
    $('#status_button_div').hide();
    $('#delivery_status_nth_button').hide();
  }

    $('#delivery_status_button').val(STATUS);
    $('#delivery_status_button2').val(STATUS);
    $('#status_info').val(STATUS);
    $('#pack_request_no_info').val(PACK_REQUEST_NO);

    $.ajax({
        url: "getDeliveryTrace",
        type: "GET",
        data: "PACK_REQUEST_NO="+PACK_REQUEST_NO,
        success: function(data){
          var obj = $.parseJSON(data);
          $("#tbody_delivery_trace").html(obj.content);
        }
    }); 

}

//////////////////////////////////////////////////////////USER///////////////////////////////////////////

function user_update_modal(EMPL_ID, EMPL_NAME, ROLE_ID) {

      $('#user_id_update').val(EMPL_ID);
      $('#user_name_update').val(EMPL_NAME);
      $('#user_role_update').val(ROLE_ID);
      $('.selectpicker').select2('destroy');
      $('.selectpicker').select2({
          theme: "bootstrap"
      });
}



//////////////////////////////////////////////////////////MEETING ROOM///////////////////////////////////////////

function meetingroom_assign_modal(REQ_ID, REQ_NO, MERRY_ID, REQ_AGENDA, REQ_REMARK, REQ_PARTICIPANT, REQ_START, REQ_END, REF_VALUE, REQ_TYPE) 
{
      console.log('test'+REQ_ID)
      $('#meetingroom_id_assign').val(REQ_ID);
      $('#meetingroom_merryid_assign').val(MERRY_ID);
      $('#meetingroom_agenda_assign').val(REQ_AGENDA);
      $('#meetingroom_remark_assign').val(REQ_REMARK);
      $('#meetingroom_startdate_assign').val(REQ_START);
      $('#meetingroom_enddate_assign').val(REQ_END);
      $('#meetingroom_room_assign').val(REF_VALUE);
      if(REQ_TYPE == 'I')
      {
        $('#meetingroom_type_assign').val('Internal');
      }
      else
      {
        $('#meetingroom_type_assign').val('External');
      }
      // $('#meetingroom_merry_id_assign').val(id);
      var a=[];
      $.ajax({
          url: "getParticipants",
           
          type: "GET",
          data: "REQ_NO="+REQ_NO,
          cache: false,
          success: function(data){
            var obj = $.parseJSON(data);
             
            for(i=0;i<obj.length;i++){
              console.log(obj[i].PAR_EMPL_ID);
              a.push(obj[i].PAR_EMPL_ID);
            }
            
             $('#meetingroom_participants_assign').val(a).trigger("change");
           // $("select#meetingroom_participants_update").html(obj.opt);
          }
      });
}


$('button#meetingroomdelete').on('click', function(REQ_ID){
    var REQ_ID = $(this).attr('data-id');
    // alert(ID);
    swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this request !",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
      if (willDelete) {
        $.ajax({
                url: "MeetingRoomDelete?REQ_ID="+REQ_ID,
                type: "GET",
                success: function (data) {}         
            });
        swal("Poof! Your package delivery request has been deleted!", {
          icon: "success",
        }).then(function () {
            location.reload();
        });
      } 
  });
});


/////////////////////////////////////////TIMESHEET/////////////////////////////////////////

$('button#projectassignmentdelete').on('click', function(PASS_ID){
    var PASS_ID = $(this).attr('data-id');
    swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this assignment!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
      if (willDelete) {
        $.ajax({
                url: "ProjectAssignmentDelete?PASS_ID="+PASS_ID,
                type: "GET",
                success: function (data) {}         
            });
        swal("Poof! This assignment has been deleted!", {
          icon: "success",
        }).then(function () {
            location.reload();
        });
      } 
  });
});

$(document).ready(function () {

    $('#TSActivityTable').DataTable({
        responsive: true,
        "aaSorting": [],
    });

    $('#MeetingRoomTable').DataTable({
        responsive: true,
        "aaSorting": [],
        "pageLength": 20
    });
    
    $('#ts_project_div').hide();
    $('#ts_corporate_div').hide();
    $('#ts_corporatetype_div').hide();

    $("#ts_project_radio").click(function() { //use change event
        $('#ts_project_div').show(200);
        $('#ts_corporate_div').hide(200);
        $('#ts_corporatetype_div').hide(200);
        $('#ts_pact_code_project_add').prop('required', true);
        $('#ts_pact_code_corporate_add').prop('required', false);
        $('#ts_pact_code_corporate_add').val('');
        $('.selectpicker').select2({
            theme: "bootstrap"
        });
    }); 
    $("#ts_corporate_radio").click(function() { //use change event
        $('#ts_corporatetype_div').show(200); 
        $('#ts_corporate_div').show(200); //else hide
        $('#ts_project_div').hide(200);
        $('#ts_pact_code_corporate_add').prop('required', true);
        $('#ts_pact_code_project_add').prop('required', false);
        $('#ts_pact_code_project_add').val('');
        $('.selectpicker').select2({
            theme: "bootstrap"
        });
    });

    $("#ts_project_radio_update").click(function() { //use change event
        $('#ts_projecttype_update_div').show(200); 
        $('#ts_project_update_div').show(200); //than show
        $('#ts_corporate_update_div').hide(200);
        $('#ts_corporatetype_update_div').hide(200);
        $('#ts_pact_code_project_update').prop('required', true);
        $('#ts_pact_code_corporate_update').prop('required', false);
        $('#ts_pact_code_corporate_update').val('');
        $('.selectpicker').select2({
            theme: "bootstrap"
        });
    }); 
    $("#ts_corporate_radio_update").click(function() { //use change event
        $('#ts_corporatetype_update_div').show(200); 
        $('#ts_corporate_update_div').show(200); //else hide
        $('#ts_project_update_div').hide(200);
        $('#ts_projecttype_update_div').hide(200);
        $('#ts_pact_code_corporate_updated').prop('required', true);
        $('#ts_pact_code_project_update').prop('required', false);
        $('#ts_pact_code_project_update').val('');
        $('.selectpicker').select2({
            theme: "bootstrap"
        });
    });
});
    


//////////////////////////////////////////VEHICLE//////////////////////////////////////

$(document).ready(function() {
  let year_history =  $('#year_filter').val();

  $('#table-vehicle-history-list').DataTable({
    processing: true,
    serverSide: true,
    ajax: 'http://localhost/frappe-git/public/GetVehiclehistoryList/'+year_history,
    columns: [
      {
        data: 'DT_RowIndex', name: 'DT_RowIndex', searchable: false, orderable: false, className: "text-center"
      },
      {
        data: 'number', name: 'number', className: "text-center"
      },
      {
        data: 'name_req', name: 'name_req'
      },
      {
        data: 'RES_DESTINATION', name: 'RES_DESTINATION'
      },
      {
        data: 'departure_date', name: 'departure_date', className: "text-center"
      },
      {
        data: 'return_date', name: 'return_date', className: "text-center"
      },
      {
        data: 'vehicle', name: 'vehicle', className: "text-center"
      },
      {
        data: 'driver', name: 'driver'
      },
      {
        data: 'RES_STATUS', name: 'RES_STATUS', className: "text-center"
      },
      {
        data: 'action', name: 'action', className: "text-center"
      }
    ]
  });
});

function vehicle_upload_modal(RES_ID) 
{
      $('#vehicle_id_upload').val(RES_ID);
}

$('button#closed').on('click', function(RES_SPK){
        var RES_SPK = $(this).attr('data-id');
        swal({
        title: "Are you sure?",
        text: "Once change, you will not be able to recover this booking !",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willClosed) => {
          if (willClosed) {
            $.ajax({
                    url: "VehicleClosed?RES_SPK="+RES_SPK,
                    type: "GET",
                    success: function (data) {}         
                });
            swal("Hooray! Vehicle booking request has been closed!", {
              icon: "success",
            }).then(function () {
                location.reload();
            });
          } 
      });
    });

 $('button#vehicledelete').on('click', function(RES_SPK){
        var RES_SPK = $(this).attr('data-id');
        swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this booking !",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
          if (willDelete) {
            $.ajax({
                    url: "VehicleDelete?RES_SPK="+RES_SPK,
                    type: "GET",
                    success: function (data) {}         
                });
            swal("Poof! Vehicle booking request has been deleted!", {
              icon: "success",
            }).then(function () {
                location.reload();
            });
          } 
      });
    });


  function delete_confirmation_modal(RES_SPK) {
      $('#info_res_spk').html(RES_SPK);
      $('#delete_res_spk').val(RES_SPK);
    }
  function return_confirmation_modal(RES_SPK) {
      $('#returninfo_res_spk').html(RES_SPK);
      $('#return_res_spk').val(RES_SPK);
    }
    
  function validateForm() { 

    document.getElementById("AssignBtn").disabled = true;
    document.getElementById("AssignBtn").value = "Please wait ...";
      return true;  

  }  

  function validateFormPropose() { 

    document.getElementById("proposeBtn").disabled = true;
    document.getElementById("proposeBtn").value = "Please wait ...";
      return true;  

  }

$(document).ready(function() {

  
  $('.selectpicker').select2({
    theme: "bootstrap"
  });

$('#res_vehicle').change(function(){
    if($('#res_vehicle').val() == 'Online Taxi'){
        $('#res_driver').val('');
        $('#res_driver').attr('disabled','disabled');
    }
    else{
        $('#res_driver').removeAttr('disabled');
    }
});

    $('.form_datetime').datetimepicker({
        format: "yyyy-mm-dd hh:ii",
        autoclose: true,
        todayBtn: true,
        minuteStep: 5
    });

    $('#res_departure1').datetimepicker().on('changeDate', function(ev) {
      var departureDate = ev.date;
      $('#res_return1').datetimepicker('setStartDate', departureDate);
  });

  $('#res_return1').datetimepicker().on('changeDate', function(ev) {
      var returnDate = ev.date;
      $('#res_departure1').datetimepicker('setEndDate', returnDate);
  });

  $('#res_departure2').datetimepicker().on('changeDate', function(ev) {
      var departureDate = ev.date;
      $('#res_return2').datetimepicker('setStartDate', departureDate);
  });

  $('#res_return2').datetimepicker().on('changeDate', function(ev) {
      var returnDate = ev.date;
      $('#res_departure2').datetimepicker('setEndDate', returnDate);
  });


// On Click SignUp It Will Hide Login Form and Display Registration Form
$("#forgot").hide()
$("#forgotpass").click(function() {
  $("#forgot").slideUp("slow", function() {
    $("#login").slideDown("slow");
  });
});
// On Click SignIn It Will Hide Registration Form and Display Login Form
// $("#signin").click(function() {
//  $("#second").slideUp("slow", function() {
//    $("#first").slideDown("slow");
//  });
// });
        

/////////////////////////////////////////////////

$('#ReservationListsTable').DataTable({
        responsive: true,
        "aaSorting": [],
        orderCellsTop: true,
        fixedHeader: true,
        dom: 'lBfrtip',
        buttons: ['copy', 'excel']
    });

$('#ReservationHistoryListsTable').DataTable({
      responsive: true,
      "aaSorting": [],
      orderCellsTop: true,
      fixedHeader: true,
      dom: 'lBfrtip',
      buttons: ['copy', 'excel']
  });



///////////////////////////////////////////////

$('#AssignBtn').click(function() {
     /* when the button in the form, display the entered values in the modal */

      $('#assign_vehicle').val($('#res_vehicle').val());
      $('#assign_driver').val($('#res_driver').val());
      $('#assign_spk').val($('#res_spk').val());
      $('#info_res_spk').html($('#res_spk').val());
  });

///////////////////////////////////////////////////

  $('#UpdateBtn').hide();
  $('#CancelBtn').hide();
  $('#EditEntryBtn').click(function(){
      // $('.form-edit').keyup(function(){
      $('.edit').prop('disabled', false);
      $('#UpdateBtn').show();
      $('#CancelBtn').show();
      $('#EditEntryBtn').hide();
      $('#CancelReservationBtn').hide();
    // });
    });

    $('#CancelBtn').click(function(){
      // $('.form-edit').keyup(function(){
      $('.edit').prop('disabled', true);
      $('#UpdateBtn').hide();
      $('#CancelBtn').hide();
      $('#EditEntryBtn').show();
      $('#CancelReservationBtn').show();
    // });
    });

    $('#AssignBtn').hide();
    $('#CancelAssignBtn').hide();
    $('#SetAssignmentBtn').click(function(){
      // $('.form-edit').keyup(function(){
      $('#res_vehicle').prop('disabled', false);
      $('#res_driver').prop('disabled', false);
      $('#AssignBtn').show();
      $('#CancelAssignBtn').show();
      $('#SetAssignmentBtn').hide();
    // });
    });

    $('#CancelAssignBtn').click(function(){
      // $('.form-edit').keyup(function(){
      $('#res_vehicle').prop('disabled', true);
      $('#res_driver').prop('disabled', true);
      $('#AssignBtn').hide();
      $('#CancelAssignBtn').hide();
      $('#SetAssignmentBtn').show();
    // });
    });

///////////////////////////////////////////////////

  $('#add_member_modal').on('hidden.bs.modal', function(e) {
      $(this).find('form').trigger('reset');
  });


///////////////////////////////////////////////////

  // if (document.getElementById('res_utilization1').checked) {
  //   rate_value = document.getElementById('res_utilization1').value;
  // }

});




//////////////////////////////////////////////OVERTIME//////////////////////////////////////////////
$(document).ready(function(){
    $('#OvertimeTable').DataTable({
        responsive: true,
        "aaSorting": [],
    });
    
});
function overtime_view_modal(OT_ID, OT_NAME, OT_DATE, OT_FACILITY, OT_ORDER_FOOD, OT_ACKNOWLEDGED_BY, OT_REMARK, OT_COST_CODE) 
{
      $('#overtime_id_view').val(OT_ID);
      $('#overtime_name_view').val(OT_NAME);
      $('#overtime_date_view').val(OT_DATE);
      // $('#overtime_facility_view').val(OT_FACILITY);

      var result = OT_FACILITY;
        
        var array = result.split(",");
        $(".overtime_facility_view input").each(function(index) {
            var val = $(this).val();
            if (array.includes(val)) {
                $(this).prop('checked', true);
            } else {
                $(this).prop('checked', false);
            }
        });
        
      $('#overtime_pesanan_view').val(OT_ORDER_FOOD);
      $('#overtime_acknowledged_by_view').val(OT_ACKNOWLEDGED_BY);
      $('#overtime_remark_view').val(OT_REMARK);
      $('#overtime_cost_code_view').val(OT_COST_CODE);

}

function overtime_update_modal(OT_ID, OT_NAME, OT_DATE, OT_FACILITY, OT_ACKNOWLEDGED_BY, OT_REMARK, OT_COST_CODE) 
{
      $('#overtime_id_update').val(OT_ID);
      $('#overtime_name_update').val(OT_NAME);
      $('#overtime_date_update').val(OT_DATE);
      $('#overtime_facility_update').val(OT_FACILITY);
      $('#overtime_acknowledged_by_update').val(OT_ACKNOWLEDGED_BY);
      $('#overtime_remark_update').val(OT_REMARK);
      $('#overtime_cost_code_update').val(OT_COST_CODE);

}


$('button#overtimedelete').on('click', function(OT_ID){
    var OT_ID = $(this).attr('data-id');
    // alert(ID);
    swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this request !",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
      if (willDelete) {
        $.ajax({
                url: "OvertimeDelete?OT_ID="+OT_ID,
                type: "GET",
                success: function (data) {}         
            });
        swal("Poof! Your package delivery request has been deleted!", {
          icon: "success",
        }).then(function () {
            location.reload();
        });
      } 
  });
});

$(document).ready(function(){

    $("#makan_malam").hide(200);

    $("#makan_malam_div").click(function() {
        if ($(this).is(':checked')) {
            $("#makan_malam").prop('required',true);  
            $("#makan_malam").show(200);              
        } else {
            $("#makan_malam").hide(200);                
        }
    });
});


//////////////////////////////////////BUSINESS TRIP ONLINE////////////////////////////////////////

$(document).ready(function(){

    $('#BusinessTripTable').DataTable({
        responsive: true,
        "aaSorting": [],
    });
    
});


function businesstrip_approve_modal(SPP_ID, SPP_NO, SPP_PURPOSEOFTRIP, SPP_STARTDATE, SPP_ENDDATE, 
  SPP_DURATION, SPP_COUNTRY, SPP_PROVINCE, SPP_CITY, SPP_MEANSOFTRANS, BTREM_TYPE, BTREM_AMOUNT, 
  SPP_COST_CODE, APPROVER_NAME, ACKNOWLEDGE_NAME, SPP_APPROVALSTATUS) {

      $('#business_trip_id_approve').val(SPP_ID);
      $('#business_trip_spd_no_approve').val(SPP_NO);
      $('#business_trip_purpose_approve').val(SPP_PURPOSEOFTRIP);
      $('#bt_start_periode_approve').val(SPP_STARTDATE);
      $('#bt_end_periode_approve').val(SPP_ENDDATE);
      $('#bt_total_day_approve').val(SPP_DURATION);
      $('#business_trip_country_approve').val(SPP_COUNTRY);
      $('#business_trip_province_approve').val(SPP_PROVINCE);
      $('#business_trip_city_approve').val(SPP_CITY);
      $('#bt_transportation_type_approve').val(SPP_MEANSOFTRANS);
      // $('#bt_reimbursable_expenses_type_update').val(BTREM_TYPE);

      var result = BTREM_TYPE;
        
        var array = result.split(",");
        $(".approve input").each(function(index) {
            var val = $(this).val();
            if (array.includes(val)) {
                $(this).prop('checked', true);
            } else {
                $(this).prop('checked', false);
            }
        });

      $('#business_trip_contingency_approve').val(BTREM_AMOUNT);
      $('#business_trip_costcode_approve').val(SPP_COST_CODE);
      $('#business_trip_approver_name_approve').val(APPROVER_NAME);
      $('#business_trip_acknowledge_name_approve').val(ACKNOWLEDGE_NAME);
      $('#business_trip_approvalstatus_approve').val(SPP_APPROVALSTATUS);
      $('.selectpicker').select2('destroy');
      $('.selectpicker').select2({
          theme: "bootstrap"
      });
}

function businesstrip_rejected_modal(SPP_ID, SPP_NO, SPP_PURPOSEOFTRIP, SPP_STARTDATE, SPP_ENDDATE, 
  SPP_DURATION, SPP_COUNTRY, SPP_PROVINCE, SPP_CITY, SPP_MEANSOFTRANS, BTREM_TYPE, BTREM_AMOUNT, 
  SPP_COST_CODE, APPROVER_NAME, ACKNOWLEDGE_NAME, SPP_APPROVALSTATUS) {

      $('#business_trip_id_rejected').val(SPP_ID);
      $('#business_trip_spd_no_rejected').val(SPP_NO);
      $('#business_trip_purpose_rejected').val(SPP_PURPOSEOFTRIP);
      $('#bt_start_periode_rejected').val(SPP_STARTDATE);
      $('#bt_end_periode_rejected').val(SPP_ENDDATE);
      $('#bt_total_day_rejected').val(SPP_DURATION);
      $('#business_trip_country_rejected').val(SPP_COUNTRY);
      $('#business_trip_province_rejected').val(SPP_PROVINCE);
      $('#business_trip_city_rejected').val(SPP_CITY);
      $('#bt_transportation_type_rejected').val(SPP_MEANSOFTRANS);
      // $('#bt_reimbursable_expenses_type_update').val(BTREM_TYPE);

      var result = BTREM_TYPE;
        
        var array = result.split(",");
        $(".rejected input").each(function(index) {
            var val = $(this).val();
            if (array.includes(val)) {
                $(this).prop('checked', true);
            } else {
                $(this).prop('checked', false);
            }
        });

      $('#business_trip_contingency_rejected').val(BTREM_AMOUNT);
      $('#business_trip_costcode_rejected').val(SPP_COST_CODE);
      $('#business_trip_approver_name_rejected').val(APPROVER_NAME);
      $('#business_trip_acknowledge_name_rejected').val(ACKNOWLEDGE_NAME);
      $('#business_trip_approvalstatus_rejected').val(SPP_APPROVALSTATUS);
      $('.selectpicker').select2('destroy');
      $('.selectpicker').select2({
          theme: "bootstrap"
      });
}


function businesstrip_trace_modal(SPP_ID, SPP_NO, SPP_EMPL_NAME, SPP_PURPOSEOFTRIP, SPP_STARTDATE, SPP_ENDDATE, 
  SPP_DURATION, SPP_COUNTRY, SPP_PROVINCE, SPP_CITY, SPP_MEANSOFTRANS, BTREM_TYPE, BTREM_AMOUNT, 
  SPP_COST_CODE, APPROVER_NAME, ACKNOWLEDGE_NAME, SPP_APPROVALSTATUS) {

      $('#business_trip_id_trace').val(SPP_ID);
      $('#business_trip_spd_no_trace').val(SPP_NO);
      $('#business_trip_employeename_trace').val(SPP_EMPL_NAME);
      $('#business_trip_purpose_trace').val(SPP_PURPOSEOFTRIP);
      $('#bt_start_periode_trace').val(SPP_STARTDATE);
      $('#bt_end_periode_trace').val(SPP_ENDDATE);
      $('#bt_total_day_trace').val(SPP_DURATION);
      $('#business_trip_country_trace').val(SPP_COUNTRY);
      $('#business_trip_province_trace').val(SPP_PROVINCE);
      $('#business_trip_city_trace').val(SPP_CITY);
      $('#bt_transportation_type_trace').val(SPP_MEANSOFTRANS);
      // $('#bt_reimbursable_expenses_type_update').val(BTREM_TYPE);

      var result = BTREM_TYPE;
        
        var array = result.split(",");
        $(".trace input").each(function(index) {
            var val = $(this).val();
            if (array.includes(val)) {
                $(this).prop('checked', true);
            } else {
                $(this).prop('checked', false);
            }
        });

      $('#business_trip_contingency_trace').val(BTREM_AMOUNT);
      $('#business_trip_costcode_trace').val(SPP_COST_CODE);
      $('#business_trip_approver_name_trace').val(APPROVER_NAME);
      $('#business_trip_acknowledge_name_trace').val(ACKNOWLEDGE_NAME);
      $('#business_trip_approvalstatus_trace').val(SPP_APPROVALSTATUS);
      $('.selectpicker').select2('destroy');
      $('.selectpicker').select2({
          theme: "bootstrap"
      });
}


/////////////////////////////////////////CORPORATE PURCHASING///////////////////////////////////////////////////

$(document).ready(function(){

    $('#purchase_request_add').multiSelect();

    // $('#CorporatePurchasingTable').DataTable({
    //     responsive: true,
    //     "aaSorting": [],
    // });

    // $('#PurchaseTable').DataTable({
    //     responsive: true,
    //     "aaSorting": [],
    // });

    $('button#purchasedelete').on('click', function(PCS_ID){
      var PCS_ID = $(this).attr('data-id');
      // alert(ID);
      swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this purchase !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
          $.ajax({
                  url: "PurchaseDelete?PCS_ID="+PCS_ID,
                  type: "GET",
                  success: function (data) {}         
              });
          swal("Poof! The Purchase has been deleted!", {
            icon: "success",
          }).then(function () {
              location.reload();
          });
        } 
    });
  });
});

  $('#table-corpurchasing-request-list').DataTable({
    processing: true,
    serverSide: true,
    ajax: 'https://frappe.tracon.co.id/GetCorpurchasingReq',
    columns: [
      {
        data: 'DT_RowIndex', name: 'DT_RowIndex', searchable: false, orderable: false
      },
      {
        data: 'CP_CREATEDDATE', name: 'CP_CREATEDDATE', visible: false
      },
      {
        data: 'CP_RO_NO', name: 'CP_RO_NO',
      },
      {
        data: 'CP_TITLE', name: 'CP_TITLE', orderable: false,
      },
      {
        data: 'date', name: 'date', orderable: false, className: "text-center"
      },
      {
        data: 'CP_CREATEDBY_NAME', name: 'CP_CREATEDBY_NAME', orderable: true,
      },
      {
        data: 'status', name: 'status', orderable: true, className: "text-center"
      },
      {
        data: 'PCS_PROGRESS', name: 'PCS_PROGRESS', orderable: true, className: "text-center"
      },
      {
        data: 'PCS_NO', name: 'PCS_NO', orderable: true, className: "text-center"
      },
      {
        data: 'stock', name: 'stock', orderable: true, className: "text-center"
      },
      {
        data: 'action', name: 'action', className: "text-center",
      }
    ],
    order: [[1, "desc"]],
    fixedHeader: true,
        dom: 'Bfrtip',
        buttons: [
            {
               extend: 'copy',
               footer: true,
               exportOptions: {
                    columns: [0,2,3,5,6,7]
                }
           },
            {
               extend: 'excel',
               footer: true,
               exportOptions: {
                    columns: [0,2,3,5,6,7]
                }
           },
            {
               extend: 'pdf',
               footer: true,
               exportOptions: {
                    columns: [0,2,3,5,6,7]
                }
           },
            {
               extend: 'print',
               footer: true,
               exportOptions: {
                    columns: [0,2,3,5,6,7]
                }
           }
        ]
  });
 
  $('#table-purchasing-list').DataTable({
    processing: true,
    serverSide: true,
    ajax: 'https://frappe.tracon.co.id/GetPurchasingList',
    columns: [
      {
        data: 'DT_RowIndex', name: 'DT_RowIndex', searchable: false, orderable: false
      },
      {
        data: 'PCS_PROGRESS_DATE', name: 'PCS_PROGRESS_DATE', visible: false
      },
      {
        data: 'PCS_NO', name: 'PCS_NO', className: "text-center"
      },
      {
        data: 'PCS_TYPE', name: 'PCS_TYPE',
      },
      {
        data: 'progres', name: 'progres', orderable: false, className: "text-center"
      },
      {
        data: 'date', name: 'date', orderable: false, className: "text-center"
      },
      {
        data: 'action', name: 'action', orderable: true,className: "text-center"
      }
    ],
    order: [[1, "desc"]],
    fixedHeader: true,
        dom: 'Bfrtip',
        buttons: [
            {
               extend: 'copy',
               footer: true,
               exportOptions: {
                    columns: [0,2,3,4]
                }
           },
            {
               extend: 'excel',
               footer: true,
               exportOptions: {
                    columns: [0,2,3,4]
                }
           },
            {
               extend: 'pdf',
               footer: true,
               exportOptions: {
                    columns: [0,2,3,4]
                }
           },
            {
               extend: 'print',
               footer: true,
               exportOptions: {
                    columns: [0,2,3,4]
                }
           }
        ]
  });

    $('#purchase_request_add').multiSelect({
      selectableHeader: "<input type='text' class='search-input form-control' autocomplete='off' placeholder='Cari Request Order'>",
      selectionHeader: "<input type='text' class='search-input form-control' autocomplete='off' placeholder='Cari Request Order'>",
      afterInit: function(ms){
        var that = this,
            $selectableSearch = that.$selectableUl.prev(),
            $selectionSearch = that.$selectionUl.prev(),
            selectableSearchString = '#'+that.$container.attr('id')+' .ms-elem-selectable:not(.ms-selected)',
            selectionSearchString = '#'+that.$container.attr('id')+' .ms-elem-selection.ms-selected';

        that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
        .on('keydown', function(e){
          if (e.which === 40){
            that.$selectableUl.focus();
            return false;
          }
        });

        that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
        .on('keydown', function(e){
          if (e.which == 40){
            that.$selectionUl.focus();
            return false;
          }
        });
      },
      afterSelect: function(){
        this.qs1.cache();
        this.qs2.cache();
      },
      afterDeselect: function(){
        this.qs1.cache();
        this.qs2.cache();
      }
    });


    $("#PurchaseAddForm").submit(function (e) {
        //stop submitting the form to see the disabled button effect
        // e.preventDefault();

        //disable the submit button
        $("#PurchaseAddButton").prop('disabled', true);

        return true;
    });

  function purchase_update_modal(PCS_ID, PCS_NO, PCS_TYPE, PCS_PROGRESS) {
    $('#purchase_id_update').val(PCS_ID);
    $('#purchase_no_update').val(PCS_NO);
    $('#purchase_type_update').val(PCS_TYPE);
    // if(PCS_PROGRESS != ''){
    //     $("#purchase_type_update").prop('disabled',true);
    // }
    // else{
    //     $("#purchase_type_update").prop('disabled',false);
    // }
    $('#purchase_progress_update').val(PCS_PROGRESS);
    if(PCS_PROGRESS == 'Rejected'){
        $('#purchaseprogressdiv').hide();
    }
    else{
        $('#purchaseprogressdiv').show();
    }
    $('.selectpicker').select2('destroy');
    $('.selectpicker').select2({
        theme: "bootstrap"
    });

    $.ajax({
        url: "getPurchaseList",
        type: "GET",
        data: "PCS_ID="+PCS_ID,
        success: function(data){
          var obj = $.parseJSON(data);
          $("#tbody_purchase_update").html(obj.content);
        }
    }); 

    $.ajax({
      url: "getPPApproval",
      type: "GET",
      data: "PCS_ID="+PCS_ID,
      success: function(data){
        var obj = $.parseJSON(data);
        $("#tbodyppapprovalupdate").html(obj.content);
      }
    }); 
}

  function purchase_detail_modal(PCS_ID, PCS_NO, PCS_TYPE, PCS_PROGRESS) {
    $('#purchase_id_detail').val(PCS_ID);
    $('#purchase_no_detail').val(PCS_NO);
    $('#purchase_type_detail').val(PCS_TYPE);
    if(PCS_PROGRESS == ''){
        $('#purchase_progress_detail').val('Waiting Approval');
    }
    else{
        $('#purchase_progress_detail').val(PCS_PROGRESS);
    }
    $('.selectpicker').select2('destroy');
    $('.selectpicker').select2({
        theme: "bootstrap"
    });

    $.ajax({
        url: "getPurchaseList",
        type: "GET",
        data: "PCS_ID="+PCS_ID,
        success: function(data){
          var obj = $.parseJSON(data);
          $("#tbody_purchase_detail").html(obj.content);
        }
    }); 

    $.ajax({
      url: "getPPApproval",
      type: "GET",
      data: "PCS_ID="+PCS_ID,
      success: function(data){
        var obj = $.parseJSON(data);
        $("#tbodyppapproval").html(obj.content);
      }
    }); 
}


  function ro_update_modal(CP_ID, CP_REQ_ID, CP_TITLE, CP_REQUIREDDATE, CP_COSTCODE, CP_PROPOSETO_NAME, 
    CP_ACKNOWLEDGEDBY_NAME, CP_STATUS, CP_REMARK_APPROVAL, CP_PROGRESS, CP_PURCHASING_TYPE, CP_REMARK_ADMIN, CP_RO_NO) {

      $('#cp_id_update').val(CP_ID);
      $('#cp_req_id_update').val(CP_REQ_ID);
      $('#cp_title_update').val(CP_TITLE);
      $('#cp_ro_no_update').val(CP_RO_NO);
      $('#cp_requireddate_update').val(CP_REQUIREDDATE);
      $('#cp_costcode_update').val(CP_COSTCODE);
      $('#cp_proposeto_update').val(CP_PROPOSETO_NAME);
      $('#cp_acknowledgedby_update').val(CP_ACKNOWLEDGEDBY_NAME);
      $('#cp_status_update').val(CP_STATUS);
      $('#cp_remarkapproval_update').val(CP_REMARK_APPROVAL);
      $('#cp_progress_update').val(CP_PROGRESS);
      $('#cp_purchasing_type_update').val(CP_PURCHASING_TYPE);
      $('#cp_remarkadmin_update').val(CP_REMARK_ADMIN);
      $('.selectpicker').select2('destroy');
      $('.selectpicker').select2({
          theme: "bootstrap"
      });

      $.ajax({
        url: "getItem",
        type: "GET",
        data: "ITEM_REQ_ID="+CP_REQ_ID,
        success: function(data){
          var obj = $.parseJSON(data);
          $("#tbodyItem").html(obj.content);
        }
      }); 
  }

  function request_order_item_update_modal(ITEM_ID, REQ_ID, ITEM_NAME, ITEM_BRANDNAME, ITEM_SPECIFICATION, ITEM_QUANTITY, ITEM_QUANTITY_UNIT,
    ITEM_REMARK) {

        $('#item_id_update').val(ITEM_ID);
        $('#item_req_id_update').val(REQ_ID);
        $('#item_name_update').val(ITEM_NAME);
        $('#item_brandname_update').val(ITEM_BRANDNAME);
        $('#item_specification_update').val(ITEM_SPECIFICATION);
        $('#item_quantity_update').val(ITEM_QUANTITY);
        $('#item_quantity_unit_update').val(ITEM_QUANTITY_UNIT);
        $('#item_remark_update').val(ITEM_REMARK);
        $('.selectpicker').select2('destroy');
        $('.selectpicker').select2({
            theme: "bootstrap"
        });
  }

  function ro_detail_modal(CP_ID, PCS_NO, CP_REQ_ID, CP_TITLE, CP_REQUIREDDATE, CP_COSTCODE, CP_PROPOSETO_NAME, 
    CP_ACKNOWLEDGEDBY_NAME, CP_STATUS, CP_REMARK_APPROVAL, PCS_PROGRESS, CP_REMARK_ADMIN, CP_RO_NO) {
      $('#cp_id_detail').val(CP_ID);
      $('#cp_ppno_detail').val(PCS_NO);
      if(PCS_NO = ''){
          $('#ppmodaldiv').hide();
      }
      else{
          $('#ppmodaldiv').show();
      }
      $('#cp_req_id_detail').val(CP_REQ_ID);
      $('#cp_title_detail').val(CP_TITLE);
      $('#cp_ro_no_detail').val(CP_RO_NO);
      $('#cp_requireddate_detail').val(CP_REQUIREDDATE);
      $('#cp_costcode_detail').val(CP_COSTCODE);
      $('#cp_proposeto_detail').val(CP_PROPOSETO_NAME);
      $('#cp_acknowledgedby_detail').val(CP_ACKNOWLEDGEDBY_NAME);
      $('#cp_status_detail').val(CP_STATUS);
      $('#cp_remarkapproval_detail').val(CP_REMARK_APPROVAL);
      $('#cp_progress_detail').val(PCS_PROGRESS);
      $('#cp_remarkadmin_detail').val(CP_REMARK_ADMIN);

      $.ajax({
        url: "getItem",
        type: "GET",
        data: "ITEM_REQ_ID="+CP_REQ_ID,
        success: function(data){
          var obj = $.parseJSON(data);
          $("#tbodyDetailItem").html(obj.content);
        }
      }); 
  }

  

$('button#request_order_delete').on('click', function(CP_REQ_ID){
    var CP_REQ_ID = $(this).attr('data-id');
    // alert(ID);
    swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this request !",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
      if (willDelete) {
        $.ajax({
                url: "RequestOrderDelete?CP_REQ_ID="+CP_REQ_ID,
                type: "GET",
                success: function (data) {}         
            });
        swal("Poof! Your request has been deleted!", {
          icon: "success",
        }).then(function () {
            location.reload();
        });
      } 
  });
});



/////////////////////////////////////////OFFICE EQUIPMENT///////////////////////////////////////////////////

$(document).ready(function(){

    $('#oe_purchase_request_add').multiSelect();

    // $('#OfficeEquipmentTable').DataTable({
    //     responsive: true,
    //     "aaSorting": [],
    // });

    // $('#PurchaseOETable').DataTable({
    //     responsive: true,
    //     "aaSorting": [],
    // });

    $('button#oepurchasedelete').on('click', function(PCS_ID){
      var PCS_ID = $(this).attr('data-id');
      // alert(ID);
      swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this purchase !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
          $.ajax({
                  url: "PurchaseDeleteOE?PCS_ID="+PCS_ID,
                  type: "GET",
                  success: function (data) {}         
              });
          swal("Poof! The Purchase has been deleted!", {
            icon: "success",
          }).then(function () {
              location.reload();
          });
        } 
    });
  });
});


  var table = $('#OfficeEquipmentTable').DataTable( {
      orderCellsTop: true,
      responsive: true,
      fixedHeader: true,
        dom: 'Bfrtip',
        buttons: [
            {
               extend: 'copy',
               footer: true,
               exportOptions: {
                    columns: [0,1,2,3,5,6]
                }
           },
            {
               extend: 'excel',
               footer: true,
               exportOptions: {
                    columns: [0,1,2,3,5,6]
                }
           },
            {
               extend: 'pdf',
               footer: true,
               exportOptions: {
                    columns: [0,1,2,3,5,6]
                }
           },
            {
               extend: 'print',
               footer: true,
               exportOptions: {
                    columns: [0,1,2,3,5,6]
                }
           }
        ]
  } );
 
  var table = $('#PurchaseOETable').DataTable( {
      orderCellsTop: true,
       "aaSorting": [],
      responsive: true,
      fixedHeader: true,
        dom: 'Bfrtip',
        buttons: [
            {
               extend: 'copy',
               footer: true,
               exportOptions: {
                    columns: [0,1,2,3]
                }
           },
            {
               extend: 'excel',
               footer: true,
               exportOptions: {
                    columns: [0,1,2,3]
                }
           },
            {
               extend: 'pdf',
               footer: true,
               exportOptions: {
                    columns: [0,1,2,3]
                }
           },
            {
               extend: 'print',
               footer: true,
               exportOptions: {
                    columns: [0,1,2,3]
                }
           }
        ]
  } );
 

    $('#oe_purchase_request_add').multiSelect({
      selectableHeader: "<input type='text' class='search-input form-control' autocomplete='off' placeholder='Cari Request Order'>",
      selectionHeader: "<input type='text' class='search-input form-control' autocomplete='off' placeholder='Cari Request Order'>",
      afterInit: function(ms){
        var that = this,
            $selectableSearch = that.$selectableUl.prev(),
            $selectionSearch = that.$selectionUl.prev(),
            selectableSearchString = '#'+that.$container.attr('id')+' .ms-elem-selectable:not(.ms-selected)',
            selectionSearchString = '#'+that.$container.attr('id')+' .ms-elem-selection.ms-selected';

        that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
        .on('keydown', function(e){
          if (e.which === 40){
            that.$selectableUl.focus();
            return false;
          }
        });

        that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
        .on('keydown', function(e){
          if (e.which == 40){
            that.$selectionUl.focus();
            return false;
          }
        });
      },
      afterSelect: function(){
        this.qs1.cache();
        this.qs2.cache();
      },
      afterDeselect: function(){
        this.qs1.cache();
        this.qs2.cache();
      }
    });


    $("#OEPurchaseAddForm").submit(function (e) {
        //stop submitting the form to see the disabled button effect
        // e.preventDefault();

        //disable the submit button
        $("#OEPurchaseAddButton").prop('disabled', true);

        return true;
    });

  function oe_purchase_update_modal(PCS_ID, PCS_NO, PCS_TYPE, PCS_PROGRESS) {
    $('#oe_purchase_id_update').val(PCS_ID);
    $('#oe_purchase_no_update').val(PCS_NO);
    $('#oe_purchase_type_update').val(PCS_TYPE);
    // if(PCS_PROGRESS != ''){
    //     $("#purchase_type_update").prop('disabled',true);
    // }
    // else{
    //     $("#purchase_type_update").prop('disabled',false);
    // }
    $('#oe_purchase_progress_update').val(PCS_PROGRESS);
    if(PCS_PROGRESS == 'Rejected'){
        $('#oepurchaseprogressdiv').hide();
    }
    else{
        $('#oepurchaseprogressdiv').show();
    }
    $('.selectpicker').select2('destroy');
    $('.selectpicker').select2({
        theme: "bootstrap"
    });

    $.ajax({
        url: "getPurchaseListOE",
        type: "GET",
        data: "PCS_ID="+PCS_ID,
        success: function(data){
          var obj = $.parseJSON(data);
          $("#tbody_oe_purchase_update").html(obj.content);
        }
    }); 

    $.ajax({
      url: "getPPApprovalOE",
      type: "GET",
      data: "PCS_ID="+PCS_ID,
      success: function(data){
        var obj = $.parseJSON(data);
        $("#tbodyoeppapprovalupdate").html(obj.content);
      }
    }); 
}

  function oe_purchase_detail_modal(PCS_ID, PCS_NO, PCS_TYPE, PCS_PROGRESS) {
    $('#oe_purchase_id_detail').val(PCS_ID);
    $('#oe_purchase_no_detail').val(PCS_NO);
    $('#oe_purchase_type_detail').val(PCS_TYPE);
    if(PCS_PROGRESS == ''){
        $('#oe_purchase_progress_detail').val('Waiting Approval');
    }
    else{
        $('#oe_purchase_progress_detail').val(PCS_PROGRESS);
    }
    $('.selectpicker').select2('destroy');
    $('.selectpicker').select2({
        theme: "bootstrap"
    });

    $.ajax({
        url: "getPurchaseListOE",
        type: "GET",
        data: "PCS_ID="+PCS_ID,
        success: function(data){
          var obj = $.parseJSON(data);
          $("#tbody_oe_purchase_detail").html(obj.content);
        }
    }); 

    $.ajax({
      url: "getPPApprovalOE",
      type: "GET",
      data: "PCS_ID="+PCS_ID,
      success: function(data){
        var obj = $.parseJSON(data);
        $("#tbodyoeppapproval").html(obj.content);
      }
    }); 
}


  function oe_ro_update_modal(CP_ID, CP_REQ_ID, CP_TITLE, CP_REQUIREDDATE, CP_COSTCODE, CP_PROPOSETO_NAME, 
    CP_ACKNOWLEDGEDBY_NAME, CP_STATUS, CP_REMARK_APPROVAL, CP_PROGRESS, CP_PURCHASING_TYPE, CP_REMARK_ADMIN, CP_RO_NO) {

      $('#oe_cp_id_update').val(CP_ID);
      $('#oe_cp_req_id_update').val(CP_REQ_ID);
      $('#oe_cp_title_update').val(CP_TITLE);
      $('#oe_cp_ro_no_update').val(CP_RO_NO);
      $('#oe_cp_requireddate_update').val(CP_REQUIREDDATE);
      $('#oe_cp_costcode_update').val(CP_COSTCODE);
      $('#oe_cp_proposeto_update').val(CP_PROPOSETO_NAME);
      $('#oe_cp_acknowledgedby_update').val(CP_ACKNOWLEDGEDBY_NAME);
      $('#oe_cp_status_update').val(CP_STATUS);
      $('#oe_cp_remarkapproval_update').val(CP_REMARK_APPROVAL);
      $('#oe_cp_progress_update').val(CP_PROGRESS);
      $('#oe_cp_purchasing_type_update').val(CP_PURCHASING_TYPE);
      $('#oe_cp_remarkadmin_update').val(CP_REMARK_ADMIN);
      $('.selectpicker').select2('destroy');
      $('.selectpicker').select2({
          theme: "bootstrap"
      });

      $.ajax({
        url: "getItemOE",
        type: "GET",
        data: "ITEM_REQ_ID="+CP_REQ_ID,
        success: function(data){
          var obj = $.parseJSON(data);
          $("#tbodyOEItem").html(obj.content);
        }
      }); 
  }

  function oe_request_order_item_update_modal(ITEM_ID, REQ_ID, ITEM_NAME, ITEM_BRANDNAME, ITEM_SPECIFICATION, ITEM_QUANTITY, ITEM_QUANTITY_UNIT,
    ITEM_REMARK) {

        $('#oe_item_id_update').val(ITEM_ID);
        $('#oe_item_req_id_update').val(REQ_ID);
        $('#oe_item_name_update').val(ITEM_NAME);
        $('#oe_item_brandname_update').val(ITEM_BRANDNAME);
        $('#oe_item_specification_update').val(ITEM_SPECIFICATION);
        $('#oe_item_quantity_update').val(ITEM_QUANTITY);
        $('#oe_item_quantity_unit_update').val(ITEM_QUANTITY_UNIT);
        $('#oe_item_remark_update').val(ITEM_REMARK);
        $('.selectpicker').select2('destroy');
        $('.selectpicker').select2({
            theme: "bootstrap"
        });
  }

  function oe_ro_detail_modal(CP_ID, PCS_NO, CP_REQ_ID, CP_TITLE, CP_REQUIREDDATE, CP_COSTCODE, CP_PROPOSETO_NAME, 
    CP_ACKNOWLEDGEDBY_NAME, CP_STATUS, CP_REMARK_APPROVAL, PCS_PROGRESS, CP_REMARK_ADMIN, CP_RO_NO) {

      $('#oe_cp_id_detail').val(CP_ID);
      $('#oe_cp_ppno_detail').val(PCS_NO);
      if(PCS_NO = ''){
          $('#oeppmodaldiv').hide();
      }
      else{
          $('#oeppmodaldiv').show();
      }
      $('#oe_cp_req_id_detail').val(CP_REQ_ID);
      $('#oe_cp_title_detail').val(CP_TITLE);
      $('#oe_cp_ro_no_detail').val(CP_RO_NO);
      $('#oe_cp_requireddate_detail').val(CP_REQUIREDDATE);
      $('#oe_cp_costcode_detail').val(CP_COSTCODE);
      $('#oe_cp_proposeto_detail').val(CP_PROPOSETO_NAME);
      $('#oe_cp_acknowledgedby_detail').val(CP_ACKNOWLEDGEDBY_NAME);
      $('#oe_cp_status_detail').val(CP_STATUS);
      $('#oe_cp_remarkapproval_detail').val(CP_REMARK_APPROVAL);
      $('#oe_cp_progress_detail').val(PCS_PROGRESS);
      $('#oe_cp_remarkadmin_detail').val(CP_REMARK_ADMIN);

      $.ajax({
        url: "getItemOE",
        type: "GET",
        data: "ITEM_REQ_ID="+CP_REQ_ID,
        success: function(data){
          var obj = $.parseJSON(data);
          $("#tbodyOEDetailItem").html(obj.content);
        }
      }); 
  }

  

$('button#oe_request_order_delete').on('click', function(CP_REQ_ID){
    var CP_REQ_ID = $(this).attr('data-id');
    // alert(ID);
    swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this request !",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
      if (willDelete) {
        $.ajax({
                url: "RequestOrderDeleteOE?CP_REQ_ID="+CP_REQ_ID,
                type: "GET",
                success: function (data) {}         
            });
        swal("Poof! Your request has been deleted!", {
          icon: "success",
        }).then(function () {
            location.reload();
        });
      } 
  });
});


///////////////////////////////////////PROBLEM REPORT///////////////////////////////////////

$('#ProReportTable').DataTable({
  responsive: true,
  "aaSorting": [],
});

$('button#rpt_delete').on('click', function(RPT_ID){
  var RPT_ID = $(this).attr('data-id');
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
              url: "ProblemReportDelete?RPT_ID="+RPT_ID,
              type: "GET",
              success: function (data) {}         
          });
      swal("Poof! Form Report entry has been deleted!", {
        icon: "success",
      }).then(function () {
          location.reload();
      });
    } 
});
});

function rpt_update_modal(RPT_ID, RPT_PROBLEM, RPT_PICTURE, RPT_STATUS, RPT_STATUS_DATE, RPT_PIC_NAME, RPT_REMARK) {

  $('#rpt_id_update').val(RPT_ID);
  $('#rpt_update').val(RPT_PROBLEM);
  $('#rpt_picture_update').attr('src', 'https://elvis.tracon.co.id/files/ProblemReport/' + RPT_PICTURE);
  $('#rpt_status_update').val(RPT_STATUS);
  $('.selectpicker').select2('destroy');
  $('.selectpicker').select2({
    theme: "bootstrap"
  });
  
  $('#rpt_status_date_update').val(RPT_STATUS_DATE);
  
  $('#rpt_pic_update').val(RPT_PIC_NAME);
  $('.selectpicker').select2('destroy');
  $('.selectpicker').select2({
    theme: "bootstrap"
  });
  
  $('#rpt_remark_update').val(RPT_REMARK);
  
  console.log('files/ProblemReport/' + RPT_SOLVED_PICTURE);
  $('#report_solpict_update').attr('src', 'files/ProblemReport/' + RPT_SOLVED_PICTURE);
}

function rpt_detail_modal(RPT_ID, RPT_PROBLEM, RPT_PICTURE, RPT_STATUS, RPT_STATUS_DATE, RPT_PIC_NAME, RPT_REMARK, RPT_SOLVED_PICTURE){

  $('#rpt_id_detail').val(RPT_ID);
  $('#rpt_detail').val(RPT_PROBLEM);
  $('#rpt_picture_detail').attr('src', 'https://elvis.tracon.co.id/files/ProblemReport/' + RPT_PICTURE);
  $('#rpt_status_detail').val(RPT_STATUS);
  $('#rpt_status_date_detail').val(RPT_STATUS_DATE);
  
  $('#rpt_pic_detail').val(RPT_PIC_NAME);
  $('.selectpicker').select2('destroy');
  $('.selectpicker').select2({
    theme: "bootstrap"
  });

  $('#rpt_remark_detail').val(RPT_REMARK);

  console.log('files/ProblemReport/' + RPT_SOLVED_PICTURE);
  $('#rpt_solpict_detail').attr('src', 'files/ProblemReport/' + RPT_SOLVED_PICTURE);
}



///////////////////////////////////////PETTY CASH///////////////////////////////////////
 
$('#PettyCashDebitTable').DataTable({
    responsive: true,
    "aaSorting": [],
});

$('#PettyCashTable').DataTable({
    responsive: true,
    "aaSorting": [],
});

$('#PettyCashDetailTable').DataTable({
    responsive: true,
    "aaSorting": [],
});

$('#pettycash_date_add').datepicker({
    format: 'yyyy-mm-dd',
    autoclose: true
});

$('#pettycash_date_update').datepicker({
    format: 'yyyy-mm-dd',
    autoclose: true
});

$('#pettycash_expense_date_add').datepicker({
    format: 'yyyy-mm-dd',
    autoclose: true
});

$('#pettycash_expense_date_update').datepicker({
    format: 'yyyy-mm-dd',
    autoclose: true
});

$('#pettycash_debit_date_add').datepicker({
    format: 'yyyy-mm-dd',
    autoclose: true
});

$('#pettycash_debit_date_update').datepicker({
    format: 'yyyy-mm-dd',
    autoclose: true
});

$('#pettycash_debit_amount_add').autoNumeric("init", {
  aSep: '.',
  aDec: ',',
  vMin: '0',
  unSetOnSubmit: true
});

$('#pettycash_debit_add').autoNumeric("init", {
  aSep: '.',
  aDec: ',',
  vMin: '0',
  unSetOnSubmit: true
});

$('#pettycash_debit_update').autoNumeric("init", {
  aSep: '.',
  aDec: ',',
  vMin: '0',
  unSetOnSubmit: true
});

$('#pettycash_debit_detail').autoNumeric("init", {
  aSep: '.',
  aDec: ',',
  vMin: '0',
  unSetOnSubmit: true
});

$('#pettycash_expense_cost_add').autoNumeric("init", {
  aSep: '.',
  aDec: ',',
  vMin: '0',
  unSetOnSubmit: true
});

$('#pettycash_expense_cost_update').autoNumeric("init", {
  aSep: '.',
  aDec: ',',
  vMin: '0',
  unSetOnSubmit: true
});

function pettycash_expense_add_modal(CRT_ID) {
    $('#pettycash_expense_id_add').val(CRT_ID);
}

function credit_expense_update_modal(CRD_ID, CRD_DATE, CRD_REQUESTED_BY_ID, CRD_COST, LED_ID, CRD_DESCRIPTION) {
    $('#pettycash_expense_id_update').val(CRD_ID);
    $('#pettycash_expense_date_update').val(CRD_DATE);
    $('#pettycash_expense_requestedby_update').val(CRD_REQUESTED_BY_ID);
    $('#pettycash_expense_cost_update').val(CRD_COST);
    $('#pettycash_expense_costcode_update').val(LED_ID);
    $('#pettycash_expense_description_update').val(CRD_DESCRIPTION);

    $('.numeric').autoNumeric("init", {
        aSep: '.',
        aDec: ',',
        vMin: '0',
        mDec: '0',
        unSetOnSubmit: true
    });

    $('.selectpicker').select2('destroy');
    $('.selectpicker').select2({
      theme: "bootstrap"
    });
}

function credit_update_modal(CRT_ID, CRT_DATE, CRT_COSTCODE_TYPE, CRT_DEBIT, CRT_RECEIVER_ID) {
    $('#pettycash_id_update').val(CRT_ID);
    if(CRT_COSTCODE_TYPE == 'Multi'){
        $('#pettycash_multi_update').prop('checked', true);
    }
    else{
        $('#pettycash_single_update').prop('checked', true);
    }
    $('#pettycash_debit_update').val(CRT_DEBIT);
    $('#pettycash_date_update').val(CRT_DATE);
    $('#pettycash_receiver_update').val(CRT_RECEIVER_ID);

    $('#pettycash_debit_update').autoNumeric("init", {
        aSep: '.',
        aDec: ',',
        vMin: '0',
        mDec: '0',
        unSetOnSubmit: true
    });

    $('.selectpicker').select2('destroy');
    $('.selectpicker').select2({
      theme: "bootstrap"
    });
}


function debit_update_modal(DBT_ID, DBT_DATE, DBT_AMOUNT, DBT_DESCRIPTION, DBT_RECEIVER_ID) {
    $('#pettycash_debit_id_update').val(DBT_ID);
    $('#pettycash_debit_amount_update').val(DBT_AMOUNT);
    $('#pettycash_debit_description_update').val(DBT_DESCRIPTION);
    $('#pettycash_debit_date_update').val(DBT_DATE);
    $('#pettycash_debit_receiver_update').val(DBT_RECEIVER_ID);

    $('#pettycash_debit_amount_update').autoNumeric("init", {
        aSep: '.',
        aDec: ',',
        vMin: '0',
        mDec: '0',
        unSetOnSubmit: true
    });

    $('.selectpicker').select2('destroy');
    $('.selectpicker').select2({
      theme: "bootstrap"
    });
}


$('button#debit_delete').on('click', function(ID){
    var DBT_ID = $(this).attr('data-id');
    swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this debit !",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
      if (willDelete) {
        $.ajax({
                url: "PettyCashDebitDelete?DBT_ID="+DBT_ID,
                type: "GET",
                success: function (data) {}         
            });
        swal("Poof! Debit has been deleted!", {
          icon: "success",
        }).then(function () {
            location.reload();
        });
      } 
  });
});

$('button#credit_delete').on('click', function(ID){
    var CRT_ID = $(this).attr('data-id');
    swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this credit !",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
      if (willDelete) {
        $.ajax({
                url: "PettyCashCreditDelete?CRT_ID="+CRT_ID,
                type: "GET",
                success: function (data) {}         
            });
        swal("Poof! Credit has been deleted!", {
          icon: "success",
        }).then(function () {
            location.reload();
        });
      } 
  });
});

$('button#credit_expense_delete').on('click', function(ID){
    var CRD_ID = $(this).attr('data-id');
    swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this credit !",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
      if (willDelete) {
        $.ajax({
                url: "PettyCashCreditExpenseDelete?CRD_ID="+CRD_ID,
                type: "GET",
                success: function (data) {}         
            });
        swal("Poof! Credit has been deleted!", {
          icon: "success",
        }).then(function () {
            location.reload();
        });
      } 
  });
});

function ptc_update_modal(PTC_ID, PTC_LEAD_ID, PTC_DATE, PTC_DESCRIPTION, PTC_COST) {

  $('#ptc_id_update').val(PTC_ID);
  $('#ptc_costcode_update').val(PTC_LEAD_ID);
  $('.selectpicker').select2('destroy');
  $('.selectpicker').select2({
    theme: "bootstrap"
  });
  $('#ptc_date_update').val(PTC_DATE);
  $('#ptc_desc_update').val(PTC_DESCRIPTION);
  $('#ptc_cost_update').val(PTC_COST);
}

///////////////////////////////////////DOCUMENT///////////////////////////////////////

// $('#DocumentTable').DataTable({
//   responsive: true,
//   "aaSorting": [],
//     orderCellsTop: true,
//     fixedHeader: true,
//     dom: 'Bfrtip',
//     buttons: ['copy', 'excel', 'pdf', 'print']
// });
$(document).ready(function () {
  $('#table-document-list').DataTable({
    processing: true,
    serverSide: true,
    ajax: 'https://frappe.tracon.co.id/GetDocumentList',
    columns: [
      {
        data: 'DT_RowIndex', name: 'DT_RowIndex'
      },
      {
        data: 'LET_DATE', name: 'LET_DATE', visible: false
      },
      {
        data: 'date', name: 'date', "orderable": false,
      },
      {
        data: 'LET_TYPE', name: 'LET_TYPE', "orderable": true,
      },
      {
        data: 'LET_NUMBER', name: 'LET_NUMBER', "orderable": true,
      },
      {
        data: 'LET_SUBJECT', name: 'LET_SUBJECT', "orderable": true,
      },
      {
        data: 'LET_TO', name: 'LET_TO', "orderable": true,
      },
      {
        data: 'LET_CREATED_BY_NAME', name: 'LET_CREATED_BY_NAME', "orderable": true,
      },
      {
        data: 'created_date', name: 'created_date', "orderable": false,
      },
      {
        data: 'action', name: 'action'
      }
    ],
    order: [[1, "desc"]],
    columnDefs: [
      {
          target: 1,
          visible: false,
          searchable: false
      }
  ]
  });
});


function document_detail_modal(DOC_DATE, DOC_NUMBER, DOC_SUBJECT, DOC_ATTENTION, DOC_REMARK) {
      $('#document_directorate_detail').val(DOC_NUMBER.substr(-13, 4));
      $('#document_date_detail').val(DOC_DATE);
      $('#document_number_detail').val(DOC_NUMBER);
      $('#document_subject_detail').val(DOC_SUBJECT);
      $('#document_attention_detail').val(DOC_ATTENTION);
      $('#document_remark_detail').val(DOC_REMARK);
      $('.selectpicker').select2('destroy');
      $('.selectpicker').select2({
          theme: "bootstrap"
      });
}

function document_upload_modal(DOC_ID, DOC_NUMBER) {
      $('#document_id_upload').val(DOC_ID)
      $('#document_number_upload').val(DOC_NUMBER)
}


////////////////////////////////////ABT REPORT////////////////////////////////////////

$(document).ready(function(){
    $('#ABTReportTable').DataTable({
        responsive: true,
        "aaSorting": [],
        orderCellsTop: true,
        fixedHeader: true,
        dom: 'Bfrtip',
        buttons: ['copy', 'excel', 'pdf', 'print']
    });
    $('#ATPWCReportTable').DataTable({
      "aaSorting": [],
      orderCellsTop: true,
      fixedHeader: true,
      dom: 'Bfrtip',
      buttons: [{
        extend: 'copy',
        },
        {
          extend: 'excel',
          footer: true,
          filename: 'Report - Attendance All Employee',
        }
      ],
      paging: false
  });
    $('#TimesheetReportTable').DataTable({
      "aaSorting": [],
      orderCellsTop: true,
      fixedHeader: true,
      dom: 'Bfrtip',
      buttons: [{
        extend: 'copy',
        },
        {
          extend: 'excel',
          footer: true,
          filename: 'Report - Timesheet All Employee',
        }
      ],
      paging: false
  });
    $('#BTDetailTable').DataTable({

        scrollX: true,
        "aaSorting": [],
        orderCellsTop: true,
        fixedHeader: true,
        dom: 'Bfrtip',
        buttons: ['copy', 'excel'],

    });
});


////////////////////////////////////////KPI//////////////////////////////////////////////

$(document).ready(function(){
    $('#EHListTable').DataTable({
        responsive: true,
        "aaSorting": []
    });

    $('#SMListTable').DataTable({
        responsive: true,
        "aaSorting": []
    });

    $('#UMListTable').DataTable({
        responsive: true,
        "aaSorting": []
    });
});

//----------------------------------EMPLOYEE HISTORY------------------------------------//

function emh_update_modal(EMH_ID, EMH_EMPL_ID, EMH_ORG_ID, EMH_JOB_POSITION, EMH_DATE) {
      $('#emh_id_update').val(EMH_ID);
      $('#emh_empl_update').val(EMH_EMPL_ID);
      $('#emh_division_update').val(EMH_ORG_ID);
      $('#emh_jobposition_update').val(EMH_JOB_POSITION);
      $('#emh_date_update').val(EMH_DATE);
      $('.selectpicker').select2('destroy');
      $('.selectpicker').select2({
          theme: "bootstrap"
      });
}

$('button#emhdelete').on('click', function(EMH_ID){
  var EMH_ID = $(this).attr('data-id');
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
                url: "EmplHistoryDelete?EMH_ID="+EMH_ID,
                type: "GET",
                success: function (data) {}         
            });
        swal("Poof! Employee has been deleted!", {
          icon: "success",
        }).then(function () {
            location.reload();
        });
      } 
  });
});

//----------------------------------STATUS------------------------------------//

$('button#statuskpiupdate').on('click', function(KPI_ID){
  var KPI_ID = $(this).attr('data-id');
    swal({
    title: "Are you sure change status to DRAFT?",
    text: "Once updated, you will not be able to change this entry !",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
      if (willDelete) {
        $.ajax({
                url: "StatusUpdate?KPI_ID="+KPI_ID,
                type: "GET",
                success: function (data) {}         
            });
        swal("Status has been updated!", {
          icon: "success",
        }).then(function () {
            location.reload();
        });
      } 
  });
});

$('button#statuskpireaupdate').on('click', function(KPI_ID){
  var KPI_ID = $(this).attr('data-id');
    swal({
    title: "Are you sure change status to DRAFT?",
    text: "Once updated, you will not be able to change this entry !",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
      if (willDelete) {
        $.ajax({
                url: "StatusReaUpdate?KPI_ID="+KPI_ID,
                type: "GET",
                success: function (data) {}         
            });
        swal("Status has been updated!", {
          icon: "success",
        }).then(function () {
            location.reload();
        });
      } 
  });
});


//----------------------------------USER------------------------------------//

function user_update_modal(USR_ID, USR_EMPL_ID, USR_ROLE) {
      $('#usr_id_update').val(USR_ID);
      $('#usr_empl_update').val(USR_EMPL_ID);
      $('#usr_role_update').val(USR_ROLE);
      $('.selectpicker').select2('destroy');
      $('.selectpicker').select2({
          theme: "bootstrap"
      });
}

$('button#userkpirevdelete').on('click', function(USR_ID){
  var USR_ID = $(this).attr('data-id');
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
                url: "UserDelete?USR_ID="+USR_ID,
                type: "GET",
                success: function (data) {}         
            });
        swal("Poof! User has been deleted!", {
          icon: "success",
        }).then(function () {
            location.reload();
        });
      } 
  });
});



function strava_update_modal(STR_ID, STR_EMPL_NAME, STR_START) {
    $('#strava_id_update').val(STR_ID);
    $('#strava_name_update').val(STR_EMPL_NAME);
    $('#strava_start_update').val(STR_START);
    $('.selectpicker').select2('destroy');
    $('.selectpicker').select2({
      theme: "bootstrap"
    });
}

$('button#strava_delete').on('click', function(ID){
    var STR_ID = $(this).attr('data-id');
    swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this data !",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
      if (willDelete) {
        $.ajax({
                url: "StravaDelete?STR_ID="+STR_ID,
                type: "GET",
                success: function (data) {}         
            });
        swal("Poof! Data has been deleted!", {
          icon: "success",
        }).then(function () {
            location.reload();
        });
      } 
  });
});



///////////////////////////////////////////////////TICKET//////////////////////////////////////////////////////////

$(document).ready(function(){
  $('#TicketListTable').DataTable({
    responsive: true,
    "aaSorting": [],
  });

  $('#PassengerListTable').DataTable({
    responsive: true,
    "aaSorting": [],
  });
  
  $('#update_airlines_departure_div').hide();
  $('#update_train_departure_div').hide();
  $('#update_airlines_arrival_div').hide();
  $('#update_train_arrival_div').hide();
  $('#arrival').hide();
});
  
function approval_ticket_modal(TCT_ID, TCT_REQ_NUMBER, TCT_EMPL_JOBLOC, TCT_PURPOSE, TCT_TRANSPORTATION, TCT_TYPE, TCT_AIRLINES, 
                              TCT_DESTINATION_FROM, TCT_DESTINATION_TO, TCT_DEPARTURE_TIME, TCT_TYPE_ARR, TCT_AIRLINES_ARR, 
                              TCT_DESTINATION_FROM_ARR, TCT_DESTINATION_TO_ARR, TCT_DEPARTURE_TIME_ARR, TCT_COST_CODE) {
    $('#approval_ticket_id').val(TCT_ID);
    $('#approval_ticket_req_number').val(TCT_REQ_NUMBER);
    $('#approval_ticket_jobloc').val(TCT_EMPL_JOBLOC);
    $('#approval_ticket_purpose').val(TCT_PURPOSE);
    $('#approval_ticket_transportation').val(TCT_TRANSPORTATION);
    $('#approval_ticket_type').val(TCT_TYPE);

    if(TCT_TRANSPORTATION != 'Airplane') {
      $('#approval_ticket_train').val(TCT_AIRLINES);
      $('#approval_ticket_train_arr').val(TCT_AIRLINES);
      $('#update_airlines_departure_div').hide();
      $('#update_train_departure_div').show();
      $('#update_airlines_arrival_div').hide();
      $('#update_train_arrival_div').show();
    } else {
      $('#approval_ticket_airlines').val(TCT_AIRLINES);
      $('#approval_ticket_airlines_arr').val(TCT_AIRLINES_ARR);
      $('#update_airlines_departure_div').show();
      $('#update_train_departure_div').hide();
      $('#update_airlines_arrival_div').show();
      $('#update_train_arrival_div').hide();
    }
    
    // $('#approval_ticket_destination_from').val(TCT_DESTINATION_FROM);
    // $('#approval_ticket_destination_to').val(TCT_DESTINATION_TO);
    $('#approval_ticket_departure_time').val(TCT_DEPARTURE_TIME);

    if(TCT_TRANSPORTATION == 'Airplane') {
      $('#approval_airplane_departure_from_div').show();
      $('#approval_train_departure_from_div').hide();
      $('#approval_airplane_arrival_to_div').show();
      $('#approval_train_arrival_to_div').hide();
  
      $('#approval_airplane_ticket_destination_from').val(TCT_DESTINATION_FROM).change();
      $('#approval_airplane_ticket_destination_to').val(TCT_DESTINATION_TO).change();
    } else {
      $('#approval_airplane_departure_from_div').hide();
      $('#approval_train_departure_from_div').show();
      $('#approval_airplane_arrival_to_div').hide();
      $('#approval_train_arrival_to_div').show();
  
      $('#approval_train_ticket_destination_from').val(TCT_DESTINATION_FROM).change();
      $('#approval_train_ticket_destination_to').val(TCT_DESTINATION_TO).change();
    }

    if(TCT_TYPE_ARR != '') {
      $('#arrival').show();

      if(TCT_TRANSPORTATION == 'Airplane') {
        $('#approval_airplane_departure_from_arr_div').show();
        $('#approval_train_departure_from_arr_div').hide();
        $('#approval_airplane_arrival_to_arr_div').show();
        $('#approval_train_arrival_to_arr_div').hide();
    
        $('#approval_airplane_ticket_destination_from_arr').val(TCT_DESTINATION_FROM_ARR).change();
        $('#approval_airplane_ticket_destination_to_arr').val(TCT_DESTINATION_TO_ARR).change();
      } else {
        $('#approval_airplane_departure_from_arr_div').hide();
        $('#approval_train_departure_from_arr_div').show();
        $('#approval_airplane_arrival_to_arr_div').hide();
        $('#approval_train_arrival_to_arr_div').show();
    
        $('#approval_train_ticket_destination_from_arr').val(TCT_DESTINATION_FROM_ARR).change();
        $('#approval_train_ticket_destination_to_arr').val(TCT_DESTINATION_TO_ARR).change();
      }
    } else {
      $('#arrival').hide();
    }

    $('#approval_ticket_type_arr').val(TCT_TYPE_ARR);

    // $('#approval_ticket_destination_from_arr').val(TCT_DESTINATION_FROM_ARR);
    // $('#approval_ticket_destination_to_arr').val(TCT_DESTINATION_TO_ARR);

    $('#approval_ticket_departure_time_arr').val(TCT_DEPARTURE_TIME_ARR);
    $('#approval_ticket_costcode').val(TCT_COST_CODE);
    $('.selectpicker').select2('destroy');
    $('.selectpicker').select2({
      theme: "bootstrap"
    });

    $.ajax({
        url: "getPassenger",
        type: "GET",
        data: "TCT_REQ_NUMBER="+TCT_REQ_NUMBER,
        success: function(data){
            var obj = $.parseJSON(data);
            $("#tbodypassengerapproval").html(obj.content);
        }
    }); 
    // console.log();
}

function detail_ticket_modal(TCT_ID, TCT_REQ_NUMBER, TCT_EMPL_JOBLOC, TCT_PURPOSE, TCT_TRANSPORTATION, TCT_TYPE, TCT_AIRLINES, 
                            TCT_DESTINATION_FROM, TCT_DESTINATION_TO, TCT_DEPARTURE_TIME, TCT_TYPE_ARR, TCT_AIRLINES_ARR, 
                            TCT_DESTINATION_FROM_ARR, TCT_DESTINATION_TO_ARR, TCT_DEPARTURE_TIME_ARR, TCT_COST_CODE) {

  $('#detail_ticket_id').val(TCT_ID);
  $('#detail_ticket_req_number').val(TCT_REQ_NUMBER);
  $('#detail_ticket_jobloc').val(TCT_EMPL_JOBLOC);
  $('#detail_ticket_purpose').val(TCT_PURPOSE);
  $('#detail_ticket_transportation').val(TCT_TRANSPORTATION);
  $('#detail_ticket_type').val(TCT_TYPE);

  if(TCT_TRANSPORTATION != 'Airplane') {
    $('#detail_ticket_train').val(TCT_AIRLINES);
    $('#detail_ticket_train_arr').val(TCT_AIRLINES);
    $('#detail_airlines_departure_div').hide();
    $('#detail_train_departure_div').show();
    $('#detail_airlines_arrival_div').hide();
    $('#detail_train_arrival_div').show();
  } else {
    $('#detail_ticket_airlines').val(TCT_AIRLINES);
    $('#detail_ticket_airlines_arr').val(TCT_AIRLINES_ARR);
    $('#detail_airlines_departure_div').show();
    $('#detail_train_departure_div').hide();
    $('#detail_airlines_arrival_div').show();
    $('#detail_train_arrival_div').hide();
  }

  // $('#detail_ticket_destination_from').val(TCT_DESTINATION_FROM);
  // $('#detail_ticket_destination_to').val(TCT_DESTINATION_TO);

  if(TCT_TRANSPORTATION == 'Airplane') {
    $('#detail_airplane_departure_from_div').show();
    $('#detail_train_departure_from_div').hide();
    $('#detail_airplane_arrival_to_div').show();
    $('#detail_train_arrival_to_div').hide();

    $('#detail_airplane_ticket_destination_from').val(TCT_DESTINATION_FROM).change();
    $('#detail_airplane_ticket_destination_to').val(TCT_DESTINATION_TO).change();
  } else {
    $('#detail_airplane_departure_from_div').hide();
    $('#detail_train_departure_from_div').show();
    $('#detail_airplane_arrival_to_div').hide();
    $('#detail_train_arrival_to_div').show();

    $('#detail_train_ticket_destination_from').val(TCT_DESTINATION_FROM).change();
    $('#detail_train_ticket_destination_to').val(TCT_DESTINATION_TO).change();
  }

  $('#detail_ticket_departure_time').val(TCT_DEPARTURE_TIME);

  if(TCT_TYPE_ARR != '') {
    $('#arrival_detail').show();

    if(TCT_TRANSPORTATION == 'Airplane') {
      $('#detail_airplane_departure_from_arr_div').show();
      $('#detail_train_departure_from_arr_div').hide();
      $('#detail_airplane_arrival_to_arr_div').show();
      $('#detail_train_arrival_to_arr_div').hide();
  
      $('#detail_airplane_ticket_destination_from_arr').val(TCT_DESTINATION_FROM_ARR).change();
      $('#detail_airplane_ticket_destination_to_arr').val(TCT_DESTINATION_TO_ARR).change();
    } else {
      $('#detail_airplane_departure_from_arr_div').hide();
      $('#detail_train_departure_from_arr_div').show();
      $('#detail_airplane_arrival_to_arr_div').hide();
      $('#detail_train_arrival_to_arr_div').show();
  
      $('#detail_train_ticket_destination_from_arr').val(TCT_DESTINATION_FROM_ARR).change();
      $('#detail_train_ticket_destination_to_arr').val(TCT_DESTINATION_TO_ARR).change();
    }
  } else {
    $('#arrival_detail').hide();
  }

  $('#detail_ticket_type_arr').val(TCT_TYPE_ARR);

  // $('#detail_ticket_destination_from_arr').val(TCT_DESTINATION_FROM_ARR);
  // $('#detail_ticket_destination_to_arr').val(TCT_DESTINATION_TO_ARR);

  $('#detail_ticket_departure_time_arr').val(TCT_DEPARTURE_TIME_ARR);
  $('#detail_ticket_costcode').val(TCT_COST_CODE);
  $('.selectpicker').select2('destroy');
  $('.selectpicker').select2({
    theme: "bootstrap"
  });

  $.ajax({
    url: "getPassenger",
    type: "GET",
    data: "TCT_REQ_NUMBER="+TCT_REQ_NUMBER,
    success: function(data){
      var obj = $.parseJSON(data);
      $("#tbodypassengerdetails").html(obj.content);
    }
  }); 
// console.log();
}

$('button#ticketpropose').on('click', function(PAS_TCT_REQ_NUMBER){
    var PAS_TCT_REQ_NUMBER = $(this).attr('data-id');
    swal({
    title: "Are you sure?",
    text: "Once proposed, you will not be able to update or delete the KPI!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
      if (willDelete) {
        $.ajax({
                url: "TicketPropose?PAS_TCT_REQ_NUMBER="+PAS_TCT_REQ_NUMBER,
                type: "GET",
                success: function (data) {}         
            });
        swal("The Ticket has been proposed!", {
          icon: "success",
        }).then(function () {
            location.reload();
        });
      } 
  });
});
