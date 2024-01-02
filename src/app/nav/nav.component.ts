import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  template: ` 
  <nav class="navbar  justify-content-between" style="margin-bottom: 60px; margin-left:12px ; margin-right:12px; padding-top:12px">
     <a class="nav-link " style="color:red" href="/list"><h3>EMi Movies</h3></a>
     <div style=" display:flex ;gap:24px">
        <a class="nav-link " style="color:red ;" href="/favorite">Fav Movies</a>
        <a class="nav-link " style="color:red ;" href="/sign-in">Log In</a>
     </div>
    
  </nav>
`,
  styleUrl: './nav.component.css'
})
export class NavComponent {

}
