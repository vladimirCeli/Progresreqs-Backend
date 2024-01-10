const express = require('express')
const compression = require("compression");
const app = express()
app.disable('x-powered-by')
app.use(compression());
const PORT = process.env.PORT ?? 4000;
const morgan = require('morgan')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const credentials = require('./middleware/credentials')
const { scheduleCleanupTask } = require('./config/Schedule')
const cookieParser = require("cookie-parser");
const verifyJWT = require('./middleware/verifyJWT')
const sequelize = require('../src/config/db');

require('./model/Rol.model.js')
require('./model/Person.model.js')
require('./model/CategoriesRequirements.model.js')
require('./model/SubcategoriesRequirements.model.js')
require('./model/RequirementsSecurity.model.js')
require('./model/Projects.model.js')
require('./model/Requirements.model.js')
require('./model/RequirementsRequirementsSecurity.model.js')
require('./model/Task.model.js')
const Person = require('./model/Person.model.js')
require('./config/mongodb')

app.use(credentials)
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

scheduleCleanupTask();


app.use(require('./routes/logout.routes'))
app.use(require('./routes/auth.routes'))
app.use(require('./routes/register.routes'))
app.use(require('./routes/refreshToken.routes'))
app.use(require('./routes/projects.routes'))
app.use(require('./routes/requirements.routes'))
app.use(require('./routes/tasks.routes'))
app.use(require('./routes/questionnaire/questionnaire.routes'))
app.use(require('./routes/categoriesecurity.routes.js'))
app.use(require('./routes/questionnaire/categorie.routes'))
app.use(require('./routes/subcategories.routes'))
app.use(require('./routes/interequirements.routes'))
app.use(require('./routes/questionnaire/practice.routes'))
app.use(require('./routes/questionnaire/question.routes'))
app.use(require('./routes/requirementssec.routes') )
app.use(require('./routes/tasks.routes'))
app.use(require('./routes/questionnaire/response.routes'))
app.use(verifyJWT)
app.use(require('./routes/person.routes'))

async function main() {
    try {
        await sequelize.authenticate();
        
        await sequelize.sync({ force: false });
        await Person.update({ refresh_token: null }, { where: {} });
        // Crea roles si no existen
        await sequelize.query(`
            INSERT INTO "Role" (id, name) VALUES (1, 'Administrador')
            ON CONFLICT (id) DO NOTHING;
        `);
        await sequelize.query(`
            INSERT INTO "Role" (id, name) VALUES (2, 'Usuario')
            ON CONFLICT (id) DO NOTHING;
        `);
        console.log('Conexión exitosa a PostgreSQL.');
    } catch (error) {
        console.error('Erro de conexión a PostgreSQL.', error);
    }
}
main();

app.listen(PORT, () => {
    console.log('Servidor en puerto',PORT)
})