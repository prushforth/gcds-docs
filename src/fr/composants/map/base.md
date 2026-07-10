---
layout: 'layouts/base.njk'
github: https://github.com/NRCan/gcds-ext-map/tree/main/src/components/gcds-ext-map
loadGcdsMap: true
permalink: false
tags: ['mapFR', 'header']
---
<style>
gcds-ext-map {
  width: 100%;
  height: 350px;
}
</style>
# Carte <br>`<gcds-ext-map>`

{% docLinks locale, stage, figma, github %}
{% enddocLinks %}

Une carte est un outil interactif permettant d'afficher et d'interroger des informations de localisation en couches à différentes échelles

{% componentPreview "Aperçu du composant `<gcds-ext-map>`" %}

<gcds-ext-map lat="45.4215" lon="-75.6972" zoom="10" projection="CBMTILE" controls controlslist="search geolocation">
  <map-caption>Une carte topographique d'Ottawa, Canada, montrant la ville et la région à une échelle initiale d'environ 1 cm pour 5 km</map-caption>
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
</gcds-ext-map>
{% endcomponentPreview %}
