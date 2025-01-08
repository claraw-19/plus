# SchulLV Schulportal

Diese Applikation wurde mit React unter Verwendung von next.js umgesetzt: https://nextjs.org/

## Vorbedingungen

- `pnpm` und `node` sind installiert

## How to use

- Als package manager ist npm zu verwenden:
  - Installation der dependencies via `npm install`
- `npm run dev` um einen lokalen Entwicklungsserver zu starten
- `npm run start` um einen lokalen Produktionsserver zu starten
- `npm build` um den application build zu starten
- `npm export` um den (zuvor ausgeführten) build in einem statischen, lokalen Ordner zu speichern

## Deployment

- Der CI build wurde via AWS Amplify eingerichtet
- Amplify ist mit dem Github-Repo verbunden und führt bei jedem Push auf den `main`-Branch deployment durch

