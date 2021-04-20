const HTTPMethods = ["GET", "POST", "PUT", "DELETE"];//["GET", "HEAD", "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE", "PATCH"];

const HTTPOptions = { token: "", base: "", json: false, headers: {} };

const HTTPStatuses = {"100":"Continue","101":"Switching Protocol","102":"Processing","103":"Early Hints","200":"OK","201":"Created","202":"Accepted","203":"Non-Authoritative Information","204":"No Content","205":"Reset Content","206":"Partial Content","207":"Multi-Status","208":"Already Reported","226":"IM Used","300":"Multiple Choice","301":"Moved Permanently","302":"Found","303":"See Other","304":"Not Modified","305":"Use Proxy","306":"unused","307":"Temporary Redirect","308":"Permanent Redirect","400":"Bad Request","401":"Unauthorized","402":"Payment Required","403":"Forbidden","404":"Not Found","405":"Method Not Allowed","406":"Not Acceptable","407":"Proxy Authentication Required","408":"Request Timeout","409":"Conflict","410":"Gone","411":"Length Required","412":"Precondition Failed","413":"Payload Too Large","414":"URI Too Long","415":"Unsupported Media Type","416":"Range Not Satisfiable","417":"Expectation Failed","418":"I'm a teapot","421":"Misdirected Request","422":"Unprocessable Entity","423":"Locked","424":"Failed Dependency","425":"Too Early","426":"Upgrade Required","428":"Precondition Required","429":"Too Many Requests","431":"Request Header Fields Too Large","451":"Unavailable For Legal Reasons","500":"Internal Server Error","501":"Not Implemented","502":"Bad Gateway","503":"Service Unavailable","504":"Gateway Timeout","505":"HTTP Version Not Supported","506":"Variant Also Negotiates","507":"Insufficient Storage","508":"Loop Detected","510":"Not Extended","511":"Network Authentication Required"};
// const HTTPCodes = [200,201,204,301,302,400,401,403,422,500];
// const OkStatuses = [200, 201];
// const ValidateStatuses = [422];

export const validator = (errors, fields) => {
    if (errors) { // TODO if object and bla-bla
        Object.keys(errors).forEach((k) => {
            let _f = fields.find((f) => f.name === k);
            if (_f) _f.dataError = errors[k];
        });
    }
};

const useOptions = {};

const CustomFunctions = { validator, before: null, success: null, fail: null, anyway: null };

const CustomOptions = { validate: {}, beforeData: {} };//, check: "", get: "" };

// import { get } from './index'; // типа lodash.get

function http(url, options = {}) {
    
    // if (self.fetch) { } else {} // see polyfill on XMLHttpRequest // https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch#%D1%82%D0%B5%D0%BB%D0%BE

    const _get = "GET",
          _replaceMethods = (nms) => {
              return (Array.isArray(nms) && nms.length) ? HTTPMethods.map(m => nms.includes(m) ? m : void (0)).filter(m => m) : HTTPMethods;
          },
          _checkMethod = (nm, ms, df = null) => {
              let um = nm && typeof nm === "string" ? nm.toUpperCase() : df;
              return ms.includes(um) ? um : df;
          },
          _isGet = (m) => m === _get,
          _headers = new Headers(),
          _params = {
            method: _get,
            headers: _headers,
            body: null
          };
          
    if (!url || typeof url !== "string") url = "";
    url = url.trim();
    if (url[0] && url[0] !== "/") url = "/" + url;

    if (typeof options === "string") {
        let method = _checkMethod(options, HTTPMethods, _get);
        options = {};
        options.method = method;
    }
    else if (typeof options !== "object") {
        options = {};
    }
        
    options = Object.assign(options, useOptions);
        
    if (options.method) {
        _params.method = _checkMethod(options.method, _replaceMethods(options.methods), _get);
    }
    if (options.json) {
        if (!options.headers) options.headers = {};
        options.headers["Accept"] = "application/json";
    }
    if (options.token) {
        if (!options.headers) options.headers = {};
        options.headers["Authorization"] = "Bearer " + options.token;
    }

    if (options.headers && Object.keys(options.headers).length) {
        Object.keys(options.headers).forEach((hk) => {
            if (hk && options.headers[hk])
                _params.headers.append(hk, options.headers[hk]);
        });
    }

    if (options.base && typeof options.base === "string") {
        options.base = options.base.trim();
        if (
            url.length &&
            options.base.length &&
            options.base[options.base.length - 1] === "/"
        )
            options.base = options.base.slice(1);
        url = options.base + url;
    }

    _params.body = options.body;

    if (_params.body) {
        // if (_params.body instanceof FormData) {
        //     let _body = {};
        //     for (let [name, value] of _params.body) _body[name] = value;
        //     _params.body = _body; //JSON.stringify(_body);//_body;
        // }

        // "Content-Type": "application/json", ////(body instanceof FormData) ////'application/x-www-form-urlencoded' //// 'multipart/form-data'???

        if (typeof _params.body !== "string") {
            _params.body = JSON.stringify(_params.body);
        }
    }

    if (_isGet(_params.method)) {
        // delete _params.method;
        delete _params.body; // TODO queryString ??
    }

    if (!Array.isArray(options.oks)) {
        options.oks = [200];
    }
    if (!Array.isArray(options.errs)) {
        options.errs = [422];
    }
    // if (options.oks && Array.isArray(options.oks)) {
    //     // options.oks = options.oks; //TODO [].includes
    // }
    // else {
    //     options.oks = [200];
    // }
    // if (options.errs && Array.isArray(options.errs)) {
    //     // options.errs = options.errs; //TODO [].includes
    // }
    // else {
    //     options.errs = [422];
    // }

    if (typeof options.before === "function") {
        options.before(options.beforeData);
    }

    // let isOk = false,
    //     responseError = false;
    let responseError = false;

    return fetch(url, _params)
            .then(r => {
                // if (r.ok) isOk = true;
                // else if (r.status === 422) responseError = true;

                // if (r.status === 422) responseError = r.status;
                if (r.status > 399) responseError = r.status;

                return options.json ? r.json() : r;
            })
            .then(d => {
                
                if (responseError) {

                    if (options.validate && d.errors) { // && responseError === 422
                        let _validator = (typeof options.validator === "function") ? options.validator : validator;
                        _validator(d.errors, options.validate);
                    }

                    throw new Error(d.message || HTTPStatuses[responseError] || responseError); //|| "Form error");
                }

                // if (options.check) {
                //     let $check = get(options.check, d);
                //     if ($check === undefined) {
                //         let message = `Not found ${options.check}`;

                //         console.error(message, d, url, options);
                //         throw new Error(message);
                //     }
                //     return d; // $check // $get
                // }

                // if (options.get) {
                //     // TODO if array
                //     let $get = get(options.check, d);
                //     if ($get === undefined) {
                //         let message = `Not found ${options.check}`;

                //         console.error(message, d, url, options);
                //         throw new Error(message);
                //     }
                //     return $get;
                // }

                if (typeof options.success === "function") {
                    return options.success(d);
                }

                return d;
            })
            .finally(x => {
                // TODO @DEV
                console.log("finally fetch IN $http", x);
                
                responseError = false;
                // isOk = false;
                
                if (typeof options.anyway === "function") {
                    options.anyway(x);
                }
                
            })
            .catch(e => {
                console.error("catch in $http", e);
                
                if (typeof options.fail === "function") {
                    options.fail(e);
                } else {
                    alert(e.message || "Unknown_error"); // TODO Errorer // notify
                }
            }); 
}

http.use = function(o) {
    if (o && typeof o === "object" && Object.keys(o).length) {
        Object.keys(o).forEach((k) => {
            if (HTTPOptions[k]!==undefined) useOptions[k] = o[k];
            if (CustomOptions[k] !== undefined && typeof o[k] === typeof CustomOptions[k]) useOptions[k] = o[k];
            if (CustomFunctions[k] !== undefined && typeof o[k] === "function") useOptions[k] = o[k];
            // if (CustomFunctions[k] !== undefined) useOptions[k] = typeof o[k] === "function" ? o[k] : CustomFunctions[k];
        });
    }
    return http;
};

HTTPMethods.map((m) => m.toLowerCase()).forEach((m) => {
    http[m] = function(url, options) {
        if (typeof options !== "object") options = {};
        options.method = m;
        return http(url, options);
    };
});
// const RESTAliases = {index: "get", list: "get", all: "get", viewAny: "get", show: "get", list: "get", list: "get", };

export default http;