//Link Generator Function
const form = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const statusText = document.getElementById('status');
const downloadLink = document.getElementById('download-link');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    if (!fileInput.files[0]) {
        statusText.textContent = "Please select a file to upload.";
        return;
    }

    statusText.textContent = "Uploading...";
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
        // Send the file to file.io API
        const response = await fetch('https://file.io', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();

        if (data.success) {
            statusText.textContent = "Upload successful!";
            downloadLink.textContent = data.link;
            downloadLink.style.display = "block";
            document.getElementById("iFrame").style.display="block"; // Show the link
        } else {
            statusText.textContent = "Upload failed. Please try again.";
        }
    } catch (error) {
        statusText.textContent = "An error occurred while uploading.";
        console.error(error);
    }
});

/* Showing file name */
const fileNameDisplay = document.getElementById("fileName");

fileInput.addEventListener("change", () => {
    fileNameDisplay.textContent = fileInput.files[0] ? fileInput.files[0].name : "No file chosen";
    if(fileNameDisplay.textContent = fileInput.files[0].name){
        document.getElementById("choose-a-file").textContent = "File Choosen";
    }
    else{
        document.getElementById("choose-a-file").textContent = "Choose a file";
    }
});

const copyDiv = document.getElementById("copyDiv");

copyDiv.addEventListener("click", () => {
  // Copy text from status element to clipboard
  navigator.clipboard.writeText(downloadLink.textContent)
    .then(() => {
      // Change the text of the copyDiv to 'Copied'
      copyDiv.textContent = "Copied";
      
      // Revert to "Copy" after 2 seconds
      setTimeout(() => {
        copyDiv.textContent = "Copy";
      }, 2000);
    })
    .catch(() => {
      alert("Failed to copy text.");
    });
});