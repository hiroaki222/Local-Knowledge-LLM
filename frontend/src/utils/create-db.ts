import { mongoClient } from '@/lib/utils/db'

mongoClient.db('main').createCollection('data')
