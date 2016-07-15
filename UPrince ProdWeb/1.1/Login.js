(function () {
    $(document).ready(function () {
        function accessUser() {
            //var code = $_GET('access_token');
            alert('hello');
            var code = getToken();
            localStorage.setItem('accessToken', code)
            //$("#code").append('helo');
            $("#status").append('');
            var url = "https://uprince-dev.pronovix.net/api/system/connect"
            var authorization = "Bearer " + code;

            //JQuery
            $.ajax({
                type: "POST",
                url: url,
                dataType: "json",
                //contentType: "application/json; charset=utf-8",
                headers: { "Authorization": authorization }
            })
              .done(function (str) {
                  //document.getElementById("login").innerHTML = "";
                  //document.body.style.backgroundColor = "white";
                  var email = str.user.mail;
                  localStorage.setItem("email", email);
                  //window.location.href = "project-page.html"
                  //$("#project-page").append(projectPage);
                  //loadListProjects();
                  var userId = str.user.uid;
                  localStorage.setItem("uId", userId);
                  self.close();
              })
             .fail(function (jqXHR, textStatus, errorType) {
                 app.showNotification(textStatus + ' ' + errorType);
                 //myWindow.close();
                 //self.close();
             });
        };
    });
})