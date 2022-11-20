import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class LoginPageForm {

    private _formBuilder: FormBuilder;

    constructor(formBuilder: FormBuilder) {
        this._formBuilder = formBuilder;
    }

    createForm(): FormGroup {
        return this._formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', [Validators.required]]
        });
    }
}