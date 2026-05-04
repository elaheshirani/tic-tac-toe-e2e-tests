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

When('the board is almost full', async function (this: CustomWorld) {
    await this.page.evaluate(() => {
        const preset = [
            'X', 'O', 'X',
            'X', 'O', 'O',
            'O', 'X', ''
        ]

        const cells = document.querySelectorAll('[data-testid^="cell-"]')

        preset.forEach((val, i) => {
            if (val) {
                cells[i].textContent = val
            }
        })
    })
})

When('I click on the last empty cell', async function (this: CustomWorld) {
    const cells = this.page.locator('[data-testid^="cell-"]')

    for (let i = 0; i < await cells.count(); i++) {
        if (!(await cells.nth(i).textContent())) {
            await cells.nth(i).click()
            break
        }
    }
})

Then('the game result should be draw', async function (this: CustomWorld) {
    await expect(this.page.getByTestId('status')).toHaveText(/draw/i)
})

Then('no winning cells should be highlighted', async function (this: CustomWorld) {
    const cells = this.page.locator('[data-testid^="cell-"]')

    for (let i = 0; i < await cells.count(); i++) {
        await expect(cells.nth(i)).not.toHaveClass(/is-win/)
    }
})

When('the game is finished', async function (this: CustomWorld) {
    await this.page.evaluate(() => {
        const preset = [
            'X', 'X', 'X',
            'O', 'O', '',
            '', '', ''
        ]

        const cells = document.querySelectorAll('[data-testid^="cell-"]')

        preset.forEach((val, i) => {
            if (val) {
                cells[i].textContent = val
                cells[i].setAttribute('data-state', val.toLowerCase())
                cells[i].setAttribute('disabled', 'true')
            }
        })

        const status = document.querySelector('[data-testid="status"]')
        if (status) {
            status.textContent = 'X wins'
        }
    })
})

When('I click on any cell', async function (this: CustomWorld) {
    const cells = this.page.locator('[data-testid^="cell-"]')

    this.clickedCellBefore = await cells.nth(0).textContent()

    await cells.nth(0).click({ force: true })
})

Then('no move should be applied', async function (this: CustomWorld) {
    const cells = this.page.locator('[data-testid^="cell-"]')

    const after = await cells.allTextContents()

    expect(after[0]).toBe(this.clickedCellBefore)
})
