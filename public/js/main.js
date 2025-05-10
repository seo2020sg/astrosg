document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date for appointment booking (today)
    const appointmentDateInput = document.getElementById('appointmentDate');
    if (appointmentDateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        appointmentDateInput.min = tomorrow.toISOString().slice(0, 16);
    }

    // Form validation
    const bookingForm = document.querySelector('form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const place = document.getElementById('place').value;
            const dob = document.getElementById('dob').value;
            const time = document.getElementById('time').value;
            const appointmentDate = document.getElementById('appointmentDate').value;

            if (!name || !place || !dob || !time || !appointmentDate) {
                alert('Please fill in all required fields');
                return;
            }

            // Add loading state
            const submitButton = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;

            // Submit the form
            fetch('/submit-booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(new FormData(bookingForm))
            })
            .then(response => response.text())
            .then(message => {
                alert(message);
                bookingForm.reset();
            })
            .catch(error => {
                alert('An error occurred. Please try again.');
                console.error('Error:', error);
            })
            .finally(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });
    }

    // Add smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});