import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-links',
  templateUrl: './about-links.component.html',
  styles: []
})
export class AboutLinksComponent implements OnInit {
  public links = [
    {
      href: 'https://academia-binaria.com/',
      caption: 'Tutorial en español'
    },
    {
      href: 'https://github.com/AcademiaBinaria/',
      caption: 'GitHub Repository'
    },
    {
      href: 'https://blog.angular.io/',
      caption: 'Angular blog'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
