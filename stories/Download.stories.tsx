import { Download } from "../dist/Download";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Download },
    description: `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/telechargement-de-fichier)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Download.tsx)`,
    "argTypes": {
        "label": {
            "description": `Required - the label of the anchor element. In case the file to download is in a different language than the current document one, it should contains the mention of the language.`
        },
        "details": {
            "description": `Required - informations about the file to download (size, format, etc.). `
        }
    }
});

export default meta;

export const Default = getStory({
    "label": "Télécharger le document lorem ipsum sit dolores amet",
    "details": "JPG – 61,88 ko",
    linkProps: {
        href: "[À MODIFIER]"
    }
});
