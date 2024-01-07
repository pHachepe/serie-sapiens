import { Component, ElementRef, ViewChild } from '@angular/core';
import { forkJoin, of, switchMap } from 'rxjs';
import { GptApiService } from 'src/app/api/gpt-api.service';
import { MoviedbService } from 'src/app/api/moviedb.service';
import { MT } from 'src/app/models/gpt-response.model';
import { Result } from 'src/app/models/result.model';

interface ChatMessage {
  sender: 'user' | 'app';
  text: string;
  searchResults?: Result[];
}

@Component({
  selector: 'app-sapiens-tab-page',
  templateUrl: './sapiens-tab.page.html',
})
export class SapiensTabPage {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  searchResults: Result[] = [];
  chatMessages: ChatMessage[] = [];
  searchText: string = '';
  isLoading = false;

  constructor(
    private gptApiService: GptApiService,
    private moviedbService: MoviedbService
  ) {
    const randomWelcome = this.getRandomMessage(this.welcomeMessages);
    this.chatMessages.push({ sender: 'app', text: randomWelcome });
  }

  private welcomeMessages: string[] = [
    'Hola, ¿qué película buscas hoy?',
    'Bienvenido, dime el título de la película que quieres ver.',
    '¿Listo para una noche de cine? ¿Qué te apetece?',
    'Encantado de ayudarte a encontrar la película perfecta.',
    'Un mundo de películas te espera, ¿por cuál empezamos?',
    'Cuéntame qué tipo de películas te gustan.',
    '¡Explorando nuevas películas! ¿Qué buscas hoy?',
    'Vamos a encontrar algo emocionante para ver.',
    '¿Buscas algo específico o quieres sugerencias?',
    '¿Qué género de películas prefieres?',
    'Pregunta por cualquier película, ¡estoy aquí para ayudar!',
    '¿Hay alguna película que te interese ver hoy?',
    'Listo para recomendarte las mejores películas.',
    'Cuéntame más sobre tus gustos cinematográficos.',
    '¿Qué te gustaría explorar en el mundo del cine hoy?',
    'Dime el nombre de una película o un actor y te ayudaré.',
    '¿Alguna preferencia para la película de hoy?',
    'Aquí para ayudarte a encontrar tu próxima película favorita.',
    'Vamos a encontrar la película perfecta para esta noche.',
    '¿Buscas un clásico o algo nuevo?',
  ];

  private responseMessages: string[] = [
    'Déjame buscar eso para ti.',
    'Aquí tienes algunas opciones que podrían interesarte.',
    'Un momento, estoy encontrando las mejores coincidencias.',
    'Estas películas podrían ser justo lo que buscas.',
    'He encontrado algo que podría gustarte.',
    'Basado en tu búsqueda, estas son mis recomendaciones.',
    'Echa un vistazo a estos títulos.',
    'Creo que estas películas se ajustan a lo que buscas.',
    'Déjame mostrarte lo que he encontrado.',
    'Espero que encuentres interesantes estas sugerencias.',
    'Aquí están las películas que coinciden con tu búsqueda.',
    'He seleccionado algunas películas que podrían gustarte.',
    'Estos son los resultados que he encontrado para ti.',
    'Creo que estas opciones podrían ser de tu agrado.',
    'Echa un vistazo a estas películas y dime qué opinas.',
    'Estas son las películas que he encontrado basadas en tu petición.',
    'Espero que alguna de estas películas sea lo que buscas.',
    'Aquí tienes algunos títulos que coinciden con tus criterios.',
    'Estos son los resultados basados en tu interés.',
    'He aquí algunas películas que podrían interesarte.',
  ];

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.messageContainer && this.messageContainer.nativeElement) {
        const scrollElement = this.messageContainer.nativeElement;
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }, 100); // setTimeout para asegurar que el DOM esté actualizado
  }

  searchMovies() {
    if (!this.searchText) return;
    this.isLoading = true; // Activa el indicador de carga
    this.chatMessages.push({ sender: 'user', text: this.searchText });
    this.scrollToBottom();

    this.gptApiService
      .getApiResponseChatGPTtopicFromServer(this.searchText)
      .pipe(
        switchMap((results) => {
          // Filtrar para encontrar el resultado con "ot": "reply" y quitarlo de la lista
          const reply = results.find(
            (result) => result.mt === MT.Reply || result.ot === 'reply'
          );
          results = results.filter(
            (result) => result.mt !== MT.Reply && result.ot !== 'reply'
          );

          // Crear un array de Observables para cada búsqueda
          const searchObservables = results.map((result) =>
            this.moviedbService.search(result.ot).pipe(
              switchMap((apiResult) => {
                const firstResult = apiResult.results[0];
                return firstResult ? of(firstResult) : of(null);
              })
            )
          );

          // Retorna un Observable que emite un array de todos los resultados
          return forkJoin(searchObservables).pipe(
            switchMap((searchResults) => {
              // Filtrar los resultados nulos y devolver los resultados junto con el 'reply'
              return of({
                searchResults: searchResults.filter((res) => res !== null),
                reply,
              });
            })
          );
        })
      )
      .subscribe(({ searchResults, reply }) => {
        const randomResponse = this.getRandomMessage(this.responseMessages);

        // Filtrar los resultados para excluir los valores null
        const validSearchResults = searchResults.filter(
          (result) => result !== null
        ) as Result[];

        // Añadir un mensaje con los resultados de búsqueda
        this.chatMessages.push({
          sender: 'app',
          text: reply?.message || randomResponse,
          searchResults: validSearchResults,
        });

        this.scrollToBottom();
        this.isLoading = false; // Desactiva el indicador de carga una vez completado
      });

    this.searchText = ''; // Restablecer campo de búsqueda
  }

  private getRandomMessage(messages: string[]): string {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }
}
