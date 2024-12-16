$(document).ready(function () {

    // Smooth scroll for navigation
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });

    // Show/Hide courses and experience details on button click
    $(".toggle-details").click(function() {
        $(this).next().slideToggle();
    });

    // Animate progress bars on page load
    $(window).on('load', function() {
        $(".progress").each(function() {
            var width = $(this).parent().data('width');
            $(this).animate({
                width: width
            }, 2000);
        });
    });

    // Scroll animations for skills and projects
    $(window).on('scroll', function() {
        $(".skills .progress-bar, .projects .project-item").each(function() {
            if ($(this).visible(true)) {
                $(this).addClass('visible');
            }
        });
    });

    // Add fade-in effect to sections as they come into view
    $('section').each(function() {
        $(this).addClass('fade-in');
    });
});

// jQuery plugin to check if an element is visible in the viewport
$.fn.visible = function(partial) {
    var $t = $(this),
        $w = $(window),
        viewTop = $w.scrollTop(),
        viewBottom = viewTop + $w.height(),
        _top = $t.offset().top,
        _bottom = _top + $t.height(),
        compareTop = partial === true ? _bottom : _top,
        compareBottom = partial === true ? _top : _bottom;
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
};
$(document).ready(function() {
    // Form submission event
    $("#contact-form").on("submit", function(event) {
        event.preventDefault(); // Prevent actual form submission to handle via JS

        // Get form values
        var name = $("#name").val().trim();
        var email = $("#email").val().trim();
        var message = $("#message").val().trim();

        // Basic validation (all fields must be filled)
        if (name === "" || email === "" || message === "") {
            alert("Please fill in all fields.");
            return;
        }

        // Check for valid email format
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // If validation is successful, show success message and reset the form
        $("#form-message").fadeIn(); // Show the success message
        $("#contact-form")[0].reset(); // Reset form fields

        // Optionally, you can submit the form data via AJAX to a backend (e.g., using a PHP script) here:
        // $.ajax({
        //     url: 'your-backend-script.php',
        //     method: 'POST',
        //     data: { name: name, email: email, message: message },
        //     success: function(response) {
        //         $("#form-message").fadeIn();
        //         $("#contact-form")[0].reset();
        //     }
        // });
    });
});
$(document).ready(function () {
    // Toggle between light and dark mode
    $("#toggle-dark").click(function () {
        $("body").addClass("dark-mode");  // Enable dark mode
        $("#toggle-dark").hide();         // Hide dark mode button
        $("#toggle-light").show();        // Show light mode button
    });

    $("#toggle-light").click(function () {
        $("body").removeClass("dark-mode");  // Disable dark mode
        $("#toggle-dark").show();            // Show dark mode button
        $("#toggle-light").hide();           // Hide light mode button
    });

    // Optional: Automatically load user's theme preference from localStorage
    if (localStorage.getItem("theme") === "dark") {
        $("body").addClass("dark-mode");
        $("#toggle-dark").hide();
        $("#toggle-light").show();
    }

    // Save theme preference to localStorage
    $("#toggle-dark, #toggle-light").click(function () {
        if ($("body").hasClass("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
});
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target;
    const formData = new FormData(form);

    // Send the form data via AJAX (using fetch)
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Show success message
        document.getElementById("form-message").style.display = "block";
        form.reset(); // Optionally reset the form
    })
    .catch(error => {
        console.error("Error:", error);
        alert("There was an error sending your message.");
    });
});