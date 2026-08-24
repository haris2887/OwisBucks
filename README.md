# Owais's Bucks Weekend

Static site tracking the itinerary, attendees, and who's bringing what for the weekend.

## Editing content
All the data lives in [`data.js`](data.js) — edit `attendees`, `itinerary`, or `tasks` directly and refresh the page to see changes. No build step required.

## Running locally
```bash
python3 -m http.server 8000
```
Then open http://localhost:8000

## Deploying to GitHub Pages
1. Push this folder to a GitHub repo.
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)`.
4. Save — your site will be live at `https://<username>.github.io/<repo>/` within a minute or two.

Checkbox tick-offs are saved locally in each person's own browser (not shared between devices).
