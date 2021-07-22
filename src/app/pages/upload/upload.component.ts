import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PrescriptionService } from 'src/app/core/service/prescription/prescription.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  uploadForm: FormGroup;
  file_text = 'Upload a photo of your prescription or product';
  constructor(private formBuilder: FormBuilder,
    private pService: PrescriptionService,
    
    private router: Router,
    ) { 
      this.uploadForm = this.formBuilder.group({
        prescriptionImage: [''],
        description: '',
      });
    }

  ngOnInit() {
    this.uploadForm.valueChanges.subscribe(e =>{
      console.log(e)
    })
  }
  onFileSelect(event:any ) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.file_text = file.name;
      this.uploadForm.get('prescriptionImage')?.setValue(file);
    }
  }
  async onSubmit() {
    const formData = new FormData();
    formData.append('prescriptionImage', this.uploadForm.get('prescriptionImage')?.value);
    formData.append('description', this.uploadForm.get('description')?.value);

    this.pService.uploadPrescription(formData).subscribe(
      async (res) =>{
        // await loading.dismiss();
       this.displayAlert('Prescription Uploaded', 'Your order has been received, we will get back to you shortly', true);
      },
      (err) => {
        this.displayAlert('Upload Failed', 'unable to upload to prescription, try again', false);
      }
    );
  }
  get prescriptionImage(){
    return this.uploadForm.get('prescriptionImage')
  }
  async displayAlert(header: string, msg: string, uploaded: boolean){
    console.log(header);
    
    alert('uploaded')
  }
}
