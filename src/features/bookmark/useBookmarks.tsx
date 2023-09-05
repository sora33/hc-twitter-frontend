import { getBookmarks } from "features/bookmark/bookmarkApis";
import { useEffect, useReducer } from "react";
import { Tweet } from "features/tweet/tweetTypes";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
const FETCH_START = "FETCH_START";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";

type State = {
  data: Tweet[] | null;
  isLoading: boolean;
  error: Error | null;
};

type Action =
  | { type: typeof FETCH_START }
  | { type: typeof FETCH_SUCCESS; payload: Tweet[] }
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

export const useBookmarks = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchBookmarks = async () => {
    dispatch({ type: FETCH_START });
    try {
      const res = await getBookmarks();
      dispatch({ type: FETCH_SUCCESS, payload: res });
    } catch (error) {
      console.log(error);
      dispatch({ type: FETCH_ERROR, payload: error as Error });
    }
  };

  useEffect(() => {
    void fetchBookmarks();
  }, []);

  return { ...state };
};
