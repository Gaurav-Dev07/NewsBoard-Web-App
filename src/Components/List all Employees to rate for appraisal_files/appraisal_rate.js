(function () {
    $( '#xin_table' ).dataTable( {
        stateSave: true,
        "autoWidth": false,
        "scrollX": true,
        "scrollY": "500px",
        "scrollCollapse": true,
        "ajax": {
            url: base_url + "/employee_to_rate/",
            type: 'GET'
        },
        "fnDrawCallback": function ( settings ) {
            $( '[data-toggle="tooltip"]' ).tooltip();
        }
    } );

    $(".accomplishment").each(function(i,v){
        if($(v).is("select")){
            $(v).select2();
        }
    });
    $(".competencies").each(function(i,v){
        if($(v).is("select")){
            $(v).select2({width:"100%"});
        }
    });
    


    $( '#accomplishment-table' ).dataTable( { 
        "ordering": false,
        "searching": false,
        "lengthChange": false,
        "autoWidth": false,
        "info": false, 
        "scrollX": true,
        "pageLength": 100,
        "scrollY": "400px",
        "scrollCollapse": true,  
    } );

    /**
     *
     */
    $( document ).on( "click", ".project", function () {
        var id = $( this ).attr( 'data-project' );
        var selected_id = $( "#project_name_id" ).val();
        if ( id !== selected_id ) {
            $("#accomplishment-table tr").each(function(i,v){
                $(v).removeClass('tr-active');
            });
            $(this).parent().addClass("tr-active");     
            $( "#project_name_id" ).val( id );
            $( "#project_name" ).html( "<b>" + $( this ).html() + "</b>" );
            clear_all_fileds();
            getAccomplishment(  );
        }
    } );


    /**
     *
     * @returns {undefined}
     */
    let getAccomplishment = function (  ) {
        let data = { };
        data['appraisal_id'] = $( "#appraisal_id" ).val();
        data['project_id'] = $( "#project_name_id" ).val();
        data['appraisal_cycle'] = $( "#cycle" ).val();
        data['appraisal_year'] = $( "#year" ).val();
        data['project_id'] = $( "#project_name_id" ).val();
        data['csrf_hrsale'] = $( "[name='csrf_hrsale']" ).val();
        $.ajax( {
            url: base_url + "/getAccomplishment",
            type: "POST",
            data: data,
            beforeSend: function ( bfs ) {
                $( "#accomplishment_loader" ).fadeIn();
                $(".accomplishment").each(function(i,v){
                    if($(v).is("select")){
                        $( v ).val( '' ); 
                        $(v).trigger('change');
                    }
                });
            },
            success: function ( obj ) {
                let res = JSON.parse( obj );
                $.each( res, function ( i, v ) {
                    if ( i !== 'id' ) {
                        let id = "#" + i + "id";
                       
                        if($(id).is("select")){ 
                            $( id ).val( parseInt(v) ); 
                            $(id).trigger('change');
                        } else{
                            $( id ).val( v ); 
                        }
                    }
                } );
                $( "#accomplishment_loader" ).fadeOut();
            },
            error: function ( error ) {
                let obj = JSON.parse( error.responseText );
                toastr.error( obj.message );
                $( "#accomplishment_loader" ).fadeOut();
            }
        } );
    };




    /**
     *
     * @returns {undefined}
     */
    let clear_all_fileds = function () {
        $( ".accomplishment" ).each( function ( i, v ) {
            $( this ).val( '' );
        } );
    };

    /**
     *
     */
    $( "#accomplishment" ).click( function () {
        let flag = accomplishment_validation();

        if ( flag ) {
            accomplishment_save();
        }
    } );


    /********************accomplishment***********************/
    let accomplishment_save = function () {
        let data = { };
        $( ".accomplishment" ).each( function ( i, v ) {
            data[$( this ).attr( 'name' )] = $( this ).val();
        } );
        data['appraisal_id'] = $( "#appraisal_id" ).val();
        data['appraisal_cycle'] = $( "#cycle" ).val();
        data['review_by'] = 1;
        data['employee_id'] = $( "#employee_id" ).val();
        data['appraisal_year'] = $( "#year" ).val();
        data['competencies_id'] = $( "#competencies_id" ).val();
        data['project_id'] = $( "#project_name_id" ).val();
        data['csrf_hrsale'] = $( "[name='csrf_hrsale']" ).val();
        $.ajax( {
            url: base_url + "/save_accomplishment",
            type: "POST",
            data: data,
            beforeSend: function ( bfs ) {},
            success: function ( obj ) {
                toastr.success( "Details Saved" );
                checkStatusAccomplishment(data['project_id']);
                clickOnNextProject();
            },
            error: function ( error ) {
                let obj = JSON.parse( error.responseText );
                toastr.error( obj.message );
            }
        } );
    };


    const clickOnNextProject = function(){        
        var flag = true;
        $("#accomplishment-table tr").each(function(i,v){
            if($(v).hasClass('tr-active') && flag){
                flag = false;
                $(v).closest('tr').next('tr').find("td:first").click()
            }
        });
    }
    /********************accomplishment***********************/


    /**
     *
     * @returns {undefined}
     */
    let accomplishment_validation = function () {
        toastr.options = {
            "preventDuplicates": true,
            "positionClass": "toast-bottom-left"
        };
        let flag = true;
        $( ".accomplishment" ).each( function ( i, v ) {
            let value = $( v ).val();
            let name = $( v ).attr( "placeholder" );
            let error_id = "#label_" + $( v ).attr( "name" );
            let min = $( v ).attr( "min" );
            let max = $( v ).attr( "max" );
            $( error_id ).html( "" );
            
           
            if ( '' == value ) {
                $( error_id ).html( 'Please provide ' + name );
                flag = false;
            }
            else if ( min && (min > parseFloat(value) || max < parseFloat(value)) ) {
                $( error_id ).html( name + ' Can ' + min + " to " + max );
                flag = false;
            }
            if($(v).is('textarea')){
                if(value.length<20){
                    $( error_id ).html(" Please write descriptive comment" );
                    flag = false;
                }
            }
        } );
        return flag;
    };


    /*****************************COMPETENCIES START*********************************/
    $( "#competencies" ).click( function () {
        let data = { };
        let flag = true;


        $( ".competencies" ).each( function ( index, value ) {
            var rate = $( value ).val();
            if ( '' == rate || rate < 1 || rate > 5 ) {
                toastr.error( 'Value should be between 1 and 5' );
                flag = false;
            }
        } );

        if ( flag ) {
            $( ".competencies" ).each( function ( index, value ) {
                data[$( value ).attr( 'name' )] = $( value ).val();
            } );
            data['rate_by'] = 1;
            data['appraisal_id'] = $( "#appraisal_id" ).val();
            data['appraisal_cycle'] = $( "#cycle" ).val();
            data['appraisal_year'] = $( "#year" ).val();
            data['competencies_id'] = $( "#competencies_id" ).val();
            save_competencies( data )
        }
    } );

    

    let save_competencies = function ( data ) {
        $.ajax( {
            url: base_url + "/save_competencies",
            type: "GET",
            data: data,
            beforeSend: function ( bfs ) {},
            success: function ( obj ) {
                toastr.success( "Details Saved" );
            },
            error: function ( error ) {
                let obj = JSON.parse( error.responseText );
                toastr.error( obj.message );
            }
        } );
    };
    /*****************************COMPETENCIES END***********************************/



    /*****************************SESSION START*********************************/
    $( "#session_btn" ).click( function () {
        let data = { };
        let flag = true;

        $( '.sessions' ).each( function ( index, value ) {
            let val = $( value ).val();
            let name = $( value ).attr( 'name' );
            let placeholder = $( value ).attr( 'placeholder' );
            let min = $( value ).attr( 'min' );
            let max = $( value ).attr( 'max' );
            let error = "#lbl_" + name;
            $( error ).html( "" );

            if ( '' == val ) {
                $( error ).html( placeholder + " value is required" );
                flag = false;
            }

            if ( min ) {
                if ( val < min || val > max ) {
                    $( error ).html( placeholder + " value should be between " + min + " and " + max );
                }
            }

            data[name] = val;
        } );

        data['appraisal_id'] = $( "#appraisal_id" ).val();
        data['appraisal_cycle'] = $( "#cycle" ).val();
        data['appraisal_year'] = $( "#year" ).val();
        data['csrf_hrsale'] = $( "[name='csrf_hrsale']" ).val();

        if ( flag ) {
            $.ajax( {
                url: base_url + "/save_session",
                type: "POST",
                data: data,
                beforeSend: function ( bfs ) {},
                success: function ( obj ) {
                    setValue( obj );
                    clearValue();
                    toastr.success( "Details Saved" );
                },
                error: function ( error ) {
                    let obj = JSON.parse( error.responseText );
                    toastr.error( obj.message );
                }
            } );
        }
    } );

    let clearValue = function () {
        $( '.sessions' ).each( function ( index, value ) {
            $( value ).val( '' );
        } );
    };

    let setValue = function ( obj ) {
        let res = JSON.parse( obj );
        let html = '';
        $( "#session_body" ).empty();
        $.each( res.sessions, function ( si, sv ) {
            let id = sv['id'];
            html = '<tr>';
            $.each( res.session_fields, function ( fi, fv ) {
                html += '<td>';
                html += sv[fv.column_name];
                html += '</td>';
            } );
            html += '<td><button class="btn btn-danger btn_session_del"  data-id="' + id + '">Delete</button></td>';
            html += '</tr>';
            $( "#session_body" ).append( html );
        } );
    };


    $( document ).on( "click", ".btn_session_del", function () {
        let id = $( this ).attr( 'data-id' );
        if ( confirm( "Do you want to delete this" ) ) {
            let data = { };
            data['appraisal_id'] = $( "#appraisal_id" ).val();
            data['appraisal_cycle'] = $( "#cycle" ).val();
            data['appraisal_year'] = $( "#year" ).val();
            data['csrf_hrsale'] = $( "[name='csrf_hrsale']" ).val();
            data['id'] = id;
            $.ajax( {
                url: base_url + "/deleteSession",
                type: "POST",
                data: data,
                beforeSend: function ( bfs ) {},
                success: function ( obj ) {
                    setValue( obj );
                    toastr.success( "Details Saved" );
                },
                error: function ( error ) {
                    let obj = JSON.parse( error.responseText );
                    toastr.error( obj.message );
                }
            } );
        }
    } );
    /*****************************SESSION END*********************************/


    /*****************************6 Months Plan*********************************/
    $( "#plan_btn" ).click( function () {
        let data = { };

        var count = 0;
        let flag = true;

        data['good'] = $( "#good" ).val();
        data['bad'] = $( "#bad" ).val();
        data['can_improve'] = $( "#can_improve" ).val();
        data['improvement'] = $( "#improvement" ).val();
        if ( '' === data['good'] || data['good'].length < 20) {
            toastr.error( "What went good? Please write descriptive comments." );
            flag = false;
        }
        if ( '' === data['bad'] || data['bad'].length < 20 ) {
            toastr.error( " What went bad?Please write descriptive comments." );
            flag = false;
        }
        if ( '' === data['can_improve'] || data['can_improve'].length < 20 ) {
            toastr.error( " What we can improve?Please write descriptive comments." );
            flag = false;
        }
        if ( '' === data['improvement'] || data['improvement'].length < 20 ) {
            toastr.error( "Your course of action for improvement?Please write descriptive comments." );
            flag = false;
        }

        $( '.next-plan' ).each( function ( index, value ) {
            let val = $( value ).val();
            let name = $( value ).attr( 'name' );
            let placeholder = $( value ).attr( 'placeholder' );
            let min = $( value ).attr( 'min' );
            let max = $( value ).attr( 'max' );
            let error = "#lbl_" + name;
            $( error ).html( "" );

            if ( '' == val ) {
                $( error ).html( placeholder + " value is required" );
                flag = false;
            }

            if ( min ) {
                if ( val < min || val > max ) {
                    $( error ).html( placeholder + " value should be between " + min + " and " + max );
                }
            }
            data[name] = val;
        } );

        data['csrf_hrsale'] = $( "[name='csrf_hrsale']" ).val();
        data['appraisal_id'] = $( "#appraisal_id" ).val();
        data['appraisal_cycle'] = $( "#cycle" ).val();
        data['appraisal_year'] = $( "#year" ).val();

        if ( flag ) {
            $.ajax( {
                url: base_url + "/save_plan",
                type: "POST",
                data: data,
                beforeSend: function ( bfs ) {},
                success: function ( obj ) {
                    clearPlanValue();
                    setPlanValue( obj );
                    toastr.success( "Details Saved" );
                },
                error: function ( error ) {
                    let obj = JSON.parse( error.responseText );
                    toastr.error( obj.message );
                }
            } );
        }

    } );


    let clearPlanValue = function () {
        $( '.next-plan' ).each( function ( index, value ) {
            $( value ).val( '' );
        } );
    };

    let setPlanValue = function ( obj ) {
        let res = JSON.parse( obj );
        let html = '';
        $( "#plan_body" ).empty();
        $.each( res.sessions, function ( si, sv ) {
            let id = sv['id'];
            html = '<tr>';
            $.each( res.session_fields, function ( fi, fv ) {
                html += '<td>';
                html += sv[fv.column_name];
                html += '</td>';
            } );
            html += '<td><button class="btn btn-danger btn_plan_del"  data-id="' + id + '">Delete</button></td>';
            html += '</tr>';
            $( "#plan_body" ).append( html );
        } );
    };

    $( document ).on( "click", ".btn_plan_del", function () {
        let id = $( this ).attr( 'data-id' );
        if ( confirm( "Do you want to delete this" ) ) {
            let data = { };
            data['appraisal_id'] = $( "#appraisal_id" ).val();
            data['appraisal_cycle'] = $( "#cycle" ).val();
            data['appraisal_year'] = $( "#year" ).val();
            data['csrf_hrsale'] = $( "[name='csrf_hrsale']" ).val();
            data['id'] = id;
            $.ajax( {
                url: base_url + "/deletePlan",
                type: "POST",
                data: data,
                beforeSend: function ( bfs ) {},
                success: function ( obj ) {
                    clearPlanValue();
                    setPlanValue( obj );
                    toastr.success( "Details Saved" );
                },
                error: function ( error ) {
                    let obj = JSON.parse( error.responseText );
                    toastr.error( obj.message );
                }
            } );
        }
    } );
    /*****************************6 Months Plan End*****************************/


    $( document ).on( "click", ".pc_rate", function () {
        let id = $( this ).attr( "data-id" );
        var url = base_url + "/rate_by_pc/" + id; 
        window.open(url, '_blank');
    } );


    $( document ).on( 'click', '.view-process', function () {
        let id = $( this ).attr( 'data-id' );
        var url = base_url + '/view_apprailsa/' + id;
        window.open(url, '_blank');
    } );



    $("#attended").change(function(){
        let thisVal = parseInt( $(this).val());        
        switch(thisVal){
            case 0:
                    $("#self_rating").val(5);
                break;
            case 1:
                    $("#self_rating").val(3);
                break;
            default : 
                $("#self_rating").val(0);
                break;
        }
    });


    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

    $("#final_submit").click(function(){
        var if_form_filled = $("#if_form_filled").val();
        
        if( if_form_filled == 0 ){
            let errors = $("#if_form_filled_error").val();
            errors = errors.replace('+', ' ');
            Swal.fire({
                icon: 'error', 
                html: errors
              })
        }

    if(if_form_filled == 1){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to make any changes",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Submit'
          }).then((result) => {
            if (result.value) {
                let data = {  };
                data['appraisal_cycle'] = $( "#cycle" ).val();
                data['appraisal_id'] = $( "#appraisal_id" ).val();
                data['appraisal_year'] = $( "#year" ).val();
                data['employee_id'] = $( "#employee_id" ).val();
                data['csrf_hrsale'] = $( "[name='csrf_hrsale']" ).val();
    
                $.ajax( {
                    url: base_url + "/finalSubmit",
                    method: "POST",
                    data: data,
                    beforeSend: function ( bfs ) {
                       
                    },
                    success: function ( result ) {
                        let obj = JSON.parse( result );
                       
                        window.location.reload();
                    },
                    error: function ( error ) {
                        
                    }
                } );
            }
          })
        }
    });
    $("#self_rating").prop("readonly", true);

    let checkStatusAccomplishment = function ( project_id ) {
        let data = { };
        data['project_id'] = project_id;
        data['appraisal_id'] = $( "#appraisal_id" ).val();
        data['appraisal_cycle'] = $( "#cycle" ).val();
        data['appraisal_year'] = $( "#year" ).val();
        data['employee_id'] = $( "#employee_id" ).val();
        data['review_by'] = 1;
        data['csrf_hrsale'] = $( "[name='csrf_hrsale']" ).val();
        $.ajax( {
            url: base_url + "/checkStatusAccomplishment",
            type: "POST",
            data: data,
            beforeSend: function ( bfs ) {
                $( "#accomplishment_loader" ).fadeIn();
            },
            success: function ( obj ) {
                let res = JSON.parse( obj );
                if(res){
                    $("#accomplishment_project_"+res.project_id).html('<i class="fas fa-check-circle"></i>');
                }
                
                $( "#accomplishment_loader" ).fadeOut();
            },
            error: function ( error ) {
                let obj = JSON.parse( error.responseText );
                toastr.error( obj.message );
                $( "#accomplishment_loader" ).fadeOut();
            }
        } );
    };
 
    if(typeof projectArray != 'undefined'){
        $(projectArray).each(function(i,v){
            checkStatusAccomplishment(v)
        });
    }
    
    getAccomplishment();
})();

$(".nav-link").click(function(){
    $id = $(this).attr("href"); 
    localStorage.setItem("data-config-block", $id);
    if ($id == "#pills-OverallPerformance") {    
        window.location.reload();
    }
});
 

let checkActiveLink = function(){
    $id = localStorage.getItem("data-config-block");console.log( $id);
    localStorage.removeItem("data-config-block");
    if ( $id !== "undefined" && $id != null && $id == "#pills-OverallPerformance") {      
        var res = $id.replace("#", "");         console.log( res);
        $(".nav-link").removeClass('active');
        $("[href='"+$id+"']").addClass('active');

        $(".tab-pane").removeClass('show');
        $(".tab-pane").removeClass('active'); 
        $("[id='"+res+"']").addClass('active');
        $("[id='"+res+"']").addClass('show');
    }
};

checkActiveLink();