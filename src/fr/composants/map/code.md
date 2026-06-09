---
title: map
layout: 'layouts/component-documentation.njk'
loadGcdsMap: true
translationKey: 'mapCode'
tags: ['mapFR', 'code']
# date: "git Last Modified"
---

## Créer une case à map

## Accessibilité et codage des cases à map

{% include "partials/getcode.njk" %}

<iframe
  title="iframeTitle"
  src="https://nrcan.github.io/gcds-map/storybook/iframe.html?id=components-map--events-properties&viewMode=docs&demo=true&singleStory=true&lang=fr"
  width="1200"
  height="100"
  style="display: block; margin: 0 auto; border: 0; overflow: hidden;"
  scrolling="no"
  frameBorder="0"
  allow="clipboard-write"
></iframe>

<script>
  // ── Iframe auto-resize ──
  window.addEventListener('message', (ev) => {
    if (ev.data && ev.data.type === 'storybook-resize' && ev.data.src) {
      const reportedId = new URL(ev.data.src).searchParams.get('id');
      document.querySelectorAll('iframe').forEach((iframe) => {
        try {
          const iframeId = new URL(iframe.src).searchParams.get('id');
          if (reportedId && reportedId === iframeId) {
            iframe.style.height = ev.data.height + 'px';
          }
        } catch(e) {}
      });
    }
  });
</script>
