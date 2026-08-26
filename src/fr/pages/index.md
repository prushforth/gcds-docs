---
title: Accueil
layout: 'layouts/base.njk'
permalink: /fr/
translationKey: 'index'
date: 'git Last Modified'
nocrawl: false
eleventyNavigation:
  key: mapComponentsFR
  title: Accueil
  locale: fr
  order: 0
github: https://github.com/gcds-extensions/map
linkOverrides:
  githubCompsIssues: https://github.com/gcds-extensions/map/issues
helpus:
  en:
    feedbackHref: mailto:geo@nrcan-rncan.gc.ca
  fr:
    feedbackHref: mailto:geo@rncan-nrcan.gc.ca
cardlist:
  type: mapComponents
  state: published
templateEngineOverride: njk,md
---

# Composants de l’extension cartographique du Système de design GC

Les composants de carte fournissent des fonctionnalités cartographiques pour afficher et interagir avec des données géographiques. Chaque composant comprend du code réutilisable, des conseils sur les meilleures pratiques et des conseils d'accessibilité.

<gcds-button type="link" href="{{ links.startToUse }}">
  Comment installer
</gcds-button>

<gcds-button type="link" href="{{ links.registerDemo }}" button-role="secondary">
  Participer à une démo
</gcds-button>

<section class="bt-sm mt-500">

{% include "partials/card-list.njk" %}

## Choisissez Système de design GC

Système de design GC aide les fonctionnaires à concevoir des sites Web et des produits du gouvernement du Canada. Créez plus rapidement, sans compromettre ni l’identité de marque, ni l’accessibilité, ni le bilinguisme. Trouvez du code prêt pour la production, des ressources de design et de la documentation en un seul et même endroit.

### Pour en savoir plus

Renseignez-vous <gcds-link href="https://design-system.canada.ca/fr/a-propos" external>à propos de Système de design GC</gcds-link>, <gcds-link href="https://design-system.canada.ca/fr/sdgc-en-usage" external>des équipes qui l’utilisent</gcds-link>, de nos <gcds-link href="https://design-system.canada.ca/fr/accessibilite/" external>tests réguliers en matière d’accessibilité</gcds-link> et des façons d’améliorer l’accessibilité de vos produits et sites Web.

### S’impliquer

Nous adaptons continuellement notre produit pour mieux répondre à vos besoins et vous offrir plus d’options.

<gcds-button type="link" href="{{ links.getInvolved }}" button-role="secondary">
  S’impliquer
</gcds-button>

</section>

<section class="bt-sm mt-500">

## Nouveautés

Parcourez les dernières fonctionnalités et les derniers ajouts au code dans le <gcds-link href="{{ links.releaseNotes}}" external>journal des modifications dans GitHub</gcds-link>.

**Dernières versions** :

- Nouveau : Paquets stables v1.0.0 pour les <gcds-link href="{{ links.github }}" external>composants</gcds-link> et les <gcds-link href="{{ links.githubTokens }}" external>unités de style</gcds-link>
- Mise à jour : Échelle de couleurs élargie avec de nouvelles <gcds-link href="{{ links.colour }}">unités de style de base</gcds-link>
- Nouveau : <gcds-link href="{{ links.figmaTokens }}" external>Bibliothèque Figma</gcds-link> distincte pour les unités de style

</section>

<section class="bt-sm mt-500">

## À venir

Explorez notre <gcds-link href="{{ links.roadmap }}">feuille de route</gcds-link> pour suivre nos progrès et voir sur quoi nous travaillerons prochainement.

</section>

<section class="bt-sm mt-500">

## Contactez-nous

Si vous avez des questions, si vous voulez <gcds-link href="{{ links.getInvolved }}">vous impliquer</gcds-link> ou si vous voulez vous inscrire à notre liste de diffusion, n’hésitez pas à communiquer avec nous.

<gcds-button type="link" href="{{ links.contact }}" button-role="secondary">
  Nous contacter
</gcds-button>

</section>

{% include "partials/helpus.njk" %}
