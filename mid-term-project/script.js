/* ===============================
 * Space Explorer: The Lost Colony
 * Siddhartha Talasila • ITC 505
 * Requirements met:
 * - DOM manipulation with event listeners
 * - Separate HTML, CSS, JS files
 * - At least 8 endings (we include 10)
 * - Image per stage/ending
 * =============================== */

const img = document.getElementById('storyImage');
const text = document.getElementById('storyText');
const choicesDiv = document.getElementById('choices');
const restartBtn = document.getElementById('restartBtn');

let currentKey = 'start';

/* Royalty-free Unsplash image URLs */
const IMGS = {
  orbit: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1480&auto=format&fit=crop",
  crater: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=1480&auto=format&fit=crop",
  ridge: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1480&auto=format&fit=crop",
  ruins: "https://images.unsplash.com/photo-1529926459132-0e3d4f40a849?q=80&w=1480&auto=format&fit=crop",
  forest: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1480&auto=format&fit=crop",
  cave: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?q=80&w=1480&auto=format&fit=crop",
  base: "https://images.unsplash.com/photo-1466354424719-343280fe118b?q=80&w=1480&auto=format&fit=crop",
  beacon: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1480&auto=format&fit=crop",
  storm: "https://images.unsplash.com/photo-1504280390368-3971e38c9505?q=80&w=1480&auto=format&fit=crop",
  ship: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1480&auto=format&fit=crop",
  sunrise: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1480&auto=format&fit=crop"
};

/* Story graph: nodes have text, image, and choices -> next keys.
 * Ending nodes include ending:true (no further choices).
 */
const STORY = {
  start: {
    text: "You orbit Kepler‑186f searching for the lost human colony. Sensors pick up two signals: one near a crater, another along a jagged ridge.",
    image: IMGS.orbit,
    choices: [
      { label: "Descend to the crater", next: "craterApproach" },
      { label: "Survey the ridge", next: "ridgeApproach" }
    ]
  },
  craterApproach: {
    text: "Red dust swirls as you touch down near a crater dotted with metallic shards. A faint beacon pulses below.",
    image: IMGS.crater,
    choices: [
      { label: "Climb down into the crater", next: "beaconCave" },
      { label: "Follow the metal trail", next: "oldBase" }
    ]
  },
  ridgeApproach: {
    text: "From the ridge you see ruins in the valley and a forest of crystalline trees to the east.",
    image: IMGS.ridge,
    choices: [
      { label: "Head to the ruins", next: "colonyRuins" },
      { label: "Explore the crystal forest", next: "crystalForest" }
    ]
  },
  beaconCave: {
    text: "The beacon echoes from a narrow cave. Inside, a collapsed tunnel blocks most paths; two crawlspaces remain.",
    image: IMGS.cave,
    choices: [
      { label: "Left crawlspace (glow)", next: "ending_rescue_ai" },
      { label: "Right crawlspace (silence)", next: "ending_trapped" }
    ]
  },
  oldBase: {
    text: "You discover an abandoned surface base. Power is dead, but a manual antenna can rotate.",
    image: IMGS.base,
    choices: [
      { label: "Aim antenna at orbit", next: "ending_distress_signal" },
      { label: "Scavenge deeper inside", next: "ending_contamination" }
    ]
  },
  colonyRuins: {
    text: "The ruins hum with dormant energy. A console asks: 'REACTIVATE GRID?'.",
    image: IMGS.ruins,
    choices: [
      { label: "Yes — restore power", next: "ending_awaken_guardian" },
      { label: "No — search archives", next: "ending_find_manifest" }
    ]
  },
  crystalForest: {
    text: "Wind sings through crystalline branches. A faint path splits toward a luminous clearing and a storm wall.",
    image: IMGS.forest,
    choices: [
      { label: "Luminous clearing", next: "ending_portal_home" },
      { label: "Through the storm", next: "stormFront" }
    ]
  },
  stormFront: {
    text: "A magnetic storm tears at your suit. You spot a cave shelter and, farther on, the dark outline of a starship.",
    image: IMGS.storm,
    choices: [
      { label: "Shelter in cave", next: "ending_hibernate_centuries" },
      { label: "Run to starship", next: "derelictShip" }
    ]
  },
  derelictShip: {
    text: "The derelict's bay doors groan open. Inside: a jump‑drive with one last burst of charge.",
    image: IMGS.ship,
    choices: [
      { label: "Jump to colony coordinates", next: "ending_find_survivors" },
      { label: "Jump blindly into deep space", next: "ending_lost_in_void" }
    ]
  },

  /* === Endings (10 total) === */
  ending_rescue_ai: {
    ending: true,
    image: IMGS.beacon,
    text: "You find a caretaker AI shielding cryopods. It recognizes your insignia and transfers command. The lost colonists stir — you led their rescue."
  },
  ending_trapped: {
    ending: true,
    image: IMGS.cave,
    text: "The crawlspace collapses behind you. Your suit beacon blinks as you wait in the dark. Centuries later, explorers will find your log."
  },
  ending_distress_signal: {
    ending: true,
    image: IMGS.beacon,
    text: "You hand‑crank the antenna and transmit coordinates. Hours later, fleet relays confirm: signal received. You saved the mission."
  },
  ending_contamination: {
    ending: true,
    image: IMGS.base,
    text: "A spore cloud erupts from a cracked lab vial. Quarantine protocols lock you inside. Your notes become the colony’s last warning."
  },
  ending_awaken_guardian: {
    ending: true,
    image: IMGS.ruins,
    text: "Power returns — and so does the colony’s guardian drone. It deems you a threat, then pauses... and grants you stewardship. Peace through wisdom."
  },
  ending_find_manifest: {
    ending: true,
    image: IMGS.ruins,
    text: "You recover the colonists’ manifest and a map to subterranean farms. A new settlement rises, guided by the past."
  },
  ending_portal_home: {
    ending: true,
    image: IMGS.sunrise,
    text: "The clearing unfolds into a shimmering portal keyed to human DNA. Step through — and you’re back in orbit, knowledge intact."
  },
  ending_hibernate_centuries: {
    ending: true,
    image: IMGS.cave,
    text: "You seal yourself in a thermal alcove as the storm rages for decades. When it calms, life returns — and you with it, a patient pioneer."
  },
  ending_find_survivors: {
    ending: true,
    image: IMGS.sunrise,
    text: "The jump lands at a geothermal cavern where survivors sing you home. The colony lives — and now, so will its stories."
  },
  ending_lost_in_void: {
    ending: true,
    image: IMGS.orbit,
    text: "Stars smear into lines. The jump miscalculates. You drift between constellations, a legend on future star charts."
  }
};

function render(key){
  currentKey = key;
  const node = STORY[key];
  if(!node){ return; }

  // Update DOM
  img.src = node.image || IMGS.orbit;
  text.textContent = node.text || '';

  // Clear choices
  choicesDiv.innerHTML = '';

  if(node.ending){
    // Show Play Again
    const again = document.createElement('button');
    again.textContent = "Play Again";
    again.addEventListener('click', startGame);
    choicesDiv.appendChild(again);
    return;
  }

  // Create choice buttons
  (node.choices || []).forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice.label;
    btn.addEventListener('click', () => render(choice.next));
    choicesDiv.appendChild(btn);
  });
}

function startGame(){
  render('start');
}

restartBtn.addEventListener('click', startGame);

// Initialize
startGame();