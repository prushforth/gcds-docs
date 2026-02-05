---
title: Couche
layout: 'layouts/component-documentation.njk'
translationKey: 'maplayerCode'
tags: ['maplayerFR', 'code']
date: 'git Last Modified'
---

## Afficher le contenu de la carte en couches

Utilisez le composant de couche pour afficher le contenu « Map Markup Language » « MapML ». 

Utilisez l'attribut `src` du composant pour créer un lien vers le contenu, ou créez du contenu MapML en ligne dans votre HTML, entre les balises de début `<map-layer>` et de fin `</map-layer>`.

Définissez les propriétés initiales de la couche à l'aide des attributs `checked`, `hidden`, `opacity` et `media`.

{% include "partials/getcode.njk" %}

<iframe
  title="Aperçu des propriétés et événements de map-layer."
  src="https://nrcan.github.io/gcds-map/storybook/iframe.html?id=components-map--events-properties&viewMode=docs&demo=true&singleStory=true&lang=en"
  width="1200"
  height="2075"
  style="display: block; margin: 0 auto;"
  frameBorder="0"
  allow="clipboard-write"
></iframe>
