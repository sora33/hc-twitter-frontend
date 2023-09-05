import { getGroups } from "features/dm/group/groupApis";
import { useEffect, useReducer } from "react";
import { Group } from "features/dm/group/groupTypes";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
const FETCH_START = "FETCH_START";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";

type State = {
  data: Group[] | null;
  isLoading: boolean;
  error: Error | null;
};

type Action =
  | { type: typeof FETCH_START }
  | { type: typeof FETCH_SUCCESS; payload: Group[] }
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

export const useGroups = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchGroups = async () => {
    dispatch({ type: FETCH_START });
    try {
      const res = await getGroups();
      dispatch({ type: FETCH_SUCCESS, payload: res });
    } catch (error) {
      console.log(error);
      dispatch({ type: FETCH_ERROR, payload: error as Error });
    }
  };

  useEffect(() => {
    void fetchGroups();
  }, []);

  return { ...state };
};
