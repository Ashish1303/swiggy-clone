const EmptyState = ({ title, description, buttonText, buttonAction }) => (
  <div className="text-center py-5">
    <div className="mb-4">
      <span className="display-6">😕</span>
    </div>
    <h3>{title}</h3>
    <p className="text-muted">{description}</p>
    {buttonText && (
      <button type="button" className="btn btn-primary" onClick={buttonAction}>
        {buttonText}
      </button>
    )}
  </div>
);

export default EmptyState;
