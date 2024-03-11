import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VehiculeAjouterDotationComponent } from 'src/app/composants/vehicule/vehicule-ajouter-dotation/vehicule-ajouter-dotation.component';
import { ArticleBonPour } from 'src/app/model/article-bon-pour.model';
import { ArticleBonSortie } from 'src/app/model/article-bon-sortie.model';
import { BonSortie } from 'src/app/model/bon-sortie.model';
import { Prestataires } from 'src/app/model/prestataires.model';

@Component({
  selector: 'app-dotation-vehicule-ajouter',
  // standalone: true,
  // imports: [],
  templateUrl: './dotation-vehicule-ajouter.component.html',
  styleUrl: './dotation-vehicule-ajouter.component.css'
})
export class DotationVehiculeAjouterComponent {

  public articleBonSorties: ArticleBonSortie[] = [];
  public articleBonSortie: ArticleBonSortie = new ArticleBonSortie();

  public articleBonPours: ArticleBonPour[] = [];
  // public articleBonPour: ArticleBonPour = new ArticleBonPour();


  constructor(
    public dialogRef: MatDialogRef<DotationVehiculeAjouterComponent>,
    @Inject(MAT_DIALOG_DATA) public  articleBonPour: ArticleBonPour,
    private matDialog: MatDialog,
    // @Inject(MAT_DIALOG_DATA) public section: Sections,
    // private matDialog: MatDialog,
    // private sectionsService: SectionsService,
    // private notificationService: NotificationService,

  ) {}

  ngOnInit(): void {
    // this.listeSecteurActivites();

  }

  popupFermer(): void {
    this.dialogRef.close();

  }

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

  // pour envoyer tous les formulaires
  public submitForm(): void {
    // console.log("gfhhh");

    this.clickButton('article-bon-sortie-form');
  }


  // --------------------------------------------------------------------------
  // pour executer ajouterPrestataire
  // public submitBonEntreeForm(): void {
  //   this.clickButton('article-bon-sortie-form')
  // }

  public ajouterArticleBonSortie(ArticleBonSortieForm: NgForm): void {

    this.articleBonSortie.quantiteAccordee= ArticleBonSortieForm.value.quantiteAccordee;
    console.log(this.articleBonPour,this.articleBonSortie);


    this.popupVehicule( this.articleBonPour, this.articleBonSortie);


  }

  popupVehicule( articleBonPour: ArticleBonPour, articleBonSortie: ArticleBonSortie): void {
    const dialogRef = this.matDialog.open(
      VehiculeAjouterDotationComponent,
      {
        width: '80%',
        // height: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data:  {
          articleBonPour: articleBonPour,
          articleBonSortie: articleBonSortie

        }
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      // ----------------------------------
      // Accéder à this.secteurActivitesForm après la fermeture du popup
     // if (dialogRef.componentInstance instanceof PopupSecteurActiviteComponent) {
       // this.secteurActivitesSelect = dialogRef.componentInstance.secteurActivitesSelect;
        // console.log(this.secteurActivitesSelect);
     // }
      // ----------------------------------
      this.ngOnInit();
    });
  }




}
