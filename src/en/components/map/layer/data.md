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
    <div class="input-row">
      <gcds-input
        id="wms-url"
        input-id="wms-url-input"
        name="wms-url"
        label="WMS/WMTS/ESRI Capabilities URL:"
        type="url"
        hint="Type, paste, or select from list"
      ></gcds-input>
      <gcds-button id="load-btn" button-id="load-btn-id" button-type="button" button-role="primary">Load Service</gcds-button>
    </div>
    <div class="button-group">
      <input type="file" id="file-input" accept=".xml,text/xml,application/xml" style="display: none;" />
      <gcds-button id="load-file-btn" button-id="load-file-btn-id" button-type="button" button-role="secondary" style="display: none;">Load from File</gcds-button>
    </div>
    <div id="notice-container"></div>
  </section>

  <section id="service-info" class="service-info hidden">
    <h2>Service Information</h2>
    <div id="service-details"></div>
  </section>
</div>

