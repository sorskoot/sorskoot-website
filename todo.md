# GDPR cleanup follow-ups

The tracker removal is done (ShareThis, Disqus, Google Fonts, Ko-fi widget, CDN Mermaid, embeds, hotlinked images). These are the open points.

- [x] **Games privacy policy.** `/privacy-policy` is restored to its original games text, so the links on the stores keep working. The website policy now lives on `/privacy` (`content/privacy.md`), and the footer links there. Still to check: `content/privacy-policy-storage-space13.md`, which mentions Google Analytics.
- [ ] **Check the games' analytics.** Confirm which games actually send data to Google Analytics, and whether they need a consent prompt of their own. That is separate from the website.
- [ ] **Dead images removed.** Three Discord screenshots in `2023-05-22-Gamedev.tvGameJam2023.md` and one heyvr image in `content/games/BackToSpace.md` returned 404 and were removed. Replace them with local copies if the originals still exist.
- [ ] **Missing YouTube thumbnails.** About 70 of the 80 embedded videos have no thumbnail because YouTube returns 404 for them (deleted or private, mostly old Twitch-stream posts). Check whether those embeds should stay.
- [ ] **Old front matter.** 145 posts still have `comments: true` and `share: true`. This is harmless. Clean up if wanted, and update the snippet that adds the frontmatter.
- [ ] **Theme leftovers.** `themes/initio/` still has unused Google Analytics, Disqus and ShareThis partials. Nothing calls them. Remove them if the theme is trimmed.
- [ ] **Hosting logs.** Check what the hosting provider logs and for how long. Make sure the website privacy section matches.
- [ ] **Verify in a browser.** Test the click-to-load embeds (YouTube, Twitch, StackBlitz, SlideShare) and the fonts on a real page. Check the Network tab for third-party requests before any click.
- [x] **Bring back the Ko-fi button.** Done: `layouts/partials/kofi.html` is a plain fixed-position link, styled in `styles.scss`, with no JS. Original notes: Build it as our own floating "Support me" button (custom HTML, CSS and JS in the site) that opens an external Ko-fi page (`https://ko-fi.com/sorskoot`) when clicked. The button must not load anything from `storage.ko-fi.com`. Ko-fi only gets contacted after the click, so it stays GDPR-safe. Decide where it goes (floating bottom corner like before, or in the footer), match the old colors (`#323842` background, white text), and keep it working without JS. The plain footer link is already removed.
- [ ] **Commit the changes.** Nothing is committed yet. Split into logical commits (trackers, embeds, images, config, privacy policy).

