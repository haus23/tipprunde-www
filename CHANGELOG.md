# Changelog


## v0.6.0

[compare changes](https://github.com/haus23/tipprunde/compare/v0.5.1...v0.6.0)


### 🚀 Enhancements

  - Add client-hints cookie. Polyfilling missing standard. ([ba64dd8](https://github.com/haus23/tipprunde/commit/ba64dd8))
  - Render color theme based on the client hint. ([927ee8c](https://github.com/haus23/tipprunde/commit/927ee8c))
  - Add theme toggle to the navs. Implements client side theme switch. ([67aa5c1](https://github.com/haus23/tipprunde/commit/67aa5c1))
  - Persist user preference for color theme in session cookie. ([6b3c53d](https://github.com/haus23/tipprunde/commit/6b3c53d))

### 🩹 Fixes

  - Add missing dependency. ([2c2a50c](https://github.com/haus23/tipprunde/commit/2c2a50c))
  - Overlapping icon on small devices. ([4e5156f](https://github.com/haus23/tipprunde/commit/4e5156f))
  - **seo:** Add button label. ([f91f2f1](https://github.com/haus23/tipprunde/commit/f91f2f1))
  - **a11y:** Tweak Lighthouse. ([443ca66](https://github.com/haus23/tipprunde/commit/443ca66))
  - Move charset tag up. ([34f2fd6](https://github.com/haus23/tipprunde/commit/34f2fd6))

### 💅 Refactors

  - Nest additional loader to make the root loader data independent. ([926067a](https://github.com/haus23/tipprunde/commit/926067a))
  - Rename initial theme prop. ([8f75437](https://github.com/haus23/tipprunde/commit/8f75437))

### ❤️  Contributors

- Micha Buchholz <micha@haus23.net>

## v0.5.1

[compare changes](https://github.com/haus23/tipprunde/compare/v0.5.0...v0.5.1)


### 🚀 Enhancements

  - Make table sortable. ([27831fe](https://github.com/haus23/tipprunde/commit/27831fe))
  - Make select component groupable. ([68465af](https://github.com/haus23/tipprunde/commit/68465af))
  - Stay on current view when changing championship. ([f45437a](https://github.com/haus23/tipprunde/commit/f45437a))
  - Keep the search string while switching championships. Handle edge case in matches view. ([ace4fba](https://github.com/haus23/tipprunde/commit/ace4fba))

### 🩹 Fixes

  - Delete the old routes. ([bc5e38a](https://github.com/haus23/tipprunde/commit/bc5e38a))
  - Provide bot robots file. ([ddff60c](https://github.com/haus23/tipprunde/commit/ddff60c))
  - **a11y:** Add labels to the info-box trigger buttons. ([7a8dc42](https://github.com/haus23/tipprunde/commit/7a8dc42))
  - Wrong link href ([be8a7c7](https://github.com/haus23/tipprunde/commit/be8a7c7))

### 💅 Refactors

  - Make helpers error prune. ([eac51d0](https://github.com/haus23/tipprunde/commit/eac51d0))

### ❤️  Contributors

- Micha Buchholz <micha@haus23.net>

## v0.5.0

[compare changes](https://github.com/haus23/tipprunde/compare/v0.4.0...v0.5.0)


### 🚀 Enhancements

  - Refactor routing with remix-flat-routes package. Add auth routes as proof of concept by now. ([6e3fa07](https://github.com/haus23/tipprunde/commit/6e3fa07))

### 💅 Refactors

  - Move reusable components to dedicated ui folder. ([69b0faf](https://github.com/haus23/tipprunde/commit/69b0faf))
  - Rename ui components folder. ([162ba8d](https://github.com/haus23/tipprunde/commit/162ba8d))
  - Move app layout to root. Clean-up root. ([e59151b](https://github.com/haus23/tipprunde/commit/e59151b))
  - Move app data loading to root. ([cedf47d](https://github.com/haus23/tipprunde/commit/cedf47d))
  - Remove unused pathless layout. ([fce7be6](https://github.com/haus23/tipprunde/commit/fce7be6))
  - Simplify ranking with now updated backend. No need to query matches and teams. ([34ac9a5](https://github.com/haus23/tipprunde/commit/34ac9a5))
  - Ignore all existing routes first. ([f13cf31](https://github.com/haus23/tipprunde/commit/f13cf31))
  - Move the old routes out of the way. Start with the flat-routes package. ([dc61d8e](https://github.com/haus23/tipprunde/commit/dc61d8e))
  - Add ranking route. ([1f122b5](https://github.com/haus23/tipprunde/commit/1f122b5))
  - Add players route back. URL changing to clearify loading with extra layout. ([b4e28d7](https://github.com/haus23/tipprunde/commit/b4e28d7))
  - Add matches route back ([853131e](https://github.com/haus23/tipprunde/commit/853131e))

### 🏡 Chore

  - Upgrade tipprunde types. ([4216efa](https://github.com/haus23/tipprunde/commit/4216efa))
  - Add dependency remix-flat-routes. Start migration. ([9c2cef1](https://github.com/haus23/tipprunde/commit/9c2cef1))

### ❤️  Contributors

- Micha Buchholz <micha@haus23.net>

## v0.4.0

[compare changes](https://github.com/haus23/tipprunde/compare/v0.3.3...v0.4.0)


### 🚀 Enhancements

  - Add match route. ([0268056](https://github.com/haus23/tipprunde/commit/0268056))
  - Load current match and tips with loader. ([521b411](https://github.com/haus23/tipprunde/commit/521b411))
  - First take on the match tips table. And align all table layouts. ([b6a13a8](https://github.com/haus23/tipprunde/commit/b6a13a8))

### 🩹 Fixes

  - Align headers. ([58c7247](https://github.com/haus23/tipprunde/commit/58c7247))
  - Popper with full width on xs devices. ([dcd3ce0](https://github.com/haus23/tipprunde/commit/dcd3ce0))
  - Wrong param name ([bef6628](https://github.com/haus23/tipprunde/commit/bef6628))

### 💅 Refactors

  - Align with upgraded query type. ([82005b7](https://github.com/haus23/tipprunde/commit/82005b7))
  - Better naming ([74c4541](https://github.com/haus23/tipprunde/commit/74c4541))
  - Simplify logic - loader comes first and has the data. ([234657b](https://github.com/haus23/tipprunde/commit/234657b))

### 🏡 Chore

  - Upgrade tipprunde types. ([9952827](https://github.com/haus23/tipprunde/commit/9952827))

### ❤️  Contributors

- Micha Buchholz <micha@haus23.net>

## v0.3.3

[compare changes](https://github.com/haus23/tipprunde/compare/v0.3.2...v0.3.3)


### 🚀 Enhancements

  - Implement nav. ([92ea200](https://github.com/haus23/tipprunde/commit/92ea200))

### 🩹 Fixes

  - Increase z-index ([7edf812](https://github.com/haus23/tipprunde/commit/7edf812))
  - Restore scroll pos on same locations. ([f0af8bb](https://github.com/haus23/tipprunde/commit/f0af8bb))

### 💅 Refactors

  - Add export for close primitive. ([5c5c2c1](https://github.com/haus23/tipprunde/commit/5c5c2c1))

### ❤️  Contributors

- Micha Buchholz <micha@haus23.net>

## v0.3.2

[compare changes](https://github.com/haus23/tipprunde/compare/v0.3.1...v0.3.2)


### 🩹 Fixes

  - Provide correct link route. ([943d3fc](https://github.com/haus23/tipprunde/commit/943d3fc))

### 💅 Refactors

  - Await matches in loader. ([b6de5ce](https://github.com/haus23/tipprunde/commit/b6de5ce))
  - Use match data from all matches query. ([759562c](https://github.com/haus23/tipprunde/commit/759562c))
  - Align with updated type and backend. ([fa36377](https://github.com/haus23/tipprunde/commit/fa36377))

### 🏡 Chore

  - Upgrade tipprunde types. ([f25cfbf](https://github.com/haus23/tipprunde/commit/f25cfbf))

### ❤️  Contributors

- Micha Buchholz <micha@haus23.net>

## v0.3.1

[compare changes](https://github.com/haus23/tipprunde/compare/v0.3.0...v0.3.1)


### 🚀 Enhancements

  - Add reuseable info-box component. ([02b0b3e](https://github.com/haus23/tipprunde/commit/02b0b3e))
  - Open infobox on hover as well. ([55b7cfa](https://github.com/haus23/tipprunde/commit/55b7cfa))
  - Make icon customizable. ([163b521](https://github.com/haus23/tipprunde/commit/163b521))
  - Show current matches and tips in ranking. ([b9349c3](https://github.com/haus23/tipprunde/commit/b9349c3))

### ❤️  Contributors

- Micha Buchholz <micha@haus23.net>

## v0.3.0

[compare changes](https://github.com/haus23/tipprunde/compare/v0.2.0...v0.3.0)


### 🚀 Enhancements

  - Show extra points after publishing. ([0a1c272](https://github.com/haus23/tipprunde/commit/0a1c272))
  - Load and display tips. ([9ced197](https://github.com/haus23/tipprunde/commit/9ced197))
  - Link ranking to players. ([ba08961](https://github.com/haus23/tipprunde/commit/ba08961))

### 🩹 Fixes

  - Add workaround for https://github.com/radix-ui/primitives/issues/1658 ([5ef8f41](https://github.com/haus23/tipprunde/commit/5ef8f41))

### 🏡 Chore

  - Update tipprunde types. ([9ba2d79](https://github.com/haus23/tipprunde/commit/9ba2d79))

### ❤️  Contributors

- Micha Buchholz <micha@haus23.net>

## v0.2.0

[compare changes](https://github.com/haus23/tipprunde/compare/v0.1.1...v0.2.0)


### 🚀 Enhancements

  - Add reusable select component. ([1889eac](https://github.com/haus23/tipprunde/commit/1889eac))
  - Players view. Make current player selectable. ([e0d28a9](https://github.com/haus23/tipprunde/commit/e0d28a9))
  - Use player name in title. ([3db6820](https://github.com/haus23/tipprunde/commit/3db6820))
  - Add reusable accordin component. ([b87f00a](https://github.com/haus23/tipprunde/commit/b87f00a))
  - Display matches. Tips are faked. ([dbc0eb5](https://github.com/haus23/tipprunde/commit/dbc0eb5))

### 🩹 Fixes

  - Add z-index higher than content ([17955e4](https://github.com/haus23/tipprunde/commit/17955e4))
  - Remove active (focus) styling. ([2415e2c](https://github.com/haus23/tipprunde/commit/2415e2c))

### 💅 Refactors

  - Move loading into parent layout. ([6d7c95d](https://github.com/haus23/tipprunde/commit/6d7c95d))
  - Optimize data loading. ([7bf687e](https://github.com/haus23/tipprunde/commit/7bf687e))
  - Loading championship matches as well but deferred. ([61280f2](https://github.com/haus23/tipprunde/commit/61280f2))

### 🏡 Chore

  - Update deps. ([04d2927](https://github.com/haus23/tipprunde/commit/04d2927))
  - Upgrade tipprunde types. ([b25756c](https://github.com/haus23/tipprunde/commit/b25756c))
  - Adjust ECMAScript version. ([41c5f8b](https://github.com/haus23/tipprunde/commit/41c5f8b))

### ❤️  Contributors

- Micha Buchholz <micha@haus23.net>

## v0.1.1

[compare changes](https://github.com/haus23/tipprunde/compare/v0.1.0...v0.1.1)


### 🚀 Enhancements

  - Introduce style system and add first component, a button ([aff9956](https://github.com/haus23/tipprunde/commit/aff9956))
  - Add reusable dialog. ([d316dce](https://github.com/haus23/tipprunde/commit/d316dce))
  - Add dialog to select championship. ([821da9e](https://github.com/haus23/tipprunde/commit/821da9e))

### 🩹 Fixes

  - **seo:** Provide page title ([99a07ae](https://github.com/haus23/tipprunde/commit/99a07ae))
  - Hide scrollbars on desktop. ([caec90f](https://github.com/haus23/tipprunde/commit/caec90f))

### 💅 Refactors

  - Extract championship data from route-matches ([e1b5e02](https://github.com/haus23/tipprunde/commit/e1b5e02))
  - Make use-championship more state-like. ([7056730](https://github.com/haus23/tipprunde/commit/7056730))

### ❤️  Contributors

- Micha Buchholz <micha@haus23.net>

## v0.1.0

[compare changes](https://github.com/haus23/tipprunde/compare/v0.0.2...v0.1.0)


### 🚀 Enhancements

  - Implement plain ranking. ([8a71871](https://github.com/haus23/tipprunde/commit/8a71871))

### ❤️  Contributors

- Micha Buchholz <micha@haus23.net>

## v0.0.2

[compare changes](https://github.com/haus23/tipprunde/compare/v0.0.1...v0.0.2)


### 🚀 Enhancements

  - Add color theme and system ([d8545ab](https://github.com/haus23/tipprunde/commit/d8545ab))
  - Start implement routing ([02cef84](https://github.com/haus23/tipprunde/commit/02cef84))

### 🏡 Chore

  - Initial branding. ([fc1248e](https://github.com/haus23/tipprunde/commit/fc1248e))
  - Install and configure tailwindcss ([ef37375](https://github.com/haus23/tipprunde/commit/ef37375))
  - Remove CSS bundling feature. ([27bf988](https://github.com/haus23/tipprunde/commit/27bf988))

### ❤️  Contributors

- Micha Buchholz <micha@haus23.net>

## v0.0.1


### 🏡 Chore

  - Create remix app. Initial commit. ([4607351](https://github.com/haus23/tipprunde/commit/4607351))
  - Configure formatting. ([9bc82fe](https://github.com/haus23/tipprunde/commit/9bc82fe))
  - Update project/package and add license. ([1d034f0](https://github.com/haus23/tipprunde/commit/1d034f0))
  - **dx:** Add changelog generator. ([2fa6a6b](https://github.com/haus23/tipprunde/commit/2fa6a6b))

### ❤️  Contributors

- Micha Buchholz <micha@haus23.net>

