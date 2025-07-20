const FormSingleRow = ({ label, id, type = "text", value, onChange = {}, required = false, disabled = false }) => {
  return (
    <div className="row mb-3 mt-3">
      <label htmlFor={id} className="col-md-4 col-form-label text-end">
        {label}
      </label>
      <div className="col-md-8">
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="form-control"
        />
      </div>
    </div>
  );
};

export default FormSingleRow;