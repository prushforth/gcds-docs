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
  src="https://cds-snc.github.io/gcds-components/iframe.html?viewMode=docs&demo=true&singleStory=true&id=components-map-layer--events-properties&lang=fr"
  width="1200"
  height="1800"
  style="display: block; margin: 0 auto;"
  frameBorder="0"
  allow="clipboard-write"
></iframe>
