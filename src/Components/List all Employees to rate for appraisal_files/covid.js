(function(){

    $('#covid19_modal').on('shown.bs.modal', function () {
        $('.owl-carousel').owlCarousel({
            items:1,
            loop:true,
            margin:5,
            autoplay:true,
            dots: false,
        })
    })
    
    
    $("#covid_19_btn").click(function(){
        $("#covid19_modal").modal("show");
        // $('.owl-carousel').trigger('refresh.owl.carousel');
        setTimeout(function(){
            $('.owl-carousel').owlCarousel({
                items:1,
                loop:true,
                margin:5,
                autoplay:true,
                dots: false,
            })
        }, 200);
    });


    $("#country").select2({
        dropdownParent: $('#covid19_modal')
    });


$(document).on("click", '#btn-save', function(){
    let flag  = true;
    let title = $("#help_title").val();
    let description = $("#help_description").val();
    let mobile_no = $("#help_mobile_no").val();
    let address = $("#help_address").val();

    if(title.length<1){
        toastr.error( "Please Provide Title" );
        $("#title").focus();
        flag = false;
    }

    
    if(flag && description.length<1){
        toastr.error( "Please Provide Description" );
        $("#description").focus();
        flag = false;
    }

    if(flag && mobile_no.length<1){
        toastr.error( "Please Provide Contact No." );
        $("#mobile_no").focus();
        flag = false;
    }

    if(flag && address.length<1){
        toastr.error( "Please Provide Address" );
        $("#address").focus();
        flag = false;
    }


    if(flag){
        let data = {
            title:title,
            description:description,
            mobile_no:mobile_no,
            address:address,
            csrf_hrsale: $("[name='csrf_hrsale']").val()
        }
       $.ajax({
           url: site_url+"/covid19/raise_request",
           method : "POST",
           data : data, 
           beforeSend: function(){
            $("#covid_loader").fadeIn("slow");
           },
           error: function(){
                $("#covid_loader").fadeOut("slow");
           }, 
           success:function(){
                $("#covid_loader").fadeOut("slow");
                $("#covid19_modal").modal("hide");
                $("#help_title").val("");
                $("#help_description").val("");
                $("#help_mobile_no").val("");
                $("#help_address").val("");
           }  
       });
    }
});
})();

function checkphonenumber( e ) {
    -1 !== $.inArray( e.keyCode, [ 46, 8, 9, 27, 13 ] ) || 65 == e.keyCode && !0 === e.ctrlKey || 86 == e.keyCode && !0 === e.ctrlKey || 67 == e.keyCode && !0 === e.ctrlKey || 88 == e.keyCode && !0 === e.ctrlKey || e.keyCode >= 35 && e.keyCode <= 39 || (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105) && e.preventDefault()
}