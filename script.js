document.getElementById('submit-selection').addEventListener('click', () => {
    const theoryCheckboxes = document.querySelectorAll('#theory-form input[type="checkbox"]:checked');
    const labCheckboxes = document.querySelectorAll('#lab-form input[type="checkbox"]:checked');

    if (theoryCheckboxes.length !== 4) {
        alert('Please select exactly 4 theory courses.');
        return;
    }

    if (labCheckboxes.length !== 2) {
        alert('Please select exactly 2 lab courses.');
        return;
    }

    // Hide course selection and show teacher profiles
    document.getElementById('course-selection').classList.add('hidden');
    document.getElementById('teacher-profiles').classList.remove('hidden');
    console.log('Course selection submitted:', {
        theoryCourses: Array.from(theoryCheckboxes).map(cb => cb.value),
        labCourses: Array.from(labCheckboxes).map(cb => cb.value),
    });
});

// Handle feedback submission (simple demonstration)
// const feedbackButtons = document.querySelectorAll('.submit-feedback');
// feedbackButtons.forEach(button => {
//     button.addEventListener('click', (event) => {
//         const teacherDiv = event.target.closest('.teacher');
//         const feedback = teacherDiv.querySelector('textarea').value;
//         if (feedback) {
//             alert(`Feedback submitted for ${teacherDiv.querySelector('h3').innerText}: ${feedback}`);
//             teacherDiv.querySelector('textarea').value = ''; // Clear feedback textarea
//         } else {
//             alert('Please enter feedback before submitting.');
//         }
//     });
// });







document.getElementById('submit-selection').addEventListener('click', () => {
    const theoryCheckboxes = document.querySelectorAll('#theory-form input[type="checkbox"]:checked');
    const labCheckboxes = document.querySelectorAll('#lab-form input[type="checkbox"]:checked');

    if (theoryCheckboxes.length !== 4) {
        alert('Please select exactly 4 theory courses.');
        return;
    }

    if (labCheckboxes.length !== 2) {
        alert('Please select exactly 2 lab courses.');
        return;
    }

    const theoryCourses = Array.from(theoryCheckboxes).map(cb => cb.value);
    const labCourses = Array.from(labCheckboxes).map(cb => cb.value);

    // Send the data to the server
    fetch('http://localhost:5000/api/course-selection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theoryCourses, labCourses, studentName: 'John Doe' })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert('Course selection saved successfully');
        }
    })
});





const feedbackButtons = document.querySelectorAll('.submit-feedback');
feedbackButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const teacherDiv = event.target.closest('.teacher');
        const feedback = teacherDiv.querySelector('textarea').value;
        const teacherName = teacherDiv.querySelector('h3').innerText;
        
        if (feedback) {
            // Send feedback to the server
            fetch('http://localhost:5000/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ teacherName, feedback })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(`Feedback submitted for ${teacherName}: ${feedback}`);
                    teacherDiv.querySelector('textarea').value = ''; // Clear feedback textarea
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to submit feedback.');
            });
        } else {
            alert('Please enter feedback before submitting.');
        }
    });
});
