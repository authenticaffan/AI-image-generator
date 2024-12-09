document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loading").classList.add("hidden");
    document.getElementById("imageContainer").classList.add("hidden");
    document.getElementById("downloadBtn").classList.add("hidden");
  });
  
  document.getElementById("generateBtn").addEventListener("click", async () => {
    const prompt = document.getElementById("prompt").value.trim();
    const loadingDiv = document.getElementById("loading");
    const imageContainer = document.getElementById("imageContainer");
    const generatedImage = document.getElementById("generatedImage");
    const downloadBtn = document.getElementById("downloadBtn");
  
    if (!prompt) {
      alert("Please enter a prompt!");
      return;
    }
  
    // Reset states before showing the loading animation
    imageContainer.classList.add("hidden");
    downloadBtn.classList.add("hidden");
  
    // Show loading animation
    loadingDiv.classList.remove("hidden");
  
    try {
      const response = await fetch("/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to generate image");
      }
  
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
  
      // Update the UI with the generated image
      generatedImage.src = imageUrl;
      loadingDiv.classList.add("hidden"); // Hide loading animation
      imageContainer.classList.remove("hidden");
      downloadBtn.classList.remove("hidden");
  
      // Set download functionality
      downloadBtn.onclick = () => {
        const a = document.createElement("a");
        a.href = imageUrl;
        a.download = "generated-image.png";
        a.click();
      };
    } catch (error) {
      console.error(error);
      alert("An error occurred while generating the image.");
      loadingDiv.classList.add("hidden"); // Hide loading on error
    }
  });
  