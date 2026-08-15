import { Components } from "../componentEnum";
import { BlockComponent } from "./base";

export class MenuCategory extends BlockComponent {
    public static id = Components.MenuCategory;
    public category: string;
    public group: string;

    constructor(json: Record<string, any>) {
        super();
        this.category = json.category;
        this.group = json.group;
    }
}