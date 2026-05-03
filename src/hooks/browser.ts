import { After, Before, setDefaultTimeout } from '@cucumber/cucumber'

import { CustomWorld } from '../support/world'


Before(async function (this: CustomWorld) {
  await this.openBrowser()
})

After(async function (this: CustomWorld) {
  await this.closeBrowser()
})
