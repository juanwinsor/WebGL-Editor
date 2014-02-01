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
    <script type="text/javascript" src="../utility/jstree/v1.0pre/jquery.jstree.js"></script>    
    <script src="../utility/jqueryui/js/jquery-ui-1.9.2.custom.js"></script>
    <script src="codeEditor.js"></script>
    <script src="fileTree.js"></script>
    <script src="fileMenu.js"></script>
    <script src="fileIO.js">//IO functions to interface with the server</script>
    <script src="toolBar.js"></script>
    
    <script>
        var projectID = <?php echo "'" . $projectID . "'"; ?>;

        function initialize()
        {
            //initialize the codeEditor Window
            initializeCodeEditor();
            
            //initialize the file tree
            initializeFileTree();
  
            //initialize the file menu that goes with the file tree
            initializeFileMenu();
  
            //initialize the tool bar buttons and options
            initializeToolBar();
  
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