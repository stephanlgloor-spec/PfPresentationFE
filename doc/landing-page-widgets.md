# Landing Page Widget Specification

This document was derived from the provided ODT specification for the landing page and is intended to be used for Playwright Page Object generation.

## Global navigation
- Top bar with `data-testid="a11yHeading"`
- Platform items:
  - `data-testid="PlatformEfinance"`
  - `data-testid="PlatformMepo"`
- Navigation list: all items with `data-testid="desktop-navbar-item"`
- Navigation entries:
  - Home
  - Vermögen / Assets
  - Zahlungen / Payments
  - EZAG / Epo
  - Dokumente / Documents
  - Versicherungen / Insurances
  - Produkte / Offers

## Action buttons beside the menu
- Search button (`data-cy="Search"`)
- News and notifications button (`data-cy="NewsAndNotifications"`)
- Profile and settings button (`data-cy="SettingsAndProfile"`)
- Logout button (`data-cy="Logout"`)
- Hamburger menu button (`data-cy="hamburger-menu"`)

## Left column widgets
### Payment / Dauerauftrag erfassen
- Title: widget title
- Input labels: Empfänger
- Input fields for IBAN / Konto, Name, Zahlungsinfo
- Validation errors via `[data-testid="error"]`
- Buttons:
  - Transfer: `[data-cy="smart-bar-transfer"]`
  - QR invoice: `[data-cy="smart-bar-qr-invoice"]`

### eBill
- Title: widget title
- Help button: `[data-testid="widget-help-button"]`
- List: `[data-cy="list-ebill"]`
- Example result row: `[data-cy="list-ebill-item"]`
- Portal link: `[data-cy="portal-link"]`

### Analyses
- Title: widget title
- Settings button: `[data-testid="widget-settings-button"]`
- Help button: `[data-testid="widget-help-button"]`
- Chart area: `[data-cy="widget-content"]`
- Overview button: `[data-testid="fa-balance-link-analysis-overview"]`

### Vermögensübersicht
- Title: widget title
- Help button: `[data-testid="widget-help-button"]`
- Table rows with:
  - `data-testid="description-cell"`
  - `data-testid="total-cell"`
- Rows include:
  - Zahlungskonten
  - Sparkonten
  - Anlagevermögen
  - Vorsorgeguthaben
  - Weitere Drittbankkonten
  - Total
- Details button: `[data-cy="show-details-button"]`

### Kreditkarte
- Title: widget title
- Help button: `[data-testid="widget-help-button"]`
- Panel content: `[data-cy="widget-content"]`
- Amount: `data-cy-fpui-amount` and `data-cy-fpa-amount="-7380.25"`
- Currency: `data-cy-fpa-currency="CHF"`
- Card text: PostFinance
- Details button: `[data-cy="show-details-button"]`

### Zahlungen
- Title: widget title
- Edit payment action: `[data-cy="editPayment"]`
- Help button: `[data-testid="widget-help-button"]`
- Quicklinks render within `fpui-quicklinks`

### EZAG / CH-DD
- Title: widget title
- Quicklinks:
  - EZAG payment order
  - single EZAG order

### Nachforschungen
- Title: widget title
- Quicklinks:
  - Overview
  - Single search
  - Batch search

## Right column widgets
### Bewegungsübersicht
- Title: widget title
- Settings and help buttons
- Dropdown with primary label and secondary description
- Amount text and account balance
- Table with pending orders columns: amount and balance preview
- Last movements table with columns:
  - icon cell
  - date cell
  - short text cell
  - balance cell
  - actions cell
- Buttons: Auftragsübersicht, Alle Bewegungen

### Kreditkarte (secondary card)
- Help button
- Amount and available balance
- Buttons: Details, Laden

### Übersicht EZAG
- Title: widget title
- Help button
- File table with columns:
  - `data-testid="fileName-cell"`
  - `data-testid="status-cell"`
  - `data-testid="fileDetails-cell"`
- Example rows:
  - PF03, in progress, no hyperlink
  - Löhne, error, hyperlink
  - PF01, checked, order created, hyperlink
- Button: `data-cy="show-all-button"`

### EZAG übermitteln
- Title: widget title
- Help button
- File uploader content: `[data-testid="fileUploader-content"]`
- Text: "Datei hierhin ziehen oder klicken, um eine Datei auszuwählen. Erlaubte Formate: xml"

## Recommendations for generated Page Objects
- `LandingPage` should aggregate the page-level widgets.
- `NavigationBar` should model the top nav items and quick actions.
- `PaymentWidget` should model the payment form and validation states.
- `EBillWidget` should model the list and portal link.
- `AnalyticsWidget` should model the chart container and actions.
- `AssetsWidget` should model the balance table and details button.
- `CreditCardWidget` should model the card amount and CTA buttons.
- `QuickLinksWidget` should model the links section.
- `MovementsWidget` should model the table and actions.
- `FileUploadWidget` should model the uploader panel.
