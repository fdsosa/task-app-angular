export class JoinModel{

    constructor(user='', email='', password=''){
        this.user = user;
        this.email = email;
        this.password = password;
    }

    user: string;
    email: string;
    password: string;
}