
const errFetch = (err) => {
    let error = {};
    let req = JSON.parse(err.response.request.response).errors.children;
    Object.entries(req).map(m => {
        error[m[0]] = m[1].errors;
    })
    return error;
};

export {errFetch}