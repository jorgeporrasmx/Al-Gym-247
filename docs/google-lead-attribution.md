# Google to the existing Monday interest form

The campaign already supplies UTM, campaign/ad group/ad IDs. Previously all three
"Me interesa" buttons opened a constant WorkForm URL, dropping these values.

This change captures an allowlist of tracking fields in sessionStorage (30-minute
window), keeps them through internal navigation and passes them to the existing
WorkForm. A new explicitly tagged campaign replaces the entire attribution bundle;
it never inherits the previous campaign's click ID. Unknown/direct traffic stays
unknown. Google search referrers from google.com and google.com.mx are recognized.
Arbitrary URL parameters are excluded from the stored landing URL.

The existing WorkForm token is `34bf2aeca8d71c4b8b5ce4fb4111c244`.
Its existing source question now accepts `acquisition_source` as a prefill. It stays
visible/editable; tracking fields provide separate evidence from that answer.
Twelve hidden questions were mapped to existing board columns on 2026-11-11:

| Query parameter | Existing Monday column |
| --- | --- |
| gclid | text_mm388zbj |
| gbraid | text_mm38svxa |
| wbraid | text_mm3864hs |
| utm_source | text_mm381qzg |
| utm_medium | text_mm38mrv9 |
| utm_campaign | text_mm3889he |
| utm_content | text_mm38418w |
| utm_term | text_mm388zam |
| landing_page | text_mm38vzd3 |
| campaign_id | text_mkzbrs89 |
| ad_id | text_mkzbc1ta |
| contact_channel | text_mm3qart8 |

No new board columns were created. `adgroup_id` is preserved in the landing URL;
the existing Meta Adset ID column is not repurposed for Google.

## Validation and operational boundary

- `npx tsx lib/lead-attribution.test.ts`: synthetic identifiers, no submissions.
- `npx tsc --noEmit --incremental false` and `next build`.
- Internal-browser test: Google-tagged local home -> Azcapotzalco detail ->
  Me interesa -> real WorkForm with Google Ads visibly preselected and tracking
  parameters retained in its URL. No names, emails or phones entered; no submit.
- The capture component has its own Suspense boundary so public page content stays
  statically rendered.

This does not repair the separate WhatsApp backend, upload offline conversions,
or make a WhatsApp click count as a confirmed lead. The website must be deployed
before production buttons transmit the parameters. Actual persistence on a
submitted Monday item still requires observing a legitimate submission.

## Google Ads conversion follow-up

Agree the exact CRM milestone that counts as a confirmed prospect. Import once per
unique prospect/milestone, with the original Google click identifier and actual
confirmation timestamp, and retain upload results for reconciliation. Keep this
conversion separate from page views. Switch campaign optimization only after
validating accepted uploads. Do not fabricate historical click IDs or infer Google
origin from an unclassified WhatsApp contact.

Creating the offline action currently asks the account owner to attest compliance
with Google's customer-data/consent policies. No such attestation or upload was
performed during this audit.
