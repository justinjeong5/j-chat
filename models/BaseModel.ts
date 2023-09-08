abstract class BaseModel {
    static toInternal(config: object) {
        return config;
    }

    abstract toExternal();
}

export default BaseModel;
