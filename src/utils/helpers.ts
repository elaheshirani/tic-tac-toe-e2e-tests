import { expect, Page } from '@playwright/test'

export async function waitForTableOrEmpty(page: Page, tableTestId: string, emptyWrapperTestId: string) {
  const table = page.getByTestId(tableTestId)
  const emptyWrapper = page.getByTestId(emptyWrapperTestId)

  await Promise.race([
    table.waitFor({
      state: 'visible',
      timeout: 8000,
    }).catch(() => null),
    emptyWrapper.waitFor({
      state: 'visible',
      timeout: 8000,
    }).catch(() => null),
  ])

  return {
    table,
    emptyWrapper,
  }
}

