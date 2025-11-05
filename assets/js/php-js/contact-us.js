var novacApiUrl = $("#api_url").val();

function getJWTAuthToken() {
    $.ajax({
        url: novacApiUrl + "authorize",
        type: "GET",
        dataType: "json",
        headers: {
            "api-version": "v1",
        },
        contentType: "application/json; charset=utf-8",
        success: function(response) {
            if (response.code == 200 && response.status == "success") {
                var date = new Date();
                var minutes = 60;
                date.setTime(date.getTime() + minutes * 60 * 1000);
                token = response.data.token;
                $.cookie("jwtToken", token, {
                    expires: date,
                });
                getIpaddress();
            }
        },
        error: function(error) {},
    });
}

$(document).ready(function() {
    getJWTAuthToken();
    $("#submit").click(function() {
        var utm_medium = $('#utm_medium').val() === null ? '' : $('#utm_medium').val();
        var vertical = $('#vertical').val() === null ? '' : $('#vertical').val();
        var product = $('#product').val() === null ? '' : $('#product').val();
        var leadsource = $('#leadsource').val() === null ? '' : $('#leadsource').val();
        var bid = $('#bid').val() === null ? '' : $('#bid').val();
        var slugValue = $('#slug').val();
        let data = {
            'name': $("#name").val(),
            'email': $("#email").val(),
            'contact_number': $('#contact_number').val(),
            'company_site': $('#company_site').val(),
            'city': $('#city').val(),
            // 'preferred_service': $('#preferred_service').val(),
            'user_message': $('#user_message').val(),
            'utm_medium': utm_medium,
            'vertical': vertical,
            'product': product,
            'leadsource': leadsource,
            'bid': bid,
            'jwtToken': $.cookie("jwtToken")
        };

        if (!validateData(data)) {
            return false;
        }

        // AJAX Code To Submit Form.
        $.ajax({
            type: "POST",
            url: "/save-request-details.php",
            data: data,
            cache: false,
            dataType: 'json',

            beforeSend: function() {
                $("#common-success, #common-error").hide();
                $('span.error').hide();
            },
            success: function(result) {
                if (result.status) {
                    var last_id = $('#unique_id').val();
                    localStorage.setItem("authorized_user", JSON.stringify(last_id));
                    // $("#common-success").html(result.message).show();
                    resetDatas();
                    var slugValue = $('#slug').val();
                    // window.location.href = "../thankyou-page.php";
                    // var myForm = document.createElement("form");
                    // myForm.method = "POST";
                    // myForm.action = (slugValue !== undefined && slugValue !== "")
                    //     ? "/" + slugValue + "/thankyou"
                    //     : "/thankyou";
                    // var myInput = document.createElement("input");
                    // myInput.setAttribute("name", 'submissionStatus');
                    // myInput.setAttribute("value", "formsubmitted");
                    // myForm.appendChild(myInput);
                    // document.body.appendChild(myForm);
                    // myForm.submit();
                    // document.body.removeChild(myForm);
                    var redirectUrl = (slugValue !== undefined && slugValue !== "") ?
                        "/" + slugValue + "/thankyou" :
                        "/thankyou";
                    window.location.href = redirectUrl;
                } else {
                    $.each(result.errors, function(key, value) {
                        $("#error-" + key).html(value).show();

                    });

                    $("#common-error").html(result.message).show();
                }
            },
            error: function(error) {
                $("#common-error").html(error.message).show();
            }

        });
    });

    $('input, select, textarea').on('change', function() {
        $(this).siblings('span.error').html('').hide();
    });

    $('#user_message').on('keyup', function(e) {
        let content = $(this).val();

        if ((content.replace(/\s/g, "").length == 0) || (content.replace(/\n/g, "").length == 0 && e.keyCode == 13)) {
            e.preventDefault();
            $('#error-user_message').html('Enter valid message.').show();
            $(this).val('');
            return;
        } else if (content && content.split("\n").length > 4) {
            $('#error-user_message').html('Maximum 4 rows allowed.').show();
            return;
        };
    });


    $('#contact_number').on('keyup', function(e) {
        e.preventDefault();
        let content = $(this).val(),
            invalidChars = /[^+{1}0-9]/gi;
        if ((content.replace(/\s/g, "").length == 0) || (content.replace(/\n/g, "").length == 0)) {
            $(this).val('');
            return;
        } else if (invalidChars.test(content)) {
            content = content.replace(invalidChars, "");
            $(this).val(content);
            return;
        }
        let firstCharacter = content.charAt(0);

        if (content.length > 1 && content.split('+').length > 1) {
            content = content.replace(/\+/g, '');
            content = (firstCharacter === '+') ? '+' + content : content;
            $(this).val(content);
        }

        if (content.length > 16) {
            $(this).val(content.substring(0, 16));
            return;
        }
    })
});

function resetDatas() {
    $("#name").val('');
    $("#email").val('');
    $('#contact_number').val('');
    $('#company_site').val('');
    $('#city').val('');
    // $('#preferred_service').val(null).trigger('change');
    $('#user_message').val('');
}

function validateData(datas) {
    let errorFields = {},
        isValid = true
    words = /shit|fuck|fucker|piss|pussy|porn|sex|fake|nude/gi;

    $('span.error').hide();

    if (datas.name) {
        if (!(/^[A-Za-z\s]+$/.test(datas.name))) {
            isValid = false;
            $('#error-name').html('Name should contains only combination of alphabets and white spaces.').show();
        } else if ((datas.name).replace(/[^a-zA-Z ]/g, "").length < 1) {
            isValid = false;
            $('#error-name').html('Name should be valid.').show();
        } else if (words.test(datas.name)) {
            isValid = false;
            $('#error-name').html('Please use appropriate words.').show();
        }
    } else {
        isValid = false;
        $('#error-name').html('This field is required.').show();
    }

    if (datas.email) {
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        trimvalue = $.trim(datas.email)
        const domain = trimvalue.split('@')[1] || "";
        let forbiddenDomainsRegex = /(gmail|yahoo|ymail|hotmail|mailinator|bmail|vmail|dmail|rediffmail|googlemail|live|outlook|gmailom|email|info)/i;
        if (!(datas.email.match(emailRegex))) {
            isValid = false;
            $('#error-email').html('Email should be valid.').show();
        } else if (forbiddenDomainsRegex.test(domain)) {
            isValid = false;
            $('#error-email').html('Please enter Company Email.').show();
        } else if (words.test(datas.email)) {
            isValid = false;
            $('#error-email').html('Please use appropriate words.').show();
        }
    } else {
        isValid = false;
        $('#error-email').html('This field is required.').show();
    }

    if (datas.contact_number) {

        if (!(/^[+0-9]+$/.test(datas.contact_number)) || (datas.contact_number.length < 9 || datas.contact_number.length > 16)) {
            isValid = false;
            $('#error-contact_number').html('Contact number should be valid.').show();
        }
    } else {
        isValid = false;
        $('#error-contact_number').html('This field is required.').show();
    }

    if (datas.company_site) {

        if (datas.company_site.match(/(\s)/g)) {
            isValid = false;
            $('#error-company_site').html('Site URL should be valid.').show();
        } else if (!datas.company_site.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9.]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
            isValid = false;
            $('#error-company_site').html('Site URL should be valid.').show();
        } else if (words.test(datas.company_site)) {
            isValid = false;
            $('#error-company_site').html('Please use appropriate words.').show();
        }
    } else {
        isValid = false;
        $('#error-company_site').html('This field is required.').show();
    }

    if (datas.city) {
        if (!(/^[A-Za-z\s+0-9-_'"]+$/.test(datas.city))) {
            isValid = false;
            $('#error-city').html('City should contains only combination of alphabets , numbers and white spaces.').show();
        } else if ((datas.city).replace(/[^a-zA-Z ]/g, "").length < 1) {
            isValid = false;
            $('#error-city').html('City should be valid.').show();
        } else if (words.test(datas.city)) {
            isValid = false;
            $('#error-city').html('Please use appropriate words.').show();
        }
    } else {
        isValid = false;
        $('#error-city').html('This field is required.').show();
    }

    // if(!datas.preferred_service) {           
    //     isValid = false;
    //     $('#error-preferred_service').html('This field is required.').show();
    // }

    if (datas.user_message) {
        if (!(/^[A-Za-z\s+0-9-_.'"]+$/.test(datas.user_message))) {
            isValid = false;
            $('#error-user_message').html('Message should contains only combination of alphabets , numbers and white spaces.').show();
        } else if ((datas.user_message).replace(/[^a-zA-Z ]/g, "").length < 1) {
            isValid = false;
            $('#error-user_message').html('Message should be valid.').show();
        } else if (words.test(datas.user_message)) {
            isValid = false;
            $('#error-user_message').html('Please use appropriate words.').show();
        }
    } else {
        isValid = false;
        $('#error-user_message').html('This field is required.').show();
    }

    return isValid;
}