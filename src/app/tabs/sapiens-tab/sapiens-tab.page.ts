import { Component } from '@angular/core';
import { Result } from 'src/app/models/result.model';

interface ChatMessage {
  sender: 'user' | 'app';
  text: string;
}

@Component({
  selector: 'app-sapiens-tab-page',
  templateUrl: './sapiens-tab.page.html',
  styleUrls: ['./sapiens-tab.page.scss'],
})
export class SapiensTabPage {
  searchResults: Result[] = [];
  chatMessages: ChatMessage[] = [];
  searchText: string = '';

  private welcomeMessages: string[] = [
    "Hola, ¿qué película buscas hoy?",
    "Bienvenido, dime el título de la película que quieres ver.",
    "¿Listo para una noche de cine? ¿Qué te apetece?",
    "Encantado de ayudarte a encontrar la película perfecta.",
    "Un mundo de películas te espera, ¿por cuál empezamos?",
    "Cuéntame qué tipo de películas te gustan.",
    "¡Explorando nuevas películas! ¿Qué buscas hoy?",
    "Vamos a encontrar algo emocionante para ver.",
    "¿Buscas algo específico o quieres sugerencias?",
    "¿Qué género de películas prefieres?",
    "Pregunta por cualquier película, ¡estoy aquí para ayudar!",
    "¿Hay alguna película que te interese ver hoy?",
    "Listo para recomendarte las mejores películas.",
    "Cuéntame más sobre tus gustos cinematográficos.",
    "¿Qué te gustaría explorar en el mundo del cine hoy?",
    "Dime el nombre de una película o un actor y te ayudaré.",
    "¿Alguna preferencia para la película de hoy?",
    "Aquí para ayudarte a encontrar tu próxima película favorita.",
    "Vamos a encontrar la película perfecta para esta noche.",
    "¿Buscas un clásico o algo nuevo?"
  ];

  private responseMessages: string[] = [
    "Déjame buscar eso para ti.",
    "Aquí tienes algunas opciones que podrían interesarte.",
    "Un momento, estoy encontrando las mejores coincidencias.",
    "Estas películas podrían ser justo lo que buscas.",
    "He encontrado algo que podría gustarte.",
    "Basado en tu búsqueda, estas son mis recomendaciones.",
    "Echa un vistazo a estos títulos.",
    "Creo que estas películas se ajustan a lo que buscas.",
    "Déjame mostrarte lo que he encontrado.",
    "Espero que encuentres interesantes estas sugerencias.",
    "Aquí están las películas que coinciden con tu búsqueda.",
    "He seleccionado algunas películas que podrían gustarte.",
    "Estos son los resultados que he encontrado para ti.",
    "Creo que estas opciones podrían ser de tu agrado.",
    "Echa un vistazo a estas películas y dime qué opinas.",
    "Estas son las películas que he encontrado basadas en tu petición.",
    "Espero que alguna de estas películas sea lo que buscas.",
    "Aquí tienes algunos títulos que coinciden con tus criterios.",
    "Estos son los resultados basados en tu interés.",
    "He aquí algunas películas que podrían interesarte."
  ];

  constructor() {
    const randomWelcome = this.getRandomMessage(this.welcomeMessages);
    this.chatMessages.push({ sender: 'app', text: randomWelcome });
  }

  searchMovies() {
    if (!this.searchText) return;

    this.chatMessages.push({ sender: 'user', text: this.searchText });

    const mockResults = this.getMockResults(); // Obtener resultados ficticios
    this.searchResults = mockResults;

    const randomResponse = this.getRandomMessage(this.responseMessages);
    this.chatMessages.push({ sender: 'app', text: randomResponse });

    this.searchText = ''; // Restablecer campo de búsqueda
  }

  private getRandomMessage(messages: string[]): string {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }

  private getMockResults(): Result[] {
    // Generar resultados ficticios
    return [
      {
        adult: false,
        backdrop_path: '/path/to/image1.jpg',
        genre_ids: [28, 12],
        id: 1,
        original_language: 'en',
        original_title: 'The Adventure Begins',
        overview: 'Una aventura épica llena de emoción y descubrimiento.',
        popularity: 8.7,
        poster_path: '/path/to/poster1.jpg',
        release_date: '2024-01-01',
        title: 'The Adventure Begins',
        name: 'The Adventure Begins',
        vote_average: 7.5,
        vote_count: 215,
        first_air_date: '2024-01-01',
      },
    ];
  }
}
