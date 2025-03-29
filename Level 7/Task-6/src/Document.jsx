import { useEffect } from "react";

const Document = (title) => {
  useEffect(() => {
    document.title = title; 
  }, [title]); 
};

export default Document;
