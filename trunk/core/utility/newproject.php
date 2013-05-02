<?php
session_start();
if($_SESSION['Legitmate'] == true)
{

    //select a random unique project name
    $uniqueProjectID = uniqid();
    //assemble a url using the unique name
    $projectPath = "../projects/" . $uniqueProjectID;
    
    //echo $projectPath;
    
    //create the project directory
    if(file_exists($projectPath))
    {
        echo "project url already exists";
    }
    else
    {
        //redirect the page to view the new project
        //header("Location: ../renderer/viewport.php?project=" . $uniqueProjectID);
        header("Location: ../main.php?project=" . $uniqueProjectID);
        
        //create a directory for the project
        mkdir($projectPath);
        mkdir($projectPath . "/project_data");
        //copy the default new project files to the new directory
        copy("../../templates/project_template/project_data/config.xml", $projectPath . "/project_data/config.xml");
        copy("../../templates/project_template/game.js", $projectPath . "/game.js");
        copy("../../templates/project_template/ground.png", $projectPath . "/ground.png");
        copy("../../templates/project_template/torch.png", $projectPath . "/torch.png");
        exit;
    }
    //else
    //{
    //    //header("Location: " + $projectPath);
    //    //create a new directory    
    //    mkdir("$projectPath);
    //          
    //    //exit;
    //}
}


?>