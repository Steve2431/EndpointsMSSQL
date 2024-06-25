
import { getConnection } from '../connectionDatabase/connection.js'
import sql from 'mssql'

// Obtener todos los nombres
export const getNames = async (req, res) => {
    const pool = await getConnection()

    /* Serviria para poder hacer la consulta de seleccion de todos los datos */
    const result = await pool.request().query('SELECT * FROM crew_names')

    console.log(result)

    res.json( result.recordset )
}

// Obtener un solo nombre
export const getName = async (req, res) => {
    console.log(req.params.id)

    const pool = await getConnection();
    /* id iguala y reemplaza a @id */
    const result = await pool.request()
    .input('id', sql.Int, req.params.id)
    .query('SELECT * FROM crew_names WHERE id = @id')

    if (result.rowsAffected[0] === 0) {
        return res.status(400).json({ error: "Id no encontrado" })
    }

    console.log(result)

    return res.json(result.recordset[0]);
}

// Enviar un nombre
export const PostName = async (req,res) => {
    console.log(req.body)

    const pool = await getConnection()
    const result = await pool
    .request()

    /* Los inputs son mas bien un reemplazante/traductor de los tipos de datos que estan crew_names */
    .input('id', sql.Int, req.body.id)
    .input('nombre', sql.VarChar, req.body.nombre)

    /* Esto funcionaria para que @id tomara encuenta el input id y sea reemplazado para que id se considere 
    el tipo de dato y valor que almacena en esta es Int */
    /* en @nombre pues seria VarChar esto para poder introducir datos y el lenguaje y la base de datos, detecten que tipo
    de datos son y valores contienen */
    .query("INSERT INTO crew_names (id, nombre) VALUES (@id, @nombre)")

    // funciona para obtener un id
    //: SELECT SCOPE_IDENTITY() AS id;

    console.log("resultado", result)

    /* Obtener una respuesta mas eficaz con json de lo que se envio/recibio/etc */
    res.json({ 
        // Esto se ejecutara una vez que usemos este endpoint generara un id o tipo de dato automatico
        /* Tipodato: result.recordset[0].Tipodato */
        id: req.body.id, 
        nombre: req.body.nombre 
    });
}

// Actualizar un nombre
export const PutName = async (req,res) => {
    // const id = req.params.id;

    const pool = await getConnection();
    const result = await pool.request()
    // Tened cuidado con params y body
    .input("id", sql.Int, req.params.id)
    .input("nombre", sql.VarChar, req.body.nombre)
    .query('UPDATE crew_names SET nombre = @nombre WHERE id = @id')
    console.log(result)

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: 'Nombre no encontrado' });
    }

    res.json({
        id: req.params.id,
        nombre: req.body.nombre
    });

}

// Eliminar un nombre
export const DeleteName = async (req,res) => {

    const pool = await getConnection();
    const result = await pool.request()
    .input("id", sql.Int, req.params.id)
    .query("DELETE FROM crew_names WHERE id = @id");
    console.log(result);

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: 'Nombre no encontrado' })
    }

    return res.json({ message: 'Nombre eliminado' })
}