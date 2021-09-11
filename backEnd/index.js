const express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let jwt = require('jsonwebtoken');
let expressJwt = require('express-jwt');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const sequelize = require('./dataBase/conexion.js');

const port = 3001;
const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(bodyParser.json());

server.listen(port, () => {
    console.log(`Server listeting on port ${port}`)
});

//key for token enrollment
let jwtClave = "5XSNGM0bTFjNCpEV0ZNTElORS02Mg==";
server.use(expressJwt({ secret: jwtClave, algorithms: ['sha1', 'RS256', 'HS256']}).unless({ path: ["/users/login"] }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
server.use(limiter);

//Middleware for admin authorization
const authorization_Admin = (req, res, next) => {
    try {
        const encryptedToken = req.headers.authorization.split(" ")[1];
        console.log(encryptedToken)
        const verify_Token = jwt.verify(encryptedToken, jwtClave);
        console.log(verify_Token)
        if(verify_Token){//si verify_token trae algo, guardelo en req.dataUser
            req.dataUser = verify_Token;//req. es necesario y dataUser es el nombre que yo le asigne
            return next();
        }
    } catch (err) {
        res.json({err: 'Failed to validate the role as administrator'})
    }
};

//USERS
server.post("/users/login", function (req, res) {
    const {
        email, password
    } = req.body
    sequelize.query(
        `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`,
        {        
            type: sequelize.QueryTypes.SELECT
        }
    )
    .then(function (user) {
        if (user.length === 0){
            return res.status(400).send("user not found")
        }
        let res_idUser = user[0].user_id;
        let res_is_admin = user[0].is_admin;
        //creation of the token to pass
        let token = jwt.sign({
            user_id: res_idUser,
            is_admin: Boolean(res_is_admin)
        }, jwtClave);
        let sesionToken = {
            token: token
        }   
        res.status(200).send(sesionToken);
    })
    .catch(function (error) {
        res.status(500).send(error)
    })
});

server.get('/users', authorization_Admin, async function (req, res) {
    console.log(req.dataUser)
    let id_user = req.dataUser.user_id
    let sqlquery = 'SELECT * FROM users'
    let is_admin = req.dataUser.is_admin
    if(is_admin === false) {
        sqlquery = sqlquery + ` WHERE user_id = '${id_user}'` 
    }
    await sequelize.query(
        sqlquery,
        {        
            type: sequelize.QueryTypes.SELECT
        }
    )
    .then(function (users) {
        res.status(200).send(users);
    })
    .catch(error => console.log(error))
});

//nuevo endoint, necesario para la actualizacion de los usuarios mediante id
server.get('/users/:id', authorization_Admin, async function (req, res) {
    let id_user = req.params.id
    let sqlquery = `SELECT * FROM users WHERE user_id = ${id_user}`
    await sequelize.query(
        sqlquery,
        {        
            type: sequelize.QueryTypes.SELECT
        }
    )
    .then(function (users) {
        res.status(200).send(users);
    })
    .catch(error => console.log(error))
});

server.post('/users', authorization_Admin, async (req, res) => {
    const {
       name, lastname, email, profile, is_admin, password
    } = req.body
    let userInfo = [name, lastname, email, profile, is_admin, password];
    await sequelize.query(
        'INSERT INTO users (`name`, `lastname`, `email`, `profile`, `is_admin`, `password`) VALUES(?, ?, ?, ?, ?, ?)',
        {
            replacements: userInfo,
            type: sequelize.QueryTypes.INSERT
        }
    )
    .then(function (users) {
        res.status(200).send("user created successfully")
    })
    .catch(error => res.status(500).send(error))
});

server.put('/users/:id', authorization_Admin, async (req, res) => {
    let id_user = req.params.id;
    let is_admin_dataUser = req.dataUser.is_admin
    if (is_admin_dataUser === false){
        return res.status(401).send('You are not authorized to make modifications')
    }      
    const {
        name, lastname, email, profile, is_admin, password
    } = req.body
    let userInfo = [name, lastname, email, profile, is_admin, password, id_user];
    await sequelize.query(
        'UPDATE users SET `name`= ?, `lastname`= ?, `email`= ?, `profile`= ?, `is_admin`= ?, `password`= ? WHERE user_id = ?',
        {
            replacements: userInfo,
            type: sequelize.QueryTypes.UPDATE
        }
    )
    .then(function (users) {
        console.log(`data updated correctly + ${users}`)
        res.status(200).send("user updated successfully")
    })
    .catch(error => res.status(500).send(error))
});

server.patch('/users/:id', authorization_Admin, async (req, res) => {
    let id_user = req.params.id;
    let is_admin_dataUser = req.dataUser.is_admin
    if (is_admin_dataUser === false){
        return res.status(401).send('You are not authorized to make modifications')
    }      
    const {
        name, lastname, email, profile, is_admin, password
    } = req.body
    let usersInfo = [name, lastname, email, profile, is_admin, password, id_user];
    await sequelize.query(
        'UPDATE users SET `name`= ?, `lastname`= ?, `email`= ?, `profile`= ?, `is_admin`= ?, `password`= ? WHERE user_id = ?',
        {
            replacements: usersInfo,
            type: sequelize.QueryTypes.UPDATE
        }
    )
    .then(function (users) {
        res.status(200).send("user updated successfully")
    })
    .catch(error => res.status(500).send(error))
});

server.delete('/users/:id', authorization_Admin, async (req, res) => {
    let is_admin = req.dataUser.is_admin
    if (is_admin === false){
       return res.status(401).send('You are not authorized to delete users')
    }    
    let id_user = req.params.id;
    await sequelize.query(
        `DELETE FROM users WHERE user_id = ${id_user}`,
        {
            type: sequelize.QueryTypes.DELETE
        }
    )
    .then(function (user) {
        res.status(200).send("user deleted successfully")
    })
    .catch(error => res.status(500).send(error))
});

//REGIONS
server.get('/regions', async function (req, res) {
    await sequelize.query(
        'SELECT * FROM regions',
        {        
            type: sequelize.QueryTypes.SELECT
        }
    )
    .then(function (regions) {
        res.status(200).send(regions);
    })
    .catch(error => console.error(error))
});

server.post('/regions', async (req, res) => {  
    const {
        name
    } = req.body
    await sequelize.query(
        `INSERT INTO regions (name) VALUES( '${name}' )`,
        {
            type: sequelize.QueryTypes.INSERT
        }
    )
    .then(function (regions) {
        res.status(200).send("regions added successfully")
    })
    .catch(error => res.status(500).send(error))
});

server.put('/regions/:id', async (req, res) => {
    let id_region = req.params.id;   
    const {
        name
    } = req.body
    let regionsInfo = [name, id_region];
    await sequelize.query(
        'UPDATE regions SET `name`= ? WHERE region_id = ?',
        {
            replacements: regionsInfo,
            type: sequelize.QueryTypes.UPDATE
        }
    )
    .then(function (regions) {
        res.status(200).send("regions updated successfully")
    })
    .catch(error => res.status(500).send(error))
});

server.delete('/regions/:id', async (req, res) => {
    let id_region = req.params.id;
    await sequelize.query(
        `DELETE FROM regions WHERE region_id = '${id_region}'`,
        {
            type: sequelize.QueryTypes.DELETE
        }
    )
    .then(function (regions) {
        res.status(200).send("region deleted successfully")
    })
    .catch(error => res.status(500).send(error))
});

//COUNTRIES
server.get('/countries', async function (req, res) {
    await sequelize.query(
        'SELECT * FROM countries',
        {        
            type: sequelize.QueryTypes.SELECT
        }
    )
    .then(function (countries) {
        res.status(200).send(countries);
    })
    .catch(error => console.error(error))
});

server.post('/countries', async (req, res) => {    
    const {
        name, region_id
    } = req.body
    let countriesInfo = [name, region_id];
    await sequelize.query(
        'INSERT INTO countries (`name`, `region_id`) VALUES(?, ?)',
        {
            replacements: countriesInfo,
            type: sequelize.QueryTypes.INSERT
        }
    )
    .then(function (countries) {
        res.status(200).send("countries added successfully")
    })
    .catch(error => res.status(500).send(error))
});

server.put('/countries/:id', async (req, res) => {
    let id_country = req.params.id;     
    const {
        name, region_id
    } = req.body
    let countriesInfo = [name, region_id, id_country];
    await sequelize.query(
        'UPDATE countries SET `name`= ?, `region_id`= ? WHERE country_id = ?',
        {
            replacements: countriesInfo,
            type: sequelize.QueryTypes.UPDATE
        }
    )
    .then(function (countries) {
        res.status(200).send("country updated successfully")
    })
    .catch(error => res.status(500).send(error))
});

server.delete('/countries/:id', async (req, res) => {    
    let id_country = req.params.id;
    await sequelize.query(
        `DELETE FROM countries WHERE country_id = '${id_country}'`,
        {
            type: sequelize.QueryTypes.DELETE
        }
    )
    .then(function (country) {
        res.status(200).send("conuntry deleted successfully")
    })
    .catch(error => res.status(500).send(error))
});

//CITIES
server.get('/cities', async function (req, res) {
    await sequelize.query(
        'SELECT * FROM cities',
        {        
            type: sequelize.QueryTypes.SELECT
        }
    )
    .then(function (cities) {
        res.status(200).send(cities);
    })
    .catch(error => console.error(error))
});

server.post('/cities', async (req, res) => {  
    const {
        name, country_id
    } = req.body
    let citiesInfo = [name, country_id];
    await sequelize.query(
        'INSERT INTO cities (`name`, `country_id`) VALUES(?, ?)',
        {
            replacements: citiesInfo,
            type: sequelize.QueryTypes.INSERT
        }
    )
    .then(function (cities) {
        res.status(200).send("cities added successfully")
    })
    .catch(error => res.status(500).send(error))
});

server.put('/cities/:id', async (req, res) => {
    let id_country = req.params.id;     
    const {
        name, country_id
    } = req.body
    let citiesInfo = [name, country_id, id_country];
    await sequelize.query(
        'UPDATE cities SET `name`= ?, `country_id`= ? WHERE country_id = ?',
        {
            replacements: citiesInfo,
            type: sequelize.QueryTypes.UPDATE
        }
    )
    .then(function (cities) {
        res.status(200).send("city updated successfully")
    })
    .catch(error => res.status(500).send(error))
});

server.delete('/cities/:id', async (req, res) => {   
    let id_country = req.params.id;
    let citiesInfo = [id_country];
    await sequelize.query(
        'DELETE FROM cities WHERE country_id = ?',
        {
            replacements: citiesInfo,
            type: sequelize.QueryTypes.DELETE
        }
    )
    .then(function (cities) {
        console.log(`data deleted correctly`)
        res.status(200).send("city deleted successfully")
    })
    .catch(error => res.status(500).send(error))
});

//COMPANIES
server.get('/companies', async function (req, res) {
    await sequelize.query(
        `SELECT 
            data_warehouse.companies.company_id,
            data_warehouse.companies.name,
            data_warehouse.companies.telephone,
            data_warehouse.companies.email,
            data_warehouse.companies.address,
            data_warehouse.cities.name AS "city",
            data_warehouse.countries.name AS "country",
            data_warehouse.regions.name AS "region"
            FROM data_warehouse.companies
            INNER JOIN data_warehouse.cities ON data_warehouse.cities.city_id = data_warehouse.companies.city_id
            INNER JOIN data_warehouse.countries ON data_warehouse.countries.country_id = data_warehouse.cities.country_id
            INNER JOIN data_warehouse.regions ON data_warehouse.regions.region_id = data_warehouse.countries.region_id`,
        {        
            type: sequelize.QueryTypes.SELECT
        }
    )
    .then(function (companies) {
        res.status(200).send(companies);
    })
    .catch(error => console.error(error))
});

server.post('/companies', async (req, res) => {   
    const {
        name, telephone, email, city_id, address
    } = req.body
    let companiesInfo = [name, telephone, email, city_id, address];
    await sequelize.query(
        'INSERT INTO companies (`name`, `telephone`, `email`, `city_id`, `address`) VALUES(?, ?, ?, ?, ?)',
        {
            replacements: companiesInfo,
            type: sequelize.QueryTypes.INSERT
        }
    )
    .then(function (companies) {
        res.status(200).send("companies added successfully")
    })
    .catch(error => res.status(500).send(error))
});

server.put('/companies/:id', async (req, res) => {
    let id_company = req.params.id;      
    const {
        name, telephone, email, city_id, address
    } = req.body
    let companiesInfo = [name, telephone, email, city_id, address, id_company];
    await sequelize.query(
        'UPDATE companies SET `name`= ?, `telephone`= ?, `email`= ?, `city_id`= ?, `address`= ? WHERE company_id = ?',
        {
            replacements: companiesInfo,
            type: sequelize.QueryTypes.UPDATE
        }
    )
    .then(function (companies) {
        res.status(200).send("company updated successfully")
    })
    .catch(error => res.status(500).send(error))
});

server.delete('/companies/:id', async (req, res) => {   
    let id_company = req.params.id;
    await sequelize.query(
        `DELETE FROM companies WHERE company_id = '${id_company}'`,
        {
            type: sequelize.QueryTypes.DELETE
        }
    )
    .then(function (companies) {
        console.log(`data deleted correctly`)
        res.status(200).send("company deleted successfully")
    })
    .catch(error => res.status(500).send(error))
});

//CONTACTS
server.get('/contacts', async function (req, res) {
    await sequelize.query(
        `SELECT 
            data_warehouse.contacts.contact_id,
            data_warehouse.contacts.name,
            data_warehouse.contacts.lastname,
            data_warehouse.contacts.email,
            data_warehouse.contacts.address,
            data_warehouse.contacts.profile,
            data_warehouse.contacts.interests,
            data_warehouse.companies.name AS 'company',
            data_warehouse.cities.name AS 'city',
            data_warehouse.countries.name AS 'country',
            data_warehouse.regions.name AS 'region'
            FROM data_warehouse.contacts 
            INNER JOIN data_warehouse.companies ON data_warehouse.contacts.company_id = data_warehouse.companies.company_id
            INNER JOIN data_warehouse.cities ON data_warehouse.contacts.city_id = data_warehouse.cities.city_id
            INNER JOIN data_warehouse.countries ON data_warehouse.countries.country_id = data_warehouse.cities.country_id
            INNER JOIN data_warehouse.regions ON data_warehouse.regions.region_id = data_warehouse.countries.region_id`,
        {        
            type: sequelize.QueryTypes.SELECT
        }
    )
    .then(function (contacts) {
        console.log(contacts)
        res.status(200).send(contacts);
    })
    .catch(error => console.error(error))
});

// server.post('/contacts', async (req, res) => {  
//     const {
//         name, lastname, email, address, profile, interests, company, city, country, region
//     } = req.body
//     let contactsInfo = [name, lastname, email, address, profile, interests, company, city, country, region];
//     console.log(contactsInfo)
//     await sequelize.query(
//         `SELECT
//             data_warehouse.contacts.contact_id,
//             data_warehouse.contacts.name,
//             data_warehouse.contacts.lastname,
//             data_warehouse.contacts.email,
//             data_warehouse.contacts.address,
//             data_warehouse.contacts.profile,
//             data_warehouse.contacts.interests,    
//             data_warehouse.companies.name AS "company",
//             data_warehouse.cities.name AS "city",
//             data_warehouse.countries.name AS "country",
//             data_warehouse.regions.name AS "region"
//             FROM data_warehouse.contacts
//             INNER JOIN data_warehouse.companies ON data_warehouse.companies.company_id = data_warehouse.contacts.company_id
//             INNER JOIN data_warehouse.cities ON data_warehouse.cities.city_id = data_warehouse.contacts.city_id
//             INNER JOIN data_warehouse.countries ON data_warehouse.countries.country_id = data_warehouse.cities.country_id
//             INNER JOIN data_warehouse.regions ON data_warehouse.regions.region_id = data_warehouse.countries.region_id`,
//         {
//             replacements: contactsInfo,
//             type: sequelize.QueryTypes.INSERT
//         }
//     )
//     .then(function (contacts) {
//         res.status(200).send("contacts added successfully")
//     })
//     .catch(error => res.status(500).send(error))
// });

//POST ORIGINAL
server.post('/contacts', async (req, res) => {  
    const {
        name, lastname, email, company_id, city_id, address, profile, interests
    } = req.body
    let contactsInfo = [name, lastname, email, company_id, city_id, address, profile, interests];
    await sequelize.query(
        'INSERT INTO contacts (`name`, `lastname`, `email`, `company_id`, `city_id`, `address`, `profile`, `interests`) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
        {
            replacements: contactsInfo,
            type: sequelize.QueryTypes.INSERT
        }
    )
    .then(function (contacts) {
        res.status(200).send("contacts added successfully")
    })
    .catch(error => res.status(500).send(error))
});
//
server.put('/contacts/:id', async (req, res) => {
    let id_contact = req.params.id;     
    const {
        name, lastname, email, company_id, city_id, address, profile, interests
    } = req.body
    let contactsInfo = [name, lastname, email, company_id, city_id, address, profile, interests, id_contact];
    await sequelize.query(
        'UPDATE contacts SET `name`= ?, `lastname`= ?, `email`= ?, `company_id`= ?, `city_id`= ?, `address`= ?, `profile`= ?, `interests`=? WHERE contact_id = ?',
        {
            replacements: contactsInfo,
            type: sequelize.QueryTypes.UPDATE
        }
    )
    .then(function (contacts) {
        res.status(200).send("contacts updated successfully")
    })
    .catch(error => res.status(500).send(error))
});

server.delete('/contacts/:id', async (req, res) => {   
    let id_contact = req.params.id;
    await sequelize.query(
        `DELETE FROM contacts WHERE contact_id = '${id_contact}'`,
        {
            type: sequelize.QueryTypes.DELETE
        }
    )
    .then(function (contacts) {
        console.log(`data deleted correctly`)
        res.status(200).send("contact deleted successfully")
    })
    .catch(error => res.status(500).send(error))
});

//Middleware for error handling
server.use((err, req, res, next) => {
    let status = '500';
    const dataError = {
      codigo: '',
      mensaje: '',
      error: ''
    }
    if(err.name === 'UnauthorizedError') {
      dataError.codigo = '100';
      dataError.mensaje = 'You are not authorized to this route';
      status = '401';
    }
    else {
      dataError.codigo = '101';
      dataError.mensaje = 'An unexpected server-side error occurred';
      dataError.error = err;
      status = '500';
    }
    res.status(status).send(JSON.stringify(dataError));
});