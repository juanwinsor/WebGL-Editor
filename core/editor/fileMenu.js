

function initializeFileMenu() {
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
                var fname = $('#directory').jstree('get_selected').text().trim(); //trim white spaces from the file name
                if(fname == "game.js")
                {
                    alert("You cannot delete game.js.");
                }
                else
                {
                    //confirm delete
                    if (confirm("delete " + $('#directory').jstree('get_selected').text().trim() + "?")) {
                        //determine if anything is selected, check if file or folder then call the appropriate delete
                        if($('#directory').jstree('get_selected').attr('rel').slice(0, 9) == "file_code" || $('#directory').jstree('get_selected').attr('rel').slice(0, 10) == "file_image")
                        {
                            var filepath = $('#directory').jstree('get_selected').attr('path') + $('#directory').jstree('get_selected').children("a").text().replace(String.fromCharCode(160), "");
                            deleteFile(filepath);
                        }
                        
                        if($('#directory').jstree('get_selected').attr('rel') == "folder")
                        {
                            var filepath = $('#directory').jstree('get_selected').attr('path') + $('#directory').jstree('get_selected').children("a").text().replace(String.fromCharCode(160), "");
                            deleteFolder(filepath);
                        }   
                    }
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
                    //check filename is not blank
                    if($("#filenameTextbox").val() != "")
                    {
                        createNewFolder($("#filenameTextbox").val());
                    }
                    else
                    {
                        alert("please enter a folder name.");
                    }
                    break;
                
                case "js":
                    //check filename is not blank
                    if($("#filenameTextbox").val() != "")
                    {
                        //if user already typed extension then don't add it
                        var fileNameSplit = $("#filenameTextbox").val().split(".");
                        if (fileNameSplit[1] == "js") {
                            createFile($("#filenameTextbox").val());
                        }
                        else
                        {
                            createFile($("#filenameTextbox").val() + ".js");
                        }
                    }
                    else
                    {
                        alert("please enter a filename.");
                    }
                    
                    
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