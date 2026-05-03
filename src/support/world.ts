import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber'
import {
  APIRequestContext,
  Browser,
  BrowserContext,
  chromium,
  Page,
} from 'playwright'

import { config } from './config'

export class CustomWorld extends World {
  private browserInstance?: Browser
  private contextInstance?: BrowserContext
  private pageInstance?: Page

  lastClickedCell: number | null = null
  lastCellValue: string | null = null

  constructor(options: IWorldOptions) {
    super(options)
  }

  async openBrowser(headless = config.headLess): Promise<void> {
    this.browserInstance = await chromium.launch({ headless })

    this.contextInstance = await this.browserInstance.newContext({
      ignoreHTTPSErrors: true,
      baseURL: config.BASE_URL,
    })

    this.pageInstance = await this.contextInstance.newPage()
  }

  async closeBrowser(): Promise<void> {
    await this.pageInstance?.close()
    await this.contextInstance?.close()
    await this.browserInstance?.close()
  }

  get page(): Page {
    if (!this.pageInstance) {
      throw new Error('Page is not initialized')
    }
    return this.pageInstance
  }

  get context(): BrowserContext {
    if (!this.contextInstance) {
      throw new Error('Context is not initialized')
    }
    return this.contextInstance
  }

  get browser(): Browser {
    if (!this.browserInstance) {
      throw new Error('Browser is not initialized')
    }
    return this.browserInstance
  }

  get request(): APIRequestContext {
    return this.context.request
  }

}

setWorldConstructor(CustomWorld)
