CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

   CREATE TABLE IF NOT EXISTS todos 
      (
         id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
         owner_id uuid NOT NULL, 
         title VARCHAR(255) NOT NULL,
         details TEXT,
         priority INT NOT NULL, 
         status VARCHAR(10) NOT NULL,
         order_in_column INT NOT NULL,
         due_date timestamp without time zone, 
         created_date timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'), 
         last_modified_date timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
      );
INSERT INTO todos(owner_id, title, details,priority,status,order_in_column,due_date)
VALUES 
	(
		'7fba2093-2498-4ef0-bdb4-c4d5b397127b', 
		'Steal the declaration of independence', 
		'Be more like Nick Cage',
		2,
		'todo',
		1,
        now() AT TIME ZONE 'UTC'::text
	),
	(
		'7fba2093-2498-4ef0-bdb4-c4d5b397127b', 
		'Recover from covid', 
		'gotta get out of here...',
		3,
		'doing',
		2,
        now() AT TIME ZONE 'UTC'::text
	),
	(
		'7fba2093-2498-4ef0-bdb4-c4d5b397127b', 
		'Get my lady to forgive me', 
		'because I am horny',
		4,
		'todo',
		3,
        now() AT TIME ZONE 'UTC'::text
	);