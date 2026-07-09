---
layout: 'layouts/base.njk'
github: https://github.com/NRCan/gcds-map/tree/main/src/components/map-layer
loadGcdsMap: true
permalink: false
tags: ['maplayerEN', 'header']
---
<!-- NOTE: layer.json required to make the loadGcdsMap front matter variable accessible to the layout template.  -->
<style>
gcds-ext-map {
  width: 100%;
  height: 350px;
}
</style>
# Layer <br>`<map-layer>`

{% docLinks locale, stage, figma, github %}
{% enddocLinks %}

Web map data or content is inherently layered. Add it to the `<gcds-ext-map>` component using one or more child `<map-layer>` elements.  Each layer is rendered on top of the previous one.  Often a map is composed of a single opaque "base map" layer and one or more thematic layers on top.

{% componentPreview "`<map-layer>` component preview" %}
<gcds-ext-map lat="62.1326" lon="-91.0" zoom="2" projection="CBMTILE" controls controlslist="search geolocation">
  <map-caption>A map that demonstrates how layers are used by the gcds-ext-map compponent</map-caption>
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
      <map-link rel="image" tref="https://geogratis.gc.ca/maps/CBMT?SERVICE=WMS&VERSION=1.1.1&SRS=EPSG:3978&LAYERS=CBMT&BBOX={xmin},{ymin},{xmax},{ymax}&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=TRUE&WIDTH={w}&HEIGHT={h}&STYLES=&m4h=t"></map-link>
    </map-extent>
  </map-layer>
  <map-layer label="Test Layer"  src="{{ '/components/gcds-ext-map/dist/gcds-ext-map/assets/mapml/en/cbmtile/current_conditions' | url }}"  checked></map-layer>
</gcds-ext-map>
{% endcomponentPreview %}
