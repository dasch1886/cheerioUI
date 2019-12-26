import { Component, OnInit, Input } from '@angular/core';
import { server } from 'src/environments/api-environment';

@Component({
  selector: 'app-mini-recipe',
  templateUrl: './mini-recipe.component.html',
  styleUrls: ['./mini-recipe.component.scss']
})

export class MiniRecipeComponent implements OnInit {

  constructor() { }

  private imgPrefix: string = `${server.address}/public/`;

  @Input() id: string;
  @Input() name: string;
  @Input() desc: string;
  @Input() author: string;
  @Input() imgPath: string;


  ngOnInit() {
  }

  showRecipeDetails() {

  }

}
