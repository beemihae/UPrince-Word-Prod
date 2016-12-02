/// <reference path="../App.js" />
/// <reference path="Home.js" />

    var qualityCriteriaId;
    var projectId;
    var ProductDescriptionId;

    // var host = 'https://pmstudiocoredevapi.azurewebsites.net';
    var host = 'https://pmstudiocoreprodapi.azurewebsites.net';

    var projectCanvas = {};

    var projectPage = '<div class="main-wrapper">' +
                        '<header class="col-lg-12 col-md-12 col-sm-12 col-xs-12 header-top">' +
                            '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding full-height">' +
                                '<div class="header-sub header-glyph full-height">' +
                                    '<p title="PM Studio.Projects">' +
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

    var currentDocument = '';

    var authContext = new AuthenticationContext({
        // tenant: 'b57560ee-bbd3-445b-8859-bea9f0e1ae58',
        tenant: 'pmstudiousermanagementprod.onmicrosoft.com',
        // clientId: 'ba68cae1-fdad-48b3-a49a-f95a1c845556',
        clientId: '6c10f715-94f7-4466-9de4-5866eff3abb1',
        // redirectUri: 'https://pmstudioofficedev.azurewebsites.net/1.1/home/home.html',
        redirectUri: 'https://office.pmstudio.online/1.1/home/home.html',        
        extraQueryParameter: 'p=b2c_1_pm-sigin-signup&scope=openid',
        // postLogoutRedirectUri: 'https://pmstudioofficedev.azurewebsites.net/1.1/home/home.html',
        postLogoutRedirectUri: 'https://office.pmstudio.online/1.1/home/home.html',        
        cacheLocation: 'localStorage'
    });

    function logOut() {
        localStorage.clear();
        authContext.logOut();
    }

    function accessUser() {
        localStorage.clear();
        authContext.login();
    }

    function publish(event) {
        if (currentDocument === 'product-description') {
            saveJson();
        } else if (currentDocument === 'project-canvas') {
            saveProjectCanvas();
        }

        event.completed();
    }

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();
            localStorage.setItem("loggedIn", 'false');

            authContext.handleWindowCallback();

            var user = authContext.getCachedUser();

            if (user) {  //successfully logged in
                // $('#status').append('');
                $('#project-page').append(projectPage);
                
                // document.getElementById('login').innerHTML = '';
                document.body.style.backgroundColor = 'white';

                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('email', user.userName);
                // localStorage.setItem('uid', user.userInfo);;

                loadListProjects('');
            } else {
                localStorage.clear();
                authContext.login();
            }

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
                                        '<p class="fake-link" title="PM Studio.Projects">' +
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
                                '<div class="col-sm-12 row-projects bg-ash alignleft" id="canvasTab" style="cursor:pointer; position:relative; border-top:1px solid #ccc;border-bottom:1px solid #ccc;">' +
                                    '<span class="glyphicons sun" style="font-size:0.99em; margin-right:5px;"></span>' +
                                    '<strong>Project Canvas</strong>' +
                                    '<button id="saveBtnCanvas" class="saveButton" style="position:absolute;right:10px;top:6px;" disabled>Publish</button>' +
                                '</div>' +
                                '<div class="col-sm-12 row-projects bg-ash alignleft" style="border-bottom:1px solid #ccc;position:relative;">' +
                                    '<span class="icon-icon_ProductDescription" style="margin-right:5px;"></span>' +
                                    '<strong>Product Descriptions</strong>' +
                                    '<button id="saveBt" class="saveButton" style="position:absolute;right:10px;top:6px;">Publish</button>' +
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
                                        '<p class="fake-link" title="PM Studio.Projects">' +
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
                e.stopPropagation();

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
                // document.getElementById("login").innerHTML = "";

                $("#project-page").append(projectPage);

                loadListProjects();

                document.getElementById("product-description-page").innerHTML = "";
            });

            //log out function, forget the email and go back to log out screen
            $(document).on('click', "#logOut", function () {
                // logOut();
                localStorage.clear();
                authContext.logOut();
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
                    // var child = window.open("https://plaza.uprince.com/oauth2/authorize?client_id=thoa4iaGh9aidei8aeb9AiyeesohghaicieGipua6jie1Sai6AiquiegheiZowah&scope=profile&state=CSFR&response_type=token&redirect_uri=https%3A%2F%2Fdocument.uprince.com%2F1.1%2Fhome%2Fios.html", "");

                    ////app.showNotification(navigator.userAgent);
                    //var child = window.open("http://www.w3schools.com/jsref/prop_nav_useragent.asp");
                    var timer = setInterval(checkChild, 500);
                } else {
                    authContext.login();
                    // dummyLogin();
                }

            });
        });
    };

    function checkChild() {
        if (localStorage.getItem("loggedIn") == 'true') {
            //$("#closed").append('closed');
            clearInterval(timer);

            // document.getElementById("login").innerHTML = "";
            document.body.style.backgroundColor = "white";
            $("#project-page").append(projectPage);
            loadListProjects();
            ////app.showNotification(navigator.userAgent);
        }
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
        // document.getElementById('login').innerHTML = '';
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
        currentDocument = '';

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
        });
    }

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
    }

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

    }

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
    }

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
    }

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
    }

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
    }

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

    function getTeamMembersFilter(projectId, roleId) {
        return {
            projectId: projectId,
            roleId: roleId
        };
    }

    // async service calls to get project canvas document data
    function getProjectCanvas() {
        var projectId = localStorage.getItem('projectId');
        projectCanvas.teamMembers = {};

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
            $.ajax(getPostDataObject('/api/TeamMember/GetTeamMembersInRole', getTeamMembersFilter(projectId, 1))).done(function (data) {
                projectCanvas.teamMembers.executives = data;
            }),
            $.ajax(getPostDataObject('/api/TeamMember/GetTeamMembersInRole', getTeamMembersFilter(projectId, 2))).done(function (data) {
                projectCanvas.teamMembers.seniorUsers = data;
            }),
            $.ajax(getPostDataObject('/api/TeamMember/GetTeamMembersInRole', getTeamMembersFilter(projectId, 3))).done(function (data) {
                projectCanvas.teamMembers.seniorSuppliers = data;
            }),
            $.ajax(getPostDataObject('/api/TeamMember/GetTeamMembersInRole', getTeamMembersFilter(projectId, 4))).done(function (data) {
                projectCanvas.teamMembers.projectManager = data;
            }),
            $.ajax(getPostDataObject('/api/TeamMember/GetTeamMembersInRole', getTeamMembersFilter(projectId, 5))).done(function (data) {
                projectCanvas.teamMembers.teamManagers = data;
            }),
            $.ajax(getPostDataObject('/api/TeamMember/GetTeamMembersInRole', getTeamMembersFilter(projectId, 6))).done(function (data) {
                projectCanvas.teamMembers.projectAssurance = data;
            }),
            $.ajax(getPostDataObject('/api/TeamMember/GetTeamMembersInRole', getTeamMembersFilter(projectId, 7))).done(function (data) {
                projectCanvas.teamMembers.changeAuthority = data;
            }),
            $.ajax(getPostDataObject('/api/TeamMember/GetTeamMembersInRole', getTeamMembersFilter(projectId, 8))).done(function (data) {
                projectCanvas.teamMembers.projectSupport = data;
            }),
            $.ajax(getPostDataObject('/api/TeamMember/GetTeamMembersInRole', getTeamMembersFilter(projectId, 9))).done(function (data) {
                projectCanvas.teamMembers.teamMembers = data;
            }),
            $.ajax(getPostDataObject('/api/TeamMember/GetTeamMembersInRole', getTeamMembersFilter(projectId, 10))).done(function (data) {
                projectCanvas.teamMembers.corporate = data;
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
                    '<td id="requirement-' + requirement.projectProductDescriptionAcceptanceId + '">' + requirement.acceptanceCriteria + '</td>' +
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

    function getMemberRow(type, heading, isPadding) {
        var members = projectCanvas.teamMembers[type];
        var padding = isPadding ? ' style="padding-left:15px"' : '';

        var row =
        '<tr>' +
            '<td' + padding + '>' + '<b>' + heading + '</b></td>' +
            '<td>';
        
        if (members) {
            members.forEach(function (member, index) {
                row += member.firstName + ' ' + member.lastName;

                if ((index + 1) !== members.length) {
                    row += ', ';
                }
            });
        }
            
        row += '</td>';
        row += '</tr>';

        return row;
    }

    function getTeamMembersTable(teamMembers) {
        var table =
        '<table id="team-members-table">' +
            '<thead>' +
                '<tr>' +
                    '<th>Role</th>' +
                    '<th>Responsible Members</th>' +
                '</tr>' +
            '</thead>';

        // project manager
        table += getMemberRow('projectManager', 'Project Manager');

        // project board (main)
        table += '<tr><td colspan="2"><b>Project Board</b></td></tr>';

        // executive
        table += getMemberRow('executives', 'Executive', true);
        
        // senior Users
        table += getMemberRow('seniorUsers', 'Senior Users', true);

        // senior suppliers
        table += getMemberRow('seniorSuppliers', 'Senior Suppliers', true);
        
        // project assurance
        table += getMemberRow('projectAssurance', 'Project Assurance');
        
        // corporate
        table += getMemberRow('corporate', 'Corporate and Program');

        // team members
        table += getMemberRow('teamMembers', 'Team Members');               

        // end of table
        table += '</table>';

        return table;
    }

    function setProjectCanvas(projectCanvas) {
        currentDocument = 'project-canvas';

        var layout = "<head><style>p.MsoTitle, li.MsoTitle, div.MsoTitle{mso-style-link:'Title Char';margin:0in;margin-bottom:.0001pt;font-size:28.0pt;font-family:'Calibri Light',sans-serif;letter-spacing:-.5pt;},table {border-collapse: collapse;width:100%;padding:8px; padding-bottom:0;} table, th, td {border: 1px solid black;text-align: 'left';  font-family: 'Calibri', 'sans-serif'} p,ol,ul{ font-family: 'Calibri', 'sans-serif'}</style></head>";
        var header = '<p class=MsoTitle>Project Canvas</p>';

        setHeader('Project Canvas');

        var worldContext = '<h1 id="the-world-title">The World</h1>';
        var worldContextJson = projectCanvas.projectDefinition.background;

        var businessContext = '<h1 id="business-context-title">Business Context (Background)</h1>';
        var businessContextJson = projectCanvas.projectDefinition.buisinessContext;

        var project = '<h1 id="project-title">Project</h1>';
        var projectPurpose = '<h2 id="project-purpose-title">Project Purpose</h2>';
        var projectPurposeJson = projectCanvas.ppd.purpose;
        
        var projectScope = '<h2 id="project-scope-title">Project Scope</h2>';
        var projectScopeJson = projectCanvas.projectDefinition.projectScope;

        var qualityExpectations = '<h2 id="quality-expectations-title">Quality Expectations</h2>';
        var qualityExpectationsJson = projectCanvas.ppd.qualityExpectation;

        var products = '<h1 id="products-title">Products</h1>';
        var requirements = '<h2 id="requirements-title">Requirements</h2>';
        var requirementsTable = getRequirementsTable(projectCanvas.ppd.acceptance);

        var deliverables = '<h2 id="deliverables-title">Deliverables</h2>';
        var deliverablesTable = getDeliverablesTable(projectCanvas.products);

        var human = '<h1 id="human-title">Human</h1>';
        var smartGoals = '<h2 id="smart-goals-title">Smart Goals</h2>';
        var smartGoalsTable = getSmartGoalsTable(projectCanvas.benefits);

        var userBenefits = '<h2 id="user-benefits-title">User Benefits</h2>';
        var userBenefitsJson = projectCanvas.businessCase.benefits;

        var userDisbenefits = '<h2 id="user-disbenefits-title">User Disbenefits</h2>';
        var userDisbenefitsJson = projectCanvas.businessCase.disbenefits;

        var timeCost = '<h1 id="time-and-cost-title">Time and Cost</h1>';
        var investmentAppraisal = '<h2 id="investment-appraisal-title">Investment Appraisal</h2>';
        var investmentAppraisalJson = projectCanvas.businessCase.investmentAppraisal;

        var cost = '<h2 id="cost-title">Cost</h2>';
        var costJson = projectCanvas.projectPlan.budgets;

        var schedule = '<h2 id="schedule-title">Schedule</h2>';
        var scheduleJson = projectCanvas.projectPlan.schedule;

        var stakeholders = '<h1 id="stakeholders-title">Stakeholders</h1>';
        var usersOtherParties = '<h2 id="users-and-other-title">Users and Other Interested</h2>';
        var usersOtherPartiesJson = projectCanvas.projectDefinition.usersOtherParties;

        var teamMembers = '<h2 id="pmts-title">PMTS</h2>';
        var teamMembersTable = getTeamMembersTable(projectCanvas.teamMembers);

        var risks = '<h1 id="risks-title">Risks</h1>';
        var risksJson = getRisksTable(projectCanvas.risks);

        var assumptions = '<h1 id="assumptions-title">Assumptions and Constraints</h1>';
        var assumptionsJson = projectCanvas.projectDefinition.constraints;

        // var endOfDocument = '<h2>End of Document...</h2>';

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
                teamMembers, teamMembersTable,
                risks, risksJson,
                assumptions, assumptionsJson
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

        currentDocument = 'product-description';

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

    function extractTable(html, type) {
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
        // checkListItems();

        Word.run(function (ctx) {
            var projectId = localStorage.getItem('projectId');

            // Create a proxy object for the document body.
            var body = ctx.document.body;

            // Queue a commmand to get the HTML contents of the body.
            var bodyHTML = body.getHtml();

            var sections = ctx.document.sections;
            ctx.load(sections, 'body/style');

            // bodyHTML = checkListItems(bodyHtml);
            
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

                var projectDefinitionUrl = '/api/ProjectBrief/PostProjectDefinition';


                // var worldContext = sections.items[1].getHeader('primary');
                // $.ajax(getFieldPostObject(projectDefinitionUrl, 1, worldContext))

                // return context.sync().then(function () {
                //     app.showNotification('Saved Successfully', 'Project Canvas document changes have been saved');
                // });

                var worldContext = extractChapter(html, '>The World', '>Business Context (Background)');                
                var businessContext = extractChapter(html, '>Business Context (Background)', '>Project<');
                var projectScope = extractChapter(html, '>Project Scope', '>Quality Expectations');
                var usersOtherParties = extractChapter(html, '>Users and Other Interested', '>PMTS');
                var assumptions = extractChapter(html, '>Assumptions and Constraints', '');
                // var assumptions = extractChapter(html, '>9. Assumptions', '');

                var ppdUrl = '/api/ProjectProductDescription/PostPPDescriptionDetails';

                var projectPurpose = extractChapter(html, '>Project Purpose', '>Project Scope');
                var qualityExpectations = extractChapter(html, '>Quality Expectations', '>Products');

                var businessCaseUrl = '/api/BusinessCase/PostBusinessCase';

                var investmentAppraisal = extractChapter(html, '>Investment Appraisal', '>Cost');
                var userBenefits = extractChapter(html, '>User Benefits', '>User Disbenefits');
                var userDisbenefits = extractChapter(html, '>User Disbenefits', '>Time and Cost');

                var planUrl = '/api/Plan/PostPlanDetail';

                var cost = extractChapter(html, '>Cost', '>Schedule');
                var schedule = extractChapter(html, '>Schedule', '>Stakeholders');

                $.when(
                    $.ajax(getFieldPostObject(projectDefinitionUrl, 1, worldContext)),
                    $.ajax(getFieldPostObject(projectDefinitionUrl, 9, businessContext)),
                    $.ajax(getFieldPostObject(projectDefinitionUrl, 4, projectScope)),
                    $.ajax(getFieldPostObject(projectDefinitionUrl, 7, usersOtherParties)),
                    $.ajax(getFieldPostObject(projectDefinitionUrl, 5, assumptions)),

                    $.ajax(getPostDataObject(ppdUrl, getFieldPayloadObject(2, projectPurpose))),
                    $.ajax(getPostDataObject(ppdUrl, getFieldPayloadObject(6, qualityExpectations))),

                    $.ajax(getPostDataObject(businessCaseUrl, getFieldPayloadObject(8, investmentAppraisal))),
                    $.ajax(getPostDataObject(businessCaseUrl, getFieldPayloadObject(4, userBenefits))),
                    $.ajax(getPostDataObject(businessCaseUrl, getFieldPayloadObject(5, userDisbenefits))),

                    $.ajax(getPostDataObject(planUrl, getPlanPayloadObject(7, cost))),
                    $.ajax(getPostDataObject(planUrl, getPlanPayloadObject(9, schedule)))
                ).then(function () {
                    app.showNotification('Saved Successfully', 'Project Canvas document changes have been saved');

                    $(document).find('#saveBtnCanvas').prop('disabled', false);
                    getProjectCanvas();
                    ctx.sync();
                });
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
                         url: "http://pmstudiocoredevapi.azurewebsites.net/api/productdescription?id=" + localStorage.getItem('productDescriptionId'),
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

    }

    //extract title from the document
    function extractTitle(str) {
        var flag = str.indexOf(">Title");
        if (flag != -1) {
            var begin = flag + 8;
            var end = str.indexOf("</", flag);
            return str.substring(begin, end);
        } else return '';
    }

    function replaceBetween(start, end, replacement, str) {
        return str.substring(0, start) + replacement + str.substring(end);
    }

    function checkListItems(str) {
        // replace MS Word paragraph opening tag for lists with li opening tag
        var pattern = /(<p class=MsoListParagraph.+?>)/g;
        var newStr = str.replace(pattern, '<li>');

        // replace MS Word paragraph closing tag for lists with li closing tag
        var flag = 0;
        var start = 0;
        var end = 0;

        while (newStr.lastIndexOf('<li>') > flag) {
            flag = newStr.indexOf('<li>', flag);
            start = newStr.indexOf('</p>', flag);
            end = start + 4;

            newStr = replaceBetween(start, end, '</li>', newStr);
        }

        return newStr;
    }

    //extract a chapter from the HTML code
    function extractChapter(str, startChapter, stopChapter) {
        var flag = str.indexOf(startChapter);
        var chapter;

        if (startChapter === '>Assumptions and Constraints') {
            var begin = str.indexOf("</h", flag) + 5;

            chapter = str.substring(begin);
        } else if (flag != -1 && str.indexOf(stopChapter) != -1) {
            var begin = str.indexOf("</h", flag) + 5;
            var flag2 = str.indexOf(stopChapter);
            var end = str.lastIndexOf('<h', flag2);

            chapter = str.substring(begin, end);
        } else if (flag === -1) {
            chapter = '';
        } else {
            var begin = str.indexOf("</h", flag) + 5;
            var end = str.indexOf('<h', begin);

            if (end < begin) {
                end = str.length - 1;
            }

            chapter = str.substring(begin, end);
        }

        // chapter = checkListItems(chapter);
        return chapter;
    }

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
    }

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
    }

    //test for completion of request
    function testForSuccess(asyncResult) {
        if (asyncResult.status === Office.AsyncResultStatus.Failed) {
            ////app.showNotification('Error', asyncResult.error.message);
        }
    }

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

    }