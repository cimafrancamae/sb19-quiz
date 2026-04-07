import { useState, useRef, useEffect } from "react";

const NEON = {
  pink:"#FF2D78", cyan:"#00F5FF", purple:"#BF00FF",
  gold:"#FFD700", white:"#FFFFFF", darker:"#060009",
  glass:"rgba(255,255,255,0.05)",
};

// ── SONG POOL — more songs than needed so each play feels fresh ───────────────
// Level 1: 14 songs, picks 10 randomly each game
// Level 2: 13 songs, picks 10 randomly each game
// Level 3: 12 songs, picks 10 randomly each game
// Solo pools: all songs always shown (small sets)

const SONG_POOL = {
  1: [
    { title:"MAPA", emojis:"🗺️👩‍👦👨‍👦💛", hint:"Pagsibol EP (2021) · Title is a portmanteau of two Filipino words for the people who raised you · Pablo wrote it while homesick on tour", meaning:"MAPA blends 'mama' and 'papa' — a two-part love letter divided into sections for each parent. Pablo wrote it during their 2020 tour when he was unable to contact his family.", yt:"DDyr3DbTPtk", stream:"https://lnk.to/SB19-MAPA" },
    { title:"GENTO", emojis:"👑🔥💃🏽", hint:"Pagtatag! EP (2023) · Pre-release lead single · First Filipino act to top Billboard World Digital Song Sales · Title is street slang from Pablo's home province", meaning:"A swagger anthem celebrating Filipino identity and self-worth. 'Gento' is Cavite street slang for someone royally boss — a direct nod to Pablo's hometown of Imus, Cavite.", yt:"VZZA_38RUBI", stream:"https://lnk.to/SB19-Gento" },
    { title:"Go Up", emojis:"🚀⬆️🌟🇵🇭", hint:"Single (2019) · A fan's Twitter post of their dance practice video went viral and saved the group from near-disbandment", meaning:"SB19's breakthrough hit about rising above doubt. The group had nearly given up when a viral Twitter dance-practice clip turned everything around — Pablo calls it their 'redemption song.'", yt:"x1a1In98Big", stream:"https://lnk.to/SB19-GoUp" },
    { title:"What?", emojis:"🇵🇭🚩✊🗺️", hint:"Single (2021) · Title is a wordplay on the Filipino word for 'flag' · MV references Heneral Luna and ends on a historic Philippine sea map", meaning:"A patriotic battlecry. 'What?' is a wordplay on 'Watawat' (flag). Pablo describes it as a song about individuality and Filipino pride — the MV references Katipunan, Heneral Luna, and ends on the Murillo-Velarde map.", yt:"oAww-QrSNPS", stream:"https://lnk.to/SB19-What" },
    { title:"Hanggang Sa Huli", emojis:"💞🕰️🔚", hint:"Get In The Zone album (2020) · Title track · Animated MV written and directed by Justin", meaning:"A deeply romantic ballad pledging love and loyalty until the final moment. The animated MV was conceived and directed by Justin.", yt:"S82NKEOVj50", stream:"https://lnk.to/SB19-HangangSaHuli" },
    { title:"Alab", emojis:"🔥❤️‍🔥✨", hint:"Single (2019) · First release after signing with Sony Music PH · Won MV of the Year at Myx Music Awards 2021 · Title means 'blaze'", meaning:"Their first Sony Music single — a fiery dance-pop love song about burning desire. The MV won Music Video of the Year at the 2021 Myx Music Awards.", yt:"JrPmDxJs5VY", stream:"https://lnk.to/SB19-Alab" },
    { title:"SLMT", emojis:"🙏🫶🎤💙", hint:"Pagsibol EP (2021) · MV filmed in Palawan · Title abbreviates a Tagalog word — the missing letter 'A' is intentionally left for fans to fill in", meaning:"A heartfelt thank-you to A'TIN. SLMT abbreviates 'Salamat' — the 'A' is missing because A'TIN completes it. MV filmed on Palawan's white-sand beaches.", yt:"_SLMTlHr-b8", stream:"https://lnk.to/SB19-SLMT" },
    { title:"Ikako", emojis:"🏥🤝💙😔", hint:"Pagsibol EP (2021) · A reworked earlier ballad · Dedicated to a specific group of heroes during the COVID-19 pandemic", meaning:"A pandemic-era ballad dedicated to healthcare frontliners. 'Ikako' blends 'ikaw' (you) and 'ako' (me) — reworked as a tribute to those who kept going during the global health crisis.", yt:"KAeQbPzIVzg", stream:"https://lnk.to/SB19-Ikako" },
    { title:"Tilaluha", emojis:"😢💧🎵", hint:"Debut single (2018) · Title is a portmanteau of two Filipino words — one meaning 'stop,' one meaning 'tears' · Received little attention on release but holds historic significance", meaning:"SB19's very first song — a sentimental OPM ballad about unrequited love. The title fuses 'tila' (stop) and 'luha' (tears). Everything that followed traces back to this single.", yt:"S4NKJ7rJOqM", stream:"https://lnk.to/SB19-Tilaluha" },
    { title:"Ligaya", emojis:"🎄✨😊", hint:"Christmas single (2021) · Released December 18 · Title is a common Filipino name that also means a feeling", meaning:"A feel-good Christmas single spreading joy. The title 'Ligaya' means 'happiness' in Filipino — the song lives up to it with warm, celebratory energy.", yt:"ffh0ojPU27k", stream:"https://lnk.to/SB19-Ligaya" },
    { title:"Mana", emojis:"🦇🧿✈️👣", hint:"Pagsibol EP (2021) · Title is short for a Filipino mythical creature that detaches its upper body to fly · About soaring high while keeping your feet on the ground · Interconnected with Bazinga", meaning:"Title is shortened from 'Manananggal' — a Filipino creature that severs its upper torso to fly while its legs remain on the ground. SB19 uses this as a metaphor: no matter how high they soar, their feet stay grounded.", yt:"", stream:"https://lnk.to/SB19-Pagsibol" },
    { title:"Bazinga", emojis:"🎯😤🃏🏅", hint:"Pagsibol EP (2021) · Spent 7 weeks at #1 on Billboard Hot Trending Songs, beating a BTS record · Only fully English track on Pagsibol · A direct response to online bashers", meaning:"A trap-pop/reggaeton clap-back at the haters who tried to dismiss SB19. It topped Billboard Hot Trending Songs for 7 weeks — beating BTS's record — making SB19 the first Filipino act to do so.", yt:"A6nBLIJqK-E", stream:"https://lnk.to/SB19-Pagsibol" },
    { title:"Nyebe", emojis:"❄️💔🌨️", hint:"Standalone single (2022) · Title is a Filipino word for frozen precipitation · A relationship that's gone emotionally cold", meaning:"Nyebe means 'snow' — a cold, emotionally numb breakup song about going through the motions of a relationship already frozen over.", yt:"ulCVb13Z6yk", stream:"https://lnk.to/SB19-Nyebe" },
    { title:"WYAT (Where You At)", emojis:"📍❓🫠", hint:"Standalone single (2022) · Released post-COVID · MV has a retro Grease-inspired look · Kickstarted their first world tour of the same name", meaning:"A longing search for reconnection — with a missing person or a lost version of yourself. The 'WYAT' tour that followed became their first world tour.", yt:"aIT2X9HWJLE", stream:"https://lnk.to/SB19-WYAT" },
  ],
  2: [
    { title:"CRIMZONE", emojis:"🩸💥🔥🏆", hint:"Pagtatag! EP (2023) · Co-written by Ken and Josh · Features Bisaya rap verses · Title is a zone where excellence demands everything from you", meaning:"A hard-hitting anthem about the blood, sweat, and tears required to reach the top. 'Crimzone' is SB19's homage to their struggles — co-written by Ken (in Bisaya) and Josh.", yt:"e-nh623g0-Y", stream:"https://lnk.to/SB19-Crimzone" },
    { title:"ILAW", emojis:"💡😵‍💫🌑", hint:"Pagtatag! EP (2023) · Acoustic guitar ballad · Justin says this captures exactly how he felt when overwhelmed by fame · Too much of something can blind you", meaning:"Not about being someone's light — it's about the dark side of fame. Too much spotlight can blind and overwhelm. Justin said it captured exactly how he felt during a phase when he wanted to step away.", yt:"9nS8DZtSFwO", stream:"https://lnk.to/SB19-Pagtatag" },
    { title:"LIHAM", emojis:"💌🎻📖💍", hint:"Pagtatag! EP (2023) · Over 6 minutes long — their longest track · SB19 compared it to wedding vows · Also interpreted as a letter to A'TIN", meaning:"A 6-minute power ballad led by strings and piano, described by SB19 as a 'wedding vow' — an honest expression of love and gratitude. Often interpreted as a deeply emotional letter to A'TIN.", yt:"orU-h3eX-GC", stream:"https://lnk.to/SB19-Pagtatag" },
    { title:"FREEDOM", emojis:"🦅🎊🔓🏳️", hint:"Pagtatag! EP (2023) · Closing track · Celebrates SB19 breaking away from their former agency and becoming self-managed under 1Z Entertainment", meaning:"A funky celebration of SB19's hard-won independence. After 7 years under ShowBT, FREEDOM marks their transition to self-management — a jubilant thank-you to A'TIN who made it possible.", yt:"W_OGQoRDpE4", stream:"https://lnk.to/SB19-Pagtatag" },
    { title:"I Want You", emojis:"😍🎷🌹🖤", hint:"Pagtatag! EP (2023) · Their first-ever slow soul R&B track · Production inspired by 1990s R&B — a genre entirely new for SB19", meaning:"SB19's foray into slow 1990s-inspired soul R&B — a genre entirely new for them. A sensual, stripped-back declaration of desire praised for how naturally their vocals suit the style.", yt:"s25Yi6pZnMs", stream:"https://lnk.to/SB19-Pagtatag" },
    { title:"Time", emojis:"⏳⌛💫", hint:"Simula at Wakas EP (2025) · Reflects on mortality and the courage to keep going · Justin opens the track with a verse about emotional numbness", meaning:"A poetic reflection on impermanence and persistence. 'Scattering stars' symbolizes leaving behind meaning even when the end is near — both existential and empowering.", yt:"NMq0dvETwKY", stream:"https://lnk.to/SB19-Time" },
    { title:"DAM", emojis:"🌊🔒🍎💣", hint:"Simula at Wakas EP (2025) · Title sounds like a biblical first man's name when followed by 'Anong pakiramdam' · Medieval folk instrumentation meets EDM", meaning:"A philosophical track using Adam & Eve as a metaphor for growth. 'DAM? Anong pakiramdam' phonetically becomes 'ADAM, how does it feel?' — about the painful awakening of stepping outside your comfort zone.", yt:"de6CnBa-qj0", stream:"https://SB19.tunelink.to/DAM" },
    { title:"Love Goes", emojis:"💘🛤️🌅", hint:"Get In The Zone album (2020) · Also released as an EDM remix on the same album · About where a love eventually leads", meaning:"A bittersweet track about a love slowly fading and where it ultimately leads. Released in both original and EDM versions on their debut album.", yt:"", stream:"https://lnk.to/SB19-GetInTheZone" },
    { title:"Wag Mong Ikunot Ang Iyong Noo", emojis:"😠🤚😮‍💨💆", hint:"Get In The Zone album (2020) · Longest song title in their discography · The title is a literal physical instruction about a facial expression", meaning:"A lighthearted feel-good track. The title literally means 'Don't furrow your brow' — a playful Filipino reminder to stop worrying and enjoy the moment.", yt:"", stream:"https://lnk.to/SB19-GetInTheZone" },
    { title:"Hanggang Sa Huli", emojis:"💞🕰️🔚", hint:"Get In The Zone album (2020) · Title track · Animated MV written and directed by Justin", meaning:"A deeply romantic ballad pledging love and loyalty until the final moment. The animated MV was conceived and directed by Justin.", yt:"S82NKEOVj50", stream:"https://lnk.to/SB19-HangangSaHuli" },
    { title:"Alab", emojis:"🔥❤️‍🔥✨", hint:"Single (2019) · First release after signing with Sony Music PH · Won MV of the Year at Myx Music Awards 2021", meaning:"Their first Sony Music single — a fiery dance-pop love song about burning desire. The MV won Music Video of the Year at the 2021 Myx Music Awards.", yt:"JrPmDxJs5VY", stream:"https://lnk.to/SB19-Alab" },
    { title:"No Stopping You", emojis:"🏃‍♂️💨🎬🔥", hint:"OST (2021) · Written for a Filipino streaming film · Remixed with a female OPM artist named after a day of the week", meaning:"Written for the Filipino film Love at First Stream — a high-octane anthem about unstoppable momentum. The remix with Jayda Avanzado extended its reach significantly.", yt:"Lo9ANiFeeyk", stream:"https://lnk.to/SB19-NoStoppingYou" },
  ],
  3: [
    { title:"Emoji", emojis:"📱😶‍🌫️🎭🌐", hint:"Wakas at Simula album (2026) · Collab with Taiwan's Queen of C-pop · Brazilian phonk beat produced by Ken · About the performance we put on for social media vs. who we really are", meaning:"A collab with Jolin Tsai about hiding true emotions behind digital emojis. Ken produced the Brazilian phonk beat. The MV contrasts a glamorous set with a chaotic one — online identity vs. reality.", yt:"EmojiMV2026", stream:"https://lnk.to/SB19-Emoji" },
    { title:"VISA", emojis:"✈️🌍💼🏆", hint:"Single (2026) · Debuted #6 on Billboard World Digital Song Sales · Released weeks before their Lollapalooza and Summer Sonic announcements", meaning:"An ambitious anthem about SB19's hunger for global conquest — their declaration of international arrival at the highest stages.", yt:"VISAmv2026", stream:"https://lnk.to/SB19-VISA" },
    { title:"Nyebe", emojis:"❄️💔🌨️", hint:"Standalone single (2022) · Title is a Filipino word for frozen precipitation · A relationship that's gone emotionally cold", meaning:"Nyebe means 'snow' — a cold, emotionally numb breakup song about going through the motions of a relationship already frozen over.", yt:"ulCVb13Z6yk", stream:"https://lnk.to/SB19-Nyebe" },
    { title:"Umaaligid", emojis:"👻🌀😰", hint:"Collab with an OPM icon (2025) · Title means something that keeps hovering or circling around you · Can't escape a past love", meaning:"A haunting collab with OPM legend Sarah Geronimo. Umaaligid means 'hovering' — the unsettling feeling of being unable to escape a past love that keeps circling back.", yt:"UmaaligidMV", stream:"https://lnk.to/SB19-Umaaligid" },
    { title:"No Stopping You", emojis:"🏃‍♂️💨🎬🔥", hint:"OST (2021) · Written for a Filipino streaming film · Remixed with a female OPM artist named after a day of the week", meaning:"Written for the Filipino film Love at First Stream — a high-octane anthem about unstoppable momentum. The remix with Jayda Avanzado extended its reach.", yt:"Lo9ANiFeeyk", stream:"https://lnk.to/SB19-NoStoppingYou" },
    { title:"Win Your Heart", emojis:"🏆💐❤️", hint:"Special single (2022) · Official theme of a national beauty pageant · Written as a competitive courtship song", meaning:"A charming, competitive love song written as the official theme of Binibining Pilipinas 2022.", yt:"ofeFrctMJeM", stream:"https://lnk.to/SB19-WinYourHeart" },
    { title:"Love Goes", emojis:"💘🛤️🌅", hint:"Get In The Zone album (2020) · Also released as an EDM remix on the same album · About where a love eventually leads", meaning:"A bittersweet track about a love slowly fading. Released in both original and EDM versions on their debut album.", yt:"", stream:"https://lnk.to/SB19-GetInTheZone" },
    { title:"KALAKAL", emojis:"🤝💸🎤😤", hint:"Collab (2024) · Features OPM rap royalty alongside Ken's Bisaya verses · Title is a Filipino market term for the exchange of goods", meaning:"A gritty collab with Gloc-9 about trade and worth. Ken flexes Bisaya pride through his verses. Kalakal means 'trade' or 'barter.'", yt:"6d7mTSB5ASc", stream:"https://lnk.to/SB19-Kalakal" },
    { title:"Moonlight", emojis:"🌕✨🌏🎶", hint:"International collab (2024) · Three artists from three different countries · Bridges P-pop, Western pop, and Mandopop in one track", meaning:"A dreamy collab with Ian Asher and Terry Zhong. A moonlit romantic crossover bridging three music scenes — P-pop, Western pop, and Mandopop.", yt:"_WIGlfguVTs", stream:"https://lnk.to/SB19-Moonlight" },
    { title:"Wag Mong Ikunot Ang Iyong Noo", emojis:"😠🤚😮‍💨💆", hint:"Get In The Zone album (2020) · Longest song title in their discography · The title is a literal physical instruction about a facial expression", meaning:"A lighthearted feel-good track. The title literally means 'Don't furrow your brow' — a playful Filipino reminder to stop worrying.", yt:"", stream:"https://lnk.to/SB19-GetInTheZone" },
    { title:"Mana", emojis:"🦇🧿✈️👣", hint:"Pagsibol EP (2021) · Title is short for a Filipino mythical creature that detaches its upper body to fly · About soaring high while keeping feet on the ground", meaning:"Title shortened from 'Manananggal' — a Filipino creature that severs its upper torso to fly while legs stay on the ground. SB19's metaphor: no matter how high they soar, their feet stay grounded.", yt:"", stream:"https://lnk.to/SB19-Pagsibol" },
    { title:"Bazinga", emojis:"🎯😤🃏🏅", hint:"Pagsibol EP (2021) · Spent 7 weeks at #1 on Billboard Hot Trending Songs beating a BTS record · MV depicts SB19 defeating enemies in an arcade game", meaning:"A trap-pop/reggaeton clap-back at bashers. Topped Billboard Hot Trending Songs for 7 weeks — beating BTS's record — making SB19 the first Filipino act to do so.", yt:"A6nBLIJqK-E", stream:"https://lnk.to/SB19-Pagsibol" },
  ],
};

const MEMBERS = [
  { name:"PABLO", color:"#9B59B6", emoji:"🎤", role:"Leader · Rapper · Producer",
    songs:[
      { title:"La Luna", emojis:"🌙🎵✨", hint:"Solo debut single (2022) · About admiring from afar like how moonlight borrows its glow from the sun · First SB19 leader to go solo", meaning:"Pablo's debut — a metaphor of loving from a distance. The moon borrows its light from the sun, but still does its job beautifully.", yt:"LaLunaPablo", stream:"https://lnk.to/Pablo-LaLuna" },
      { title:"The Boy Who Cried Wolf", emojis:"🐺😔🐑", hint:"ALON album (2024) · Retells a famous Aesop's fable from the perspective of the animal, not the shepherd boy", meaning:"Pablo flips the classic fable — taking the wolf's perspective, feeling misjudged. A deeply personal reflection on being misunderstood.", yt:"BoyWolfPablo", stream:"https://lnk.to/Pablo-Alon" },
      { title:"Determinado", emojis:"💪🏽🔥🎯", hint:"Single (2024) · Collab with a family member who shares his production alias · Spanish title meaning 'determined'", meaning:"A hard-hitting declaration of grit — a collab with his brother Josue under their RADKIDZ alias.", yt:"DeterminadoPablo", stream:"https://lnk.to/Pablo-Determinado" },
      { title:"Micha", emojis:"🏆💥🙌", hint:"LAON album (2024) · Closing hype track of a two-album project · 'Boss battle' production with chorale flourishes", meaning:"The hype finale of LAON — a rallying cry for anyone taking a leap of faith, with rapidfire rap and epic chorale energy.", yt:"MichaPablo", stream:"https://lnk.to/Pablo-Laon" },
      { title:"Presyon", emojis:"😤⚡🌊", hint:"ALON album (2024) · Opening track · Title is the Tagalog word for a feeling you get under deadlines or heavy expectations", meaning:"A brazen opening track about the weight of expectations. Presyon means 'pressure' — delivered as raw, unflinching hip-hop.", yt:"PresyonPablo", stream:"https://lnk.to/Pablo-Alon" },
    ]},
  { name:"JOSH", color:"#E74C3C", emoji:"🎧", role:"Eldest · Rapper · Dancer",
    songs:[
      { title:"Wild Tonight", emojis:"🧛‍♂️🕺🌃", hint:"Solo debut single (2023) · MV uses vampire and gothic themes set in a bar dance floor · Won Solo Artist of the Year at P-pop Music Awards", meaning:"Josh's solo debut — a charismatic, wordplay-heavy party track with a gothic vampire MV showcasing his identity as both rapper and creative director.", yt:"WildTonightJosh", stream:"https://lnk.to/Josh-WildTonight" },
    ]},
  { name:"STELL", color:"#3498DB", emoji:"🎼", role:"Main Vocalist · Choreographer",
    songs:[
      { title:"Room", emojis:"🚪💃🔥", hint:"Solo debut single (2024) · A dance anthem, not a ballad · Composed by SB19's leader and his brother · Last of the five members to launch a solo career", meaning:"Stell's debut — a sultry, sensual dance anthem. Despite being the last to go solo, he arrived fully formed with intense choreography.", yt:"RoomStell", stream:"https://lnk.to/Stell-Room" },
      { title:"Anino", emojis:"👤❤️🌑", hint:"Solo single (2024) · Title means 'shadow' in Filipino · A ballad about a love so selfless it stays invisible in the background", meaning:"A stirring ballad about selfless love that stays in the shadows. Anino means 'shadow' — the song promises to endure everything without needing recognition.", yt:"AninoStell", stream:"https://lnk.to/Stell-Anino" },
    ]},
  { name:"KEN (FELIP)", color:"#1ABC9C", emoji:"🌙", role:"Main Dancer · Rapper · Producer",
    songs:[
      { title:"Palayo", emojis:"🚶‍♂️💔🥀", hint:"FELIP debut single (2021) · First SB19 member to go solo · Sung primarily in Bisaya (Cebuano) with some English · A slow R&B track about walking away", meaning:"Ken's solo debut as FELIP — a smooth R&B track about walking away from a toxic relationship. Primarily in Bisaya, it declared his Mindanao roots.", yt:"PalayoFelip", stream:"https://lnk.to/Felip-Palayo" },
      { title:"Bulan", emojis:"🌕🐉⚔️🌑", hint:"FELIP single (2022) · First full-blooded Filipino at Grammy's Global Spin · Title is a pre-colonial Philippine moon deity · Stell lends his voice to the intro chant", meaning:"Inspired by the pre-colonial myth of Bulan, Haliya, and the Bakunawa — FELIP uses ancient Filipino lore as a metaphor for fighting crab mentality. Stell chants the intro.", yt:"BulanFelip", stream:"https://lnk.to/Felip-Bulan" },
    ]},
  { name:"JUSTIN", color:"#F39C12", emoji:"🎨", role:"Visual · Vocalist · Creative Director",
    songs:[
      { title:"Palagi", emojis:"🌹😍🌙", hint:"Solo single · Title means 'always' in Filipino · Justin's vocal-forward release — lets his sincere, clear voice take center stage", meaning:"Justin's solo release — a tender, heartfelt love song. Palagi means 'always' — simple, angelic, and deeply felt.", yt:"PalagiJustin", stream:"https://lnk.to/Justin-Palagi" },
    ]},
];

const PASS_SCORE = 60;

// ── SHUFFLE UTILITY ──────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pickN(arr, n) { return shuffle(arr).slice(0, n); }

// ── UI ATOMS ─────────────────────────────────────────────────────────────────
function GlitchText({ text, color=NEON.cyan, size="2rem", style={} }) {
  return <span style={{ color, fontFamily:"'Courier New',monospace", fontSize:size, fontWeight:900,
    letterSpacing:"0.08em", textShadow:`0 0 8px ${color}, 2px 0 ${NEON.pink}, -2px 0 ${NEON.purple}`, ...style }}>{text}</span>;
}
function NeonBtn({ onClick, children, color=NEON.cyan, disabled=false, style={} }) {
  const [hov, setHov] = useState(false);
  return <button onClick={onClick} disabled={disabled}
    onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
    style={{ background:hov&&!disabled?color+"22":"transparent", border:`2px solid ${disabled?"#333":color}`,
      color:disabled?"#555":color, padding:"12px 28px", borderRadius:8,
      fontFamily:"'Courier New',monospace", fontWeight:700, fontSize:"1rem",
      letterSpacing:"0.1em", cursor:disabled?"not-allowed":"pointer",
      boxShadow:hov&&!disabled?`0 0 18px ${color}88`:"none", transition:"all 0.2s",
      textTransform:"uppercase", ...style }}>{children}</button>;
}
function Card({ children, style={}, glow }) {
  return <div style={{ background:NEON.glass, border:"1px solid rgba(255,255,255,0.12)",
    borderRadius:16, backdropFilter:"blur(12px)", boxShadow:glow||"0 4px 32px #0008",
    padding:24, ...style }}>{children}</div>;
}
function Scanlines() {
  return <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:9999,
    background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.07) 2px,rgba(0,0,0,0.07) 4px)" }} />;
}
function Particles() {
  const items = useRef(Array.from({length:12},(_,i)=>({
    id:i, e:["✨","💫","🌟","⚡","💥","🎵","🎶","🔥","💜","💙","💛","❤️"][i],
    x:Math.random()*100, y:Math.random()*100, dur:6+Math.random()*8, dl:Math.random()*6,
  })));
  return <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
    {items.current.map(p=>(
      <div key={p.id} style={{position:"absolute",left:`${p.x}%`,top:`${p.y}%`,
        fontSize:"1.1rem",opacity:0.13,animation:`fl${p.id%3} ${p.dur}s ${p.dl}s infinite ease-in-out`}}>{p.e}</div>
    ))}
    <style>{`
      @keyframes fl0{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-28px) rotate(15deg)}}
      @keyframes fl1{0%,100%{transform:translateY(0)}50%{transform:translateY(22px) rotate(-10deg)}}
      @keyframes fl2{0%,100%{transform:scale(1)}50%{transform:translateY(-14px) scale(1.14)}}
    `}</style>
  </div>;
}

// ── STREAM LINKS ─────────────────────────────────────────────────────────────
const PLACEHOLDER_YT = ["EmojiMV2026","VISAmv2026","UmaaligidMV","LaLunaPablo","BoyWolfPablo","DeterminadoPablo","MichaPablo","PresyonPablo","WildTonightJosh","RoomStell","AninoStell","PalayoFelip","BulanFelip","PalagiJustin"];
function StreamLinks({ song, color }) {
  const isReal = song.yt && !PLACEHOLDER_YT.includes(song.yt);
  return (
    <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginTop:10}}>
      {isReal && (
        <a href={`https://youtu.be/${song.yt}`} target="_blank" rel="noreferrer"
          style={{display:"flex",alignItems:"center",gap:6,background:"#FF000022",border:"1px solid #FF000088",
            borderRadius:8,padding:"6px 14px",textDecoration:"none",fontFamily:"'Courier New',monospace",
            fontSize:"0.75rem",color:"#FF6666"}}>▶ YouTube MV</a>
      )}
      {song.stream && (
        <a href={song.stream} target="_blank" rel="noreferrer"
          style={{display:"flex",alignItems:"center",gap:6,background:color+"18",border:`1px solid ${color}66`,
            borderRadius:8,padding:"6px 14px",textDecoration:"none",fontFamily:"'Courier New',monospace",
            fontSize:"0.75rem",color}}>🎧 Stream</a>
      )}
    </div>
  );
}

// ── FEEDBACK MODAL ────────────────────────────────────────────────────────────
function FeedbackModal({ onClose }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const categories = ["🎵 Song accuracy","💡 Hint quality","🎮 Gameplay","🎨 Design","➕ Song suggestions","🐛 Bug report","💬 Other"];

  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const submit = async () => {
    if (!rating || !category) return;
    setSending(true);
    setError(false);
    try {
      const res = await fetch("https://formspree.io/f/xdapbklz", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ rating, category, message: text }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      setTimeout(onClose, 2200);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:10000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <Card style={{maxWidth:400,width:"100%",position:"relative"}} glow={`0 0 30px ${NEON.purple}66`}>
        <button onClick={onClose} style={{position:"absolute",top:12,right:16,background:"none",border:"none",
          color:"#666",fontSize:"1.2rem",cursor:"pointer"}}>✕</button>

        {submitted ? (
          <div style={{textAlign:"center",padding:"20px 0"}}>
            <div style={{fontSize:"2.5rem",marginBottom:10}}>💜</div>
            <GlitchText text="SALAMAT!" size="1.6rem" color={NEON.cyan} />
            <p style={{color:"#aaa",fontFamily:"'Courier New',monospace",fontSize:"0.85rem",marginTop:10}}>
              Your feedback helps make this better for all A'TIN!
            </p>
          </div>
        ) : (
          <>
            <GlitchText text="FEEDBACK" size="1.4rem" color={NEON.purple} style={{display:"block",marginBottom:4}} />
            <p style={{color:"#aaa",fontFamily:"'Courier New',monospace",fontSize:"0.78rem",marginBottom:18}}>Help make this quiz better for all A'TIN!</p>

            {/* Star rating */}
            <p style={{color:"#ccc",fontFamily:"'Courier New',monospace",fontSize:"0.8rem",marginBottom:8}}>How would you rate this quiz?</p>
            <div style={{display:"flex",gap:8,marginBottom:18}}>
              {[1,2,3,4,5].map(s=>(
                <button key={s} onClick={()=>setRating(s)}
                  onMouseEnter={()=>setHoverRating(s)} onMouseLeave={()=>setHoverRating(0)}
                  style={{background:"none",border:"none",fontSize:"1.8rem",cursor:"pointer",
                    opacity:(hoverRating||rating)>=s?1:0.3,transition:"opacity 0.15s"}}>⭐</button>
              ))}
            </div>

            {/* Category */}
            <p style={{color:"#ccc",fontFamily:"'Courier New',monospace",fontSize:"0.8rem",marginBottom:8}}>What's your feedback about?</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:18}}>
              {categories.map(c=>(
                <button key={c} onClick={()=>setCategory(c)}
                  style={{background:category===c?NEON.purple+"33":"#ffffff0a",
                    border:`1px solid ${category===c?NEON.purple:"#333"}`,
                    color:category===c?NEON.purple:"#888",borderRadius:20,padding:"4px 12px",
                    fontFamily:"'Courier New',monospace",fontSize:"0.72rem",cursor:"pointer"}}>
                  {c}
                </button>
              ))}
            </div>

            {/* Text */}
            <textarea value={text} onChange={e=>setText(e.target.value)}
              placeholder="Tell us more (optional)..."
              style={{width:"100%",background:"#ffffff0d",border:"1px solid #333",color:NEON.white,
                padding:"10px 12px",borderRadius:8,fontFamily:"'Courier New',monospace",fontSize:"0.8rem",
                outline:"none",resize:"vertical",minHeight:72,boxSizing:"border-box",marginBottom:14}} />

            {error && <p style={{color:NEON.pink,fontFamily:"'Courier New',monospace",fontSize:"0.75rem",marginBottom:8}}>⚠️ Something went wrong. Please try again.</p>}
            <NeonBtn onClick={submit} color={NEON.purple} disabled={!rating||!category||sending}
              style={{width:"100%",textAlign:"center"}}>
              {sending ? "Sending..." : "Send Feedback 💜"}
            </NeonBtn>
          </>
        )}
      </Card>
    </div>
  );
}

// ── LEVEL CONFIG ──────────────────────────────────────────────────────────────
const LEVEL_META = [
  { label:"Level 1", sublabel:"Sanay Mo Na", desc:"Iconic hits — every A'TIN knows these", color:NEON.cyan, glow:"0 0 24px #00F5FF88" },
  { label:"Level 2", sublabel:"Palakas Na", desc:"EP deep cuts & standalone singles", color:NEON.pink, glow:"0 0 24px #FF2D7888" },
  { label:"Level 3", sublabel:"A'TIN Ka Talaga", desc:"Rare tracks, collabs & hidden lore", color:NEON.gold, glow:"0 0 24px #FFD70088" },
];

// ── QUESTION SCREEN ───────────────────────────────────────────────────────────
function QuestionScreen({ color, glow, totalQ, qIdx, song, onAnswer, label }) {
  const [input, setInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [revealed, setRevealed] = useState(null);
  const inputRef = useRef();
  useEffect(()=>{ setInput(""); setShowHint(false); setRevealed(null); setTimeout(()=>inputRef.current?.focus(),80); },[qIdx]);

  const norm = s => s.toLowerCase().replace(/[^a-z0-9\s]/g,"").replace(/\s+/g," ").trim();
  const check = () => {
    if (!input.trim()) return;
    setRevealed(norm(input) === norm(song.title));
  };

  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",padding:"18px 16px",position:"relative",zIndex:1}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{fontFamily:"'Courier New',monospace",color,fontSize:"0.82rem",fontWeight:700}}>{label} · {qIdx+1}/{totalQ}</div>
      </div>
      <div style={{display:"flex",gap:5,marginBottom:18}}>
        {Array.from({length:totalQ}).map((_,i)=>(
          <div key={i} style={{flex:1,height:4,borderRadius:2,background:i<qIdx?color:i===qIdx?color+"88":"#333"}} />
        ))}
      </div>
      <Card glow={glow} style={{textAlign:"center",marginBottom:16}}>
        <p style={{color:"#aaa",fontFamily:"'Courier New',monospace",fontSize:"0.78rem",marginBottom:8}}>🎵 What SB19 song is this?</p>
        <div style={{fontSize:"clamp(1.8rem, 10vw, 3rem)",letterSpacing:"0.08em",lineHeight:1.8,wordBreak:"break-word"}}>{song.emojis}</div>
        {showHint && <p style={{marginTop:10,color:NEON.gold,fontFamily:"'Courier New',monospace",fontSize:"0.78rem",lineHeight:1.5}}>💡 {song.hint}</p>}
      </Card>
      {revealed===null ? (
        <>
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&check()} placeholder="Type your answer..."
              style={{flex:1,background:"#ffffff0d",border:`1px solid ${color}55`,color:NEON.white,
                padding:"12px 14px",borderRadius:8,fontFamily:"'Courier New',monospace",fontSize:"0.95rem",outline:"none"}} autoFocus />
            <NeonBtn onClick={check} color={color} disabled={!input.trim()}>GO</NeonBtn>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            {!showHint && <button onClick={()=>setShowHint(true)}
              style={{background:"none",border:"none",color:"#555",fontFamily:"'Courier New',monospace",
                fontSize:"0.75rem",cursor:"pointer",textDecoration:"underline",textAlign:"left"}}>
              Need a hint? (no spoilers — includes release info)
            </button>}
            <button onClick={()=>setRevealed(false)}
              style={{background:"none",border:"none",color:"#444",fontFamily:"'Courier New',monospace",
                fontSize:"0.75rem",cursor:"pointer",textDecoration:"underline",marginLeft:"auto"}}>
              Skip →
            </button>
          </div>
        </>
      ) : (
        <Card style={{textAlign:"center"}} glow={revealed?`0 0 18px ${NEON.cyan}66`:`0 0 18px ${NEON.pink}66`}>
          <div style={{fontSize:"1.8rem",marginBottom:6}}>{revealed?"✅":"❌"}</div>
          <p style={{color:revealed?NEON.cyan:NEON.pink,fontFamily:"'Courier New',monospace",fontWeight:700,fontSize:"1rem",marginBottom:8}}>
            {revealed?"Correct!": `It's "${song.title}"`}
          </p>
          <p style={{color:"#bbb",fontFamily:"'Courier New',monospace",fontSize:"0.78rem",lineHeight:1.6,marginBottom:6}}>{song.meaning}</p>
          <p style={{color:NEON.gold+"cc",fontFamily:"'Courier New',monospace",fontSize:"0.72rem",marginBottom:10}}>📀 {song.hint}</p>
          <StreamLinks song={song} color={color} />
          <NeonBtn onClick={()=>onAnswer(revealed===true)} color={color} style={{marginTop:14}}>
            {qIdx<totalQ-1?"Next →":"See Results"}
          </NeonBtn>
        </Card>
      )}
    </div>
  );
}

// ── RESULTS ───────────────────────────────────────────────────────────────────
function Results({ score, total, color, passed, passMsg, failMsg, buttons }) {
  const pct = Math.round((score/total)*100);
  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",
      justifyContent:"center",padding:24,textAlign:"center",position:"relative",zIndex:1}}>
      <div style={{fontSize:"2.8rem",marginBottom:8}}>{passed?"🎉":"😔"}</div>
      <GlitchText text={passed?"PASSED!":"NOT YET"} size="2.2rem" color={passed?NEON.cyan:NEON.pink} />
      <div style={{margin:"16px 0"}}>
        <span style={{fontSize:"2.8rem",fontWeight:900,color,fontFamily:"'Courier New',monospace"}}>{pct}%</span>
        <p style={{color:"#aaa",fontFamily:"'Courier New',monospace",fontSize:"0.85rem"}}>{score}/{total} · Need 60% to pass</p>
      </div>
      <Card style={{maxWidth:340,width:"100%",marginBottom:22}}>
        <p style={{color:"#ccc",fontFamily:"'Courier New',monospace",fontSize:"0.85rem",lineHeight:1.7}}>
          {passed?passMsg:failMsg}
        </p>
      </Card>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"}}>{buttons}</div>
    </div>
  );
}

// ── FOOTER DISCLAIMER ─────────────────────────────────────────────────────────
function Footer() {
  return (
    <div style={{textAlign:"center",padding:"20px 16px 28px",position:"relative",zIndex:1}}>
      <p style={{color:"#444",fontFamily:"'Courier New',monospace",fontSize:"0.68rem",lineHeight:1.7,maxWidth:420,margin:"0 auto"}}>
        🎵 Unofficial A'TIN fan project — not affiliated with SB19, 1Z Entertainment, or Sony Music Philippines.<br/>
        All song titles, meanings, and content belong to their respective creators.<br/>
        Made with 💜 for A'TIN by <a href="https://scrippt.dev" target="_blank" rel="noreferrer" style={{color:"#666",textDecoration:"underline"}}>scrippt.dev</a>
      </p>
    </div>
  );
}

// ── END SCREEN ────────────────────────────────────────────────────────────────
function EndScreen({ totalScore, onReplay, onSoloMode, onFeedback }) {
  const pct = Math.round((totalScore/30)*100);
  const rank = pct===100?"🏆 Pablo-level A'TIN":pct>=80?"⭐ Super A'TIN":pct>=60?"💙 Proud A'TIN":"🌱 Growing A'TIN";
  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",
      justifyContent:"center",padding:"20px 16px",textAlign:"center",position:"relative",zIndex:1}}>
      <div style={{fontSize:"3rem",marginBottom:6}}>🎊</div>
      <GlitchText text="QUIZ COMPLETE!" size="1.7rem" color={NEON.gold} />
      <div style={{margin:"14px 0"}}>
        <span style={{fontSize:"3rem",fontWeight:900,color:NEON.cyan,fontFamily:"'Courier New',monospace"}}>{pct}%</span>
        <p style={{color:"#aaa",fontFamily:"'Courier New',monospace"}}>{totalScore}/30 correct</p>
        <p style={{color:NEON.gold,fontFamily:"'Courier New',monospace",marginTop:4}}>{rank}</p>
      </div>
      <Card style={{maxWidth:380,width:"100%",marginBottom:12}} glow={`0 0 16px ${NEON.purple}55`}>
        <p style={{color:NEON.purple,fontFamily:"'Courier New',monospace",fontWeight:700,marginBottom:8}}>🎤 Try Solo Mode!</p>
        <p style={{color:"#aaa",fontFamily:"'Courier New',monospace",fontSize:"0.78rem",marginBottom:12}}>
          Quiz each member's solo career — Pablo, Josh, Stell, Ken (FELIP) & Justin.
        </p>
        <NeonBtn onClick={onSoloMode} color={NEON.purple} style={{width:"100%"}}>🎤 Solo Mode</NeonBtn>
      </Card>
      <Card style={{maxWidth:380,width:"100%",marginBottom:12,textAlign:"left"}} glow={`0 0 16px ${NEON.pink}55`}>
        <p style={{color:NEON.pink,fontFamily:"'Courier New',monospace",fontWeight:700,marginBottom:12,textAlign:"center"}}>💜 Follow & share!</p>
        {[
          {icon:"🐦",label:"Twitter / X",handle:"@itsmaeci",url:"https://twitter.com/itsmaeci"},
          {icon:"📸",label:"Instagram",handle:"@itsmaeci",url:"https://instagram.com/itsmaeci"},
          {icon:"🎵",label:"TikTok",handle:"@itsmaeci",url:"https://tiktok.com/@itsmaeci"},
          {icon:"ⓕ",label:"Facebook",handle:"@itsmaeci",url:"https://facebook.com/itsmaeci"},
        ].map(s=>(
          <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
            style={{display:"flex",alignItems:"center",gap:10,padding:"7px 10px",borderRadius:8,
              background:"#ffffff08",marginBottom:6,textDecoration:"none",border:"1px solid #ffffff11"}}>
            <span>{s.icon}</span>
            <span style={{flex:1,fontFamily:"'Courier New',monospace",color:"#ccc",fontSize:"0.8rem"}}>{s.label}</span>
            <span style={{fontFamily:"'Courier New',monospace",color:NEON.pink,fontSize:"0.76rem"}}>{s.handle}</span>
          </a>
        ))}
      </Card>
      <Card style={{maxWidth:420,width:"100%",marginBottom:12,textAlign:"center"}} glow={`0 0 16px ${NEON.gold}44`}>
        <p style={{color:NEON.gold,fontFamily:"'Courier New',monospace",fontWeight:700,marginBottom:4}}>💛 Support this quiz</p>
        <p style={{color:"#aaa",fontFamily:"'Courier New',monospace",fontSize:"0.78rem",marginBottom:14}}>Loved this quiz? Help keep more A'TIN content coming!</p>
        <a href="https://ko-fi.com/itsmaeci" target="_blank" rel="noreferrer"
          style={{display:"inline-flex",alignItems:"center",gap:8,background:"#FF5E5B",color:"#fff",padding:"9px 24px",
            borderRadius:8,fontFamily:"'Courier New',monospace",fontWeight:700,textDecoration:"none",fontSize:"0.88rem",marginBottom:16}}>
          ☕ Support on Ko-fi
        </a>
        <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
          <div style={{textAlign:"center"}}>
            <p style={{color:NEON.cyan,fontFamily:"'Courier New',monospace",fontSize:"0.75rem",fontWeight:700,marginBottom:6}}>GCash</p>
            <img src="/gcash-qr.jpg" alt="GCash QR code" style={{width:140,height:140,borderRadius:8,border:`2px solid ${NEON.cyan}66`,display:"block"}} />
          </div>
          <div style={{textAlign:"center"}}>
            <p style={{color:NEON.pink,fontFamily:"'Courier New',monospace",fontSize:"0.75rem",fontWeight:700,marginBottom:6}}>BPI</p>
            <img src="/bpi-qr.jpg" alt="BPI QR code" style={{width:140,height:140,borderRadius:8,border:`2px solid ${NEON.pink}66`,display:"block"}} />
          </div>
        </div>
      </Card>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center",marginBottom:8}}>
        <NeonBtn onClick={onReplay} color={NEON.cyan}>🔄 Play Again</NeonBtn>
        <NeonBtn onClick={onFeedback} color={NEON.purple}>💬 Give Feedback</NeonBtn>
      </div>
      <Footer />
    </div>
  );
}

// ── SOLO LOBBY ────────────────────────────────────────────────────────────────
function SoloLobby({ onSelect, onBack }) {
  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",
      justifyContent:"center",padding:24,position:"relative",zIndex:1}}>
      <GlitchText text="SOLO MODE" size="2.2rem" color={NEON.purple} />
      <p style={{color:"#aaa",fontFamily:"'Courier New',monospace",margin:"10px 0 24px",textAlign:"center",maxWidth:340,fontSize:"0.85rem"}}>
        Each member has a solo career! Pick one to quiz yourself on their individual songs.
      </p>
      <div style={{display:"flex",flexDirection:"column",gap:10,width:"100%",maxWidth:380}}>
        {MEMBERS.map(m=>(
          <button key={m.name} onClick={()=>onSelect(m)}
            style={{background:m.color+"18",border:`1px solid ${m.color}88`,borderRadius:12,
              padding:"14px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:14}}>
            <span style={{fontSize:"1.6rem"}}>{m.emoji}</span>
            <div style={{textAlign:"left"}}>
              <div style={{color:m.color,fontFamily:"'Courier New',monospace",fontWeight:700,fontSize:"0.95rem"}}>{m.name}</div>
              <div style={{color:"#888",fontFamily:"'Courier New',monospace",fontSize:"0.72rem"}}>{m.role} · {m.songs.length} solo song{m.songs.length!==1?"s":""}</div>
            </div>
            <span style={{marginLeft:"auto",color:m.color,fontFamily:"'Courier New',monospace"}}>→</span>
          </button>
        ))}
      </div>
      <button onClick={onBack} style={{marginTop:20,background:"none",border:"none",color:"#666",
        fontFamily:"'Courier New',monospace",cursor:"pointer",textDecoration:"underline",fontSize:"0.82rem"}}>
        ← Back
      </button>
      <Footer />
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("intro");
  const [lvlIdx, setLvlIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [lvlScore, setLvlScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [member, setMember] = useState(null);
  const [soloQ, setSoloQ] = useState(0);
  const [soloScore, setSoloScore] = useState(0);
  const [soloSongs, setSoloSongs] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  // Shuffled songs for this game session
  const [sessionSongs, setSessionSongs] = useState({1:[], 2:[], 3:[]});

  const lvl = LEVEL_META[lvlIdx];

  const newSession = () => setSessionSongs({
    1: pickN(SONG_POOL[1], 10),
    2: pickN(SONG_POOL[2], 10),
    3: pickN(SONG_POOL[3], 10),
  });

  useEffect(()=>{ newSession(); },[]);

  const startLevel = () => { setQIdx(0); setLvlScore(0); setScreen("question"); };
  const goIntro = idx => { setLvlIdx(idx); setScreen("lvlIntro"); };
  const replay = () => {
    newSession();
    setLvlIdx(0); setQIdx(0); setLvlScore(0); setTotalScore(0);
    setScreen("intro");
  };

  const handleGroupAnswer = correct => {
    const ns = lvlScore + (correct?1:0);
    setLvlScore(ns);
    if (qIdx < 9) setQIdx(q=>q+1);
    else { setTotalScore(t=>t+ns); setScreen("lvlResults"); }
  };

  const handleSoloAnswer = correct => {
    const ns = soloScore + (correct?1:0);
    setSoloScore(ns);
    if (soloQ < member.songs.length-1) { setSoloQ(q=>q+1); setSoloScore(ns); }
    else { setSoloScore(ns); setScreen("soloResult"); }
  };

  const currentSong = sessionSongs[lvlIdx+1]?.[qIdx];

  return (
    <div style={{background:`radial-gradient(ellipse at 20% 20%, #1a003a 0%, ${NEON.darker} 60%)`,minHeight:"100vh",color:NEON.white}}>
      <Scanlines /><Particles />
      {showFeedback && <FeedbackModal onClose={()=>setShowFeedback(false)} />}

      {screen==="intro" && (
        <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,textAlign:"center",position:"relative",zIndex:1}}>
          <div style={{fontSize:"3.5rem",marginBottom:6}}>🎵😊🎤</div>
          <GlitchText text="SB19" size="3.2rem" color={NEON.pink} />
          <GlitchText text="EMOJI QUIZ" size="1.8rem" color={NEON.cyan} style={{display:"block",marginTop:4}} />
          <p style={{color:"#aaa",fontFamily:"'Courier New',monospace",marginTop:10,marginBottom:28,maxWidth:360,lineHeight:1.6,fontSize:"0.85rem"}}>
            Decode emoji clues to guess SB19 songs.<br/>
            3 levels · 10 songs · 60% to advance · Solo mode included!<br/>
            <span style={{color:"#555",fontSize:"0.75rem"}}>Songs shuffle every game — no two plays are the same!</span>
          </p>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center",marginBottom:28}}>
            {LEVEL_META.map(l=>(
              <div key={l.label} style={{border:`1px solid ${l.color}44`,borderRadius:10,padding:"7px 14px",
                color:l.color,fontFamily:"'Courier New',monospace",fontSize:"0.78rem"}}>
                <div style={{fontWeight:700}}>{l.label}</div>
                <div style={{opacity:0.7,fontSize:"0.7rem"}}>{l.sublabel}</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center",marginBottom:16}}>
            <NeonBtn onClick={()=>goIntro(0)} color={NEON.pink} style={{padding:"13px 28px"}}>🎮 Group Quiz</NeonBtn>
            <NeonBtn onClick={()=>setScreen("soloLobby")} color={NEON.purple} style={{padding:"13px 28px"}}>🎤 Solo Mode</NeonBtn>
          </div>
          <button onClick={()=>setShowFeedback(true)}
            style={{background:"none",border:"none",color:"#555",fontFamily:"'Courier New',monospace",
              fontSize:"0.78rem",cursor:"pointer",textDecoration:"underline",marginBottom:8}}>
            💬 Send feedback
          </button>
          <Footer />
        </div>
      )}

      {screen==="lvlIntro" && (
        <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,textAlign:"center",position:"relative",zIndex:1}}>
          <div style={{fontSize:"2.5rem",marginBottom:8}}>{lvlIdx===0?"🟢":lvlIdx===1?"🟡":"🔴"}</div>
          <GlitchText text={lvl.label} size="2.5rem" color={lvl.color} />
          <GlitchText text={lvl.sublabel} size="1.3rem" color={NEON.white} style={{display:"block",marginTop:4}} />
          <p style={{color:"#aaa",fontFamily:"'Courier New',monospace",marginTop:12,marginBottom:8,fontSize:"0.85rem"}}>{lvl.desc}</p>
          <p style={{color:"#555",fontFamily:"'Courier New',monospace",fontSize:"0.75rem",marginBottom:28}}>🔀 10 songs picked randomly from the pool</p>
          <NeonBtn onClick={startLevel} color={lvl.color} style={{fontSize:"1rem",padding:"13px 32px"}}>Let's Go! ⚡</NeonBtn>
          <button onClick={()=>setScreen("intro")} style={{marginTop:18,background:"none",border:"none",color:"#666",
            fontFamily:"'Courier New',monospace",cursor:"pointer",textDecoration:"underline",fontSize:"0.82rem"}}>
            ← Back
          </button>
        </div>
      )}

      {screen==="question" && currentSong && (
        <QuestionScreen key={`${lvlIdx}-${qIdx}`} color={lvl.color} glow={lvl.glow} totalQ={10} qIdx={qIdx}
          song={currentSong} onAnswer={handleGroupAnswer} label={`${lvl.label} · ${lvl.sublabel}`} />
      )}

      {screen==="lvlResults" && (
        <Results score={lvlScore} total={10} color={lvl.color}
          passed={Math.round((lvlScore/10)*100)>=PASS_SCORE}
          passMsg={lvlIdx===2?"🏆 All 3 levels cleared! True A'TIN energy!":
            `Ready for ${LEVEL_META[lvlIdx+1].label}: ${LEVEL_META[lvlIdx+1].sublabel}!`}
          failMsg={`${PASS_SCORE - Math.round((lvlScore/10)*100)}% more needed. Keep streaming SB19! 🎵`}
          buttons={<>
            <NeonBtn onClick={startLevel} color="#aaa">↩ Retry</NeonBtn>
            {Math.round((lvlScore/10)*100)>=PASS_SCORE && lvlIdx<2 &&
              <NeonBtn onClick={()=>goIntro(lvlIdx+1)} color={NEON.cyan}>Next Level →</NeonBtn>}
            {Math.round((lvlScore/10)*100)>=PASS_SCORE && lvlIdx===2 &&
              <NeonBtn onClick={()=>setScreen("end")} color={NEON.gold}>🏆 Finish</NeonBtn>}
          </>}
        />
      )}

      {screen==="end" && (
        <EndScreen totalScore={totalScore} onReplay={replay}
          onSoloMode={()=>setScreen("soloLobby")}
          onFeedback={()=>setShowFeedback(true)} />
      )}

      {screen==="soloLobby" && (
        <SoloLobby onSelect={m=>{setMember(m);setSoloQ(0);setSoloScore(0);setSoloSongs(shuffle([...m.songs]));setScreen("soloQuiz");}}
          onBack={()=>setScreen("intro")} />
      )}

      {screen==="soloQuiz" && member && soloSongs.length>0 && (
        <QuestionScreen key={soloQ} color={member.color} glow={`0 0 22px ${member.color}88`}
          totalQ={member.songs.length} qIdx={soloQ} song={soloSongs[soloQ]}
          onAnswer={handleSoloAnswer} label={`${member.emoji} ${member.name} Solo`} />
      )}

      {screen==="soloResult" && member && (
        <Results score={soloScore} total={member.songs.length} color={member.color}
          passed={Math.round((soloScore/member.songs.length)*100)>=PASS_SCORE}
          passMsg={`${soloScore===member.songs.length?"💯 Perfect!":"Nice!"} You really know ${member.name}'s solo work!`}
          failMsg={`Time to stream ${member.name}'s solo stuff! 🎵`}
          buttons={<>
            <NeonBtn onClick={()=>{setSoloQ(0);setSoloScore(0);setSoloSongs(shuffle([...member.songs]));setScreen("soloQuiz");}} color={member.color}>↩ Retry</NeonBtn>
            <NeonBtn onClick={()=>setScreen("soloLobby")} color="#aaa">← Members</NeonBtn>
            <NeonBtn onClick={()=>setShowFeedback(true)} color={NEON.purple}>💬 Feedback</NeonBtn>
          </>}
        />
      )}
    </div>
  );
}