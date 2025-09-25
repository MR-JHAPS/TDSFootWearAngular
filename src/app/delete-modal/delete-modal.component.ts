import { Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {

  public dialogRef = inject(MatDialogRef<DeleteModalComponent>);
  readonly data = inject(MAT_DIALOG_DATA) as {clientId : number};

  _dialog = inject(MatDialog);
  openDeleteModal : boolean = false;
  clientId !:number;

  

  onDelete() : void{
     this.dialogRef.close(true);  // send confirmation back
  }


  onCancel():void{
     this.dialogRef.close(false); // send cancel back
  }




}
