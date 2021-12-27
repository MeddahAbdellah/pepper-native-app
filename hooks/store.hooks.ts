import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "../services/store"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const usePepperDispatch = () => useDispatch<AppDispatch>()
export const usePepperSelector: TypedUseSelectorHook<RootState> = useSelector;