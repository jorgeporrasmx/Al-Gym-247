import assert from 'node:assert/strict'
import { buildInterestFormURL, resolveAttribution } from './lead-attribution'

const base = 'https://forms.monday.com/forms/34bf2aeca8d71c4b8b5ce4fb4111c244?r=use1'
const ads = resolveAttribution('https://www.algym247.com/?gclid=TEST_CLICK&utm_source=google&utm_medium=cpc&campaign_id=123&ad_id=456&email=private@example.com', '', undefined, 1000)
assert.equal(ads.source, 'Google Ads')
assert.equal(ads.parameters.gclid, 'TEST_CLICK')
assert(!ads.landingPage.includes('private'))
const nextPage = resolveAttribution('https://www.algym247.com/ubicaciones/azcapotzalco', '', ads, 2000)
assert.equal(nextPage, ads)
const form = new URL(buildInterestFormURL(base, nextPage))
assert.equal(form.searchParams.get('gclid'), 'TEST_CLICK')
assert.equal(form.searchParams.get('campaign_id'), '123')
assert.equal(form.searchParams.get('acquisition_source'), 'Google Ads')
assert.equal(form.searchParams.get('contact_channel'), 'Formulario web')
assert.equal(form.searchParams.get('r'), 'use1')
assert.equal(form.searchParams.get('email'), null)

for (const id of ['gbraid', 'wbraid']) {
  assert.equal(resolveAttribution(`https://www.algym247.com/?${id}=TEST`).source, 'Google Ads')
}
assert.equal(resolveAttribution('https://www.algym247.com/?utm_source=google&utm_medium=cpc').source, 'Google Ads')
assert.equal(resolveAttribution('https://www.algym247.com/', 'https://www.google.com.mx/search?q=gym').source, 'Google')
assert.equal(resolveAttribution('https://www.algym247.com/', 'https://www.google.com.evil.test/').source, undefined)
assert.equal(resolveAttribution('https://www.algym247.com/').source, undefined)
const replaced = resolveAttribution('https://www.algym247.com/?utm_source=google&utm_medium=organic', '', ads, 3000)
assert.equal(replaced.source, 'Google')
assert.equal(replaced.parameters.gclid, undefined)
const expired = resolveAttribution('https://www.algym247.com/', '', ads, 1000 + 31 * 60 * 1000)
assert.equal(expired.source, undefined)
assert.equal(expired.parameters.gclid, undefined)
assert.equal(buildInterestFormURL(base), base)
console.log('Atribución verificada: Google Ads, orgánico, navegación, reemplazo, caducidad y URL de formulario. Sin envíos.')
