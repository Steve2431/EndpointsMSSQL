import sql from 'mssql';
/* Forma de como generar conexiones de endpoint a una base de datos */

/* Esto es la conexion a la base de datos */
const dbSettings = {
    user: 'sa',
    password: 'AtomicHeart',
    server: 'localhost',
    database: 'pruebas',
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
}

// Aqui la peticion y conexion ya realizada

export const getConnection = async () => {

    try {
        const pool = await sql.connect(dbSettings);

        return pool;
    } catch (error) {
        console.error(error);
    }

}