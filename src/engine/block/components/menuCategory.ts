import { BlockComponent } from "./base";

export class MenuCategory extends BlockComponent {
    public category: string = "";
    public group: string = "";

    fromJson(json: Record<string, any>) {
        this.category = json?.category || "";
        this.group = json?.group || "";
    }

    static fromJson(json: Record<string, any>): MenuCategory {
        const instance = new MenuCategory();
        instance.fromJson(json);
        return instance;
    }

    bindToRp() {}
}