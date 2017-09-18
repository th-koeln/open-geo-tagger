$(document).ready(function () {

    $('.input-group input[name=username]').on('focusout', function () {

        var $formVar = $('.input-group input[name=username]');


        if ($formVar.val().length == 0) {
            var $form = $formVar.closest('form'),
                $group = $formVar.closest('.input-group'),
                $addon = $group.find('.input-group-addon'),
                $icon = $addon.find('span');

            $addon.removeClass('success');
            $addon.addClass('danger');
            $icon.attr('class', 'glyphicon glyphicon-remove');

            $('.input-group input[name=username]').removeClass('validated');

        } else {

            var data = {
                username: $("#usernameone").val()
            }
            $.ajax({
                url: "https://localhost:3000/user/search",
                method: "POST",
                data: data
            }).done(function (response) {


                var $form = $formVar.closest('form'),
                    $group = $formVar.closest('.input-group'),
                    $addon = $group.find('.input-group-addon'),
                    $icon = $addon.find('span');

                $addon.removeClass('success');
                $addon.addClass('danger');
                $icon.attr('class', 'glyphicon glyphicon-remove');
                $('.input-group input[name=username]').removeClass('validated');



            }).fail(function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 404 && $formVar.val().length > 0) {

                    var $form = $formVar.closest('form'),
                        $group = $formVar.closest('.input-group'),
                        $addon = $group.find('.input-group-addon'),
                        $icon = $addon.find('span');

                    $addon.removeClass('danger');
                    $addon.addClass('success');
                    $icon.attr('class', 'glyphicon glyphicon-ok');
                    $('.input-group input[name=username]').addClass('validated');


                } else if (jqXHR.status == 404 && $formVar.val().length < 1) {

                    var formVar = $('.input-group input[name=username]');
                    var $form = formVar.closest('form'),
                        $group = formVar.closest('.input-group'),
                        $addon = $group.find('.input-group-addon'),
                        $icon = $addon.find('span');

                    $addon.removeClass('success');
                    $addon.addClass('danger');
                    $icon.attr('class', 'glyphicon glyphicon-remove');
                    $('.input-group input[name=username]').removeClass('validated');
                }
            });
        }
    });



    $('.checkloggedin').on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();

        if ($('.dropdown').find('.dropdown-menu').is(":hidden")) {
            $('.dropdown').find('[data-toggle=dropdown]').dropdown('toggle');
        }
    });





    $('.input-group input[name=email]').on('keyup change', function () {

        var $formVar = $('.input-group input[name=email]');
        var $form = $(this).closest('form'),
            $group = $(this).closest('.input-group'),
            $addon = $group.find('.input-group-addon'),
            $icon = $addon.find('span'),
            state = false;

        if (!$group.data('validate')) {
            state = $(this).val() ? true : false;
        } else if ($group.data('validate') == "email") {
            state = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(this).val())
        }

        if (state) {

            var data = {
                email: $("#email").val()
            };

            $.ajax({
                url: "https://localhost:3000/user/search",
                method: "POST",
                data: data
            }).done(function (response) {

                $addon.removeClass('success');
                $addon.addClass('danger');
                $icon.attr('class', 'glyphicon glyphicon-remove');
                $('.input-group input[name=email]').removeClass('validated');

            }).fail(function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 404 && $formVar.val().length > 0) {

                    $addon.removeClass('danger');
                    $addon.addClass('success');
                    $icon.attr('class', 'glyphicon glyphicon-ok');
                    $('.input-group input[name=email]').addClass('validated');


                } else if (jqXHR.status == 404 && $formVar.val().length < 1) {

                    $addon.removeClass('success');
                    $addon.addClass('danger');
                    $icon.attr('class', 'glyphicon glyphicon-remove');
                    $('.input-group input[name=email]').removeClass('validated');

                }
            });

        } else {
            $addon.removeClass('success');
            $addon.addClass('danger');
            $icon.attr('class', 'glyphicon glyphicon-remove');
            $('.input-group input[name=email]').removeClass('validated');
        }

    });


    $(".input-group input[name=passwordconfirm]").keyup(function () {

        var $form = $(this).closest('form'),
            $group = $(this).closest('.input-group'),
            $addon = $group.find('.input-group-addon'),
            $icon = $addon.find('span');

        if ($("#passwordone").val() != $("#passwordconfirm").val()) {
            $addon.removeClass('success');
            $addon.addClass('danger');
            $icon.attr('class', 'glyphicon glyphicon-remove');
            $('.input-group input[name=passwordconfirm]').removeClass('validated');

        } else {

            $addon.removeClass('danger');
            $addon.addClass('success');
            $icon.attr('class', 'glyphicon glyphicon-ok');
            $('.input-group input[name=passwordconfirm]').addClass('validated');
        }
    });



    $("#submit").on("click", function (e) {

        e.preventDefault();

        if ($('.input-group input[name=passwordconfirm]').hasClass('validated') && $('.input-group input[name=username]').hasClass('validated') && $('.input-group input[name=email]').hasClass('validated')) {


            var data = {
                email: $('#email').val(),
                password: $('#passwordone').val(),
                passwordconfirm: $('#passwordconfirm').val(),
                username: $('#usernameone').val()
            };

            $.ajax({
                type: "POST",
                url: "https://localhost:3000/user/register",
                data: data,
                success: function (response) {
                    window.location = 'https://localhost:3000/add';
                },
                error: function () {
                    alert('Es gab einen Fehler bei der Registrierungsanfrage.');
                }
            });

        } else {
            return false;
        }
    });


    $("#login-submit").on('click', function (e) {

        e.preventDefault();

        if ($("#logusername").val() == "" && $("#logpassword").val() == "") {
            $("#logusername").attr('style', "border-radius: 5px; border:#FF0000 1px solid;");
            $("#logpassword").attr('style', "border-radius: 5px; border:#FF0000 1px solid;");
            return false;
        } else if ($("#logusername").val() == "" && $("#logpassword").val() != "") {

            $("#logusername").attr('style', "border-radius: 5px; border:#FF0000 1px solid;");
            $("#logpassword").removeAttr('style');
            return false;

        } else if ($("#logpassword").val() == "" && $("#logusername").val() != "") {

            $("#logpassword").attr('style', "border-radius: 5px; border:#FF0000 1px solid;");
            $("#logusername").removeAttr('style');
            return false;

        } else {

            var data = {
                logusername: $('#logusername').val(),
                logpassword: $('#logpassword').val()
            };

            $.ajax({
                type: "POST",
                url: "https://localhost:3000/user/login",
                data: data,
                success: function (response) {
                    window.location = 'https://localhost:3000/add';
                },
                error: function () {
                    alert('Es gab einen Fehler beim Login.');
                }
            });
        };
    });
});