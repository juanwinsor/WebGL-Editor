function getFileContents(filePath)
{
    $.post("../utility/fileIO.php", { project: projectID, path: filePath, op: 3 },
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
        $.post("../utility/fileIO.php", { project: projectID, path: filePath, contents: fileContents, op: 4 },
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
    $.post("../utility/fileIO.php", { project: projectID, folderName: foldername, op: 5 }, function(data) {
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
    $.post("../utility/fileIO.php", { project: projectID, fileName: filename, op: 1 }, function(data) {
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
    $.post("../utility/fileIO.php", { project: projectID, filePath: filepath, op: 2 }, function(data) {
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
    $.post("../utility/fileIO.php", { project: projectID, filePath: folderPath, op: 6 }, function(data) {
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
    $.post("../utility/fileIO.php", { project: projectID, fileSource: filePath, fileTarget: targetPath, op: 7 }, function(data) {
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