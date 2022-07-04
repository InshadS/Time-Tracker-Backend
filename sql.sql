CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    task_duration VARCHAR(50)
);