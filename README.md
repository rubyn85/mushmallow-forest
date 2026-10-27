# ♡ Our Mushmallow Forest

A complete, romantic digital scrapbook website for two little lovebirds. Built with **plain HTML, CSS and JavaScript**. No paid subscriptions, build steps, installations, or databases required.

### Included features
- Pastel storybook welcome page with **original pig and lion vector artwork**
- Live years/months/days/hours/minutes/seconds relationship counter and anniversary countdown
- Story timeline; responsive Polaroid gallery with filters and a photo viewer (click, arrow keys, swipe)
- Travel postcard board; twelve clickable love notes; three editable letters
- Checklist with progress and celebration confetti; special-date calendar
- Working, **original** little forest lullaby with play/pause and volume (never autoplays)
- Interactive hidden star surprise; responsive mobile navigation; reduced-motion support

## Step 1. Preview it on your own computer

1. Download and **unzip** `our-mushmallow-forest.zip`.
2. Open the `our-mushmallow-forest` folder.
3. Double-click `index.html` to view it in your browser. (An internet connection is useful for the Google Fonts, but the site works offline with fallback fonts.)

## Step 2. Publish for free on GitHub Pages

1. Sign in at https://github.com/.
2. Go to https://github.com/new and create a repository named `our-mushmallow-forest`.
3. Set its visibility to **Public**. GitHub Pages supports public repos on GitHub Free.
4. Open the repository and select **Add file → Upload files**. Upload the **contents** of the unzipped `our-mushmallow-forest` folder (NOT the ZIP file itself). Make sure `index.html` appears at the **root** of your repo alongside `style.css`, `data.js`, and `script.js`.
5. Select **Commit changes**.
6. Open **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, select branch **main** and folder **/(root)**, then click **Save**.
7. After GitHub finishes publishing, visit `https://YOUR-USERNAME.github.io/our-mushmallow-forest/` (substitute your own GitHub username).

> If GitHub offers a $10 subscription, **you do not need it**. GitHub Copilot is separate from free GitHub Pages hosting. Use the normal GitHub repository interface to upload the files.

## Step 3. Make the website your own

**Most of your edits will happen in `data.js`.** Open the file on GitHub, click the pencil/edit icon, make changes, then **Commit changes**. GitHub Pages republishes your edits.

**To add photos:**
1. In your repository, open the `images` folder and use **Add file → Upload files** to upload your actual photo (example: `our-first-date.jpg`).
2. Open `data.js`, find the memory you want to update, and change:

```js
image: ""
```

to:

```js
image: "images/our-first-date.jpg"
```

3. Edit `caption`, `date`, `description`, and other values as you wish.
4. **Commit changes**, then refresh the website after publishing completes.

Keep image filenames simple (lowercase letters, numbers, hyphens; no spaces), and compress photos before uploading. **Never upload private photos you wouldn't want strangers to see:** a public GitHub Pages repository and site are both publicly accessible.

**To add gallery photos:** Copy one existing `{ ... }` object inside `gallery: [ ... ]`, paste it before the final `]`, and change its `id` to a unique value, then update `image`, `caption`, `date`, `category`, and `theme`. Ensure each item except the last is separated by a comma.

**To add a timeline entry:** Same idea in the `timeline` array. Use `YYYY-MM-DD` for dates. For places, enter a `location` value; or leave `""` to hide it.

**To add love letters:** Edit or add an object in the `letters` array with `id`, `date`, `title`, `preview`, and `body`. Use `\n` to create a line break in the body.

**To add special days:** In `specialDays`, uncomment or add an entry. `monthDay: "10-12"` means October 12, repeating annually.

**To change the start time:** In `relationship.startDate`, use `2025-10-12T00:00:00`. The default is midnight because the precise time of the first day wasn't provided. The counter uses the visitor's device's local time.

**To add new bucket-list items:** Insert unique `id` + `text` pairs into the `bucketList` array. Checked items save to localStorage on the visitor's own browser.

## Important: How saving really works

GitHub Pages hosts **static files**. It cannot automatically accept permanent photo uploads, comments or shared diary edits from visitors. The **published content** lives in `data.js` and the `images/` folder, which you edit through GitHub. Bucket-list ticks use **localStorage**: they stay on a single browser/device, not shared between you and your partner. Clearing browser data removes those local ticks.

To add a shared, directly editable diary later, you'll need authentication and a backend/database (for example, a carefully configured free-tier service). Do not add secret API tokens to public GitHub files.

## Music

The site already includes a short original instrumental lullaby (`audio/forest-lullaby.wav`). The music **only plays after clicking the music control**.

To replace it with a legally usable song, upload your own audio and change the audio `src` in `index.html`. Only use music you own or have permission to publish on a public website. The current tune is free to use as part of this website.

## Files and folders

```text
our-mushmallow-forest/
├── index.html                 website structure
├── style.css                  colours, typography, responsive design
├── data.js                    ♡ YOUR STORIES, PHOTOS AND LETTERS
├── script.js                  interactive website features
├── assets/
│   ├── hero-forest.svg        original hand-drawn-style character illustration
│   ├── couple-cuddle.svg      small pig + lion illustration
│   ├── love-envelope.svg      decorative envelope
│   └── favicon.svg            tab icon
├── audio/
│   └── forest-lullaby.wav     original short instrumental
├── images/
│   └── README.txt             replace placeholders with your own photos
└── README.md                  this guide
```

## Customise the design

You can adjust colours at the start of `style.css`, inside `:root`.

This website was designed for **Our Mushmallow Forest**. It's a personal keepsake, not a commercial product. ♡
