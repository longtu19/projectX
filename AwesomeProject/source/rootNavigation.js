import * as React from 'react';
import { createNavigationContainerRef } from '@react-navigation/native';
export const navigationRef = createNavigationContainerRef();
export const isReadyRef = React.createRef(); 

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}