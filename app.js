const form = document.getElementById('appForm');
const randomQuestionsDiv = document.getElementById('randomQuestions');
const statusBox = document.getElementById('statusBox');
const successBox = document.getElementById('successAnimation');
const goHomeBtn = document.getElementById('goHomeBtn');

// === Discord Webhook URL & Role IDs ===
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1435555147072929923/33W_0XfPY5i9dAodHn9jMdwdIpFW6YSH9cpDVP3YF_gbfNLQ-GrU_d7SpB_YssEEF55l";
// Replace with your actual role IDs
const ROLE_ID_1 = "1429439768940253287";
const ROLE_ID_2 = "1429439764163198998";

// =========================
// Random Questions Sets
// =========================
const questionsSet1 = [
  "What are the biggest (most common) reasons a new player gets banned?",
  "What are the rules regarding 'Fear RP'?",
  "How much money do I need to start buying essential items?",
  "How do I get my first legitimate job?",
  "What happens when my character dies?",
  "Are we allowed to use voice chat? If so, is it IC or OOC?",
  "Is it against the rules to 'Drive-by' a player?",
  "What is the correct command for interacting with objects or people?",
  "What is the minimum punishment for serious rulebreaks?",
  "How do I report a player who is breaking the rules?"
];

const questionsSet2 = [
  "Where is a good IC spot for a new character to hang out?",
  "What are the basic etiquette rules for starting a conversation IC?",
  "What is the IC equivalent of the local police/emergency number?",
  "What are common IC jobs for a new player to earn money?",
  "Are there official/unofficial safe zones in the city?"
];

const questionsSet3 = [
  "What is the specific OOC chat command?",
  "How do I contact a player OOC during RP without breaking immersion?",
  "How do I tell if a player is Admin/Moderator and how to address them?",
  "Is the official server Discord used for IC or OOC discussion?",
  "If I encounter a bug or glitch, what is the proper way to report it?"
];

// Utility: pick random items
function pickRandom(arr, count) {
  const copy = [...arr];
  const result = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
}

// Generate random questions
function generateRandomQuestions() {
  randomQuestionsDiv.innerHTML = "";

  const selectedSet1 = pickRandom(questionsSet1, 3);
  const selectedSet2 = pickRandom(questionsSet2, 2);
  const selectedSet3 = pickRandom(questionsSet3, 2);

  const allQuestions = [...selectedSet1, ...selectedSet2, ...selectedSet3];

  allQuestions.forEach((q, i) => {
    const div = document.createElement("div");
    div.classList.add("random-question");
    div.innerHTML = `
      <label>${q}</label>
      <input type="text" required placeholder="Your answer here">
    `;
    randomQuestionsDiv.appendChild(div);
  });
}

// Call on page load
generateRandomQuestions();

// Status helper
function showStatus(msg, type = "success") {
  statusBox.innerHTML = `<div class="${type === 'success' ? 'success-msg' : 'error-msg'}">${msg}</div>`;
}

// ✅ Check Discord login from backend session
async function loadDiscordUser() {
  try {
    // Use configuration from config.js or fallback to relative URL
    const userInfoUrl = window.APP_CONFIG?.USER_INFO_URL || "/user";
    const res = await fetch(userInfoUrl, { credentials: "include" });
    if (!res.ok) throw new Error("Not logged in");
    const user = await res.json();
    // Discord no longer uses discriminator, use username only
    document.getElementById("discord").value = user.username || '';
  } catch {
    alert("Login required. Redirecting to home.");
    window.location.href = "index.html";
  }
}

// Run login check
loadDiscordUser();

// Form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Validate IC Name (Firstname_Lastname)
  const charName = document.getElementById('charName').value.trim();
  if (!/^[A-Z][a-z]+_[A-Z][a-z]+$/.test(charName)) {
    showStatus("Character name must be in Firstname_Lastname format", "error");
    return;
  }

  // Collect form data
  const data = {
    realName: document.getElementById('realName').value.trim(),
    dob: document.getElementById('dob').value,
    charName: charName,
    storyline: document.getElementById('storyline').value.trim(),
    readRules: document.getElementById('readRules').value,
    charGender: document.getElementById('charGender').value,
    rpYears: document.getElementById('rpYears').value,
    discord: document.getElementById('discord').value.trim(),
  };

  // Collect random question answers
  const randomQ = document.querySelectorAll(".random-question");
  randomQ.forEach((el, index) => {
    const qText = el.querySelector("label").innerText;
    const answer = el.querySelector("input").value.trim();
    data[`Question ${index + 1}`] = `${qText} — ${answer}`;
  });

  try {
    // Send to Discord with role mentions
    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "GTA RP Applications",
        content: `<@&${ROLE_ID_1}> <@&${ROLE_ID_2}>`, // mention two roles
        embeds: [{
          title: `New Application — ${charName}`,
          color: 13690,
          fields: Object.keys(data).map(k => ({ name: k, value: data[k] || '—' })),
          timestamp: new Date().toISOString()
        }]
      })
    });

    // ✅ Hide form & show animation
    form.style.display = "none";
    successBox.classList.add("show");

  } catch (err) {
    console.error(err);
    showStatus("Error submitting application", "error");
  }
});

// ✅ Home button
goHomeBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});
