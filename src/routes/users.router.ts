import { Router } from "express";
import userController from "../controllers/user.controller";
import jwtVerifyMiddleware from "../middlewares/jwtVerify.middleware";
import jwtIdMatchVerifyMiddleware from "../middlewares/jwtIdMatchVerify.middleware";
import jwtRolVerify from "../middlewares/jwtRolVerify.middleware";

const usersRouter: Router = Router();

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Obtiene los detalles de todos los usuarios.
 *     tags:
 *       - Usuarios
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Detalles de los usuarios obtenidos correctamente.
 *         example:
 *           - id: string
 *             nombre: string
 *             email: string
 *             tipo: junior/empresa
 *             autenticacion2FAHabilitada: boolean
 *           - id: string
 *             nombre: string
 *             email: string
 *             tipo: junior/empresa
 *             autenticacion2FAHabilitada: boolean
 */
usersRouter.get("/",
    // jwtVerifyMiddleware.jwtVerify,
    // jwtRolVerify(["admin"]),
    userController.getAllUsers
);

/**
 * @swagger
 * /users/me/habilities:
 *   get:
 *     summary: Obtiene la lista de habilidades para agregar.
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: La lista de habilidades obtenidas correctamente.
 *         example:
 *           - id: string
 *             name: string
 *           - id: string
 *             name: string
 *           - id: string
 *             name: string
 */
usersRouter.get("/me/habilities",
    userController.getAllUserHabilities
);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Obtiene los detalles del usuario actual.
 *     tags:
 *       - Usuarios
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Detalles del usuario obtenidos correctamente.
 *         example:
 *           id: string
 *           nombre: string
 *           email: string
 *           tipo: junior/empresa
 */
usersRouter.get("/me/:id",
    jwtVerifyMiddleware.jwtVerify,
    jwtIdMatchVerifyMiddleware.jwtIdMatchVerify,
    jwtRolVerify(["admin", "junior", "empresa"]),
    userController.getUserProfile
);

/**
 * @swagger
 * /users/me/:{id}:
 *   put:
 *     summary: Edita los detalles del usuario actual.
 *     tags:
 *       - Usuarios
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Datos a editar del usuario actual
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *     responses:
 *       200:
 *         description: Edición de los detalles del usuario elaborados correctamente.
 *         example:
 *           name: string
 *           email: string
 *           tipo: junior/empresa
 */
usersRouter.put("/me/:id",
    jwtVerifyMiddleware.jwtVerify,
    jwtIdMatchVerifyMiddleware.jwtIdMatchVerify,
    jwtRolVerify(["admin", "junior", "empresa"]),
    userController.editUserData
);

export default usersRouter
