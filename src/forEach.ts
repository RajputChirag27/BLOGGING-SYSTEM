import mongoose from 'mongoose'
import { Module } from './models'
import { config } from 'dotenv'
config()

const model = ['users', 'blogs', 'comments']
let result = []

async function processModels() {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Database connected successfully')

    const promises = []
    model.forEach(modelName => {
      const dataPromise = Module.findOne({ name: modelName })
      promises.push(dataPromise)
    })

    // Wait for all promises to resolve
    result = await Promise.all(promises)

    console.log(result)
  } catch (err) {
    console.error(err)
  } finally {
    mongoose.connection.close()
  }
}

processModels()
