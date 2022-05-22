# TwopiRest

TwopiRest is a rest client in shape of a react component. It is useful for playing around with mock apis (as they some of them can only be accessed by the running application) and it also works well with real rest-apis.
We can pass an optional parameter "preset" containg the details of rest requests we want to make in order to have request templates(saves a lot a manual work while developing something).

## Installation

```
npm i twopi-rest
```

or

```
yarn add twopi-rest
```

## usage

```
// import
 import TwopiRest from 'twopi-rest';

// usage as a component

 <TwopiRest preset={requests} />

 // with out preset

  <TwopiRest />

```

Now you should be wondering what should be the shape of preset, right? preset is an array of objects which should look like this:

```
[  {
    name: "empty", // mustv have a unique name amoung all your request objects
    req_type: "PATCH", // must be one of "PATCH" | "GET" | "POST" | "PUT" | "DELETE"
    base_url: "",  //  contains base url you want to hit
    url: "",       //  contains api end point
    query_str: "", //  contains query string
    body: {},      // contains the body of request
    header: {},    //  contains the body of request
  },
  ]
```

For more insights here is the type definition of preset:

```
preset?: Array<{
    name: string;
    req_type: "PATCH" | "GET" | "POST" | "PUT" | "DELETE";
    base_url: string;
    url: string;
    query_str: string;
    body: Object;
    header: Object;
  }>
```

you can quickly copy this templete to start writing your preset:

```
[  {
    name: "empty",
    req_type: "PATCH",
    base_url: "",
    url: "",
    query_str: "",
    body: {},
    header: {},
  },]
```

Now lets see a complete example :

```
import './App.css';
import TwopiRest from 'twopi-rest';

const sample_requests = [
  {
    name: "user signup",
    req_type: "POST",
    base_url: "",
    url: "/user/signup",
    query_str: "",
    body: {
      fname: "Shiv",
      lname: "Raj",
      username: "sr11",
      dob: "11-12-2012",
      email: "Shiv@e.com",
      contact: "8057761545",
      password: "wah",
    },
    header: {},
  },
  {
    name: "user login",
    req_type: "POST",
    base_url: "",
    url: "/user/login",
    query_str: "",
    body: {
      username: "sr11",
      password: "wah",
    },
    header: {},
  },
  {
    name: "default user login",
    req_type: "POST",
    base_url: "",
    url: "/user/login",
    query_str: "",
    body: {
      username: "sjtgshivam",
      password: "acheDin",
    },
    header: {},
  },

  {
    name: "current user",
    req_type: "GET",
    base_url: "",
    url: "/user",
    query_str: "",
    body: {},
    header: {
      authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNqdGdzaGl2YW0ifQ.vzWhvz8B8qnFvMDCZ5euP7Dfh0cZLbCcoLsMdaraFQY",
    },
  },

];


function App() {
  return (
    <div className="App">
      <TwopiRest preset={sample_requests} />
    </div>
  );
}

export default App;
```

\*\* Right now we are seeing some issues with css files, you can directly link the css file from here (or just copy pate it to local file )

```
https://github.com/SJTGSHIVAM/TwoPiRest/blob/master/src/TwopiRest.css
```

or import in your index file using

```
import 'twopi-rest/dist/index.css';
```
