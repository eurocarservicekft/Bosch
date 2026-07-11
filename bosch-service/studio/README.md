# Euro Car Service — Sanity Studio (admin)

This is the content admin for the website. Content is bilingual (HU / EN):
each text field has a Magyar and an English box.

## First-time setup

```bash
cd studio
npm install
```

## Fill it with the starter content (one time)

Get an **Editor** token in the Sanity dashboard (API → Tokens), then:

```bash
SANITY_API_WRITE_TOKEN=your-token npm run seed
```

This loads all Hungarian + English starter text (services, prices, testimonials,
About, hero, settings). The gallery is left empty on purpose — upload real
photos in the Studio.

> Security: the token can write to your content. Don't commit it. Delete it in
> the Sanity dashboard once seeding is done; create a new one only if needed.

## Run the admin locally

```bash
npm run dev          # http://localhost:3333
```

Log in with the same Google account as the Sanity project.

## Publish the admin for the client

```bash
npm run deploy       # hosts it at https://eurocarservice.sanity.studio
```

The client logs in there to edit texts, prices, photos, and both languages — no
code, no local setup.

## Project

- Project ID: `2x8l1i27`
- Dataset: `production`
