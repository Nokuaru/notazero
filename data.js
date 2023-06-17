import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  QueryCommand,
  PutCommand,
  GetCommand,
  ScanCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

// Se crea una instancia del cliente DynamoDB utilizando la clase DynamoDBClient
const client = new DynamoDBClient({});
// Se crea una instancia del cliente DocumentClient utilizando la clase DynamoDBDocumentClient
const dynamo = DynamoDBDocumentClient.from(client);

const materiasItemsTableName = "http-crud-materias-items";
const usersListTableName = "http-crud-users-list";

// Se define la función 'handler' como el punto de entrada para la función de Lambda
export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    // Se utiliza una declaración 'switch' para manejar diferentes rutas y métodos HTTP
    switch (event.routeKey) {
      case "GET /items/{userId}/materias":
        const userId = event.pathParameters.userId;

        // Verificar si el usuario existe en la tabla "http-crud-users-list"
        const userExistResponse = await dynamo.send(
          new GetCommand({
            TableName: usersListTableName,
            Key: {
              userId: userId,
            },
          })
        );

        if (!userExistResponse.Item) {
          statusCode = 404;
          body = `User with ID ${userId} not found`;
          break;
        }

        // Realizar un escaneo en la tabla "http-crud-materias-items" para obtener todas las materias asociadas al usuario
        const scanResult = await dynamo.send(
          new ScanCommand({
            TableName: materiasItemsTableName,
            FilterExpression: "userId = :userId",
            ExpressionAttributeValues: {
              ":userId": userId,
            },
          })
        );

        const user = userExistResponse.Item;

        // Combinar la información del usuario con las materias obtenidas
        body = {
          user: user,
          materias: scanResult.Items,
        };
        break;

      case "GET /items":
        // Obtener todos los items de la tabla "http-crud-materias-items"
        const getAllItemsResponse = await dynamo.send(
          new ScanCommand({
            TableName: materiasItemsTableName,
          })
        );

        body = getAllItemsResponse.Items;
        break;

      case "PUT /items":
        let requestJSON = JSON.parse(event.body);

        // Verificar si el usuario existe en la tabla "http-crud-users-list"
        const userExistResponsePut = await dynamo.send(
          new QueryCommand({
            TableName: usersListTableName,
            KeyConditionExpression: "userId = :userId",
            ExpressionAttributeValues: {
              ":userId": requestJSON.userId,
            },
          })
        );

        if (
          !userExistResponsePut.Items ||
          userExistResponsePut.Items.length === 0
        ) {
          statusCode = 404;
          body = `User with ID ${requestJSON.userId} not found`;
          break;
        }

        // Establecer la relación entre el usuario y la materia en la tabla "http-crud-materias-items"
        const materiaId = requestJSON.materiaId || generateUniqueId(); // Generar un ID único si no se proporciona

        await dynamo.send(
          new PutCommand({
            TableName: materiasItemsTableName,
            Item: {
              userId: requestJSON.userId,
              materiaId: materiaId,
              materia: requestJSON.materia,
              anio: requestJSON.anio,
              cuatrimestre: requestJSON.cuatrimestre,
              estado: requestJSON.estado,
              horario: requestJSON.horario,
              fechaPrimerParcial: requestJSON.fechaPrimerParcial,
              notaPrimerParcial: requestJSON.notaPrimerParcial,
              fechaSegundoParcial: requestJSON.fechaSegundoParcial,
              notaSegundoParcial: requestJSON.notaSegundoParcial,
              fechaRecuperatorio: requestJSON.fechaRecuperatorio,
              notaRecuperatorio: requestJSON.notaRecuperatorio,
              fechaFinal: requestJSON.fechaFinal,
              notaFinal: requestJSON.notaFinal,
              observaciones: requestJSON.observaciones,
            },
          })
        );

        body = `Put item ${materiaId}`;
        break;

      case "DELETE /items/{userId}/materias/{materiaId}":
        const userIdDelete = event.pathParameters.userId;
        const materiaIdDelete = event.pathParameters.materiaId;

        // Verificar si el usuario existe en la tabla "http-crud-users-list"
        const userExistResponseDelete = await dynamo.send(
          new GetCommand({
            TableName: usersListTableName,
            Key: {
              userId: userIdDelete,
            },
          })
        );

        if (!userExistResponseDelete.Item) {
          statusCode = 404;
          body = `User with ID ${userIdDelete} not found`;
          break;
        }

        // Eliminar la materia de la tabla "http-crud-materias-items"
        await dynamo.send(
          new DeleteCommand({
            TableName: materiasItemsTableName,
            Key: {
              userId: userIdDelete,
              materiaId: materiaIdDelete,
            },
          })
        );

        body = `Deleted materia with ID ${materiaIdDelete}`;
        break;

      case "PATCH /items/{userId}/materias/{materiaId}":
        const userIdPatch = event.pathParameters.userId;
        const materiaIdPatch = event.pathParameters.materiaId;
        const updateData = JSON.parse(event.body);

        // Verificar si el usuario existe en la tabla "http-crud-users-list"
        const userExistResponsePatch = await dynamo.send(
          new GetCommand({
            TableName: usersListTableName,
            Key: {
              userId: userIdPatch,
            },
          })
        );

        if (!userExistResponsePatch.Item) {
          statusCode = 404;
          body = `User with ID ${userIdPatch} not found`;
          break;
        }

        // Verificar si la materia existe en la tabla "http-crud-materias-items"
        const materiaExistResponse = await dynamo.send(
          new GetCommand({
            TableName: materiasItemsTableName,
            Key: {
              userId: userIdPatch,
              materiaId: materiaIdPatch,
            },
          })
        );

        if (!materiaExistResponse.Item) {
          statusCode = 404;
          body = `Materia with ID ${materiaIdPatch} not found`;
          break;
        }

        // Actualizar la materia en la tabla "http-crud-materias-items"
        await dynamo.send(
          new PutCommand({
            TableName: materiasItemsTableName,
            Item: {
              userId: userIdPatch,
              materiaId: materiaIdPatch,
              materia: updateData.materia || materiaExistResponse.Item.materia,
              anio: updateData.anio || materiaExistResponse.Item.anio,
              cuatrimestre:
                updateData.cuatrimestre ||
                materiaExistResponse.Item.cuatrimestre,
              estado: updateData.estado || materiaExistResponse.Item.estado,
              horario: updateData.horario || materiaExistResponse.Item.horario,
              fechaPrimerParcial:
                updateData.fechaPrimerParcial ||
                materiaExistResponse.Item.fechaPrimerParcial,
              notaPrimerParcial:
                updateData.notaPrimerParcial ||
                materiaExistResponse.Item.notaPrimerParcial,
              fechaSegundoParcial:
                updateData.fechaSegundoParcial ||
                materiaExistResponse.Item.fechaSegundoParcial,
              notaSegundoParcial:
                updateData.notaSegundoParcial ||
                materiaExistResponse.Item.notaSegundoParcial,
              fechaRecuperatorio:
                updateData.fechaRecuperatorio ||
                materiaExistResponse.Item.fechaRecuperatorio,
              notaRecuperatorio:
                updateData.notaRecuperatorio ||
                materiaExistResponse.Item.notaRecuperatorio,
              fechaFinal:
                updateData.fechaFinal || materiaExistResponse.Item.fechaFinal,
              notaFinal:
                updateData.notaFinal || materiaExistResponse.Item.notaFinal,
              observaciones:
                updateData.observaciones ||
                materiaExistResponse.Item.observaciones,
            },
          })
        );

        body = `Updated materia with ID ${materiaIdPatch}`;
        break;

      case "GET /items/{userId}/materias/{materiaId}":
        const userIdGetMateria = event.pathParameters.userId;
        const materiaIdGetMateria = event.pathParameters.materiaId;

        // Verificar si el usuario existe en la tabla "http-crud-users-list"
        const userExistResponseGetMateria = await dynamo.send(
          new GetCommand({
            TableName: usersListTableName,
            Key: {
              userId: userIdGetMateria,
            },
          })
        );

        if (!userExistResponseGetMateria.Item) {
          statusCode = 404;
          body = `User with ID ${userIdGetMateria} not found`;
          break;
        }

        // Obtener la información de una materia específica en la tabla "http-crud-materias-items"
        const materiaGetMateriaResponse = await dynamo.send(
          new GetCommand({
            TableName: materiasItemsTableName,
            Key: {
              userId: userIdGetMateria,
              materiaId: materiaIdGetMateria,
            },
          })
        );

        if (!materiaGetMateriaResponse.Item) {
          statusCode = 404;
          body = `Materia with ID ${materiaIdGetMateria} not found`;
          break;
        }

        body = materiaGetMateriaResponse.Item;
        break;

      case "GET /items":
        const getAllMateriasResponse = await dynamo.send(
          new ScanCommand({
            TableName: materiasItemsTableName,
          })
        );

        body = getAllMateriasResponse.Items;
        break;

      case "GET /items/{id}":
        const itemId = event.pathParameters.id;

        // Obtener el elemento específico según el itemId
        const getItemResponse = await dynamo.send(
          new GetCommand({
            TableName: materiasItemsTableName,
            Key: {
              materiaId: itemId,
            },
          })
        );

        if (!getItemResponse.Item) {
          statusCode = 404;
          body = `Item with ID ${itemId} not found`;
        } else {
          body = getItemResponse.Item;
        }
        break;

      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (error) {
    statusCode = 500;
    body = error.message;
  }

  // Devolver la respuesta HTTP con el código de estado, encabezados y cuerpo correspondientes
  return {
    statusCode,
    headers,
    body: JSON.stringify(body),
  };
};

// Generar un ID único utilizando una función personalizada
function generateUniqueId() {
  // Implementación personalizada para generar un ID único
  return "subjectId-" + Date.now();
}
