<nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        
    </div>
    <ul class="nav navbar-top-links navbar-left">
        <!-- /.dropdown -->
    </ul>
    <!-- /.navbar-header -->
    <ul class="nav navbar-top-links navbar-right">
        <li><a href="#">Welcome, {{ Session::get('nama_user') }}</a></li>
        <li><a href="{{ url ('/logout') }}"><i class="fa fa-sign-out fa-fw"></i> Logout</a></li>
        <!-- /.dropdown -->
    </ul>
    <!-- /.navbar-top-links -->

    <div class="navbar-default sidebar" role="navigation">
        <div class="sidebar-nav navbar-collapse">
            <ul class="nav" id="side-menu">
                <li>
                    <a href="{{ url ('Dashboard') }}"><i class="fa fa-dashboard fa-fw"></i> &nbsp; Dashboard</a>
                </li>
                <li>
                    <a href="{{ url ('RentList') }}"><i class="fa fa-list"></i> &nbsp&nbsp Sewa Mobil</a>
                </li>
                <li>
                    <a href="{{ url ('DataRef') }}"><i class="fa fa-list"></i> &nbsp&nbsp Data Referensi Mobil</a>
                </li>
                <li>
                    <a href="{{ url ('Profile') }}"><i class="fa fa-list"></i> &nbsp&nbsp Profile</a>
                </li>
            </ul>
        </div>
        <!-- /.sidebar-collapse -->
    </div>
    <!-- /.navbar-static-side -->
</nav>