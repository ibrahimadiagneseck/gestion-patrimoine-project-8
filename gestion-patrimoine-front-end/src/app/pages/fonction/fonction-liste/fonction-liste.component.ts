import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { Authorities } from 'src/app/model/authorities.model';
import { Fonction } from 'src/app/model/fonction.model';
import { SecuriteService } from 'src/app/services/securite.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { FonctionDetailComponent } from '../fonction-detail/fonction-detail.component';
import { FonctionAjouterComponent } from '../fonction-ajouter/fonction-ajouter.component';
import { FonctionService } from 'src/app/services/fonction.service';

@Component({
  selector: 'app-fonction-liste',
  // standalone: true,
  // imports: [],
  templateUrl: './fonction-liste.component.html',
  styleUrl: './fonction-liste.component.css'
})
export class FonctionListeComponent {


  public fonctions: Fonction[] = [];
  public fonction: Fonction  | undefined;



  private subscriptions: Subscription[] = [];


 /* ----------------------------------------------------------------------------------------- */
 focusOnInput: boolean = false;

 @ViewChild('monDiv', { static: true }) monDiv: ElementRef | undefined;

 divClique(): void {
   // Code à exécuter lorsque l'élément <div> est cliqué
   // Par exemple, vous pouvez modifier une variable ou déclencher une action
   // console.log('L\'élément <div> a été cliqué !');
   this.focusOnInput = true;
 }

 @HostListener('document:click', ['$event'])
 onDocumentClick(event: Event): void {
   // Vérifie si le clic a eu lieu en dehors de l'élément monDiv
   if (!this.monDiv?.nativeElement.contains(event.target)) {
     // Code à exécuter lorsque le clic est en dehors de monDiv
     // console.log('Clic en dehors de monDiv détecté.');
     this.focusOnInput = false;
   }
 }
 /* ----------------------------------------------------------------------------------------- */


 /* ----------------------------------------------------------------------------------------- */
 @ViewChild('myInputSearch') myInputSearch!: ElementRef;
 // rechercher
 searchTerms = new Subject<string>();
 fonctions$: Observable<Fonction[]> = of();
 // recherche custom
 searchTermsFilterDoubleCodeFonctionLibelleFonction = new Subject<string>();
 termeRechercheCodeFonctionLibelleFonction: string = "";
 fonctionFilterDoubleCodeFonctionLibelleFonction$: Observable<Fonction[]> = of();
 /* ----------------------------------------------------------------------------------------- */


 /* ----------------------------------------------------------------------------------------- */
 // tableau
 columnsDateFormat: string[] = [

 ];
 columnsToHide: string[] = [
   // "nombreArme",
   // "nombreMateriel"

 ];
 dataSource = new MatTableDataSource<Fonction>();
 @ViewChild(MatPaginator) paginator!: MatPaginator;
 displayedColumns: string[] = [
   "codeFonction",
   "libelleFonction"

 ];
 displayedColumnsCustom: string[] = [
   "Code",
   "libellé fonction"

 ];
 /* ----------------------------------------------------------------------------------------- */

 constructor(
   private router: Router,
   private securiteService: SecuriteService,
   private fonctionService: FonctionService,
   private matDialog: MatDialog,
 ) { }

 ngOnDestroy(): void {
   this.subscriptions.forEach(sub => sub.unsubscribe());
 }

 ngOnInit(): void {
   // this.listeVehicules();
   this.listeFonctions();
   // this.listeBonEntrees();

   /* ----------------------------------------------------------------------------------------- */
   // rechercher
   this.fonctions$ = this.searchTerms.pipe(
     // {...."ab"..."abz"."ab"...."abc"......}
     debounceTime(300),
     // {......"ab"...."ab"...."abc"......}
     distinctUntilChanged(),
     // {......"ab"..........."abc"......}
     switchMap((term) => this.fonctionService.searchFonctionList(term, this.fonctions))
     // {.....List(ab)............List(abc)......}
   );
   this.fonctionFilterDoubleCodeFonctionLibelleFonction$ = this.searchTermsFilterDoubleCodeFonctionLibelleFonction.pipe(
     // {...."ab"..."abz"."ab"...."abc"......}
     debounceTime(300),
     // {......"ab"...."ab"...."abc"......}
     distinctUntilChanged(),
     // {......"ab"..........."abc"......}
     switchMap((term) => this.fonctionService.searchFonctionListFilterDouble(term, this.fonctions))
     // {.....List(ab)............List(abc)......}
   );
   /* ----------------------------------------------------------------------------------------- */
 }


 // generatePDF(): void {

 //   const data: BonEntree[] = this.dataSource.filteredData;
 //   // console.log(data);


 //   const months = ['JANV.', 'FÉVR.', 'MARS', 'AVR.', 'MAI', 'JUIN', 'JUIL.', 'AOÛT', 'SEPT.', 'OCT.', 'NOV.', 'DÉC.'];

 //   const doc = new jsPDF();

 //   // Créez un tableau de données pour autoTable
 //   const tableData = data.map((item: BonEntree) => [
 //     item.numeroBE,
 //     item.libelleBonEntree,
 //     `${new Date(item.dateBonEntree.toString()).getDate()} ${months[new Date(item.dateBonEntree.toString()).getMonth()]} ${new Date(item.dateBonEntree.toString()).getFullYear() % 100}`,
 //     item.observationBonEntree,
 //     item.rowNombreArticleBonEntree
 //   ]);

 //   // Configuration pour le PDF avec une taille de page personnalisée

 //   const marginLeft = 10;
 //   const marginTop = 10;
 //   const marginRight = 10;
 //   const marginBottom = 10;

 //   // Générer le tableau dans le PDF avec des styles de texte personnalisés
 //   autoTable(doc, {
 //     head: [
 //       [
 //         { content: 'N° bon d\'entrée', styles: { fontSize: 6 } },
 //         { content: 'Libelle bon d\'entrée', styles: { fontSize: 6 } },
 //         { content: 'Date bon d\'entrée', styles: { fontSize: 6 } },
 //         { content: 'Observation bon d\'entrée', styles: { fontSize: 6 } },
 //         { content: 'Articles', styles: { fontSize: 6 } }
 //       ]
 //     ],
 //     body: tableData.map(row => row.map(cell => ({ content: cell.toString(), styles: { fontSize: 6 } }))),
 //     margin: { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft },
 //     theme: 'plain'
 //   });

 //   doc.save('bon-entree-liste.pdf');
 // }


 search(term: string): void {
   this.termeRechercheCodeFonctionLibelleFonction = term;
   this.searchTerms.next(term);
   this.searchTermsFilterDoubleCodeFonctionLibelleFonction.next(term);
 }

 applyFilter(event: Event): void {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
 }


 FilterDoubleCodeFonctionLibelleFonction(termeRechercheCodeFonctionLibelleFonction: string) {
   this.termeRechercheCodeFonctionLibelleFonction = termeRechercheCodeFonctionLibelleFonction;
   this.myInputSearch.nativeElement.value = termeRechercheCodeFonctionLibelleFonction;
   this.dataSource.filter = termeRechercheCodeFonctionLibelleFonction.trim().toLowerCase(); // supprimer les espaces vide et mettre minuscule
   this.focusOnInput = false;
 }


 isNumber(termeRechercheCodeFonctionLibelleFonction: string): boolean {
   return !isNaN(Number(termeRechercheCodeFonctionLibelleFonction))
 }

 // ---------------------------------------------------------------------------------------------------------------------
 // ---------------------------------------------------------------------------------------------------------------------
 // public listeVehicules(): void {

 //   const subscription = this.vehiculeService.listeVehicules().subscribe({
 //     next: (response: Vehicule[]) => {

 //       this.vehicules = response;
 //       // this.vehicules = response.sort((a, b) => parseInt(a.numeroImmatriculation) - parseInt(b.numeroImmatriculation));
 //       // this.vehicules = response.sort((a, b) => Number(a.numeroImmatriculation) - Number(b.numeroImmatriculation));
 //       // this.vehicules = response.sort((a, b) => a.numeroImmatriculation.localeCompare(b.numeroImmatriculation));
 //       // this.vehicules = response.sort((a, b) => a.numeroChassis - b.numeroChassis);
 //       // this.vehicules = response.sort((a, b) => new Date(b.dateModification).getTime() - new Date(a.dateModification).getTime());

 //       // recuperer la liste des bon entrees qui se trouvent dans la liste de vehicules
 //       this.filtreBonEntreeVehicule(this.vehicules, this.articleBonEntrees);

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

 // ---------------------------------------------------------------------------------------------------------------------
 // ---------------------------------------------------------------------------------------------------------------------



 // ---------------------------------------------------------------------------------------------------------------------
 // ---------------------------------------------------------------------------------------------------------------------




 // public listeUniteDouanieres(): void {

 //   const subscription = this.uniteDouaniereService.listeUniteDouanieres().subscribe({
 //     next: (response: UniteDouaniere[]) => {
 //       this.uniteDouanieres = response;

 //       this.dataSource = new MatTableDataSource<UniteDouaniere>(this.uniteDouanieres.map((item) => ({
 //         ...item,
 //         rowTypeUniteDouaniere: item.codeTypeUniteDouaniere.libelleTypeUniteDouaniere

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

 public listeFonctions(): void {

   const subscription = this.fonctionService.listeFonctions().subscribe({
     next: (response: Fonction[]) => {
       this.fonctions = response;

       this.dataSource = new MatTableDataSource<Fonction>(this.fonctions.map((item) => ({
         ...item,


       })));

       // console.log(this.dataSource.data);
       this.dataSource.paginator = this.paginator;
     },
     error: (errorResponse: HttpErrorResponse) => {
       // console.log(errorResponse);
     },
   });

   this.subscriptions.push(subscription);
 }
 // ---------------------------------------------------------------------------------------------------------------------
 // ---------------------------------------------------------------------------------------------------------------------


 popupAjouterFonction(): void {
   const dialogRef = this.matDialog.open(
    FonctionAjouterComponent,
     {
       width: '80%',
       enterAnimationDuration: '100ms',
       exitAnimationDuration: '100ms'
     }
   );

   dialogRef.afterClosed().subscribe(() => {
     this.ngOnInit();
   });
 }


 goToDetail(fonction: Fonction): void {
   const dialogRef = this.matDialog.open(
    FonctionDetailComponent,
     {
       width: '80%',
       enterAnimationDuration: '100ms',
       exitAnimationDuration: '100ms',
       data: fonction
     }
   );

   dialogRef.afterClosed().subscribe(() => {
     this.ngOnInit();
   });
 }









 // filtreBonEntreeVehicule(vehicules: Vehicule[], articleBonEntrees: ArticleBonEntree[]): void {


 //   const listeBonEntree: BonEntree[] = vehicules.map((vehicule: Vehicule) => vehicule.identifiantBE.identifiantBE);
 //   // Supprimer les doublons en se basant sur la propriété identifiantBE
 //   // const listeBonEntreeUnique: BonEntree[] = listeBonEntree.filter(
 //   //   (value, index, self) =>
 //   //     self.findIndex((item) => item.identifiantBE === value.identifiantBE) === index
 //   // );

 //   const listeBonEntreeUnique: BonEntree[] = listeBonEntree.filter(
 //     (elementActuel, indexActuel, tableauOriginal) =>
 //       tableauOriginal.findIndex((elementPrecedent) => elementPrecedent.identifiantBE === elementActuel.identifiantBE) === indexActuel
 //   );


 //   this.dataSource = new MatTableDataSource<BonEntree>(listeBonEntreeUnique.map((item) => ({
 //     ...item,
 //     rowNombreArticleBonEntree: this.nombreArticleBonEntree(item, articleBonEntrees)
 //   })).sort((a, b) => a.rowNombreArticleBonEntree - b.rowNombreArticleBonEntree));

 //   // console.log(this.dataSource.data);
 //   this.dataSource.paginator = this.paginator;
 // }

}
