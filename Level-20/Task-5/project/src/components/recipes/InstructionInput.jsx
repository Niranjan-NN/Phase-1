const InstructionInput = ({ instruction, index, onChange, onRemove }) => {
  return (
    <div className="instruction-input">
      <div className="instruction-number">{index + 1}</div>
      <div className="instruction-content">
        <textarea
          value={instruction}
          onChange={(e) => onChange(index, e.target.value)}
          placeholder="Enter instruction step"
          rows="2"
          required
        ></textarea>
      </div>
      <button
        type="button"
        className="remove-button"
        onClick={() => onRemove(index)}
        aria-label="Remove instruction"
      >
        ×
      </button>
    </div>
  );
};

export default InstructionInput;