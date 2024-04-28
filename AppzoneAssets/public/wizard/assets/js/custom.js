// next prev
var divs = $('.show-section section');
var now = 0; // currently shown div
divs.hide().first().show(); // hide all divs except first

function next()
{
    divs.eq(now).hide();
    now = (now + 1 < divs.length) ? now + 1 : 0;
    divs.eq(now).show(); // show next
}

$(".prev").click(function() {
    divs.eq(now).hide();
    now = (now > 0) ? now - 1 : divs.length - 1;
    divs.eq(now).show(); // show previous
});



$(document).ready(function () {
    $(window).scroll(function () {
        $('.form_tabs').toggleClass("form_tabs_fixed", ($(window).scrollTop() > 100));
     });
});





// disable on enter
$('form').on('keyup keypress', function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) { 
      e.preventDefault();
      return false;
    }
  });
  
  
  
  
   // form validiation
var inputschecked = false;


function formvalidate(stepnumber)
{
  // check if the required fields are empty
  inputvalue = $("#step"+stepnumber+" :input").not("button").map(function()
  {
    if(this.value.length > 0)
    {
      $(this).removeClass('invalid');
      return true;

    }
    else
    {
      
      if($(this).prop('required'))
      {
        $(this).addClass('invalid');
        return false
      }
      else
      {
        return true;
      }
      
    }
  }).get();
  

  // console.log(inputvalue);

  inputschecked = inputvalue.every(Boolean);

  // console.log(inputschecked);
}

  $(document).ready(function()
   {

        // check from1step1
        $("#from1step1").on('click', function()
        {
            formvalidate(1);

            var re = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            var email = $("#mail-email1").val();
            var emailFormat = re.test(email);
            
    
            if(inputschecked == false)
            {
                formvalidate(1);
            }
            else if(emailFormat == false)
            {
                (function (el) {
                setTimeout(function () {
                    el.children().remove('.reveal');
                }, 3000);
                }($('#error').append('<div class="reveal alert alert-danger">Email address is invalid!</div>')));
                if(emailFormat == true)
                {
                $("#mail-email1").removeClass('invalid');
                }
                else
                {
                $("#mail-email1").addClass('invalid');
                }
    
            }
            else
            {
                next();
            }
        })

        // check form2 step1
        $("#form2step1").on('click', function()
        {
            formvalidate(2);
            
            var re = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            var email = $("#mail-email2").val();
            var emailFormat = re.test(email);
    
            if(inputschecked == false)
            {
                formvalidate(2);
            }
            else if(emailFormat == false)
            {
                (function (el) {
                setTimeout(function () {
                    el.children().remove('.reveal');
                }, 3000);
                }($('#error').append('<div class="reveal alert alert-danger">Email address is invalid!</div>')));
                if(emailFormat == true)
                {
                $("#mail-email2").removeClass('invalid');
                }
                else
                {
                $("#mail-email2").addClass('invalid');
                }
    
            }
            else
            {
                next();
            }
        })

        // check last step
       $("#sub").on('click' , function()
       {
        
            formvalidate(4);
            if(inputschecked == false)
            {
                formvalidate(4);
            }
            
            else
            {
                $("#sub").html("<img src='assets/images/loading.gif'>");
  

                var dataString = $("#step1, #step2, #step3, #step4").serialize();
  
  
                console.log(dataString);
  
                
                // send form to send.php
                $.ajax({
                          type: "POST",
                          url: "form handling/send.php",
                          data: dataString,
                          processData: false,
                          contentType: false,
                          cache: false,
                         success: function(data,status)
                         {
  
                            $("#sub").html("Success!");
                            console.log(data);
                            
                            window.location = "thankyou.html";
                            
                         },
                         error: function(data, status)
                         {
                            $("#sub").html("failed!");
                            console.log(data);
                         }
                      });
            }
  
        });
   }
   );