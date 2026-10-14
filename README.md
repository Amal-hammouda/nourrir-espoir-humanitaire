# Nourrir l’Espoir Humanitaire

Site vitrine statique en français, réalisé en HTML5, CSS3 et JavaScript sans framework ni service externe obligatoire.

## Lancer le site

Dans un terminal ouvert dans ce dossier (`outputs`), lancez :

```powershell
py -m http.server 8000
```

Puis ouvrez [http://localhost:8000](http://localhost:8000). La page d’accueil est `index.html` ; la page de présentation et des membres est `about.html`.

## Organisation

- `index.html` : accueil, programmes proposés, annonces, vidéo, formulaire de participation et contacts.
- `about.html` : mission, profils interactifs et galerie des six membres.
- `style.css` : identité visuelle, affichage responsive, interactions visuelles et accessibilité.
- `script.js` : menu mobile, révélations au défilement, choix des profils, annonces, coordonnées et formulaire de démonstration.
- `assets/site-config.js` : coordonnées de démonstration et chemin facultatif de la vidéo.
- `assets/icons.svg` : bibliothèque locale de pictogrammes SVG.
- `assets/images/` : logo, portraits reçus, favicon et illustrations photographiques de stock optimisées en WebP.
- `assets/videos/` : emplacement pour une vidéo autorisée de l’association (instructions dans son README).

## Personnes et images

Le logo et les cinq portraits reçus sont conservés. Les portraits correspondent aux noms communiqués : Zeineb, Affes, Akram, Kader et Azer. Aucune photo de Ramzi n’a été fournie ; il est présenté avec un avatar graphique au monogramme « R » et une icône de personne, sans visage généré.

Les photos d’illustration de stock sont des exemples visuels, pas des reportages sur l’association. Elles sont identifiées dans les légendes. Sources :

- Préparation alimentaire — cottonbro studio, [Pexels](https://www.pexels.com/photo/people-preparing-food-rations-in-the-box-6590928/).
- Collecte alimentaire — cottonbro studio, [Pexels](https://www.pexels.com/photo/volunteers-boxing-foods-to-be-distributed-6591165/).
- Tri de vêtements — Julia M Cameron, [Pexels](https://www.pexels.com/photo/people-sorting-donations-6994965/).
- Visite de convivialité — RDNE Stock project, [Pexels](https://www.pexels.com/photo/volunteer-men-having-conversation-to-an-elderly-man-6647035/).
- Soutien communautaire — OfficialDesign Africa, [Pexels](https://www.pexels.com/photo/community-outreach-volunteer-distributing-supplies-35043644/).

Les visuels ont été récupérés et optimisés localement. Les images et vidéos Pexels sont proposées sous la [licence Pexels](https://www.pexels.com/license/). Les légendes précisent explicitement qu’elles ne montrent pas une action de l’association.

## Réglages à effectuer avant publication

- `assets/site-config.js` contient les coordonnées fictives fournies pour la maquette. Remplacez numéro, e-mail, adresse, identifiant et URL Instagram après vérification. Le compte Instagram de démonstration n’est pas présenté comme actif.
- Le formulaire contrôle les champs dans le navigateur et affiche une confirmation de démonstration. Aucune donnée n’est envoyée ni enregistrée. Un service de formulaire ou un backend sera nécessaire pour recevoir de vraies demandes.
- Une vidéo de l’association n’a pas été fournie. Le lecteur est préparé, mais reste remplacé par une image d’illustration et un message explicatif tant que `video.src` reste vide. Voir `assets/videos/README.md` pour l’activer.
- Les initiatives et annonces décrivent des projets proposés ; leurs dates, modalités, financement, capacité et réalisation restent à confirmer.
- Aucun moyen de paiement ou compte bancaire n’est intégré. Les modalités réelles de don doivent être ajoutées après confirmation par l’association.
