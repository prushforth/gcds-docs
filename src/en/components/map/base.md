---
layout: 'layouts/base.njk'
github: https://github.com/NRCan/gcds-map/tree/main/src/components/gcds-map
loadGcdsMap: true
permalink: false
tags: ['mapEN', 'header']
---
<style>
gcds-map {
  width: 100%;
  height: 350px;
}
</style>
# Map <br>`<gcds-map>`

{% docLinks locale, stage, figma, github %}
{% enddocLinks %}

A map is an interactive tool to display and query layered location information at varying scales

{% componentPreview "`<gcds-map>` component preview" %}
<gcds-map lat="45.4215" lon="-75.6972" zoom="10" projection="CBMTILE" controls controlslist="search geolocation">
  <map-caption>A topographic map of Ottawa, Canada, showing the city and the region at about 1cm to 5km initial scale</map-caption>
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
</gcds-map>
{% endcomponentPreview %}
