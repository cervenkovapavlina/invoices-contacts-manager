const NarrowContent = ({ children }) => {
  return (
    <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6" style={{ minWidth: '500px' }}>
            {children}
        </div>
        <div className="col-md-3"></div>
    </div>
  );
};

export default NarrowContent;