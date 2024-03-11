import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Utilisateur } from 'src/app/model/utilisateur.model';
import { Authorities } from 'src/app/model/authorities.model';
import { AuthorityService } from 'src/app/services/authority.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { PopupConfirmationSupprimerComponent } from 'src/app/composants/supprimer/popup-confirmation-supprimer/popup-confirmation-supprimer.component';
import { MyDate } from 'src/app/model/my-date.model';
import { MyDateService } from 'src/app/services/my-date.service';
import { Fonction } from 'src/app/model/fonction.model';
import { FonctionService } from 'src/app/services/fonction.service';

@Component({
  selector: 'app-utilisateur-detail',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './utilisateur-detail.component.html',
  styleUrl: './utilisateur-detail.component.css'
})
export class UtilisateurDetailComponent implements OnInit, OnDestroy  {

  afficherPopupDetail: boolean = true;


  public fonctions: Fonction[] = [];
  public fonction: Fonction = new Fonction();

  public authorities: Authorities[] = [];
  public authority: Authorities = new Authorities();
  

  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<UtilisateurDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public utilisateur: Utilisateur,
    private matDialog: MatDialog,
    private fonctionService: FonctionService,
    private utilisateurService: UtilisateurService,
    private authorityService: AuthorityService,
    private notificationService: NotificationService,
    private myDateService: MyDateService
  ) {}

  private sendNotification(type: NotificationType, message: string, titre?: string): void {
    if (message) {
      this.notificationService.showAlert(type, message, titre);
    } else {
      this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
    }
  }

  ngOnInit(): void {
    this.listeFonctions();
    this.listeAuthorities();
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



  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  supprimerUtilisateurById(matriculeAgent: String): void {

    const dialogRef = this.matDialog.open(
      PopupConfirmationSupprimerComponent,
      {
        width: '40%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: {
          id: matriculeAgent,
          categorie: "utilisateur",
          message: "Voulez-vous supprimer cet utilisateur?"
        }
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.popupFermer();
    });
  }

  popupFermer(): void {
    this.dialogRef.close();
  }

  myDateStringFormatter(date: MyDate | string | undefined): string {
    if (!date) {
      return '';
    }
  
    if (typeof date === 'string') {
      return this.myDateService.formatterMyDateFromString(date);
    } else {
      return this.myDateService.formatterMyDate(date);
    }
  }

  popupModifier(): void {
    this.afficherPopupDetail = false;
  }

  PopupDetail(): void {
    this.afficherPopupDetail = true;
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

  // pour executer modifierUtilisateur
  public submitBonEntreeForm(): void {
    this.clickButton('utilisateur-form');
  }


  public modifierUtilisateur(UtilisateurForm: NgForm): void {

    // console.log(UtilisateurForm.value);

    UtilisateurForm.value.codeFonction = this.fonctions.find(fonction => fonction.libelleFonction === UtilisateurForm.value.codeFonction) ?? new Fonction();
    UtilisateurForm.value.authorities = [this.authorities.find(authority => authority.nameAuthority === UtilisateurForm.value.authorities) ?? new Authorities()];
    UtilisateurForm.value.userName = this.utilisateur.userName;
    UtilisateurForm.value.matriculeAgent = this.utilisateur.matriculeAgent;

    UtilisateurForm.value.active = !UtilisateurForm.value.active;
    UtilisateurForm.value.notLocked = !UtilisateurForm.value.notLocked;

    UtilisateurForm.value.joinDate = this.utilisateur.joinDate;
    UtilisateurForm.value.lastLoginDate = this.utilisateur.lastLoginDate;
    UtilisateurForm.value.lastLoginDateDisplay = this.utilisateur.lastLoginDateDisplay;

    UtilisateurForm.value.utilisateurID = this.utilisateur.utilisateurID;

    console.log(UtilisateurForm.value);
  
    this.subscriptions.push(this.utilisateurService.modifierUser(UtilisateurForm.value).subscribe({
        next: (response: Utilisateur) => {
          console.log(response);
          this.popupFermer();
          this.sendNotification(NotificationType.SUCCESS, `Modification réussie de l'utilisateur`);
        },
        error: (errorResponse: HttpErrorResponse) => {

        }
      })
    );

  }

}
