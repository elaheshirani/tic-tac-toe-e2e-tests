import { Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { CustomWorld } from '../../support/world'
import { TEXTS } from '../../data/data'
import { verifyGameUI, verifyUI } from '../../utils/helpers'

When('I select {string} for language page', async function (this: CustomWorld, language: string) {
    const select = this.page.locator('[data-testid="select-language"]')
    const value = language === 'English' ? 'en' : 'fa'
    await select.selectOption(value)
})

Then('layout direction should be RTL', async function (this: CustomWorld) {
    const dir = await this.page.locator('html').getAttribute('dir')
    expect(dir).toBe('rtl')
})

Then('layout direction should be LTR', async function (this: CustomWorld) {
    const dir = await this.page.locator('html').getAttribute('dir')
    expect(dir).toBe('ltr')
})

Then('UI should be displayed in Persian', async function (this: CustomWorld) {
    const ui = TEXTS.fa
    await verifyUI(this.page, ui)
})

Then('UI should be displayed in English', async function (this: CustomWorld) {
    const ui = TEXTS.en
    await verifyUI(this.page, ui)
})

Then('game UI should be in Persian', async function (this: CustomWorld) {
    const ui = TEXTS.fa
    await verifyGameUI(this.page, ui)
})

Then('game UI should be in English', async function (this: CustomWorld) {
    const ui = TEXTS.en
    await verifyGameUI(this.page, ui)
})
