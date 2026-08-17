# Custom Agents

This repository uses custom Copilot agents for specialized tasks.

## playwright-page-object-agent

**Location**: `./agents/playwright-page-object.agent.md`

A senior automation engineer agent that creates maintainable Playwright Page Object Model classes from UI specifications, mockups, or widget inventories.

### When to use
- Creating Playwright Page Object Model (POM) classes from a UI specification
- Converting mockups or ODT documents into reusable TypeScript page classes
- Generating E2E test fixtures based on widget inventory

### Input formats
- ODT files (.odt)
- Markdown specifications (.md)
- HTML specs
- Screenshots or mockups
- Existing page/component HTML and selectors

### Output
Generates TypeScript classes under `e2e/page-objects/` organized by widget/section with:
- Stable selectors (data-testid, data-cy, role-based locators)
- Action methods (click, fill, navigate)
- Assertion methods (expectVisible, expectContainsText)
- Production-ready, idiomatic Playwright code
