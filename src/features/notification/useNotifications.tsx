import { useEffect, useReducer } from "react";
import { Notification } from "features/notification/notificationTypes";
import { getNotifications } from "features/notification/notificationApis";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const FETCH_START = "FETCH_START";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";

type State = {
  data: Notification[] | null;
  isLoading: boolean;
  error: Error | null;
};

type Action =
  | { type: typeof FETCH_START }
  | { type: typeof FETCH_SUCCESS; payload: Notification[] }
  | { type: typeof FETCH_ERROR; payload: Error | null };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, isLoading: true };
    case FETCH_SUCCESS:
      return { ...state, isLoading: false, data: action.payload };
    case FETCH_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("no such action type!");
  }
};

export const useNotification = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchNotifications = async () => {
      dispatch({ type: FETCH_START });
      try {
        const res = await getNotifications();
        dispatch({ type: FETCH_SUCCESS, payload: res.data });
      } catch (error) {
        console.error(error);
        dispatch({ type: FETCH_ERROR, payload: error as Error });
      }
    };

    void fetchNotifications();
  }, []);

  return state;
};
