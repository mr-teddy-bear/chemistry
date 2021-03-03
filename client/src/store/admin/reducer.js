import {
  GET_RAZDEL_INFO_FAILURE,
  GET_RAZDEL_INFO_REQUEST,
  GET_RAZDEL_INFO_SUCCESS,
  ADD_RAZDEL_REQUEST,
  ADD_RAZDEL_SUCCESS,
  ADD_RAZDEL_FAILURE,
  CHANGE_MESSAGE,
  DELETE_RAZDEL_FAILURE,
  DELETE_RAZDEL_REQUEST,
  DELETE_RAZDEL_SUCCESS,
  GET_TEST_FAILURE,
  GET_TEST_REQUEST,
  GET_TEST_SUCCESS,
  ADD_TEST_FAILURE,
  ADD_TEST_REQUEST,
  ADD_TEST_SUCCESS,
  DELETE_TEST_FAILURE,
  DELETE_TEST_REQUEST,
  DELETE_TEST_SUCCESS,
} from "../actionTypes";

const initialState = {
  isRequesting: false,
  adminAuth: true,
  message: "",
  error: "",
  razdels: [],
  tests: [],
};

function adminReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_MESSAGE:
      return {
        ...state,
        message: payload,
      };
    case GET_RAZDEL_INFO_REQUEST:
      return {
        ...state,
        isRequesting: true,
      };
    case GET_RAZDEL_INFO_FAILURE:
      return {
        ...state,
        isRequesting: false,
        message: "Что-то пошло не так...",
        error: payload,
      };
    case GET_RAZDEL_INFO_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        razdels: [...payload],
      };
    case ADD_RAZDEL_REQUEST:
      return {
        ...state,
        isRequesting: true,
      };
    case ADD_RAZDEL_FAILURE:
      return {
        ...state,
        isRequesting: false,
        message: "Такой раздел уже существует",
        error: payload,
      };
    case ADD_RAZDEL_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        razdels: [...payload],
        message: "Раздел успешно добавлен",
      };
    case DELETE_RAZDEL_REQUEST:
      return {
        ...state,
        isRequesting: true,
      };
    case DELETE_RAZDEL_FAILURE:
      return {
        ...state,
        isRequesting: false,
        message: "Что-то пошло не так",
        error: payload,
      };
    case DELETE_RAZDEL_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        razdels: [...payload],
        message: "Раздел удален",
      };
    case GET_TEST_REQUEST:
      return {
        ...state,
        isRequesting: true,
      };
    case GET_TEST_FAILURE:
      return {
        ...state,
        isRequesting: false,
        message: "Что-то пошло не так",
        error: payload,
      };
    case GET_TEST_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        tests: [...payload],
      };
    case ADD_TEST_REQUEST:
      return {
        ...state,
        isRequesting: true,
      };
    case ADD_TEST_FAILURE:
      return {
        ...state,
        isRequesting: false,
        message: "Что-то пошло не так",
        error: payload,
      };
    case ADD_TEST_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        tests: [...payload],
      };
    case DELETE_TEST_REQUEST:
      return {
        ...state,
        isRequesting: true,
      };
    case DELETE_TEST_FAILURE:
      return {
        ...state,
        isRequesting: false,
        message: "Что-то пошло не так",
        error: payload,
      };
    case DELETE_TEST_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        tests: [...payload],
        message: "Тест удален",
      };
    // case CHANGE_TEST_STATUS:
    //   return {
    //     ...state,
    //     chemistry: state.chemistry.map((item) => {
    //       return item.id === payload
    //         ? { ...item, status: "waiting" }
    //         : { ...item };
    //     }),
    //   };

    default:
      return state;
  }
}

export default adminReducer;
