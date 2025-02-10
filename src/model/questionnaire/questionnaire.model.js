const mongoose = require('mongoose');

const questionnaireSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  original: {
    type: Boolean,
    default: false,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
    required: true,
  },
  steps: {
    type: Number,
    default: 0,
    required: true,
    validate: {
      validator: function(v) {
        return v === 0 || v === 1 || v === 2;
      },
      message: 'Steps solo puede ser 0, 1 o 2'
    }
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
  ],
});

// Índice parcial que solo aplica unicidad a steps 1 y 2
questionnaireSchema.index(
  { steps: 1 },
  { 
    unique: true,
    partialFilterExpression: {
      steps: { $in: [1, 2] }
    }
  }
);

const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);

module.exports = Questionnaire;