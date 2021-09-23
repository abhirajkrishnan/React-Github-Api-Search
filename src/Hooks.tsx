import { useDispatch,useSelector,TypedUseSelectorHook } from "react-redux";
import { RootState } from "./store";


export const UseAppSelector:TypedUseSelectorHook<RootState>=useSelector;