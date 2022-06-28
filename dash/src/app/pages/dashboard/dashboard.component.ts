import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: ActivatedRoute) { }

  public id_funcs: any

  ngOnInit(): void {
    this.router.queryParams.subscribe(query => {
      this.id_funcs = Object.values(query)
    })
  }

}
