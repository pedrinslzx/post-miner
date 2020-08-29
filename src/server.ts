import express from 'express'
import morgan from 'morgan'
import { Instagram } from './connect'
const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  return res.json({
    methods: {
      instagram: 'http://localhost:3333/instagram/:username',
    },
    developer: {
      instagram: 'https://instagram.com/pedrinho.lemes',
      github: 'https://github.com/pedrinholemes',
      twitter: 'https://twitter.com/pedrinho_lemes',
      website: 'https://pedrinholemes.web.app'
    }
  })
})

app.get('/instagram/:user', async (req, res) => {
  const { user } = req.params
  const { count } = req.query
  const response = await Instagram(user, Number(count) || undefined)
  return res.json(response)
})

app.use((req, res) => {
  return res.status(404).json({
    err: {
      code: '404'
    },
    methods: {
      instagram: 'http://localhost:3333/instagram/:username',
    },
    developer: {
      instagram: 'https://instagram.com/pedrinho.lemes',
      github: 'https://github.com/pedrinholemes',
      twitter: 'https://twitter.com/pedrinho_lemes',
      website: 'https://pedrinholemes.web.app'
    }
  })
})

app.listen(process.env.PORT || 3333)
