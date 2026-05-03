import { Given, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { CustomWorld } from '../../support/world'
import { config } from '../../support/config'
import { REGISTER_TEXTS } from '../../data/data'

Given('I navigate to Tic Tac Toe page', async function (this: CustomWorld) {
    await this.page.goto(config.BASE_URL)
})

Then('I should see Welcome message and subtitle for register', async function (this: CustomWorld) {
    await expect(this.page.getByTestId('auth-title'))
        .toHaveText(REGISTER_TEXTS.title)
    await expect(this.page.getByTestId('auth-subtitle'))
        .toHaveText(REGISTER_TEXTS.subtitle)
})

Then('I should see Language change button', async function (this: CustomWorld) {
    const languageButton = this.page.getByTestId('select-language')
    await expect(languageButton).toBeVisible()
})

Then('I should see Theme change button', async function (this: CustomWorld) {
    const languageButton = this.page.getByTestId('btn-theme')
    await expect(languageButton).toBeVisible()
})

When('I enter {string} for PLAYER NAME', async function (this: CustomWorld, name: string) {
    await this.page.getByTestId('input-name').fill(name)
})

When('I click on Create Acount button', async function (this: CustomWorld) {
    await this.page.getByTestId('btn-register').click()
})

Then('I should see a message for user game subtitle',
    async function (this: CustomWorld) {
        await expect(this.page.getByTestId('subtitle')).toHaveText(REGISTER_TEXTS.gameSubtitle)
    }
)

Then('I should see {string} for welcome user',
    async function (this: CustomWorld, expectedText: string) {
        await expect(this.page.getByTestId('hello-user')).toHaveText(expectedText)
    }
)

Then('I should see a message in red color saying {string} under input box Player name',
    async function (this: CustomWorld, msg: string) {
        await expect(this.page.getByTestId('auth-error')).toHaveText(msg)
    }
)

When('I click Logout button', async function (this: CustomWorld) {
    await this.page.getByTestId('btn-logout').click()
})




