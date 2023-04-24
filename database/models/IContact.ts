export interface IContact {
    name: string;
    imageUrl: string;
    mobile: string;
    email: string;
    company: string;
    title: string;
    groupId: string;
    _id?: string;
    createdAt? : Date;
    updatedAt? : Date;
}
