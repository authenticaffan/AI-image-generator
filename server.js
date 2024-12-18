const express = require("express");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    const hfResponse = await fetch("https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!hfResponse.ok) {
      return res.status(500).send("Error generating image");
    }

    const blob = await hfResponse.blob();
    blob.stream().pipe(res);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
