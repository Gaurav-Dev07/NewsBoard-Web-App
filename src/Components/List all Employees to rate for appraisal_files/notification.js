/**
 * Developed by Appinventiv Techonologies
 */
(function(){
    $("#notification").click(function(){
        if( $( ".notification-class" ).hasClass("active")){
            $( ".notification-class" ).animate( { right: '-400px' } );
            $( ".notification-class" ).removeClass( "active");        
            $( ".notification-class" ).fadeIn( "Slow");
        }else{
            checkNewNotification();
            // $( ".notification-class" ).fadeOut( "Slow");
            $( ".notification-class" ).animate( { right: '0px' } );
            $( ".notification-class" ).addClass( "active");        
        }
    });

    

    /**
     * 
     */
    let checkNewNotification = function(){
        $.ajax({
            url : site_url+"/check-notifications",
            data:{},
            type:"GET", 
            beforeSend:function(bfs){
                $("#notification_loader").fadeIn("slow");
            },
            error:function(err){
                $("#notification").click();
            },
            success:function (obj){
                $("#notification_loader").fadeOut("slow");
                let result = JSON.parse(obj);
                let notifications = result.notifications;
                let total = result.total;
                $("#notification-box").html(notifications);
            }
        });
    };



    $(document).on("click",".milestone-history", function (){       
        let id = $(this).attr("data-id")    
        $.ajax({
            url : site_url+"/milestone-history",
            data:{id:id},
            type:"GET", 
            beforeSend:function(bfs){
                $( ".notification-class" ).animate( { right: '0px' } );
                $( ".notification-class" ).addClass( "active");     
                $("#notification_loader").fadeIn("slow");
            },
            error:function(err){
                $("#notification").click();
            },
            success:function (obj){
                $("#notification_loader").fadeOut("slow");
                let result = JSON.parse(obj);
                let notifications = result.notifications;
                let total = result.total;
                $("#notification-box").html(notifications);
            }
        });   
    });



    $("#side-model-close").click(function(){
        $( ".notification-class" ).animate( { right: '-400px' } );
        $( ".notification-class" ).removeClass( "active");    
    });


    $(document).on("click", ".pm-name-milestone", function(){
        let id = $(this).attr("data-pm-id");
        let delivery_month = $("#my_deliveries_month").val();
        let type = $(this).attr("data-type");
        $.ajax({
            url : site_url+"milestone",
            data:{id:id, type:type, delivery_month:delivery_month},
            type:"GET", 
            beforeSend:function(bfs){
                $( ".notification-class" ).animate( { right: '0px' } );
                $( ".notification-class" ).addClass( "active");     
                $("#notification_loader").fadeIn("slow");
            },
            error:function(err){
                $("#notification").click();
            },
            success:function (obj){
                $("#notification_loader").fadeOut("slow");
                let result = JSON.parse(obj);
                let notifications = result.notifications;
                let total = result.total;
                $("#notification-box").html(notifications);
            }
        });  
    });


    /**
     * 
     */
    $(document).on("click", ".am-milestone", function(){
        let id = $(this).attr("data-pm-id");
        let delivery_month = $("#deliveries_month").val();
        let type = $(this).attr("data-type");
        let project_id = $(this).attr("data-am-id");
        $.ajax({
            url : site_url+"milestones",
            data:{id:id, type:type, delivery_month:delivery_month, project_id:project_id},
            type:"GET", 
            beforeSend:function(bfs){
                $("#notification_loader").fadeIn("slow");
                $( ".notification-class" ).animate( { right: '0px' } );
                $( ".notification-class" ).addClass( "active");                     
            },
            error:function(err){
                $("#notification").click();
            },
            success:function (obj){
                $("#notification_loader").fadeOut("slow");
                let result = JSON.parse(obj);
                let notifications = result.notifications;
                let total = result.total;
                $("#notification-box").html(notifications);
            }
        });  
    });   
    
    
    /**
     * 
     */
    $(document).on("click", ".delivery-milestone", function(){       
        let id = $(this).attr("data-id");
        let type = $(this).attr("data-type");
        $.ajax({
            url : site_url+"delivery-milestones",
            data:{id:id, type:type, csrf_hrsale:$("[name='csrf_hrsale']").val()},
            type:"POST", 
            beforeSend:function(bfs){
                $("#notification_loader").fadeIn("slow");
                $( ".notification-class" ).animate( { right: '0px' } );
                $( ".notification-class" ).addClass( "active");                     
            },
            error:function(err){
                $("#notification").click();
            },
            success:function (obj){
                $("#notification_loader").fadeOut("slow");
                let result = JSON.parse(obj);
                let notifications = result.notifications;
                let total = result.total;
                $("#notification-box").html(notifications);
            }
        });  
    });


})();


