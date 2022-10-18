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

export function chatContactsReducer(state, action) {
  switch (action.type) {
    case "CHAT_CONTACTS_REQUEST":
      return { ...state, loading: true, error: false };
    case "CHAT_CONTACTS_SUCCESS":
      return {
        ...state,
        loading: false,
        contacts: action.payload,
        error: false,
      };
    case "CHAT_CONTACTS_ERROR":
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
}

export function messagesReducer(state, action) {
  switch (action.type) {
    case "MESSAGES_REQUEST":
      return { ...state, messagesLoading: true, error: false };
    case "MESSAGES_SUCCESS":
      return {
        ...state,
        messagesLoading: false,
        messages: action.payload,
        error: false,
      };
    case "MESSAGES_ERROR":
      return { ...state, messagesLoading: false, error: true };

    default:
      return state;
  }
}
