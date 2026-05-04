import { Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { CustomWorld } from '../../support/world'

When('I click on Get Hint button', async function (this: CustomWorld) {
    await this.page.getByTestId('btn-hint').click()
})

Then('a suggested cell should be highlighted', async function (this: CustomWorld) {
    const cells = this.page.locator('[data-testid^="cell-"]')

    const count = await cells.count()

    let hasHighlightedCell = false

    for (let i = 0; i < count; i++) {
        const cell = cells.nth(i)

        const borderColor = await cell.evaluate(el =>
            getComputedStyle(el).borderColor
        )

        const isNotDefaultBorder =
            borderColor !== 'rgb(0, 0, 0)' &&
            borderColor !== 'black'

        if (isNotDefaultBorder) {
            hasHighlightedCell = true
            break;
        }
    }

    expect(hasHighlightedCell).toBeTruthy()
})
