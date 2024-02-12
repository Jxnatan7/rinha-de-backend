CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  saldo INTEGER NOT NULL,
  limite INTEGER NOT NULL
);

INSERT INTO customers (saldo, limite) VALUES
  (0, 100000),
  (0, 80000),
  (0, 1000000),
  (0, 10000000),
  (0, 500000);
