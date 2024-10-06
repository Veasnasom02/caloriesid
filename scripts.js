
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

// Gemini API setup
const API_KEY = 'AIzaSyD2Hos2ITv3F-J2yI2TIMxTxMdTaItB1Pk'; // Replace with your actual Gemini API key
const genAI = new window.GoogleGenerativeAI(API_KEY);

// Function to analyze image using Gemini
async function analyzeImage(file) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        
        const prompt = "Identify the food items in this image and estimate their calorie content.";
        
        const imageData = await file.arrayBuffer();
        const result = await model.generateContent([prompt, imageData]);
        const response = await result.response;
        const text = response.text();
        
        document.getElementById('analysisResult').textContent = text;
    } catch (error) {
        console.error('Error analyzing image:', error);
        document.getElementById('analysisResult').textContent = 'Error analyzing image. Please try again.';
    }
}

// Photo capture and analysis
document.getElementById('takePhotoBtn').addEventListener('click', function() {
    document.getElementById('imageInput').click();
});

document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('capturedImage');
            img.src = e.target.result;
            img.style.display = 'block';
            analyzeImage(file);
        }
        reader.readAsDataURL(file);
    }
});
