/**
 * Barrel file — exports every schema type so sanity.config.ts can
 * register them all in one import.
 */
import { homePage } from './homePage'
import { service } from './service'
import { faq } from './faq'
import { testimonial } from './testimonial'

export const schemaTypes = [homePage, service, faq, testimonial]
