/**
 * VibeCheck API (CPE 411L)
 *
 * This server:
 * - runs on your computer (localhost)
 * - listens on a port (default: 3000)
 * - responds to browser requests (endpoints) using JSON
 */

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// CORS lets your frontend page call your backend API.
app.use(cors());

// This allows Express to read JSON bodies (used for POST requests).
app.use(express.json());

// Data pools (random picks). You can customize these.
const fortunes = [
  "Red is your lucky color of the day, VsCode will be willing to cooperate",
  "Year of the horse: Try a horse-themed design for your code today.",
  "Ang 5k mo gawin nating 5k ko !! Contact 09XX-XXXX-XXX now",
  "Believe not in the Ai that helps you, but in the Mobile Data connection that doesn't disconnect",
];

const jokes = [
  "Anong tawag sa asong nakasuot ng salamin? Edi... 'Pug'-ita!",
  "Bakit hindi nakalipad ang manok? Kasi may 'chicken' pox siya.",
  "Anong paboritong kanta ng mga isda? 'Always' (I'll be there)... kasi 'I'm always chasing rainbows'?",
  "Teacher: Juan, anong height mo? Juan: 5'4” po. Teacher: Bakit sa record 5'10”? Juan: Ay ma'am, yung 6 inches po ay 'pride'!"
]; 
/* Sir hindi po samin galing yung joke pramis */

const vibeMap = {
  happy: { emoji: "😄", message: "Keep going - you're shipping greatness!" },
  tired: { emoji: "🥱", message: "Hydrate. Stretch. Then commit." },
  stressed: { emoji: "😵‍💫", message: "Breathe. One bug at a time." },
};

// Smash counter (stored in memory for now)
let smashes = 0;

// GET /api/fortune -> returns one random fortune
app.get("/api/fortune", (req, res) => {
  const pick = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.json({ fortune: pick });
});

// GET /api/joke -> returns one random joke
app.get("/api/joke", (req, res) => {
  const pick = jokes[Math.floor(Math.random() * jokes.length)];
  res.json({ joke: pick });
});

// GET /api/vibe?mood=happy|tired|stressed
app.get("/api/vibe", (req, res) => {
  const mood = (req.query.mood || "").toLowerCase();
  const vibe = vibeMap[mood];

  if (!vibe) {
    return res.json({
      mood: mood || "unknown",
      emoji: "🤔",
      message: "Try mood=happy, tired, or stressed.",
    });
  }

  res.json({ mood, ...vibe });
});

// POST /api/smash -> aye nagcricrit na
app.post("/api/smash", (req, res) => {
  const isCrit = Math.random() < 0.25; // 0.25 = 25% chance
  const increment = isCrit ? 5 : 1;
  
  smashes += increment;
  
  res.json({ 
    smashes, 
    isCrit, 
    added: increment 
  });
});

// GET /api/smashes -> returns current total
app.get("/api/smashes", (req, res) => {
  res.json({ smashes });
});

// GET /api/secret?code=411L -> hidden message if code is correct
app.get("/api/secret", (req, res) => {
  const code = req.query.code;

  if (code === "411L") {
    return res.json({ message: "🎉 Secret unlocked: +10 luck on your next merge!" });
  }

  res.status(403).json({ message: "Nope 😄 Try code=411L" });
});

// Start server
app.listen(PORT, () => {
  console.log(`VibeCheck API running at http://localhost:${PORT}`);
});