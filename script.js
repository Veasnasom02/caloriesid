// Chart setup
const ctx = document.getElementById('calorieChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Calories',
            data: [1800, 2200, 1950, 2100, 2300, 1700, 2000],
            borderColor: '#5c6bc0',
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Photo capture simulation
document.getElementById('takePhotoBtn').addEventListener('click', function() {
    console.log('Opening camera...');
    setTimeout(() => {
        document.getElementById('capturedImage').style.display = 'block';
        document.getElementById('capturedImage').src = '/api/placeholder/400/320';
        console.log('Image captured');
    }, 1000);
});
