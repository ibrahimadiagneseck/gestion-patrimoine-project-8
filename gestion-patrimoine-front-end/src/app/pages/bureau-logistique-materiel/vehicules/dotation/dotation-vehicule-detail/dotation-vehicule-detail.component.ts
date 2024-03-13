import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonSortie } from 'src/app/model/bon-sortie.model';
import { UniteDouaniere } from 'src/app/model/unite-douaniere.model';
import { TypeUniteDouaniere } from 'src/app/model/type-unite-douaniere.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BonSortieService } from 'src/app/services/bon-sortie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeUniteDouaniereService } from 'src/app/services/type-unite-douaniere.service';
import { UniteDouaniereService } from 'src/app/services/unite-douaniere.service';
import { SecuriteService } from 'src/app/services/securite.service';
import { MyDateService } from 'src/app/services/my-date.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MyDate } from 'src/app/model/my-date.model';
import { ArticleBonPourService } from 'src/app/services/article-bon-pour.service';
import { ArticleBonPour } from 'src/app/model/article-bon-pour.model';
import { ArticleBonSortie } from 'src/app/model/article-bon-sortie.model';
import { BonPour } from 'src/app/model/bon-pour.model';
import { NgForm } from '@angular/forms';
import { Agent } from 'src/app/model/agent.model';
import { AgentService } from 'src/app/services/agent.service';
import { DotationVehicule } from 'src/app/model/dotation-vehicule.model';
import { DotationVehiculeService } from 'src/app/services/dotation-vehicule.service';
import { DotationVehiculeVehiculeAjouterComponent } from '../dotation-vehicule-vehicule-ajouter/dotation-vehicule-vehicule-ajouter.component';
import { SecteurActivite } from 'src/app/model/secteur-activite.model';
import { Prestataires } from 'src/app/model/prestataires.model';
import { SecteurActiviteService } from 'src/app/services/secteur-activite.service';
import { Vehicule } from 'src/app/model/vehicule.model';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { BonPourService } from 'src/app/services/bon-pour.service';
import { TypeObjet } from 'src/app/model/type-objet.model';
import { DotationVehiculeAjouterComponent } from '../dotation-vehicule-ajouter/dotation-vehicule-ajouter.component';

@Component({
  selector: 'app-dotation-vehicule-detail',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './dotation-vehicule-detail.component.html',
  styleUrl: './dotation-vehicule-detail.component.css'
})
export class DotationVehiculeDetailComponent implements OnInit, OnDestroy {



  rowNumber!: number;
  rowQuantiteAccorde!: number;




  public bonSorties: BonSortie[] = [];
  public bonSortie: BonSortie = new BonSortie();

  public articleBonPours: ArticleBonPour[] = [];
  public articleBonPour: ArticleBonPour = new ArticleBonPour();

  public typeObjets: TypeObjet[] = [];
  public typeObjet: TypeObjet = new TypeObjet();

  public dotationVehicules: DotationVehicule[] = [];
  public dotationVehicule: DotationVehicule = new DotationVehicule();

  public bonPours: BonPour[] = [];
  public bonPour: BonPour = new BonPour();

  public uniteDouanieres: UniteDouaniere[] = [];
  public uniteDouaniere: UniteDouaniere | undefined;

  public typeUniteDouanieres: TypeUniteDouaniere[] = [];
  public typeUniteDouaniere: TypeUniteDouaniere | undefined;

  public agents: Agent[] = [];
  public agent: Agent = new Agent();

  public vehiculesSelect: Vehicule[] = [];

  public vehicules: Vehicule[] = [];
  public vehicule: Vehicule = new Vehicule();


  private subscriptions: Subscription[] = [];


  /* ----------------------------------------------------------------------------------------- */
  // tableau
  // columnsToCodeMarque: string[] = [
  //   "codeMarque"
  // ];
  // columnsToCodePays: string[] = [
  //   "codePays"
  // ];
  columnsDateFormat: string[] = [

  ];
  columnsToHide: string[] = [
  ];
  dataSource = new MatTableDataSource<ArticleBonPour>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "rowNumber",
    // "codeArticleBonPour",
    "libelleArticleBonPour",
    "quantiteDemandee",
    "rowQuantiteAccorde",
    "rowCodeTypeObjet"


  ];
  displayedColumnsCustom: string[] = [
    "N°",
    // "Code article",
    "Libellé article",
    "Quantité Demandée",
    "Quantité Accordée",
    "Type objet"


  ];
  /* ----------------------------------------------------------------------------------------- */


  constructor(
    private articleBonPourService: ArticleBonPourService,
    private bonPourService: BonPourService,
    private bonSortieService: BonSortieService,
    private vehiculeService: VehiculeService,
    private dotationVehiculeService: DotationVehiculeService,
    private agentService: AgentService,
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private typeUniteDouaniereService: TypeUniteDouaniereService,
    private uniteDouaniereService: UniteDouaniereService,
    private securiteService: SecuriteService,
    private myDateService: MyDateService
  ) { }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  ngOnInit(): void {

    // this.listeArticles();
    // this.listeBonDeSorties();
     this.listeAgents();
    // this.listeDotations();
     this.listeVehicules();
    // --------------------------------------------------------------------------------
    const id = this.route.snapshot.paramMap.get('identifiantBonPour') ?? '';
    // const codeArticleBonPour = this.route.snapshot.paramMap.get('codeArticleBonPour') ?? '';
    console.log(id);

    const decrypt = this.securiteService.decryptUsingAES256(id);
    // const decrypt2 = this.securiteService.decryptUsingAES256(codeArticleBonPour);


     // --------------------------------------------------------------------------------
    //  const identifiantBP = this.route.snapshot.paramMap.get('identifiantBP') ?? '';
    //  const decrypt = this.securiteService.decryptUsingAES256(identifiantBP);



    console.log(decrypt);



    if (decrypt) {

      this.subscriptions.push(this.bonPourService.recupererBonPourById(decrypt).subscribe({
        next: (response: BonPour) => {
          this.bonPour = response;
          console.log(this.bonPour);

          this.listeBonDeSorties();
          this.listeArticleBonPours();
        },
        error: (errorResponse: HttpErrorResponse) => {

        }
      }));
    }


    // if (decrypt) {

    //   this.subscriptions.push(this.bonPourService.recupererBonPourById(decrypt).subscribe({
    //     next: (response: BonPour) => {
    //       this.bonPour = response;
    //       console.log(this.bonPour);

    //       this.listeBonDeSorties();
    //     },
    //     error: (errorResponse: HttpErrorResponse) => {

    //     }
    //   }));
    // }
    // --------------------------------------------------------------------------------
  }


  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeBonDeSorties(): void {

    const subscription = this.bonSortieService.listeBonSorties().subscribe({
      next: (response: BonSortie[]) => {
        this.bonSorties = response;
        // this.bonDeSortie = this.filtreBonPourArticleBonSortie(this.articleBonPour.identifiantBP, this.bonDeSorties);
        this.bonSortie = this.AfficherFormBonSortie(this.bonPour, this.bonSorties);
        console.log(this.bonSortie);
        console.log(this.bonPour);


      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }

  public listeArticleBonPours(): void {

    const subscription = this.articleBonPourService.listeArticleBonPours().subscribe({
      next: (response: ArticleBonPour[]) => {
        //this.articleBonPours = response;

        this.articleBonPours=  this.filtreArticleBonPourByTypeObjet(response)
         console.log(this.articleBonPours);

        // this.articleBonPours = response.sort((a, b) => Number(a.quantiteDemandee) - Number(b.quantiteDemandee));

        if (this.bonPour) {



           this.filtreArticleBonPourByBonPour(this.articleBonPours, this.bonPour);




        } else {
          console.error('articleBonPours is undefined');
        }

        // if (this.typeObjet) {
        //   this.filtreArticleBonPourByTypeObjet(this.articleBonPours);
        // } else {
        //   console.error('articleBonPours is undefined');
        // }


      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }

  filtreArticleBonPourByBonPour(articleBonPours: ArticleBonPour[], bonPour: BonPour): void {

    articleBonPours = articleBonPours.filter((articleBonPour: ArticleBonPour) => {
      return articleBonPour.identifiantBonPour && bonPour.identifiantBonPour && articleBonPour.identifiantBonPour === bonPour.identifiantBonPour;
    }).sort((a, b) => Number(a.quantiteDemandee) - Number(b.quantiteDemandee));

    this.rowNumber = 1;
    this.rowQuantiteAccorde= 0;

    // this.dataSource = new MatTableDataSource<IVehicule>(this.vehicules);
    this.dataSource = new MatTableDataSource<ArticleBonPour>(articleBonPours.map((item) => ({
      ...item,
      rowCodeTypeObjet: item.codeTypeObjet.libelleTypeObjet,
      rowNumber: this.rowNumber++,
      rowQuantiteAccorde: this.rowQuantiteAccorde,
    })));


    // console.log(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }


  // filtreArticleBonPourByTypeObjet( articleBonPours: ArticleBonPour[]): string {
  //   let nomTypeObjet = "VEHICULES ET MATERIELS ROULANTS";

  //   for (const articleBonPour of articleBonPours) {
  //     // Comparer les bonEntree ici (assurez-vous d'implémenter une méthode de comparaison dans la classe BonEntree)
  //     if ( articleBonPour.codeTypeObjet.libelleTypeObjet === nomTypeObjet ) {
  //       nombreArticleBonEntree++;
  //     }
  //   }

  //   return nombreArticleBonEntree;
  // }


  filtreArticleBonPourByTypeObjet(articleBonPours: ArticleBonPour[]):ArticleBonPour[] {
    let nomTypeObjet = "VEHICULES ET MATERIELS ROULANTS";
    let articlesFiltres = [];



    for (const articleBonPour of articleBonPours) {

      console.log(articleBonPour.codeTypeObjet.libelleTypeObjet);
        if (articleBonPour.codeTypeObjet.libelleTypeObjet === nomTypeObjet) {

            articlesFiltres.push(articleBonPour);
        }
    }

    return articlesFiltres;
}




  public listeVehicules(): void {

    const subscription = this.vehiculeService.listeVehicules().subscribe({
      next: (response: Vehicule[]) => {
        this.vehicules = response;
        // console.log(this.secteurActivites);

      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }


  public listeAgents(): void {

    const subscription = this.agentService.listeAgents().subscribe({
      next: (response: Agent[]) => {
        this.agents = response;
        // console.log(this.agents);

      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }

  AfficherFormBonSortie(bonPour: BonPour, bonSorties: BonSortie[]): BonSortie {


    for (const bonSortie of bonSorties) {
      // Comparer les bonEntree ici (assurez-vous d'implémenter une méthode de comparaison dans la classe BonEntree)
      if (bonPour && bonSortie.identifiantBonPour && JSON.stringify(bonPour) === JSON.stringify(bonSortie.identifiantBonPour)) {

       return bonSortie;
      }

    }


    return new BonSortie();
  }


  // filtreBonPourArticleBonSortie(bonPour: BonPour, bonDeSorties: BonDeSortie[]): BonDeSortie {
  //   return bonDeSorties.find(bonDeSortie =>
  //       Array.isArray(bonDeSortie.identifiantBP) && bonDeSortie.identifiantBP.some(bp => bp === bonPour)
  //   ) ?? new BonDeSortie();
  // }



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

  // popupAjouterBonSortie(): void {
  //   const dialogRef = this.matDialog.open(
  //     DotationVehiculeAjouterBonSortieComponent,
  //     {
  //       width: '80%',
  //       enterAnimationDuration: '100ms',
  //       exitAnimationDuration: '100ms'
  //     }
  //   );

  //   dialogRef.afterClosed().subscribe(() => {
  //     this.ngOnInit();
  //   });
  // }



  goToDetail(bonSortie: BonSortie): void {
    const id = bonSortie.identifiantBonSortie;
    console.log(id);

    const encrypt = this.securiteService.encryptUsingAES256(id);
    this.router.navigate(['/dotation-vehicule-detail-bon-sortie-detail', encrypt]);
  }

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

  // pour envoyer tous les formulaires
  public submitForm(): void {


    this.submitBonSortieForm();
    // this.submitBonEntreeForm();

    // this.popupFermer();
    // this.router.navigate(['/ajouter-article']);
  }

  // pour executer ajouterBordereauLivraison
  public submitBonSortieForm(): void {
    this.clickButton('bon-sortie-form')
  }


  public ajouterBonSortie(BonSortieForm: NgForm): void {

    // -------------------------------------------------------------------------- METHODE 1
    // const formData = this.bordereauLivraisonService.createBordereauLivraisonFormData(BordereauLivraisonForm.value);

    // this.subscriptions.push(this.bordereauLivraisonService.ajouterBordereauLivraisonRequestParam(formData).subscribe({
    //     next: (response: BordereauLivraison) => {
    //       console.log(response);

    //     },
    //     error: (errorResponse: HttpErrorResponse) => {

    //     }
    //   })
    // );

    // -------------------------------------------------------------------------- METHODE 2
    // const dateBS: MyDate = BordereauLivraisonForm.value.dateBS;
    // const formattedDate = this.bordereauLivraisonService.formatterMyDate(dateBL);

    // const bordereauLivraisonForm1: NgForm = BordereauLivraisonForm;
    // BordereauLivraisonForm.control.get('dateBL')?.patchValue(formattedDate);
    // BordereauLivraisonForm.control.get('dateBL')?.setValue(formattedDate);


    // if (formattedDate) {
    //   BordereauLivraisonForm.value.dateBL = formattedDate;
    // }




    //  AGENT
    BonSortieForm.value.numeroBonSortie = 'BS005';
    BonSortieForm.value.matriculeAgent = this.agents[0];
    BonSortieForm.value.identifiantBonPour = this.bonPour.identifiantBonPour;

    // CONFORMITE BORDEREAU LIVRAISON
    // BordereauLivraisonForm.value.conformiteBL = 'oui';

     console.log(BonSortieForm.value);


    this.subscriptions.push(this.bonSortieService.ajouterBonSortie(BonSortieForm.value).subscribe({
        next: (response: BonSortie) => {
          this.bonSortie = response;
          console.log(this.bonSortie);

        },
        error: (errorResponse: HttpErrorResponse) => {

        }
      })
    );

  }


  // public listeDotations(): void {

  //   const subscription = this.dotationVehiculeService.listeDotationVehicules().subscribe({
  //     next: (response: DotationVehicule[]) => {

  //       this.dotationVehicules = response;

  //       // console.log(response);


  //       // this.vehicules = response.sort((a, b) => parseInt(a.numeroImmatriculation) - parseInt(b.numeroImmatriculation));
  //       // this.vehicules = response.sort((a, b) => Number(a.numeroImmatriculation) - Number(b.numeroImmatriculation));
  //       // this.vehicules = response.sort((a, b) => a.numeroImmatriculation.localeCompare(b.numeroImmatriculation));
  //       // this.vehicules = response.sort((a, b) => a.numeroChassis - b.numeroChassis);
  //       // this.vehicules = response.sort((a, b) => new Date(b.dateModification).getTime() - new Date(a.dateModification).getTime());

  //       // this.rowNumber = 1;

  //       // this.dataSource = new MatTableDataSource<IVehicule>(this.vehicules);
  //       this.dataSource = new MatTableDataSource<DotationVehicule>(this.dotationVehicules.map((item) => ({
  //         ...item,

  //         rowQuantiteAccordee: item.identifiantBS.quantiteAccordee,
  //         // rowQuantiteDemandee: item.identifiantBS.identifiantBS.


  //         // vehicule: [] as Vehicule[],
  //         // rowMarque: item.codeMarque.libelleMarque,
  //         // rowPays: item.codePays.libellePays,
  //         // rowEtat: item.codeEtat.libelleEtat,
  //         // rowTypeEnergie: item.codeTypeEnergie.libelleTypeEnergie,
  //         // rowTypeVehicule: item.codeTypeVehicule.libelleTypeVehicule,
  //         // rowLibelleArticleBonEntree: item.identifiantBE.libelleArticleBonEntree,
  //         // rowNumber: this.rowNumber++,
  //       })));


  //       // console.log(this.dataSource.data);
  //       this.dataSource.paginator = this.paginator;
  //     },
  //     error: (errorResponse: HttpErrorResponse) => {
  //       // console.log(errorResponse);
  //     },
  //   });

  //   this.subscriptions.push(subscription);
  // }


  popupAjouter(vehicules: Vehicule[], bonSortie: BonSortie, vehiculesSelect?: Vehicule[]): void {
    const dialogRef = this.matDialog.open(
      DotationVehiculeVehiculeAjouterComponent,
      {
        width: '80%',
        height: 'auto',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',

        data:  {
          vehicules: vehicules,
          bonDeSortie: bonSortie,
          vehiculesSelected: vehiculesSelect
        }
      }

    );

    dialogRef.afterClosed().subscribe(() => {
      // ----------------------------------
      // Accéder à this.secteurActivitesForm après la fermeture du popup
      // if (dialogRef.componentInstance instanceof DotationVehiculeVehiculeAjouterComponent) {
      //   this.vehiculesSelect = dialogRef.componentInstance.vehiculesSelect;
      //   // console.log(this.secteurActivitesSelect);
      // }
      // ----------------------------------
      this.ngOnInit();
    });
  }


  popupAjouterDotationVehicule( articleBonPour: ArticleBonPour): void {
    const dialogRef = this.matDialog.open(
      DotationVehiculeAjouterComponent,
      {
        width: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: articleBonPour

      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }





}
