---
title: Comment installer
translationKey: startusing
layout: 'layouts/base.njk'
eleventyNavigation:
  key: startusingFR
  title: Comment installer
  locale: fr
  order: 2
date: 'git Last Modified'
---

# Comment installer <code>&lt;gcds-ext-map&gt;</code>

Un composant d'extension cartographique du Système de design du gouvernement du Canada (Système de design GC) qui offre un visualiseur de carte Web accessible et normalisé grâce à <gcds-link href="https://geo.ca/initiatives/mapml/" external>MapML</gcds-link>.

## Installation

Installer et utiliser localement :

```bash
npm install @gcds-extensions/map
```

## Vérifier votre installation

Exécutez :

```bash
npx http-server node_modules/@gcds-extensions/map -p 8080 -c-1
```

Ouvrez <gcds-link href="http://localhost:8080/demo/" external>http://localhost:8080/demo/</gcds-link> &mdash; vous devriez voir une carte interactive.

## Facultatif : installer les compétences de balisage

Le paquet inclut un ensemble de <gcds-link href="https://agentskills.io/" external>compétences d'agent (Agent Skills)</gcds-link> qui apprennent à un assistant de codage IA (comme GitHub Copilot dans VS Code) à produire un balisage correct pour `<gcds-ext-map>` et pour chacun de ses éléments enfants &mdash; `<map-layer>`, `<map-extent>`, `<map-input>`, `<map-link>`, `<map-feature>`, et ainsi de suite. L'installation du paquet n'ajoute **pas** ces compétences à votre projet. Pour les y copier, exécutez la commande suivante à la racine de votre projet :

```bash
npx gcds-ext-map-skills
```

La commande crée le dossier `.github/skills/` au besoin, y copie un dossier par élément (en écrasant les fichiers du même nom, sans toucher au reste de votre projet) et affiche le chemin de destination. Redémarrez ensuite votre éditeur afin que votre assistant découvre les nouvelles compétences &mdash; dans VS Code, appuyez sur <kbd>Ctrl</kbd> + <kbd>Maj</kbd> + <kbd>P</kbd> (<kbd>Cmd</kbd> + <kbd>Maj</kbd> + <kbd>P</kbd> sur macOS) et exécutez **Developer: Reload Window**.

Comme le dossier `.github/skills/` est partagé avec les compétences d'autres paquets et les vôtres, chaque compétence fournie est étiquetée avec le nom du paquet dont elle provient. Pour retirer uniquement les compétences installées par ce paquet, exécutez :

```bash
npx gcds-ext-map-skills --remove
```

<hr class="my-600" />

## Utilisation

### Exemple de base

Ajoutez la balise `script` suivante à la section `<head>` de votre page pour charger le composant de carte à partir de votre dossier local `node_modules` :

```html
<script type="module" src="../dist/gcds-ext-map/gcds-ext-map.esm.js"></script>
```

Facultativement, pour utiliser l'ensemble des composants de Système de design GC, ajoutez également :

```html
<script type="module" src="../../../@gcds-core/components/dist/gcds/gcds.esm.js"></script>
<link rel="stylesheet" href="../../../@gcds-core/components/dist/gcds/gcds.css">
```

Utilisez ensuite le composant dans votre balisage (utilisez CSS pour définir sa largeur et sa hauteur, car la taille par défaut est plutôt petite) :

```html
<gcds-ext-map projection="CBMTILE" lat="45.4215" lon="-75.6972" zoom="10"  controlslist="static" static controls style="width: 60%; height: 400px">
  <map-layer checked>
    <map-title>Canada Base Map - Transportation (CBMT)</map-title>
    <map-link rel="license" href="https://open.canada.ca/en/open-government-licence-canada" title="Open Government Licence - Canada"></map-link>
    <map-link rel="suggestions" tref="https://geolocator.api.geo.ca/?q={searchTerms}&lang=en&keys=geonames"></map-link>
    <map-link rel="search" tref="https://geolocator.api.geo.ca/?q={searchTerms}&lang=en&keys=geonames"></map-link>
    <map-extent units="CBMTILE" checked hidden>
      <map-input name="z" type="zoom" value="22" min="0" max="22"></map-input>
      <map-input name="xmin" type="location" units="pcrs" position="top-left" axis="easting" min="-3262924.7" max="3823954.0"></map-input>
      <map-input name="ymin" type="location" units="pcrs" position="bottom-left" axis="northing" min="-1554977.6" max="4046262.8"></map-input>
      <map-input name="xmax" type="location" units="pcrs" position="top-right" axis="easting" min="-3262924.7" max="3823954.0"></map-input>
      <map-input name="ymax" type="location" units="pcrs" position="top-left" axis="northing" min="-1554977.6" max="4046262.8"></map-input>
      <map-input name="w" type="width"></map-input>
      <map-input name="h" type="height"></map-input>
      <map-link rel="image" tref="https://geogratis.gc.ca/maps/CBMT?SERVICE=WMS&VERSION=1.1.1&SRS=EPSG:3978&LAYERS=CBMT&BBOX={xmin},{ymin},{xmax},{ymax}&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=TRUE&WIDTH={w}&HEIGHT={h}&STYLES="></map-link>
    </map-extent>
  </map-layer>
</gcds-ext-map>
```

Consultez la [documentation des composants cartographiques](/fr/composants/map/) pour d'autres exemples d'utilisation.

<hr class="my-600" />

## Utilisation à partir d'un CDN

Vous pouvez aussi charger le composant directement à partir d'un CDN :

```html
<script type="module" src="https://cdn.design-system.canada.ca/@gcds-extensions/map@latest/dist/gcds-ext-map.esm.js"></script>
<link rel="stylesheet" href="https://cdn.design-system.canada.ca/@gcds-core/components@latest/dist/gcds/gcds.css">
<script type="module" src="https://cdn.design-system.canada.ca/@gcds-core/components@latest/dist/gcds/gcds.esm.js"></script>
```

<hr class="my-600" />

## Architecture

Le composant `<gcds-ext-map>` remplace l'utilisation de l'élément `<mapml-viewer>`. Consultez la <gcds-link href="https://maps4html.org/web-map-doc/" external>documentation MapML</gcds-link> pour savoir comment utiliser MapML. Avec Système de design GC, utilisez `<gcds-ext-map>` à la place de `<mapml-viewer>` (il prend en charge les mêmes attributs). Tous les autres éléments MapML fonctionnent tels que décrits.

`<gcds-ext-map>` et les éléments enfants MapML associés sont implémentés comme des composants Stencil, à l'instar des autres composants de Système de design GC. `<gcds-ext-map>` est un composant autonome qui rend le contenu cartographique dans une racine fantôme (shadow root), et n'expose pas d'emplacements (slots) pour inclure du contenu autre que ce qui est rendu sur la carte.

## Accessibilité

Le composant `<gcds-ext-map>` inclut plusieurs fonctionnalités d'accessibilité :

<ul class="list-disc mb-300">
  <li>Navigation au clavier</li>
  <li>Prise en charge des lecteurs d'écran</li>
  <li>Étiquettes et descriptions ARIA</li>
  <li>Gestion du focus</li>
</ul>

Si vous constatez des éléments qui pourraient être améliorés, veuillez <gcds-link href="https://github.com/gcds-extensions/map/issues/new" external>ouvrir un signalement</gcds-link>.

{% include "partials/needhelp.njk" %}
