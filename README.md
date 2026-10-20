# Frijters Afbouw – website

Een statische website gebouwd met [Astro](https://astro.build). De site wordt gehost op Netlify, de inhoud wordt beheerd met [Pages CMS](https://pagescms.org) en de offerteaanvragen komen binnen via Netlify Forms.

## Hoe het werkt

```
Pages CMS (beheerscherm)  →  GitHub-repository  →  Netlify bouwt de site  →  www.frijtersafbouw.nl
                                                     ↳ Netlify Forms ontvangt offerteaanvragen
```

Elke keer dat iemand in Pages CMS op Opslaan klikt, komt er een wijziging in GitHub. Netlify ziet dat en zet binnen ongeveer een minuut de nieuwe versie online.

## Waar staat de inhoud?

| Wat | Bestand | In Pages CMS |
| --- | --- | --- |
| Projecten (één bestand per project) | `src/content/projecten/*.md` | Projecten |
| Contactgegevens, kop, kerncijfers, werkgebied | `src/data/instellingen.json` | Bedrijfsgegevens & homepage |
| Diensten | `src/data/diensten.json` | Diensten |
| Werkwijze (4 stappen) | `src/data/werkwijze.json` | Werkwijze |
| Reviews | `src/data/reviews.json` | Reviews |
| Veelgestelde vragen | `src/data/faq.json` | Veelgestelde vragen |
| Foto's | `public/uploads/` | Media |

De velden in Pages CMS staan in `.pages.yml`. Het schema dat Astro controleert staat in `src/content.config.ts`. Pas die twee samen aan als je een veld toevoegt.

## Lokaal draaien

Je hebt Node.js 20 of nieuwer nodig.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # bouwt de site in dist/
```

Het offerteformulier werkt alleen op Netlify. Lokaal krijg je bij versturen de melding dat het niet lukte; dat is normaal.

## Online zetten (eenmalig)

### 1. GitHub
1. Maak een nieuwe repository aan, bijvoorbeeld `frijters-afbouw`. Privé mag.
2. Zet deze map erin:
   ```bash
   git init
   git add .
   git commit -m "Eerste versie"
   git branch -M main
   git remote add origin git@github.com:JOUW-ACCOUNT/frijters-afbouw.git
   git push -u origin main
   ```

### 2. Netlify
1. Kies in Netlify **Add new project → Import an existing project** en selecteer de repository.
2. De build-instellingen komen uit `netlify.toml` (`npm run build`, map `dist`). Je hoeft niets in te vullen.
3. Koppel het domein onder **Domain management**.
4. Zet het echte domein ook in `astro.config.mjs` bij `site`. Dat wordt gebruikt voor de canonical-links en de deelafbeelding.

### 3. Netlify Forms (offerteaanvragen)
1. Ga in Netlify naar **Forms** en klik op **Enable form detection**.
2. Start een nieuwe deploy (**Deploys → Trigger deploy**). Daarna verschijnt het formulier `offerte`.
3. Stel onder **Forms → Form notifications** een e-mailmelding in naar het adres van Frijters, zodat elke aanvraag direct in de mail komt.
4. Verstuur zelf een testaanvraag op de live site.

Goed om te weten:
- Elke aanvraag bevat: werkzaamheden, oppervlakte, gewenste start, omschrijving, een foto (optioneel), naam, plaats, e-mail en telefoon.
- Netlify accepteert maximaal 8 MB per aanvraag en één bestand per veld. Het formulier weigert daarom foto's boven 7 MB.
- Het verborgen veld `bot-field` vangt eenvoudige spam-bots af.
- Het aantal gratis aanvragen per maand hangt af van je Netlify-abonnement. Kijk dat na onder **Usage**.

### 4. Pages CMS (beheerscherm)
1. Ga naar [pagescms.org](https://pagescms.org) en log in met je GitHub-account.
2. Installeer de Pages CMS GitHub App en geef hem toegang tot de repository `frijters-afbouw`.
3. Open de repository in Pages CMS. Het menu (Projecten, Bedrijfsgegevens, Diensten, enzovoort) komt uit `.pages.yml`.
4. Nodig Frijters uit als **collaborator** via zijn e-mailadres. Hij heeft daarvoor geen GitHub-account nodig. Collaborators kunnen inhoud en foto's aanpassen, maar niet de instellingen van het CMS.

## Een project toevoegen (voor Frijters)

1. Open Pages CMS en kies **Projecten → Add an entry**.
2. Vul minimaal in: titel, plaats, soort werk, opleverdatum, hoofdfoto en een samenvatting van één zin.
3. Vink **Uitlichten op de homepage** aan als het project in het kaartje bovenaan moet komen.
4. Klik op **Save**. Na ongeveer een minuut staat het project op de site, met een eigen pagina onder `/projecten/`.

Tips voor foto's:
- Liggende foto's werken het best. Staande foto's worden bijgesneden; kies dan bij **Uitsnede van de foto** welk deel zichtbaar moet blijven.
- Pages CMS verkleint foto's niet. Upload ze bij voorkeur als JPG van maximaal ongeveer 2000 pixels breed (rond de 300 kB tot 1 MB), dan blijft de site snel.

## Nog doen voordat de site live gaat

- [ ] Echte projectgegevens controleren. De teksten bij de zes voorbeeldprojecten zijn bij de foto's bedacht.
- [ ] Kerncijfers (350+, 18 jaar, 9,4, 2 dagen) en reviews vervangen door echte.
- [ ] Telefoonnummer, e-mailadres en KvK-nummer invullen onder **Bedrijfsgegevens & homepage**.
- [ ] Een privacyverklaring toevoegen. Het offerteformulier verzamelt persoonsgegevens, dus die is nodig.
- [ ] Het domein invullen in `astro.config.mjs`.

## Structuur

```
.pages.yml                 Pages CMS-configuratie
netlify.toml               Netlify-build en caching
src/content.config.ts      Velden en controle van projecten
src/content/projecten/     Projecten (Markdown)
src/data/                  Overige inhoud (JSON)
src/pages/                 Homepage, projectenoverzicht, projectpagina, bedankt, 404
src/components/            Header, footer, projectkaart, offerteformulier, CTA-banner
src/styles/global.css      Alle styling (kleuren en lettertypes bovenaan in :root)
public/uploads/            Foto's
public/brand/              Logo's en favicon
```
