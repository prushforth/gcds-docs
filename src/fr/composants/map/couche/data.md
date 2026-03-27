---
title: Cartes - données
layout: "layouts/component-documentation.njk"
loadGcdsMap: true
loadMapMLify: true
eleventyNavigation:
  key: mapDataFR
  title: Cartes - données
  locale: fr
  parent: maplayerFR
translationKey: "mapData"
tags: ['maplayerFR', 'data']
permalink: /fr/composants/map/couche/donnees/
date: "git Last Modified"
---

## Obtenir des données pour votre carte

Utilisez l'outil ci-dessous pour obtenir des informations cartographiques faisant autorité à partir des services de l'Infrastructure canadienne de données géospatiales (ICDG), y compris : les services Web Map Service (WMS), Web Map Tile Service (WMTS) et les couches MapServer et TileServer de l'API REST ESRI. Saisissez, collez ou sélectionnez une URL de « capacités » dans la liste, puis cliquez sur **Charger le service**. Modifiez la vue cartographique de n'importe quelle couche à l'aide des contrôles fournis, puis copiez le code représentant l'état de la carte que vous voyez dans vos propres applications.

<div class="mapmlify-app" data-capabilities-url="{{ '/scripts/mapmlify/capabilities.fr.txt' | url }}">
  <section class="input-section">
    <label for="wms-url">URL de capacités WMS/WMTS/ESRI :</label>
    <div class="input-group">
      <input type="text" id="wms-url" list="wms-presets"
        placeholder="Saisissez, collez ou sélectionnez dans la liste..."
        autocomplete="off" />
      <datalist id="wms-presets">
        <option value="">Chargement...</option>
      </datalist>
      <button id="load-btn">Charger le service</button>
      <input type="file" id="file-input" accept=".xml,text/xml,application/xml" style="display: none;" />
      <button id="load-file-btn" style="display: none;">Charger à partir d'un fichier</button>
    </div>
  </section>

  <section id="service-info" class="service-info hidden">
    <h2>Information sur le service</h2>
    <div id="service-details"></div>
  </section>
</div>
