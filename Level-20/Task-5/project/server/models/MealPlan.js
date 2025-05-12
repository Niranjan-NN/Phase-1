import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema(
  {
    breakfast: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      default: null
    },
    lunch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      default: null
    },
    dinner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      default: null
    }
  },
  { _id: false }
);

const mealPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    meals: {
      monday: {
        type: mealSchema,
        default: () => ({})
      },
      tuesday: {
        type: mealSchema,
        default: () => ({})
      },
      wednesday: {
        type: mealSchema,
        default: () => ({})
      },
      thursday: {
        type: mealSchema,
        default: () => ({})
      },
      friday: {
        type: mealSchema,
        default: () => ({})
      },
      saturday: {
        type: mealSchema,
        default: () => ({})
      },
      sunday: {
        type: mealSchema,
        default: () => ({})
      }
    }
  },
  {
    timestamps: true
  }
);

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

export default MealPlan;