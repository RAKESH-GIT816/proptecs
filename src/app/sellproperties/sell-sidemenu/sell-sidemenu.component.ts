import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sell-sidemenu',
  templateUrl: './sell-sidemenu.component.html',
  styleUrls: ['./sell-sidemenu.component.scss']
})
export class SellSidemenuComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }
  propertyId:any=0;
  ngOnInit() {
    this.route.paramMap
    .subscribe(param => {
        let id = +param.get('id');
        if (!isNaN(id)) {
            this.propertyId = id;
        }
    });
  }

}
