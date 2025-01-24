const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
  keyFilename: './service-account-key.json',
});

async function extractTextFromImage(imagePath) {
  try {
    const [result] = await client.textDetection(imagePath);
    const detections = result.textAnnotations;

    if (detections.length === 0) {
      console.log('No text detected in the image.');
      return;
    }

    // The first annotation is the entire detected text, subsequent annotations are individual words/blocks
    const fullText = detections[0].description;

    console.log('Text Detected (Structured):');
    console.log('---------------------------');
    console.log(fullText.trim()); // Clean up and display the detected text
    console.log('---------------------------');

    console.log('\nDetected Words and Positions:');
    detections.slice(1).forEach((text, index) => {
      console.log(`Word ${index + 1}: ${text.description}`);
      console.log(`Position: ${JSON.stringify(text.boundingPoly.vertices)}`);
    });
  } catch (error) {
    console.error('Error during text detection:', error);
  }
}

extractTextFromImage('https://i.pinimg.com/736x/f2/bc/6e/f2bc6e2ee3f2409a7387cce71e597a40.jpg');
