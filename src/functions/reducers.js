export function postsReducer(state, action) {
  switch (action.type) {
    case "REQUEST_STARTED":
      return { ...state, loading: true, error: "" };
    case "REQUEST_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: "",
      };
    case "REQUEST_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export function profileReducer(state, action) {
  switch (action.type) {
    case "REQUEST_STARTED":
      return { ...state, loading: true, error: "" };
    case "REQUEST_SUCCESS":
      return {
        ...state,
        loading: false,
        profile: action.payload,
        error: "",
      };
    case "REQUEST_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export function photosReducer(state, action) {
  switch (action.type) {
    case "PHOTOS_REQUEST":
      return { ...state, loading: true, error: "" };
    case "PHOTOS_SUCCESS":
      return {
        ...state,
        loading: false,
        photos: action.payload,
        error: "",
      };
    case "PHOTOS_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export function relationsReducer(state, action) {
  switch (action.type) {
    case "RELATIONS_REQUEST":
      return { ...state, loading: true, error: "" };
    case "RELATIONS_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case "RELATIONS_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
