---
layout: 'layouts/base.njk'
github: https://github.com/gcds-extensions/map/tree/main/src/components/map-layer
loadGcdsMap: true
permalink: false
tags: ['maplayerFR', 'header']
---
<!-- NOTE: couche.json required to make the loadGcdsMap front matter variable accessible to the layout template.  -->
<style>
gcds-ext-map {
  width: 100%;
  height: 350px;
}
</style>
# Couche <br>`<map-layer>`
{% docLinks locale, stage, figma, github %}
{% enddocLinks %}

Les données ou le contenu d'une carte Web sont organisés en couches et sont ajoutés au composant `<gcds-ext-map>` sous forme d'un ou plusieurs éléments enfants `<map-layer>`. Chaque couche est rendue par-dessus la couche précédente. Souvent, une carte est composée d'une couche de « carte de base » et d'une ou plusieurs couches thématiques.

{% componentPreview "Aperçu du composant <code>&lt;map-layer&gt;</code>" %}
<gcds-ext-map lat="62.1326" lon="-91.0" zoom="2" projection="CBMTILE" controls controlslist="search geolocation">
  <map-caption>Une carte qui démontre comment les couches sont utilisées par le composant gcds-ext-map</map-caption>
  <map-layer checked>
    <map-title>La carte de base du Canada - transport</map-title>
    <map-link rel="license" href="https://ouvert.canada.ca/fr/licence-du-gouvernement-ouvert-canada" title="Licence du gouvernement ouvert – Canada"></map-link>
    <map-link rel="suggestions" tref="https://geolocator.api.geo.ca/?q={searchTerms}&lang=fr&keys=geonames"></map-link>
    <map-link rel="search" tref="https://geolocator.api.geo.ca/?q={searchTerms}&lang=fr&keys=geonames"></map-link>
    <map-extent units="CBMTILE" checked hidden>
      <map-input name="z" type="zoom" value="22" min="0" max="22"></map-input>
      <map-input name="txmin" type="location" units="tilematrix" position="top-left" axis="easting" min="-3262924.7" max="3823954.0"></map-input>
      <map-input name="tymin" type="location" units="tilematrix" position="bottom-left" axis="northing" min="-1554977.6" max="4046262.8"></map-input>
      <map-input name="txmax" type="location" units="tilematrix" position="top-right" axis="easting" min="-3262924.7" max="3823954.0"></map-input>
      <map-input name="tymax" type="location" units="tilematrix" position="top-left" axis="northing" min="-1554977.6" max="4046262.8"></map-input>
      <map-link rel="tile" tref="https://geogratis.gc.ca/cartes/CBCT?SERVICE=WMS&VERSION=1.1.1&SRS=EPSG:3978&LAYERS=CBCT&BBOX={txmin},{tymin},{txmax},{tymax}&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=TRUE&WIDTH=256&HEIGHT=256&STYLES=&m4h=t"></map-link>
    </map-extent>
  </map-layer>
  <map-layer label="Test Layer"  src="{{ '/components/gcds-ext-map/dist/gcds-ext-map/assets/mapml/en/cbmtile/current_conditions' | url }}"  checked></map-layer>
</gcds-ext-map>
{% endcomponentPreview %}
