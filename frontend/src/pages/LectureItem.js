import axios from "axios";
import React, { useEffect, useState } from "react";

export default function LectureItem() {
  const [HtmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/lecture/8") // HTML 파일의 경로를 지정합니다.
      .then((response) => {
        setHtmlContent(response.data.content);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: HtmlContent }} />
    </div>
  );
}
