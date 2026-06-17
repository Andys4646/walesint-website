# Wales International — Website (Rebuild)

A rebuild of [walesint.com](https://walesint.com) as a fast, static, dependency-free site.
Wales International is a British Council trained & certified study-abroad education consultancy
(est. 2003) serving students applying to the UK, USA, Australia and Canada.

The original site was WordPress + Elementor; this rebuild is plain **HTML / CSS / JS** so it
loads fast and can be hosted anywhere (Netlify, Cloudflare Pages, Hostinger, GitHub Pages, etc.)
with no build step.

## Brand
- **Navy** `#19447A` · **Red** `#D93439` · grey text `#7A7A7A`
- Fonts: **Poppins** (headings) + **Open Sans** (body)
- Tagline: *Aiding Your Aims*

## Structure
```
index.html          One-page homepage (all sections)
css/styles.css      All styling (brand tokens at the top)
js/main.js          Hero rotation, mobile nav, testimonials carousel, scroll reveals
assets/img/         Logos, hero, service + country imagery, /avatars student photos
.claude/launch.json Local preview config (python static server on :4321)
```

## Run locally
```bash
python3 -m http.server 4321 --directory .
# then open http://localhost:4321
```

## Content sections
Top bar · Header/nav · Hero · Core values (Efficiency / Transparency / Solutions) ·
About · CTA strip · Services (6) · Countries (UK/USA/Australia/Canada) ·
Testimonials (13 real student placements) · Final CTA · Footer + newsletter · WhatsApp float.

## Not yet wired (next steps)
- Inner pages: About Us, Our Services, Countries (UK/USA/Australia/Canada), Contact Us.
- Real contact form + newsletter submission endpoint (currently inert).
- Confirm/replace service one-line descriptions with the owner's wording.
- Deploy + point the `walesint.com` domain (owner does not currently have DNS/IP access).
