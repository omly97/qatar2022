const express = require('express')
const cors = require('cors')
const competitionRoutes = require('./routes/competition')
const seasonRoutes = require('./routes/season')
const calendarRoutes = require('./routes/calendar')
const matchRoutes = require('./routes/video')
const rankinRoutes = require('./routes/rankin')

const config = {
    name: 'quatar2022-api',
    port: 3000,
    host: '0.0.0.0',
};

const app = express()
app.use(express.json())
app.use(cors())
app.use('/competitions', competitionRoutes)
app.use('/seasons', seasonRoutes)
app.use('/calendar', calendarRoutes)
app.use('/videos', matchRoutes)
app.use('/rankin', rankinRoutes)

app.listen(config.port, config.host, (e)=> {
    if(e) {
        throw new Error('Internal Server Error');
    }
});

