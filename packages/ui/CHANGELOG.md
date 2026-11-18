# Changelog

All notable changes to `@atanael/ui` are documented here.
This project follows [Semantic Versioning](https://semver.org/).

## [0.1.0] - 2026-11-18

### Added

- Initial public release of the component library.
- Theme system: `ThemeProvider`, `ThemeToggle`, `useTheme`, `themeInitScript`.
- Drawer system: `Drawer`, `DrawerHeader`, `DrawerContent`, `DrawerFooter`, `DrawerToggle`, `LeftDrawer`, `RightDrawer` and hooks.
- Buttons: `Button`, `ButtonGroup`, `ButtonDropDown`, `ButtonRadioGroup`, `ButtonToggle`, FABs and `PillsBadge`.
- Inputs: text, textarea, password, email, number, date, month, file, date/time pickers, checkbox, radio, radio group, fieldset, progress, range slider, dropdown, select, accessible combobox and optional rich text editor.
- Display: typography, accordion, blockquote, badge, timeline, clipboard and iframe.
- Feedback: loading states, skeletons, empty and failure states.
- Overlays: tooltip (with `asChild` and portal support), balloon, confirm, dialog, dialog fields, modal grid and timeline modal.
- Navigation: pagination, sort control and page tabs.
- Table: `DataTable` with filtering and empty state.
- Charts: `PieChart`, `AnswersChart`, `UserHoursBarChart` in pure SVG.
- Cards: `Card`, `CardTitle`, `CardBody`, `CardActions`, `CardImage`.
- Utilities: `cn` (clsx + tailwind-merge), `empty`, `nl2br`, `numberBetween`.
- Tailwind v4 stylesheet with design tokens, light/dark themes and focus-visible defaults.
- TypeScript declarations, unbundled ESM output and preserved `"use client"` directives.

### Changed

- `cn` now resolves Tailwind class conflicts via `tailwind-merge`.
- `TooltipComponent` now honors `asChild` and `usePortal`.
- `Dialog` supports a controlled `open`/`onClose`/`onConfirm` API.
- `InputFile`, `Clipboard` and `RichText` no longer depend on an app context; they expose callbacks.
- `CardImage` and `Loading` no longer depend on `next/image`.
- `DataHora` no longer depends on `moment`.

### Removed

- Runtime dependencies on `moment`, `react-tailwindcss-select`, `react-toastify`, `flag-icons` and MediaPipe.
- Any Next.js import from the library core.
