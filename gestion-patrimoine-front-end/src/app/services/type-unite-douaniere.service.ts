import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { TypeUniteDouaniere } from '../model/type-unite-douaniere.model';




@Injectable({
  providedIn: 'root'
})
export class TypeUniteDouaniereService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) {}


  public listeTypeUniteDouanieres(): Observable<TypeUniteDouaniere[]> {
    return this.httpClient.get<TypeUniteDouaniere[]>(`${this.urlServeur}/TypeUniteDouanieres`, { withCredentials: true });
  }

  public ajouterTypeUniteDouaniere(typeUniteDouaniere: TypeUniteDouaniere): Observable<TypeUniteDouaniere> {
    return this.httpClient.post<TypeUniteDouaniere>(`${this.urlServeur}/AjouterTypeUniteDouaniere`, typeUniteDouaniere, { withCredentials: true });
  }

  public modifierTypeUniteDouaniere(typeUniteDouaniere: TypeUniteDouaniere): Observable<TypeUniteDouaniere> {
    return this.httpClient.put<TypeUniteDouaniere>(`${this.urlServeur}/ModifierTypeUniteDouaniere`, typeUniteDouaniere, { withCredentials: true });
  }

  public supprimerTypeUniteDouaniere(codeTypeUniteDouaniere: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerTypeUniteDouaniereByTypeUniteDouaniereId/${codeTypeUniteDouaniere}`, { withCredentials: true });
  }


}
