# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\playwright\solver.spec.ts >> pozzle solved
- Location: tests\playwright\solver.spec.ts:8:5

# Error details

```
Error: locator.scrollIntoViewIfNeeded: Target page, context or browser has been closed
```

# Test source

```ts
  1  | import { Page } from '@playwright/test'
  2  | 
  3  | import { ItemStatus } from "../../../src/types/state"
  4  | 
  5  | import { pause } from "./pause"
  6  | 
  7  | const DRAG_PAUSE = 200
  8  | 
  9  | export type PuzzleItem = {
  10 |   label: string
  11 |   state: ItemStatus
  12 | }
  13 | 
  14 | export async function clickButtonByText(page: Page, text: string) {
  15 |   await page.getByRole('button', { name: text }).click()
  16 |   await pause(DRAG_PAUSE)
  17 | }
  18 | 
  19 | export async function getPuzzleItems(page: Page): Promise<PuzzleItem[]> {
  20 |   const cards = page.locator('[data-state]')
  21 | 
  22 |   const count = await cards.count()
  23 | 
  24 |   const result: PuzzleItem[] = []
  25 | 
  26 |   for (let i = 0; i < count; i++) {
  27 |     const card = cards.nth(i)
  28 | 
  29 |     const label = await card.locator('p').innerText()
  30 |     const state = (await card.getAttribute('data-state')) as ItemStatus
  31 | 
  32 |     result.push({ label, state })
  33 |   }
  34 | 
  35 |   return result
  36 | }
  37 | 
  38 | 
  39 | export async function dragItemToIndex(page: Page, fromIndex: number, toIndex: number) {
  40 |   const items = page.locator('[data-state]')
  41 | 
  42 |   const from = items.nth(fromIndex)
  43 |   const to = items.nth(toIndex)
  44 | 
> 45 |   await from.scrollIntoViewIfNeeded()
     |              ^ Error: locator.scrollIntoViewIfNeeded: Target page, context or browser has been closed
  46 |   await to.scrollIntoViewIfNeeded()
  47 | 
  48 |   const fromBox = await from.boundingBox()
  49 |   const toBox = await to.boundingBox()
  50 | 
  51 |   if (!fromBox || !toBox) throw new Error('Missing bounding box')
  52 | 
  53 |   await page.mouse.move(fromBox.x + fromBox.width / 2, fromBox.y + fromBox.height / 2)
  54 |   await page.mouse.down()
  55 | 
  56 |   await page.mouse.move(
  57 |     toBox.x + toBox.width / 2,
  58 |     toBox.y + toBox.height / 2,
  59 |     { steps: 50 }
  60 |   )
  61 | 
  62 |   await page.mouse.up()
  63 |   await pause(DRAG_PAUSE)
  64 | }
  65 | 
  66 | 
  67 | export async function isPuzzleSolved(page: Page): Promise<boolean> {
  68 |   const winMessage = page.getByText('Correct! You solved the puzzle.')
  69 | 
  70 |   return await winMessage.isVisible().catch(() => false)
  71 | }
```