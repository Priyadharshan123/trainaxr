function getIpaddress() {
    $.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
        var hostipinfo = data.split("\n");
        for (var i = 0; i < hostipinfo.length; i++) {
            var ipAddress = hostipinfo[i].split("=");
            if (ipAddress[0] == "ip") {
                $('#ip_address').val(ipAddress[1]);
                return false;
            }
        }
    });
}