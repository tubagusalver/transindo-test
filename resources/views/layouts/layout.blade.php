
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    
    <title>FRAPPE (inFRAstructure Panel PagE)</title>

    <!-- jQuery -->
    <script src="js/jquery.min.js"></script>
    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="css/metisMenu.min.css" rel="stylesheet">

    <!-- DataTables CSS -->
    <link href="css/dataTables.bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css"  href="https://cdn.datatables.net/buttons/1.4.0/css/buttons.dataTables.min.css" />

    <!-- DataTables Responsive CSS -->
    <link href="css/dataTables.responsive.css" rel="stylesheet">

    <!-- Bootstrap Datepicker CSS -->
    <link href="css/bootstrap-datetimepicker.min.css" rel="stylesheet">
    
    <!-- DataTables Responsive CSS -->
    <link href="css/bootstrap-datepicker.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/sbadmin.min.css" rel="stylesheet">

    <!-- Select2 CSS -->
    <link href="css/select2.min.css" rel="stylesheet">

    <!-- Select2 Bootstrap CSS -->
    <link href="css/select2-bootstrap.min.css" rel="stylesheet">

    <!-- Multi Select CSS -->
    <link href="css/multi-select.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <link rel="apple-touch-icon" href="{{ asset('/') }}images/favicon.ico">
    <link rel="shortcut icon" href="{{ asset('/') }}images/favicon.ico">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- Chart Javascript -->
    <script src="js/Chart.min.js"></script>

</head>

<body>
    <div id="wrapper">

        @include('includes.navbar')

        <div id="page-wrapper">
            @yield('main_container')
            @yield('modal-content')
        </div>
        
    </div>
    <!-- /#wrapper -->


    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="js/metisMenu.min.js"></script>

    <!-- DataTables JavaScript -->
    <script src="js/jquery.dataTables.min.js"></script>
    <script src="js/dataTables.bootstrap.min.js"></script>
    <script src="js/dataTables.responsive.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
    <script src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/pdfmake.min.js"></script>
    <script src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/vfs_fonts.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.4.0/js/dataTables.buttons.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.4.0/js/buttons.flash.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.4.0/js/buttons.html5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.4.0/js/buttons.print.min.js"></script>

    <!-- Bootstrap Datepicker JavaScript -->
    <script src="js/bootstrap-datetimepicker.min.js"></script>
    <!-- Sweet Alert Plugin JavaScript -->
    <script src="js/bootstrap-datepicker.min.js"></script>

    <!-- Sweet Alert Plugin JavaScript -->
    <script src="js/sweetalert.min.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="js/sbadmin.js"></script>

    <!-- Select2 JavaScript -->
    <script src="js/select2.min.js"></script>

    <!-- Multi Select JavaScript -->
    <script src="js/jquery.multi-select.js"></script>
    
    <script src="js/jquery.quicksearch.js"></script>
    
    <script src="js/jquery.inputmask.js"></script>
    
    <script src="js/autoNumeric.min.js"></script>

    <script src="js/app.js?n={{ rand(0,1000) }}"></script>
    
    <!-- Chart Javascript -->
    <script src="js/Chart.min.js"></script>

    <!-- Page-Level Demo Scripts - Tables - Use for reference -->

    @stack('script')

    @yield('script')

</body>

</html>
