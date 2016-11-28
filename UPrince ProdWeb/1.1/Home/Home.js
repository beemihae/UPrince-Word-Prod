/// <reference path="../App.js" />
/// <reference path="Home.js" />
(function () {
    "use strict";
    var qualityCriteriaId;
    var projectId;
    var ProductDescriptionId;
    //var host = 'https://uprincecoreprodapi.azurewebsites.net';
    var host = 'https://uprincecoredevapi.azurewebsites.net';
    var projectCanvas = {};

    var projectPage = '<div class="main-wrapper">' +
                        '<header class="col-lg-12 col-md-12 col-sm-12 col-xs-12 header-top">' +
                            '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding full-height">' +
                                '<div class="header-sub header-glyph full-height">' +
                                    '<p title="UPrince.Projects">' +
                                        '<span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span>' +
                                    '</p>' +
                                '</div>' +
                                '<div class="header-sub h1-div">' +
                                    '<h1 class="roboto-light">Projects</h1>' +
                                '</div>' +
                                '<div class="header-sub" style="position:absolute;right:15px">' +
                                    '<p class="fake-link" id="logOut" style="font-size:12px;font-weight:100;vertical-align:middle">Log Out</p>' +
                                '</div>' +
                            '</div>' +
                        '</header>' +
                        '<section class="col-lg-12 col-md-12 col-sm-12 col-xs-12 modal-div relationship container no-padding">' +
                            '<div class="col-sm-12 row-projects">' +
                                '<input class=form-control id=projectSearch>' +
                                '<span class="glyphicon form-control-filter glyphicon-filter"aria-hidden=true></span>' +
                            '</div>' +
                            '<div id="listProjects" class="nav nav-pills nav-stacked"></div>' +
                        '</section>' +
                    '</div>';

    var myWindow;
    var previous = 0;
    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();
            localStorage.setItem("loggedIn", 'false');

            accessUser();

            //after log in go to project page, clicking sign in button
            /*$(document).on("click", "#btnSignIn", function () {
                ////app.showNotification(JSON.stringify(bowser, null, '    '));
                var x = document.getElementById("email");
                var email = x.elements[0].value;
                if (email.length != 0) {
                    localStorage.setItem("email", email);
                    //window.location.href = "../project-page.html"
                    document.getElementById("login").innerHTML = "";
                    document.body.style.backgroundColor = "white";
                    $("#project-page").append(projectPage);
                    loadListProjects();
                }
                else {
                    //app.showNotification('Please enter login');
                }
            });*/

            //after log in go to project page, enter in emailfield
            /* $(document).submit("#email", function (event) {
                 document.body.style.backgroundColor = "white";
                 var x = document.getElementById("email");
                 var email = x.elements[0].value;
                 localStorage.setItem("email", email);
                 //window.location.href = "project-page.html"
                 document.getElementById("login").innerHTML = "";
                 $("#project-page").append(projectPage);
                 loadListProjects();
             })*/

            //go to product description page, after clicking a project
            $(document).on('click', "#listProjects li", function () {
                var projectId = $(this).attr("id");
                localStorage.setItem("projectId", projectId);

                var projectName = document.getElementById(projectId).innerHTML;
                //alert(projectName);
                var regex = /(<([^>]+)>)/ig;

                projectName = projectName.replace(regex, "");
                localStorage.setItem('projectName', projectName);

                //window.location.href = "product-description-page.html"
                document.getElementById("project-page").innerHTML = "";

                var productDescriptionPageWord =
                    '<div class="content-main">' +
                        '<div class="main-wrapper">' +
                            '<header class="col-lg-12 col-md-12 col-sm-12 col-xs-12 header-top">' +
                                '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding full-height">' +
                                    '<div id="link-project-page" class="header-sub header-glyph full-height">' +
                                        '<p class="fake-link" title="UPrince.Projects">' +
                                            '<span class="glyphicon glyphicon-th-large" aria-hidden="true"></span>' +
                                        '</p>' +
                                   '</div>' +
                                   '<div class="header-sub h1-div">' +
                                        '<h1 id="projectName" class="roboto-light" style="font-weight:700"></h1>' +
                                   '</div>' +
                                   '<div class="header-sub" style="position:absolute;right:15px">' +
                                        '<p class="fake-link" id="logOut" style="font-size:12px;font-weight:100;vertical-align:middle">Log Out</p>' +
                                   '</div>' +
                                '</div>' +
                            '</header>' +
                            '<section class="col-lg-12 col-md-12 col-sm-12 col-xs-12 modal-div relationship container no-padding">' +
                                '<div class="col-sm-12 row-projects">' +
                                    '<input class="form-control" id="productSearch">' +
                                    '<span class="glyphicon form-control-filter glyphicon-filter" aria-hidden="true"></span>' +
                                '</div>' +
                                '<div class="col-sm-12 row-projects bg-ash alignleft">' +
                                    '<span class="glyphicons sun"></span>' +
                                    '<strong id="canvasTab">Project Canvas</strong>' +
                                    '<button id="saveBtnCanvas" class="saveButton" disabled>Publish</button>' +
                                '</div>' +
                                '<div class="col-sm-12 row-projects bg-ash alignleft">' +
                                    '<span class="icon-icon_ProductDescription"></span>' +
                                    '<strong>Product Descriptions</strong>' +
                                    '<button id="saveBt" class="saveButton">Publish</button>' +
                                '</div>' +
                                '<!-- filter -->' +
                                '<!-- menu starts -->' +
                                '<div class="panel-group col-md-12 no-padding">' +
                                    '<div id="listContainer">' +
                                        '<ul id="expList" class="nav nav-pills nav-stacked collapsibleList" style="margin-top:2px"></ul>' +
                                    '</div>' +
                                '</div>' +
                            '</section>' +
                        '</div>' +
                    '</div>';

                var productDescriptionPageOnline =
                    '<div class="content-main">' +
                        '<div class="main-wrapper">' +
                            '<header class="col-lg-12 col-md-12 col-sm-12 col-xs-12 header-top">' +
                                '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding full-height">' +
                                    '<div id="link-project-page" class="header-sub header-glyph full-height">' +
                                        '<p class="fake-link" title="UPrince.Projects">' +
                                            '<span class="glyphicon glyphicon-th-large" aria-hidden="true"></span>' +
                                        '</p>' +
                                    '</div>' +
                                    '<div class="header-sub h1-div">' +
                                        '<h1 id="projectName" class="roboto-light" style="font-weight:700"></h1>' +
                                    '</div>' +
                                    '<div class="header-sub" style="position:absolute;right:15px">' +
                                        '<p class="fake-link" id="logOut" style="font-size:12px;font-weight:100;vertical-align:middle">Log Out</p>' +
                                    '</div>' +
                                '</div>' +
                            '</header>' +
                            '<section class="col-lg-12 col-md-12 col-sm-12 col-xs-12 modal-div relationship container no-padding">' +
                                '<div class="col-sm-12 row-projects">' +
                                    '<input class="form-control" id="productSearch">' +
                                    '<span class="glyphicon form-control-filter glyphicon-filter" aria-hidden="true"></span>' +
                                '</div>' +
                                '<div class="col-sm-12 row-projects bg-ash alignleft">' +
                                    '<span class="glyphicons sun"></span>' +
                                    '<strong>Project Canvas</strong>' +
                                '</div>' +
                                '<div class="col-sm-12 row-projects bg-ash alignleft">' +
                                    '<span class="icon-icon_ProductDescription"></span>' +
                                    '<strong>Product Descriptions</strong>' +
                                '</div>' +
                                '<!-- filter -->' +
                                '<!-- menu starts -->' +
                                '<div class="panel-group col-md-12 no-padding">' +
                                    '<div id="listContainer">' +
                                        '<ul id="expList" class="nav nav-pills nav-stacked collapsibleList" style="margin-top:2px"></ul>' +
                                    '</div>' +
                                '</div>' +
                            '</section>' +
                        '</div>' +
                    '</div>';

                $('#product-description-page').append(productDescriptionPageWord);
                $(document).find('#saveBt').prop('disabled', false);

                $("#projectName").html(projectName);
                loadList();
            });

            $(document).on('click', '#canvasTab', function (e) {
                e.stopPropagation();

                var div = $('div');

                $('#saveBtnCanvas').attr('disabled', false);
                getProjectCanvas();
            });

            //click a product description, and opens a prod description
            $(document).on("click", 'ul li', function (e) {
                e.stopPropagation();
                localStorage.setItem('productDescriptionId', $(this).attr('id'));

                var div = $("<div>");

                Office.context.document.setSelectedDataAsync(div.html(), {
                    coercionType: "html"
                }, testForSuccess);

                getProductDescription();

                /*if (Microsoft.Office.WebExtension.context.document instanceof OSF.DDA.ExcelWebAppDocument) {
                    getProductDescription();
                    //app.showNotification('Publish is not supported by office online.');
                    $(document).find('#saveBt').prop('disabled', true);
                }
    
                else (Microsoft.Office.WebExtension.context.document instanceof OSF.DDA.ExcelDocument) {
                    getProductDescription();
                    //app.showNotification('Desktop version');

                }*/
                //setHeader();
            });

            // save project canvas
            $(document).on("click", "#saveBtnCanvas", function (e) {
                if (Office.context.requirements.isSetSupported('HtmlCoercion')) {
                    saveProjectCanvas();
                } else {
                    //app.showNotification('You can only "Publish" with Office Desktop (PC/MAC).')
                }
            });

            //after selecting all the text, it adapts the prod descrp on the server
            $(document).on("click", "#saveBt", function () {
                //saveJson();
                if (Office.context.requirements.isSetSupported('HtmlCoercion')) {
                    saveJson();
                } else {
                    //app.showNotification('You can only "Publish" with Office Desktop (PC/MAC).')
                }
            });

            //go back from prod descrp page to project page
            $(document).on("click", "#link-project-page", function () {
                document.getElementById("product-description-page").innerHTML = "";
                document.getElementById("login").innerHTML = "";

                $("#project-page").append(projectPage);

                loadListProjects();

                document.getElementById("product-description-page").innerHTML = "";
            });

            //log out function, forget the email and go back to log out screen
            $(document).on('click', "#logOut", function () {
                logOut();
            });

            $(document).on('input', '#projectSearch', function () {
                var x = document.getElementById("projectSearch").value;
                var projectSearch;
                var update;
                if (x.length > 2) {
                    projectSearch = x;
                } else { projectSearch = ""; };
                //document.getElementById("name").innerHTML = projectSearch
                if ((previous == 1) && (x.length == 2)) { };
                document.getElementById("listProjects").innerHTML = "";
                loadListProjects(projectSearch);
                previous = x.length;
            });

            $(document).on('input', '#productSearch', function () {
                var projectId = localStorage.getItem("projectId");
                var x = document.getElementById("productSearch").value;
                if (x.length == 0) {
                    $("#expList").html('');
                    getProductDescriptionList("");
                } else {
                    var dataEmail = {
                        "category": {
                            "All": true,
                            "I": false,
                            "E": false
                        },
                        "projectId": projectId,
                        "itemId": "",
                        "version": "",
                        "title": x,
                        "identifier": "",
                        "type": {
                            "All": true,
                            "T1": false,
                            "T2": false,
                            "T3": false
                        },
                        "state": {
                            "All": true,
                            "New": false,
                            "Draft": false,
                            "Approval": false,
                            "Version": false
                        },
                        "isFocused": {
                            "item": false,
                            "version": false,
                            "title": false
                        },
                        "currentPage": 1,
                        "totalRecords": 0,
                        "sorting": "",
                        "parentid": null,
                        "sortField": "title",
                        "sortOrder": "ASC"
                    };

                    $.ajax({
                        type: "POST",
                        url: host + "/api/productdescription/Search",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(dataEmail),
                    })
                    .done(function (str) {
                        $("#expList").html('');
                        for (var i = 0; i < str.length; i++) {
                            var dummy = '<li id="' + str[i].Id + '" "style = "height: 35px"><a href="javascript: void(0);" class="p-l-30">' + str[i].Title + '</a></li>';
                            $("#expList").append(dummy);
                        }
                    });
                };
            });

            $(document).on('click', "#btnSignIn", function () {
                if ((navigator.userAgent.indexOf('iPad') != -1) /*|| !(Office.context.requirements.isSetSupported('HtmlCoercion'))*/) { //iPad
                    var child = window.open("https://plaza.uprince.com/oauth2/authorize?client_id=thoa4iaGh9aidei8aeb9AiyeesohghaicieGipua6jie1Sai6AiquiegheiZowah&scope=profile&state=CSFR&response_type=token&redirect_uri=https%3A%2F%2Fdocument.uprince.com%2F1.1%2Fhome%2Fios.html", "");
                    //window.location.href = "https://plaza.uprince.com/oauth2/authorize?client_id=thoa4iaGh9aidei8aeb9AiyeesohghaicieGipua6jie1Sai6AiquiegheiZowah&scope=profile&state=CSFR&response_type=token&redirect_uri=https%3A%2F%2Fuprincewordprod.azurewebsites.net%2F1.1%2Fhome%2Fios.html"

                    ////app.showNotification(navigator.userAgent);
                    //var child = window.open("http://www.w3schools.com/jsref/prop_nav_useragent.asp");
                    var timer = setInterval(checkChild, 500);
                } else {
                    //window.location.href = "https://plaza.uprince.com/oauth2/authorize?client_id=thoa4iaGh9aidei8aeb9AiyeesohghaicieGipua6jie1Sai6AiquiegheiZowah&scope=profile&state=CSFR&response_type=token&redirect_uri=https%3A%2F%2Fdocument.uprince.com%2F1.1%2Fhome%2Fhome.html"
                    window.location.href = "https://plaza.uprince.com/oauth2/authorize?client_id=thoa4iaGh9aidei8aeb9AiyeesohghaicieGipua6jie1Sai6AiquiegheiZowah&scope=profile&state=CSFR&response_type=token&redirect_uri=https%3A%2F%2Fpmstudioofficedev.azurewebsites.net%2F1.1%2Fhome%2Fhome.html"

                    //dummyLogin();
                }

            });
        });
    };

    function checkChild() {
        if (localStorage.getItem("loggedIn") == 'true') {
            //$("#closed").append('closed');
            clearInterval(timer);

            document.getElementById("login").innerHTML = "";
            document.body.style.backgroundColor = "white";
            $("#project-page").append(projectPage);
            loadListProjects();
            ////app.showNotification(navigator.userAgent);
        }
    }

    //perform this function on the pop-up screen
    function accessUser() {
        //var code = $_GET('access_token');
        var code = getToken();
        localStorage.setItem('accessToken', code)
        $("#status").append('');
        var url = "https://plaza.uprince.com/api/system/connect"
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
            document.getElementById("login").innerHTML = "";
            document.body.style.backgroundColor = "white";
            var email = str.user.mail;
            localStorage.setItem("email", email);
            //window.location.href = "project-page.html"
            $("#project-page").append(projectPage);
            loadListProjects("");
            var userId = str.user.uid;
            localStorage.setItem("uId", userId);
            localStorage.setItem('loggedIn', 'true')
            self.close();
        })
        .fail(function (jqXHR, textStatus, errorType) {
            ////app.showNotification(textStatus + ' ' + errorType);
            //myWindow.close();
            //self.close();
        });
    };

    function logOut() {
        var code = localStorage.getItem('accessToken');
        var uId = localStorage.getItem('uId');
        var url = "https://plaza.uprince.com/api/core/logout_user";
        var authorization = "Bearer " + code;

        //JQuery
        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            headers: { "Authorization": authorization },
            data: { uid: uId }
        })
        .done(function (str) {
            if (str.success) {
                ////app.showNotification("success");
                //window.location.href = "https://document.uprince.com/1.1/home/home.html"
                window.location.href = 'https://pmstudioofficedev.azurewebsites.net/1.1/home/home.html';

                localStorage.setItem("loggedIn", 'false');
                localStorage.setItem("email", '');
                localStorage.setItem("uId", '');
            }
            //else //app.showNotification("Log out failed, please try again.");
        })
        .fail(function (jqXHR, textStatus, errorType) {
            ////app.showNotification('Log out failed. Please check your internet connection and try again.')
            //alert(textStatus + ' ' + errorType);
        });
    }

    function setHeader(projectName) {
        Word.run(function (context) {
            // Create a proxy object for the sections collection.
            var sections = context.document.sections;

            // Queue a commmand to load the text property for all of the sections.
            context.load(sections, 'text');

            // Synchronize the document state by executing the queued commands, 
            // and return a promise to indicate task completion.
            return context.sync()
                .then(function () {

                    // Insert content into the header.
                    var headerSection = sections.items[0].getHeader('primary');
                    headerSection.clear();

                    // Insert content into the footer.
                    var footerSection = sections.items[0].getFooter('primary');
                    footerSection.clear();

                    // Synchronize the document state by executing the queued commands, 
                    // and return a promise to indicate task completion.
                    return context.sync().then(function () {
                        showMessage('Success! Removed Header and Footer.');
                    });
                });
        });

        // Run a batch operation against the Word object model.
        Word.run(function (context) {
            // Create a proxy object for the sections collection.
            var sections = context.document.sections;

            // Queue a commmand to load the text property for all of the sections.
            context.load(sections, 'text');

            // Synchronize the document state by executing the queued commands, 
            // and return a promise to indicate task completion.
            return context.sync().then(function () {
                // Insert content into the header.
                var headerSection = sections.items[0].getHeader('primary');
                headerSection.insertText(projectName, Word.InsertLocation.end);

                // Insert content into the footer.
                var footerSection = sections.items[0].getFooter('primary');
                footerSection.insertText('All rights reserved.', Word.InsertLocation.end);

                // Synchronize the document state by executing the queued commands, 
                // and return a promise to indicate task completion.
                return context.sync().then(function () {
                    //showMessage('Success! Added Header and Footer. Select the arrow button to move on.');
                });
            });
        })
        .catch(function (error) {
            console.log('Error: ' + JSON.stringify(error));

            if (error instanceof OfficeExtension.Error) {
                console.log('Debug info: ' + JSON.stringify(error.debugInfo));
            }
        });
    }

    function getToken() {
        var url = window.location.href;
        var startParam = url.indexOf('access_token');
        var start = url.indexOf('=', startParam) + 1;
        var eind = url.indexOf('&', start)
        return url.substring(start, eind);
    }

    function dummyLogin() {
        document.getElementById('login').innerHTML = '';
        document.body.style.backgroundColor = 'white';
        $('#project-page').append(projectPage);

        localStorage.setItem('email', 'afi@exilesoft.com');
        localStorage.setItem('uId', 7);
        localStorage.setItem('loggedIn', 'true');

        //accessUser();
        loadListProjects('');
    }

    //load projects in to projectpage from server
    function loadListProjects(projectSearch) {
        var email = localStorage.getItem('email');
        var dataEmail = {
            "customer": "",
            "email": email,
            "isFocused": {
                "customer": false,
                "title": false
            },
            "isRecycled": false,
            "orderField": "title",
            "sortOrder": "ASC",
            "status": {
                "Active": false,
                "All": true,
                "Closed": false,
                "New": false
            },
            "title": projectSearch,
            "toleranceStatus": {
                "All": true,
                "OutofTolerance": false,
                "Tolerancelimit": false,
                "WithinTolerance": false
            }
        };

        $.ajax({
            type: "POST",
            url: host + "/api/project/GetProjectList",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(dataEmail),
        })
        .done(function (str) {
            console.log(str)
            document.getElementById("listProjects").innerHTML = "";

            var test = str;
            var length = Object.keys(str).length;

            $("#listProjects").append('<ul id="listProjects" class="nav nav-pills nav-stacked">');

            for (var i = 0; i < length; i++) {
                var dummy = "<li id='".concat(str[i].id, "'><a href='#'>", str[i].title, "</a></li>");

                $("#listProjects").append(dummy);
            }
        })


    };

    //load all the product descrip from server
    function loadList() {
        //var projectName = localStorage.getItem('projectName');
        //$("#projectName").html(projectName);
        $("#listProductDescription").html('');
        var projectId = localStorage.getItem('projectId'); //when using the login-screen
        //var projectId = '22050'; //to test just this page
        getProductDescriptionList("");
        /*var urlProject = host + '/api/ProductDescription/GetAllProductDescription?projectId=' + projectId;

        $.ajax({
            type: 'GET',
            url: urlProject,
            dataType: "json",
            contentType: "application/json; charset=utf-8",

        })
          .done(function (str) {
              organizeList(str);
          })*/
    };

    //lay out from prod descpr page
    function organizeList(str) {
        var length = str.length;
        var count = 0;
        var id = [];
        for (var i = 0; i < length; i++) {
            if (str[i].ParentId == null) {
                //var dummy = '<li id="' + str[i].Id + '"style = "height: 38px; padding-left: 5px;text-indent: 5px;"><a href="javascript: void(0);" class="p-l-30">' + str[i].Title + '</a> ';
                var dummy = '<li id="' + str[i].Id + '"style = " padding-left: 5px;text-indent: 5px;"><a href="javascript: void(0);" class="p-l-30" >' + str[i].Title + '</a> ';
                if (str[i].HasChildren) {
                    dummy = dummy + '<ul id="L' + str[i].Id + '"style = " padding-left: 5px;text-indent: 5px;" class="nav nav-pills nav-stacked"></li>'
                } else {
                    dummy = dummy + '</li>'

                }
                $("#expList").append(dummy);
                count++;
                id.push("" + str[i].Id)
            }
        };
        while (count < length) {
            for (var i = 0; i < length; i++) {
                if ((id.indexOf("" + str[i].Id) == -1) && (id.indexOf("" + str[i].ParentId) != -1)) {
                    var dummy = '<li id="' + str[i].Id + '" "style = "height: 35px"><a href="javascript: void(0);" class="p-l-30">' + str[i].Title + '</a>';
                    //var dummy = '<li id="' + str[i].Id + '"><span  class="p-l-30 fake-link">' + str[i].Title + '</span>';

                    if (str[i].HasChildren) {
                        dummy = dummy + '<ul id="L' + str[i].Id + '" class="nav nav-pills nav-stacked" "style = "height: 35px"></li>'
                    } else {
                        dummy = dummy + '</li>'

                    }
                    $("#L" + str[i].ParentId).append(dummy);
                    count++;
                    id.push("" + str[i].Id)
                };
            };
        };
        //prepareList();

    };

    function getProductDescriptionList(parentId) {
        var projectId = localStorage.getItem('projectId');
        var dataEmail = {
            "category": {
                "All": true,
                "I": false,
                "E": false
            },
            "projectId": projectId,
            "itemId": "",
            "version": "",
            "title": "",
            "identifier": "",
            "type": {
                "All": true,
                "T1": false,
                "T2": false,
                "T3": false
            },
            "state": {
                "All": true,
                "New": false,
                "Draft": false,
                "Approval": false,
                "Version": false
            },
            "isFocused": {
                "item": false,
                "version": false,
                "title": false
            },
            "currentPage": 1,
            "totalRecords": 0,
            "sorting": "",
            "parentid": null,
            "sortField": "title",
            "sortOrder": "ASC"
        };
        $.ajax({
            type: "POST",
            url: host + "/api/productdescription/GetProductDescriptionList",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(dataEmail),
        })
        .done(function (str) {
            organizeListPD(str);
        });
    };

    function organizeListPD(str) {
        for (var i = 0; i < str.length; i++) {

            //var dummy = '<li id="' + str[i].Id + '"style = "height: 38px; padding-left: 5px;text-indent: 5px;"><a href="javascript: void(0);" class="p-l-30">' + str[i].Title + '</a> ';
            var dummy = '<li id="' + str[i].Id + '"style = " padding-left: 5px;text-indent: 5px;"><a href="javascript: void(0);" class="p-l-30" >' + str[i].Title + '</a> ';
            if (str[i].HasChildren) {
                dummy = dummy + '<ul id="L' + str[i].Id + '"style = " padding-left: 5px;text-indent: 5px;" class="nav nav-pills nav-stacked"></li>'
                $("#expList").append(dummy);
                appendChildren(str[i].Id);

            } else {
                dummy = dummy + '</li>'
                $("#expList").append(dummy);
            }

            //count++;
            //id.push("" + str[i].Id)


        };
    };

    function appendChildren(parentId) {
        var projectId = localStorage.getItem('projectId');
        var dataEmail = {
            "category": {
                "All": true,
                "I": false,
                "E": false
            },
            "projectId": projectId,
            "itemId": "",
            "version": "",
            "title": "",
            "identifier": "",
            "type": {
                "All": true,
                "T1": false,
                "T2": false,
                "T3": false
            },
            "state": {
                "All": true,
                "New": false,
                "Draft": false,
                "Approval": false,
                "Version": false
            },
            "isFocused": {
                "item": false,
                "version": false,
                "title": false
            },
            "currentPage": 1,
            "totalRecords": 0,
            "sorting": "",
            "parentid": parentId,
            "sortField": "title",
            "sortOrder": "ASC"
        };
        $.ajax({
            type: "POST",
            url: host + "/api/productdescription/GetProductDescriptionList",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(dataEmail),
        })
          .done(function (str) {
              organizeChild(str, parentId);
          });
    };

    function organizeChild(str, parentId) {
        for (var i = 0; i < str.length; i++) {
            var dummy = '<li id="' + str[i].Id + '"style = " padding-left: 5px;text-indent: 5px;"><a href="javascript: void(0);" class="p-l-30" >' + str[i].Title + '</a> ';
            if (str[i].HasChildren) {
                dummy = dummy + '<ul id="L' + str[i].Id + '" class="nav nav-pills nav-stacked" "style = "height: 35px"></li>';
                $("#L" + parentId).append(dummy);
                appendChildren(str[i].Id)
            } else {
                dummy = dummy + '</li>'
                $("#L" + parentId).append(dummy);
            }
        }
    };
    //expand and colllapse list, not in use
    function prepareList() {
        $('#expList').find('li:has(ul)')
          .click(function (event) {
              if (this == event.target) {
                  $(this).toggleClass('expanded');
                  $(this).children('ul').toggle('medium');
                  e.stopPropagation();
                  localStorage.setItem('productDescriptionId', $(this).attr('id'));
                  var div = $("<div>");
                  Office.context.document.setSelectedDataAsync(div.html(), {
                      coercionType: "html"
                  }, testForSuccess);
                  getProductDescription();
              }
              return false;
          })
          .addClass('collapsed')
          .children('ul').hide();
    };

    ///////////////////////////////////////

    // functions for setting project canvas

    function getDataObject(url, projectId) {
        var projectParam = '?projectId=' + projectId;

        return {
            type: 'GET',
            url: host + url + projectParam,
            dataType: 'json',
            jsonp: false,
            xhrFields: {
                withCredentials: false
            }
        };
    }

    function getPlanDataObject(url, planId) {
        var planParam = '?planId=' + planId;

        return {
            type: 'GET',
            url: host + url + planParam,
            dataType: 'json',
            jsonp: false,
            xhrFields: {
                withCredentials: false
            }
        };
    }

    function getPostDataObject(url, payload) {
        return {
            type: 'POST',
            url: host + url,
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: 'application/json'
            //jsonp: false,
            //xhrFields: {
            //    withCredentials: false
            //},
            //processData: false
        };
    }

    function getRisksFilter(projectId) {
        return {
            projectId: projectId,
            identifier: '',
            title: '',
            riskStatus: {
                All: true,
                New: false,
                Active: false,
                Closed: false
            },
            riskType: {
                All: true,
                Threat: false,
                Opportunity: false
            },
            dateRegistered: '',
            riskOwner: '',
            sortField: 'title',
            sortOrder: 'ASC'
        };
    }

    function getTeamMembersFilter(projectId) {
        return {
            sortOrder: 'ASC',
            sortField: 'firstname',
            projectId: projectId,
            firstName: ''
        };
    }

    // async service calls to get project canvas document data
    function getProjectCanvas() {
        var projectId = localStorage.getItem('projectId');

        $.when(
            $.ajax(getDataObject('/api/ProjectBrief/GetProjectDefinition', projectId)).done(function (data) {
                projectCanvas.projectDefinition = data;
            }),
            $.ajax(getDataObject('/api/ProjectProductDescription/GetProjectProductDescription', projectId)).done(function (data) {
                projectCanvas.ppd = data;
            }),
            $.ajax(getDataObject('/api/Benefits/GetBenefitsItemRegister', projectId)).done(function (data) {
                projectCanvas.benefits = data;
            }),
            $.ajax(getDataObject('/api/BusinessCase/GetBusinessCase', projectId)).done(function (data) {
                projectCanvas.businessCase = data;
            }),
            $.ajax(getDataObject('/api/productdescription/GetAllProductDescription', projectId)).done(function (data) {
                projectCanvas.products = data;
            }),
            $.ajax(getDataObject('/api/ProjectCharter/GetProjectCharter', projectId)).done(function (data) {
                projectCanvas.projectCharter = data;
            }),
            $.ajax(getPostDataObject('/api/RiskRegister/GetRiskRegister', getRisksFilter(projectId))).done(function (data) {
                projectCanvas.risks = data;
            }),
            $.ajax(getPostDataObject('/api/TeamMember/GetTeamMemberList', getTeamMembersFilter(projectId))).done(function (data) {
                projectCanvas.teamMembers = data;
            })
        ).then(function () {
            $.ajax(getPlanDataObject('/api/Plan/GetPlan', projectCanvas.projectCharter.projectPlan)).done(function (projectPlanData) {
                projectCanvas.projectPlan = projectPlanData;

                setProjectCanvas(projectCanvas);
            });
        });
    }

    // uses project product description data (accpetance object)
    function getRequirementsTable(requirements) {    
        var table =
        '<table id="requirements-table">' +
            // '<thead>' +
                '<tr>' +
                    '<th>Acceptance Criteria</th>' +
                    '<th>Quality Tolerance</th>' +
                    '<th>Acceptance Method</th>' +
                    '<th>Acceptance Responsibilities</th>'
                '</tr>';
            // '</thead>';

        // table += '<tbody>';

        if (requirements) {
            requirements.forEach(function (requirement) {
                table +=
                '<tr>' +
                    '<td id="requirement-' + requirement.id + '">' + requirement.acceptanceCriteria + '</td>' +
                    '<td>' + requirement.qualityTolerance + '</td>' +
                    '<td>' + requirement.acceptanceMethod + '</td>' +
                    '<td>' + requirement.acceptanceResponsibilities + '</td>' +
                '</tr>';
            });
        }

        // table += '</tbody>';
        table += '</table>';

        return table;
    }

    function getDeliverablesTable(products) {
        var table =
        '<table id="deliverables-table">' +
            '<thead>' +
                '<tr>' +
                    '<th>Title</th>' +
                    '<th>Status</th>' +
                    '<th>Type</th>' +
                    '<th>Version</th>'
                '</tr>' +
            '</thead>';

        table += '<tbody>';

        if (products) {
            products.forEach(function (product) {
                table +=
                '<tr>' +
                    '<td id="product-' + product.Id + '">' + product.Title + '</td>' +
                    '<td>' + product.Status + '</td>' +
                    '<td>' + product.ProductCategory + '</td>' +
                    '<td>' + product.Version + '</td>' +
                '</tr>';
            });
        }

        table += '</tbody>';
        table += '</table>';

        return table;
    }

    // uses benefits data
    function getSmartGoalsTable(smartGoals) {
        var table =
        '<table id="smart-goals-table">' +
            '<thead>' +
                '<tr>' +
                    '<th>Title</th>' +
                    '<th>Status</th>' +
                    '<th>Owner</th>' +
                    '<th>Version</th>'
                '</tr>' +
            '</thead>';

        table += '<tbody>';

        if (smartGoals) {
            smartGoals.forEach(function (smartGoal) {
                table +=
                '<tr>' +
                    '<td id="smart-goal-' + smartGoal.Id + '">' + smartGoal.title + '</td>' +
                    '<td>' + smartGoal.status + '</td>' +
                    '<td>' + smartGoal.owner + '</td>' +
                    '<td>' + smartGoal.version + '</td>' +
                '</tr>';
            });
        }

        table += '</tbody>';
        table += '</table>';

        return table;
    }

    function getRisksTable(risks) {
        var table =
        '<table id="risks-table">' +
            '<thead>' +
                '<tr>' +
                    '<th>Title</th>' +
                    '<th>Status</th>' +
                    '<th>Type</th>' +
                    '<th>Type</th>'
                '</tr>' +
            '</thead>';

        table += '<tbody>';

        if (risks) {
            risks.forEach(function (risk) {
                table +=
                '<tr>' +
                    '<td id="risk-' + risk.id + '">' + risk.title + '</td>' +
                    '<td>' + risk.riskStatus + '</td>' +
                    '<td>' + risk.riskType + '</td>' +
                    '<td>' + risk.riskOwner + '</td>'
                '</tr>';
            });
        }

        table += '</tbody>';
        table += '</table>';

        return table;
    }

    function setProjectCanvas(projectCanvas) {
        var layout = "<head><style>p.MsoTitle, li.MsoTitle, div.MsoTitle{mso-style-link:'Title Char';margin:0in;margin-bottom:.0001pt;font-size:28.0pt;font-family:'Calibri Light',sans-serif;letter-spacing:-.5pt;},table {border-collapse: collapse;width:100%;} table, th, td {border: 1px solid black;text-align: 'left';  font-family: 'Calibri', 'sans-serif'} p,ol,ul{ font-family: 'Calibri', 'sans-serif'}</style></head>";
        var header = '<p class=MsoTitle>Project Canvas</p>';

        setHeader('Project Canvas');

        var worldContext = '<h1 id="the-world-title">1. The World</h1>';
        var worldContextJson = projectCanvas.projectDefinition.background;

        var businessContext = '<h1 id="business-context-title">2. Business Context (Background)</h1>';
        var businessContextJson = projectCanvas.projectDefinition.buisinessContext;

        var project = '<h1 id="project-title">3. Project</h1>';
        var projectPurpose = '<h2 id="project-purpose-title">3.1 Project Purpose</h2>';
        var projectPurposeJson = projectCanvas.ppd.purpose;
        
        var projectScope = '<h2 id="project-scope-title">3.2 Project Scope</h2>';
        var projectScopeJson = projectCanvas.projectDefinition.projectScope;

        var qualityExpectations = '<h2 id="quality-expectations-title">3.3 Quality Expectations</h2>';
        var qualityExpectationsJson = projectCanvas.ppd.qualityExpectation;

        var products = '<h1 id="products-title">4. Products</h1>';
        var requirements = '<h2 id="requirements-title">4.1 Requirements</h2>';
        var requirementsTable = getRequirementsTable(projectCanvas.ppd.acceptance);

        var deliverables = '<h2 id="deliverables-title">4.2 Deliverables</h2>';
        var deliverablesTable = getDeliverablesTable(projectCanvas.products);

        var human = '<h1 id="human-title">5. Human</h1>';
        var smartGoals = '<h2 id="smart-goals-title">5.1 Smart Goals</h2>';
        var smartGoalsTable = getSmartGoalsTable(projectCanvas.benefits);

        var userBenefits = '<h2 id="user-benefits-title">5.2 User Benefits</h2>';
        var userBenefitsJson = projectCanvas.businessCase.benefits;

        var userDisbenefits = '<h2 id="user-disbenefits-title">5.3 User Disbenefits</h2>';
        var userDisbenefitsJson = projectCanvas.businessCase.disbenefits;

        var timeCost = '<h1 id="time-and-cost-title">6.Time and Cost</h1>';
        var investmentAppraisal = '<h2 id="investment-appraisal-title">6.1 Investment Appraisal</h2>';
        var investmentAppraisalJson = projectCanvas.businessCase.investmentAppraisal;

        var cost = '<h2 id="cost-title">6.2 Cost</h2>';
        var costJson = projectCanvas.projectPlan.budgets;

        var schedule = '<h2 id="schedule-title">6.3 Schedule</h2>';
        var scheduleJson = projectCanvas.projectPlan.schedule;

        var stakeholders = '<h1 id="stakeholders-title">7. Stakeholders</h1>';
        var usersOtherParties = '<h2 id="users-and-other-title">7.1 Users and Other Interested</h2>';
        var usersOtherPartiesJson = projectCanvas.projectDefinition.usersOtherParties;

        var pmts = '<h2 id="pmts-title">7.2 PMTS</h2>';
        var pmtsJson = '';

        var risks = '<h1 id="risks-title">8. Risks</h1>';
        var risksJson = getRisksTable(projectCanvas.risks);

        var assumptions = '<h1 id="assumptions-title">9. Assumptions and Constraints</h1>';
        var assumptionsJson = projectCanvas.projectDefinition.constraints;

        var endOfDocument = '<h2>End of Document...</h2>';

        var div = $("<div>").append(
                layout, header, 
                worldContext, worldContextJson,
                businessContext, businessContextJson, 
                project, 
                projectPurpose, projectPurposeJson, 
                projectScope, projectScopeJson,
                qualityExpectations, qualityExpectationsJson,
                products,
                requirements, requirementsTable,
                deliverables, deliverablesTable,
                human,
                smartGoals, smartGoalsTable,
                userBenefits, userBenefitsJson,
                userDisbenefits, userDisbenefitsJson,
                timeCost,
                investmentAppraisal, investmentAppraisalJson,
                cost, costJson,
                schedule, scheduleJson,
                stakeholders,
                usersOtherParties, usersOtherPartiesJson,
                pmts, pmtsJson,
                risks, risksJson,
                assumptions, assumptionsJson,
                endOfDocument
            );

        // insert HTML into Word document
        // Run a batch operation against the Word object model.
        Word.run(function (context) {
            // Create a proxy object for the document body.
            var body = context.document.body;

            // Queue a commmand to insert HTML into the beginning of the body.
            body.insertHtml(div.html(), Word.InsertLocation.replace);

            // Synchronize the document state by executing the queued commands,
            // and return a promise to indicate task completion.
            return context.sync().then(function () {
                console.log('HTML added to the beginning of the document body.');
            });
        })
        .catch(function (error) {
            console.log('Error: ' + JSON.stringify(error));

            if (error instanceof OfficeExtension.Error) {
                console.log('Debug info: ' + JSON.stringify(error.debugInfo));
            }
        });
    }

    ////////////////////////////////////////////////////

    //uses ajax to get JSON file with productdescription
    function getProductDescription() {
        var productDescriptionId = localStorage.getItem('productDescriptionId');
        var urlid = host + "/api/productdescription?id=" + productDescriptionId;

        $.ajax({
            type: 'GET',
            url: urlid,
            dataType: "json",
            jsonp: false,
            xhrFields: {
                withCredentials: false
            }
        }).done(function (str) {
            var layout = "<head><style>p.MsoTitle, li.MsoTitle, div.MsoTitle{mso-style-link:'Title Char';margin:0in;margin-bottom:.0001pt;font-size:28.0pt;font-family:'Calibri Light',sans-serif;letter-spacing:-.5pt;},table {border-collapse: collapse;} table, th, td {border: 1px solid black;text-align: 'left';  font-family: 'Calibri', 'sans-serif'} p,ol,ul{ font-family: 'Calibri', 'sans-serif'}</style></head>";
            var header = "<p class=MsoTitle>Product Description: ".concat(str.Title, "</p>");

            setHeader(localStorage.getItem('projectName'));

            //purpose
            var purpose = "<h1>Purpose</h1>";
            var purposeJson = str.Purpose;
            //composition
            var composition = "<h1>Composition</h1>";
            var compositionJson = str.Composition;
            //derivation
            var derivation = "<h1>Derivation</h1>";
            var derivationJson = str.Derivation;
            //format
            var format = "<h1>Format and Presentation</h1>";
            var formatJson = str.FormatPresentation;
            var devSkills = "<h1>Development Skills Required</h1>"
            var devSkillsJson = str.DevSkills;

            //qualityCriteria
            var qualityCriteria = "<h1>Quality Criteria</h1>";
            var tableQC = '<table style="width:100%" id="table5">' +
                            '<tr>' +
                                '<th>Quality Criteria</th>' +
                                '<th>Quality Tolerance</th>' +
                                '<th>Quality Method</th>' +
                                '<th>Quality Skills Required</th>' +
                            '</tr>';
            //checks how many criterias there are, write them out in table form
            qualityCriteriaId = [str.QualityCriteria.length];
            for (var i = 0; i < str.QualityCriteria.length; i++) {
                var criteria; var tolerance; var method; var skills;
                //programm if functions 
                if (str.QualityCriteria[i].Criteria == null) {
                    criteria = "";
                } else criteria = str.QualityCriteria[i].Criteria;
                if (str.QualityCriteria[i].Tolerance == null) {
                    tolerance = "";
                } else tolerance = str.QualityCriteria[i].Tolerance;
                if (str.QualityCriteria[i].Method == null) {
                    method = "";
                } else method = str.QualityCriteria[i].Method;
                if (str.QualityCriteria[i].Skills == null) {
                    skills = "";
                } else skills = str.QualityCriteria[i].Skills;

                tableQC = tableQC.concat("<tr><td>".concat(criteria,
                  "</td><td>", tolerance, "</td><td>", method,
                  "</td><td>", skills).concat("</td></tr>"));
                qualityCriteriaId[i] = str.QualityCriteria[i].QualityCriteriaId;
            }

            localStorage.setItem("qualityCriteriaId", JSON.stringify(qualityCriteriaId));

            //Qualityresponsibility
            var responsibilities = "<h1>Quality Responsibilities</h1>"
            var reviewers; var producer; var approvers;
            if (str.QualityResponsibility === null) {
                var tableResponsibility = "<table style='width:100%'> <tr><th>Role</th><th>Responsible Individuals</th></tr><tr><th>Product Producer</th><td><p>"
                  .concat("", "</p></td></tr><tr><th>Product Reviewer(s)</th><td>",
                    "",
                    "</td></tr><tr><th>Product Approver(s)</th><td>",
                    "", "</td></tr>");
                tableResponsibility = tableResponsibility.concat("</table>");
            } else {
                if (str.QualityResponsibility.Producer == null) {
                    producer = "";
                }
                else {
                    producer = str.QualityResponsibility.Producer;
                };
                if (str.QualityResponsibility.Reviewers == null) {
                    reviewers = "";
                }
                else {
                    reviewers = str.QualityResponsibility.Reviewers;
                };
                if (str.QualityResponsibility.Approvers == null) {
                    approvers = "";
                }
                else {
                    approvers = str.QualityResponsibility.Approvers;
                };
                var tableResponsibility = "<table style='width:100%'> <tr><th>Role</th><th>Responsible Individuals</th></tr><tr><th>Product Producer</th><td><p>"
                  .concat(producer, "</p></td></tr><tr><th>Product Reviewer(s)</th><td>",
                    reviewers,
                    "</td></tr><tr><th>Product Approver(s)</th><td>",
                    approvers, "</td></tr>");
                tableResponsibility = tableResponsibility.concat("</table>");
            };

            var div = $("<div>")
              .append(layout, header, purpose, purposeJson, composition, compositionJson, derivation,
                derivationJson, format, formatJson, devSkills, devSkillsJson, qualityCriteria, tableQC.concat("</table>"), responsibilities, tableResponsibility);
            // insert HTML into Word document
            /* Office.context.document.setSelectedDataAsync(div.html(), {
                 coercionType: "html"
             }, testForSuccess);*/
            /*var div = $("<div>")
                   .append(str.Title);
            Office.context.document.setSelectedDataAsync(div.html(), { coercionType: "html" }, testForSuccess)*/
            // Run a batch operation against the Word object model.
            Word.run(function (context) {

                // Create a proxy object for the document body.
                var body = context.document.body;

                // Queue a commmand to insert HTML in to the beginning of the body.
                body.insertHtml(div.html(), Word.InsertLocation.replace);

                // Synchronize the document state by executing the queued commands,
                // and return a promise to indicate task completion.
                return context.sync().then(function () {
                    console.log('HTML added to the beginning of the document body.');
                });
            })
            .catch(function (error) {
                console.log('Error: ' + JSON.stringify(error));
                if (error instanceof OfficeExtension.Error) {
                    console.log('Debug info: ' + JSON.stringify(error.debugInfo));
                }
            });
        })
        .error(function (jqXHR, textStatus, errorThrown) {
           // //app.showNotification('fail')
        });
    };

    //////////////////////////////////////

    // functions for saving project canvas
    function getFieldPostObject(url, type, content) {
        var projectId = localStorage.getItem('projectId');

        return {
            type: "POST",
            url: host + url,
            contentType: 'application/json;charset=UTF-8',
            dataType: "json",
            data: JSON.stringify({
                "projectId": +projectId,
                "type": +type,
                "content": content
            }),
            processData: false
        };
    }

    function getFieldPayloadObject(type, content) {
        var projectId = localStorage.getItem('projectId');

        return {
            projectId: +projectId,
            type: +type,
            content: content
        };
    }

    function getPlanPayloadObject(type, content) {
        var planId = +projectCanvas.projectPlan.identifier;

        return {
            projectPlanId: +planId,
            type: +type,
            content: content
        };
    }

    function saveProjectDefinitionFields(html) {
        var url = '/api/ProjectBrief/PostProjectDefinition';

        var worldContext = extractChapter(html, '>1. The World', '>2. Business Context (Background)');
        var businessContext = extractChapter(html, '>2. Business Context (Background)', '>3. Project');
        var projectScope = extractChapter(html, '>3.2 Project Scope', '>3.3 Quality Expectations');
        var usersOtherParties = extractChapter(html, '>7.1 Users and Other Interested', '>7.2 PMTS');
        var assumptions = extractChapter(html, '>9. Assumptions', '>End of Document...');

        $.ajax(getFieldPostObject(url, 1, worldContext));
        $.ajax(getFieldPostObject(url, 9, businessContext));
        $.ajax(getFieldPostObject(url, 4, projectScope));
        $.ajax(getFieldPostObject(url, 7, usersOtherParties));
        $.ajax(getFieldPostObject(url, 5, assumptions));
    }

    function savePPDFields(html) {
        var url = '/api/ProjectProductDescription/PostPPDescriptionDetails';

        var projectPurpose = extractChapter(html, '>3.1 Project Purpose', '>3.2 Project Scope');
        var qualityExpectations = extractChapter(html, '>3.3 Quality Expectations', '>4. Products');

        $.ajax(getPostDataObject(url, getFieldPayloadObject(2, projectPurpose)));
        $.ajax(getPostDataObject(url, getFieldPayloadObject(6, qualityExpectations)));
    }

    function saveBusinessCaseFields(html) {
        var url = '/api/BusinessCase/PostBusinessCase';

        var investmentAppraisal = extractChapter(html, '>6.1 Investment Appraisal', '>6.2 Cost');
        var userBenefits = extractChapter(html, '>5.2 User Benefits', '>5.3 User Disbenefits');
        var userDisbenefits = extractChapter(html, '>5.3 User Disbenefits', '>6. Time and Cost');

        $.ajax(getPostDataObject(url, getFieldPayloadObject(8, investmentAppraisal)));
        $.ajax(getPostDataObject(url, getFieldPayloadObject(4, userBenefits)));
        $.ajax(getPostDataObject(url, getFieldPayloadObject(5, userDisbenefits)));
    }

    function saveProjectPlanFields(html) {
        var url = '/api/Plan/PostPlanDetail';

        var cost = extractChapter(html, '>6.2 Cost', '>6.3 Schedule');
        var schedule = extractChapter(html, '>6.3 Schedule', '>7. Stakeholders');

        $.ajax(getPostDataObject(url, getPlanPayloadObject(7, cost)));
        $.ajax(getPostDataObject(url, getPlanPayloadObject(9, schedule)));
    }

    function extractTable(html, type) {
        // var heading, propTotal, pattern, idPrefix;

        // switch (type) {
        //     case 'requirements':
        //         heading = 'Requirements';
        //         propTotal = 4;
        //         pattern = /(requirement-\d*)/g;
        //         idPrefix = 'requirement-';
        //         break;
        //     case 'deliverables':
        //         heading = 'Deliverables';
        //         propTotal = 3;
        //         pattern = /(deliverable-\d*)/g;
        //         idPrefix = 'deliverable-';
        //         break;
        //     case 'smartGoals':
        //         heading = 'Smart Goals';
        //         propTotal = 3;
        //         pattern = /(smart-goal-\d*)/g;
        //         idPrefix = 'smart-goal-';
        //         break;
        //     case 'risks':
        //         heading = 'Risks';
        //         propTotal = 3;
        //         pattern = /(risk-\d*)/g;
        //         idPrefix = 'risk-';
        //         break;
        // }

        if (html.indexOf('>Acceptance Responsibilities') != -1) {
            var start = str.indexOf('>Acceptance Responsibilities');
            var flag1 = str.indexOf('>Acceptance Responsibilities');
            var flag2 = str.indexOf('>Acceptance Responsibilities');
            var rows = 0;

            // increment each time a tr is spotted
            while (str.indexOf('<tr>', flag1) < str.indexOf('</table>', start)) {
                rows++;
                flag1 = str.indexOf('<tr>', flag1) + 3;
            }

            var records = new Array(rows);

            for (var j = 0; j < rows; j++) {
                // allow an extra index for the ID
                records[j] = new Array(5);

                for (var i = 0; i <= 4; i++) {
                    records[j][i] = '';
                }
            }

            for (var i = 0; i < rows; i++) {
                var flag3 = str.indexOf("<td", flag2);
                var flag4 = str.indexOf(">", flag3) + 1;
                var flag5 = str.indexOf("</td>", flag4);

                var id = str.substring(flag3, flag4)
                            .match(/(requirement-\d*)/g)
                            .replace('requirement-', '');

                records[i][0] = id;
                records[i][1] = str.substring(flag4, flag5);

                flag3 = str.indexOf("<td", flag5);
                flag4 = str.indexOf(">", flag3) + 1;
                flag5 = str.indexOf("</td>", flag4);
                records[i][2] = str.substring(flag4, flag5);

                flag3 = str.indexOf("<td", flag5);
                flag4 = str.indexOf(">", flag3) + 1;
                flag5 = str.indexOf("</td>", flag4);
                records[i][3] = str.substring(flag4, flag5);

                // if (propTotal === 4) {
                flag3 = str.indexOf("<td", flag5);
                flag4 = str.indexOf(">", flag3) + 1;
                flag5 = str.indexOf("</td>", flag4);
                records[i][4] = str.substring(flag4, flag5);
                // }

                flag2 = flag5;
            }

            return records;
        } else {
            return null;
        }
    }

    function saveRequirementsTable(html) {
        var projectId = localStorage.getItem('projectId');
        var url = '/api/ProjectProductDescription/PostPPDAcceptance';
        var requirements = extractTable(html, 'requirements');

        if (requirements) {
            requirements.forEach(function (record) {
                $.ajax({
                    type: 'POST',
                    url: host + url,
                    contentType: 'application/json;charset=UTF-8',
                    data: JSON.stringify({
                        projectId: projectId,
                        projectProductDescriptionAcceptanceId: record[0],
                        acceptanceCriteria: record[1],
                        acceptanceMethod: record[2],
                        acceptanceResponsibilities: record[3],
                        qualityTolerance: record[4]
                    }),
                    dataType: 'json',
                    processData: false
                });
            });
        }
    }

    function saveProjectCanvas() {
        Word.run(function (ctx) {
            var projectId = localStorage.getItem('projectId');

            // Create a proxy object for the document body.
            var body = ctx.document.body;

            // Queue a commmand to get the HTML contents of the body.
            var bodyHTML = body.getHtml();
            
            // Synchronize the document state by executing the queued-up commands, 
            // and return a promise to indicate task completion.
            return ctx.sync().then(function () {
                var html = bodyHTML.value;
                html = html.replace(/\s\s+/g, ' ');

                $(document).find('#saveBtnCanvas').prop('disabled', true);

                var border = html.indexOf("<div style='bord");

                while (border !== -1) {
                    var endBorder = html.indexOf(">", border);

                    html = html.substring(0, border) + html.substring(endBorder + 1);
                    border = html.indexOf("<div style='bord");
                }

                saveProjectDefinitionFields(html);
                savePPDFields(html);
                saveBusinessCaseFields(html);
                saveProjectPlanFields(html);

                // saveRequirementsTable(html);
            });
        });
    }

    //////////////////////////////////////////

    //adapt the JSON file with the latest info
    function saveJson() {
        Word.run(function (ctx) {
            // Create a proxy object for the document body.
            var body = ctx.document.body;

            // Queue a commmand to get the HTML contents of the body.
            var bodyHTML = body.getHtml();

            // Synchronize the document state by executing the queued-up commands, 
            // and return a promise to indicate task completion.
            return ctx.sync().then(function () {
                var html = bodyHTML.value;
                $(document).find('#saveBt').prop('disabled', true);
                var ID = localStorage.getItem('productDescriptionId');
                html = html.replace(/\s\s+/g, ' ');
                if (html.indexOf(">Puprose") == -1 &&
                   html.indexOf(">Composition") == -1 &&
                   html.indexOf(">Derivation") == -1 &&
                   html.indexOf(">Format and Presentation") == -1 &&
                   html.indexOf(">Development Skills Required") == -1 &&
                   html.indexOf(">Quality Criteria") == -1) {
                    ////app.showNotification("Please select all (ctrl+a) the text before publishing.")
                    $(document).find('#saveBt').prop('disabled', false);
                }
                else {
                    var border = html.indexOf("<div style='bord")
                    while (border !== -1) {
                        var endBorder = html.indexOf(">", border);
                        html = html.substring(0, border) + html.substring(endBorder + 1);
                        border = html.indexOf("<div style='bord");
                    }
                    //still has to clean out, the differents vars, was for testing
                    var title = extractTitle(html);
                    var purpose = extractChapter(html, ">Purpose", ">Composition");
                    $.ajax({
                        type: "POST",
                        url: host + "/api/productdescription/PostRTValue",
                        dataType: "json",
                        data: {
                            "ProductDescriptionIndex": "1",
                            "ProductDescriptionId": ID,
                            "ProductDescriptionProperty": purpose
                        },
                        success: function () {


                        },

                        error: function () {
                            //app.showNotification('Error');
                        }
                    });

                    var composition = extractChapter(html, ">Composition", ">Derivation");
                    $.ajax({
                        type: "POST",
                        url: host + "/api/productdescription/PostRTValue",
                        dataType: "json",
                        data: {
                            "ProductDescriptionIndex": "2",
                            "ProductDescriptionId": ID,
                            "ProductDescriptionProperty": composition
                        },
                        success: function () {


                        },
                        error: function () {
                            //app.showNotification('Error');
                        }
                    });

                    var derivation = extractChapter(html, ">Derivation", ">Format and Presentation");
                    $.ajax({
                        type: "POST",
                        url: host + "/api/productdescription/PostRTValue",
                        dataType: "json",
                        data: {
                            "ProductDescriptionIndex": "3",
                            "ProductDescriptionId": ID,
                            "ProductDescriptionProperty": derivation
                        },
                        success: function () {


                        },
                        error: function () {
                            //app.showNotification('Error');
                        }
                    });

                    var formatPresentation = extractChapter(html, ">Format and Presentation", ">Development Skills Required");
                    $.ajax({
                        type: "POST",
                        url: host + "/api/productdescription/PostRTValue",
                        dataType: "json",
                        data: {
                            "ProductDescriptionIndex": "4",
                            "ProductDescriptionId": ID,
                            "ProductDescriptionProperty": formatPresentation
                        },
                        success: function () {

                        },
                        error: function () {
                            //app.showNotification('Error');
                        }
                    });

                    var devSkills = extractChapter(html, ">Development Skills Required", ">Quality Criteria");
                    $.ajax({
                        type: "POST",
                        url: host + "/api/productdescription/PostRTValue",
                        dataType: "json",
                        data: {
                            "ProductDescriptionIndex": "5",
                            "ProductDescriptionId": ID,
                            "ProductDescriptionProperty": devSkills
                        },
                        success: function () {

                        },
                        error: function () {
                            //app.showNotification('Error');
                        }
                    });
                    var qualityCriteria = extractDevSkills(html);
                    if (qualityCriteria.length == 0) {
                        $(document).find('#saveBt').prop('disabled', false);
                    }
                    var qualityCriteriaId = JSON.parse(localStorage.getItem("qualityCriteriaId"));
                    for (var i = 0; i < qualityCriteriaId.length; i++) {
                        var urlId = host + "/api/productdescription/DeleteQualityCriteria?criteriaId=" + qualityCriteriaId[i];
                        $.ajax({
                            type: "DELETE",
                            url: urlId,
                            success: function () {

                            },
                            error: function () {
                                //app.showNotification('Error');
                            }
                        });
                    }
                    for (var i = 0; i < qualityCriteria.length; i++) {
                        $.ajax({
                            type: "POST",
                            url: host + "/api/productdescription/PostQualityCriteria",
                            dataType: "json",
                            data: {
                                "QualityCriteriaId": null,
                                "ProductDescriptionId": ID,
                                "Criteria": qualityCriteria[i][0],
                                "Tolerance": qualityCriteria[i][1],
                                "Method": qualityCriteria[i][2],
                                "Skills": qualityCriteria[i][3]
                            },
                            success: function () {

                            },
                            error: function () {
                                //app.showNotification('Error');
                            }
                        }).done(function (str) {
                            if (i == qualityCriteria.length) {
                                $.ajax({
                                    type: 'GET',
                                    url: host + "/api/productdescription?id=" + localStorage.getItem('productDescriptionId'),
                                    dataType: "json",
                                    jsonp: false,
                                    xhrFields: {
                                        withCredentials: false
                                    }
                                }).done(function (str) {
                                    qualityCriteriaId = [str.QualityCriteria.length];
                                    for (var i = 0; i < str.QualityCriteria.length; i++) {
                                        qualityCriteriaId[i] = str.QualityCriteria[i].QualityCriteriaId;
                                    }
                                    $(document).find('#saveBt').prop('disabled', false);
                                })
                                ;
                            }
                        });

                    }
                    /* $.ajax({
                         type: 'GET',
                         url: "http://uprincecoredevapi.azurewebsites.net/api/productdescription?id=" + localStorage.getItem('productDescriptionId'),
                         dataType: "json",
                         jsonp: false,
                         xhrFields: {
                             withCredentials: false
                         }
                     }).done(function (str) {
                         qualityCriteriaId = [str.QualityCriteria.length];
                         for (var i = 0; i < str.QualityCriteria.length; i++) {
                             qualityCriteriaId[i] = str.QualityCriteria[i].QualityCriteriaId;
                         }
                         //app.showNotification('success')
                     })
                     ;
                     */
                    var responsibilities = extractResponsibilities(html);
                    $.ajax({
                        type: "POST",
                        url: host + "/api/productdescription/PostQualityResponsibility",
                        dataType: "json",
                        data: {
                            "ProductDescriptionId": ID,
                            "Producer": responsibilities[0],
                            "Reviewer": responsibilities[1],
                            "Approver": responsibilities[2]
                        },
                        success: function () {

                        },
                        error: function () {
                            //app.showNotification('Error');
                        }
                    });

                    ////app.showNotification(devSkills);
                    ////app.showNotification(responsibilities[0]);
                }

            });
        })
        .catch(function (error) {
            console.log("Error: " + JSON.stringify(error));
        });

    };

    //extract title from the document
    function extractTitle(str) {
        var flag = str.indexOf(">Title");
        if (flag != -1) {
            var begin = flag + 8;
            var end = str.indexOf("</", flag);
            return str.substring(begin, end);
        } else return '';
    };

    //extract a chapter from the HTML code
    function extractChapter(str, startChapter, stopChapter) {
        var flag = str.indexOf(startChapter);
        if (flag != -1 && str.indexOf(stopChapter) != -1) {
            var begin = str.indexOf("</h", flag) + 5;
            var flag2 = str.indexOf(stopChapter);
            var end = str.lastIndexOf('<h', flag2);
            return str.substring(begin, end);
        } else if (flag === -1) return '';
        else {
            var begin = str.indexOf("</h", flag) + 5;
            var end = str.indexOf('<h', begin);
            if (end < begin) end = str.length - 1;
            return str.substring(begin, end);
        }
    };

    //extract responsibilities and returns a list 
    function extractResponsibilities(str) {
        var respons = [3];
        // in some lay-outs they use 3 white spaces
        var test1 = str.indexOf('>Product Producer');
        var test2 = str.indexOf('>Product Producer');

        if (str.indexOf('>Product Producer') != -1) {
            var flag = str.indexOf(">Product Producer");
            var flag4 = 0;
            var flag2 = 0;
            var flag3 = 0;
            if (flag != -1) {
                var flagvalue = str.charAt(flag);
                var flag2 = str.indexOf("</td>", flag) + 10;
                var flag2value = str.charAt(flag2);
                var flag3 = str.indexOf(">", flag2) + 1;
                var flag3value = str.charAt(flag3);
                flag4 = str.indexOf("</td>", flag3);
                var flag4value = str.charAt(flag4);
                var producer = str.substring(flag3, flag4);
                //producer = producer.toString();
                producer = producer.replace(/(<([^>]+)>)/ig, "");
                producer = producer.replace("\u00a0", "")
                producer = producer.replace(/<style([\s\S]*?)<\/style>/gi, '');
                producer = producer.replace(/<script([\s\S]*?)<\/script>/gi, '');
                producer = producer.replace(/<\/div>/ig, '\n');
                producer = producer.replace(/<\/li>/ig, '\n');
                producer = producer.replace(/<li>/ig, '  *  ');
                producer = producer.replace(/<\/ul>/ig, '\n');
                producer = producer.replace(/<\/p>/ig, '\n');
                producer = producer.replace(/<br\s*[\/]?>/gi, "\n");
                producer = producer.replace(/<[^>]+>/ig, '')
                respons[0] = producer;
            } else respons[0] = '';

            flag = str.indexOf(">Product Reviewer(s)", flag4);
            if (flag != -1) {
                flag2 = str.indexOf("</td>", flag) + 10;
                flag3 = str.indexOf(">", flag2) + 1;
                flag4 = str.indexOf("</td>", flag3);
                var reviewer = str.substring(flag3, flag4);
                respons[1] = reviewer;
            } else respons[1] = '';

            flag = str.indexOf(">Product Approver(s)", flag4);
            if (flag != -1) {
                flag2 = str.indexOf("</td>", flag) + 10;
                flag3 = str.indexOf(">", flag2) + 1;
                flag4 = str.indexOf("</td>", flag3);
                var approver = str.substring(flag3, flag4);
                respons[2] = approver;
            } else respons[2] = '';
            ////app.showNotification(reviewer);
            return respons;
        } else {
            respons[0] = '';
            respons[1] = '';
            respons[2] = '';
            return respons
        }
    };

    //extract Development Skills and returns a matrix
    function extractDevSkills(str) {
        ////app.showNotification('initialized devskills')
        if (str.indexOf('>Quality Skills Required') != -1) {
            var start = str.indexOf('>Quality Skills Required');
            var flag1 = str.indexOf('>Quality Skills Required');
            var flag2 = str.indexOf('>Quality Skills Required');
            var criteria = 0;

            while (str.indexOf('<tr>', flag1) < str.indexOf('</table>', start)) {
                criteria++;
                flag1 = str.indexOf('<tr>', flag1) + 3;
            }
            var devSkills = new Array(criteria);
            for (var j = 0; j < criteria; j++) {
                devSkills[j] = new Array(4);
                for (var i = 0; i < 4; i++) {
                    devSkills[j][i] = '';
                }
            }

            for (var i = 0; i < criteria; i++) {
                var flag3 = str.indexOf("<td", flag2);
                var flag4 = str.indexOf(">", flag3) + 1;
                var flag5 = str.indexOf("</td>", flag4);
                devSkills[i][0] = str.substring(flag4, flag5);

                flag3 = str.indexOf("<td", flag5);
                flag4 = str.indexOf(">", flag3) + 1;
                flag5 = str.indexOf("</td>", flag4);
                devSkills[i][1] = str.substring(flag4, flag5);


                flag3 = str.indexOf("<td", flag5);
                flag4 = str.indexOf(">", flag3) + 1;
                flag5 = str.indexOf("</td>", flag4);
                devSkills[i][2] = str.substring(flag4, flag5);


                flag3 = str.indexOf("<td", flag5);
                flag4 = str.indexOf(">", flag3) + 1;
                flag5 = str.indexOf("</td>", flag4);
                devSkills[i][3] = str.substring(flag4, flag5);

                flag2 = flag5;
            }
            return devSkills;
        } else return null
    };

    //test for completion of request
    function testForSuccess(asyncResult) {
        if (asyncResult.status === Office.AsyncResultStatus.Failed) {
            ////app.showNotification('Error', asyncResult.error.message);
        }
    };

    //
    function adaptQualityCriteria(str, devSkills) {
        str.QualityCriteria.length = 0;
        var length = devSkills.length;
        for (var i = 0; i < length; i++) {
            var criteria = {
                "QualityCriteriaId": 12,
                "Criteria": devSkills[i][0],
                "Tolerance": devSkills[i][1],
                "Method": devSkills[i][2],
                "Skills": devSkills[i][3]
            }
            str.QualityCriteria.push(criteria);
        }

    };
})();