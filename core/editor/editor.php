<?php

//get the project name passed in
$projectID = htmlspecialchars($_GET["project"]);

?>

<html>
    <head>
        <style type="text/css" media="screen">
            .ui-menu {
                width: 150px;
            }

            #fileMenuList { 
                position: absolute;
                left: 0;
                top: 30px;
                width: 200px;
            }
            #editorThemeList {
                position: absolute;
                right: 0;
                top: 30px;
                width: 200px;
            }
            
            
            #fileMenu { 
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                width: 100%;
                height: 30px;
            }
            #inspectorMenu { 
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                height: 30px;
            }
            
            #directoryContainer { 
                position: absolute;
                top: 0;
                left: 1px;
                width: 200px;
                bottom: 0;
            }
            
            #directory { 
                position: absolute;
                top: 31px;
                left: 0;
                width: 100%;
                bottom: 0%;
            }
            
            #editor { 
                position: absolute;
                top: 31px;
                left: 0;
                right: 0;
                bottom: 0%;

            }
            #editorContainer {
                //background-color:yellow;
                position: absolute;
                top: 0;
                left: 205px;
                right: 0%;
                height: 100%;
            }
            
            #inspector { 
                position: absolute;
                top: 31px;
                left: 205px;
                right: 0;
                bottom: 0;

            }
            #button_theme {
                position: absolute;
                right: 0;
            }
            #button_save {
                position: absolute;
                left: 50px;
            }
            #button_refresh {
                position: absolute;
                left: 5px;
            }
            #button_undo {
                position: absolute;
                left: 80px;
            }
            #button_redo {
                position: absolute;
                left: 110px;
            }
            #button_help {
                position: absolute;
                right: 95px;
            }
        </style>
        
    </head>
    <link href="../utility/jqueryui/css/vader/jquery-ui-1.9.2.custom.css" rel="stylesheet">
    
    <script src="http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js" type="text/javascript" charset="utf-8"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script type="text/javascript" src="http://static.jstree.com/v.1.0pre/jquery.jstree.js"></script>    
    <script src="../utility/jqueryui/js/jquery-ui-1.9.2.custom.js"></script>
    
    <script>
        var treeDir = new Object();
        var editor;

        function refreshDirectory()
        {
            $("#directory").jstree("refresh");
            
            /*
            $.post("getdir.php", { project: <?php echo "'" . $projectID . "'"; ?>, op: 0 },
                function(data) {
                    
                })
                */
        }
        
        function getFileContents(filePath)
        {
            $.post("../utility/fileIO.php", { project: <?php echo "'" . $projectID . "'"; ?>, path: filePath, op: 3 },
                function(data) {
                    editor.getSession().setValue(data);
                    editor.currentFile = filePath;
                    editor.dirty = false;
                    $("#button_save").button( "option", "disabled", true );
                });
        }
        
        function saveFileContents(filePath, fileContents)
        {
            if(editor.dirty == true)
            {
                $.post("../utility/fileIO.php", { project: <?php echo "'" . $projectID . "'"; ?>, path: filePath, contents: fileContents, op: 4 },
                    function(data) {
                        if(data == "1")
                        {
                            editor.dirty = false;
                            $("#button_save").button( "option", "disabled", true );
                            parent.refreshViewport();                            
                            //parent.updateViewportJSFile(filePath);
                            
                        }
                        else
                        {
                            alert("error saving file contents");
                            
                        }
                    });
            }
        }
        
        function createNewFolder(foldername)
        {
            $.post("../utility/fileIO.php", { project: <?php echo "'" . $projectID . "'"; ?>, folderName: foldername, op: 5 }, function(data) {
                //alert(data);
                if(data == "1")
                {
                    //refresh the directory tree
                    refreshDirectory();
                }
                else
                {
                    alert("failed to create directory");
                }
            }); 
        }
        
        function createFile(filename)
        {
            $.post("../utility/fileIO.php", { project: <?php echo "'" . $projectID . "'"; ?>, fileName: filename, op: 1 }, function(data) {
                //alert(data);
                if(data == "1")
                {
                    //refresh the directory tree
                    refreshDirectory();
                }
                else
                {
                    alert("failed to create file");
                }
            }); 
        }
        
        function deleteFile(filepath)
        {
            $.post("../utility/fileIO.php", { project: <?php echo "'" . $projectID . "'"; ?>, filePath: filepath, op: 2 }, function(data) {
                if(data == "1")
                {
                    //refresh the directory tree
                    refreshDirectory();
                }
                else
                {
                    alert("delete file failed");
                }
            }); 
        }
        
        function deleteFolder(folderPath)
        {
            $.post("../utility/fileIO.php", { project: <?php echo "'" . $projectID . "'"; ?>, filePath: folderPath, op: 6 }, function(data) {
                if(data == "1")
                {
                    //refresh the directory tree
                    refreshDirectory();
                    parent.refreshViewport();
                }
                else
                {
                    alert("delete folder failed");
                }
            }); 
        }
        
        function moveFile(filePath, targetPath)
        {
            $.post("../utility/fileIO.php", { project: <?php echo "'" . $projectID . "'"; ?>, fileSource: filePath, fileTarget: targetPath, op: 7 }, function(data) {
                if(data == "1")
                {
                    //refresh the directory tree
                    refreshDirectory();
                }
                else
                {
                    alert("move failed");
                }
            });
        }
        
        function initialize()
        {
            //initialize editor window
            editor = ace.edit("editor");
            //editor.setTheme("ace/theme/twilight");
            editor.setTheme("ace/theme/dreamweaver");
            editor.getSession().setMode("ace/mode/javascript");
            editor.dirty = false;
            editor.getSession().on("change", function(){
                //enable save button
                $("#button_save").button( "option", "disabled", false );
                //flag document as dirty
                editor.dirty = true;
                //alert(editor.dirty);
            })
            $("#editorContainer").resizable({
                handles: 'w',
                resize: function(e, ui) {
                    //refresh ace editor
                    editor.resize();
                    //resize directory panel
                    //$("#directoryContainer").css("width", (ui.position.left - 5) + "px");
                },
                stop: function(e, ui) {
                    $("#directoryContainer").css({ width: ui.position.left - 5 }); //(ui.position.left - 5) + "px");
                    //resize directory panel
                    //$("#directoryContainer").css("width", (ui.position.left - 5) + "px");
                    //resize code editor
                    //$("#editorContainer").css("width", "65%");
                    //$("#editorContainer").css("height", "100%");
                    $("#editorContainer").css({right: '0%', bottom: '0%'});
                    //$("#editorContainer").css({width: '65%', height: '100%'});
                    //$("#editor").css({right: '0%', bottom: '0%'});
                    editor.resize();
                }
                
            });
            
            
            
            treeDir = $("#directory").jstree({

                "types": {
                    "types": {
                        "file_code" : {
                            "icon" : {
                                "image" : "../../media/fileicons/code16.png"
                            }                            
                        },
                        "file_image" : {
                            "icon" : {
                                "image" : "../../media/fileicons/image16.png"
                            }                            
                        },
                        "folder" : {
                            "icon" : {
                                "image" : "../../media/fileicons/folder16.png"
                            }
                        }
                    }
                },
                
                "themes" :  { 
                        "theme" : "classic", 
                        "dots" : false
                },
                
                
                
                "html_data" : {
                    "animation" : 0,
                    "ajax" : {
                        "type" : "POST",
                        "async" : false,
                        "url" : "../utility/fileIO.php",                        
                        "data" : { "project" : <?php echo "\"" . $projectID . "\""; ?>, "op" : 0 }
                    }
                },
                
                /*
                "crrm" : {
                    "move" : {
                        "check_move" : function(m) {
                            //alert(m);
                        }
                    }
                },
                */
                
                "plugins" : [ "types", "themes", "html_data", "ui", "crrm", "dnd"]
        
            })
            
            
            .bind("move_node.jstree", function(event, data) {
                //cancel the action
                $.jstree.rollback(data.rlbk);
                //alert("Test");
                //alert(data.rslt.r.attr("path") + $(data.rslt.r.context).text().trim());
                
                //if the file names are the same move up one level
                //alert(data.rslt.r.attr("path") + $(data.rslt.r.context).text().trim() + " : " + data.rslt.o.attr("path") + $(data.rslt.o.context).text().trim());

                
                //if the target is a folder then move the file/folder into that folder
                //if it is the same folder, the move it out one level
                if(data.rslt.r.attr("rel") == "folder")
                {
                    //deal with the move
                    //alert(data.rslt.r.attr("path") + data.rslt.r.context.text());
                    //alert(data.rslt.o.attr("path") + $(data.rslt.o.context).text().trim());
                    if(data.rslt.o.attr("path") == data.rslt.r.attr("path") + $(data.rslt.r.context).text().trim() + "/")
                    {
                        moveFile(data.rslt.o.attr("path") + $(data.rslt.o.context).text().trim(), data.rslt.r.attr("path") + $(data.rslt.o.context).text().trim());
                    }
                    else
                    {
                        moveFile(data.rslt.o.attr("path") + $(data.rslt.o.context).text().trim(), data.rslt.r.attr("path") + $(data.rslt.r.context).text().trim() + "/" + $(data.rslt.o.context).text().trim());
                    }                    
                }
                else
                {
                    moveFile(data.rslt.o.attr("path") + $(data.rslt.o.context).text().trim(), data.rslt.r.attr("path") + $(data.rslt.o.context).text().trim());
                }

                
                
            })
            
            
            .bind("select_node.jstree", function(event, data)
                  {
                    var filepath = $('#directory').jstree('get_selected').attr('path') + $('#directory').jstree('get_selected').children("a").text().replace(String.fromCharCode(160), "");
                    
                    //if selected file is an image then display it in the inspector panel
                    if($('#directory').jstree('get_selected').attr('rel') == "file_image")
                    {
                        $('#editor').css('visibility', 'hidden');
                        $('#inspector').css('visibility', 'visible');
                        
                        $("#inspector").html("<center><img src=\"" + filepath + "\"></center>");
                    }
                    
                    //if selected file is a code file then display it in the editor
                    if($('#directory').jstree('get_selected').attr('rel') == "file_code")
                    {
                        $('#editor').css('visibility', 'hidden');
                        $('#inspector').css('visibility', 'visible');
                        $("#inspector").html("<center><img src=\"../../media/throbber.gif\"></center>");
                        
                        getFileContents(filepath);
                        
                        $('#editor').css('visibility', 'visible');
                        $('#inspector').css('visibility', 'hidden');
                    }
            })
            .bind("loaded.jstree", function(event, data)
                  {

                        //alert(data.rslt);

            });
            
            /*
            //drag and drop
            .bind("move_node.jstree", function(event, data) {
                //event.stopImmediatePropagation();
                event.preventDefault();
                return false;
                alert("dnd");
            });
            */
            
            //load default file, every project NEEDS game.js
            $('#editor').css('visibility', 'visible');
            $('#inspector').css('visibility', 'hidden');
            getFileContents("../projects/<?php echo $projectID; ?>/game.js");
            
            
            
            
            
            
            
             
            //create a click handler to hide the menu if anything but the menu is clicked
            $(document).click(function (e){
                
                if(!$("#fileMenu").is(e.target))
                {
                    var container = $("#fileMenuList");
                    if (container.has(e.target).length === 0 )
                    {
                        container.hide("fade", "fast");
                    }
                }
                
                
                //if(e.id != "button_theme")
                if(!$("#button_theme").is(this))//e.currentTarget))
                {
                    var themeContainer = $("#editorThemeList");
                    if (themeContainer.has(e.target).length === 0 )
                    {
                        themeContainer.hide("fade", "fast");
                    }
                }
                
            });
            
            
            //initialize the file menu
            $("#fileMenuList").menu( { position:{ my: "left top", at: "right top" } } ).hide();
            //attach on click to file menu
            /*
            $("#fileMenu")         
            .click(function(e){             
                $("#fileMenuList").toggle("fade" , "fast");
                e.stopPropagation();
            });
            */
            $("#fileMenuList").zIndex(1000);
            //file menu functionality
            $("#fileMenuList").on("menuselect", function(event, ui){
                
                $("#fileMenuList").hide("fade" , "fast");
                
                //alert(ui.item.context.firstChild.text);
                switch(ui.item.context.firstChild.text)
                {
                    case "folder": //create a new folder
                        //filename dialog for creating new folders and files
                        //$("#filenameDialog").zIndex(1000);
                        $("#filenameDialog").dialog("open");
                        $("#filenameDialog").attr("fileType", "folder");
                        $("#filenameTextbox").val("");
                        $("filenameTextbox").enabled = true;
                        
                        break;
                    
                    case "javascript file": //create an empty js file
                        $("#filenameDialog").dialog("open");
                        $("#filenameDialog").attr("fileType", "js");
                        $("#filenameTextbox").val("");
                        $("filenameTextbox").enabled = true;
                        
                        break;
                    
                    case "delete":
                        //determine if anything is selected
                        if($('#directory').jstree('get_selected').attr('rel') == "file_code" || $('#directory').jstree('get_selected').attr('rel') == "file_image")
                        {
                            var filepath = $('#directory').jstree('get_selected').attr('path') + $('#directory').jstree('get_selected').children("a").text().replace(String.fromCharCode(160), "");
                            deleteFile(filepath);
                        }
                        
                        if($('#directory').jstree('get_selected').attr('rel') == "folder")
                        {
                            var filepath = $('#directory').jstree('get_selected').attr('path') + $('#directory').jstree('get_selected').children("a").text().replace(String.fromCharCode(160), "");
                            deleteFolder(filepath);
                        }
                        
                        
                        break;
                    
                    case "upload image":
                        $("#fileUploadDialog").dialog("open");
                        break;
                }
                
                
                
            });
            
            $("#filenameDialog").dialog({
                resizable: false,
                //height: 140,
                modal: true,
                autoOpen: false,
                //show: false,                            
                buttons: {
                    "Create": function(){
                        switch($("#filenameDialog").attr("fileType"))
                        {
                        case "folder":
                            createNewFolder($("#filenameTextbox").val());
                            break;
                        
                        case "js":
                            createFile($("#filenameTextbox").val() + ".js");
                            break;
                        }
                        
                        $(this).dialog("close");
                    },
                    Cancel: function(){
                        $(this).dialog("close");
                    }
                    
                }
            });
            
            
            $("#fileUploadDialog").dialog({
                resizable: false,
                //height: 140,
                modal: true,
                autoOpen: false,
                //show: false,                            
                buttons: {
                    "Upload": function(){                        
                        $("#fileUploadForm").submit();
                        $(this).dialog("close");
                    },
                    Cancel: function(){
                        $(this).dialog("close");
                    }                    
                }
            });
            
            
            //initialize the editor theme menu
            $("#editorThemeList").menu( { position:{ my:"left top", at: "right top" } } ).hide();
            //editor theme menu functionality
            $("#editorThemeList").on( "menuselect", function( event, ui ) {
                //alert("test");
                editor.setTheme("ace/theme/" + ui.item.context.firstChild.text);
                $("#editorThemeList").hide("fade" , "fast");
            });
            
            //set button styles
            $( "#button_save" ).button({
               icons: {
                   primary: "ui-icon-disk"
               },
               disabled: true,
               text: false
            })
            .click(function(){
                //save file contents
                //alert(editor.getValue());

                saveFileContents(editor.currentFile, editor.getValue());
            });
            
            $("#button_theme").button({
               icons: {
                    primary: null,
                    secondary: "ui-icon-triangle-1-s"
               },
               text: true
            })
            .click(function(e){
                //open theme dropdown menu
                $("#editorThemeList").toggle(  "fade" , "fast" );
                e.stopPropagation();
            })
            .zIndex(500);
            
            //set button styles
            $( "#button_refresh" ).button({
               icons: {
                   primary: "ui-icon-refresh"
               },
               disabled: false,
               text: false
            })
            .click(function(){
                parent.refreshViewport();
            });
            
            //set button styles
            $( "#button_undo" ).button({
               icons: {
                   primary: "ui-icon-arrowreturnthick-1-w"
               },
               disabled: false,
               text: false
            })
            .click(function(){
                editor.getSession().getUndoManager().undo();
            });
            
            $( "#button_help" ).button({
               icons: {
                   primary: "ui-icon-help"
               },
               disabled: false,
               text: false
            })
            .click(function(){
                helpWindow=window.open('../../documentation/index/Classes.html','','width=1024,height=768,location=0,menubar=0,toolbar=1');
                helpWindow.focus();
            });
            
            $( "#button_redo" ).button({
               icons: {
                   primary: "ui-icon-arrowreturnthick-1-e"
               },
               disabled: false,
               text: false
            })
            .click(function(){
                editor.getSession().getUndoManager().redo();
            });
   
   
            $("#button_fileMenu").button({
               icons: {
                    primary: null,
                    secondary: "ui-icon-triangle-1-s"
               },
               text: true
            })
            .click(function(e){
                //open theme dropdown menu
                $("#fileMenuList").toggle(  "fade" , "fast" );
                e.stopPropagation();
            })
            .zIndex(500);
            
        }
        
    </script>
    
    <body onload="initialize()">
        
        <!-- Editor/Inspector -->
        <div id="editorContainer">
            <div id="inspectorMenu" style="border:1px solid #9f9f9f">
                <button id="button_save">save</button>
                <button id="button_refresh">refresh</button>
                <button id="button_undo">undo</button>
                <button id="button_redo">redo</button>
                <button id="button_help">help</button>
                <button id="button_theme">set theme</button>
            </div>
            <div id="editor"></div>
            <div id="inspector"></div>
        </div>
        
        <!-- FileMenu / Directory -->
        
        <div id="directoryContainer">
            <div id="fileMenu" style="border:1px solid #9f9f9f">
                <button id="button_fileMenu">File</button>
            </div>
            <div id="directory" style="border:1px solid #9f9f9f"></div>
        </div>
        <ul id="fileMenuList">  
            <li><a>new</a>
                <ul>
                    <li><a>folder</a></li>
                    <li>-</li>
                    <li><a>javascript file</a></li>
                    <li><a>vertex shader file</a></li>
                    <li><a>fragment shader file</a></li>                  
                </ul>
            </li>
            <li><a>delete</a></li>
            <li>-</li>
            <li><a>cut</a></li>
            <li><a>copy</a></li>
            <li><a>paste</a></li>
            <li>-</li>
            <li><a>upload image</a></li>
        </ul>
        
        <ul id="editorThemeList">
            <li><a>ambiance</a></li>
            <li><a>chaos</a></li>
            <li><a>chrome</a></li>
            <li><a>clouds</a></li>
            <li><a>clouds_midnight</a></li>
            <li><a>cobalt</a></li>
            <li><a>crimson_editor</a></li>
            <li><a>dawn</a></li>
            <li><a>dreamweaver</a></li>
            <li><a>eclipse</a></li>
            <li><a>github</a></li>
            <li><a>idle_fingers</a></li>
            <li><a>kr_theme</a></li>
            <li><a>merbivore</a></li>
            <li><a>merbivore_soft</a></li>
            <li><a>mono_industrial</a></li>
            <li><a>monokai</a></li>
            <li><a>pastel_on_dark</a></li>
            <li><a>solarized_dark</a></li>
            <li><a>solarized_light</a></li>
            <li><a>textmate</a></li>
            <li><a>tomorrow</a></li>
            <li><a>tomorrow_night</a></li>
            <li><a>tomorrow_night_blue</a></li>
            <li><a>tomorrow_night_bright</a></li>
            <li><a>tomorrow_night_eighties</a></li>
            <li><a>twilight</a></li>
            <li><a>vibrant_ink</a></li>
            <li><a>xcode</a></li>
        </ul>
        
        <!-- File and folder name Dialog -->
        <div id="filenameDialog"><input type="text" id="filenameTextbox"></div>
        <!-- File upload Dialog -->
        <div id="fileUploadDialog">
            <form id="fileUploadForm" action="../utility/fileIO.php" method="post" enctype="multipart/form-data">
                <label for="file">Filename:</label>
                <input type="file" name="file" id="file"><br>
                <input type="hidden" name="op" value="8">
                <input type="hidden" name="project" value=<?php echo "\"" . $projectID . "\""; ?>>
            </form>
        </div>
        
    </body>
</html>