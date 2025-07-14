import { Locales } from './locale'

import sectionsEs from './sections/en-mx'
import sectionsEn from './sections/en-us'


const messages = {
  [Locales.EN]: { ...sectionsEn },
  [Locales.ES]: { ...sectionsEs },
}

const defaultLocale =  Locales.ES

export { messages, defaultLocale }
