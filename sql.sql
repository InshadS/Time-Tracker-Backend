CREATE TABLE task(
    task_id SERIAL PRIMARY KEY,
    task_name VARCHAR(100),
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    task_duration VARCHAR(50)
);