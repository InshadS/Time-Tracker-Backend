const express = require('express');
const moment = require('moment');
const app = express();
const pool = require('./db');
const PORT = 5000;

app.use(express.json());

//Add a task

app.post('/add-task', async (req, res) => {
  try {
    const taskName = req.body.name;
    const addTask = await pool.query(
      'INSERT INTO task (task_name) VALUES($1) RETURNING *',
      [taskName]
    );
    res.status(200).send(addTask.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//Start task

app.post('/start-task/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const startTime = moment().format();
    const startTask = await pool.query(
      'UPDATE task SET start_time = $1 WHERE task_id=$2 RETURNING *',
      [startTime, taskId]
    );
    res.status(200).send(startTask.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//End task

app.post('/end-task/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const endTime = moment().format();
    const endTask = await pool.query(
      'UPDATE task SET end_time = $1 WHERE task_id=$2 RETURNING *',
      [endTime, taskId]
    );
    res.status(200).send(endTask.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//Delete a task

app.post('/delete-task/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const deleteTask = await pool.query(
      'DELETE FROM task WHERE task_id=$1 RETURNING *',
      [taskId]
    );
    res.status(200).send(`task:${deleteTask.rows[0].task_name} is deleted`);
  } catch (error) {
    console.error(error.message);
  }
});

//List all tasks

app.get('/list-tasks', async (req, res) => {
  try {
    const listTasks = await pool.query('SELECT * FROM task');
    res.status(200).send(listTasks.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
