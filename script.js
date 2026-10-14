(() => {
  "use strict";

  document.body.classList.add("has-js");

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-nav");

  if (menuButton && navigation) {
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Ouvrir le menu");
      navigation.classList.remove("is-open");
    };

    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Ouvrir le menu" : "Fermer le menu");
      navigation.classList.toggle("is-open", !isOpen);
    });

    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const members = {
    zeineb: { name: "Zeineb", role: "Cheffe de projet", number: "01 / 06", image: "assets/images/zaineb.jpeg", alt: "Portrait de Zeineb", note: "Rôle communiqué par l’association. Cette présentation pourra être complétée avec son accord." },
    affes: { name: "Affes", role: "Trésorier", number: "02 / 06", image: "assets/images/affes.jpeg", alt: "Portrait d’Affes", note: "Rôle communiqué par l’association. Cette présentation pourra être complétée avec son accord." },
    akram: { name: "Akram", role: "Chef de média", number: "03 / 06", image: "assets/images/akram.jpeg", alt: "Portrait d’Akram", note: "Rôle communiqué par l’association. Cette présentation pourra être complétée avec son accord." },
    kader: { name: "Kader", role: "Chef de protocole", number: "04 / 06", image: "assets/images/kader.jpeg", alt: "Portrait de Kader", note: "Rôle communiqué par l’association. Cette présentation pourra être complétée avec son accord." },
    azer: { name: "Azer", role: "Responsable de recrutement", number: "05 / 06", image: "assets/images/azer.jpeg", alt: "Portrait d’Azer", note: "Rôle communiqué par l’association. Cette présentation pourra être complétée avec son accord." },
    ramzi: { name: "Ramzi", role: "Responsable de communication", number: "06 / 06", image: null, alt: "", note: "Aucun portrait n’a été transmis. Cet avatar graphique au monogramme R est un repère visuel, pas une photo." }
  };

  const profileImage = document.querySelector("#profile-image");
  const profilePlaceholder = document.querySelector("#profile-placeholder");
  const profileName = document.querySelector("#profile-name");
  const profileRole = document.querySelector("#profile-role");
  const profileNumber = document.querySelector("#profile-number");
  const profileDescription = document.querySelector("#profile-description");
  function selectMember(key, shouldScroll = false) {
    const member = members[key];
    if (!member || !profileName) return;

    document.querySelectorAll(".member-choice").forEach((button) => {
      const selected = button.dataset.member === key;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    profileName.textContent = member.name;
    profileRole.textContent = member.role;
    profileNumber.textContent = member.number;
    profileDescription.textContent = member.note;

    if (member.image) {
      profileImage.hidden = false;
      profileImage.src = member.image;
      profileImage.alt = member.alt;
      profileImage.dataset.member = key;
      profilePlaceholder.hidden = true;
      profileImage.style.animation = "none";
      void profileImage.offsetWidth;
      profileImage.style.animation = "";
    } else {
      profileImage.hidden = true;
      profilePlaceholder.hidden = false;
    }
    profileName.style.animation = "none";
    void profileName.offsetWidth;
    profileName.style.animation = "";

    if (shouldScroll) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.querySelector(".member-explorer")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    }
  }

  document.querySelectorAll("[data-member]").forEach((control) => {
    control.addEventListener("click", (event) => {
      const fromTile = event.currentTarget.classList.contains("member-tile");
      selectMember(control.dataset.member, fromTile);
    });
  });

  const requestedMember = new URLSearchParams(window.location.search).get("member");
  if (requestedMember && Object.hasOwn(members, requestedMember)) selectMember(requestedMember);

  const events = {
    collecte: { title: "Collecte solidaire", text: "Une collecte de produits essentiels pourrait être organisée à partir des besoins confirmés par l’association. Les lieux, dates et modalités restent à définir." },
    repas: { title: "Un repas partagé", text: "Un temps convivial autour d’un repas pourrait réunir les personnes soutenues, les bénévoles et les membres de l’association. La date et l’organisation restent à confirmer." },
    benevoles: { title: "Rencontre bénévoles", text: "Une rencontre pourrait permettre de présenter l’association et d’échanger avec les personnes intéressées. Les modalités d’inscription seront communiquées par l’équipe." }
  };
  const eventDialog = document.querySelector(".event-dialog");
  if (eventDialog) {
    const dialogTitle = eventDialog.querySelector("#event-dialog-title");
    const dialogDescription = eventDialog.querySelector(".dialog-description");
    const closeButton = eventDialog.querySelector(".dialog-close");
    let lastTrigger = null;

    document.querySelectorAll("[data-open-event]").forEach((button) => {
      button.addEventListener("click", () => {
        const eventInfo = events[button.dataset.openEvent];
        if (!eventInfo) return;
        lastTrigger = button;
        dialogTitle.textContent = eventInfo.title;
        dialogDescription.textContent = eventInfo.text;
        eventDialog.showModal();
      });
    });

    closeButton?.addEventListener("click", () => eventDialog.close());
    eventDialog.addEventListener("click", (event) => {
      if (event.target === eventDialog) eventDialog.close();
    });
    eventDialog.addEventListener("close", () => lastTrigger?.focus());
    eventDialog.querySelector("a")?.addEventListener("click", () => eventDialog.close());
  }

  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const siteConfig = window.NOURRIR_SITE_CONFIG || {};
  const contactConfig = siteConfig.contact || {};
  const contactValues = {
    phone: contactConfig.phone,
    email: contactConfig.email,
    address: contactConfig.address,
    instagramHandle: contactConfig.instagramHandle
  };
  document.querySelectorAll("[data-contact-value]").forEach((node) => {
    const key = node.dataset.contactValue;
    if (contactValues[key]) {
      const externalArrow = node.querySelector("[aria-hidden='true']");
      node.textContent = contactValues[key];
      if (key === "instagramHandle" && externalArrow) {
        externalArrow.textContent = " ↗";
        node.append(externalArrow);
      }
    }
    if (key === "phone" && contactConfig.phoneHref) node.href = contactConfig.phoneHref;
    if (key === "email" && contactConfig.emailHref) node.href = contactConfig.emailHref;
    if (key === "instagramHandle" && contactConfig.instagramUrl) {
      node.href = contactConfig.instagramUrl;
      node.target = "_blank";
      node.rel = "noopener noreferrer";
    }
  });

  const joinForm = document.querySelector("#join-form");
  const joinType = document.querySelector("#join-type");
  const joinStatus = document.querySelector("#join-status");
  document.querySelectorAll("[data-join-type]").forEach((link) => {
    link.addEventListener("click", () => {
      if (joinType && [...joinType.options].some((option) => option.value === link.dataset.joinType)) {
        joinType.value = link.dataset.joinType;
      }
    });
  });

  if (joinForm && joinStatus) {
    const requiredMessages = {
      nom: "Veuillez renseigner votre nom.",
      prenom: "Veuillez renseigner votre prénom.",
      email: "Veuillez renseigner votre adresse e-mail.",
      participation: "Veuillez choisir un type de participation."
    };
    joinForm.querySelectorAll("input[required], select[required]").forEach((field) => {
      field.addEventListener("invalid", () => {
        const message = field.validity.typeMismatch
          ? "Veuillez saisir une adresse e-mail valide."
          : requiredMessages[field.name] || "Veuillez vérifier ce champ.";
        field.setCustomValidity(message);
      });
      field.addEventListener("input", () => field.setCustomValidity(""));
      field.addEventListener("change", () => field.setCustomValidity(""));
    });

    joinForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!joinForm.reportValidity()) return;

      const firstName = new FormData(joinForm).get("prenom").trim();
      const chosenType = joinType?.selectedOptions[0]?.textContent.trim() || "participation";
      joinStatus.textContent = `Merci ${firstName}. Votre choix (« ${chosenType} ») a été vérifié dans cette maquette locale. Aucune demande n’a été envoyée ni enregistrée.`;
      joinStatus.hidden = false;
      joinStatus.focus({ preventScroll: true });
    });
  }

  const video = document.querySelector("#association-video");
  const videoPlaceholder = document.querySelector("[data-video-placeholder]");
  const videoDialog = document.querySelector("#video-dialog");
  if (video && videoPlaceholder && siteConfig.video?.src) {
    const source = document.createElement("source");
    source.src = siteConfig.video.src;
    source.type = siteConfig.video.type || "video/mp4";
    video.append(source);
    if (siteConfig.video.poster) video.poster = siteConfig.video.poster;
    video.hidden = false;
    videoPlaceholder.hidden = true;
    video.load();
    video.addEventListener("error", () => {
      video.hidden = true;
      videoPlaceholder.hidden = false;
    });
  }

  if (videoDialog) {
    const videoTrigger = document.querySelector("[data-video-notice]");
    const closeButtons = videoDialog.querySelectorAll(".dialog-close, .dialog-close-action");
    let lastVideoTrigger = null;
    videoTrigger?.addEventListener("click", () => {
      lastVideoTrigger = videoTrigger;
      videoDialog.showModal();
    });
    closeButtons.forEach((button) => button.addEventListener("click", () => videoDialog.close()));
    videoDialog.addEventListener("click", (event) => {
      if (event.target === videoDialog) videoDialog.close();
    });
    videoDialog.addEventListener("close", () => lastVideoTrigger?.focus());
  }

})();
