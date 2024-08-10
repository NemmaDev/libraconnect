import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../service/profile.service';
import { UserService } from './../service/user.service';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css']
})
export class MonCompteComponent implements OnInit {
  user: any = {};


  constructor(private profileService: ProfileService,private userService:UserService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.error('Error fetching user data', error);
      }
    );
  }

  onSaveChanges(): void {
    this.userService.updateUser(this.user).subscribe(
      response => {
        console.log('User updated successfully', response);
        this.snackBar.open('Les informations de l\'utilisateur ont été mises à jour avec succès', 'Fermer', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      },
      error => {
        console.error('Error updating user', error);
        this.snackBar.open('Erreur lors de la mise à jour des informations de l\'utilisateur', 'Fermer', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    );
  }
}
