#Hello

####That's a simple application where you can manage by table, its cells and rows.

####Root folder contain `docker-compose.yml` so you can run all parts of application in one command `docker-compose up --build`.

####Application run on http://localhost:4200

#### It contains following endpoins:

* GET /api/table - get full table
* POST /api/table/row - create new row
* POST /api/table/column - create new column
* PUT /api/table/cell - update existing cell
* DELETE /api/table/row/:id - delete row
* DELETE /api/table/column/:index - delete column

* GET /api/table/sum - get sum of each column of a table
* GET /api/table/multiply - get multiply of each column of a table

* DELETE /api/admin/cell - delete cell collection (available with admin header `auth-token=Secret-admin-key`)
