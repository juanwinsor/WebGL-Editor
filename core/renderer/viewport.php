<meta http-Equiv="Cache-Control" Content="no-cache">
	<meta http-Equiv="Pragma" Content="no-cache">
	<meta http-Equiv="Expires" Content="0">
<?php
//get the project name passed in
$projectID = htmlspecialchars($_GET["project"]);

//get the config file
$filename = '../projects/' . $projectID . '/project_data/config.xml';
$projectDirectory = dirname(__FILE__) . '/' . $filename;
if(file_exists($projectDirectory))
{
    $stream = fopen($projectDirectory,"r");
    $configFile = stream_get_contents($stream);
    fclose($stream);
    
    $config = new SimpleXMLElement($configFile);
    
    //get the project name
    $projectName = $config->game[0]['name'];

    //get the screen resolution settings from the config file
    $screenWidth = $config->game[0]->viewport[0]['width'];
    $screenHeight = $config->game[0]->viewport[0]['height'];
}
else
{
    echo "project is corrupt, missing config file";
}



//find files in project directory to add as includes
$projFileDir = '../projects/' . $projectID;
$Directory = new RecursiveDirectoryIterator( $projFileDir);
$Iterator = new RecursiveIteratorIterator($Directory);
$Regex = new RegexIterator($Iterator, '/^.+\.js$/i', RecursiveRegexIterator::GET_MATCH);

$allProjectFiles = iterator_to_array($Regex, false);

$scriptIncludes = null;

foreach($allProjectFiles as $jsFile)
{
    //add all the script tags for each js file, force forward slash for firefox
    $scriptIncludes = $scriptIncludes . '<script src="' . str_replace('\\', '/', $jsFile[0]) . '" type="text/javascript" charset="utf-8"></script>';
}
    
?>
<html>
    <head>
	
        <title><?php echo $projectName ?></title>        
	    
        <!--script src="dependencies/gl-matrix-min.js" type="text/javascript" charset="utf-8"></script-->
        <script src="../utility/gl-matrix.js" type="text/javascript" charset="utf-8"></script>
        <script src="Shader.js" type="text/javascript" charset="utf-8"></script>
        <script src="Texture2D.js" type="text/javascript" charset="utf-8"></script>
        <script src="Renderer2D.js" type="text/javascript" charset="utf-8"></script>
	<script src="Renderer.js" type="text/javascript" charset="utf-8"></script>
	<script src="Camera.js" type="text/javascript" charset="utf-8"></script>
	<script src="RenderableModelCustom.js" type="text/javascript" charset="utf-8"></script>
	<script src="../utility/input/Input.js" type="text/javascript" charset="utf-8"></script> 
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
	
        <?php echo $scriptIncludes ?>
        
    </head>
    
    
    
    <script type="text/javascript">
        
	var gl = null;
        var projectDirectory = <?php echo '"' . $projFileDir . '"' ?>;
	var projectID = <?php echo '"' . $projectID . '"' ?>;
	
	var jsIndex = 0;	
	function updateJSFile(filePath)
	{
	    //alert(filePath);
	    
	    var scriptObj = document.createElement("script");
	    scriptObj.type = "text/javascript";
	    scriptObj.src = filePath + "?" + jsIndex++;
	    
	    var headObj = document.getElementsByTagName("head")[0];
	    headObj.appendChild(scriptObj);
	}
	
        function initialize(canvas)
        {
	    //initialize webgl
            gl = null;
            
            try{
                gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false, depth: true, stencil: false, antialias: true, preserveDrawingBuffer: false }) || canvas.getContext("experimental-webgl", { alpha: true, premultipliedAlpha: false, depth: true, stencil: false, antialias: true, preserveDrawingBuffer: false });
            }
            catch(e){}
        }
        
        function main()
        {
	    //call a method in main.php to set the window title with the project name
	    parent.setWindowTitle("<?php echo $projectName ?>");
	    
	    //initialize requestAnimationFrame
	    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
					window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	    window.requestAnimationFrame = requestAnimationFrame;
	    
            //get the canvas object
            var canvas = document.getElementById("screenBuffer");
            	    
	    //initialize webgl
            initialize(canvas);
            
            gl.clearColor(0.392, 0.584, 0.9294, 1.0);
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LESS);
	    gl.enable(gl.BLEND);
            //gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	    
	    
	    
	    //initialize the 2D renderer
	    Renderer2D.initialize(canvas);
            Renderer2D.setScreenSize(canvas, <?php echo $screenWidth ?>, <?php echo $screenHeight ?>);
	    
	    //initialize the renderer
	    Renderer.screenWidth = <?php echo $screenWidth ?>;
	    Renderer.screenHeight = <?php echo $screenHeight ?>;
	    Renderer.initialize();
	    
	    
            //initialize game entry point
            var gameMain = new Game();
            gameMain.initialize();
            
            var lastTime = new Date().getTime();
            var gametime = new Object();
            gametime.totalTime = 0;
	    
            //game loop
            function gameLoop(t)
            {
                var delta = (t - lastTime) / 1000;
		lastTime = t;

                gametime.elapsedTime = delta;
                gametime.totalTime += delta;
                
                gameMain.update(gametime);
                
                //gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
		//begin 3D rendering
		Renderer.begin();
		
		//render geometry
		Renderer.draw(gametime);
		
                gameMain.draw();
		
		//finalize 3D rendering
		Renderer.end();
		
		//finalize 2D rendering
		Renderer2D.end();
		
                window.requestAnimationFrame(gameLoop, canvas);
            }
            
            gameLoop(new Date().getTime());
        }
    </script>
    
    
    <body onload="main()">
	<center>
	    <div id="fps"></div>
            <canvas id="screenBuffer" width="<?php echo $screenWidth ?>" height="<?php echo $screenHeight ?>">
                Your browser does not support canvas. :(
            </canvas>
	</center>
    </body>
</html>