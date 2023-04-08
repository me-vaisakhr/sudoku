import React, { FC, memo, PropsWithChildren } from "react";
import "./index.css"

interface GridProps {
}

const Grid: FC<PropsWithChildren<GridProps>> = ({ children }) => {
  return <div className="grid">{children}</div>;
};

export default memo(Grid);
