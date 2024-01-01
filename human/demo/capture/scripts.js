document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const capturedImage = document.getElementById('capturedImage');
    const captureBtn = document.getElementById('captureBtn');
  
    // Check for getUserMedia support
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
          // Set video source to the user's camera stream
          video.srcObject = stream;
        })
        .catch(function (error) {
          console.error('Error accessing camera:', error);
        });
    }
  
    captureBtn.addEventListener('click', function() {
      // Draw the current frame from the video onto the canvas
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
      // Convert the canvas content to a data URL representing a PNG image
      const imageDataURL = canvas.toDataURL('image/png');
  
      // Set the captured image source
      capturedImage.src = imageDataURL;
  
      // Save the image to a file
      saveImage(imageDataURL);
    });
  
    function saveImage(dataURL) {
      // Create a link element
      const link = document.createElement('a');
      
      // Set the href attribute with the data URL
      link.href = dataURL;
      
      // Set the download attribute with a desired filename
      link.download = 'captured_image.png';
      
      // Programmatically trigger a click event on the link to start the download
      link.click();
    }
  });
  