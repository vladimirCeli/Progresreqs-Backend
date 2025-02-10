const mongoose = require('mongoose');
const Questionnaire = require('../questionnaire/questionnaire.model'); // Ajusta la ruta según tu estructura

// Conexión a MongoDB
mongoose.connect('mongodb+srv://adminbdv0:7MMUH9CCCwwNiNaf@cluster0.vzvpyft.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function updateQuestionnaireIndexes() {
  try {
    // 1. Obtener la colección directamente para operaciones de bajo nivel
    const collection = mongoose.connection.collection('questionnaires');
    
    // 2. Eliminar el índice existente si existe
    try {
      await collection.dropIndex('steps_1');
      console.log('Índice anterior eliminado correctamente');
    } catch (err) {
      console.log('No existía índice previo o ya fue eliminado');
    }

    // 3. Crear el nuevo índice parcial
    await collection.createIndex(
      { steps: 1 },
      { 
        unique: true,
        partialFilterExpression: {
          steps: { $in: [1, 2] }
        }
      }
    );
    console.log('Nuevo índice parcial creado correctamente');

    // 4. Verificar los índices actuales
    const indexes = await collection.indexes();
    console.log('Índices actuales:', indexes);

  } catch (err) {
    console.error('Error durante la actualización:', err);
  } finally {
    // 5. Cerrar la conexión
    await mongoose.connection.close();
    console.log('Conexión cerrada');
  }
}

// Ejecutar el script
updateQuestionnaireIndexes().then(() => {
  console.log('Script completado');
}).catch(err => {
  console.error('Error en el script:', err);
  process.exit(1);
});