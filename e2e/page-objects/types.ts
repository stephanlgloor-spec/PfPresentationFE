/**
 * Global language enum for test multilingual support
 */
export enum Language {
  DE = 'de',  // Deutsch
  FR = 'fr',  // Français
  IT = 'it',  // Italiano
  EN = 'en',  // English
}

/**
 * Widget title translations across all supported languages
 * The text should be loaded from bundles if available in the test environment instead of using hardcoded values. This is a temporary solution until the test environment is updated to provide the necessary translations.
 */
export const WIDGET_TITLES: Record<string, Record<Language, string>> = {
  PAYMENT: {
    [Language.DE]: 'Zahlung / Dauerauftrag erfassen',
    [Language.FR]: 'Saisir un paiement / ordre permanent',
    [Language.IT]: 'Zahlung / Dauerauftrag erfassen',
    [Language.EN]: 'Zahlung / Dauerauftrag erfassen',
  },
  EBILL: {
    [Language.DE]: 'eBill',
    [Language.FR]: 'eBill',
    [Language.IT]: 'eBill',
    [Language.EN]: 'eBill',
  },
  ANALYTICS: {
    [Language.DE]: 'Analysen',
    [Language.FR]: 'Analyses',
    [Language.IT]: 'Analysen',
    [Language.EN]: 'Analysen',
  },
  ASSETS: {
    [Language.DE]: 'Vermögensübersicht',
    [Language.FR]: 'Aperçu de la fortune',
    [Language.IT]: 'Vermögensübersicht',
    [Language.EN]: 'Vermögensübersicht',
  },
  CREDIT_CARD: {
    [Language.DE]: 'Kreditkarte',
    [Language.FR]: 'Carte de crédit',
    [Language.IT]: 'Kreditkarte',
    [Language.EN]: 'Kreditkarte',
  },
  MOVEMENTS: {
    [Language.DE]: 'Bewegungsübersicht',
    [Language.FR]: 'Aperçu des transactions ',
    [Language.IT]: 'Bewegungsübersicht',
    [Language.EN]: 'Bewegungsübersicht',
  },
  EPO_OVERVIEW: {
    [Language.DE]: 'Übersicht EZAG',
    [Language.FR]: 'Aperçu OPAE',
    [Language.IT]: 'Übersicht EZAG',
    [Language.EN]: 'Übersicht EZAG',
  },
  FILE_UPLOAD: {
    [Language.DE]: 'EZAG übermitteln',
    [Language.FR]: 'Transmettre OPAE ',
    [Language.IT]: 'EZAG übermitteln',
    [Language.EN]: 'EZAG übermitteln',
  },
  EDIT_PAYMENT: {
    [Language.DE]: 'Zahlungen suchen',
    [Language.FR]: 'Rechercher paiements',
    [Language.IT]: 'Zahlungen suchen',
    [Language.EN]: 'Zahlungen suchen',
  },
  SEARCH: {
    [Language.DE]: 'EZAG / CH-DD suchen',
    [Language.FR]: 'Rechercher EZAG / CH-DD',
    [Language.IT]: 'Cerca EZAG / CH-DD',
    [Language.EN]: 'Search EZAG / CH-DD',
  },
  ENQUIRY: {
    [Language.DE]: 'Nachforschungen',
    [Language.FR]: 'Demandes de renseignements',
    [Language.IT]: 'Inchieste',
    [Language.EN]: 'Enquiries',
  },
//   QUICK_LINKS: {
//     [Language.DE]: 'Quicklinks',
//     [Language.FR]: 'Liens rapides',
//     [Language.IT]: 'Collegamenti rapidi',
//     [Language.EN]: 'Quick Links',
//   },
};

/**
 * Asset widget table translations
 * The text should be loaded from bundles if available in the test environment instead of using hardcoded values. This is a temporary solution until the test environment is updated to provide the necessary translations.
 */
export const ASSET_TABLE_LABELS: Record<string, Record<Language, string>> = {
  PAYMENT_ACCOUNTS: {
    [Language.DE]: 'Zahlungskonten',
    [Language.FR]: 'Comptes de paiement',
    [Language.IT]: 'Zahlungskonten',
    [Language.EN]: 'Zahlungskonten',
  },
  SAVINGS_ACCOUNTS: {
    [Language.DE]: 'Sparkonten',
    [Language.FR]: "Comptes d'épargne",
    [Language.IT]: 'Sparkonten',
    [Language.EN]: 'Sparkonten',
  },
  INVESTED_ASSETS: {
    [Language.DE]: 'Anlagevermögen',
    [Language.FR]: 'Patrimoine investi',
    [Language.IT]: 'Anlagevermögen',
    [Language.EN]: 'Anlagevermögen',
  },
  PENSION_SAVINGS: {
    [Language.DE]: 'Vorsorgeguthaben',
    [Language.FR]: 'Avoir de prévoyance',
    [Language.IT]: 'Vorsorgeguthaben',
    [Language.EN]: 'Vorsorgeguthaben',
  },
  OTHER_BANK_ACCOUNTS: {
    [Language.DE]: 'Weitere Drittbankkonten',
    [Language.FR]: 'Autres comptes de banques tierces',
    [Language.IT]: 'Weitere Drittbankkonten',
    [Language.EN]: 'Weitere Drittbankkonten',
  },
  TOTAL: {
    [Language.DE]: 'Total',
    [Language.FR]: 'Total',
    [Language.IT]: 'Totale',
    [Language.EN]: 'Total',
  },
};
