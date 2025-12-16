    const confessions = [
      {
        alias: "Spectre_27",
        content: "Je fais semblant d’être forte pour tout le monde, mais chaque soir je pleure en silence parce que j’ai peur de décevoir.",
        tags: ["vulnérabilité"],
        mood: "intense",
        minutesAgo: 4
      },
      {
        alias: "Nébuleuse",
        content: "J’ai retrouvé la lettre que je n’ai jamais envoyée à mon premier amour. Je la relis encore parfois, juste pour me rappeler qui j’étais.",
        tags: ["nostalgie", "amour"],
        mood: "doux",
        minutesAgo: 12
      },
      {
        alias: "Énigme",
        content: "Je ne sais pas comment dire à mes parents que ce n’est pas le métier dont je rêve. Je voudrais partir, mais j’ai peur de briser leur espoir.",
        tags: ["famille", "peur"],
        mood: "sombre",
        minutesAgo: 18
      },
      {
        alias: "Velours",
        content: "J’ai enfin dit non à quelqu’un aujourd’hui. C’était juste un café, mais pour moi c’était une révolution silencieuse.",
        tags: ["fierté", "libération"],
        mood: "lumineux",
        minutesAgo: 26
      },
      {
        alias: "Anonyme",
        content: "Je garde un carnet rempli de toutes les idées de romans que je n’écrirai jamais. Peut-être qu’en les confiant ici, j’aurai le courage de commencer.",
        tags: ["créativité"],
        mood: "rêveur",
        minutesAgo: 35
      },
      {
        alias: "Sillage",
        content: "Chaque fois que je mens pour me protéger, je sens que je m’éloigne un peu plus de la personne que je voudrais être.",
        tags: ["culpabilité"],
        mood: "intense",
        minutesAgo: 42
      },
      {
        alias: "Écho_42",
        content: "J’ai toujours rêvé d’être artiste, mais j’ai choisi un métier stable. Maintenant, je me demande si j’ai sacrifié mon bonheur pour la sécurité.",
        tags: ["rêves", "choix"],
        mood: "mélancolique",
        minutesAgo: 58
      },
      {
        alias: "Ombre_Lunaire",
        content: "Je collectionne les compliments que je reçois, parce que je n’arrive pas à croire en moi-même sans validation extérieure.",
        tags: ["confiance", "validation"],
        mood: "fragile",
        minutesAgo: 67
      },
      {
        alias: "Cipher_X",
        content: "J’ai aidé un ami dans le besoin, mais je regrette de ne pas avoir demandé d’aide quand j’en avais besoin moi-même.",
        tags: ["amitié", "orgueil"],
        mood: "réfléchi",
        minutesAgo: 74
      },
      {
        alias: "Nova_∞",
        content: "Chaque année, je fais la même résolution : être plus gentil avec moi-même. Et chaque année, j’échoue.",
        tags: ["auto-compassion"],
        mood: "déçu",
        minutesAgo: 81
      }
    ];

    const emojis = ["✧", "☾", "✦", "♢", "★"];
    const reactionTypes = [
      { label: "Je ressens", icon: "✨" },
      { label: "Je comprends", icon: "🤍" },
      { label: "Courage", icon: "🪽" }
    ];
    // Chargement des confessions utilisateur
    let userConfessions = JSON.parse(localStorage.getItem('userConfessions')) || [];
    let allConfessions = [...confessions, ...userConfessions];
    let filteredConfessions = [...allConfessions];
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    function renderConfessions(confList = filteredConfessions) {
      confessionGrid.innerHTML = "";
      confessions.forEach((confession, index) => {
        const card = document.createElement("article");
        card.className = "confession-card";

        const meta = document.createElement("div");
        meta.className = "confession-meta";
        meta.innerHTML = `
          <span class="alias"><span>${emojis[index % emojis.length]}</span>${confession.alias}</span>
          <span>il y a ${confession.minutesAgo} min</span>
        `;

        const text = document.createElement("p");
        text.className = "confession-text";
        text.textContent = confession.content;

        const tags = document.createElement("div");
        tags.className = "confession-tags";
        confession.tags.forEach(tag => {
          const chip = document.createElement("span");
          chip.textContent = "#" + tag;
          tags.appendChild(chip);
        });

        const actions = document.createElement("div");
        actions.className = "confession-actions";

        // Boutons favoris et partager
        const extraActions = document.createElement("div");
        extraActions.className = "extra-actions";

        const favoriteBtn = document.createElement("button");
        favoriteBtn.className = "action-btn favorite-btn";
        favoriteBtn.innerHTML = favorites.includes(confession.content) ? "❤️" : "🤍";
        favoriteBtn.title = "Ajouter aux favoris";
        favoriteBtn.addEventListener("click", () => {
          toggleFavorite(confession.content);
          favoriteBtn.innerHTML = favorites.includes(confession.content) ? "❤️" : "🤍";
        });

        const shareBtn = document.createElement("button");
        shareBtn.className = "action-btn share-btn";
        shareBtn.innerHTML = "📤";
        shareBtn.title = "Partager";
        shareBtn.addEventListener("click", () => shareConfession(confession));

        extraActions.appendChild(favoriteBtn);
        extraActions.appendChild(shareBtn);
        actions.appendChild(reactionGroup);
        actions.appendChild(extraActions);

        card.appendChild(meta);
        card.appendChild(text);
        if (confession.tags.length) card.appendChild(tags);
        card.appendChild(actions);
                { transform: "translateY(0)" },
                { transform: "translateY(-6px)" },
                { transform: "translateY(0)" }
              ],
              { duration: 280, easing: "ease-out" }
            );
          });
          reactionGroup.appendChild(btn);
        });

        actions.appendChild(reactionGroup);

        const mood = document.createElement("span");
        mood.textContent = `Intensité : ${confession.mood}`;
        mood.style.fontStyle = "italic";
        mood.style.color = "rgba(148,163,184,0.8)";
        actions.appendChild(mood);

        card.appendChild(meta);
        card.appendChild(text);
        if (confession.tags.length) card.appendChild(tags);
        card.appendChild(actions);

        confessionGrid.appendChild(card);

        // Reveal animation
        setTimeout(() => {
          card.classList.add("revealed");
        }, 80 * index);
      });
    }

    // Fonction de recherche et filtrage
    function filterConfessions(query = '', tag = '') {
      let filtered = [...confessions];

      if (query.trim()) {
        const lowerQuery = query.toLowerCase();
        filtered = filtered.filter(confession =>
          confession.content.toLowerCase().includes(lowerQuery) ||
          confession.tags.some(t => t.toLowerCase().includes(lowerQuery)) ||
          confession.alias.toLowerCase().includes(lowerQuery)
        );
      }

      if (tag) {
        filtered = filtered.filter(confession =>
          confession.tags.some(t => t === tag)
        );
      }

      filteredConfessions = filtered;
      renderConfessions();
      document.querySelectorAll(".confession-card").forEach(card => observer.observe(card));
    }

    renderConfessions();

    // Intersection observer pour révélation progressive
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".confession-card").forEach(card => observer.observe(card));

    // Générateur d'alias
    const aliasPrefixes = ["Spectre", "Halo", "Ombre", "Éclipse", "Velours", "Cipher", "Lueur"];
    const aliasSuffixes = ["27", "LX", "Nova", "∞", "Nocturne", "Alpha", "Δ"];

    function generateAlias() {
      const prefix = aliasPrefixes[Math.floor(Math.random() * aliasPrefixes.length)];
      const suffix = aliasSuffixes[Math.floor(Math.random() * aliasSuffixes.length)];
      return `${prefix}_${suffix}`;
    }

    const aliasInput = document.querySelector('input[name="alias"]');
    aliasInput.placeholder = `Alias furtif (ex : ${generateAlias()})`;

    // Compteur de caractères
    const textarea = document.querySelector('textarea[name="content"]');
    const charCount = document.getElementById('char-count');

    textarea.addEventListener('input', () => {
      const length = textarea.value.length;
      charCount.textContent = length;
      if (length > 450) {
        charCount.style.color = 'var(--accent-3)';
      } else {
        charCount.style.color = 'var(--accent-1)';
      }
    });

    // Scroll vers formulaire + pop-in
    const openFormBtn = document.getElementById("open-form");
    const submitPanel = document.getElementById("submitPanel");

    openFormBtn.addEventListener("click", () => {
    // Modal
    const modal = document.getElementById('modal');
    const openFormBtn = document.getElementById("open-form");
    const closeModalBtn = document.getElementById('close-modal');

    openFormBtn.addEventListener('click', () => {
      modal.style.display = 'block';
      document.querySelector('textarea').focus();
    });

    closeModalBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });m.addEventListener("submit", event => {
      event.preventDefault();
      const formData = new FormData(form);
      const content = formData.get("content")?.toString().trim();
      if (!content) return;

      const tagValue = formData.get("tag")?.toString().trim();
      const aliasValue = formData.get("alias")?.toString().trim() || generateAlias();
      const moodValue = formData.get("mood");
      let moodLabel = "modéré";
      if (moodValue > 66) moodLabel = "intense";
      else if (moodValue < 33) moodLabel = "doux";

      confessions.unshift({
      submitPanel.animate(
        [
          { transform: "translateY(0)" },
          { transform: "translateY(-6px)" },
          { transform: "translateY(0)" }
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Recherche
    const searchInput = document.getElementById('search-input');
    const clearSearchBtn = document.getElementById('clear-search');
    const tagFilter = document.getElementById('tag-filter');

    searchInput.addEventListener('input', (e) => {
      filterConfessions(e.target.value, tagFilter.value);
    });

    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      filterConfessions('', tagFilter.value);
    });

    tagFilter.addEventListener('change', (e) => {
      filterConfessions(searchInput.value, e.target.value);
    });

    // Boutons supplémentaires
    const clearFiltersBtn = document.getElementById('clear-filters');
    const randomConfessionBtn = document.getElementById('random-confession');

    clearFiltersBtn.addEventListener('click', () => {
      searchInput.value = '';
      tagFilter.value = '';
      filterConfessions('', '');
    });

    // Basculement thème avec auto-détection
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Vérifier le thème sauvegardé ou auto
    randomConfessionBtn.addEventListener('click', () => {
      if (filteredConfessions.length === 0) return;
      const randomIndex = Math.floor(Math.random() * filteredConfessions.length);
      const cards = document.querySelectorAll('.confession-card');
      if (cards[randomIndex]) {
        cards[randomIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Animation de surbrillance
        cards[randomIndex].animate(
          [
            { boxShadow: '0 0 0 0 rgba(56,189,248,0.7)' },
            { boxShadow: '0 0 0 10px rgba(56,189,248,0)' }
          ],
          { duration: 1000, easing: 'ease-out' }
        );
      }
    });

    // Accessibilité : raccourcis clavier
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
      }
      if (e.key === 'Escape') {
        // Fermer modal si ouvert
        const modal = document.getElementById('modal');
        if (modal.style.display === 'block') {
          modal.style.display = 'none';
        }
      }
    });hemeToggle.textContent = isLight ? '☀️' : '🌙';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });st themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Vérifier le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      body.classList.add('light-mode');
      themeToggle.textContent = '☀️';
    } else {
      themeToggle.textContent = '🌙';
    }

    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      const isLight = body.classList.contains('light-mode');
      themeToggle.textContent = isLight ? '☀️' : '🌙';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      form.reset();
      aliasInput.placeholder = `Alias furtif (ex : ${generateAlias()})`;

      // Animation de succès
      const successMsg = document.createElement('div');
      successMsg.textContent = 'Confession publiée avec succès !';
      successMsg.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--accent-1);
        color: #0b1120;
        padding: 1rem 2rem;
        border-radius: 20px;
        font-weight: bold;
        z-index: 10001;
        animation: fadeIn 0.5s ease;
      `;
      document.body.appendChild(successMsg);
      setTimeout(() => {
        successMsg.remove();
      }, 3000);

      modal.style.display = 'none';
    });

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });enderConfessions();
      document.querySelectorAll(".confession-card").forEach(card => observer.observe(card));

      form.reset();
      aliasInput.placeholder = `Alias furtif (ex : ${generateAlias()})`;

      submitPanel.animate(
        [
          { transform: "translateY(0)" },
          { transform: "translateY(-6px)" },
          { transform: "translateY(0)" }
        ],
        { duration: 320, easing: "ease-out" }
      );
    });
