import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarMenu } from "../../shared/components/sidebar-menu/sidebar-menu";

@Component({
  selector: 'main-layout',
  imports: [RouterOutlet, SidebarMenu],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}
