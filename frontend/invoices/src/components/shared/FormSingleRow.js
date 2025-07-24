const FormSingleRow = ({ label, id, type = "text", value, onChange, required, disabled}) => {
  return (
    <div className="row mb-3 mt-3">
      <label htmlFor={id} className="col-sm-4 col-form-label text-sm-end">
        {label}
      </label>
      <div className="col-sm-8">
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