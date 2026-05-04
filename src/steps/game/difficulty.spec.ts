
import { Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { CustomWorld } from '../../support/world'

When('I open the difficulty dropdown', async function (this: CustomWorld) {
    await this.page.getByTestId('select-difficulty').click()
})

When('I select {string} difficulty', async function (this: CustomWorld, level: string) {
    await this.page.getByTestId('select-difficulty').selectOption({ label: level })
})

Then('the difficulty should be set to {string}', async function (this: CustomWorld, level: string) {
    const dropdown = this.page.getByTestId('select-difficulty')
    const value = await dropdown.inputValue()
    expect(value.toLowerCase()).toContain(level.toLowerCase())
})

When('I click on Play', async function (this: CustomWorld) {
    await this.page.getByRole('button', { name: 'Play' }).click()
})

Then('the game should start in {string} mode', async function (this: CustomWorld, level: string) {
    const indicator = this.page.locator('[data-testid="select-difficulty"]')
    await expect(indicator).toContainText(level)
})

When('I start a new game', async function (this: CustomWorld) {
    await this.page.getByRole('button', { name: 'Play' }).click()
})

When('I make a move in any cell', async function (this: CustomWorld) {
    const cells = this.page.locator('[data-testid^="cell-"]')

    const emptyCell = cells.filter({
        hasNotText: /X|O/
    }).first()

    await emptyCell.click()
})

Then('the computer should make a move automatically', async function (this: CustomWorld) {
    const cells = this.page.locator('[data-testid^="cell-"]')

    await expect.poll(async () => {
        const texts = await cells.allTextContents()
        return texts.filter(t => t === 'O').length
    }, {
        timeout: 5000
    }).toBeGreaterThan(0)
})

Then('the board should contain both X and O', async function (this: CustomWorld) {
    const cells = this.page.locator('[data-testid^="cell-"]')
    const texts = await cells.allTextContents()

    const hasX = texts.includes('X')
    const hasO = texts.includes('O')

    expect(hasX).toBeTruthy()
    expect(hasO).toBeTruthy()
})
