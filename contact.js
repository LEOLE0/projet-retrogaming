// Fonction pour échapper les caractères HTML spéciaux
function escapeHTML(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// Fonction pour valider le formulaire
function validateForm() {
    // Récupérer les valeurs des champs du formulaire
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Vérifier que tous les champs sont remplis
    if (!name || !email || !message) {
        alert('Tous les champs sont requis.');
        return false;
    }

    // Échapper les caractères spéciaux dans le message
    const escapedMessage = escapeHTML(message);

    // Logique de validation supplémentaire (ex: format de l'email) peut être ajoutée ici

    // Envoyer les données nettoyées au serveur
    sendFormData(name, email, escapedMessage);

    return false; // Empêcher la soumission par défaut du formulaire
}

// Fonction pour envoyer les données du formulaire au serveur
function sendFormData(name, email, message) {
    // Cette fonction devrait envoyer les données nettoyées au serveur
    console.log('Envoi des données :', { name, email, message });

    // Exemple : utilisation de l'API Fetch pour envoyer les données au serveur
    fetch('/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Succès :', data);
        alert('Message envoyé avec succès !');
    })
    .catch((error) => {
        console.error('Erreur :', error);
        alert('Erreur lors de l\'envoi du message.');
    });
}