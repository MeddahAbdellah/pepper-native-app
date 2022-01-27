// The types of the store are going to be inferred by the react-redux library
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../services/store";

export const usePepperDispatch = () => useDispatch<AppDispatch>();
export const usePepperSelector: TypedUseSelectorHook<RootState> = useSelector;