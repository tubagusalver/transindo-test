
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    
    <link rel="apple-touch-icon" href="{{ asset('/') }}images/favicon.ico">
    <link rel="shortcut icon" href="{{ asset('/') }}images/favicon.ico">

    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>

    <title>SYSTEM - LOGIN</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/sbadmin.min.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">

</head>

<body>

    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                    </div>
                    <div class="panel-body" id="first"><br>
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
                        <form role="form" action="{{ route('PostLogin') }}" method="get">
                            <fieldset>
                                <div class="form-group">
                                    <input class="form-control" placeholder="Username" name="mem_email" autofocus required>
                                </div>
                                <div class="form-group">
                                    <input class="form-control" placeholder="Password" name="mem_password" type="password" value="" required>
                                    <input type="hidden" name="_token" value="{{ Session::token() }}"/>
                                </div>
                                <button type="submit" class="btn btn-lg btn-success btn-block">Login</button>
                            </fieldset>
                        </form>
                    </div>
                    <div class="panel-footer" align="center">
                        
                    </div>
                    <div class="col-lg-12">
                            <a type="button" class="btn btn-success" 
                                        href="{{ url('Register') }}">
                                        <b>Registrasi</b>
                                    </a>
		                </div>
                </div>
            </div>
        </div>
    </div>

</body>

</html>
