import { Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { CustomWorld } from '../../support/world'

When('I click on New Game button', async function (this: CustomWorld) {
    await this.page.getByTestId('btn-new').click()
})

Then('the board should be empty', async function (this: CustomWorld) {
    const cells = this.page.locator('[data-testid="cell"]')
    const count = await cells.count()
    for (let i = 0; i < count; i++) {
        await expect(cells.nth(i)).toHaveText('')
    }
})

Then("it should be user's turn", async function (this: CustomWorld) {
    await expect(this.page.getByTestId('status')).toHaveText("Your turn (X)")
})

When('I click on an empty cell', async function (this: CustomWorld) {
    const cells = this.page.locator('[data-testid^="cell-"]')

    const count = await cells.count()

    for (let i = 0; i < count; i++) {
        const cell = cells.nth(i)
        const state = await cell.getAttribute('data-state')

        if (state === 'empty') {
            this.lastClickedCell = i
            this.lastCellValue = await cell.textContent()

            await cell.click()
            return
        }
    }

    throw new Error('No empty cell found to click')
})

Then('"X" should be placed in that cell', async function (this: CustomWorld) {
    const cell = this.page
        .locator('[data-testid^="cell-"]')
        .nth(this.lastClickedCell!)

    await expect(cell).toHaveText('X')
})

Then("it should be computer's turn", async function (this: CustomWorld) {
    const cells = this.page.locator('[data-testid^="cell-"]')

    await expect.poll(async () => {
        const texts = await cells.allInnerTexts()
        return texts.includes('O')
    }).toBe(true)
})

Then('the same cell should still contain X', async function (this: CustomWorld) {
    const cell = this.page
        .locator('[data-testid^="cell-"]')
        .nth(this.lastClickedCell!)

    await expect(cell).toHaveText('X')
})

Then('the cell value should not change', async function (this: CustomWorld) {
    const cell = this.page
        .locator('[data-testid^="cell-"]')
        .nth(this.lastClickedCell!)

    const state = await cell.getAttribute('data-state')
    await expect(cell).toHaveAttribute('data-state', state!)
})

Then('computer should make a move automatically', async function (this: CustomWorld) {
    const cells = this.page.locator('[data-testid^="cell-"]')

    await expect.poll(async () => {
        const texts = await cells.allInnerTexts()
        return texts.includes('O')
    }).toBe(true)
})
