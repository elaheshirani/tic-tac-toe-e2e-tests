import { expect, Page } from '@playwright/test'

export async function verifyUI(page: Page, ui) {
  await expect(page.getByTestId('auth-title')).toHaveText(ui.title)
  await expect(page.getByTestId('auth-subtitle')).toHaveText(ui.subtitle)
  await expect(page.locator('label:has([data-testid="input-name"])')).toContainText(ui.playerName)
  await expect(page.getByTestId('btn-register')).toHaveText(ui.createPlayerButton)
  await expect(page.getByTestId('btn-switch-mode')).toHaveText(ui.switchModeButton)
}

export async function verifyGameUI(page: Page, ui) {
  await expect(page.getByTestId('hello-user')).toContainText(ui.helloUser)
  await expect(page.getByTestId('label-difficulty')).toHaveText(ui.labelDifficulty)
  await expect(page.getByTestId('nav-play')).toHaveText(ui.navPlay)
  await expect(page.getByTestId('nav-profile')).toHaveText(ui.navProfile)
  await expect(page.getByTestId('nav-history')).toHaveText(ui.navHistory)
  await expect(page.getByTestId('btn-logout')).toHaveText(ui.logoutButton)
  await expect(page.getByTestId('status')).toHaveText(ui.status)
  await expect(page.getByTestId('btn-reset')).toHaveText(ui.resetButton)
  await expect(page.getByTestId('btn-hint')).toHaveText(ui.hintButton)
  await expect(page.getByTestId('btn-new')).toHaveText(ui.newButton)
}