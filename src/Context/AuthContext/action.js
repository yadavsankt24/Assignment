// export function ProductSuccess(data) {
//     return { type: "GET_PRODUCTS_SUCCESS", payLoad: data };
// }

// export function ProductRequest() {
//     return { type: "GET_PRODUCTS_REQUEST" };
//   }
  
//   export function ProductFailure(data) {
//     return { type: "GET_PRODUCTS_FAILURE" };
//   }


export function loginSuccessAction(data) {
    return { type: "LOGIN_LOADING", payLoad: data };
  }
  
  export function loginLoadingAction() {
    return { type: "LOGIN_REQUEST"};
  }
  
  export function loginFailureAction() {
    return { type: "LOGIN_FAILURE"};
  }