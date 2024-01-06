import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GptResponse } from '../models/gpt-response.model';

@Injectable({
  providedIn: 'root'
})
export class GptApiService {

  constructor(private http: HttpClient) { }

  getApiResponseChatGPTtopicFromServer(topic: string): Observable<GptResponse[]> {
    const message = '. INSTRUCTIONS: Always generates 5 results ordered from most likely to least likely based on TOPIC:. And add a sixth result with field "mt" with value "reply" and with a "message" field with a custom reply in the first person singular in Spanish Spanish, at the beginning of the json I have ot:reply and have a custom message related to the search saying something similar to you hope he enjoys the film, and you can give a touch of white humour in your reply based on the results, saying some typical phrase or joke from the film or series';
    const urlQuery = `https://us-central1-movie-wiser.cloudfunctions.net/getApiResponseChatGPTtopicFromServer?topic=TOPIC: ${topic}${message}`;
    return this.http.get<GptResponse[]>(urlQuery);
  }
}
