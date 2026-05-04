import { Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { CustomWorld } from '../../support/world'

When('I click on theme button', async function (this: CustomWorld) {
    await this.page.getByTestId('btn-theme').click()
})

Then('theme should change to Dark', async function (this: CustomWorld) {
    const html = this.page.locator('html')
    await expect(html).toHaveAttribute('data-theme', 'dark')
})

When('I refresh the page', async function (this: CustomWorld) {
    await this.page.reload()
})

Then('theme should remain Light', async function (this: CustomWorld) {
    const html = this.page.locator('html')
    await expect(html).toHaveAttribute('data-theme', 'light')
})
