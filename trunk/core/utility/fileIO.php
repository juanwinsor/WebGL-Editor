<?php
session_start();
if($_SESSION['Legitmate'] == true)



//get the project name passed in
$projectID = $_POST["project"];

//get the operation
//0 - dir listing
//1 - create code file
//2 - delete file
//3 - get file contents
//4 - save file contents
//5 - create folder
//6 - delete folder
//7 - move file/folder
//8 - upload file

$fileOperation = $_POST["op"];


//echo $projectID;
//echo $fileOperation;

//the directory where the current project resides
$projectDirectory = '../projects/' . $projectID;


class FileHandler
{
    public $workingDir;
    
    private function RecursiveDirectoryListing($dir)
    {
        if($handle = opendir($dir))
        {
            //output the directory listings in an unordered list
            echo "<ul>";
            
            while (false !== ($entry = readdir($handle))) {
                //filter out directories to hide
                if($entry != "." && $entry != ".." && $entry != "project_data")
                {
                    //check if the path is a directory or a file
                    if(is_dir($dir . "/" . $entry))
                    {
                        $fileType = "folder";
                        echo "<li rel=\"" . $fileType . "\" path=\"" . $dir . "/\"><a href=\"#\">" . $entry . "</a>";
                        //list all of the files and folders in the directory just found
                        $this->RecursiveDirectoryListing($dir . "/" . $entry);
                        
                         echo "</li>";
                    }
                    else
                    {
                        //get the files type to know what kind of icon to display for it
                        $fileType = "";
                        
                        $split = str_split($entry, strpos($entry, ".") + 1);
                        
                        switch($split[1])
                        {
                            case "png":
                                $fileType = "file_image";
                                break;
                            
                            case "bmp":
                                $fileType = "file_image";
                                break;
                            
                            case "gif":
                                $fileType = "file_image";
                                break;
                            
                            case "js":
                                $fileType = "file_code";
                                break;
                            
                        }
                        
                        echo "<li rel=\"" . $fileType . "\" path=\"" . $dir . "/\"><a href=\"#\">" . $entry . "</a></li>";
                    }
                }
            }
            
            closedir($handle);
            
            //end the unordered list
            echo "</ul>";
        }
    }
    
    public function GetDirContents()
    {
        $this->directoryListing = "";
        $fileType = "default";
        
        $this->RecursiveDirectoryListing($this->workingDir);
    }
    
    public function DeleteFile()
    {
        $filePath = htmlspecialchars($_POST["filePath"]);
        //delete the file
        if(unlink($filePath))
        {
            echo "1";
        }
        else
        {
            echo "0";
        }
    }
    
    public function DeleteFolder()
    {
        $filePath = htmlspecialchars($_POST["filePath"]);

        //delete the file
        if(rmdir($filePath))
        {
            echo "1";
        }
        else
        {
            echo "0";
        }
    }

    public function CreateFile()
    {
        $fileName = htmlspecialchars($_POST["fileName"]);
        
        $fileHandle = fopen($this->workingDir . "/" . $fileName, "w");
        
        //echo $this->workingDir . "/a" . $folderName;
        if($fileHandle)
        {
            echo "1";
        }
        else
        {
            echo "0";
        }
        
        fclose($fileHandle);
    }
    
    public function GetFileContents()
    {
        //echo "function filecontents(){}";
        $path = htmlspecialchars($_POST["path"]);
        $fileContents = file_get_contents($path);
        echo $fileContents;
    }
    
    public function SaveFileContents()
    {
        $path = htmlspecialchars($_POST["path"]);
        $fileContents = stripslashes(htmlspecialchars_decode($_POST["contents"]));
        if(file_put_contents($path, $fileContents) != false)
        {
            echo "1";
        }
        else
        {
            echo "0";
        }
    }
    
    public function CreateFolder()
    {
        $folderName = htmlspecialchars($_POST["folderName"]);
        //create a folder in the project folder
        
        //echo $this->workingDir . "/" . $folderName;
        if(mkdir($this->workingDir . "/" . $folderName))
        {
            echo "1";
        }
        else
        {
            echo "0";
        }
    }
    
    public function MoveFile()
    {
        $source = htmlspecialchars($_POST["fileSource"]);
        $target = htmlspecialchars($_POST["fileTarget"]);
        
        if(rename($source, $target))
        {
            echo "1";
        }
        else
        {
            echo "0";
        }
        
    }
    
    public function UploadFile()
    {
        //create a path
        $targetPath = $this->workingDir . "/" . basename($_FILES["file"]["name"]);
        
        $projName = $_POST["project"];
        
        if(move_uploaded_file($_FILES["file"]["tmp_name"], $targetPath))
        {
            header( 'Location: editor.php?project=' . $projName );
            //echo $projName;
        }
        else
        {
            header( 'Location: editor.php?project=' . $projName );
            //echo $projName;
        }
    }
}


if($_SESSION['Legitmate'] == true)
{
    $fileIO = new FileHandler();
    $fileIO->workingDir = $projectDirectory;
    
    switch($fileOperation)
    {
        case 0: //dir listing            
            $fileIO->GetDirContents();
            break;
        case 1: //create file
            $fileIO->CreateFile();
            break;
        case 2: //delete file
            $fileIO->DeleteFile();
            break;
        case 3: //get file contents
            $fileIO->GetFileContents();
            break;
        case 4: //save file contents
            $fileIO->SaveFileContents();
            break;
        case 5: //create folder
            $fileIO->CreateFolder();
            break;
        case 6:
            $fileIO->DeleteFolder();
            break;
        case 7:
            $fileIO->MoveFile();
            break;
        case 8:
            $fileIO->UploadFile();
            break;
    }

}


?>