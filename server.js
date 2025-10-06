
// server.js — optional mock API server + static hosting
// Usage:
//   npm i express cors
//   node server.js
//
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5173;

app.use(cors());
app.use(express.json());

// Static
const pub = __dirname;
app.use(express.static(pub));

// Mock data
const load = name => require(path.join(pub, 'templates', `mock-${name}.json`));
let regs = [];

// API routes (prefix /api)
app.get('/api/events', (req,res)=> res.json(load('events')));
app.get('/api/judges', (req,res)=> res.json(load('judges')));
app.get('/api/teams', (req,res)=> res.json(load('teams')));
app.get('/api/results', (req,res)=> res.json(load('results')));
app.get('/api/documents', (req,res)=> res.json(load('documents')));

app.post('/api/registrations', (req,res)=>{
  const body = req.body || {};
  const rec = { id: Date.now(), ...body };
  regs.push(rec);
  res.json(rec);
});

app.listen(PORT, ()=> console.log(`Mock server on http://localhost:${PORT}`));
