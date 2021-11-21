/**
 * To display sevrer error msg
 * @param {*} msg
 */
function serverError(msg = 'Something went wrong.Please try again') {
    swal('', msg, 'warning');
}

function successToast(msg = "Success") {
    toastr.success(msg, 'Success!', {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    });
}

function errorToast(msg = "Error") {
    toastr.error(msg, '', {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    });
}

function warningToast(msg = "Error") {
    toastr.warning(msg, '', {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    });
}


/**
 * Button loader
 */
function loaderHtml() {
    return '<i class="fa fa-spinner fa-spin"></i> Please Wait...';
}

function serverError(msg = "Something went wrong. Please try again") {
    toastr.error(msg, 'Error!', {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    });
}



function hideShowLoader(action = 'hide') {
    if (action == 'show') {
        // $('#fullPageLoader').show();
    }
    else {
        // $('#fullPageLoader').hide();
    }
}

function reloadTable() {
    $('#xin_table').DataTable().ajax.reload();
}

function dataTableLoader() {
    return '<i class="fas fa-spinner fa-3x"></i>';
}

function noDataFoundImage() {
    return '<img src="https://dashboard.appinventiv.com/skin/img/no-data-found.png" alt="No data found" height="200" width="200">';
}


/**
 * Perform action on server
 * @param {*} url 
 * @param {*} ajaxData 
 */
function performActionOnServer(url, ajaxData) {
    $.ajax({
        type: 'POST',
        url: url,
        data: ajaxData,
        beforeSend: function () {
            hideShowLoader('show');
        },
        success: function (res) {
            hideShowLoader();
            if (res && res.CODE == 418) {
                errorToast(res.MSG);
            } else if (res.CODE >= 200) {
                successToast(res.MSG);
                if (res.DATA.reload == 1) {
                    window.location.reload('true');
                }
                else {
                    reloadTable();
                }

                $('.modal').modal('hide');
            } else {
                hideShowLoader();
                serverError();
            }
        },
        error: function () {
            hideShowLoader();
            serverError();
        }
    });
}

function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
        if (haystack[i] == needle) return true;
    }
    return false;
}

$('body').on('click', '.underDev', function (e) {
    e.preventDefault();
    warningToast('Under Developement!');
});

$('.numberOnly').on('keypress', function(e){
    // console.log(e.which);
    event = e.which;
    if( event == 69 || event == 101 || event == 46 || (event < 48 || event > 57 ) ){
        return false;
    }
})

let constans = {
    'ASSET' : {
        'ASSET_APPROVED' : 1,
        'ASSET_REQUESTED' : 2,
        'ASSET_REJECTED' : 3,
        'ASSET_ACKNOWLEDGE' : 4,
        'ASSET_CLOSED' : 5,
    },

    'MilestoneEventType' : {
        'Delivery_Date' : 1,
        'Delivery_Status' : 2,
        'Signoff_Status' : 3,
        'Payment_Status' : 4,
        'Signoff_Date' : 5,

    }
}
