import express from 'express'
import './database'
import routes from './routes'

const PORT  = process.env.PORT || 3333
const app = express();

app.use(express.json())
app.use(routes)
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))