const IngredientInput = ({ ingredient, index, onChange, onRemove }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(index, name, value);
  };
  
  return (
    <div className="ingredient-input">
      <div className="form-row">
        <div className="form-group">
          <input
            type="text"
            name="quantity"
            value={ingredient.quantity}
            onChange={handleChange}
            placeholder="Qty"
            className="quantity-input"
          />
        </div>
        
        <div className="form-group">
          <input
            type="text"
            name="unit"
            value={ingredient.unit}
            onChange={handleChange}
            placeholder="Unit"
            className="unit-input"
          />
        </div>
        
        <div className="form-group ingredient-name-group">
          <input
            type="text"
            name="name"
            value={ingredient.name}
            onChange={handleChange}
            placeholder="Ingredient name"
            className="name-input"
            required
          />
        </div>
        
        <button
          type="button"
          className="remove-button"
          onClick={() => onRemove(index)}
          aria-label="Remove ingredient"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default IngredientInput;