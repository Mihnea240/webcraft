import { BlockComponent } from "./base";

export class MenuCategory extends BlockComponent {
    public category: string = "";
    public group: string = "";

    static fromJson(json: Record<string, any>): MenuCategory {
        const instance = new MenuCategory();
        instance.category = json?.category || "";
        instance.group = json?.group || "";
        return instance;
    }
}