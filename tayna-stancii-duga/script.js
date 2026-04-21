

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const I18N = {
    ru: {
        skip: "Перейти к содержимому",
        nav_about: "О книге",
        nav_listen: "Слушать",
        nav_platforms: "Платформы",
        nav_faq: "FAQ",
        nav_contacts: "Контакты",

        hero_title: "Тайна Станции Дуга",
        hero_subtitle: "Аудиокнига в атмосфере Зоны: тайны Дуги, аномалии и человеческая жадность.",
        meta_author: "Автор",
        meta_narrator: "Чтец",
        meta_duration: "Длительность",
        meta_genre: "Жанр",
        pills_pda: "PDA-стиль",
        pills_3d: "Атмосфера",
        pills_fast: "Быстро и удобно",

        pill_mystery: "Тайна Дуги",
        pill_atmo: "Постапокалипсис",
        pill_action: "Напряжение",

        cta_listen: "Слушать",
        cta_platforms: "Платформы",
        cta_support: "Поддержать",
        cta_scroll: "Что внутри",

        listen_title: "Отрывок и плеер",
        listen_desc: "Плеер запоминает прогресс на устройстве. Добавьте главы — получите полноценный плейлист.",
        player_now: "Сейчас:",
        player_play: "▶",
        player_pause: "❚❚",
        player_prev: "⇚",
        player_next: "⇛",
        player_add: "Как добавить главы?",
        player_add_hint: "В script.js: массив TRACKS (название + файл).",

        about_title: "Коротко о сюжете",
        about_lead: "2017 год. Экспедиция учёных пропадает в центре Зоны. Учёный Александр Новиков отправляется на поиски — и всё сводится к станции Дуга.",
        about_b1: "Место действия: загадочная станция Дуга с мрачным прошлым и неизвестными возможностями.",
        about_b2: "Герой: опытный сталкер, который решает разгадать тайну этого места, несмотря на смертельные опасности.",
        about_b3: "Аномалии и мутанты: Зона проверит на прочность каждый шаг.",
        about_b4: "Истинная угроза — не только снаружи. Иногда страшнее люди.",

        about_card1_h: "Что вы получите",
        about_card1_p1: "Короткий, плотный сюжет — без лишней воды.",
        about_card1_p2: "Атмосферу Зоны: напряжение, риск, неизвестность.",
        about_card2_h: "Почему зайдёт фанатам S.T.A.L.K.E.R.",
        about_card3_h: "Для кого",
        about_card3_p1: "Если вам нравятся истории о выживании, загадках и опасных территориях — вы по адресу.",
        about_card3_p2: "Подходит и тем, кто только знакомится со вселенной: всё понятно без энциклопедий.",

        check_1: "Точки интереса и «запах» Зоны: тревога, радиация, артефакты.",
        check_2: "Живые персонажи: мотивации, сделки, предательство.",
        check_3: "Темп: сцены напряжения чередуются с расследованием.",

        pda_h: "PDA-выжимка",
        pda_p1: "Короткий бриф по книге: кому, зачем, и что почувствуете.",
        pda_p2: "Идеально для мобильных: крупный шрифт, понятные кнопки, быстрый доступ к платформам.",

        tag_1: "Зона Отчуждения",
        tag_2: "Станция Дуга",
        tag_3: "Сталкеры",
        tag_4: "Аномалии",

        pda_header: "PDA > Книга > Тайна Станции Дуга",
        pda_specs: "Характеристики:",
        pda_duration: "Длительность: 04:57:31",
        pda_narrator: "Чтец: Александр Шестаков",
        pda_genre: "Жанр: Фантастика/Фэнтези",
        pda_rating: "Рейтинг: ★★★★☆",
        pda_tags: "Теги:",

        feats_title: "Почему стоит попробовать",
        feat1_h: "Профессиональная озвучка",
        feat1_p: "Чтец удерживает напряжение и точно передаёт атмосферу Зоны — без театральщины и лишнего пафоса.",
        feat2_h: "Звук и погружение",
        feat2_p: "Эффекты и аккуратная обработка добавляют глубины, но не мешают истории.",
        feat3_h: "Темп и драйв",
        feat3_p: "Почти 5 часов истории, которая не провисает — с твистами, угрозами и неожиданными решениями.",

        quote: "\"Дуга не просто объект — она живая. И она смотрит на нас…\"",
        quote_text: "«Дуга не просто объект — она живая. И она смотрит на нас…»",
        quote_cite: "— из аудиокниги «Тайна Станции Дуга»",

        playlist: "Плейлист",

        platforms_title: "Где слушать",
        platforms_p: "Выберите платформу. Если добавите новые ссылки — блок автоматически сохранит стиль.",
        platform_a: "Слушать на Knigavuhe",
        platform_b: "Слушать на YouTube",
        platform_contact: "Заказать/связаться",

        support_title: "Книга бесплатная",
        support_p: "Скачайте или читайте онлайн — поддержка не требуется. Поделитесь ссылкой, если хотите.",
        support_btn1: "Донат",
        support_btn2: "Boosty / Patreon",

        donate: "Скачать книгу",
        telegram: "Читать онлайн",

        micro_note: "Подсказка: можно добавить обложку и главы — смотрите FAQ ниже.",

        faq_title: "FAQ по книге",
        faq_q1: "Книга действительно бесплатная?",
        faq_a1: "Да. Вы можете слушать и читать её бесплатно. Покупка и донат не требуются.",
        faq_q2: "О чём «Тайна Станции Дуга»?",
        faq_a2: "Атмосферная история в духе S.T.A.L.K.E.R.: Зона, тайны «Дуги», сталкеры и выбор, который меняет всё.",
        faq_q3: "Это официальная книга от GSC?",
        faq_a3: "Нет. Это фанатское произведение по мотивам вселенной S.T.A.L.K.E.R. S.T.A.L.K.E.R. — торговая марка GSC Game World.",

        contacts_title: "Контакты и соцсети",
        contacts_h: "Связаться",
        contacts_p: "Добавьте свои реальные ссылки — кнопки уже готовы.",
        share_h: "Поделиться",
        share_p: "Отправьте друзьям ссылку — это лучший способ поддержки.",
        copy: "Скопировать ссылку",

        legal_1: "S.T.A.L.K.E.R. — зарегистрированная торговая марка GSC Game World.",
        legal_2: "Демо-страница: улучшенная версия."
    },
    en: {
        skip: "Skip to content",
        nav_about: "Story",
        nav_listen: "Listen",
        nav_platforms: "Platforms",
        nav_faq: "FAQ",
        nav_contacts: "Contacts",

        hero_title: "The Secret of the Duga Station",
        hero_subtitle: "A S.T.A.L.K.E.R.-flavored audiobook: Duga’s mystery, anomalies, and human greed.",
        meta_author: "Author",
        meta_narrator: "Narrator",
        meta_duration: "Duration",
        meta_genre: "Genre",
        pills_pda: "PDA style",
        pills_3d: "Atmosphere",
        pills_fast: "Fast & accessible",

        pill_mystery: "Duga mystery",
        pill_atmo: "Post-apocalyptic",
        pill_action: "Tension",

        cta_listen: "Listen",
        cta_platforms: "Platforms",
        cta_support: "Support",
        cta_scroll: "What’s inside",

        listen_title: "Sample & player",
        listen_desc: "The player remembers progress on this device. Add chapters to turn it into a full playlist.",
        player_now: "Now:",
        player_play: "▶",
        player_pause: "❚❚",
        player_prev: "⇚",
        player_next: "⇛",
        player_add: "How to add chapters?",
        player_add_hint: "In script.js: edit TRACKS (title + file).",

        about_title: "Story in a nutshell",
        about_lead: "2017. A scientific expedition vanishes in the Zone’s core. Scientist Alexander Novikov goes after them — and all roads lead to the Duga station.",
        about_b1: "Setting: the enigmatic Duga station with a grim past and unknown capabilities.",
        about_b2: "Hero: a seasoned stalker determined to uncover the truth — no matter the danger.",
        about_b3: "Anomalies & mutants: the Zone tests every step.",
        about_b4: "The real threat isn’t only outside. People can be worse.",

        about_card1_h: "What you get",
        about_card1_p1: "A dense, focused plot — no filler.",
        about_card1_p2: "The Zone’s feel: tension, risk, and the unknown.",
        about_card2_h: "Why S.T.A.L.K.E.R. fans will click",
        about_card3_h: "Who it’s for",
        about_card3_p1: "If you like survival stories, mysteries, and dangerous places — you’re in the right spot.",
        about_card3_p2: "Newcomers are welcome too: it’s understandable without a wiki.",

        check_1: "POIs and the ‘smell’ of the Zone: anxiety, radiation, artifacts.",
        check_2: "Real characters: motives, deals, betrayal.",
        check_3: "Pacing: action scenes alternate with investigation.",

        pda_h: "PDA brief",
        pda_p1: "A quick brief on what it is, who it’s for, and the vibe you’ll get.",
        pda_p2: "Mobile-first: readable type, clear controls, fast access to platforms.",

        tag_1: "Exclusion Zone",
        tag_2: "Duga Station",
        tag_3: "Stalkers",
        tag_4: "Anomalies",

        pda_header: "PDA > Book > Duga Station",
        pda_specs: "Specs:",
        pda_duration: "Duration: 04:57:31",
        pda_narrator: "Narrator: Alexander Shestakov",
        pda_genre: "Genre: Sci‑Fi / Fantasy",
        pda_rating: "Rating: ★★★★☆",
        pda_tags: "Tags:",

        feats_title: "Why you’ll like it",
        feat1_h: "Pro narration",
        feat1_p: "Tight pacing and the Zone’s vibe — without overacting or cheap drama.",
        feat2_h: "Sound & immersion",
        feat2_p: "Careful effects add depth while keeping the story clear.",
        feat3_h: "Momentum",
        feat3_p: "Nearly 5 hours that stay engaging — twists, threats, and hard choices.",

        quote: "\"Duga isn’t just an object — it’s alive. And it’s watching us…\"",
        quote_text: "“Duga isn’t just an object — it’s alive. And it’s watching us…“",
        quote_cite: "— from the audiobook “The Secret of the Duga Station”",

        playlist: "Playlist",

        platforms_title: "Where to listen",
        platforms_p: "Pick a platform. If you add new links, the block keeps the same style.",
        platform_a: "Listen on Knigavuhe",
        platform_b: "Listen on YouTube",
        platform_contact: "Request / contact",

        support_title: "The book is free",
        support_p: "Download or read online — no support needed. Share the link if you’d like.",
        support_btn1: "Donate",
        support_btn2: "Boosty / Patreon",

        donate: "Download the book",
        telegram: "Read online",

        micro_note: "Tip: you can add a cover and chapters — see FAQ below.",

        faq_title: "Book FAQ",
        faq_q1: "Is the book really free?",
        faq_a1: "Yes. You can listen and read for free. No purchase or donations are required.",
        faq_q2: "What is “The Secret of the Duga Station” about?",
        faq_a2: "A gritty S.T.A.L.K.E.R.-style story: the Zone, the secrets of “Duga”, stalkers, and a choice that changes everything.",
        faq_q3: "Is this an official GSC book?",
        faq_a3: "No. This is a fan work inspired by the S.T.A.L.K.E.R. universe. S.T.A.L.K.E.R. is a trademark of GSC Game World.",

        contacts_title: "Contacts & socials",
        contacts_h: "Get in touch",
        contacts_p: "Add real links — the buttons are ready.",
        share_h: "Share",
        share_p: "Send the link to a friend — that’s the best support.",
        copy: "Copy link",

        legal_1: "S.T.A.L.K.E.R. is a registered trademark of GSC Game World.",
        legal_2: "Demo page: improved version."
    }
};

const LANG_KEY = "pda_lang";

function getLang() {
    const url = new URL(window.location.href);
    const qp = url.searchParams.get("lang");
    const saved = localStorage.getItem(LANG_KEY);
    const prefer = (navigator.language || "").toLowerCase().startsWith("ru") ? "ru" : "en";
    const lang = (qp || saved || prefer || "ru").toLowerCase();
    return lang === "en" ? "en" : "ru";
}

function setLang(lang) {
    const safe = lang === "en" ? "en" : "ru";
    document.documentElement.lang = safe;
    document.documentElement.dataset.lang = safe;
    localStorage.setItem(LANG_KEY, safe);

    $$('[data-i18n]').forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const dict = I18N[safe];
      const val = dict && dict[key];
      if (typeof val === "string") {
          el.textContent = val;
      }
    });


    // Title + meta description refresh
    const title = safe === "ru" ? "S.T.A.L.K.E.R. — Тайна Станции Дуга | Аудиокнига" : "S.T.A.L.K.E.R. — The Secret of the Duga Station | Audiobook";
    document.title = title;
    const desc = $("meta[name='description']");
    if (desc) {
        desc.setAttribute(
            "content",
            safe === "ru" ?
            "Аудиокнига во вселенной S.T.A.L.K.E.R.: исчезнувшая экспедиция, станция Дуга и смертельные тайны Зоны. Слушайте отрывок, выбирайте платформу и поддержите автора." :
            "A S.T.A.L.K.E.R.-flavored audiobook: a missing expedition, the Duga station, and deadly secrets of the Zone. Listen to a sample, pick a platform, and support the author."
        );
    }

    const ogLocale = $("meta[property='og:locale']");
    if (ogLocale) ogLocale.setAttribute("content", safe === "ru" ? "ru_RU" : "en_US");
}

// ---------- Audio / playlist ----------
// Add chapters here (title + file). Keep files in /assets/audio/
const TRACKS = [
    { title: "Отрывок / Sample", src: "assets/audio/sample.mp3", start: 0, end: 75 }
];

const audio = $("#book-audio");
const btnPlay = $("#playBtn");
const btnPrev = $("#prevBtn");
const btnNext = $("#nextBtn");
const progress = $("#progress");
const curTimeEl = $("#curTime");
const durTimeEl = $("#durTime");
const nowTitle = $("#nowTitle");
const list = $("#trackList");
const togglePlaylist = $("#togglePlaylist");
const playlistWrap = $("#playlistWrap");

const PLAYER_KEY = "pda_player_state";

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
}

let currentIndex = 0;
let userIsScrubbing = false;
let currentEnd = null; // seconds, for excerpts
let currentStart = 0;

function setTrack(index, { autoplay = false, seekTo = 0 } = {}) {
    const i = Math.max(0, Math.min(TRACKS.length - 1, index));
    currentIndex = i;
    const t = TRACKS[i];
    currentStart = Number.isFinite(t.start) ? t.start : 0;
    currentEnd = Number.isFinite(t.end) ? t.end : null;
    audio.src = t.src;
    nowTitle.textContent = t.title;
    updateActiveTrack();

    const onMeta = () => {
        durTimeEl.textContent = formatTime(audio.duration);
        const desired = Math.max(currentStart || 0, seekTo || 0);
        if (desired > 0 && desired < audio.duration) audio.currentTime = desired;
        if (currentEnd && currentEnd < audio.duration) {
            // ensure we don't start beyond the excerpt end
            if (audio.currentTime >= currentEnd) audio.currentTime = Math.max(0, currentEnd - 0.5);
        }
        if (autoplay) audio.play().catch(() => {});
        audio.removeEventListener("loadedmetadata", onMeta);
    };
    audio.addEventListener("loadedmetadata", onMeta);
}

function updateActiveTrack() {
    $$("[data-track]").forEach((btn) => {
        const idx = Number(btn.getAttribute("data-track"));
        btn.classList.toggle("active", idx === currentIndex);
        btn.setAttribute("aria-current", idx === currentIndex ? "true" : "false");
    });
}

function renderPlaylist() {
    list.innerHTML = "";
    TRACKS.forEach((t, idx) => {
        const li = document.createElement("li");
        li.className = "track";
        const b = document.createElement("button");
        b.type = "button";
        b.className = "track-btn";
        b.textContent = t.title;
        b.setAttribute("data-track", String(idx));
        b.addEventListener("click", () => setTrack(idx, { autoplay: true }));
        li.appendChild(b);
        list.appendChild(li);
    });
    updateActiveTrack();
}

function setPlaying(isPlaying) {
    btnPlay.setAttribute("aria-pressed", String(isPlaying));
    btnPlay.textContent = isPlaying ? I18N[getLang()].player_pause : I18N[getLang()].player_play;
}

function saveState() {
    try {
        localStorage.setItem(
            PLAYER_KEY,
            JSON.stringify({
                idx: currentIndex,
                t: Math.floor(audio.currentTime || 0),
                ts: Date.now()
            })
        );
    } catch (e) {
        // ignore
    }
}

function loadState() {
    try {
        const raw = localStorage.getItem(PLAYER_KEY);
        if (!raw) return null;
        const s = JSON.parse(raw);
        if (!s || typeof s.idx !== "number") return null;
        return s;
    } catch (e) {
        return null;
    }
}

function updateProgress() {
    if (!audio.duration || userIsScrubbing) return;
    const p = (audio.currentTime / audio.duration) * 100;
    progress.value = String(Math.max(0, Math.min(100, p)));
    curTimeEl.textContent = formatTime(audio.currentTime);
    if (currentEnd && audio.currentTime >= currentEnd) {
        audio.pause();
        audio.currentTime = Math.max(currentStart || 0, currentEnd - 0.01);
    }
    saveState();
}

function seekFromProgress() {
    if (!audio.duration) return;
    const p = Number(progress.value || 0) / 100;
    audio.currentTime = p * audio.duration;
    curTimeEl.textContent = formatTime(audio.currentTime);
    if (currentEnd && audio.currentTime >= currentEnd) {
        audio.pause();
        audio.currentTime = Math.max(currentStart || 0, currentEnd - 0.01);
    }
    saveState();
}

function next() {
    const ni = (currentIndex + 1) % TRACKS.length;
    setTrack(ni, { autoplay: !audio.paused });
}

function prev() {
    const pi = (currentIndex - 1 + TRACKS.length) % TRACKS.length;
    setTrack(pi, { autoplay: !audio.paused });
}

// ---------- UX bits ----------
function setupScrollReveal() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const items = $$('[data-reveal]');
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add("reveal-in");
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.15 }
    );
    items.forEach((el) => io.observe(el));
}

function setupCopyLink() {
    const btn = $("#copyLink");
    const hint = $("#copyHint");
    if (!btn) return;

    btn.addEventListener("click", async() => {
        const url = window.location.href.split("#")[0];
        try {
            await navigator.clipboard.writeText(url);
            hint.textContent = getLang() === "ru" ? "Ссылка скопирована ✔" : "Link copied ✔";
        } catch (e) {
            hint.textContent = getLang() === "ru" ? "Не удалось. Скопируйте вручную." : "Could not copy. Please copy manually.";
        }
        setTimeout(() => (hint.textContent = ""), 2200);
    });
}

function setupScanToggle() {
    const btn = $("#toggleScan");
    const key = "pda_scan";
    const saved = localStorage.getItem(key);
    const on = saved ? saved === "1" : true;
    document.body.classList.toggle("scanlines", on);
    if (btn) btn.setAttribute("aria-pressed", String(on));

    if (btn) btn.addEventListener("click", () => {
        const nextOn = !document.body.classList.contains("scanlines");
        document.body.classList.toggle("scanlines", nextOn);
        btn.setAttribute("aria-pressed", String(nextOn));
        localStorage.setItem(key, nextOn ? "1" : "0");
    });
}

function setupLangToggle() {
    const btn = $("#langToggle");
    if (btn) btn.addEventListener("click", () => {
        const next = getLang() === "ru" ? "en" : "ru";
        setLang(next);
        // Refresh play button label after i18n
        setPlaying(!audio.paused);
    });
}

function setupFooterYear() {
    const y = $("#year");
    if (y) y.textContent = String(new Date().getFullYear());
}

function setupServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js").catch(() => {});
    });
}

// ---------- init ----------
document.addEventListener("DOMContentLoaded", () => {
    setLang(getLang());
    setupLangToggle();
    setupScanToggle();
    setupCopyLink();
    setupFooterYear();
    setupScrollReveal();
    setupServiceWorker();

    // Playlist
    renderPlaylist();

    // Restore
    const state = loadState();
    if (state) {
        setTrack(state.idx, { autoplay: false, seekTo: state.t || 0 });
        curTimeEl.textContent = formatTime(state.t || 0);
    } else {
        setTrack(0);
    }

    // Player controls
    btnPlay.addEventListener("click", () => {
        if (audio.paused) {
            // If excerpt ended, restart from excerpt start
            if (currentEnd && audio.currentTime >= currentEnd - 0.05) audio.currentTime = currentStart || 0;
            audio.play().catch(() => {});
        } else {
            audio.pause();
        }
    });
    btnPrev.addEventListener("click", prev);
    btnNext.addEventListener("click", next);

    audio.addEventListener("play", () => setPlaying(true));
    audio.addEventListener("pause", () => setPlaying(false));
    audio.addEventListener("ended", () => {
        setPlaying(false);
        next();
    });
    audio.addEventListener("timeupdate", updateProgress);

    audio.addEventListener("loadedmetadata", () => {
        durTimeEl.textContent = formatTime(audio.duration);
    });

    progress.addEventListener("pointerdown", () => (userIsScrubbing = true));
    progress.addEventListener("pointerup", () => {
        userIsScrubbing = false;
        seekFromProgress();
    });
    progress.addEventListener("input", () => {
        userIsScrubbing = true;
        seekFromProgress();
    });

    // Playlist UI toggle
    if (togglePlaylist) togglePlaylist.addEventListener("click", () => {
        const expanded = togglePlaylist.getAttribute("aria-expanded") === "true";
        togglePlaylist.setAttribute("aria-expanded", String(!expanded));
        playlistWrap.hidden = expanded;
    });
});
