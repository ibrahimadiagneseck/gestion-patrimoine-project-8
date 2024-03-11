import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyDateService } from 'src/app/services/my-date.service';
import { MyDate } from 'src/app/model/my-date.model';
import { PopupConfirmationSupprimerComponent } from 'src/app/composants/supprimer/popup-confirmation-supprimer/popup-confirmation-supprimer.component';
import { ArticleBonPourService } from 'src/app/services/article-bon-pour.service';
import { ArticleBonEntree } from 'src/app/model/article-bon-entree.model';
import { ArticleBonEntreeService } from 'src/app/services/article-bon-entree.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BonEntree } from 'src/app/model/bon-entree.model';
import { BonEntreeService } from 'src/app/services/bon-entree.service';

@Component({
  selector: 'app-reception-vehicule-liste-detail',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './reception-vehicule-liste-detail.component.html',
  styleUrl: './reception-vehicule-liste-detail.component.css'
})
export class ReceptionVehiculeListeDetailComponent implements OnInit, OnDestroy, AfterViewInit  {

  public bonEntrees: BonEntree[] = [];
  public bonEntree: BonEntree = new BonEntree();

  // public numeroBonEntree: string = '';
  // public dateBonEntree: string = '';
  // public raisonSociale: any = '';
  // public dateBordereauLivraison: string = '';
  // public numeroBordereauLivraison: string = '';
  // public lieuDeLivraison: string = '';

  public numeroSerie: string = '';
  public libelleArticleBonEntree: string = '';
  

  @ViewChild('dataVehicule') data: any;

  ngAfterViewInit() {
    console.log(this.data);
    
    // Vous pouvez maintenant accéder aux propriétés du composant enfant
    if (this.data) {
      // this.numeroBonEntree = this.data.vehicule.codeArticleBonEntree.identifiantBonEntree.numeroBonEntree;
      // this.dateBonEntree = this.data.vehicule.codeArticleBonEntree.identifiantBonEntree.dateBonEntree;
      // this.raisonSociale = this.data.vehicule.codeArticleBonEntree.identifiantBonEntree.identifiantBordereauLivraison.ninea.raisonSociale;
      // this.dateBordereauLivraison = this.data.vehicule.codeArticleBonEntree.identifiantBonEntree.identifiantBordereauLivraison.dateBordereauLivraison;
      // this.numeroBordereauLivraison = this.data.vehicule.codeArticleBonEntree.identifiantBonEntree.identifiantBordereauLivraison.numeroBordereauLivraison;
      // this.lieuDeLivraison = this.data.vehicule.codeArticleBonEntree.identifiantBonEntree.identifiantBordereauLivraison.lieuDeLivraison;

      this.numeroSerie = this.data.vehicule.numeroSerie;
      this.libelleArticleBonEntree = this.data.vehicule.codeArticleBonEntree.libelleArticleBonEntree;

      this.recupererBonEntreeById(this.data.vehicule.codeArticleBonEntree.identifiantBonEntree);

      // Déclencher manuellement la détection des changements si nécessaire
      this.cdr.detectChanges();
    }
  }

  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<ReceptionVehiculeListeDetailComponent>,
    private matDialog: MatDialog,
    private myDateService: MyDateService,
    private bonEntreeService: BonEntreeService,
    private cdr: ChangeDetectorRef // Ajout de ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // console.log(this.vehicule);

    // this.recupererBonEntreeById(this.data.vehicule.codeArticleBonEntree.identifiantBonEntree);

    // this.recupererArticleBonEntreeById(this.data.vehicule.codeArticleBonEntree.codeArticleBonEntree, this.data.vehicule.codeArticleBonEntree.identifiantBonEntree)
  }
  

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


   // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  // public recupererArticleBonEntreeById(codeArticleBonEntree: number, identifiantBonEntree: string): void {

  //   const subscription = this.articleBonEntreeService.recupererArticleBonEntreeById(codeArticleBonEntree, identifiantBonEntree).subscribe({
  //     next: (response: ArticleBonEntree) => {
  //       this.articleBonEntree = response;
  //       // console.log(this.prestataires);
  //     },
  //     error: (errorResponse: HttpErrorResponse) => {
  //       // console.log(errorResponse);
  //     },
  //   });

  //   this.subscriptions.push(subscription);
  // }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------


  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public recupererBonEntreeById(identifiantBonEntree: string): void {

    const subscription = this.bonEntreeService.recupererBonEntreeById(identifiantBonEntree).subscribe({
      next: (response: BonEntree) => {
        this.bonEntree = response;
        // console.log(this.bonEntree);
      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------

  

  supprimerVehiculeById(numeroSerie: String): void {

    const dialogRef = this.matDialog.open(
      PopupConfirmationSupprimerComponent,
      {
        width: '40%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: {
          id: numeroSerie,
          categorie: "vehicule",
          message: "Voulez-vous supprimer ce véhicule?"
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

}
