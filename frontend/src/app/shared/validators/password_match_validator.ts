import { AbstractControl } from "@angular/forms"

export const PasswordsMatchValidator = (passwordControlName: string,
    confirmPasswordControlName: string) => {
        const validator = (form: AbstractControl) => {
            const passwordControl =  form.get(passwordControlName);
            const confirmPasswordControl =  form.get(confirmPasswordControlName);

            if(!passwordControl || !confirmPasswordControl) return;

            if(passwordControl.value !== confirmPasswordControl.value){
                confirmPasswordControl.setErrors({notMatch: true});
            } else {
                //check in errors atribute if any
                const errors = confirmPasswordControl.errors;
                if(!errors) return;
                
                //Do removing additional notMatch in errors atribute if any
                delete errors["notMatch"];
                confirmPasswordControl.setErrors(errors);
            }
        }
        return validator;
    }