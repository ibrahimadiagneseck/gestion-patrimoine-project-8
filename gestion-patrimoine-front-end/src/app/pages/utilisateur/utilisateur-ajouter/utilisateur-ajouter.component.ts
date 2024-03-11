import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Authorities } from 'src/app/model/authorities.model';
import { Utilisateur } from 'src/app/model/utilisateur.model';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { AuthorityService } from 'src/app/services/authority.service';
import { SectionsService } from 'src/app/services/sections.service';
import { UniteDouaniere } from 'src/app/model/unite-douaniere.model';
import { UniteDouaniereService } from 'src/app/services/unite-douaniere.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, NgForm } from '@angular/forms';
import { Section } from 'jspdf-autotable';
import { Sections } from 'src/app/model/sections.model';
import { AgentService } from 'src/app/services/agent.service';
import { Agent } from 'src/app/model/agent.model';
import { Fonction } from 'src/app/model/fonction.model';
import { FonctionService } from 'src/app/services/fonction.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
// import { CorpsAgentService } from 'src/app/services/corps-agent.service';

@Component({
  selector: 'app-utilisateur-ajouter',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './utilisateur-ajouter.component.html',
  styleUrl: './utilisateur-ajouter.component.css'
})
export class UtilisateurAjouterComponent implements OnInit, OnDestroy {


  // ----------------------------------------------------------------
  // selectedMatricule: string = "";
  control = new FormControl('');
  filteredAgents: Observable<Agent[]> | undefined;

  // -----------------------------------------------------------------------

  public condition: Boolean = true;

  public fonctions: Fonction[] = [];
  public fonction: Fonction = new Fonction();

  public agents: Agent[] = [];
  public agent: Agent = new Agent();

  public authorities: Authorities[] = [];
  public authority: Authorities = new Authorities();

  public utilisateurs: Utilisateur[] = [];
  public utilisateur: Utilisateur = new Utilisateur();

  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<UtilisateurAjouterComponent>,
    private fonctionService: FonctionService,
    private agentService: AgentService,
    private authorityService: AuthorityService,
    private utilisateurService: UtilisateurService,
    private notificationService: NotificationService,
  ) { }

  private sendNotification(type: NotificationType, message: string, titre?: string): void {
    if (message) {
      this.notificationService.showAlert(type, message, titre);
    } else {
      this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
    }
  }

  ngOnInit(): void {
    this.listeFonctions();
    this.listeAgents();
    this.listeAuthorities();

    this.filteredAgents = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  // -------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------
  private _filter(value: string): Agent[] {

    if (value == "") {
      this.agent = new Agent();
    }

    // Trouver l'agent ayant exactement le même matriculeAgent que la valeur donnée
    let agentTrouve = this.agents.find(agent => this._normalizeValue(agent.matriculeAgent) === value.toLocaleLowerCase());
    if (agentTrouve) {
      this.agent = agentTrouve;
    } else {
      this.agent = new Agent();
    }

    // la liste des agents trouvé ou agent trouvé en fonction du mot a rechercher
    let listeAgents = this.agents.filter(agent => this._normalizeValue(agent.matriculeAgent).includes(value.toLocaleLowerCase()));
    // Trouver l'agent automatique au premier indice sans avoir saisie le matricule au complet 
    // if (listeAgents.length == 1) {
    //   this.agent = this.agents.find(agent => agent.matriculeAgent === listeAgents[0].matriculeAgent) ?? new Agent();
    // }
    return listeAgents;
  }

  private _normalizeValue(value: string): string {
    return value.toLocaleLowerCase().replace(/\s/g, '');
  }


  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedMatricule = event.option.value;
    this.agent = this.agents.find(agent => agent.matriculeAgent === selectedMatricule) ?? new Agent();
  }

  // -------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------



  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeFonctions(): void {

    const subscription = this.fonctionService.listeFonctions().subscribe({
      next: (response: Fonction[]) => {
        this.fonctions = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------


  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeAuthorities(): void {

    const subscription = this.authorityService.listeAuthorities().subscribe({
      next: (response: Authorities[]) => {
        this.authorities = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------


  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeAgents(): void {

    const subscription = this.agentService.listeAgents().subscribe({
      next: (response: Agent[]) => {
        this.agents = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------



  popupFermer(): void {
    this.dialogRef.close();
  }


  // --------------------------------------------------------------------------
  private clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

  // pour envoyer tous les formulaires
  public submitForm(): void {
    this.clickButton('utilisateur-form');
  }


  // --------------------------------------------------------------------------
  // pour executer ajouterBonEntree
  public submitUtilisateurForm(): void {
    this.clickButton('utilisateur-form')
  }

  public ajouterUtilisateur(UtilisateurForm: NgForm): void {

    this.condition = true;

    this.utilisateur = new Utilisateur();
    
    // console.log(this.utilisateur);

    // ------------------------------------------------------------------------------------------------------
    this.subscriptions.push(this.agentService.recupererAgentById(this.agent.matriculeAgent).subscribe({
      next: (response: Agent) => {
        console.log(response);
        this.agent = response;

        if (!this.agent) {
          this.condition = false;
          this.sendNotification(NotificationType.ERROR, `Cet agent n'existe pas`);
        }

        this.utilisateur.codeFonction = UtilisateurForm.value.codeFonction;
        this.utilisateur.userName = this.agent.matriculeAgent;

        // ------------------------------------------------------------------------------------------------------
        this.subscriptions.push(this.utilisateurService.recupererUserByUserName(this.utilisateur.userName).subscribe({
          next: (response: Utilisateur) => {

            if (response) {
              this.condition = false;
              this.sendNotification(NotificationType.ERROR, `Cet utilisateur existe déjà`);
            }

            // ------------------------------------------------------------------------------------------------------
            if (this.condition) {
              this.utilisateur.authorities = [UtilisateurForm.value.authorities];

              console.log(this.utilisateur);

              // pas sa place
              setTimeout(() => {
                this.popupFermer();
                this.sendNotification(NotificationType.SUCCESS, `Ajout réussi du utilisateur`);
              }, 2500);

              this.subscriptions.push(this.utilisateurService.ajouterUser(this.utilisateur).subscribe({
                next: (response: Utilisateur) => {
                  // console.log(response);
                  // this.popupFermer();
                  // this.sendNotification(NotificationType.SUCCESS, `Ajout réussi du utilisateur`);
                },
                error: (errorResponse: HttpErrorResponse) => {

                }
              }));
            }
          },
          error: (errorResponse: HttpErrorResponse) => {

          }
        }));

      },
      error: (errorResponse: HttpErrorResponse) => {

      }
    }));

  }



  // --------------------------------------------------------------------------



  // onSubmit(): void {
  //   // console.log(this.vehiculeForm.value);
  //   // this.AjouterVehicule();
  // }

}
