const Tag = ({ children }) => {
  return (
    <span className="badge rounded-pill bg-info m-1 fs-7" onClick={() => console.log("click")}>{children}</span>
  )
};

export default Tag