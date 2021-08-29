import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../services/character/character.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  userInfo;
  characterList = [];
  loadingCharacters = true;
  errorCharacterLoad = "";
  constructor(private characterService:CharacterService) { }

  ngOnInit(): void {
    this.loadingCharacters = true;
    this.userInfo = JSON.parse(localStorage.getItem("user"));
    this.characterService.getCharacters().subscribe(res=>{
      this.characterList = res;
      this.loadingCharacters = false;
    },error=>{
      console.error("Error>",error);
      this.errorCharacterLoad = error;
      this.loadingCharacters = false;
    });

  }
  createTestCharacter() {
    this.loadingCharacters = true;
    this.characterService.createTestCharacters().subscribe(res=>{
      this.characterList = res;
      this.loadingCharacters = false;
    },error=>{
      console.error("Error>",error);
    });
  }

}
