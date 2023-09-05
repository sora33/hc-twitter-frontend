import { getMessages } from "features/dm/message/messageApis";
import { useEffect, useReducer, useState } from "react";
import { Message } from "features/dm/message/messageTypes";
import { useParams } from "react-router-dom";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
  isRefetching: false,
};
const FETCH_START = "FETCH_START";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";
const REFETCH_START = "REFETCH_START";

type State = {
  data: Message[] | null;
  isLoading: boolean;
  error: Error | null;
  isRefetching: boolean;
};

type Action =
  | { type: typeof FETCH_START }
  | { type: typeof FETCH_SUCCESS; payload: Message[] }
  | { type: typeof FETCH_ERROR; payload: Error | null }
  | { type: typeof REFETCH_START };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, isLoading: true };
    case FETCH_SUCCESS:
      return { ...state, isLoading: false, isRefetching: false, data: action.payload };
    case FETCH_ERROR:
      return { ...state, isLoading: false, isRefetching: false, error: action.payload };
    case REFETCH_START:
      return { ...state, isRefetching: true };
    default:
      throw new Error("no such action type!");
  }
};

export const useMessages = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [refetch, setRefetch] = useState(false);
  const { id } = useParams<{ id: string }>();

  const fetchMessages = async (isRefetch: boolean) => {
    dispatch({ type: isRefetch ? REFETCH_START : FETCH_START });
    try {
      const res = await getMessages(id!);
      dispatch({ type: FETCH_SUCCESS, payload: res });
    } catch (error) {
      console.log(error);
      dispatch({ type: FETCH_ERROR, payload: error as Error });
    } finally {
      if (isRefetch) setRefetch(false);
    }
  };

  useEffect(() => {
    void fetchMessages(false);
  }, []);

  useEffect(() => {
    if (refetch) {
      void fetchMessages(true);
    }
  }, [refetch]);

  return { ...state, setRefetch };
};
