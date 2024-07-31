import { mongoClient } from '@/lib/utils/db'

mongoClient.db('chatsdb').createCollection('users')
