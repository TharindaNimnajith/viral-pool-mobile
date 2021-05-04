import {createRef} from 'react'
import Constants from '../shared/constants'

export const isReadyRef = createRef()

export const navigationRef = createRef()

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current)
    navigationRef.current.navigate(name, params)
  else
    console.log(Constants.NAVIGATOR_ERROR)
}
