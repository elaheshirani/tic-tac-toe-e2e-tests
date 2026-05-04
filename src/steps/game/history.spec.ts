import { Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { CustomWorld } from '../../support/world'

Then('result should be stored in history', async function (this: CustomWorld) {
    await this.page.getByTestId('nav-history').click()

    const items = this.page.getByTestId('view-history')
    await expect(items.first()).toBeVisible()
})

When('I open history navbar', async function (this: CustomWorld) {
    await this.page.getByTestId('nav-history').click()
})

Then('previous game results should be displayed', async function (this: CustomWorld) {
    const historyItems = this.page.getByTestId('history-item')

    await expect(historyItems.first()).toBeVisible()
    const count = await this.page.getByTestId('history-item').count()
    expect(count).toBeGreaterThan(0)
})

When('I click on clear History button', async function (this: CustomWorld) {
    await this.page.getByTestId('clear-history-btn').click()
})

Then('I should see message {string}', async function (this: CustomWorld, msg: string) {
    await expect(this.page.getByText(msg)).toBeVisible()
})

When('I click ok button', async function (this: CustomWorld) {
    await this.page.getByTestId('confirm-ok-btn').click()
})

Then('history should be empty', async function (this: CustomWorld) {
    const items = this.page.getByTestId('history-item')

    const count = await items.count()
    expect(count).toBe(0)
})

