export class User {

    constructor(
        private id: string, 
        private name: string,
        private email: string,
        private password: string
    ) {}

    getId = () => {
        return this.id
    }

    getName = () => {
        return this.name
    }

    getEmail = () => {
        return this.email
    }

    getPassword = () => {
        return this.password
    }

    static toUserModel(user: any): User {
        return new User(
            user.id,
            user.name,
            user.email,
            user.password
        )
    }
}