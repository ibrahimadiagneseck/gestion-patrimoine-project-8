import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/model/utilisateur.model';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  utilisateur = new Utilisateur();

  constructor() {
    
  }

  ngOnInit() {
    if(sessionStorage.getItem('userdetails')){
      this.utilisateur = JSON.parse(sessionStorage.getItem('userdetails') || "");
    }
  }

}
