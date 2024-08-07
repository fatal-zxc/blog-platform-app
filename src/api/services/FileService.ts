import * as uuid from 'uuid'
import path from 'path'
import fs from 'fs'
import util from 'util'

const readFile = util.promisify(fs.readFile)

class FileService {
  async saveImage(image) {
    try {
      const fileName = uuid.v4() + image.name.slice(image.name.lastIndexOf('.'))
      const filePath = path.resolve('src/api/static/avatars', fileName)
      await image.mv(filePath)
      return fileName
    } catch (e) {
      console.log(e)
    }
  }

  saveMD(text) {
    try {
      const fileName = uuid.v4() + '.md'
      const filePath = path.resolve('src/api/static/articles', fileName)
      fs.writeFile(filePath, text, () => {})
      return fileName
    } catch (e) {
      console.log(e)
    }
  }

  async getFile(fileName: string, dir: string) {
    try {
      const filePath = path.resolve(`src/api/static/${dir}`, fileName)
      const file = await readFile(filePath, { encoding: 'utf8' })
      return file
    } catch (e) {
      console.log(e)
    }
  }

  deleteFile(fileName: string, dir: string): void {
    try {
      const filePath = path.resolve(`src/api/static/${dir}`, fileName)
      fs.rm(filePath, () => {})
    } catch (e) {
      console.log(e)
    }
  }
}

export default new FileService()
