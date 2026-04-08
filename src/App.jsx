import { useState, useRef, useEffect } from "react";

const NEON = {
  pink:"#FF2D78", cyan:"#00F5FF", purple:"#BF00FF",
  gold:"#FFD700", white:"#FFFFFF", darker:"#060009",
  glass:"rgba(255,255,255,0.05)",
};

// ── SONG POOL — more songs than needed so each play feels fresh ───────────────
// Level 1: 13 songs, picks 10 randomly each game
// Level 2: 18 songs, picks 10 randomly each game
// Level 3: 14 songs, picks 10 randomly each game
// Solo pools: all songs always shown (small sets)

const SONG_POOL = {
  1: [
    { title:"MAPA", emojis:"🗺️👩‍👦👨‍👦💛", hint:"Pagsibol EP (2021) · Title is a portmanteau of two Filipino words for the people who raised you · Pablo wrote it while homesick on tour", meaning:"MAPA blends 'mama' and 'papa' — a two-part love letter divided into sections for each parent. Pablo wrote it during their 2020 tour when he was unable to contact his family.", yt:"DDyr3DbTPtk", stream:"https://lnk.to/SB19-MAPA" },
    { title:"GENTO", emojis:"👑🔥💃🏽", hint:"Pagtatag! EP (2023) · Pre-release lead single · First Filipino act to top Billboard World Digital Song Sales · Title is street slang from Pablo's home province", meaning:"A swagger anthem celebrating Filipino identity and self-worth. 'Gento' is Cavite street slang for someone royally boss — a direct nod to Pablo's hometown of Imus, Cavite.", yt:"VZZA_38RUBI", stream:"https://lnk.to/SB19-Gento" },
    { title:"Go Up", emojis:"🚀⬆️🌟🇵🇭", hint:"Single (2019) · A fan's Twitter post of their dance practice video went viral and saved the group from near-disbandment", meaning:"SB19's breakthrough hit about rising above doubt. The group had nearly given up when a viral Twitter dance-practice clip turned everything around — Pablo calls it their 'redemption song.'", yt:"WRfhzWaiQvk", stream:"" },
    { title:"What?", emojis:"🇵🇭🚩✊🗺️", hint:"Single (2021) · Title is a wordplay on the Filipino word for 'flag' · MV references Heneral Luna and ends on a historic Philippine sea map", meaning:"A patriotic battlecry. 'What?' is a wordplay on 'Watawat' (flag). Pablo describes it as a song about individuality and Filipino pride — the MV references Katipunan, Heneral Luna, and ends on the Murillo-Velarde map.", yt:"OAww-qrSnPs", stream:"https://lnk.to/SB19-What" },
    { title:"Hanggang Sa Huli", emojis:"💞🕰️🔚", hint:"Get In The Zone album (2020) · Title track · Animated MV written and directed by Justin", meaning:"A deeply romantic ballad pledging love and loyalty until the final moment. The animated MV was conceived and directed by Justin.", yt:"S82NKEOVj50", stream:"" },
    { title:"Alab", emojis:"🔥❤️‍🔥✨", hint:"Single (2019) · First release after signing with Sony Music PH · Won MV of the Year at Myx Music Awards 2021 · Title means 'blaze'", meaning:"Their first Sony Music single — a fiery dance-pop love song about burning desire. The MV won Music Video of the Year at the 2021 Myx Music Awards.", yt:"-tWuVqZnoL4", stream:"" },
    { title:"SLMT", emojis:"🙏🫶🎤💙", hint:"Pagsibol EP (2021) · MV filmed in Palawan · Title abbreviates a Tagalog word — the missing letter 'A' is intentionally left for fans to fill in", meaning:"A heartfelt thank-you to A'TIN. SLMT abbreviates 'Salamat' — the 'A' is missing because A'TIN completes it. MV filmed on Palawan's white-sand beaches.", yt:"ffh0ojPU27k", stream:"" },
    { title:"Ikako", emojis:"🏥🤝💙😔", hint:"Pagsibol EP (2021) · A reworked earlier ballad · Dedicated to a specific group of heroes during the COVID-19 pandemic", meaning:"A pandemic-era ballad dedicated to healthcare frontliners. 'Ikako' blends 'ikaw' (you) and 'ako' (me) — reworked as a tribute to those who kept going during the global health crisis.", yt:"sCQqXGUvCk4", stream:"" },
    { title:"Bazinga", emojis:"🎯😤🃏🏅", hint:"Pagsibol EP (2021) · Spent 7 weeks at #1 on Billboard Hot Trending Songs, beating a BTS record · Only fully English track on Pagsibol · A direct response to online bashers", meaning:"A trap-pop/reggaeton clap-back at the haters who tried to dismiss SB19. It topped Billboard Hot Trending Songs for 7 weeks — beating BTS's record — making SB19 the first Filipino act to do so.", yt:"p6XBcQj5Hs4", stream:"" },
    { title:"Ligaya", emojis:"🎄✨😊", hint:"Christmas single (2021) · Released December 18 · Title is a common Filipino name that also means a feeling", meaning:"A feel-good Christmas single spreading joy. The title 'Ligaya' means 'happiness' in Filipino — the song lives up to it with warm, celebratory energy.", yt:"Fi_tk-UJeq0", stream:"https://lnk.to/SB19-Ligaya" },
    { title:"Nyebe", emojis:"❄️💔🌨️", hint:"Standalone single (2022) · Title is a Filipino word for frozen precipitation · A relationship that's gone emotionally cold", meaning:"Nyebe means 'snow' — a cold, emotionally numb breakup song about going through the motions of a relationship already frozen over.", yt:"ulCVb13Z6yk", stream:"https://lnk.to/SB19-Nyebe" },
    { title:"WYAT", emojis:"📍❓🫠", hint:"Standalone single (2022) · Released post-COVID · MV has a retro Grease-inspired look · Kickstarted their first world tour of the same name", meaning:"A longing search for reconnection — with a missing person or a lost version of yourself. The 'WYAT' tour that followed became their first world tour.", yt:"aIT2X9HWJLE", stream:"https://lnk.to/SB19-WYAT" },
    { title:"Dungka!", emojis:"🫵🦀🫷🔊💪", hint:"Simula at Wakas EP (2025) · MV features celebrity cameos including Vice Ganda, Maymay Entrata, and Alodia Gosiengfiao · Nearly 6-minute video showcasing Filipino street culture · Became a major cultural moment in P-pop", meaning:"An upbeat rave track celebrating Filipino street culture and urban Manila life. The star-studded MV (directed by Kerbs Balagtas) features cameos from Vice Ganda, Maymay Entrata, Alodia Gosiengfiao, Sassa Gurl, and more.", yt:"SO-G0WMzSdo", stream:"" },
  ],
  2: [
    { title:"CRIMZONE", emojis:"🩸💥🔥🏆", hint:"Pagtatag! EP (2023) · Co-written by Ken and Josh · Features Bisaya rap verses · Title is a zone where excellence demands everything from you", meaning:"A hard-hitting anthem about the blood, sweat, and tears required to reach the top. 'Crimzone' is SB19's homage to their struggles — co-written by Ken (in Bisaya) and Josh.", yt:"e-Nh623g0-Y", stream:"https://lnk.to/SB19-Pagtatag" },
    { title:"ILAW", emojis:"💡😵‍💫🌑", hint:"Pagtatag! EP (2023) · Acoustic guitar ballad · Justin says this captures exactly how he felt when overwhelmed by fame · Too much of something can blind you", meaning:"Not about being someone's light — it's about the dark side of fame. Too much spotlight can blind and overwhelm. Justin said it captured exactly how he felt during a phase when he wanted to step away.", yt:"9Ns8DztSfwo", stream:"https://lnk.to/SB19-Pagtatag" },
    { title:"LIHAM", emojis:"💌🎻📖💍", hint:"Pagtatag! EP (2023) · Over 6 minutes long — their longest track · SB19 compared it to wedding vows · Also interpreted as a letter to A'TIN", meaning:"A 6-minute power ballad led by strings and piano, described by SB19 as a 'wedding vow' — an honest expression of love and gratitude. Often interpreted as a deeply emotional letter to A'TIN.", yt:"orU-h3eX-Gc", stream:"https://lnk.to/SB19-Pagtatag" },
    { title:"FREEDOM", emojis:"🦅🎊🔓🏳️", hint:"Pagtatag! EP (2023) · Closing track · Celebrates SB19 breaking away from their former agency and becoming self-managed under 1Z Entertainment", meaning:"A funky celebration of SB19's hard-won independence. After 7 years under ShowBT, FREEDOM marks their transition to self-management — a jubilant thank-you to A'TIN who made it possible.", yt:"W_OGQoRDpE4", stream:"https://lnk.to/SB19-Pagtatag" },
    { title:"I Want You", emojis:"🏊🏻‍♂️🎷🌹", hint:"Pagtatag! EP (2023) · Their first-ever slow soul R&B track · Production inspired by 1990s R&B — a genre entirely new for SB19", meaning:"SB19's foray into slow 1990s-inspired soul R&B — a genre entirely new for them. A sensual, stripped-back declaration of desire praised for how naturally their vocals suit the style.", yt:"s25Yi6pZnMs", stream:"https://lnk.to/SB19-Pagtatag" },
    { title:"Time", emojis:"⏳⌛💫", hint:"Simula at Wakas EP (2025) · Reflects on mortality and the courage to keep going · Justin opens the track with a verse about emotional numbness", meaning:"A poetic reflection on impermanence and persistence. 'Scattering stars' symbolizes leaving behind meaning even when the end is near — both existential and empowering.", yt:"NMq0DVeTwkY", stream:"" },
    { title:"DAM", emojis:"🌊🔒🍎💣", hint:"Simula at Wakas EP (2025) · Title sounds like a biblical first man's name when followed by 'Anong pakiramdam' · Medieval folk instrumentation meets EDM", meaning:"A philosophical track using Adam & Eve as a metaphor for growth. 'DAM? Anong pakiramdam' phonetically becomes 'ADAM, how does it feel?' — about the painful awakening of stepping outside your comfort zone.", yt:"de6CnBa-qj0", stream:"https://SB19.tunelink.to/DAM" },
    { title:"Love Goes", emojis:"💘🛤️🌅", hint:"Get In The Zone album (2020) · Also released as an EDM remix on the same album · About where a love eventually leads", meaning:"A bittersweet track about a love slowly fading and where it ultimately leads. Released in both original and EDM versions on their debut album.", yt:"FPI79-pkjRc", stream:"" },
    { title:"Wag Mong Ikunot Ang Iyong Noo", emojis:"😠🤚😮‍💨💆", hint:"Get In The Zone album (2020) · Longest song title in their discography · The title is a literal physical instruction about a facial expression", meaning:"A lighthearted feel-good track. The title literally means 'Don't furrow your brow' — a playful Filipino reminder to stop worrying and enjoy the moment.", yt:"joTe2Gs46Gc", stream:"" },
    { title:"No Stopping You", emojis:"🏃‍♂️💨🎬🔥", hint:"OST (2021) · Written for a Filipino streaming film · Remixed with a female OPM artist named after a day of the week", meaning:"Written for the Filipino film Love at First Stream — a high-octane anthem about unstoppable momentum. The remix with Jayda Avanzado extended its reach significantly.", yt:"Lo9ANiFeeyk", stream:"" },
    { title:"Win Your Heart", emojis:"🏆💐❤️", hint:"Special single (2022) · Official theme of a national beauty pageant · Originally written by a Filipino National Artist", meaning:"SB19's reinterpretation of the classic Binibining Pilipinas anthem, originally by Nonong Pedero. Pablo, Justin, and Stell handled vocals while Ken and Josh added new rap verses. Performed live at the Grand Coronation Night.", yt:"ofeFrctMJeM", stream:"" },
    { title:"Kabataang Pinoy", emojis:"🧒🇵🇭🎸✊", hint:"Collab (2022) · Cover of an Itchyworms classic · Theme for a popular reality TV franchise's teen edition · Features a prominent all-girl P-pop group · Trended worldwide on Twitter", meaning:"A pop-rock cover of the Itchyworms' beloved 'Kabataang Pinoy,' recorded as a collab between SB19 and BINI for Pinoy Big Brother's teen edition. Encourages Filipino youth to be brave and independent.", yt:"eQjm5em8nsQ", stream:"" },
    { title:"Christmas Party", emojis:"🎄🥳🎸🎅", hint:"Single (2022) · Cover of an iconic Eraserheads song · Recorded during the WYAT World Tour's LA stop · Released immediately after the Eraserheads reunion concert", meaning:"SB19's P-pop cover of Eraserheads' iconic Christmas Party, produced by August Rigo. Recorded in Los Angeles during their WYAT World Tour, it blends dance-pop, R&B, and modern funk.", yt:"lUPlAagYq60", stream:"" },
    { title:"Ready", emojis:"🎬🛳️🌍🎤", hint:"Collab (2024) · Features a founding member of a legendary American group · MV directed by a director known for Katy Perry and Britney Spears · SB19's biggest international collab to date", meaning:"A high-energy collab with apl.de.ap of the Black Eyed Peas. The house-party MV was directed by Ben Mor and filmed in Manila, designed to announce SB19 to international audiences.", yt:"RkvNF5UsjHQ", stream:"" },
    { title:"8TonBall", emojis:"🎱🎧🔊💃", hint:"Simula at Wakas EP (2025) · Name is a play on a billiards term · Known as a crowd hype track in live performances · Josh was heavily involved in its creation", meaning:"A high-energy rave/dance track from Simula at Wakas. The name plays on '8 ball' from billiards — built for live performance energy, with Josh playing a key creative role.", yt:"ShobrLdGQOw", stream:"" },
    { title:"Quit", emojis:"✊😤💪🚫", hint:"Simula at Wakas EP (2025) · Co-written by Felip and Pablo · About perseverance and refusing to give up · Fan-favorite for its intense lyricism", meaning:"A hard-hitting track about refusing to quit — co-written by Felip and Pablo. Fan-favorite for its intense lyricism and vocal range, touching on the group's personal experiences with doubt and pressure.", yt:"gHoTGkTknIM", stream:"" },
    { title:"Shooting for the Stars", emojis:"🌠🚀⭐🎯", hint:"Simula at Wakas EP (2025) · Written and produced by August Rigo · An aspirational anthem · Performed at PureGold OPM Con 2025", meaning:"Written and produced by August Rigo, this aspirational pop anthem captures SB19's themes of ambition, perseverance, and believing in one's destiny.", yt:"em6r6X1sKNA", stream:"" },
    { title:"Memories", emojis:"💭🌅📸💙", hint:"Wakas at Simula album (2026) · One of six brand-new tracks on their second studio album · R&B-leaning · Critics praised it as a standout among the new material", meaning:"An R&B-leaning track from SB19's second studio album, praised by critics as a standout for its melodic versatility and emotional resonance.", yt:"RqfkE_Lw6U8", stream:"https://sb19.sng.to/wakas-at-simula" },
  ],
  3: [
    { title:"Emoji", emojis:"📱😶‍🌫️🎭🌐", hint:"Wakas at Simula album (2026) · Collab with Taiwan's Queen of C-pop · Brazilian phonk beat co-produced by Ken and Luke April · About the performance we put on for social media vs. who we really are", meaning:"A collab with Jolin Tsai about hiding true emotions behind digital emojis. Ken co-produced the funk carioca-influenced beat with Luke April. The MV contrasts a glamorous set with a chaotic one — online identity vs. reality.", yt:"w6_sChrkvw8", stream:"https://sb19.sng.to/wakas-at-simula" },
    { title:"VISA", emojis:"✈️🌍💼🏆", hint:"Single (2026) · Debuted #6 on Billboard World Digital Song Sales · About the visa struggles faced by Filipino artists, OFWs, and athletes · Features cameos by Ninong Ry and Poca", meaning:"A sharp commentary on the systemic barriers Filipinos face getting visas — artists, workers, and athletes turned away at borders. Ninong Ry appears as a fake band member; Poca plays the visa officer.", yt:"0t6GNcINKeU", stream:"https://smji.lnk.to/sb19visa" },
    { title:"Umaaligid", emojis:"👻🌀😰", hint:"Collab with an OPM icon (2025) · Title means 'lurking' or 'lingering' · A dark pop-rock track about betrayal, fake news, and toxic people · 10-minute cinematic MV directed by Simon Te", meaning:"A dark pop-rock collab with Sarah Geronimo about disinformation, betrayal, and the toxic people who circle your life. 'Umaaligid' means 'lurking' — the MV is a 10-minute crime-scene music film, the inaugural release of Sarah's G-Music label.", yt:"nBkdggyFs0o", stream:"" },
    { title:"KALAKAL", emojis:"🛒💸🎤😤", hint:"Collab (2024) · Features OPM rap royalty alongside Ken's Bisaya verses · Title is a Filipino market term for the exchange of goods", meaning:"A gritty collab with Gloc-9 about trade and worth. Ken flexes Bisaya pride through his verses. Kalakal means 'trade' or 'barter.'", yt:"6d7mTSB5ASc", stream:"" },
    { title:"Moonlight", emojis:"🌕✨🎶", hint:"International collab (2024) · Three artists from three different countries · Bridges P-pop, Western pop, and Mandopop in one track", meaning:"A dreamy collab with Ian Asher and Terry Zhong. A moonlit romantic crossover bridging three music scenes — P-pop, Western pop, and Mandopop.", yt:"_WIGlfguVTs", stream:"" },
    { title:"Mana", emojis:"🦇🧿✈️👣", hint:"Pagsibol EP (2021) · Title is short for a Filipino mythical creature that detaches its upper body to fly · About soaring high while keeping feet on the ground · Interconnected with Bazinga", meaning:"Title is shortened from 'Manananggal' — a Filipino creature that severs its upper torso to fly while its legs remain on the ground. SB19 uses this as a metaphor: no matter how high they soar, their feet stay grounded.", yt:"boql5e4o7Wc", stream:"https://sb19.sng.to/wakas-at-simula" },
    { title:"Tilaluha", emojis:"😢💧🎵", hint:"Debut single (2018) · Title is a portmanteau of two Filipino words — one meaning 'stop,' one meaning 'tears' · Received little attention on release but holds historic significance", meaning:"SB19's very first song — a sentimental OPM ballad about unrequited love. The title fuses 'tila' (stop) and 'luha' (tears). Everything that followed traces back to this single.", yt:"9Fqszuma1zQ", stream:"" },
    { title:"golden hour", emojis:"🌅✨💛", hint:"Remix collab (2023) · Featured on a remix of an American artist's 1-billion-stream global hit · SB19 added Tagalog verses · Released July 7 to celebrate the milestone", meaning:"SB19's Tagalog-English remix of JVKE's global hit 'golden hour,' released to celebrate it reaching 1 billion streams. Their Tagalog verses added a uniquely Filipino emotional texture to the already beloved track.", yt:"YKUMJrTSdSE", stream:"" },
    { title:"Burn the Flame", emojis:"🔥⚔️🏆🎮", hint:"Single (2025) · Official anthem for an international gaming championship · Blends hip-hop-rock with traditional Filipino percussion · Debuted at No. 1 on iTunes Philippines", meaning:"SB19's official anthem for the Honor of Kings International Championship 2025, blending hip-hop-rock with kulintang (traditional Filipino percussion). Released as a 4-version EP, it debuted at No. 1 on iTunes Philippines.", yt:"5YMY8l4UVN8", stream:"" },
    { title:"Love Yours", emojis:"💕🎵😌", hint:"Collab (2021) · Featured on a track by the Korean producer who previously composed one of SB19's breakthrough songs · A mellow, relaxed departure from their usual energy", meaning:"A gentle collab with South Korean producer Ohwon Lee — who previously composed SB19's breakthrough hit 'Go Up.' Features relaxed raps and an upbeat chorus, a marked contrast to their usual high-energy output.", yt:"_lYcMbRqM8U", stream:"" },
    { title:"Toyfriend", emojis:"🤝💔🧸", hint:"Wakas at Simula album (2026) · Collab with a Japanese boy group · Described as 'cool, easy, and warm' · Debuted live at a showcase in Yokohama before official release", meaning:"SB19's first official collab with a Japanese group — BE:FIRST. A feel-good pop track described as 'cool, easy, and warm,' performed live at DUNK Showcase in K-Arena Yokohama.", yt:"45yoTfV8Nn0", stream:"https://sb19.sng.to/wakas-at-simula" },
    { title:"Everblack", emojis:"🌑🎸⚡", hint:"Wakas at Simula album (2026) · One of the more experimental tracks on the album · Described as 'sonically daring' · Pushes into darker sonic territory", meaning:"One of the more experimental tracks from SB19's second studio album — 'sonically daring' and refreshingly dark, pushing into heavier, more complex territory.", yt:"qhsxCW58dPM", stream:"https://sb19.sng.to/wakas-at-simula" },
    { title:"Wakas", emojis:"🔚😢💙", hint:"Wakas at Simula album (2026) · Title means 'end' in Filipino · An emotional ballad that serves as the thematic conclusion of SB19's EP trilogy era", meaning:"An emotional ballad whose title 'Wakas' (end/finish) marks both the literal and thematic conclusion of SB19's EP trilogy era. Showcases the group's extraordinary vocal abilities and heartfelt delivery.", yt:"2nxD5yku98U", stream:"https://sb19.sng.to/wakas-at-simula" },
    { title:"Kapangyarihan", emojis:"✊🇵🇭⚖️🔥", hint:"Collab with a beloved Filipino indie folk duo (2021) · Co-written by Pablo · Initially released to call for justice after a high-profile police killing · Became a protest anthem at major Philippine rallies in 2025", meaning:"A folk-rock and hip-hop protest anthem co-written by Pablo and Ben&Ben's Miguel and Paolo Guico. Originally released in 2020 calling for justice for Sonya and Frank Gregorio, it became the battle cry at the 'Trillion Peso March' (2025) and was used as the opening theme for the Philippine war film 'Pulang Araw' (2024). 'Kapangyarihan' means 'power.'", yt:"yaGmwtpOyV0", stream:"" },
  ],
};

const MEMBERS = [
  { name:"PABLO", color:"#9B59B6", emoji:"🎤", role:"Leader · Rapper · Producer",
    songs:[
      { title:"La Luna", emojis:"🌙🎵✨", hint:"Solo debut single (2022) · About admiring from afar like how moonlight borrows its glow from the sun · First SB19 leader to go solo", meaning:"Pablo's debut — a metaphor of loving from a distance. The moon borrows its light from the sun, but still does its job beautifully.", yt:"guigxQ8SNS8", stream:"https://lnk.to/Pablo-LaLuna" },
      { title:"The Boy Who Cried Wolf", emojis:"🐺😔🐑", hint:"ALON album (2024) · Retells a famous Aesop's fable from the perspective of the animal, not the shepherd boy", meaning:"Pablo flips the classic fable — taking the wolf's perspective, feeling misjudged. A deeply personal reflection on being misunderstood.", yt:"rg-DBZdd6i4", stream:"" },
      { title:"Determinado", emojis:"💪🏽🔥🎯", hint:"Single (2024) · Collab with a family member who shares his production alias · Spanish title meaning 'determined'", meaning:"A hard-hitting declaration of grit — a collab with his brother Josue under their RADKIDZ alias.", yt:"SYQyP9aH7vs", stream:"" },
      { title:"Micha", emojis:"🏆💥🙌", hint:"LAON album (2024) · Closing hype track of a two-album project · 'Boss battle' production with chorale flourishes", meaning:"The hype finale of LAON — a rallying cry for anyone taking a leap of faith, with rapidfire rap and epic chorale energy.", yt:"d13gXYVskcM", stream:"" },
      { title:"Presyon", emojis:"😤⚡🌊", hint:"ALON album (2024) · Opening track · Title is the Tagalog word for a feeling you get under deadlines or heavy expectations", meaning:"A brazen opening track about the weight of expectations. Presyon means 'pressure' — delivered as raw, unflinching hip-hop.", yt:"bsw59ufwIEQ", stream:"https://lnk.to/Pablo-Alon" },
      { title:"Wala", emojis:"🪞👤🔀💭", hint:"ALON album (2024) · About encountering and speaking to another version of yourself · Explores the 'other self' we contain, ignore, or fear", meaning:"Pablo explores the duality of self — a confrontation with his own reflection, the version of himself he might be suppressing. Part of ALON's overarching theme of surviving an inner storm.", yt:"8a6_xeWBgFQ", stream:"" },
      { title:"Kumunoy", emojis:"🌊😰🕳️💡", hint:"ALON album (2024) · Title is the Filipino word for quicksand · Described as one of the most emotional songs on the album · Ends on a hopeful note despite dark imagery", meaning:"'Kumunoy' (quicksand) captures the sinking feeling of emotional despair — but the song pivots to hope. Light is glimpsed, the speaker keeps swimming, the fire within reignites. One of ALON's most emotionally resonant tracks.", yt:"kpL9kOQQTT0", stream:"" },
      { title:"Kelan", emojis:"⏰❓🤝🎤", hint:"ALON album (2024) · Features Pablo's brother Josue · Part of the RADKIDZ sibling project · Performed live at SB19's BITZ concert", meaning:"A collab with Pablo's brother Josue (RADKIDZ). 'Kelan' (meaning 'when') — a question-driven track asking when things will finally fall into place, delivered through sibling chemistry.", yt:"NqRgm66MfkQ", stream:"" },
      { title:"Drowning in the Water", emojis:"🌊😔💧🫀", hint:"ALON album (2024) · A ballad about singular emotional dependency · The overwhelming devotion toward one person amid the world's billions", meaning:"A ballad exploring deep emotional attachment and the fear of losing someone. The drowning metaphor captures the obsessive focus on one person — and the existential dread of separation.", yt:"Hv8UZn1NLYA", stream:"" },
      { title:"Breathe", emojis:"🎹🌬️✨🌙", hint:"ALON album (2024) · Closing outro track · A quiet instrumental piano piece · Brings the emotional album journey to a gentle, wordless close", meaning:"The calming outro to ALON — a quiet piano piece that gives the listener space to exhale after the album's emotional weight. No lyrics, just stillness.", yt:"p9vC25nWf6g", stream:"" },
      { title:"Akala", emojis:"🍺😵‍💫🤦🌙", hint:"RADKIDZ single (January 2024) · Collab with Pablo's brother Josue · Title is a wordplay on the Filipino word for alcohol ('alak') · Conceived during COVID-19", meaning:"A RADKIDZ collab between Pablo and his brother Josue — the title plays on 'alak' (alcohol), reflecting on using substances as an escape during the pandemic. The performance video 'ACT I: Shat?' shows the brothers hanging out with friends.", yt:"fGmZ8uKnHO0", stream:"" },
      { title:"EDSA", emojis:"🛣️🏍️🌆🎵", hint:"Solo single (May 2024) · Inspired by riding along Manila's most iconic highway stuck in traffic · Surpassed 5 million independent streams · Cover art features a monkey wearing a helmet", meaning:"A high-energy single about navigating life's grind — inspired by the chaos and persistence of riding along EDSA (Metro Manila's main artery). Pablo's wordplay references 'keep riding hard.' Surpassed 5 million streams as an independent release.", yt:"DPeMvjsNGoc", stream:"" },
      { title:"Neumun", emojis:"🌌🔭🎤🌀", hint:"LAON album (2024) · Opening track · Sets the tone for Pablo's companion album released one week after ALON", meaning:"The opening statement of LAON — Pablo's second album in a surprise double release. 'Neumun' kicks off the companion record with energy, establishing its distinct identity alongside ALON.", yt:"Ym44yDlRTqk", stream:"" },
      { title:"Don't Care", emojis:"🤷‍♂️😤🚫🔥", hint:"LAON album (2024) · A defiant rejection of others' opinions and judgment · Pablo at his most dismissive and self-assured", meaning:"A hard-nosed track from LAON about shedding the weight of external expectations. Pablo leans into his rap confidence, brushing off negativity with total indifference.", yt:"xM6PPaqAOjQ", stream:"" },
      { title:"Butata", emojis:"🏀🛡️💪😤", hint:"LAON album (2024) · Title is Filipino street basketball slang for 'blocking a shot' or being shut down · Inspired a viral dance challenge by content creator Jay Joseph", meaning:"A hip-hop track built around basketball culture and street slang. 'Butata' (blocking a shot) is used metaphorically — shutting down anyone or anything that tries to bring you down. Went viral through Jay Joseph's dance challenge.", yt:"m3WgWQE8zVk", stream:"" },
      { title:"Puyat", emojis:"😴💤🔥🌃", hint:"LAON album (2024) · Title means 'sleeplessness' in Filipino · About grinding through exhaustion toward your dreams · Entirely in Tagalog", meaning:"'Puyat' (staying up late, sleep deprivation) is about the relentless grind — staying awake, working hard, dreaming of a better life despite exhaustion. Entirely delivered in Tagalog, with deep eyes full of aspiration.", yt:"QzA-e57xDhg", stream:"" },
      { title:"Blessed", emojis:"🙌🌟🙏💫", hint:"LAON album (2024) · A gratitude-centered track · Pablo reflects on his journey and counts everything that makes him feel fortunate", meaning:"A moment of stillness in LAON — Pablo counts his blessings: the journey, the people, the growth. A reflective, gratitude-driven track amid the album's energy.", yt:"_aOVVyxrzBQ", stream:"" },
      { title:"Tambol", emojis:"🥁🪐🌀🔄", hint:"LAON album (2024) · Full title is 'Tambol (Ibang Planeta)' · Uses drum rhythms as a metaphor for transformation · Repeats the phrase 'Galing sa ibang planeta' (coming from another planet)", meaning:"'Tambol (Ibang Planeta)' uses percussion as a metaphor for transformation and adjustment. The repeated phrase 'Galing sa ibang planeta' (coming from another planet) reflects on change that doesn't come easy — adapting to a world that feels foreign.", yt:"tpQOBzshu_k", stream:"" },
    ]},
  { name:"JOSH", color:"#E74C3C", emoji:"🎧", role:"Eldest · Rapper · Dancer",
    songs:[
      { title:"Wild Tonight", emojis:"🧛‍♂️🕺🌃", hint:"Solo debut single (2023) · MV uses vampire and gothic themes set in a bar dance floor · Won Solo Artist of the Year at P-pop Music Awards", meaning:"Josh's solo debut — a charismatic, wordplay-heavy party track with a gothic vampire MV showcasing his identity as both rapper and creative director.", yt:"Faavh5TWVZQ", stream:"" },
      { title:"Pakiusap Lang", emojis:"🙏💔😢🎤", hint:"Single (2023) · Released April 21 · Title means 'just please' or 'I'm begging you' in Filipino · MV starred the KAIA twins", meaning:"A heartfelt plea about holding on to someone who's slipping away. 'Pakiusap lang' translates to 'please, I'm asking' — emotionally raw and vulnerable.", yt:"mkUB9xCZHn4", stream:"" },
      { title:"Get Right", emojis:"🎯💪🕺✨", hint:"Single (2023) · Released December 15 · Uptempo dance track · Filmed with bold color-block aesthetics", meaning:"A confident bop about getting your groove right. Released just before the holidays, 'Get Right' shows Josh's playful, high-energy side away from his gothic debut aesthetic.", yt:"fkd8SyHtlnM", stream:"" },
      { title:"Yoko Na", emojis:"🙅‍♂️💔🚪😤", hint:"Single (2024) · Features a prominent Filipino hip-hop artist · Title means 'I don't want to anymore' in Filipino · A breaking-point collab", meaning:"A hip-hop collab with Al James about reaching a breaking point in a relationship. 'Yoko na' means 'I don't want to anymore' — raw and unfiltered.", yt:"q9-9wVu6uVE", stream:"" },
      { title:"Sumaya", emojis:"😊🎊💃🌟", hint:"Single (2024) · Released June 2 · Title means 'be happy' in Filipino · An upbeat feel-good track", meaning:"Sumaya means 'to be happy' — Josh delivers a bright, danceable feel-good track dedicated to anyone who needs a reminder to just enjoy the moment.", yt:"ogjjgZ2k1OE", stream:"" },
      { title:"1999", emojis:"📅🌃✈️🎬", hint:"Single (2024) · Released December 13 · MV filmed in Hong Kong · Named after a year that holds personal significance", meaning:"A nostalgic, cinematic single filmed in Hong Kong. '1999' reflects on a time or feeling Josh wants to return to — emotionally layered and visually striking.", yt:"VH6yLvMhlN0", stream:"" },
      { title:"Silent Cries", emojis:"😢🌃🏘️🎸", hint:"Lost & Found album (2024) · Pre-release single · Josh revisits places from his childhood, both good and bad memories · Guitar-driven emo-adjacent track", meaning:"A melancholic, guitar-driven track where Josh revisits the places that shaped him. Lyrics capture being lost but not wanting to be found — 'drowning in the dark, wish I could find the light through silent cries.'", yt:"JI8dpLml7P8", stream:"" },
      { title:"Honest", emojis:"🎭😶🎸💔", hint:"Lost & Found album (2024) · A dark acoustic track · Josh finally strips off the mask he's worn his whole life · Produced with members of The Juans (Chael and Japs)", meaning:"Josh at his most vulnerable — 'Honest' is about tearing away every persona to reveal who he truly is. Co-produced with Chael and Japs of The Juans, it's a raw confession of being exhausted by pretense.", yt:"ZrYxBfmrQjw", stream:"" },
      { title:"No Control", emojis:"⛓️🔓🎸🕺", hint:"Lost & Found album (2024) · Features Filipino rock band (e)motion engine · About breaking free from all constraints · MV shows Josh going from stressed to carefree", meaning:"An empowering rock collab with (e)motion engine about freeing himself from constraints that once dictated his every move. 'No Control' is about using his own power to live through challenges — embracing vulnerability as strength.", yt:"rWdMh759KUA", stream:"" },
      { title:"Lights Out", emojis:"🌑🕯️💃😍", hint:"Lost & Found album (2024) · Features Mo of Alamat · A sensual R&B 'date night anthem' · Performed live at Josh's debut solo concert at New Frontier Theater", meaning:"A sensual R&B collab with Alamat's Mo — a self-described 'date night anthem' about dizzying pleasure in the comforts of darkness. Mo's classic R&B vocals perfectly complement Josh's mellow-to-quickfire flow.", yt:"rcUi0JMIXSA", stream:"" },
      { title:"Sino Ka Ba", emojis:"❓🦸‍♂️⚔️🎤", hint:"OST (2023) · Official theme of a Filipino action TV series' second season · Features Josh's SB19 groupmate · First-ever SB19 sub-unit collaboration release", meaning:"The official theme song of Iron Heart Season 2, featuring Josh and Pablo — SB19's first-ever sub-unit collab. Originally sung by Idol Philippines Season 2 winner Khimo Gumatay. 'Sino Ka Ba' ('Who Are You') explores the heroic struggle for a greater cause.", yt:"WeLz30nqE9c", stream:"" },
    ]},
  { name:"STELL", color:"#3498DB", emoji:"🎼", role:"Main Vocalist · Choreographer",
    songs:[
      { title:"Room", emojis:"🚪💃🔥", hint:"Solo debut single (2024) · A dance anthem, not a ballad · Composed by SB19's leader and his brother · Last of the five members to launch a solo career", meaning:"Stell's debut — a sultry, sensual dance anthem. Despite being the last to go solo, he arrived fully formed with intense choreography.", yt:"LTyD_zPUrs4", stream:"" },
      { title:"Anino", emojis:"👤❤️🌑", hint:"Solo single (2024) · Title means 'shadow' in Filipino · A ballad about a love so selfless it stays invisible in the background", meaning:"A stirring ballad about selfless love that stays in the shadows. Anino means 'shadow' — the song promises to endure everything without needing recognition.", yt:"mNO53zv5J34", stream:"" },
      { title:"Di Ko Masabi", emojis:"🤐💛🎻😶", hint:"Room EP (2024) · Features a prominent Filipino actress · Composed by National Artist Ryan Cayabyab · Title means 'I can't say it'", meaning:"A stunning collab with actress Nour Hooshmand, composed by National Artist Ryan Cayabyab. 'Di Ko Masabi' — about feelings too overwhelming to put into words.", yt:"Exk61eDuOCY", stream:"" },
      { title:"Classic", emojis:"🎹🌹⏳✨", hint:"Room EP (2024) · Fourth track · Lyric video only · A ballad about love that stands the test of time", meaning:"A lush ballad about a love so enduring it becomes timeless. 'Classic' closes the EP's emotional arc with restraint and elegance.", yt:"h6Rg1tRaHN0", stream:"" },
    ]},
  { name:"KEN (FELIP)", color:"#1ABC9C", emoji:"🌙", role:"Main Dancer · Rapper · Producer",
    songs:[
      { title:"Palayo", emojis:"🚶‍♂️💔🥀", hint:"FELIP debut single (2021) · First SB19 member to go solo · Sung primarily in Bisaya (Cebuano) with some English · A slow R&B track about walking away", meaning:"Ken's solo debut as FELIP — a smooth R&B track about walking away from a toxic relationship. Primarily in Bisaya, it declared his Mindanao roots.", yt:"4YxmYxhEn2I", stream:"" },
      { title:"Bulan", emojis:"🌕🐉⚔️🌑", hint:"FELIP single (2022) · First full-blooded Filipino at Grammy's Global Spin · Title is a pre-colonial Philippine moon deity · Stell lends his voice to the intro chant", meaning:"Inspired by the pre-colonial myth of Bulan, Haliya, and the Bakunawa — FELIP uses ancient Filipino lore as a metaphor for fighting crab mentality. Stell chants the intro.", yt:"3pXOy6V7AEs", stream:"" },
      { title:"Rocksta", emojis:"🎸🤘🌟🔊", hint:"COM•PLEX EP (2023) · Lead pre-release single · Features FELIP's most guitar-forward production · Title blends two words", meaning:"The lead single off COM•PLEX — FELIP's rock-leaning side in full force. 'Rocksta' blends 'rock' and 'star,' a declaration of his range beyond R&B.", yt:"DkVLBij5wM8", stream:"" },
      { title:"Kanako", emojis:"🙏🫶🌸🎸", hint:"Single (2023) · Released December 22 · A Bisaya rock ballad of gratitude · Band Version released New Year's Day 2024", meaning:"A Bisaya rock ballad of deep gratitude. FELIP wraps heartfelt appreciation in electric guitars and raw emotion.", yt:"d5mnBBP2w4U", stream:"" },
      { title:"Fake Faces", emojis:"🎭😠🔥🤥", hint:"Single (2024) · Won Best Rock Video at MYX Music Awards 2024 · Trended #12 on YouTube Philippines · A pop-rock call-out track", meaning:"FELIP's angriest release — a pop-rock explosion calling out fake people and two-faced behavior. Won Best Rock Video at MYX 2024.", yt:"r8ZKwPdGSNw", stream:"" },
      { title:"Superiority", emojis:"⚡🏀🎌🔥", hint:"COM•PLEX EP (2023) · Track 2 · Inspired by a character from a basketball anime · Delivered in Tagalog and Cebuano (Bisaya)", meaning:"FELIP channels the arrogant confidence of Daiki Aomine — the overpowered prodigy from anime 'Kuroko no Basket' — as a metaphor for his own dominance. Delivered in his signature Tagalog-Bisaya bilingual style.", yt:"WQahpHvBkIU", stream:"" },
      { title:"Mictest", emojis:"🎤🕺🌴💃", hint:"COM•PLEX EP (2023) · Track 3 · Jersey club music fusion · A hype rallying call to fellow Bisayans · FELIP's personal favorite track from the EP", meaning:"A jersey club/dance track serving as a mic test and shoutout to Bisayans. FELIP celebrates Mindanao identity, calls his community 'the baddest,' and delivers in full bilingual Bisaya-Tagalog. His stated favorite off COM•PLEX.", yt:"OR1nSzxq62c", stream:"" },
      { title:"Drinksmoke", emojis:"🌫️⬇️🔄💪", hint:"COM•PLEX EP (2023) · Track 4 · Melodic trap · About hitting rock bottom and falling into bad vices, then bouncing back through self-acceptance", meaning:"A melodic trap track about the descent into self-destructive habits and the climb back out. FELIP has said it hits differently every time — a reminder to stay strong and embrace self-acceptance after the fall. A deeply personal track.", yt:"lAYGo9Iix1Y", stream:"" },
      { title:"Criminal", emojis:"🎭🧠🔗😈", hint:"COM•PLEX EP (2023) · Track 5 · FELIP voices two distinct characters entirely himself · About addiction, obsession, and internal conflict with inner demons", meaning:"An R&B/hip-hop track where FELIP performs both sides of an internal conflict — exploring obsession, addiction, and the pull of dark desires. Both distinct voices are performed by FELIP alone.", yt:"hZXvuMCDHII", stream:"" },
      { title:"Straydogs", emojis:"🐕🗾🎤😤", hint:"COM•PLEX EP (2023) · Closing track · MV filmed in Japan · Japanese-influenced layered drone production · Addresses critics by comparing them to stray dogs that never stop barking", meaning:"The closing track of COM•PLEX, filmed on the streets of Japan. FELIP dismisses his detractors — their cheap shots are just incessant stray dog barking. Message: don't be affected. Japanese-influenced production gives it a cinematic, defiant edge.", yt:"9uxXjZaTuEg", stream:"" },
      { title:"foes", emojis:"⚔️🎸🌑🤜", hint:"7Sins album (2024) · Opening track · Features his SB19 bandmates Stell and Josh · A theatrical rock overture about individuality and rebellion", meaning:"The grand opening of 7Sins — featuring Stell and Josh. A soaring guitar riff crashes into menacing rock and electronic elements. FELIP's statement of intent: individuality over conformity, rebellion against societal norms.", yt:"6ZfKD-2SWwQ", stream:"" },
      { title:"envy", emojis:"💚👁️👑💎", hint:"7Sins album (2024) · Focus single · Opulent MV: horses, designer streetwear, luxury cars · Album debuted at #9 on Spotify Top Albums Debut (Global)", meaning:"The flagship track of 7Sins — FELIP explores jealousy and comparison with hard rock/rap production. The deliberately lavish MV (designer clothes, horses, burning visuals, luxury cars) mirrors the sin of envy. The album debuted #9 on Spotify's Top Albums Debut globally.", yt:"zq2l7PJJFMI", stream:"" },
      { title:"wrath", emojis:"😡🔥💥⚡", hint:"7Sins album (2024) · Track 3 · Hard rock/rap · Channels raw, destructive anger · One of the heaviest tracks on the album", meaning:"FELIP channels unfiltered rage — one of the heaviest tracks on 7Sins. 'Wrath' explores the sin of destructive anger in a hard rock/rap explosion, no holds barred.", yt:"3DRL0-R5sQk", stream:"" },
      { title:"greed", emojis:"💔🥺🎻😤", hint:"7Sins album (2024) · Track 4 · A sorrowful ballad · About the greedy desire to hold onto unrequited love · Co-written with Belgian singer-songwriter Cyra Gwynth", meaning:"A powerful ballad co-written with Belgian artist Cyra Gwynth — exploring how greed manifests in love: the insatiable need to hold on to someone who doesn't love you back. Recorded at Monostery Studios, mixed by Luke April and FELIP.", yt:"d-y-6dRn8yA", stream:"" },
      { title:"pride", emojis:"🦁👑😤🏆", hint:"7Sins album (2024) · Track 5 · Hip-hop/rap · Explores arrogance and excessive self-esteem · Contains explicit content", meaning:"FELIP explores the sin of pride — unchecked ego, arrogance, and the dangers of excessive self-belief. A hard-hitting hip-hop delivery that doesn't pull punches.", yt:"VrVbc0n7NrM", stream:"" },
      { title:"gluttony", emojis:"🎶🌀🍂🤝", hint:"7Sins album (2024) · Features Bisaya brother PLAYERTWO · Dark melodic rap · About intemperance and escapism · Violin and guitar chord progressions layered over hip-hop beats", meaning:"A dark, melodic collab with PLAYERTWO about intemperance — caught in the pitfalls of insatiable habits and escapism. Eclectic production layers violin, guitar, reedy synths, and bilingual Tagalog-Bisaya rapping.", yt:"qGVMshMIaW0", stream:"" },
      { title:"lust", emojis:"🌹😏💋🌙", hint:"7Sins album (2024) · Features Belgian artist Cyra Gwynth · Sultry R&B · FELIP's second collab with Cyra on the same album · Music and lyrics written together", meaning:"A sultry R&B exploration of desire — FELIP's second collab with Cyra Gwynth on 7Sins (after 'greed'). Features enticing layered vocals and sensual lyricism, with both artists co-writing the track.", yt:"DSw9uPH7rPc", stream:"" },
      { title:"sloth", emojis:"🦥⏳💔🔄", hint:"7Sins album (2024) · Track 8 · Starts fast and upbeat, deliberately slows to a crawl at the end · About choosing not to let go of a past love", meaning:"A clever musical metaphor — the song starts with upbeat synths and pop-rock energy, then winds down to a slow, warped crawl at the end. It depicts the conscious choice to stay idle, waiting for a past love to return, spiraling into listlessness.", yt:"tjUvikfgw94", stream:"" },
      { title:"ache", emojis:"💙🌅🩹✨", hint:"7Sins album (2024) · Closing track · About redemption and acknowledgment · Brings closure to the journey through all seven sins · 'All my wounds will find light'", meaning:"The healing conclusion to 7Sins — after traversing all seven sins, 'ache' offers acknowledgment and redemption. The lyric 'all my wounds will find light' resonated deeply with fans as the album's hopeful closing statement.", yt:"tf6HUSTuylQ", stream:"" },
    ]},
  { name:"JUSTIN", color:"#F39C12", emoji:"🎨", role:"Visual · Vocalist · Creative Director",
    songs:[
      { title:"Sunday Morning", emojis:"☀️🌿🎸😌", hint:"Cover single (2024) · Originally by an American pop-rock band · Filmed in the mountains of Benguet · Officially released on streaming April 14", meaning:"Justin's tender cover of Maroon 5's Sunday Morning, filmed among the misty mountains of Atok, Benguet. A stripped-back acoustic interpretation spotlighting his gentle, sincere vocals.", yt:"PbI-by3CK9s", stream:"" },
      { title:"Surreal", emojis:"🌀✨😵‍💫💭", hint:"Solo debut single (2024) · Released February 29 — a leap day · Self-directed MV · Produced by RADKIDZ", meaning:"Justin's solo debut dropped on a leap day — February 29, 2024. Self-directed and produced by RADKIDZ, it's a dreamy, introspective track about an experience so extraordinary it doesn't feel real.", yt:"T0lwgP84ajc", stream:"" },
      { title:"Kaibigan", emojis:"🤝💙😔🪞", hint:"Solo single (2024) · Released July 19 · Self-directed · Title is the Filipino word for 'friend' · Features two other creatives in the MV", meaning:"A self-directed exploration of a friendship that blurs emotional boundaries. 'Kaibigan' means 'friend' in Filipino — but the song asks what happens when that word no longer feels like enough.", yt:"3v0IJH21ooc", stream:"" },
      { title:"Sampung Mga Daliri", emojis:"🖐️✋🎶🌱", hint:"Collab (2025) · With singer-songwriter dwta · Title translates to 'Ten Fingers' · A folk-pop reimagining of a Filipino nursery rhyme", meaning:"A delicate folk-pop collab with dwta reimagining a familiar Filipino children's song as an adult meditation on lost love. 'Sampung Mga Daliri' (Ten Fingers) transforms innocent imagery into something bittersweet.", yt:"e4or4NzVuyU", stream:"" },
    ]},
];

const PASS_SCORE = 60;
const SOLO_Q = 10;

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

// ── SHARE BUTTON ─────────────────────────────────────────────────────────────
function ShareBtn({ text, color=NEON.cyan, style={} }) {
  const handle = async () => {
    const url = window.location.href;
    const body = `${text}\n${url}`;
    if (navigator.share) {
      try { await navigator.share({ text: body }); } catch {}
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(body)}`, "_blank", "noopener,noreferrer");
    }
  };
  return <NeonBtn onClick={handle} color={color} style={style}>📤 Share Result</NeonBtn>;
}

// ── STREAM LINKS ─────────────────────────────────────────────────────────────
const PLACEHOLDER_YT = [];
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
              Need a hint?
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
        Made with 💜 for A'TIN by <a href="https://cimafrancamae.github.io/" target="_blank" rel="noreferrer" style={{color:"#666",textDecoration:"underline"}}>@itsmaeci</a>
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
      <ShareBtn text={`I scored ${pct}% on the SB19 Emoji Quiz! ${rank} 🎵`} color={NEON.cyan} style={{marginBottom:16}} />
      <Card style={{maxWidth:380,width:"100%",marginBottom:12}} glow={`0 0 16px ${NEON.purple}55`}>
        <p style={{color:NEON.purple,fontFamily:"'Courier New',monospace",fontWeight:700,marginBottom:8}}>🎤 Try Solo Mode!</p>
        <p style={{color:"#aaa",fontFamily:"'Courier New',monospace",fontSize:"0.78rem",marginBottom:12}}>
          Quiz each member's solo career — Pablo, Josh, Stell, Ken (FELIP) & Justin.
        </p>
        <NeonBtn onClick={onSoloMode} color={NEON.purple} style={{width:"100%"}}>🎤 Solo Mode</NeonBtn>
      </Card>
      {/* <Card style={{maxWidth:380,width:"100%",marginBottom:12,textAlign:"left"}} glow={`0 0 16px ${NEON.pink}55`}>
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
      </Card> */}
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
              <div style={{color:"#888",fontFamily:"'Courier New',monospace",fontSize:"0.72rem"}}>{m.role} · {m.songs.length} songs{m.songs.length>SOLO_Q?` · ${SOLO_Q} per session`:""}</div>
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
    if (soloQ < soloSongs.length-1) { setSoloQ(q=>q+1); setSoloScore(ns); }
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
        <SoloLobby onSelect={m=>{setMember(m);setSoloQ(0);setSoloScore(0);setSoloSongs(pickN(m.songs, SOLO_Q));setScreen("soloQuiz");}}
          onBack={()=>setScreen("intro")} />
      )}

      {screen==="soloQuiz" && member && soloSongs.length>0 && (
        <QuestionScreen key={soloQ} color={member.color} glow={`0 0 22px ${member.color}88`}
          totalQ={soloSongs.length} qIdx={soloQ} song={soloSongs[soloQ]}
          onAnswer={handleSoloAnswer} label={`${member.emoji} ${member.name} Solo`} />
      )}

      {screen==="soloResult" && member && (
        <Results score={soloScore} total={soloSongs.length} color={member.color}
          passed={Math.round((soloScore/soloSongs.length)*100)>=PASS_SCORE}
          passMsg={`${soloScore===soloSongs.length?"💯 Perfect!":"Nice!"} You really know ${member.name}'s solo work!`}
          failMsg={`Time to stream ${member.name}'s solo stuff! 🎵`}
          buttons={<>
            <NeonBtn onClick={()=>{setSoloQ(0);setSoloScore(0);setSoloSongs(pickN(member.songs, SOLO_Q));setScreen("soloQuiz");}} color={member.color}>↩ Retry</NeonBtn>
            <NeonBtn onClick={()=>setScreen("soloLobby")} color="#aaa">← Members</NeonBtn>
            <ShareBtn text={`I scored ${Math.round((soloScore/soloSongs.length)*100)}% on ${member.name}'s solo quiz on the SB19 Emoji Quiz! 💜`} color={member.color} />
            <NeonBtn onClick={()=>setShowFeedback(true)} color={NEON.purple}>💬 Feedback</NeonBtn>
          </>}
        />
      )}
    </div>
  );
}