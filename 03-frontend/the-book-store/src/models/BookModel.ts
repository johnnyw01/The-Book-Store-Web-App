class BookModel {
    id: number;
    title: string;
    author?: string; //? = an optinal variable (it CAN be null)
    description?: string;
    copies?: number;
    copiesAvailable?: number;
    category?: string;
    img?: string;

    //This constructor creates our objects when we have our data
    constructor(id:number, title:string, author:string, description:string, copies:number, copiesAvailable:number, category:string, img:string) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.copies = copies;
        this.copiesAvailable = copiesAvailable;
        this.category = category;
        this.img = img;
    }
}

export default BookModel