import "./NarrowContent.css"

const NarrowContent = ({ children }) => {
  return (
    <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 narrow-content-min-width">
            {children}
        </div>
        <div className="col-md-3"></div>
    </div>
  );
};

export default NarrowContent;