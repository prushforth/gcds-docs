---
title: Map - Data
layout: "layouts/component-documentation.njk"
loadGcdsMap: true
loadMapMLify: true
eleventyNavigation:
  key: mapDataEN
  title: Map - Data
  locale: en
  parent: maplayerEN
translationKey: "mapData"
tags: ['maplayerEN', 'data']
permalink: /en/components/map/layer/data/
date: "git Last Modified"
---

## Get data for your map

Use the tool below to obtain authoritative map information from Canadian Geospatial Data Infrastructure (CGDI) services, including: Web Map Services (WMS), Web Map Tile Services (WMTS), and ESRI REST API MapServer and TileServer layers. Type, paste, or select a "capabilities" URL from the list, then click **Load Service**.  Modify the map view of any layer using the controls provided, then copy the code representing the map state you see into your own applications.

<div class="mapmlify-app" data-capabilities-url="{{ '/scripts/mapmlify/capabilities.en.txt' | url }}">
  <section class="input-section">
    <label for="wms-url">WMS/WMTS/ESRI Capabilities URL:</label>
    <div class="input-group">
      <input type="text" id="wms-url" list="wms-presets"
        placeholder="Type, paste, or select from list..."
        autocomplete="off" />
      <datalist id="wms-presets">
        <option value="">Loading...</option>
      </datalist>
      <button id="load-btn">Load Service</button>
      <input type="file" id="file-input" accept=".xml,text/xml,application/xml" style="display: none;" />
      <button id="load-file-btn" style="display: none;">Load from File</button>
    </div>
  </section>

  <section id="service-info" class="service-info hidden">
    <h2>Service Information</h2>
    <div id="service-details"></div>
  </section>
</div>

