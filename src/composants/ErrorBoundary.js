import React from "react";
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Mettre à jour l'état pour que le prochain rendu affiche l'interface de repli.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Vous pouvez également enregistrer l'erreur dans un service de rapport d'erreurs
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Vous pouvez rendre n'importe quelle interface de repli personnalisée
      return <h1>Quelque chose a mal tourné.</h1>;
    }

    return this.props.children; 
  }
}
