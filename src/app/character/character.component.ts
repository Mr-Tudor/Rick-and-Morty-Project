import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})

export class CharacterComponent implements OnInit {
  constructor(private http: HttpClient) {}
  arr: any[] = [];
  allCharacters: any[] = [];
  info: any = {};
  currentPage: number = 1;
  characterName: string = "";
  numCardsToShow: number = 10;

  ngOnInit(): void {
    this.fetchData();
  }

  nextPage() {
    this.currentPage += 1;
    this.characterName = '';
    this.fetchData();
  }
  
  prevPage() {
    this.currentPage -= 1;
    this.characterName = '';
    this.fetchData();
  }
  fetchData() {
    this.http
      .get(`https://rickandmortyapi.com/api/character?page=${this.currentPage}`)
      .subscribe((data: any) => {
        this.arr = data.results.slice(0, this.numCardsToShow);
        this.info = data.info;
        
        this.allCharacters.push(...data.results);



        this.arr.forEach(character => {
          const locationUrl = character.location.url;
          this.http.get(locationUrl).subscribe((locationData: any) => {
            character.dimension = locationData.dimension || "Unknown";
            character.lastKnownLocation = locationData.name;
          });
        });
      });
  }

  filterCharacters() {
    if (this.characterName.trim() === '') {
     
      this.currentPage = 1;
      this.fetchData();
    } else {
      
      this.http
        .get(`https://rickandmortyapi.com/api/character/?name=${this.characterName}`)
        .subscribe((data: any) => {
         
          this.arr = data.results;
  
          
          if (data.info.pages > 1) {
            for (let i = 2; i <= data.info.pages; i++) {
              this.http
                .get(`https://rickandmortyapi.com/api/character/?name=${this.characterName}&page=${i}`)
                .subscribe((additionalData: any) => {
                  this.arr = this.arr.concat(additionalData.results);
                });
            }
          }
  
          
          this.arr.forEach(character => {
            const locationUrl = character.location.url;
            this.http.get(locationUrl).subscribe((locationData: any) => {
              character.dimension = locationData.dimension || "Unknown";
              character.lastKnownLocation = locationData.name;
            });
          });
  
        
          this.info = data.info;
  
        
        });
    }
  }
  
  
}
