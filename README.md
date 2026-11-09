# ✊ ✋ ✌️ Rock · Paper · Scissors

A polished, browser-based Rock Paper Scissors game with a glassmorphism UI, animated hands, and live scoring. Built with plain HTML, CSS, and JavaScript: no frameworks, no build step, no dependencies.

The project doubles as a **Git workflow demonstration**: every feature was developed on its own branch, merged with a visible merge commit, and tagged for release.

---

## Table of Contents

1. [Features](#features)
2. [Quick Start](#quick-start)
3. [How to Play](#how-to-play)
4. [Game Rules](#game-rules)
5. [Project Structure](#project-structure)
6. [How It Works](#how-it-works)
7. [Customization](#customization)
8. [Accessibility](#accessibility)
9. [Git Workflow](#git-workflow)
10. [Browser Support](#browser-support)
11. [Roadmap](#roadmap)
12. [Contributing](#contributing)
13. [License](#license)

---

## Features

- **Modern UI**: frosted-glass card, radial gradient background, and soft shadows
- **Animated showdown**: both hands shake before the reveal for a classic "rock, paper, scissors, shoot!" feel
- **Live scoreboard**: tracks your wins and the computer's wins
- **Colour-coded results**: green for a win, red for a loss, yellow for a draw
- **Responsive layout**: works on phones, tablets, and desktops
- **Reset button**: start a fresh match at any time
- **Input locking**: buttons are disabled during the animation to prevent double-clicks
- **Separated logic and UI**: game rules live in a pure module that is easy to test
- **Zero dependencies**: open `index.html` and play

---

## Quick Start

### Option 1: Open directly

```bash
git clone https://github.com/<your-username>/rps-game.git
cd rps-game
```

Then double-click `index.html`, or open it from your browser's **File → Open** menu.

### Option 2: Run a local server (optional)

Any static server works. For example:

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx serve .
```

Visit `http://localhost:8000`.

### Requirements

A modern web browser. Nothing else needs to be installed to play. Git is only needed if you want to explore the project history.

---

## How to Play

1. Click **Rock**, **Paper**, or **Scissors**.
2. Both hands shake for a moment while the computer "decides".
3. The hands are revealed and the round result appears.
4. The scoreboard updates automatically.
5. Keep playing as long as you like. Click **Reset game** to zero the scores.

---

## Game Rules

| Your move | Beats | Loses to |
|-----------|-----------|-----------|
| ✊ Rock | Scissors | Paper |
| ✋ Paper | Rock | Scissors |
| ✌️ Scissors | Paper | Rock |

- Same move from both sides is a **draw**, and no points are awarded.
- A win gives the winner **1 point**.
- The computer picks its move at random, with equal probability for each option.

---

## Project Structure

```
rps-game/
├── index.html        # Page markup: scoreboard, arena, controls
├── css/
│   └── style.css     # Theme, layout, animations
├── js/
│   ├── game.js       # Pure game logic (no DOM access)
│   └── app.js        # UI wiring: events, rendering, scoring
├── README.md
└── .gitignore
```

| File | Responsibility |
|------|----------------|
| `index.html` | Semantic structure and the entry point. Loads the stylesheet and both scripts. |
| `css/style.css` | CSS variables for theming, glassmorphism card, hover and active states, shake keyframes. |
| `js/game.js` | Defines the moves, emoji map, win rules, `getComputerMove()` and `decide()`. |
| `js/app.js` | Holds the score state, handles clicks, runs the animation timing, updates the DOM. |

> `game.js` must be loaded **before** `app.js`, because `app.js` uses its functions and constants.

---

## How It Works

### Game logic (`js/game.js`)

```js
const MOVES = ['rock', 'paper', 'scissors'];
const BEATS = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
```

- `getComputerMove()` returns a random item from `MOVES`.
- `decide(player, computer)` returns `'win'`, `'lose'`, or `'draw'`.

The `BEATS` lookup table replaces a long chain of `if` statements. Each key beats the value stored beside it, so adding or changing rules means editing one object.

### UI flow (`js/app.js`)

1. A click on a `.choice` button calls `play(move)`.
2. The buttons are disabled and both hands switch to ✊ with a `shake` animation.
3. After a 600 ms delay, the computer move is generated and the outcome is decided.
4. Hands, scores, and the result message are updated.
5. The `win`, `lose`, or `draw` class is applied to the result text for colour.
6. The buttons are re-enabled.

### Styling (`css/style.css`)

All colours are defined as CSS custom properties in `:root`, so the whole theme can be changed in one place. The layout uses CSS Grid for page centring and Flexbox for the scoreboard, arena, and buttons.

---

## Customization

### Change the theme

Edit the variables at the top of `css/style.css`:

```css
:root {
  --bg1: #0f172a;     /* gradient outer colour */
  --bg2: #1e1b4b;     /* gradient inner colour */
  --accent: #818cf8;  /* hover highlight */
  --win: #22c55e;
  --lose: #ef4444;
  --draw: #eab308;
}
```

### Adjust the reveal speed

In `js/app.js`, change the delay passed to `setTimeout` (default `600` ms). Keep it in step with the `shake` animation duration in the CSS (`.5s`).

### Add new moves

Extending to a game such as Rock Paper Scissors Lizard Spock takes three steps:

1. Add the move to `MOVES` and `EMOJI` in `game.js`.
2. Change `BEATS` so each move maps to an array of the moves it defeats, and update `decide()` to use `.includes()`.
3. Add a matching `<button class="choice" data-move="...">` in `index.html`.

---

## Accessibility

- The result message uses `aria-live="polite"`, so screen readers announce each outcome.
- All controls are real `<button>` elements, so they are keyboard-focusable and work with Enter and Space.
- Colour is never the only signal: results also include text and emoji.

Possible improvements: visible focus outlines tuned to the theme, and a `prefers-reduced-motion` media query to turn off the shake animation.

---

## Git Workflow

This repository follows a simple **feature-branch** model:

- `main` always holds working, presentable code.
- Each piece of work happens on a short-lived branch such as `feature/markup`, `feature/styling`, or `feature/game-logic`.
- Branches are merged with `--no-ff` so the history shows where each feature landed.
- Releases are marked with annotated tags (for example `v1.0.0`).

```bash
git switch -c feature/my-change      # start a branch
git add <files>                      # stage
git commit -m "feat: describe it"    # commit
git switch main
git merge --no-ff feature/my-change  # merge with a merge commit
git branch -d feature/my-change      # clean up
```

View the history as a graph:

```bash
git log --oneline --graph --all
```

### Commit message convention

| Prefix | Use for |
|--------|---------|
| `feat:` | New functionality |
| `fix:` | Bug fixes |
| `style:` | Visual and CSS changes |
| `refactor:` | Code restructuring without behaviour change |
| `docs:` | Documentation such as this README |
| `chore:` | Tooling and housekeeping |

### Release history

| Tag | Description |
|-----|-------------|
| `v1.0.0` | First playable release: markup, styling, game logic, scoring, reset |

---

## Browser Support

Works in current versions of Chrome, Edge, Firefox, and Safari. The frosted-glass effect uses `backdrop-filter`. Browsers without it will still show a readable, semi-transparent card.

---

## Roadmap

- [ ] Persist the score with `localStorage` (`feature/persist-score`)
- [ ] Best-of-5 match mode with a winner announcement
- [ ] Sound effects with a mute toggle
- [ ] `prefers-reduced-motion` support
- [ ] Unit tests for `decide()`
- [ ] Round history log
- [ ] Deploy with GitHub Pages

---

## Contributing

1. Fork the repository.
2. Create a branch: `git switch -c feature/your-idea`
3. Make your changes and commit using the convention above.
4. Push the branch and open a pull request describing what changed and why.

Please keep game logic in `game.js` and DOM code in `app.js`, so the logic stays easy to test.

---

## License

Released under the [MIT License](https://opensource.org/licenses/MIT). Replace this section with a `LICENSE` file if you publish the project.

---

*Made as a hands-on walkthrough of building a small web project step by step with Git.*
