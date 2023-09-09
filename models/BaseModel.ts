abstract class BaseModel {
    static createItem(config: object) {
        return config;
    }

    abstract toExternal();
}

export default BaseModel;
