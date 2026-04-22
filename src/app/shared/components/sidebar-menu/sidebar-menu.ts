import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'sidebar-menu',
  imports: [RouterLink],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.css',
})
export class SidebarMenu {}
