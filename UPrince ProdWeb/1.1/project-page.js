/// <reference path="../App.js" />
(function () {
    "use strict";
    var qualityCriteriaId;
    var projectId;
    var ProductDescriptionId;
    var host = 'https://uprincecoredevapi.azurewebsites.net';
    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            var dummy = "<li id='12'><a href='#'>EMiel</a></li>";
            $("#listProjects").append(dummy);
            app.initialize();
            app.showNotification('jello')
            function loadListProjects() {
                app.showNotification('hello');
                var email = sessionStorage.getItem('email')
                var dataEmail = {
                    "customer": "",
                    "email": "emiel.vanhaesebrouck@outlook.com",
                    "isFocused": {
                        "customer": false,
                        "title": false
                    },
                    "isRecycled": false,
                    "orderField": "id",
                    "sortOrder": "ASC",
                    "status": {
                        "Active": false,
                        "All": true,
                        "Closed": false,
                        "New": false
                    },
                    "title": "",
                    "toleranceStatus": {
                        "All": true,
                        "OutofTolerance": false,
                        "Tolerancelimit": false,
                        "WithinTolerance": false
                    }
                };
                $.ajax({
                    type: "POST",
                    url: "https://uprincecoredevapi.azurewebsites.net/api/project/GetProjectList",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(dataEmail),
                })
                  .done(function (str) {
                      var test = str;
                      var length = Object.keys(str).length;
                      //$("#listProjects").append('<ul id="listProjects" class="nav nav-pills nav-stacked">');
                      for (var i = 0; i < length; i++) {
                          var dummy = "<li id='".concat(str[i].id, "'><a href='#'>", str[i].title, "</a></li>");
                          $("#listProjects").append(dummy);
                      }
                  })


            };
          
           
        });
    };
})();