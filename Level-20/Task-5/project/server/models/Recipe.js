import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Ingredient name is required'],
      trim: true
    },
    quantity: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: ''
    }
  },
  { _id: false }
);

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Recipe name is required'],
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    cuisineType: {
      type: String,
      default: ''
    },
    mealType: {
      type: String,
      default: ''
    },
    prepTime: {
      type: Number,
      default: 0
    },
    cookTime: {
      type: Number,
      default: 0
    },
    servings: {
      type: Number,
      default: 1
    },
    ingredients: {
      type: [ingredientSchema],
      default: []
    },
    instructions: {
      type: [String],
      default: []
    },
    notes: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Create indexes for search
recipeSchema.index({ name: 'text', 'ingredients.name': 'text' });

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;