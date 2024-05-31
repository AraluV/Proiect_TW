"use strict";

const express = require('express');
const sequelize = require('./sequelize');
const Food = require('./models/Food');
const cors = require('cors');



const app = express();
app.use(express.json());

app.use(cors());

app.listen(7000, async () => {
    console.log('Server started on https://localhost:7000');
    
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully");

        await sequelize.sync({ alter: true });

        console.log("Models have been synchronized with the database");
    } catch (err) {
        console.error("Unable to connect to the database", err);
    }
});

app.post('/foods', async (req, res) => {
    try {
    
      const { name, expirationDate } = req.body;
      console.log(name, expirationDate);
      const newFood = await Food.create({ name, expirationDate });
      res.status(201).json(newFood);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.get('/foods', async (req, res) => {
    try {
      const foods = await Food.findAll();
      res.status(200).json(foods);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
