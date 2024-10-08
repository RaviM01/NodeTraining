const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8000;
const { database } = require('./mongoclient')
const employeeService = require('./employeeService')


database().then(async(database) => {
    app.use(express.json())
    app.get('/employees', async (req, res) =>  {
        const employees = await employeeService.list(database)
        res.send(employees);
    })
    app.get('/employee/:id', async (req, res) =>  {
        console.log('employee');
        const employees = await employeeService.show(database, req.params.id)
        res.send(employees);
    })

    app.put('/employee/:id', async (req, res) =>  {
        const employees = await employeeService.update(database, req)
        res.send(employees);
    })
    

    app.delete('/employee/:id', async (req, res) =>  {
        console.log('employee');
        const employees = await employeeService.delete(database, req.params.id)
        res.send(employees);
    })
    

    app.post('/employee', async (req, res) =>  {
        console.log('employee');
        const employees = await employeeService.create(database, req)
        res.send(employees);
    })
    
    
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });
});
