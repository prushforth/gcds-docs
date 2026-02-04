---
layout: 'layouts/base.njk'
github: https://github.com/nrcan/gcds-map
loadGcdsMap: true
figma: insert figma url
permalink: false
tags: ['mapFR', 'header']
---

# Carte <br>`<gcds-map>`

{% docLinks locale stage figma github %}
{% enddocLinks %}

Une carte est un outil interactif permettant d'afficher et d'interroger des informations de localisation en couches à différentes échelles

{% componentPreview "Aperçu du composant `<gcds-map>`" %}
<gcds-map style="width:100%; height: 350px" lat="45.4215" lon="-75.6972" zoom="10" projection="CBMTILE" controls controlslist="geolocation">
  <map-caption>Une carte topographique d'Ottawa, Canada, montrant la ville et la région à une échelle initiale d'environ 1 cm pour 5 km</map-caption>
  <map-layer label="Test Layer"  src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/fr/cbmtile/cbmt' | url }}"  checked></map-layer>
</gcds-map>
{% endcomponentPreview %}
