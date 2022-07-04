const router = require('express').Router({ mergeParams: true });
const pool = require('../db');
const moment = require('moment');

//Add a task

router.post('/add-task', async (req, res) => {
  try {
    const taskName = req.body.name;

    const addTask = await pool.query(
      'INSERT INTO task (name) VALUES($1) RETURNING *',
      [taskName]
    );

    res.status(200).send(addTask.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//Start task

router.post('/start-task/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const startTime = moment().format();

    const startTask = await pool.query(
      'UPDATE task SET start_time = $1 WHERE id=$2 RETURNING *',
      [startTime, taskId]
    );

    res.status(200).send(startTask.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//End task

router.post('/end-task/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const endTime = moment().format();

    const endTask = await pool.query(
      'UPDATE task SET end_time = $1 WHERE id=$2 RETURNING *',
      [endTime, taskId]
    );

    //Task duration

    const taskDuration = await pool.query(
      'UPDATE task SET task_duration = AGE($1,start_time) WHERE id=$2 RETURNING *',
      [endTask.rows[0].end_time, taskId]
    );

    res.status(200).send(taskDuration.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//Update task

router.post('/update-task/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskName = req.body.name;

    const updateTask = await pool.query(
      'UPDATE task SET name = $1 WHERE id = $2 RETURNING *',
      [taskName, taskId]
    );

    res.status(200).send(`task updated: ${updateTask.rows[0].name}`);
  } catch (error) {
    console.error(error.message);
  }
});

//Delete a task

router.post('/delete-task/:id', async (req, res) => {
  try {
    const taskId = req.params.id;

    const deleteTask = await pool.query(
      'DELETE FROM task WHERE id=$1 RETURNING *',
      [taskId]
    );

    res.status(200).send(`task:${deleteTask.rows[0].name} is deleted`);
  } catch (error) {
    console.error(error.message);
  }
});

//List all tasks

router.get('/list-tasks', async (req, res) => {
  try {
    const listTasks = await pool.query('SELECT * FROM task');

    res.status(200).send(listTasks.rows);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
