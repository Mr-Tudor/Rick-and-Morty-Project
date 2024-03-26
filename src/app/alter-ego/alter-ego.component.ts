import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alter-ego',
  templateUrl: './alter-ego.component.html',
  styleUrls: ['./alter-ego.component.css'],
})
export class AlterEgoComponent implements OnInit {
  charName: string[] = [];
  allALtersArr: any = [];
  filteredArr: any = [];
  ngOnInit(): void {
    let charName = this.actRoute.snapshot.params['name'];
    charName = charName.split(' ');
    let charStatus = this.actRoute.snapshot.params['status'];
    for (var nm of charName) {
      this.http
        .get(
          `https://rickandmortyapi.com/api/character/?name=${nm}&status=${charStatus}`
        )
        .subscribe((data: any) => {
          this.allALtersArr = this.allALtersArr.concat(data.results);
          this.removeDuplicates();
        });
    }
  }
  constructor(private actRoute: ActivatedRoute, private http: HttpClient) {}
  removeDuplicates(): void {
    this.filteredArr = this.allALtersArr.filter(
      (value: any, index: number, self: any[]) => {
        return (
          self.findIndex((v) => v.id === value.id) === index
        );
      }
    );
    console.log(this.filteredArr);
  }
}