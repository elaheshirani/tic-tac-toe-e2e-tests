import { Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { CustomWorld } from '../../support/world'


When(
    'I have two {string} in a row',
    async function (this: CustomWorld, symbol: string) {
        const cells = this.page.locator('[data-testid^="cell-"]')

        await cells.nth(0).click()
        await cells.nth(1).click()

        await this.page.waitForTimeout(500)

        await expect(this.page.getByTestId('status')).toBeVisible()
    }
)


When(
    'I complete the third cell',
    async function (this: CustomWorld) {
        const cells = this.page.locator('[data-testid^="cell-"]')

        const emptyCells = await cells.filter({
            hasNotText: /X|O/
        })

        const count = await emptyCells.count()
        if (count === 0) {
            throw new Error('No empty cell found to click')
        }

        await emptyCells.first().click()
        await this.page.waitForTimeout(300)
    }
)

Then(
    'I should win the game',
    async function (this: CustomWorld) {
        await expect(this.page.getByTestId('status'))
            .toHaveText(/You win!/i)
    }
)

Then(
    'winning cells should be highlighted',
    async function (this: CustomWorld) {
        const cells = this.page.locator('[data-testid^="cell-"]')

        for (let i = 0; i < await cells.count(); i++) {
            const className = await cells.nth(i).getAttribute('class')

            if (className?.includes('is-win')) {
                await expect(cells.nth(i)).toHaveClass(/is-win/)
            }
        }
    }
)

When(
    'I play until the board is almost full',
    async function (this: CustomWorld) {
        const page = this.page
        const cells = page.locator('[data-testid^="cell-"]')
        const status = page.getByTestId('status')

        let moves = 0
        const maxMoves = 5

        while (moves < maxMoves) {

            const text = await status.textContent()

            if (text?.toLowerCase().includes('draw') ||
                text?.toLowerCase().includes('win')) {
                break
            }

            if (text?.toLowerCase().includes('your turn')) {

                const count = await cells.count()

                let clicked = false

                for (let i = 0; i < count; i++) {
                    const cellText = await cells.nth(i).textContent()

                    if (!cellText) {
                        await cells.nth(i).click()
                        clicked = true
                        moves++
                        break
                    }
                }

                if (!clicked) break
            }

            await page.waitForTimeout(200)
        }
    }
)

Then(
    'the game result should be draw',
    async function (this: CustomWorld) {

        const status = this.page.getByTestId('status')

        await expect(status).not.toHaveText(/your turn/i, {
            timeout: 10000
        })

        await expect(status).toHaveText(/draw/i)
    }
)

Then(
    'no winning cells should be highlighted',
    async function (this: CustomWorld) {
        const cells = this.page.locator('[data-testid^="cell-"]')

        for (let i = 0; i < await cells.count(); i++) {
            const className = await cells.nth(i).getAttribute('class')

            expect(className).not.toContain('is-win')
        }
    }
)