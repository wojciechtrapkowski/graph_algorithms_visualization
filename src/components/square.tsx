'use client';

import { squareState } from "@/states/squareState";
import './square.css';

type SquareProps = {
  fieldValue : number;
}

export const Square = (props : SquareProps) => {
  if(props.fieldValue == squareState.path) {
    return (<></>);
  } else if (props.fieldValue == squareState.obstacle) {
    return (<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.38 29.1038L23.28 30.0938C24.36 30.0938 25.38 29.5838 26.02 28.7138L29.2 24.4138C29.76 23.6438 29.98 22.6738 29.79 21.7438L29.2849 19.1806L28.12 18.3438L27.785 15.6438L28.4809 15.1008L28.45 14.9438C28.29 14.1238 27.84 13.3938 27.17 12.8938L23.38 9.52378L21 5.12378L18.1 4.96378L13.04 3.12378L6.37996 10.1638L4.76996 13.7738L4.50996 14.3538L2.84996 17.4238C2.67996 17.7238 2.86996 20.5038 2.80996 20.8438C2.80996 20.8438 9.75996 29.1038 10.38 29.1038Z" fill="#9B9B9B"/>
      <path d="M20 10.1038L15.95 21.2438L25.66 23.9438L29.29 19.1738L28.48 15.1038L20 10.1038Z" fill="#E6E6E6"/>
      <path d="M2.51 18.3936L2 22.1036H5L5.79 18.9736C5.92 18.4136 6.27 17.9436 6.76 17.6436L11 15.1036L7.95 8.4436L6.57 9.9536C6.44 10.0936 6.34 10.2536 6.26 10.4336L4.51 14.3636L2.85 17.4336C2.68 17.7336 2.57 18.0536 2.51 18.3936Z" fill="#636363"/>
      <path d="M11.51 20.6137L16 25.1037L25.66 23.9437L18.18 20.5437C17.52 20.2437 17.18 19.4937 17.39 18.7937L20 10.1037L21 5.12367C20.16 3.78367 19.77 3.40367 18.33 2.93367C17.37 2.59367 16.54 2.30367 16.54 2.30367C16.54 2.30367 16 2.07367 15.42 2.01367C14.69 1.95367 14.22 2.08367 13.6 2.55367L11 15.1037V19.3837C11 19.8437 11.18 20.2837 11.51 20.6137Z" fill="#D3D3D3"/>
      <path d="M2 22.1038H5L16 25.1038V30.0938L11.75 30.1038C10.6 30.1038 9.47 29.8438 8.44 29.3238L7.07 28.6438C6.36 28.2938 5.72 27.8238 5.16 27.2638L4.23 26.3338C3.42 25.5238 2.81 24.5438 2.45 23.4538L2 22.1038Z" fill="#636363"/>
      <path d="M29.98 22.9136C30.1 23.5736 29.92 24.2536 29.47 24.7636L25.5 29.2836C25.09 29.7536 24.33 30.0936 23.71 30.1036H16V25.1036L25.66 23.9436L29.28 19.1736L29.98 22.9136Z" fill="#9B9B9B"/>
      <path d="M17.51 4.43372L16.4 2.86372C15.72 1.90372 14.33 1.79372 13.51 2.64372L6.75003 9.68372C6.10003 10.3637 6.22003 11.4737 7.00003 11.9937L11 15.1037L15.63 10.8937C16.18 10.3937 16.58 9.75372 16.79 9.03372L17.74 5.78372C17.87 5.32372 17.79 4.82372 17.51 4.43372Z" fill="#9B9B9B"/>
      </svg>
    );
  }
  else if (props.fieldValue == squareState.source) {
    return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
    width="21.875px" height="21.875px" viewBox="0 0 21.875 21.875" enable-background="new 0 0 21.875 21.875">
    <g id="Layer_4">
    </g>
    <g id="Layer_2">
      <g>
       <rect x="3.778" y="11.427" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 28.6357 16.3531)" fill="#424242" width="14.306" height="5.361"/>
       <rect x="3.792" y="5.088" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 13.1915 20.9994)" fill="#424242" width="14.305" height="5.361"/>
   </g>
 </g>
 </svg>);
  }
  else if (props.fieldValue == squareState.destination) {
    return (
    <svg style={{fill: "#2a2a2a"}} xmlns="http://www.w3.org/2000/svg" height="1.4em" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
    );
  }
  else if (props.fieldValue == squareState.foundDestination) {
    return (
        <svg className="scaling-svg" style={{fill: "#b81e1e"}} xmlns="http://www.w3.org/2000/svg" height="1.4em" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
    );
  }
  return(<></>);
}