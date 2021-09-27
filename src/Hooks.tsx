import { useDispatch,useSelector,TypedUseSelectorHook } from "react-redux";
import { RootState,AppDispatch } from "./store";


export const UseAppSelector:TypedUseSelectorHook<RootState>=useSelector;
export const UseAppDispatch=()=>useDispatch<AppDispatch>();