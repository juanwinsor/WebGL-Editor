<?php
session_start();
$_SESSION['Legitmate'] = true;

$projectID = htmlspecialchars($_GET["project"]);

?>


<html>
    <head>
        <style type="text/css" media="screen">
                #view { 
                    position: absolute;
                    top: 0;
                    right: 0;
                    left: 0;
                    width:35%;
                    bottom: 0;
                }
                #editor { 
                    position: absolute;
                    top: 0;
                    right: 0;
                    left: 35%;
                    width:65%;
                    bottom: 0;
                }
                
                #dialog_help { 
                    position: absolute;
                    top: 50px;
                    right: 0;
                    left: 50px;
                    width:20%;
                    height:10%;
                    bottom: 0;
                }
                
        </style>
    </head>
    <link href="utility/jqueryui/css/vader/jquery-ui-1.9.2.custom.css" rel="stylesheet">
    
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script src="utility/jqueryui/js/jquery-ui-1.9.2.custom.js"></script>
    
    
    <script type="text/javascript">
        
        function setWindowTitle(title)
        {
            window.document.title = title;
        }

        function refreshViewport()
        {
            $("#view").html('<iframe id="iframe_viewport" width="100%" height="100%" src="<?php echo 'renderer/viewport.php?project=' . $projectID; ?>" frameborder="0"></iframe>');
            
            //$("#iframe_viewport").attr( "src", function ( i, val ) { return val; });
            //$("#iframe_viewport").contentDocument.location.reload(true);
        }
        
        function updateViewportJSFile(filePath)
        {
            //call the function in the viewport to update the js file
            //document.frames[0].contentWindow.updateJSFile(filePath);
            //var viewport = $("#iframe_viewport");
            //viewport.context.updateJSFile(filePath);
            //viewport.contentWindow.updateJSFile(filePath);
            
            window.parent.document.getElementById('iframe_viewport').contentWindow.updateJSFile(filePath);
            
            
        }
        
        
        
        $(function(){
            refreshViewport();
        });
        
        
        //$("#dialog_help").dialog();
        
        /*
        function setHelpWindow(visible)
        {
            if(visible)
            {
                $("#dialog_help").dialog().open();
            }
            else
            {
                $("#dialog_help").dialog().close();
            }
        }
        */
    </script>
    
    <body>
        <div id="view">
            
        </div>
        
        <div id="editor">
            <iframe id="iframe_editor" width="100%" height="100%" src="<?php echo 'editor/editor.php?project=' . $projectID; ?>" frameborder="0"></iframe>
        </div>
        
        <!--DIALOGS
        <div id="dialog_help">
            <iframe width="100%" height="100%" src="../documentation/index/General.html"></iframe>
        </div>
        -->
    </body>
</html>