import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dotation-vehicule-non-dote-ajouter',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './dotation-vehicule-non-dote-ajouter.component.html',
  styleUrl: './dotation-vehicule-non-dote-ajouter.component.css'
})
export class DotationVehiculeNonDoteAjouterComponent  implements OnInit, OnDestroy, AfterViewInit{

  public numeroBE: string = '';
  public dateBonEntree: string = '';
  public raisonSociale: any = '';
  public dateBL: string = '';
  public numeroBL: string = '';
  public lieuDeLivraison: string = '';
  public libelleArticleBonEntree: string = '';



  @ViewChild('dataVehicule') data: any;

  ngAfterViewInit() {
    // Vous pouvez maintenant accéder aux propriétés du composant enfant
    if (this.data) {
      this.numeroBE = this.data.vehicule.identifiantBE.identifiantBE.numeroBE;
      this.dateBonEntree = this.data.vehicule.identifiantBE.identifiantBE.dateBonEntree;
      this.raisonSociale = this.data.vehicule.identifiantBE.identifiantBE.identifiantBL.ninea.raisonSociale;
      this.dateBL = this.data.vehicule.identifiantBE.identifiantBE.identifiantBL.dateBL;
      this.numeroBL = this.data.vehicule.identifiantBE.identifiantBE.identifiantBL.numeroBL;
      this.lieuDeLivraison = this.data.vehicule.identifiantBE.identifiantBE.identifiantBL.lieuDeLivraison;
      // this.numeroSerie = this.data.vehicule.numeroSerie;
      this.libelleArticleBonEntree = this.data.vehicule.identifiantBE.libelleArticleBonEntree;

      // Déclencher manuellement la détection des changements si nécessaire
      this.cdr.detectChanges();
    }
  }

  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<DotationVehiculeNonDoteAjouterComponent>,
    private matDialog: MatDialog,
    private cdr: ChangeDetectorRef // Ajout de ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    // console.log(this.vehicule);

  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  popupFermer(): void {
    this.dialogRef.close();
  }

}
