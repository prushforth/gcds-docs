---
layout: 'layouts/base.njk'
github: https://github.com/NRCan/gcds-map/tree/main/src/components/map-layer
loadGcdsMap: true
permalink: false
tags: ['maplayerFR', 'header']
---
<!-- NOTE: couche.json required to make the loadGcdsMap front matter variable accessible to the layout template.  -->
<style>
gcds-map {
  width: 100%;
  height: 350px;
}
</style>
# Couche <br>`<map-layer>`
{% docLinks locale, stage, figma, github %}
{% enddocLinks %}

Les données ou le contenu d'une carte Web sont organisés en couches et sont ajoutés au composant `<gcds-map>` sous forme d'un ou plusieurs éléments enfants `<map-layer>`. Chaque couche est rendue par-dessus la couche précédente. Souvent, une carte est composée d'une couche de « carte de base » et d'une ou plusieurs couches thématiques.

{% componentPreview "Aperçu du composant `<map-layer>`" %}
<gcds-map lat="62.1326" lon="-91.0" zoom="2" projection="CBMTILE" controls controlslist="geolocation">
  <map-caption>Une carte qui démontre comment les couches sont utilisées par le composant gcds-map</map-caption>
  <map-layer label="Test Layer"  src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/fr/cbmtile/cbmtsimple' | url }}"  checked></map-layer>
  <map-layer label="Test Layer"  src="{{ '/components/gcds-map/dist/gcds-map/assets/mapml/en/cbmtile/current_conditions' | url }}"  checked></map-layer>
</gcds-map>
{% endcomponentPreview %}
