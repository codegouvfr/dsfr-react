---
description: How to import images, SVGs and other static DSFR resources
---

# 🌅 Importing assets

Let's say, [in the DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/parametres-d-affichage), you come across the following HTML code.

```html
<!-- Official documentation code, don't copy paste that -->
<svg>
    <use xlink:href="../../../dist/artwork/dark.svg#artwork-minor" />
</svg>
```

Let's see how we would translate this into React.

### Using hardcoded links

{% hint style="danger" %}
This is not the recommended approach since it isn't the more efficient nor the more maintainable way. You should [rely on your bundler](assets.md#rely-on-your-bundler) instead.
{% endhint %}

First make sure you have this script in your `package.json`

```diff
 "scripts": {
+    "postinstall": "copy-dsfr-to-public"
 }
```

Now you can simply write the following and it will work: &#x20;

```tsx
<svg>
    <use xlinkHref="/dsfr/artwork/dark.svg#artwork-minor#artwork-minor" />
</svg>
```

### Rely on your bundler

{% hint style="success" %}
This is the preferred approach.
{% endhint %}

{% tabs %}
{% tab title="Create React App / Vite / Others" %}
Most JS bundlers, by default, emits a separate file and exports the URL when comming across an import of a image or video file format. &#x20;

```tsx
import artworkDarkSvgUrl from "@codegouvfr/react-dsfr/dsfr/artwork/dark.svg";

<svg>
    <use xlinkHref={`${artworkDarkSvgUrl}#artwork-minor`} />
</svg>
```
{% endtab %}

{% tab title="Next.js" %}
In modern Next, if not explicitly disabled, image files (including SVGs) are imported using [next/image](https://nextjs.org/docs/upgrading#nextconfigjs-customization-to-import-images). &#x20;

You'll get a valid url by accessing the src property of the react component.

```tsx
import ArtworkDarkSvg from "@codegouvfr/react-dsfr/dsfr/artwork/dark.svg";

<svg>
    <use xlinkHref={`${ArtworkDarkSvg.src}#artwork-minor`} />
</svg>;
```
{% endtab %}
{% endtabs %}
