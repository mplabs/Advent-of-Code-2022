import { constants } from 'fs'
import { access, open } from 'fs/promises'

export async function createFile(filename: string): Promise<void> {
  await open(filename, 'a').catch((e) => {})
}

export async function pathExists(path: string): Promise<boolean> {
  return await Boolean(
    access(path, constants.R_OK | constants.W_OK).catch(() => false)
  )
}

export async function readFileToArray(filename: string): Promise<string[]> {
  const file = await open(filename, 'r')

  let result = []
  for await (const line of file.readLines()) {
    result.push(line)
  }

  return result
}
