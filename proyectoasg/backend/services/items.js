const db = require('./db');
const helper = require('../helper');

// insertar datos en la tabla coleccion
async function insertData(req) {
  const data = req.query;
  const sql = 'INSERT INTO coleccion (nombre, tipo, marca, precio) VALUES (?, ?, ?, ?)';
  const result = await db.query(sql, [data.nombre, data.tipo, data.marca, Number(data.precio)]);
  return result.affectedRows;
}

// obtener los datos de la tabla coleccion
async function getData() {
  const rows = await db.query('SELECT * FROM coleccion', []);
  const data = helper.emptyOrRows(rows);
  return { data };
}

//borrar registro
async function deleteData(req) {
  const data = req.query;
  const sql = 'DELETE FROM coleccion WHERE id = ?';
  const result = await db.query(sql, [Number(data.id)]);
  return result.affectedRows;
}

// exportar funciones
module.exports = {
  insertData,
  getData,
  deleteData,
};