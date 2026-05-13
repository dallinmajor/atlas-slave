# Atlas Slave

Next.js App Router site for Atlas Slave. The home page keeps the single-page section layout, with navigation scrolling to the section IDs on the landing page.

## Scripts

- `npm run dev` starts the Next.js dev server.
- `npm run build` creates a production build.
- `npm run start` runs the production server.
- `npm run lint` runs ESLint.

## Notes

- Audio assets are still proxied through `/audio-proxy/*`, which rewrites to the Next route handler at `/api/audio`.
- Home sections remain the source of truth for about, music, shows, gallery, and contact.
