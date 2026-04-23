// Canonical NAP + brand constants.
// Changes here propagate to every public-facing NAP reference. Do not duplicate
// these values inline — import from this module so the byte-exact canonical
// form stays consistent across the site, JSON-LD, feeds, sitemap, and metadata.

export const SITE_URL = "https://mia-tax.co.il";

// Firm name (the business entity — used for brand references, alts, feed author)
export const SITE_NAME = "מיה — משרד ייעוץ מס והנהלת חשבונות";

// Legal name (registered short form — goes into schema legalName)
export const LEGAL_NAME = "מיה";

// Alternate names (search synonyms for Schema.org alternateName)
export const ALTERNATE_NAMES: readonly string[] = ["מיה", "משרד מיה"];

// Person (Mia as an individual — bylines, Person.name, authors)
export const PERSON_NAME = "מיה זינו";
export const PERSON_JOB_TITLE = "יועצת מס מוסמכת";

// Phone
export const PHONE_DISPLAY = "058-408-7061";
export const PHONE_E164 = "+972584087061";
export const PHONE_TEL = "tel:0584087061";
export const PHONE_WA = "https://wa.me/972584087061";

// Address
export const ADDRESS_STREET = "לאה גולדברג 1";
export const ADDRESS_LOCALITY = "קריית מוצקין";
export const ADDRESS_REGION = "חיפה";
export const ADDRESS_COUNTRY = "IL";
export const ADDRESS_FULL = `${ADDRESS_STREET}, ${ADDRESS_LOCALITY}`;

// Social
export const INSTAGRAM_URL = "https://www.instagram.com/mayazino_";
