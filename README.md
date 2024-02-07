# Next + Leaflet

Playing around with the mapping library [Leaflet](https://leafletjs.com/) inside of Nextjs

Making use of [tailwindcss](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/),
[drizzle](https://orm.drizzle.team/) and [next-auth](https://next-auth.js.org/)

## Development

Create + Run local libsql database container on port 8080

```sh
docker compose up -d
```

Run local development server on port 3000

```sh
pnpm i && pnpm run dev
```

## TODO

### Features

- [x] Create `<Cluster />` component
- [x] Migrate current `<Marker />` components into `<Cluster />`
- [x] Fetch Pins from Google Maps instead of reading test file
- [ ] Create `<Popup />` component to better display data
- [ ] SVG + Color picker for custom map pins
- [ ] Whole Auth suite (create user, update user, delete user)
- [ ] Store user pins + custom colors / svgs

### Nice to have

- [ ] Clean up data extraction of Google Response (add better typing)
- [ ] Write some tests for data extraction of Google Response
- [ ] Switch svg rendering to use something dynamic (fontawesome classes maybe)
