import { Router } from "express";
import { DeleteName, PostName, PutName, getName, getNames } from "../controllersDatabase/products.controllers.js";

const router = Router();

// Endpoints, son rutas/funciones para hacer get/post/put/delete and more
// Endpoints son rutas/funciones para hacer Obtener/Enviar/Actualizar/Eliminar y mas

// Las direcciones no simbolizan/vinculan con alguna base de datos
router.get('/nombres', getNames);

router.get('nombres/:id', getName);

router.post('/nombres', PostName);

// put = actualizar
router.put('/nombres/:id', PutName);

router.delete('/nombres/:id', DeleteName);

export default router;