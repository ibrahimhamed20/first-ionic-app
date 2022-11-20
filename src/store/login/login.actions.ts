import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user";

export const RECOVER_PASSWORD = createAction("[Recover password]", props<{ email: string }>());
export const RECOVER_PASSWORD_SUCCESS = createAction("[Recover password] success");
export const RECOVER_PASSWORD_FAIL = createAction("[Recover password] fail", props<{ error: any }>());


export const LOGIN = createAction("[Login]", props<{ email: string, password: string }>());
export const LOGIN_SUCCESS = createAction("[Login] success", props<{ user: User }>());
export const LOGIN_FAIL = createAction("[Login] fail", props<{ error: any }>());