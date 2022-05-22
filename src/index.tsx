import './index.css';

import React, {
  useRef,
  useState,
} from 'react';

import ReactJson from 'react-json-view';

const TwopiRest = ({
  preset = [],
}: {
  preset?: Array<{
    name: string;
    req_type: "PATCH" | "GET" | "POST" | "PUT" | "DELETE";
    base_url: string;
    url: string;
    query_str: string;
    body: Object;
    header: Object;
  }>;
}) => {
  const [url, setUrl] = useState("");
  const [queryStr, setQueryStr] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [reqType, setReqType] = useState("GET");
  const [body, setBody] = useState("");
  const [header, setHeader] = useState("");
  const [resp, setResp] = useState<Object>({});
  const [respStatus, setRespStatus] = useState<number>(NaN);
  const reqSelect = useRef<HTMLSelectElement>(null);
  return (
    <div className={"tprest-outter__div"}>
      <div className={"tprest-preset__div"}>
        {" "}
        <select
          className={"tprest-preset__select"}
          placeholder="fff"
          onChange={({ currentTarget: { value } }) => {
            let index = Number(value);
            if (!isNaN(index)) {
              setUrl(preset[index].url);
              setQueryStr(preset[index].query_str);
              setBaseUrl(preset[index].base_url);
              setBody(JSON.stringify(preset[index].body));
              setHeader(JSON.stringify(preset[index].header));
              setReqType(preset[index].req_type);

              if (reqSelect.current)
                reqSelect.current.value = preset[index].req_type;
            } else {
              setUrl("");
              setBody("");
              setHeader("");
            }
          }}
        >
          <option value="NaN">custom</option>
          {preset.map((e, i) => (
            <option value={i} key={e.name}>
              {e.req_type}-{e.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          ref={reqSelect}
          value={reqType}
          placeholder="fff"
          onChange={({ currentTarget: { value } }) => {
            setReqType(value);
          }}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>
        <input
          placeholder="base url"
          value={baseUrl}
          onChange={({ currentTarget: { value } }) => {
            setBaseUrl(value);
          }}
        />
        <input
          placeholder="url"
          value={url}
          onChange={({ currentTarget: { value } }) => {
            setUrl(value);
          }}
        />
        <input
          placeholder="query string"
          value={queryStr}
          onChange={({ currentTarget: { value } }) => {
            setQueryStr(value);
          }}
        />
      </div>
      <div>
        <p className={"tprest-label__p"}> Body: </p>
        <textarea
          className={"tprest-body__textarea"}
          placeholder="body"
          value={body}
          onChange={({ currentTarget: { value } }) => {
            setBody(value);
          }}
        />
      </div>

      <div>
        {" "}
        <p className={"tprest-label__p"}> Header: </p>
        <textarea
          className={"tprest-header__textarea"}
          placeholder="header"
          value={header}
          onChange={({ currentTarget: { value } }) => {
            setHeader(value);
          }}
        />
      </div>

      <button
        onClick={async () => {
          let res, resStatus, resJson;
          if (
            reqType.toUpperCase() === "GET" ||
            reqType.toUpperCase() === "DELETE"
          )
            res = await fetch(`${baseUrl}${url}${queryStr}`, {
              method: `${reqType}`,
              headers: header === "" ? {} : JSON.parse(header),
            });

          if (
            reqType.toUpperCase() === "PUT" ||
            reqType.toUpperCase() === "PATCH" ||
            reqType.toUpperCase() === "POST"
          )
            res = await fetch(`${baseUrl}${url}${queryStr}`, {
              method: `${reqType}`,
              headers: header === "" ? {} : JSON.parse(header),
              body: body === "" ? "{}" : body,
            });
          resStatus = res?.status;
          resJson = await res?.json();
          setRespStatus(resStatus as number);
          setResp(resJson);
        }}
      >
        Get Response
      </button>
      <div
        style={{
          maxWidth: "90%",
          overflowX: "scroll",
          margin: "auto",
          overflowWrap: "break-word",
        }}
      >
        <p className={"tprest-label__p"}>
          {" "}
          Response status: {isNaN(respStatus) ? "" : respStatus}
        </p>{" "}
        Response:
        <ReactJson
          src={resp}
          theme={"pop"}
          style={{
            overflowWrap: "break-word",
          }}
        />
      </div>
    </div>
  );
};
export default TwopiRest;
