import React from "react";
import { useRouteError } from "react-router-dom";
import fotito from './assets/fotito.png';

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };
  console.error(error);

  return (
    <div id="error-page">
      <h1>Ups!</h1>
      <p>Lo sentimos, ha ocurrido un error inesperado.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <img src={fotito} alt="foto nene gordete" />
    </div>
  );
}