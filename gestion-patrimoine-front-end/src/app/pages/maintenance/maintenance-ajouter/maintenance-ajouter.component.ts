import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Accident } from 'src/app/model/accident';
import { ChangementPiece } from 'src/app/model/changement-piece';
import { Maintenance } from 'src/app/model/maintenance';
import { MyDate } from 'src/app/model/my-date.model';
import { Reparation } from 'src/app/model/reparation';
import { Vehicule } from 'src/app/model/vehicule.model';
import { Vidange } from 'src/app/model/vidange';
import { ChangementPieceService } from 'src/app/services/ChangementPiece';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { MyDateService } from 'src/app/services/my-date.service';
import { NotificationService } from 'src/app/services/notification.service';
import { VehiculeService } from 'src/app/services/vehicule.service';

@Component({
  selector: 'app-maintenance-ajouter',
  // standalone: true,
  // imports: [],
  templateUrl: './maintenance-ajouter.component.html',
  styleUrl: './maintenance-ajouter.component.css'
})
export class MaintenanceAjouterComponent implements OnInit, OnDestroy {

  nombrePiece: number = 0;

  selectedAccident: boolean | undefined;
  selectedTypeMaintenance: string = '';
  currentDateFormatted: string = '';
  // modelDate1: NgbDateStruct | null = null;

  // ----------------------------------------------------------------
  // selectedMatricule: string = "";
  control = new FormControl('');
  filteredVehicules: Observable<Vehicule[]> | undefined;

  // -----------------------------------------------------------------------

  // public condition: Boolean = true;

  public accidents: Accident[] = [];
  public accident: Accident = new Accident();

  public vidanges: Vidange[] = [];
  public vidange: Vidange = new Vidange();

  public reparations: Reparation[] = [];
  public reparation: Reparation = new Reparation();

  public changementPieces: ChangementPiece[] = [];
  public changementPiece: ChangementPiece = new ChangementPiece();

  public vehicules: Vehicule[] = [];
  public vehicule: Vehicule = new Vehicule();

  public maintenances: Maintenance[] = [];
  public maintenance: Maintenance = new Maintenance();

  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<MaintenanceAjouterComponent>,
    // private fonctionService: FonctionService,
    // private agentService: AgentService,
    private vehiculeService: VehiculeService,
    private maintenanceService: MaintenanceService,
    private changementPieceService: ChangementPieceService,
    private notificationService: NotificationService,
    private myDateService: MyDateService,
  ) { }

  private sendNotification(type: NotificationType, message: string, titre?: string): void {
    if (message) {
      this.notificationService.showAlert(type, message, titre);
    } else {
      this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
    }
  }

  ngOnInit(): void {
    this.currentDateFormatted = this.myDateStringFormatter(new Date().toString());

    this.listeVehicules();
    this.listeChangementPieces();

    this.filteredVehicules = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  // -------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------
  private _filter(value: string): Vehicule[] {

    if (value == "") {
      this.vehicule = new Vehicule();
    }

    // Trouver le vehicule ayant exactement le même numeroSerie que la valeur donnée
    let vehiculeTrouve = this.vehicules.find(vehicule => this._normalizeValue(vehicule.numeroSerie) === value.toLocaleLowerCase());
    if (vehiculeTrouve) {
      this.vehicule = vehiculeTrouve;
    } else {
      this.vehicule = new Vehicule();
    }

    // la liste des vehicules trouvé ou vehicule trouvé en fonction du mot a rechercher
    let listeVehicules = this.vehicules.filter(vehicule => this._normalizeValue(vehicule.numeroSerie).includes(value.toLocaleLowerCase()));
    // Trouver l'agent automatique au premier indice sans avoir saisie le matricule au complet 
    // if (listeAgents.length == 1) {
    //   this.agent = this.agents.find(agent => agent.matriculeAgent === listeAgents[0].matriculeAgent) ?? new Agent();
    // }
    return listeVehicules;
  }

  private _normalizeValue(value: string): string {
    return value.toLocaleLowerCase().replace(/\s/g, '');
  }


  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedNumeroSerie = event.option.value;
    this.vehicule = this.vehicules.find(vehicule => vehicule.numeroSerie === selectedNumeroSerie) ?? new Vehicule();
  }

  // -------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------


  // Fonction déclenchée lorsqu'une nouvelle option est sélectionnée
  onTypeMaintenanceChange(value: string) {

    // reinitialiser les options 
    this.selectedAccident = undefined;

    this.selectedTypeMaintenance = value;
  }

  // onTypeAccident(event: any) {
  //   if (this.selectedAccident) {
  //     console.log("OUI a été sélectionné. Traitement spécifique pour OUI.");
  //     // Vous pouvez ajouter ici tout traitement supplémentaire spécifique pour "OUI"
  //   } else {
  //     console.log("NON a été sélectionné. Traitement spécifique pour NON.");
  //     // Vous pouvez ajouter ici tout traitement supplémentaire spécifique pour "NON"
  //   }
  // }

  // formatCurrentDate() {
  //   const currentDate = new Date();
  //   // this.currentDateFormatted = formatDate(currentDate, 'dd MMMM yyyy', 'fr-FR');
  //   this.currentDateFormatted = this.myDateService.formatterMyDateFromString(currentDate.toString());
  // }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeVehicules(): void {

    const subscription = this.vehiculeService.listeVehicules().subscribe({
      next: (response: Vehicule[]) => {
        this.vehicules = response;
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
  public listeChangementPieces(): void {

    const subscription = this.changementPieceService.listeChangementPieces().subscribe({
      next: (response: ChangementPiece[]) => {
        this.changementPieces = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------


  // nombreChangementPiece(bonPour: BonPour, articleBonPours: ArticleBonPour[]): number {
  //   return articleBonPours.reduce((count, article) => {
  //     if (bonPour && article.identifiantBonPour && bonPour.identifiantBonPour === article.identifiantBonPour) {
  //       return count + 1;
  //     }
  //     return count;
  //   }, 1);
  // }


  popupFermer(): void {
    this.dialogRef.close();
  }


  // --------------------------------------------------------------------------
  private clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

  // pour envoyer tous les formulaires
  public submitForm(): void {
    this.clickButton('maintenance-form');
    this.clickButton('vidange-form');
    this.clickButton('reparation-form');
    this.clickButton('changement-piece-form');
    this.clickButton('accident-form');
  }

  public ajouterVidange(VidangeForm: NgForm): void {
    this.vidange.libelleHuile = VidangeForm.value.libelleHuile;
    this.vidange.quantiteMiseVehicule = VidangeForm.value.quantiteMiseVehicule;
  }
  
  public ajouterReparation(ReparationForm: NgForm): void {
    this.vidange.libelleHuile = ReparationForm.value.libelleHuile;
    this.vidange.quantiteMiseVehicule = ReparationForm.value.quantiteMiseVehicule;
  }


  public ajouterChangementPiece(ChangementPieceForm: NgForm): void {
    this.changementPiece.nombrePiecesRechangees = ChangementPieceForm.value.nombrePiecesRechangees;
    this.changementPiece.referencePieces = ChangementPieceForm.value.referencePieces;
  }


  public ajouterAccident(AccidentForm: NgForm): void {
    this.accident.lieuIncident = AccidentForm.value.lieuIncident;
    this.accident.commentaireIncident = AccidentForm.value.commentaireIncident;
    this.accident.nombreDeces = AccidentForm.value.nombreDeces;
    this.accident.nombreBlesse = AccidentForm.value.nombreBlesse;
  }


  // Méthode pour ajouter un maintenance
  public ajouterMaintenance(MaintenanceForm: NgForm): void {

    // this.condition = true;
    this.maintenance = new Maintenance();

    if (this.vehicule.numeroSerie == '') {
      // this.condition = false;
      this.sendNotification(NotificationType.ERROR, `Ce vehicule n'existe pas`);
      return;
    }

    this.maintenance.numeroSerie = this.vehicule;
    this.maintenance.dateDebutMaintenance = null;
    this.maintenance.dateFinMaintenance = null;
    this.maintenance.observationMaintenance = MaintenanceForm.value.observationMaintenance;
    this.maintenance.typeMaintenance = MaintenanceForm.value.typeMaintenance;



    switch (this.maintenance.typeMaintenance.toLowerCase()) {
      case 'controle':
        console.log(this.maintenance);
        // this.validerControle(this.maintenance);
        break;
    
      default:
        break;
    }

  }


  public validerControle(maintenance: Maintenance): void {

    this.subscriptions.push(this.maintenanceService.ajouterMaintenance(maintenance).subscribe({
      next: () => {
        this.popupFermer();
        this.sendNotification(NotificationType.SUCCESS, `Ajout réussi de la maintenance`);
      },
      error: (errorResponse: HttpErrorResponse) => {
        // Gérer les erreurs ici
      }
    }));
  }


  myDateStringFormatter(date: MyDate | string | undefined | null): string {
    if (!date) {
      return '';
    }
  
    if (typeof date === 'string') {
      return this.myDateService.formatterMyDateFromString(date);
    } else {
      return this.myDateService.formatterMyDate(date);
    }
  }


}
